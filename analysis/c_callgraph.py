#!/usr/bin/env python3
"""Generic static call graph for a C code base, using tree-sitter.

This is a structural tool: it reads function definitions and the names each one
calls, nothing more. It knows nothing about any particular bug or exploit; it is
the same kind of call-graph extractor used for the Python targets, ported to C.

Each function definition becomes a node keyed "<relative path>::<name>".
For every node we record:
  - file, line
  - calls: the set of other function names called in its body (direct names and
    names used as function pointers, flattened; we do not try to resolve which)

A later pass (slice_incident.py) picks a few seed functions and keeps only the
functions within N call-graph hops of them, so a huge code base collapses to the
neighbourhood that matters for one story.

Usage:
    python3 analysis/c_callgraph.py php-8.4.27 \
        --dirs Zend main ext/session ext/standard \
        --json analysis/php/callgraph.json
"""
import argparse
import json
import os
import sys

import tree_sitter_c as tsc
from tree_sitter import Language, Parser

PARSER = Parser(Language(tsc.language()))

# Generated / enormous files that are not worth parsing for a structural map.
SKIP_BASENAMES = {"zend_vm_execute.h", "zend_language_parser.c"}

# Function-defining macros whose real symbol name is built from the argument.
# e.g. PHP_FUNCTION(foo) defines a function conventionally named zif_foo.
NAME_MACROS = {
    "PHP_FUNCTION": "zif_{0}",
    "ZEND_FUNCTION": "zif_{0}",
    "PHP_METHOD": "zim_{0}",
    "PHP_MINIT_FUNCTION": "minit_{0}",
    "PHP_RINIT_FUNCTION": "rinit_{0}",
    "PHP_RSHUTDOWN_FUNCTION": "rshutdown_{0}",
    "PHP_MSHUTDOWN_FUNCTION": "mshutdown_{0}",
    "PHP_GINIT_FUNCTION": "ginit_{0}",
    "PHP_INI_MH": "{0}",
    "PS_SERIALIZER_ENCODE_FUNC": "ps_encode_{0}",
    "PS_SERIALIZER_DECODE_FUNC": "ps_decode_{0}",
    "PS_OPEN_FUNC": "ps_open_{0}",
    "PS_READ_FUNC": "ps_read_{0}",
    "SAPI_POST_HANDLER_FUNC": "{0}",
    "SAPI_TREAT_DATA_FUNC": "{0}",
    "SAPI_INPUT_FILTER_FUNC": "{0}",
}

# Control-flow keywords that look like calls (keyword followed by "(").
NOT_CALLS = {
    "if", "for", "while", "switch", "return", "sizeof", "do", "else",
    "defined", "case", "__attribute__", "static_assert", "_Static_assert",
    "alignof", "_Alignof",
}


def innermost_identifier(node, src):
    """Return the identifier name of a (possibly pointer/paren) declarator."""
    n = node
    while n is not None:
        if n.type == "identifier":
            return src[n.start_byte:n.end_byte].decode("utf-8", "replace")
        if n.type in ("function_declarator", "pointer_declarator",
                      "parenthesized_declarator", "array_declarator"):
            child = n.child_by_field_name("declarator")
            if child is None:
                # parenthesized_declarator holds its inner declarator unnamed
                child = next((c for c in n.children
                              if c.type.endswith("declarator")
                              or c.type == "identifier"), None)
            n = child
            continue
        return None
    return None


def macro_name(node, src):
    """If a declarator is a function-defining macro call, return the real name."""
    # A macro form parses as a call_expression used as a declarator:
    #   PHP_FUNCTION(foo)  ->  function(identifier=PHP_FUNCTION, args=(foo))
    if node.type == "function_declarator":
        fn = node.child_by_field_name("declarator")
        if fn is not None and fn.type == "identifier":
            macro = src[fn.start_byte:fn.end_byte].decode("utf-8", "replace")
            if macro in NAME_MACROS:
                args = node.child_by_field_name("parameters")
                if args is not None:
                    toks = [src[c.start_byte:c.end_byte].decode("utf-8", "replace")
                            for c in args.named_children]
                    if toks:
                        return NAME_MACROS[macro].format(*toks)
    return None


def func_name(def_node, src):
    decl = def_node.child_by_field_name("declarator")
    if decl is None:
        return None
    # Some defining macros are consumed as the return TYPE, leaving the argument
    # as a bare parenthesized declarator, e.g.
    #   PS_SERIALIZER_ENCODE_FUNC(php_serialize) { ... }
    tnode = def_node.child_by_field_name("type")
    if tnode is not None:
        tname = src[tnode.start_byte:tnode.end_byte].decode("utf-8", "replace")
        if tname in NAME_MACROS and decl.type == "parenthesized_declarator":
            inner = next((c for c in decl.children if c.type == "identifier"), None)
            if inner is not None:
                arg = src[inner.start_byte:inner.end_byte].decode("utf-8", "replace")
                return NAME_MACROS[tname].format(arg)
    m = macro_name(decl, src)
    if m:
        return m
    # strip pointer/paren wrappers down to the function_declarator
    n = decl
    while n is not None and n.type in ("pointer_declarator", "parenthesized_declarator"):
        n = n.child_by_field_name("declarator") or next(
            (c for c in n.children if c.type.endswith("declarator")), None)
    if n is not None:
        m = macro_name(n, src)
        if m:
            return m
    return innermost_identifier(decl, src)


def collect_calls(body, src):
    """All identifier names invoked as calls within a subtree."""
    calls = set()
    stack = [body]
    while stack:
        n = stack.pop()
        if n.type == "call_expression":
            fn = n.child_by_field_name("function")
            if fn is not None:
                name = None
                if fn.type == "identifier":
                    name = src[fn.start_byte:fn.end_byte].decode("utf-8", "replace")
                elif fn.type == "field_expression":
                    f = fn.child_by_field_name("field")
                    if f is not None:
                        name = src[f.start_byte:f.end_byte].decode("utf-8", "replace")
                elif fn.type == "parenthesized_expression":
                    # (*ptr)(...) style; grab the deepest identifier
                    name = innermost_identifier(fn, src)
                if name and name not in NOT_CALLS:
                    calls.add(name)
        stack.extend(n.children)
    return calls


def walk_functions(root, src):
    """Yield every function_definition node, including nested ones."""
    stack = [root]
    while stack:
        n = stack.pop()
        if n.type == "function_definition":
            yield n
        stack.extend(n.children)


def parse_file(path, rel):
    src = open(path, "rb").read()
    tree = PARSER.parse(src)
    out = {}
    for fn in walk_functions(tree.root_node, src):
        name = func_name(fn, src)
        body = fn.child_by_field_name("body")
        if not name or body is None:
            continue
        key = f"{rel}::{name}"
        calls = collect_calls(body, src)
        out[key] = {
            "name": name,
            "file": rel,
            "line": fn.start_point[0] + 1,
            "lines": body.end_point[0] - fn.start_point[0] + 1,
            "calls": sorted(calls),
        }
    return out


def iter_sources(root, dirs):
    for d in dirs:
        base = os.path.join(root, d)
        if not os.path.isdir(base):
            print(f"  (skip, not found: {d})", file=sys.stderr)
            continue
        for dirpath, _, files in os.walk(base):
            for f in files:
                if not f.endswith((".c", ".h")):
                    continue
                if f in SKIP_BASENAMES:
                    continue
                full = os.path.join(dirpath, f)
                yield full, os.path.relpath(full, root)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("root", help="source tree root, e.g. php-8.4.27")
    ap.add_argument("--dirs", nargs="+",
                    default=["Zend", "main", "ext/session", "ext/standard"],
                    help="subdirectories to scan")
    ap.add_argument("--json", required=True, help="output path")
    args = ap.parse_args()

    graph = {}
    name_index = {}  # bare name -> list of node keys
    nfiles = 0
    for full, rel in iter_sources(args.root, args.dirs):
        nfiles += 1
        for key, node in parse_file(full, rel).items():
            graph[key] = node
            name_index.setdefault(node["name"], []).append(key)

    # Resolve each node's call names to node keys (a name may be defined 0..n times).
    edges = 0
    for key, node in graph.items():
        resolved = []
        for cname in node["calls"]:
            for target in name_index.get(cname, ()):
                resolved.append(target)
                edges += 1
        node["calls_to"] = sorted(set(resolved))

    data = {
        "root": args.root,
        "dirs": args.dirs,
        "functions": graph,
        "name_index": {k: v for k, v in name_index.items() if len(v) <= 8},
    }
    os.makedirs(os.path.dirname(args.json), exist_ok=True)
    with open(args.json, "w") as fh:
        json.dump(data, fh, indent=1)
    print(f"{nfiles} files, {len(graph)} functions, {edges} resolved call edges "
          f"-> {args.json}")


if __name__ == "__main__":
    main()
