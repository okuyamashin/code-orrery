"""3D 表示用に、各クラスの紋章データを JS ファイルへ書き出す。

使い方: python3 analysis/export3d.py diagrams/3d/data.js [--pkg pyyaml-5.3.1/lib3/yaml --data analysis/pyyaml]
  → window.TINYDB = {classes: {Table: {...}, ...}, inherits: [...], links: [...]} を定義する（file:// でも読み込めるように JS にしている）
"""
import ast
import json
import pathlib
import sys

sys.path.insert(0, str(pathlib.Path(__file__).parent))
from glyph import VISMAP, Data, Glyph  # noqa: E402


def export_class(D, cname):
    g = Glyph(D, cname, 0, 0, inherit=False)
    vis = {n["name"]: n["visibility"] for n in D.api["nodes"] if n["class"] == cname}
    gates = []
    for name in g.gates:
        gates.append({
            "name": name,
            "lines": g.size[name],
            "vis": VISMAP[vis.get(name, "class-local")],
            "dunder": name.startswith("__") and name.endswith("__"),
            "abstract": D.abstract(cname, name),
        })
    values = [{"name": v, "kind": k, "mutated": v in g.mutated} for v, k in g.values.items()]
    wires = []
    for e in D.graph["edges"]:
        f, t = e["from"].split("."), e["to"].split(".")
        if len(f) == 3 and len(t) == 3 and f[1] == cname and t[1] == cname and f[2] != t[2] \
                and e["kind"] not in ("super", "ctor") and f[2] in g.size and t[2] in g.size:
            pair = {"from": f[2], "to": t[2], "kind": e["kind"]}
            if pair not in wires:
                wires.append(pair)
    spokes = []
    for m, attrs in g.cref.items():
        if m not in g.gates:
            continue
        for a, info in attrs.items():
            if a in g.values:
                spokes.append({"gate": m, "value": a, "op": "write" if "write" in info["ops"] else "read"})
    info = D.pkg.classes[cname]
    for gate in gates:
        m = info["methods"].get(gate["name"])
        gate["doc"] = first_paragraph(ast.get_docstring(m)) if m else None
    return {"name": cname, "module": info["mod"], "lines": g.class_lines,
            "doc": first_paragraph(ast.get_docstring(info["node"])),
            "bases": info["bases"], "gates": gates, "values": values, "wires": wires, "spokes": spokes}


def first_paragraph(doc):
    """docstring の最初の段落を 1 行にまとめる（なければ None）。"""
    if not doc:
        return None
    para = doc.strip().split("\n\n")[0]
    return " ".join(line.strip() for line in para.splitlines())


def export_relations(D, classes):
    """継承と、クラスをまたぐ線。端点は {"cls", "at": "gate"|"core"|"value", "name"}。"""
    inherits = []
    for c in D.pkg.classes:
        for p in D.parents(c):
            inherits.append({"child": c, "parent": p, "typecheck": False})
        if D.TYPECHECK_PARENT.get(c) in D.pkg.classes:
            inherits.append({"child": c, "parent": D.TYPECHECK_PARENT[c], "typecheck": True})

    gates = {c: {g["name"] for g in d["gates"]} for c, d in classes.items()}
    values = {c: {v["name"] for v in d["values"]} for c, d in classes.items()}
    links, seen = [], set()

    def add(kind, a, b):
        key = (kind, tuple(a.values()), tuple(b.values()))
        if key not in seen:
            seen.add(key)
            links.append({"kind": kind, "from": a, "to": b})

    for e in D.graph["edges"]:
        f, t = e["from"].split("."), e["to"].split(".")
        if len(f) != 3 or len(t) != 3 or f[1] == t[1] or f[1] not in classes or t[1] not in classes:
            continue
        if f[2] not in gates[f[1]]:
            continue
        src = {"cls": f[1], "at": "gate", "name": f[2]}
        k = e["kind"]
        if k == "ctor":
            add("ctor", src, {"cls": t[1], "at": "core", "name": None})
        elif k in ("typed", "implicit", "delegate", "super") and t[2] in gates[t[1]]:
            kind = {"typed": "call", "super": "super"}.get(k, "impl")
            add(kind, src, {"cls": t[1], "at": "gate", "name": t[2]})
        elif k.startswith("field") and t[2] in values[t[1]]:
            add("write" if k == "field-write" else "read", src, {"cls": t[1], "at": "value", "name": t[2]})
    # 上書き: 子のゲート → 親の同名ゲート
    for inh in inherits:
        if inh["typecheck"]:
            continue
        c, p = inh["child"], inh["parent"]
        for g in gates[c] & set(D.pkg.classes[p]["methods"]):
            add("override", {"cls": c, "at": "gate", "name": g}, {"cls": p, "at": "gate", "name": g})
    # 値が持つクラス: 値 → 相手のコア
    for c in classes:
        info = D.pkg.classes[c]
        for v in values[c]:
            target = None
            if v in info["fields"] and info["fields"][v]:
                target = info["fields"][v][1]
            elif v in info["classvars"]:
                target = getattr(info["classvars"][v], "id", None)
            if target in classes and target != c:
                add("hold", {"cls": c, "at": "value", "name": v}, {"cls": target, "at": "core", "name": None})
    return inherits, links


def main():
    out = pathlib.Path(sys.argv[1])
    opt = lambda k: sys.argv[sys.argv.index(k) + 1] if k in sys.argv else None
    D = Data(opt("--pkg"), opt("--data"))
    data = {"classes": {c: export_class(D, c) for c in D.pkg.classes}}
    data["inherits"], data["links"] = export_relations(D, data["classes"])
    data["package"] = {"name": D.pkg.root.name,
                       "doc": first_paragraph(ast.get_docstring(D.pkg.mods["__init__"])),
                       "modules": {m: first_paragraph(ast.get_docstring(t)) for m, t in D.pkg.mods.items()}}
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text("window.TINYDB = " + json.dumps(data, ensure_ascii=False, indent=1) + ";\n")
    big = max(data["classes"].values(), key=lambda c: c["lines"])
    print("wrote", out, len(data["classes"]), "classes;", f'{big["name"]}:', len(big["gates"]), "gates",
          len(big["values"]), "values", len(big["wires"]), "wires", len(big["spokes"]), "spokes;",
          len(data["inherits"]), "inherits", len(data["links"]), "links")


if __name__ == "__main__":
    main()
