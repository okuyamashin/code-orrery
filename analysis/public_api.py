"""テストコードから呼ばれているパッケージのメソッド・関数を「公開 API」として列挙する。

使い方: python3 analysis/public_api.py tinydb/tinydb tinydb/tests [--json out.json]
"""
import ast
import json
import pathlib
import sys

from call_graph import FUNC, FuncWalker, build, dedupe


def is_fixture(fn):
    for d in fn.decorator_list:
        d = d.func if isinstance(d, ast.Call) else d
        if ast.unparse(d).endswith("fixture"):
            return True
    return False


def fixture_types(pkg, tests):
    """conftest やテストファイルの fixture が返す（yield する）値の型。"""
    types = {}
    for mod, tree in tests.items():
        for fn in tree.body:
            if isinstance(fn, FUNC) and is_fixture(fn):
                w = FuncWalker(pkg, mod, None, fn).collect_env()
                for n in ast.walk(fn):
                    if isinstance(n, (ast.Return, ast.Yield)) and n.value is not None:
                        if (t := w.infer(n.value)):
                            types[fn.name] = t
                            break
    return types


def main():
    pkg_root, test_root = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2])
    pkg, g = build(pkg_root)
    tests = {f"tests.{p.stem}": ast.parse(p.read_text()) for p in sorted(test_root.glob("*.py"))}
    for mod, tree in tests.items():
        pkg.add_external_module(mod, tree)
    fixtures = fixture_types(pkg, tests)

    callers = {}  # パッケージ側のノード id -> テスト関数の集合
    for mod, tree in tests.items():
        # モジュール直下のテスト関数、およびテストクラス内のメソッド
        fns = [n for n in tree.body if isinstance(n, FUNC)]
        fns += [m for c in tree.body if isinstance(c, ast.ClassDef) for m in c.body if isinstance(m, FUNC)]
        for fn in fns:
            env = {a.arg: fixtures[a.arg] for a in fn.args.args if a.arg in fixtures}
            for e in dedupe(FuncWalker(pkg, mod, None, fn, env).visit().edges):
                callers.setdefault(e["to"], set()).add(f"{mod}.{fn.name}")

    internal = {}
    owner = {n["id"]: (n["module"], n["class"]) for n in g["nodes"]}
    for e in g["edges"]:
        if e["to"] in owner and owner[e["from"]] != owner[e["to"]]:
            internal.setdefault(e["to"], set()).add(e["from"])

    rows = []
    for n in g["nodes"]:
        nid = n["id"]
        if nid in callers:
            level = "public"
        elif nid in internal:
            level = "internal"
        else:
            level = "class-local"
        rows.append({**n, "visibility": level, "test_callers": len(callers.get(nid, ()))})

    if "--json" in sys.argv:
        pathlib.Path(sys.argv[sys.argv.index("--json") + 1]).write_text(
            json.dumps({"fixtures": fixtures, "nodes": rows}, indent=2, ensure_ascii=False))

    print("fixtures:", fixtures)
    for level in ("public", "internal", "class-local"):
        sel = [r for r in rows if r["visibility"] == level]
        print(f"\n## {level} ({len(sel)})")
        cur = None
        for r in sel:
            owner_name = r["class"] or f"({r['module']})"
            if owner_name != cur:
                cur = owner_name
                print(f"  {r['module']}.{owner_name}")
            extra = f" ×{r['test_callers']}" if r["test_callers"] else ""
            print(f"      {r['name']}{extra}")


if __name__ == "__main__":
    main()
