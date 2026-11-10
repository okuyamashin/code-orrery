"""UML 風のクラス図（継承のみ）を SVG で出力する。

使い方: python3 analysis/class_diagram.py tinydb/tinydb analysis/public_api.json out.svg

可視性の記号はテストからの呼び出し解析（public_api.json）にもとづく:
  + public（テストから呼ばれる）  ~ internal（パッケージ内の別クラスから）  - class-local
フィールドは呼び出し解析の対象外なので、名前の _ の有無で + / - を付ける。
"""
import ast
import html
import json
import pathlib
import sys

sys.path.insert(0, str(pathlib.Path(__file__).parent))
from call_graph import Pkg  # noqa: E402

CHAR_W = 7.3      # 等幅 12px の1文字幅の目安
LINE_H = 16
PAD = 10
GAP_X = 36
GAP_Y = 56
TOP = 110
COL_GAP = 58

# 配置: 列ごとに上から積む。("tree", 親, [子...]) か ("one", クラス)
LAYOUT = [
    [("tree", "Table", ["TinyDB"])],
    [("tree", "QueryInstance", ["Query"]), ("one", "QueryLike")],
    [("tree", "Storage", ["JSONStorage", "MemoryStorage"]), ("tree", "Middleware", ["CachingMiddleware"])],
    [("one", "Document"), ("one", "LRUCache"), ("one", "FrozenDict"), ("one", "TinyDBPlugin")],
]
# 実行時には継承していない（型チェック時だけの）親
TYPECHECK_ONLY = {("TinyDB", "Table")}


def ann_text(node):
    return ast.unparse(node) if node is not None else None


def class_rows(pkg, cname, vis):
    """クラスの区画（属性・メソッド）の行を作る。各行は (text, style, メンバー名)。"""
    info = pkg.classes[cname]
    node = info["node"]
    methods = info["methods"]
    aliases = {k: v.id for k, v in info["classvars"].items() if isinstance(v, ast.Name) and v.id in methods}

    attrs = []
    for k, v in info["classvars"].items():
        if k in aliases:
            continue
        val = ast.unparse(v)
        if len(val) > 18:
            val = val[:16] + "…"
        attrs.append((f"{'-' if k.startswith('_') else '+'} {k} = {val}", "static", k))
    field_ann = {}
    for m in methods.values():
        for n in ast.walk(m):
            if isinstance(n, ast.AnnAssign) and isinstance(n.target, ast.Attribute) \
                    and isinstance(n.target.value, ast.Name) and n.target.value.id == "self":
                field_ann[n.target.attr] = ann_text(n.annotation)
    for f in info["fields"]:
        t = field_ann.get(f)
        if t is None and info["fields"][f]:
            t = info["fields"][f][1]
        attrs.append((f"{'-' if f.startswith('_') else '+'} {f}" + (f": {t}" if t else ""), "", f))
    for p in info["props"]:
        r = ann_text(methods[p].returns)
        attrs.append((f"{vis.get((cname, p), '-')} /{p}" + (f": {r}" if r else ""), "", p))

    ops = []
    for name, m in methods.items():
        if name in info["props"]:
            continue
        abstract = any(ast.unparse(d).endswith("abstractmethod") for d in m.decorator_list)
        r = ann_text(m.returns)
        ops.append((f"{vis.get((cname, name), '-')} {name}()" + (f": {r}" if r else ""),
                    "abstract" if abstract else "", name))
    for k, target in aliases.items():
        ops.append((f"{vis.get((cname, target), '-')} {k}() = {target}", "", k))

    stereo = None
    if any(b in ("ABC",) for b in info["bases"]):
        stereo = "«abstract»"
    elif "Protocol" in info["bases"]:
        stereo = "«protocol»"
    external = [b for b in info["bases"] if b not in pkg.classes and b not in ("ABC", "Protocol", "TableBase")]
    return {"name": cname, "module": info["mod"], "stereo": stereo, "external": external,
            "abstract": stereo == "«abstract»", "attrs": attrs, "ops": ops,
            "lines": node.end_lineno - node.lineno + 1}


def measure(c):
    head = [f"tinydb.{c['module']} · {c['lines']}行  ", c["name"]] + ([c["stereo"]] if c["stereo"] else []) \
        + ([f"extends {', '.join(c['external'])}"] if c["external"] else [])
    texts = head + [r[0] for r in c["attrs"]] + [r[0] for r in c["ops"]]
    c["w"] = max(150, max(len(t) for t in texts) * CHAR_W + 2 * PAD)
    c["head_h"] = len(head) * LINE_H + PAD
    c["attrs_h"] = max(1, len(c["attrs"])) * LINE_H + PAD
    c["ops_h"] = max(1, len(c["ops"])) * LINE_H + PAD
    c["h"] = c["head_h"] + c["attrs_h"] + c["ops_h"]


def layout(classes):
    x = 40
    edges = []
    for col in LAYOUT:
        y = TOP
        items = []
        for item in col:
            if item[0] == "one":
                c = classes[item[1]]
                items.append((c["w"], [(c, 0, 0)], c["h"]))
            else:
                parent = classes[item[1]]
                kids = [classes[k] for k in item[2]]
                kids_w = sum(k["w"] for k in kids) + GAP_X * (len(kids) - 1)
                w = max(parent["w"], kids_w)
                placed = [(parent, (w - parent["w"]) / 2, 0)]
                kx = (w - kids_w) / 2
                ky = parent["h"] + GAP_Y
                for k in kids:
                    placed.append((k, kx, ky))
                    kx += k["w"] + GAP_X
                    edges.append((k["name"], parent["name"]))
                items.append((w, placed, ky + max(k["h"] for k in kids)))
        col_w = max(w for w, _, _ in items)
        for w, placed, h in items:
            ox = x + (col_w - w) / 2
            for c, dx, dy in placed:
                c["x"], c["y"] = ox + dx, y + dy
            y += h + GAP_Y
        x += col_w + COL_GAP
    return edges, x


def svg(classes, edges, width, title="tinydb クラス図（継承のみ）", legend=None, overlay="", extra_css=""):
    height = max(c["y"] + c["h"] for c in classes.values()) + 40
    o = []
    o.append(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width:.0f} {height:.0f}" '
             f'width="{width:.0f}" height="{height:.0f}" font-family="Menlo, Consolas, monospace" font-size="12">')
    o.append("""<style>
  :root { --bg:#fbfaf7; --box:#ffffff; --head:#eef1f6; --line:#3b4252; --text:#1f2430; --muted:#6b7280; --accent:#8a5a00; }
  @media (prefers-color-scheme: dark) {
    :root { --bg:#16181d; --box:#1f232b; --head:#2a303b; --line:#9aa4b5; --text:#e6e8ec; --muted:#9aa1ad; --accent:#e0b058; }
  }
  .bg { fill: var(--bg); }
  .box { fill: var(--box); stroke: var(--line); stroke-width: 1.2; }
  .head { fill: var(--head); stroke: var(--line); stroke-width: 1.2; }
  .sep { stroke: var(--line); stroke-width: 1; }
  text { fill: var(--text); }
  .muted { fill: var(--muted); font-size: 10.5px; }
  .name { font-weight: 700; font-size: 13.5px; }
  .abstract { font-style: italic; }
  .static { text-decoration: underline; }
  .edge { fill: none; stroke: var(--line); stroke-width: 1.3; }
  .edge.typecheck { stroke-dasharray: 6 4; stroke: var(--accent); }
  .tri { fill: var(--box); stroke: var(--line); stroke-width: 1.3; }
  .tri.typecheck { stroke: var(--accent); }
  .note { fill: var(--accent); font-size: 11px; font-family: -apple-system, "Hiragino Sans", sans-serif; }
  .title { font-size: 18px; font-weight: 700; font-family: -apple-system, "Hiragino Sans", sans-serif; }
  .legend { font-size: 11.5px; fill: var(--muted); font-family: -apple-system, "Hiragino Sans", sans-serif; }
""" + extra_css + "</style>")
    o.append(f'<rect class="bg" x="0" y="0" width="{width:.0f}" height="{height:.0f}"/>')
    o.append(f'<text class="title" x="40" y="42">{title}</text>')
    if legend is None:
        legend = ["+ public（テストから呼ばれる） ~ internal（パッケージ内の別クラスから） - class-local ／ "
                  "フィールドは名前の _ で判定 ／ /名前 = property ／ 下線 = クラス変数 ／ 斜体 = 抽象",
                  "関数だけのモジュール（operations.py など）とパッケージ外の親クラス（dict, ABC など）は箱にしていない"]
    for i, line in enumerate(legend):
        o.append(f'<text class="legend" x="40" y="{66 + 18 * i}">{line}</text>')

    # 継承の線（子の上辺 → 親の下辺、直角に折る）
    for child, parent in edges:
        c, p = classes[child], classes[parent]
        cx, cy = c["x"] + c["w"] / 2, c["y"]
        px, py = p["x"] + p["w"] / 2, p["y"] + p["h"]
        my = py + GAP_Y / 2
        tc = " typecheck" if (child, parent) in TYPECHECK_ONLY else ""
        o.append(f'<path class="edge{tc}" d="M{cx:.1f},{cy:.1f} V{my:.1f} H{px:.1f} V{py + 12:.1f}"/>')
        o.append(f'<path class="tri{tc}" d="M{px:.1f},{py:.1f} l-7,12 h14 z"/>')
        if tc:
            o.append(f'<text class="note" x="{px + 12:.1f}" y="{my - 4:.1f}">型チェック時だけの継承</text>')
            o.append(f'<text class="note" x="{px + 12:.1f}" y="{my + 12:.1f}">実行時は object、'
                     f'__getattr__ で委譲</text>')

    for c in classes.values():
        x, y, w = c["x"], c["y"], c["w"]
        o.append(f'<rect class="box" x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{c["h"]:.1f}"/>')
        o.append(f'<rect class="head" x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{c["head_h"]:.1f}"/>')
        ty = y + LINE_H
        cxm = x + w / 2
        o.append(f'<text class="muted" x="{cxm:.1f}" y="{ty:.1f}" text-anchor="middle">tinydb.{c["module"]}'
                 f' · {c["lines"]}行</text>')
        if c["stereo"]:
            ty += LINE_H
            o.append(f'<text class="muted" x="{cxm:.1f}" y="{ty:.1f}" text-anchor="middle">{html.escape(c["stereo"])}</text>')
        ty += LINE_H
        cls = "name abstract" if c["abstract"] else "name"
        o.append(f'<text class="{cls}" x="{cxm:.1f}" y="{ty:.1f}" text-anchor="middle">{c["name"]}</text>')
        if c["external"]:
            ty += LINE_H
            o.append(f'<text class="muted" x="{cxm:.1f}" y="{ty:.1f}" text-anchor="middle">'
                     f'extends {html.escape(", ".join(c["external"]))}</text>')
        sy = y + c["head_h"]
        for rows, h in ((c["attrs"], c["attrs_h"]), (c["ops"], c["ops_h"])):
            ry = sy + LINE_H
            for text, style, _ in rows:
                o.append(f'<text class="{style}" x="{x + PAD:.1f}" y="{ry:.1f}">{html.escape(text)}</text>')
                ry += LINE_H
            sy += h
            if rows is c["attrs"]:
                o.append(f'<line class="sep" x1="{x:.1f}" y1="{sy:.1f}" x2="{x + w:.1f}" y2="{sy:.1f}"/>')
    o.append(overlay)
    o.append("</svg>")
    return "\n".join(o)


def main():
    pkg = Pkg(pathlib.Path(sys.argv[1]))
    api = json.load(open(sys.argv[2]))
    mark = {"public": "+", "internal": "~", "class-local": "-"}
    vis = {(n["class"], n["name"]): mark[n["visibility"]] for n in api["nodes"] if n["class"]}
    names = [n for col in LAYOUT for it in col for n in ([it[1]] + (it[2] if it[0] == "tree" else []))]
    classes = {n: class_rows(pkg, n, vis) for n in names}
    missing = set(pkg.classes) - set(names)
    if missing:
        print("LAYOUT にないクラス:", missing)
    for c in classes.values():
        measure(c)
    edges, width = layout(classes)
    pathlib.Path(sys.argv[3]).write_text(svg(classes, edges, width))
    print("wrote", sys.argv[3])


if __name__ == "__main__":
    main()
