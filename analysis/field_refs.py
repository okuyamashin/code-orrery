"""各クラスについて、どのメソッドが self のどの属性を読み書き・呼び出ししているかを抽出する。

使い方: python3 analysis/field_refs.py tinydb/tinydb [--json out.json]
"""
import ast
import json
import pathlib
import sys


def kind_of(name, fields, class_vars, methods):
    if name in fields:
        return "field"
    if name in methods:
        return "method"
    if name in class_vars:
        return "classvar"
    return "inherited"  # 親クラスや動的に用意される属性


def analyze_class(cls):
    methods = {n.name: n for n in cls.body if isinstance(n, (ast.FunctionDef, ast.AsyncFunctionDef))}
    class_vars = set()
    for s in cls.body:
        if isinstance(s, ast.Assign):
            class_vars |= {t.id for t in s.targets if isinstance(t, ast.Name)}
        elif isinstance(s, ast.AnnAssign) and isinstance(s.target, ast.Name):
            class_vars.add(s.target.id)

    # 1パス目: self.x への代入からインスタンス変数を集める
    fields = set()
    for m in methods.values():
        for n in ast.walk(m):
            if isinstance(n, ast.Attribute) and isinstance(n.value, ast.Name) \
                    and n.value.id == "self" and isinstance(n.ctx, ast.Store):
                fields.add(n.attr)

    # 2パス目: メソッドごとの参照
    result = {}
    for mname, m in methods.items():
        aug_targets = {id(n.target) for n in ast.walk(m) if isinstance(n, ast.AugAssign)}
        call_funcs = {id(n.func) for n in ast.walk(m) if isinstance(n, ast.Call)}
        refs = {}
        for n in ast.walk(m):
            if not (isinstance(n, ast.Attribute) and isinstance(n.value, ast.Name) and n.value.id == "self"):
                continue
            r = refs.setdefault(n.attr, {"kind": kind_of(n.attr, fields, class_vars, methods), "ops": set()})
            if id(n) in aug_targets:
                r["ops"] |= {"read", "write"}
            elif isinstance(n.ctx, ast.Store):
                r["ops"].add("write")
            elif id(n) in call_funcs:
                r["ops"].add("call")
            else:
                r["ops"].add("read")
        result[mname] = {k: {"kind": v["kind"], "ops": sorted(v["ops"])} for k, v in sorted(refs.items())}
    return result


def main():
    root = pathlib.Path(sys.argv[1])
    out = {}
    for p in sorted(root.glob("*.py")):
        tree = ast.parse(p.read_text())
        for cls in (n for n in tree.body if isinstance(n, ast.ClassDef)):
            out[f"{p.stem}.{cls.name}"] = analyze_class(cls)
    if "--json" in sys.argv:
        pathlib.Path(sys.argv[sys.argv.index("--json") + 1]).write_text(json.dumps(out, indent=2, ensure_ascii=False))
    for cname, ms in out.items():
        print(cname)
        for mname, refs in ms.items():
            if refs:
                s = ", ".join(f"{a}[{v['kind'][0]}:{'/'.join(o[0] for o in v['ops'])}]" for a, v in refs.items())
                print(f"  {mname}: {s}")


if __name__ == "__main__":
    main()
