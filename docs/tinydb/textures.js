// テーマ用の模様（テクスチャ）を、画像ファイルを使わずキャンバスに描いて作る。
// 球に貼るものは正距円筒図法（横 2 : 縦 1）で描く。背景は画面の大きさで描く。
import * as THREE from "three";

// 毎回同じ模様になるよう、決まった乱数を使う
function rng(seed) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

function canvas(w, h) {
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  return [c, c.getContext("2d")];
}

function toTexture(c) {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

// ---------- 球に貼る模様 ----------
const SPHERE = {
  // 装甲板: ずらして並べたパネル、継ぎ目、リベット、一部に斜線、赤道に目盛りの帯
  plating(ink, accent) {
    const W = 2048, H = 1024, [c, g] = canvas(W, H);
    const r = rng(7);
    const rows = 8;
    g.strokeStyle = ink; g.fillStyle = ink;
    for (let row = 0; row < rows; row++) {
      const y0 = row * H / rows, y1 = (row + 1) * H / rows;
      // 極に近い段ほどパネルを少なくして、歪みを抑える
      const lat = Math.abs((row + .5) / rows - .5) * Math.PI;
      const cols = Math.max(4, Math.round(18 * Math.cos(lat)));
      const pw = W / cols, off = (row % 2) * pw / 2;
      g.globalAlpha = .9; g.lineWidth = 6;
      g.beginPath(); g.moveTo(0, y0); g.lineTo(W, y0); g.stroke();
      for (let k = 0; k <= cols; k++) {
        const x = (off + k * pw) % W;
        // パネルごとに少しずつ違う濃さで塗る（金属板の質感）
        g.globalAlpha = .05 + r() * .12;
        g.fillRect(x, y0, pw, y1 - y0);
        if (x + pw > W) g.fillRect(x - W, y0, pw, y1 - y0);
        g.globalAlpha = .9; g.lineWidth = 5;
        g.beginPath(); g.moveTo(x, y0); g.lineTo(x, y1); g.stroke();
        // パネルの四隅のリベット
        for (const [dx, dy] of [[12, 12], [-12, 12], [12, -12], [-12, -12]]) {
          g.beginPath(); g.arc(x + dx, (dy > 0 ? y0 : y1) + dy, 4, 0, Math.PI * 2); g.fill();
        }
        g.globalAlpha = .75;
        const px = x + 20, py = y0 + 20, w = pw - 40, h = y1 - y0 - 40;
        const pick = r();
        if (pick < .22) {
          // 斜線で塗ったパネル
          g.save(); g.beginPath(); g.rect(px, py, w, h); g.clip();
          g.globalAlpha = .45; g.lineWidth = 2.5;
          for (let d = -h; d < w; d += 14) { g.beginPath(); g.moveTo(px + d, py + h); g.lineTo(px + d + h, py); g.stroke(); }
          g.restore();
        } else if (pick < .34) {
          // 点検口: 内側にもう一つの角丸の枠
          g.globalAlpha = .8; g.lineWidth = 3.5;
          g.beginPath(); g.roundRect(px + w * .2, py + h * .25, w * .6, h * .5, 6); g.stroke();
        } else if (pick < .44) {
          // 型番の刻印
          g.globalAlpha = .75; g.font = "700 22px monospace";
          g.fillText(`${String.fromCharCode(65 + row)}-${String(k).padStart(2, "0")}`, px + 4, py + 22);
        }
      }
    }
    // 赤道の目盛り帯
    const ey = H / 2;
    g.globalAlpha = 1; g.lineWidth = 5;
    for (const dy of [-12, 12]) { g.beginPath(); g.moveTo(0, ey + dy); g.lineTo(W, ey + dy); g.stroke(); }
    g.lineWidth = 3;
    for (let x = 0; x < W; x += 16) {
      const L = x % 128 === 0 ? 12 : 6;
      g.beginPath(); g.moveTo(x, ey - L); g.lineTo(x, ey + L); g.stroke();
    }
    // 差し色の警告帯（黄と黒ではなく、差し色の斜線）
    g.strokeStyle = accent; g.globalAlpha = .9; g.lineWidth = 6;
    for (const x0 of [W * .12, W * .62]) {
      for (let d = 0; d < 160; d += 18) { g.beginPath(); g.moveTo(x0 + d, ey + 12); g.lineTo(x0 + d + 14, ey - 12); g.stroke(); }
    }
    return toTexture(c);
  },

  // コア: 緯線の帯と、赤道の歯車の歯、経線の細い線
  gear(ink, accent) {
    const W = 1024, H = 512, [c, g] = canvas(W, H);
    g.strokeStyle = ink; g.fillStyle = ink;
    g.globalAlpha = .6; g.lineWidth = 1.2;
    for (let k = 1; k < 12; k++) { const y = k * H / 12; g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); }
    g.globalAlpha = .35;
    for (let k = 0; k < 24; k++) { const x = k * W / 24; g.beginPath(); g.moveTo(x, H * .1); g.lineTo(x, H * .9); g.stroke(); }
    // 赤道の歯
    g.globalAlpha = .85;
    const ey = H / 2;
    for (let x = 0; x < W; x += 32) g.fillRect(x, ey - 14, 16, 28);
    g.fillRect(0, ey - 16, W, 3); g.fillRect(0, ey + 13, W, 3);
    // 極の近くの二重帯
    g.lineWidth = 3;
    for (const y of [H * .18, H * .82]) {
      g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke();
      g.beginPath(); g.moveTo(0, y + 8); g.lineTo(W, y + 8); g.stroke();
    }
    g.strokeStyle = accent; g.globalAlpha = .8; g.lineWidth = 2;
    g.beginPath(); g.moveTo(0, H * .18 + 4); g.lineTo(W, H * .18 + 4); g.stroke();
    return toTexture(c);
  },
};

const cache = {};
/** 球に貼る模様のテクスチャ（同じ名前と色なら使い回す） */
export function sphereTexture(name, ink, accent) {
  const key = `${name}|${ink}|${accent}`;
  if (!SPHERE[name]) return null;
  return cache[key] ||= SPHERE[name](ink, accent);
}

// ---------- 背景 ----------
const BACKGROUND = {
  // 製図用紙: 細かい方眼、太い方眼、外枠、四隅の合わせマーク
  drafting(g, w, h, { bg, ink, accent }) {
    g.fillStyle = bg; g.fillRect(0, 0, w, h);
    // 紙のざらつき
    const r = rng(3);
    g.fillStyle = ink;
    for (let i = 0; i < w * h / 90; i++) {
      g.globalAlpha = r() * .05;
      g.fillRect(r() * w, r() * h, 1, 1);
    }
    g.strokeStyle = ink;
    const step = 16, major = 128;
    for (let x = 0; x <= w; x += step) {
      g.globalAlpha = x % major === 0 ? .14 : .05; g.lineWidth = 1;
      g.beginPath(); g.moveTo(x + .5, 0); g.lineTo(x + .5, h); g.stroke();
    }
    for (let y = 0; y <= h; y += step) {
      g.globalAlpha = y % major === 0 ? .14 : .05;
      g.beginPath(); g.moveTo(0, y + .5); g.lineTo(w, y + .5); g.stroke();
    }
    // 外枠
    const m = 10;
    g.globalAlpha = .55; g.lineWidth = 2;
    g.strokeRect(m, m, w - 2 * m, h - 2 * m);
    g.globalAlpha = .3; g.lineWidth = 1;
    g.strokeRect(m + 5, m + 5, w - 2 * m - 10, h - 2 * m - 10);
    // 四隅の合わせマーク
    g.strokeStyle = accent; g.globalAlpha = .8; g.lineWidth = 2;
    for (const [x, y] of [[m, m], [w - m, m], [m, h - m], [w - m, h - m]]) {
      g.beginPath(); g.arc(x, y, 9, 0, Math.PI * 2); g.stroke();
      g.beginPath(); g.moveTo(x - 16, y); g.lineTo(x + 16, y); g.moveTo(x, y - 16); g.lineTo(x, y + 16); g.stroke();
    }
    // 縁の目盛り
    g.strokeStyle = ink; g.globalAlpha = .4; g.lineWidth = 1;
    for (let x = m; x < w - m; x += step) {
      const L = (x - m) % major === 0 ? 8 : 4;
      g.beginPath(); g.moveTo(x, m); g.lineTo(x, m + L); g.moveTo(x, h - m); g.lineTo(x, h - m - L); g.stroke();
    }
    for (let y = m; y < h - m; y += step) {
      const L = (y - m) % major === 0 ? 8 : 4;
      g.beginPath(); g.moveTo(m, y); g.lineTo(m + L, y); g.moveTo(w - m, y); g.lineTo(w - m - L, y); g.stroke();
    }
  },
};

/** 画面の大きさの背景テクスチャ。なければ null */
export function backgroundTexture(name, w, h, colors) {
  if (!BACKGROUND[name]) return null;
  const [c, g] = canvas(Math.round(w), Math.round(h));
  BACKGROUND[name](g, c.width, c.height, colors);
  return toTexture(c);
}

/**
 * scene.background を模様にし、画面の大きさが変わったら描き直す。
 * 返り値の draw(w, h) で別の大きさに描き直せる（画像の書き出し用。引数なしで画面の大きさに戻す）
 */
export function applyBackground(scene, S, renderer) {
  if (!S.bgPattern) return null;
  const draw = (w, h) => {
    const pr = renderer.getPixelRatio();
    const old = scene.background;
    const tex = backgroundTexture(S.bgPattern, w ?? innerWidth * pr, h ?? innerHeight * pr,
      { bg: S.bgCss, ink: S.patternInk, accent: S.patternAccent });
    if (!tex) return;
    scene.background = tex;
    if (old && old.isTexture) old.dispose();
  };
  draw();
  addEventListener("resize", () => draw());
  return draw;
}
