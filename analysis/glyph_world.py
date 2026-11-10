"""パッケージ全体を紋章で描く SVG を出力する。

使い方: python3 analysis/glyph_world.py out.svg

家系（継承の木）ごとに glyph_inherit.layout で組み、それをスカイライン詰めで並べる。
大きい家系から順に、幅 MAX_ROW_W の中で一番上に空いている場所へ置く。
"""
import math
import pathlib
import sys

sys.path.insert(0, str(pathlib.Path(__file__).parent))
from glyph import Data, LEGEND, document  # noqa: E402
from glyph_inherit import conduit, gate_link, layout  # noqa: E402

MAX_ROW_W = 3900
MARGIN = 60

LINK_CSS = """
<defs>
  <marker id="aCall" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#b8f6ff"/></marker>
  <marker id="aCtor" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#5cf08a"/></marker>
  <marker id="aImpl" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#ff7ad9"/></marker>
  <marker id="aRead" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#5fd4ff"/></marker>
  <marker id="aWrite" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#ffb347"/></marker>
  <marker id="aHold" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#3cc6c8"/></marker>
</defs>
<style>
  .lk { fill: none; stroke-linecap: round; }
  .lk.call { stroke: #b8f6ff; stroke-width: 1.8; opacity: .85; }
  .lk.ctor { stroke: #5cf08a; stroke-width: 2.4; opacity: .85; }
  .lk.impl { stroke: #ff7ad9; stroke-width: 1.8; opacity: .85; }
  .lk.read { stroke: #5fd4ff; stroke-width: 1.6; stroke-dasharray: 4 4; opacity: .9; }
  .lk.write { stroke: #ffb347; stroke-width: 1.6; stroke-dasharray: 4 4; opacity: .9; }
  .lk.hold { stroke: #3cc6c8; stroke-width: 1.4; stroke-dasharray: 1 6; opacity: .9; }
  .lk-halo { fill: none; stroke-linecap: round; stroke-width: 7; opacity: .18; }
</style>
"""

MARK = {"call": "aCall", "ctor": "aCtor", "impl": "aImpl", "read": "aRead", "write": "aWrite", "hold": "aHold"}
COLOR = {"call": "#b8f6ff", "ctor": "#5cf08a", "impl": "#ff7ad9", "read": "#5fd4ff", "write": "#ffb347", "hold": "#3cc6c8"}


def curve(kind, p0, r0, p1, r1, bend=0.16):
    """p0 から p1 へ、進行方向の左に膨らむ曲線。端は半径 r0, r1 の円の縁で止める。"""
    (x0, y0), (x1, y1) = p0, p1
    dx, dy = x1 - x0, y1 - y0
    L = math.hypot(dx, dy) or 1
    qx, qy = (x0 + x1) / 2 - dy / L * L * bend, (y0 + y1) / 2 + dx / L * L * bend
    a0 = math.atan2(qy - y0, qx - x0)
    a1 = math.atan2(qy - y1, qx - x1)
    sx, sy = x0 + r0 * math.cos(a0), y0 + r0 * math.sin(a0)
    ex, ey = x1 + r1 * math.cos(a1), y1 + r1 * math.sin(a1)
    d = f"M{sx:.1f},{sy:.1f} Q{qx:.1f},{qy:.1f} {ex:.1f},{ey:.1f}"
    return [f'<path class="lk-halo" stroke="{COLOR[kind]}" filter="url(#glow)" d="{d}"/>',
            f'<path class="lk {kind}" marker-end="url(#{MARK[kind]})" d="{d}"/>']


def cross_links(D, gl):
    """クラスをまたぐ線: メソッド呼び出し・生成・暗黙の呼び出し・フィールド参照・値が持つクラス。"""
    o, counts = [], {}

    def add(kind, parts):
        counts[kind] = counts.get(kind, 0) + 1
        o.extend(parts)

    seen = set()
    for e in D.graph["edges"]:
        f, t = e["from"].split("."), e["to"].split(".")
        if len(f) != 3 or len(t) != 3 or f[1] not in gl or t[1] not in gl or f[1] == t[1]:
            continue
        src, dst = gl[f[1]], gl[t[1]]
        if f[2] not in src.ang:
            continue
        key = (e["from"], e["to"], e["kind"])
        if key in seen:
            continue
        seen.add(key)
        p0, r0 = src.gate_xy(f[2]), src.gr[f[2]] + 3
        if e["kind"] == "ctor":
            add("ctor", curve("ctor", p0, r0, (dst.cx, dst.cy), dst.core_r + 16))
        elif e["kind"] in ("typed", "implicit", "delegate") and t[2] in dst.ang:
            kind = "call" if e["kind"] == "typed" else "impl"
            add(kind, curve(kind, p0, r0, dst.gate_xy(t[2]), dst.gr[t[2]] + 6))
        elif e["kind"].startswith("field") and t[2] in dst.values:
            kind = "write" if e["kind"] == "field-write" else "read"
            add(kind, curve(kind, p0, r0, dst.value_xy(t[2]), 10))
    # 値が持つクラス（フィールドの型・クラス変数が指すクラス）: 値 → 相手のコア
    for c, g in gl.items():
        info = D.pkg.classes[c]
        for v in g.values:
            target = None
            if v in info["fields"] and info["fields"][v]:
                target = info["fields"][v][1]
            elif v in info["classvars"]:
                val = info["classvars"][v]
                target = getattr(val, "id", None)
            if target in gl and target != c:
                add("hold", curve("hold", g.value_xy(v), 8, (gl[target].cx, gl[target].cy), gl[target].core_r + 16, 0.1))
    return o, counts


def roots(D):
    out = []
    for c in D.pkg.classes:
        if not D.parents(c) and c not in D.TYPECHECK_PARENT:
            out.append(c)
    return out


def main():
    out = sys.argv[1]
    D = Data()
    fams = []
    for r in roots(D):
        glyphs, links, w, h = layout(D, r, min_width=0)
        area = sum(g.class_lines for g in glyphs.values())
        fams.append((area, r, glyphs, links, w, h))
    fams.sort(key=lambda f: -f[0])

    # スカイライン詰め: 置ける場所のうち一番上（同じなら一番左）に置く
    rects, placed = [], []
    for _, r, glyphs, links, w, h in fams:
        best = None
        for x in [MARGIN] + [rx + rw for rx, ry, rw, rh in rects]:
            if x + w > MAX_ROW_W:
                continue
            y = max([ry + rh for rx, ry, rw, rh in rects if rx < x + w and x < rx + rw] + [40])
            if best is None or (y, x) < best:
                best = (y, x)
        y, x = best
        rects.append((x, y, w, h))
        for g in glyphs.values():
            g.cx += x
            g.cy += y
        placed.append((r, glyphs, links))
    height = max(ry + rh for rx, ry, rw, rh in rects) + 60
    width = max(g.cx + g.extent for _, gs, _ in placed for g in gs.values()) + MARGIN

    body = []
    allg = [g for _, gs, _ in placed for g in gs.values()]
    for g in allg:
        body += g.background()
    for _, gs, links in placed:
        for c, p in links:
            body += conduit(gs[c], gs[p], typecheck=D.TYPECHECK_PARENT.get(c) == p)
    gl = {g.cname: g for g in allg}
    links, counts = cross_links(D, gl)
    body += [LINK_CSS] + links
    for g in allg:
        body += g.svg()
        mod = D.pkg.classes[g.cname]["mod"]
        body.append(f'<text class="module" x="{g.cx:.1f}" y="{g.cy - g.core_r - 22:.1f}" '
                    f'text-anchor="middle">{mod}.py</text>')
    for _, gs, links in placed:
        for c, p in links:
            child, parent = gs[c], gs[p]
            for m, anc in child.overrides.items():
                if anc == p and m in parent.ang:
                    body.append(gate_link(child, parent, m, "override", 70))
            for e in D.graph["edges"]:
                f, t = e["from"].split("."), e["to"].split(".")
                if e["kind"] == "super" and f[1] == c and t[1] == p and f[2] == t[2] \
                        and f[2] in child.ang and t[2] in parent.ang:
                    body.append(gate_link(child, parent, f[2], "super", 120))

    legend = LEGEND + [
        f"クラスをまたぐ線: 白い水色 = メソッド呼び出し（ゲート → ゲート）{counts.get('call', 0)} 本 ／ 緑 = クラスの呼び出し（生成、ゲート → コア）{counts.get('ctor', 0)} 本 ／ "
        f"桃色 = 暗黙の呼び出し {counts.get('impl', 0)} 本 ／ 破線 = フィールド参照（水色 = 読み、琥珀色 = 書き、ゲート → 値）{counts.get('read', 0) + counts.get('write', 0)} 本 ／ "
        f"点線 = 値が持つクラス（値 → コア）{counts.get('hold', 0)} 本",
        "太い管 = 継承（琥珀色の途切れた管 = 型チェック時だけの継承 TinyDB ⇠ Table）／ 半透明の破線ゲート = 継承したメソッド ／ "
                       "破線のソケット = 抽象メソッド ／ 紫の破線 = 上書き ／ 青い線 = super()"]
    pathlib.Path(out).write_text(document(width, height + 20 * len(legend), body, "tinydb — the whole package", legend))
    print("wrote", out, f"{width:.0f}x{height:.0f}", counts)


if __name__ == "__main__":
    main()
