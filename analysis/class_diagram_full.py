"""継承に加えて、関連・シグネチャ依存・呼び出しの線を全部描いたクラス図を SVG で出力する。

使い方: python3 analysis/class_diagram_full.py tinydb/tinydb analysis/public_api.json \
            analysis/call_graph.json out.svg

線の種類:
  継承        白抜き三角（class_diagram.py と同じ）
  関連        フィールド・クラス変数がほかのクラスを持つ（行 → 相手のクラス名）
  戻り値      メソッドの戻り値の注釈にクラスが出てくる（行 → 相手のクラス名）
  引数        メソッドの引数の注釈にクラスが出てくる（行 → 相手のクラス名）
  呼び出し    メソッド → メソッド（call_graph.json の辺。ctor / implicit / delegate は色を変える）
  同じクラス内の呼び出しは箱の右側の弧で描く
"""
import ast
import json
import pathlib
import sys

sys.path.insert(0, str(pathlib.Path(__file__).parent))
import class_diagram as cd  # noqa: E402
from call_graph import Pkg  # noqa: E402

cd.TOP = 160
cd.COL_GAP = 190
cd.GAP_Y = 70

KIND_CLASS = {"self": "call", "typed": "call", "super": "call", "func": "call",
              "ctor": "ctor", "implicit": "implicit", "delegate": "implicit"}

CSS = """
  :root { --assoc:#0f8b8d; --sig:#d9730d; --call:#2f6fdf; --ctor:#2e9d4f; --implicit:#9b51c9; }
  @media (prefers-color-scheme: dark) {
    :root { --assoc:#3cc6c8; --sig:#f0a050; --call:#6c9cff; --ctor:#5ccf7c; --implicit:#c58af0; }
  }
  .ln { fill: none; stroke-width: 1.2; opacity: 0.72; }
  .ln.assoc { stroke: var(--assoc); stroke-width: 1.8; }
  .ln.ret { stroke: var(--sig); stroke-dasharray: 7 4; }
  .ln.param { stroke: var(--sig); stroke-dasharray: 2 3; }
  .ln.call { stroke: var(--call); }
  .ln.ctor { stroke: var(--ctor); stroke-width: 1.5; }
  .ln.implicit { stroke: var(--implicit); }
  .mk.assoc { fill: var(--assoc); } .mk.ret, .mk.param { fill: var(--sig); }
  .mk.call { fill: var(--call); } .mk.ctor { fill: var(--ctor); } .mk.implicit { fill: var(--implicit); }
  .k-assoc { fill: var(--assoc); } .k-sig { fill: var(--sig); } .k-call { fill: var(--call); }
  .k-ctor { fill: var(--ctor); } .k-implicit { fill: var(--implicit); }
  .dot { opacity: 0.85; }
"""


def class_names(pkg, ann):
    """注釈の式に出てくるパッケージ内クラス名（list[Document] や 'QueryInstance' も見る）。"""
    if ann is None:
        return set()
    out = set()
    for n in ast.walk(ann):
        if isinstance(n, ast.Name) and n.id in pkg.classes:
            out.add(n.id)
        elif isinstance(n, ast.Constant) and isinstance(n.value, str):
            try:
                out |= class_names(pkg, ast.parse(n.value, mode="eval").body)
            except SyntaxError:
                pass
    return out


def anchors(c):
    """メンバー名 → 行の中心の y 座標。"""
    out = {}
    y = c["y"] + c["head_h"]
    for i, r in enumerate(c["attrs"]):
        out[r[2]] = y + cd.LINE_H * (i + 1) - 4
    y += c["attrs_h"]
    for i, r in enumerate(c["ops"]):
        out[r[2]] = y + cd.LINE_H * (i + 1) - 4
    return out


def collect(pkg, graph):
    edges = []  # (kind, src_class, src_member, dst_class, dst_member or None)
    for cname, info in pkg.classes.items():
        methods = info["methods"]
        # 関連: フィールドとクラス変数
        field_ann = {}
        for m in methods.values():
            for n in ast.walk(m):
                if isinstance(n, ast.AnnAssign) and isinstance(n.target, ast.Attribute) \
                        and isinstance(n.target.value, ast.Name) and n.target.value.id == "self":
                    field_ann[n.target.attr] = n.annotation
        for f, t in info["fields"].items():
            targets = class_names(pkg, field_ann.get(f))
            if t:
                targets.add(t[1])
            for d in targets - {cname}:
                edges.append(("assoc", cname, f, d, None))
        for k, v in info["classvars"].items():
            if isinstance(v, ast.Name) and v.id in pkg.classes and v.id != cname:
                edges.append(("assoc", cname, k, v.id, None))
        # シグネチャ: 引数と戻り値
        for mname, m in methods.items():
            for d in class_names(pkg, m.returns) - {cname}:
                edges.append(("ret", cname, mname, d, None))
            args = m.args.posonlyargs + m.args.args + m.args.kwonlyargs
            ps = set()
            for a in args:
                ps |= class_names(pkg, a.annotation)
            for d in ps - {cname}:
                edges.append(("param", cname, mname, d, None))
    # 呼び出し
    seen = set()
    for e in graph["edges"]:
        a, b = e["from"].split("."), e["to"].split(".")
        if len(a) != 3 or len(b) != 3:  # モジュール関数は箱がないので省く
            continue
        if e["kind"] not in KIND_CLASS:
            continue
        key = (a[1], a[2], b[1], b[2])
        if key in seen:
            continue
        seen.add(key)
        edges.append((KIND_CLASS[e["kind"]], a[1], a[2], b[1], b[2]))
    return edges


def draw(classes, edges):
    o = ['<defs>']
    for k in ("assoc", "ret", "param", "call", "ctor", "implicit"):
        o.append(f'<marker id="m-{k}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" '
                 f'orient="auto-start-reverse"><path class="mk {k}" d="M0,0 L10,5 L0,10 z"/></marker>')
    o.append('</defs>')
    anc = {n: anchors(c) for n, c in classes.items()}
    counts = {}
    for kind, sc, sm, dc, dm in edges:
        if sc not in classes or dc not in classes:
            continue
        s, d = classes[sc], classes[dc]
        y0 = anc[sc].get(sm)
        y1 = anc[dc].get(dm) if dm else d["y"] + d["head_h"] / 2
        if y0 is None or y1 is None:
            continue
        counts[kind] = counts.get(kind, 0) + 1
        cls = f'ln {kind}'
        mk = f'marker-end="url(#m-{kind})"'
        if sc == dc:
            # 同じクラス内: 右側の弧
            x = s["x"] + s["w"]
            b = min(14 + abs(y1 - y0) * 0.22, 110)
            o.append(f'<path class="{cls}" {mk} d="M{x:.1f},{y0:.1f} C{x + b:.1f},{y0:.1f} '
                     f'{x + b:.1f},{y1:.1f} {x + 1:.1f},{y1:.1f}"/>')
            continue
        scx, dcx = s["x"] + s["w"] / 2, d["x"] + d["w"] / 2
        if d["x"] > s["x"] + s["w"]:
            x0, x1, d0, d1 = s["x"] + s["w"], d["x"], 1, -1
        elif d["x"] + d["w"] < s["x"]:
            x0, x1, d0, d1 = s["x"], d["x"] + d["w"], -1, 1
        else:  # 同じ列: 両方とも右側から出入りする
            x0, x1, d0, d1 = s["x"] + s["w"], d["x"] + d["w"], 1, 1
        span = abs(x1 - x0)
        off = max(50, span * 0.4) if d0 != d1 else 60 + abs(y1 - y0) * 0.12
        o.append(f'<path class="{cls}" {mk} d="M{x0:.1f},{y0:.1f} C{x0 + d0 * off:.1f},{y0:.1f} '
                 f'{x1 + d1 * off:.1f},{y1:.1f} {x1:.1f},{y1:.1f}"/>')
        o.append(f'<circle class="mk {kind} dot" cx="{x0:.1f}" cy="{y0:.1f}" r="2.2"/>')
    return "\n".join(o), counts


def main():
    pkg_root, api_path, graph_path, out = sys.argv[1:5]
    pkg = Pkg(pathlib.Path(pkg_root))
    api = json.load(open(api_path))
    graph = json.load(open(graph_path))
    mark = {"public": "+", "internal": "~", "class-local": "-"}
    vis = {(n["class"], n["name"]): mark[n["visibility"]] for n in api["nodes"] if n["class"]}
    names = [n for col in cd.LAYOUT for it in col for n in ([it[1]] + (it[2] if it[0] == "tree" else []))]
    classes = {n: cd.class_rows(pkg, n, vis) for n in names}
    for c in classes.values():
        cd.measure(c)
    inherit, width = cd.layout(classes)
    edges = collect(pkg, graph)
    overlay, counts = draw(classes, edges)
    legend = [
        "+ public ~ internal - class-local ／ /名前 = property ／ 下線 = クラス変数 ／ 斜体 = 抽象 ／ "
        "モジュール関数（freeze, where など）への呼び出しは箱がないので省略",
        f'<tspan class="k-assoc">━━ 関連</tspan>（フィールド・クラス変数が持つ）{counts.get("assoc", 0)}本　'
        f'<tspan class="k-sig">╍╍ 戻り値</tspan> {counts.get("ret", 0)}本　'
        f'<tspan class="k-sig">┈┈ 引数</tspan> {counts.get("param", 0)}本　'
        "（行 → 相手のクラス名）",
        f'<tspan class="k-call">━━ 呼び出し</tspan> {counts.get("call", 0)}本　'
        f'<tspan class="k-ctor">━━ 生成</tspan> {counts.get("ctor", 0)}本　'
        f'<tspan class="k-implicit">━━ 暗黙の呼び出し・委譲</tspan> {counts.get("implicit", 0)}本　'
        "（行 → 行。同じクラス内は箱の右側の弧）",
    ]
    doc = cd.svg(classes, inherit, width + 60, title="tinydb クラス図（継承・関連・シグネチャ・呼び出し）",
                 legend=legend, overlay=overlay, extra_css=CSS)
    pathlib.Path(out).write_text(doc)
    print("wrote", out, counts)


if __name__ == "__main__":
    main()
