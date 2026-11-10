"""継承の家系を紋章で描く SVG を出力する。

使い方: python3 analysis/glyph_inherit.py <根のクラス名> out.svg

表現:
  継承        親と子のコアどうしを太い管でつなぐ（ゲートのリングは管の方向を空けておく）
  影のゲート  子のリングに、親から継承して上書きしていないメソッドを半透明・破線で並べる
              子の中からの呼び出しは、この影のゲートに向かう外側の弧になる
  上書き      子のゲート → 親の同名ゲートを紫の破線で結ぶ
  super()     子のゲート → 親のゲートを青い線で結ぶ
  抽象メソッド 中身のない破線のソケット
  影の値      親で定義されたフィールドを子が使っていれば、子のコアに半透明で並べる
"""
import math
import pathlib
import sys

sys.path.insert(0, str(pathlib.Path(__file__).parent))
from glyph import Data, Glyph, LEGEND, document  # noqa: E402


def family(D, root):
    """根から下の木を (クラス, [子の部分木...]) で返す。"""
    return (root, [family(D, c) for c in D.children(root)])


def flatten(tree, depth=0, parent=None, out=None):
    out = [] if out is None else out
    out.append((tree[0], depth, parent))
    for sub in tree[1]:
        flatten(sub, depth + 1, tree[0], out)
    return out


def layout(D, root, min_width=1300):
    nodes = flatten(family(D, root))
    # 1回目: 管の方向なしで大きさだけ測る
    probe = {c: Glyph(D, c, 0, 0) for c, _, _ in nodes}
    pos = {}
    rows = {}
    for c, d, p in nodes:
        rows.setdefault(d, []).append(c)
    y = 90
    for d in sorted(rows):
        row = rows[d]
        h = max(probe[c].extent for c in row)
        y += h
        total = sum(2 * probe[c].extent * 0.9 for c in row)
        x = -total / 2
        for c in row:
            x += probe[c].extent * 0.9
            pos[c] = [x, y]
            x += probe[c].extent * 0.9
        y += h * 0.75
    # 横方向を正の座標にずらす
    minx = min(pos[c][0] - probe[c].extent for c in pos)
    for c in pos:
        pos[c][0] += -minx + 40
    width = max(pos[c][0] + probe[c].extent for c in pos) + 40
    height = max(pos[c][1] + probe[c].extent for c in pos) + 90
    if width < min_width:  # 凡例が収まるよう最低幅を確保して中央に寄せる
        for c in pos:
            pos[c][0] += (min_width - width) / 2
        width = min_width

    # 2回目: 管の方向を空けて組み直す
    links = [(c, p) for c, _, p in nodes if p]
    gaps = {c: [] for c in pos}
    for c, p in links:
        (cx, cy), (px, py) = pos[c], pos[p]
        gaps[c].append(math.atan2(py - cy, px - cx))
        gaps[p].append(math.atan2(cy - py, cx - px))
    glyphs = {c: Glyph(D, c, *pos[c], gaps=gaps[c]) for c in pos}
    return glyphs, links, width, height


def conduit(a, b, typecheck=False):
    """親子のコアをつなぐ太い管。typecheck=True は型チェック時だけの継承（途切れた細い管）。"""
    x0, y0 = a.cx, a.cy
    x1, y1 = b.cx, b.cy
    d = f"M{x0:.1f},{y0:.1f} L{x1:.1f},{y1:.1f}"
    if typecheck:
        return [f'<path class="conduit-outer" stroke-width="22" stroke-dasharray="26 18" stroke-linecap="butt" d="{d}"/>',
                f'<path class="conduit-tc" stroke-dasharray="26 18" d="{d}"/>']
    return [f'<path class="conduit-outer" stroke-width="38" d="{d}"/>',
            f'<path class="conduit-glow" stroke-width="26" filter="url(#bigglow)" d="{d}"/>',
            f'<path class="conduit-glow" stroke-width="14" d="{d}"/>',
            f'<path class="conduit-core" d="{d}"/>',
            f'<path class="conduit-flow" d="{d}"/>']


def gate_link(child, parent, name, cls, bend):
    """子のゲートから親の同名ゲートへ、横に膨らんだ曲線。"""
    x0, y0 = child.gate_xy(name)
    x1, y1 = parent.gate_xy(name)
    mx, my = (x0 + x1) / 2, (y0 + y1) / 2
    dx, dy = x1 - x0, y1 - y0
    L = math.hypot(dx, dy) or 1
    nx, ny = -dy / L, dx / L
    # 管から遠ざかる側に膨らませる
    side = 1 if (nx * (mx - (child.cx + parent.cx) / 2) + ny * (my - (child.cy + parent.cy) / 2)) >= 0 else -1
    qx, qy = mx + nx * side * bend, my + ny * side * bend
    # ゲートの縁から出入りする
    r0, r1 = child.gr[name] + 3, parent.gr[name] + 6
    a0 = math.atan2(qy - y0, qx - x0)
    a1 = math.atan2(qy - y1, qx - x1)
    sx, sy = x0 + r0 * math.cos(a0), y0 + r0 * math.sin(a0)
    ex, ey = x1 + r1 * math.cos(a1), y1 + r1 * math.sin(a1)
    marker = "arrO" if cls == "override" else "arr"
    return f'<path class="{cls}" marker-end="url(#{marker})" d="M{sx:.1f},{sy:.1f} Q{qx:.1f},{qy:.1f} {ex:.1f},{ey:.1f}"/>'


def main():
    root, out = sys.argv[1], sys.argv[2]
    D = Data()
    glyphs, links, w, h = layout(D, root)
    body = []
    for g in glyphs.values():
        body += g.background()
    for c, p in links:
        body += conduit(glyphs[c], glyphs[p], typecheck=D.TYPECHECK_PARENT.get(c) == p)
    for g in glyphs.values():
        body += g.svg()
    for c, p in links:
        child, parent = glyphs[c], glyphs[p]
        for m in child.overrides:
            if child.overrides[m] == p and m in parent.ang:
                body.append(gate_link(child, parent, m, "override", 70))
        for e in D.graph["edges"]:
            f, t = e["from"].split("."), e["to"].split(".")
            if e["kind"] == "super" and f[1] == c and t[1] == p and f[2] in child.ang and t[2] in parent.ang:
                if f[2] == t[2]:
                    body.append(gate_link(child, parent, f[2], "super", 120))
    legend = LEGEND + ["太い管 = 継承 ／ 半透明の破線ゲート = 継承したメソッド（影）／ 破線のソケット = 抽象メソッド ／ "
                       "紫の破線 = 上書き（子 → 親）／ 青い線 = super() 呼び出し"]
    title = f"{root} — inheritance family"
    pathlib.Path(out).write_text(document(w, h + 30, body, title, legend))
    print("wrote", out, f"{w:.0f}x{h:.0f}", {c: round(g.ring_r) for c, g in glyphs.items()})


if __name__ == "__main__":
    main()
