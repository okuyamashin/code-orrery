"""1つのクラスを「紋章」として描く SVG を出力する（ネット空間風の 2D 表現の試作）。

使い方: python3 analysis/glyph.py <クラス名> out.svg
  （analysis/ にある call_graph.json, public_api.json, field_refs.json を読む）

割り当て:
  コア（中心）  クラス本体。半径はクラスの行数で決まる
                フィールド = 丸、property = ひし形、クラス変数 = 四角 をコアの周りに並べる
  ゲート        メソッド。リング上にソースの順で時計回りに並べ、大きさはメソッドの行数で決まる
                public = 明るい水色で外向きの切れ目、internal = 青緑、class-local = 暗い青
                特殊メソッド（__x__）は二重リング
  外側の配線    同じクラス内のメソッド呼び出しを、リングの外を回る弧で描く
  内向きの線    ゲートからコアの値への参照（読み = 水色、書き = 琥珀色）
"""
import ast
import json
import math
import pathlib
import sys
from html import escape

HERE = pathlib.Path(__file__).parent

CSS = """
  .bg { fill: #030814; }
  .grid { stroke: #0d2a52; stroke-width: 0.6; fill: none; }
  .star { fill: #9fd8ff; }
  .ring { fill: none; stroke: #1b5fa8; stroke-width: 1; }
  .ring.faint { stroke: #12355f; stroke-dasharray: 2 6; }
  .core-disc { fill: url(#coreGrad); stroke: #5fd4ff; stroke-width: 2; }
  .core-ring { fill: none; stroke: #5fd4ff; stroke-width: 1; opacity: .6; }
  .ticks { fill: none; stroke: #5fd4ff; opacity: .5; }
  .cname { fill: #e8f7ff; font: 700 26px Menlo, monospace; letter-spacing: 1px; }
  .csub { fill: #7fc8ff; font: 12px Menlo, monospace; }
  .val { stroke: #5fd4ff; stroke-width: 1.2; fill: #072040; }
  .val.mut { stroke: #ffb347; fill: #3a2300; }
  .vlabel { fill: #b7e6ff; font: 11px Menlo, monospace; }
  .vlabel.mut { fill: #ffd08a; }
  .gate-body { fill: #04142b; }
  .gate { fill: none; }
  .gdot.public { fill: #6fe8ff; } .gdot.internal { fill: #2fb5a8; } .gdot.private { fill: #2f5f9e; }
  .public { stroke: #6fe8ff; }
  .internal { stroke: #2fb5a8; }
  .private { stroke: #2f5f9e; }
  .glabel { font: 12px Menlo, monospace; }
  .glabel.public { fill: #c9f5ff; } .glabel.internal { fill: #8fe0d6; } .glabel.private { fill: #6f96c8; }
  .gsize { font: 10px Menlo, monospace; fill: #5f8fc0; }
  .wire { fill: none; stroke: #7ab8ff; stroke-width: 1.3; opacity: .75; }
  .spoke { fill: none; stroke-width: 1; opacity: .35; }
  .spoke.read { stroke: #5fd4ff; } .spoke.write { stroke: #ffb347; opacity: .6; }
  .title { fill: #d8f2ff; font: 700 18px -apple-system, "Hiragino Sans", sans-serif; }
  .legend { fill: #7fa9d6; font: 12px -apple-system, "Hiragino Sans", sans-serif; }
  .ghost { opacity: .38; }
  .ghost .gate { stroke-dasharray: 3 3; }
  .glabel.ghost { fill: #6f96c8; font-style: italic; opacity: .8; }
  .abstract-ring { fill: none; stroke-dasharray: 5 4; }
  .conduit-outer { fill: none; stroke: #04203f; stroke-linecap: round; }
  .conduit-glow { fill: none; stroke: #1a74d6; stroke-linecap: round; opacity: .45; }
  .conduit-core { fill: none; stroke: #a8ecff; stroke-width: 2.2; stroke-linecap: round; }
  .conduit-flow { fill: none; stroke: #e6fbff; stroke-width: 3.5; stroke-dasharray: 2 14; stroke-linecap: round; }
  .override { fill: none; stroke: #c99bff; stroke-width: 1.6; opacity: .85; stroke-dasharray: 8 4; }
  .super { fill: none; stroke: #7ab8ff; stroke-width: 1.3; opacity: .75; }
  .olabel { fill: #d9bfff; font: 11px Menlo, monospace; }
  .conduit-tc { fill: none; stroke: #ffb347; stroke-width: 3; opacity: .7; }
  .module { fill: #3d6fa8; font: 600 13px Menlo, monospace; letter-spacing: 3px; }
"""



def load(name):
    return json.load(open(HERE / name))


VISMAP = {"public": "public", "internal": "internal", "class-local": "private"}


class Data:
    """解析結果（JSON）と AST をまとめて持つ。"""

    def __init__(self):
        sys.path.insert(0, str(HERE))
        from call_graph import Pkg
        self.graph = load("call_graph.json")
        self.api = load("public_api.json")
        self.refs = load("field_refs.json")
        self.pkg = Pkg(HERE.parent / "tinydb" / "tinydb")

    def methods(self, cname):
        return [n for n in self.graph["nodes"] if n["class"] == cname]

    def abstract(self, cname, mname):
        m = self.pkg.classes[cname]["methods"].get(mname)
        return bool(m) and any(ast.unparse(d).endswith("abstractmethod") for d in m.decorator_list)

    def parents(self, cname):
        return [b for b in self.pkg.classes[cname]["bases"] if b in self.pkg.classes]

    # 実行時には継承していないが、型チェック時だけ親として振る舞う関係（TinyDB(with_typehint(Table))）
    TYPECHECK_PARENT = {"TinyDB": "Table"}

    def children(self, cname):
        return [c for c, i in self.pkg.classes.items()
                if cname in i["bases"] or self.TYPECHECK_PARENT.get(c) == cname]


def gate_svg(x, y, r, vis, dunder, angle, lines, abstract=False):
    """1つのゲート（メソッド）。外向きの角度 angle に切れ目を入れる（public のみ）。"""
    o = [f'<g filter="url(#glow)">']
    o.append(f'<circle class="gate-body" cx="{x:.1f}" cy="{y:.1f}" r="{r:.1f}"/>')
    sw = 2.2 if vis == "public" else 1.6
    if abstract:
        # 抽象メソッド: 中身のない破線のソケット
        o.append(f'<circle class="gate abstract-ring {vis}" stroke-width="{sw}" cx="{x:.1f}" cy="{y:.1f}" r="{r:.1f}"/>')
        o.append(f'<circle class="gate {vis}" stroke-width="1" cx="{x:.1f}" cy="{y:.1f}" r="{r * 0.45:.1f}" opacity=".6"/>')
        o.append('</g>')
        return "\n".join(o)
    if vis == "public":
        gap = 0.55
        a0, a1 = angle + gap, angle + 2 * math.pi - gap
        x0, y0 = x + r * math.cos(a0), y + r * math.sin(a0)
        x1, y1 = x + r * math.cos(a1), y + r * math.sin(a1)
        o.append(f'<path class="gate {vis}" stroke-width="{sw}" d="M{x0:.1f},{y0:.1f} '
                 f'A{r:.1f},{r:.1f} 0 1 1 {x1:.1f},{y1:.1f}"/>')
    else:
        o.append(f'<circle class="gate {vis}" stroke-width="{sw}" cx="{x:.1f}" cy="{y:.1f}" r="{r:.1f}"/>')
    if dunder:
        o.append(f'<circle class="gate {vis}" stroke-width="1" cx="{x:.1f}" cy="{y:.1f}" r="{r + 5:.1f}" opacity=".7"/>')
    n = max(1, round(lines / 10))
    for i in range(n):
        a = angle + math.pi + (i - (n - 1) / 2) * 0.32
        if n > 18:
            a = angle + math.pi + 2 * math.pi * i / n
        r0, r1 = r * 0.55, r * 0.78
        o.append(f'<line class="gate {vis}" stroke-width="1.4" x1="{x + r0 * math.cos(a):.1f}" '
                 f'y1="{y + r0 * math.sin(a):.1f}" x2="{x + r1 * math.cos(a):.1f}" y2="{y + r1 * math.sin(a):.1f}"/>')
    o.append(f'<circle class="gdot {vis}" cx="{x:.1f}" cy="{y:.1f}" r="{max(2.5, r * 0.18):.1f}"/>')
    o.append('</g>')
    return "\n".join(o)


def value_shape(x, y, kind, mut):
    cls = "val mut" if mut else "val"
    if kind == "property":
        s = 7
        return f'<path class="{cls}" d="M{x:.1f},{y - s:.1f} L{x + s:.1f},{y:.1f} L{x:.1f},{y + s:.1f} L{x - s:.1f},{y:.1f} z"/>'
    if kind == "classvar":
        s = 5.5
        return f'<rect class="{cls}" x="{x - s:.1f}" y="{y - s:.1f}" width="{2 * s:.1f}" height="{2 * s:.1f}"/>'
    return f'<circle class="{cls}" cx="{x:.1f}" cy="{y:.1f}" r="6"/>'


def gate_radius(lines):
    return 9 + 2.6 * math.sqrt(lines)


def label_pos(cx, cy, r, a):
    lx, ly = cx + r * math.cos(a), cy + r * math.sin(a)
    anchor = "start" if math.cos(a) > 0.25 else "end" if math.cos(a) < -0.25 else "middle"
    dy = 4 if abs(math.cos(a)) > 0.25 else (14 if math.sin(a) > 0 else -14)
    return lx, ly + dy, anchor


class Glyph:
    """1つのクラスの紋章。geometry を先に決め、svg() で描く。

    gaps: 管（継承）を通すためにゲートを置かない方向（ラジアン）のリスト
    inherit: 親から継承して、自分では上書きしていないメソッドを「影のゲート」として並べる
    """

    GAP = 64          # ゲート間の余白（円周方向）
    PIPE_GAP = 0.42   # 管を通す方向の空き（ラジアン）

    def __init__(self, D, cname, cx, cy, gaps=(), inherit=True):
        self.D, self.cname, self.cx, self.cy = D, cname, cx, cy
        nodes = D.methods(cname)
        self.vis = {n["name"]: n["visibility"] for n in D.api["nodes"] if n["class"] == cname}
        self.cref = next((v for k, v in D.refs.items() if k.endswith("." + cname)), {})
        self.size = {n["name"]: n["lines"][1] - n["lines"][0] + 1 for n in nodes}
        self.props = [n for n in nodes if n["property"]]
        own = [n["name"] for n in nodes if not n["property"]]

        # 影のゲート: 祖先のメソッドのうち自分で上書きしていないもの
        self.ghost_of = {}
        if inherit:
            for anc in D.pkg.mro(cname)[1:]:
                for n in D.methods(anc):
                    if not n["property"] and n["name"] not in own and n["name"] not in self.ghost_of:
                        self.ghost_of[n["name"]] = anc
                        self.size[n["name"]] = n["lines"][1] - n["lines"][0] + 1
        self.gates = own + list(self.ghost_of)
        self.overrides = {m: anc for m in own for anc in D.pkg.mro(cname)[1:2]
                          if m in D.pkg.classes[anc]["methods"]}

        # コアの値
        self.values, self.mutated, self.ghost_values = {}, set(), set()
        anc_fields = {}
        for anc in D.pkg.mro(cname)[1:]:
            for f in D.pkg.classes[anc]["fields"]:
                anc_fields.setdefault(f, "field")
            for k in D.pkg.classes[anc]["classvars"]:
                anc_fields.setdefault(k, "classvar")
        for m, attrs in self.cref.items():
            for a, info in attrs.items():
                kind = info["kind"]
                if kind == "inherited" and a in anc_fields:
                    kind = anc_fields[a]
                    self.ghost_values.add(a)
                if kind in ("field", "classvar"):
                    self.values.setdefault(a, kind)
                    if "write" in info["ops"] and m != "__init__":
                        self.mutated.add(a)
        for p in self.props:
            self.values[p["name"]] = "property"

        self.class_lines = sum(v for k, v in self.size.items() if k not in self.ghost_of)
        self.core_r = 46 + 2.0 * math.sqrt(self.class_lines)
        self.val_r = self.core_r + 34
        self.gr = {g: gate_radius(self.size[g]) for g in self.gates}
        gmax = max(self.gr.values()) if self.gr else 20
        self.gmax = gmax
        circ = sum(2 * r + self.GAP for r in self.gr.values())
        free = 2 * math.pi - self.PIPE_GAP * len(gaps)
        self.ring_r = max(circ / free, self.val_r + gmax + 60)

        # 角度の割り当て: 管の方向を避けながら時計回りに並べる
        gaps = sorted(((g + math.pi / 2) % (2 * math.pi)) - math.pi / 2 for g in gaps)
        spans = {g: (2 * self.gr[g] + self.GAP) / self.ring_r for g in self.gates}
        scale = free / sum(spans.values()) if spans else 1
        a = -math.pi / 2
        if gaps and abs(gaps[0] + math.pi / 2) < 1e-6:
            a += self.PIPE_GAP / 2
        self.ang = {}
        pending_gaps = [g for g in gaps if g > a - 1e-6] + [g + 2 * math.pi for g in gaps if g <= a - 1e-6]
        for g in self.gates:
            span = spans[g] * scale
            while pending_gaps and a + span > pending_gaps[0] - self.PIPE_GAP / 2:
                a = pending_gaps.pop(0) + self.PIPE_GAP / 2
            self.ang[g] = a + span / 2
            a += span
        self.extent = self.ring_r + gmax + min(130, 0.35 * self.ring_r) + 60

    def polar(self, r, a):
        return self.cx + r * math.cos(a), self.cy + r * math.sin(a)

    def gate_xy(self, g):
        return self.polar(self.ring_r, self.ang[g])

    def value_angle(self):
        names = list(self.values)
        return {v: -math.pi / 2 + 2 * math.pi * (i + 0.5) / len(names) for i, v in enumerate(names)}

    def value_xy(self, v):
        return self.polar(self.val_r, self.value_angle()[v])

    def background(self):
        o = []
        for r in range(int(self.core_r + 40), int(self.extent), 70):
            o.append(f'<circle class="grid" cx="{self.cx:.1f}" cy="{self.cy:.1f}" r="{r}"/>')
        o.append(f'<circle class="ring" cx="{self.cx:.1f}" cy="{self.cy:.1f}" r="{self.ring_r:.1f}"/>')
        o.append(f'<circle class="ring faint" cx="{self.cx:.1f}" cy="{self.cy:.1f}" '
                 f'r="{self.ring_r + self.gmax + 30:.1f}"/>')
        return o

    def svg(self):
        o, D, cname = [], self.D, self.cname
        cx, cy = self.cx, self.cy
        vpos = {v: (*self.value_xy(v), a) for v, a in self.value_angle().items()}

        # 内向きの線: ゲート → 値
        for g in self.gates:
            if g in self.ghost_of:
                continue
            mx, my = self.polar(self.ring_r - self.gr[g], self.ang[g])
            for a, info in self.cref.get(g, {}).items():
                if a in vpos:
                    vx, vy, _ = vpos[a]
                    kind = "write" if "write" in info["ops"] else "read"
                    o.append(f'<path class="spoke {kind}" d="M{mx:.1f},{my:.1f} Q{cx:.1f},{cy:.1f} {vx:.1f},{vy:.1f}"/>')

        # コア
        o.append('<g filter="url(#glow)">')
        o.append(f'<circle class="core-disc" cx="{cx:.1f}" cy="{cy:.1f}" r="{self.core_r:.1f}"/>')
        o.append(f'<circle class="core-ring" cx="{cx:.1f}" cy="{cy:.1f}" r="{self.core_r - 10:.1f}"/>')
        o.append(f'<circle class="ticks" cx="{cx:.1f}" cy="{cy:.1f}" r="{self.core_r + 12:.1f}" stroke-width="5" '
                 f'stroke-dasharray="1.5 6"/>')
        o.append('</g>')
        fs = 26 if self.core_r > 70 else 18
        o.append(f'<text class="cname" style="font-size:{fs}px" x="{cx:.1f}" y="{cy + 6:.1f}" '
                 f'text-anchor="middle">{cname}</text>')
        own_n = len(self.gates) - len(self.ghost_of)
        o.append(f'<text class="csub" x="{cx:.1f}" y="{cy + 26:.1f}" text-anchor="middle">{self.class_lines} lines · '
                 f'{own_n} gates · {len(self.values)} values</text>')
        for v, (x, y, a) in vpos.items():
            mut = v in self.mutated
            ghost = ' class="ghost"' if v in self.ghost_values else ""
            o.append(f'<g filter="url(#glow)"{ghost}>{value_shape(x, y, self.values[v], mut)}</g>')
            lx, ly = self.polar(self.val_r + 16, a)
            anchor = "start" if math.cos(a) > 0.2 else "end" if math.cos(a) < -0.2 else "middle"
            dy = 4 if abs(math.cos(a)) > 0.2 else (14 if math.sin(a) > 0 else -8)
            o.append(f'<text class="vlabel{" mut" if mut else ""}" x="{lx:.1f}" y="{ly + dy:.1f}" '
                     f'text-anchor="{anchor}"{" opacity=\".55\"" if ghost else ""}>{escape(v)}</text>')

        # 外側の配線: 自分のゲート → 自分のゲート（継承したメソッドの呼び出しは影のゲートへ）
        for e in D.graph["edges"]:
            f, t = e["from"].split("."), e["to"].split(".")
            if len(f) != 3 or len(t) != 3 or f[1] != cname or f[2] == t[2] or e["kind"] in ("super", "ctor"):
                continue
            if not (t[1] == cname or self.ghost_of.get(t[2]) == t[1]):
                continue
            if f[2] not in self.ang or t[2] not in self.ang:
                continue
            a0, a1 = self.ang[f[2]], self.ang[t[2]]
            d = (a1 - a0 + math.pi) % (2 * math.pi) - math.pi
            am = a0 + d / 2
            x0, y0 = self.polar(self.ring_r + self.gr[f[2]] + 4, a0 + 0.035)
            x1, y1 = self.polar(self.ring_r + self.gr[t[2]] + 8, a1 - 0.035)
            cr = self.ring_r + self.gmax + min(130, 0.35 * self.ring_r) + abs(d) * self.ring_r * 0.30
            qx, qy = self.polar(cr, am)
            o.append(f'<path class="wire" marker-end="url(#arr)" d="M{x0:.1f},{y0:.1f} '
                     f'Q{qx:.1f},{qy:.1f} {x1:.1f},{y1:.1f}"/>')

        # ゲート
        for g in self.gates:
            a = self.ang[g]
            x, y = self.gate_xy(g)
            ghost = g in self.ghost_of
            owner = self.ghost_of.get(g, cname)
            v = VISMAP[next((n["visibility"] for n in D.api["nodes"] if n["class"] == owner and n["name"] == g),
                            "class-local")]
            body = gate_svg(x, y, self.gr[g], v, g.startswith("__") and g.endswith("__"), a, self.size[g],
                            abstract=D.abstract(owner, g))
            o.append(f'<g class="ghost">{body}</g>' if ghost else body)
            lx, ly, anchor = label_pos(cx, cy, self.ring_r + self.gr[g] + 14, a)
            if ghost:
                o.append(f'<text class="glabel ghost" x="{lx:.1f}" y="{ly:.1f}" text-anchor="{anchor}">'
                         f'{escape(g)}</text>')
                o.append(f'<text class="gsize" x="{lx:.1f}" y="{ly + 12:.1f}" text-anchor="{anchor}" opacity=".6">'
                         f'from {owner}</text>')
            else:
                o.append(f'<text class="glabel {v}" x="{lx:.1f}" y="{ly:.1f}" text-anchor="{anchor}">{escape(g)}</text>')
                o.append(f'<text class="gsize" x="{lx:.1f}" y="{ly + 12:.1f}" text-anchor="{anchor}">{self.size[g]}</text>')
        return o


DEFS = ('<defs>'
        '<filter id="glow" x="-50%" y="-50%" width="200%" height="200%">'
        '<feGaussianBlur stdDeviation="2.4" result="b"/><feMerge><feMergeNode in="b"/>'
        '<feMergeNode in="SourceGraphic"/></feMerge></filter>'
        '<filter id="bigglow" x="-20%" y="-20%" width="140%" height="140%">'
        '<feGaussianBlur stdDeviation="7"/></filter>'
        '<radialGradient id="coreGrad"><stop offset="0" stop-color="#0d4f8f"/>'
        '<stop offset=".7" stop-color="#062a55"/><stop offset="1" stop-color="#03152e"/></radialGradient>'
        '<marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" '
        'orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#7ab8ff"/></marker>'
        '<marker id="arrO" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" '
        'orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#c99bff"/></marker>'
        '</defs>')


def stars(w, h, n=160, seed=7):
    o, rnd = [], seed
    for i in range(n):
        rnd = (rnd * 1103515245 + 12345) % 2**31
        x, y = rnd % int(w), (rnd // int(w)) % int(h)
        o.append(f'<circle class="star" cx="{x}" cy="{y}" r="{0.6 + (i % 3) * 0.4:.1f}" '
                 f'opacity="{0.2 + (i % 5) * 0.1:.1f}"/>')
    return o


def document(w, h, body, title, legend):
    o = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.0f} {h:.0f}" width="{w:.0f}" height="{h:.0f}">',
         f"<style>{CSS}</style>", DEFS, f'<rect class="bg" width="{w:.0f}" height="{h:.0f}"/>']
    o += stars(w, h)
    o += body
    o.append(f'<text class="title" x="32" y="44">{escape(title)}</text>')
    for i, t in enumerate(legend):
        o.append(f'<text class="legend" x="32" y="{h - 20 * len(legend) - 10 + 20 * i:.0f}">{escape(t)}</text>')
    o.append("</svg>")
    return "\n".join(o)


LEGEND = ["コア = クラス（行数で大きさ）／ 丸 = フィールド、ひし形 = property、四角 = クラス変数、琥珀色 = __init__ 以外でも書き換わる",
          "ゲート = メソッド（行数で大きさ、10 行ごとに目盛り 1 本）／ 切れ目のある明るいリング = public、青緑 = internal、暗い青 = class-local、二重リング = 特殊メソッド",
          "外側の弧 = 同じクラス内の呼び出し ／ 内向きの線 = 値の参照（水色 = 読み、琥珀色 = 書き）"]


def main():
    cname, out = sys.argv[1], sys.argv[2]
    D = Data()
    W = H = 1400
    g = Glyph(D, cname, W / 2, H / 2, inherit=False)
    body = []
    for r in range(120, 700, 80):
        body.append(f'<circle class="grid" cx="{W / 2}" cy="{H / 2}" r="{r}"/>')
    for i in range(12):
        x, y = g.polar(680, i * math.pi / 6)
        body.append(f'<line class="grid" x1="{W / 2}" y1="{H / 2}" x2="{x:.0f}" y2="{y:.0f}"/>')
    body += [f'<circle class="ring" cx="{g.cx}" cy="{g.cy}" r="{g.ring_r:.1f}"/>',
             f'<circle class="ring faint" cx="{g.cx}" cy="{g.cy}" r="{g.ring_r + g.gmax + 30:.1f}"/>']
    body += g.svg()
    pathlib.Path(out).write_text(document(W, H, body, f"{cname} — class glyph", LEGEND))
    print("wrote", out, f"ring_r={g.ring_r:.0f} core_r={g.core_r:.0f}")


if __name__ == "__main__":
    main()
