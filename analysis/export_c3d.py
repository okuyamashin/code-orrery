#!/usr/bin/env python3
"""Turn a call-graph slice (slice_incident.py output) into the 3D viewer's data.

Mapping, for a C code base where there are no classes:
    file     -> planet   (keyed by its basename, e.g. "session.c")
    function -> gate on that planet
    call within the same file   -> wire (arc over the planet)
    call crossing files         -> link (light route between planets)
    directory of the file       -> "module" (clusters planets, like a galaxy)

The viewer reads one global object shaped like:
    window.CODE = {
      package: {name, doc, modules:{dir:null,...}},
      classes: { "<planet>": {name, module, lines, doc, bases:[],
                              gates:[{name,lines,vis,dunder,abstract,doc}],
                              values:[], wires:[{from,to,kind}], spokes:[]} },
      inherits: [],                      # C has none
      links: [{kind, from:{cls,at,name}, to:{cls,at,name}}],
    }

"vis" carries the distance tier instead of access level: core (holds a seed) vs
periphery. The viewer uses it only for colour/fade, so the periphery ring reads
as background. Nothing here describes a bug or an exploit; it is a structural
projection of the slice.

Usage:
    python3 analysis/export_c3d.py analysis/php/slice.json \
        diagrams/php/data.js --pkg php-src --global CODE
"""
import argparse
import json
import os


def planet_id(path):
    return os.path.basename(path)


def module_of(path):
    d = os.path.dirname(path)
    return d or "."


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("slice")
    ap.add_argument("out")
    ap.add_argument("--pkg", default="php-src")
    ap.add_argument("--global", dest="glob", default="CODE")
    args = ap.parse_args()

    sl = json.load(open(args.slice))
    files = sl["files"]

    # planet id per file path (basename); warn on collisions.
    pid = {}
    seen = {}
    for path in files:
        p = planet_id(path)
        if p in seen:
            p = f"{module_of(path).split('/')[-1]}/{p}"
        seen[p] = path
        pid[path] = p

    # key -> (planet, gate name) for edge resolution
    key_loc = {}
    for path, info in files.items():
        for fn in info["functions"]:
            key_loc[fn["key"]] = (pid[path], fn["name"])

    classes = {}
    modules = {}
    links = []
    link_seen = set()

    for path, info in files.items():
        p = pid[path]
        mod = module_of(path)
        modules[mod] = None
        gates = []
        wires = []
        wire_seen = set()
        for fn in info["functions"]:
            tier = "core" if info["tier"] == "core" else "periphery"
            # The viewer colours gates by "vis" using the public/internal/private
            # palette. Reuse it for the tier: core reads bright (public),
            # periphery reads dim (private), so the ring fades into the back.
            vis = "public" if tier == "core" else "private"
            gates.append({
                "name": fn["name"],
                "lines": max(1, fn.get("lines", 1)),
                "vis": vis,
                "tier": tier,
                "dunder": False,
                "abstract": False,
                "dist": fn["dist"],
                "doc": None,
            })
            for tgt in fn["calls_to"]:
                tp, tn = key_loc[tgt]
                if tp == p:
                    pair = (fn["name"], tn)
                    if fn["name"] != tn and pair not in wire_seen:
                        wire_seen.add(pair)
                        wires.append({"from": fn["name"], "to": tn, "kind": "call"})
                else:
                    lk = (p, fn["name"], tp, tn)
                    if lk not in link_seen:
                        link_seen.add(lk)
                        links.append({
                            "kind": "call",
                            "from": {"cls": p, "at": "gate", "name": fn["name"]},
                            "to": {"cls": tp, "at": "gate", "name": tn},
                        })
        classes[p] = {
            "name": p,
            "module": mod,
            "lines": sum(g["lines"] for g in gates),
            "doc": None,
            "bases": [],
            "gates": gates,
            "values": [],
            "wires": wires,
            "spokes": [],
            "tier": info["tier"],
            "min_dist": info["min_dist"],
        }

    data = {
        "package": {"name": args.pkg, "doc": None, "modules": modules},
        "classes": classes,
        "inherits": [],
        "links": links,
    }

    os.makedirs(os.path.dirname(args.out), exist_ok=True)
    with open(args.out, "w") as fh:
        fh.write(f"window.{args.glob} = ")
        json.dump(data, fh, indent=1)
        fh.write(";\n")
    ncore = sum(1 for c in classes.values() if c["tier"] == "core")
    print(f"{len(classes)} planets ({ncore} core), "
          f"{sum(len(c['gates']) for c in classes.values())} gates, "
          f"{len(links)} links -> {args.out}  (window.{args.glob})")


if __name__ == "__main__":
    main()
