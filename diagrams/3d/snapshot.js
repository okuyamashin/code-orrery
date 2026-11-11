// 今の視点の絵を、画面の大きさに関係なく決まった大きさ（既定は 4:3 の 1600×1200）で描き直して画像にする。
// ボタンや字幕などの HUD は写さない。惑星のラベル（CSS2D の HTML）は画面に出ているものだけを、
// キャンバスに文字として描き直して重ねる。
//
// 使い方: const snap = makeSnapshot({ renderer, composer, camera, scene, labelRenderer, redrawBackground });
//         const canvas = snap(1600, 1200);

function shadowOf(cs) {
  // "rgb(0, 0, 0) 0px 0px 6px, ..." の最初の影だけを使う
  const m = /(rgba?\([^)]*\)|#[0-9a-f]+)\s+(-?[\d.]+)px\s+(-?[\d.]+)px\s+([\d.]+)px/i.exec(cs.textShadow || "");
  return m ? { color: m[1], x: +m[2], y: +m[3], blur: +m[4] } : null;
}

function drawLabels(ctx, root, scale, rootRect) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const text = node.textContent;
    if (!text.trim()) continue;
    const el = node.parentElement;
    const cs = getComputedStyle(el);
    if (cs.visibility === "hidden") continue;
    // 先祖のどれかが非表示なら描かない。透明度は先祖の分も掛け合わせる
    let alpha = 1, hidden = false;
    for (let e = el; e && e !== root; e = e.parentElement) {
      const s = getComputedStyle(e);
      if (s.display === "none") { hidden = true; break; }
      alpha *= +s.opacity;
    }
    if (hidden || alpha < .01) continue;
    range.selectNodeContents(node);
    const r = range.getBoundingClientRect();
    if (!r.width) continue;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${parseFloat(cs.fontSize) * scale}px ${cs.fontFamily}`;
    if ("letterSpacing" in ctx) ctx.letterSpacing = `${(parseFloat(cs.letterSpacing) || 0) * scale}px`;
    ctx.fillStyle = cs.color;
    ctx.textBaseline = "middle";
    const sh = shadowOf(cs);
    if (sh) { ctx.shadowColor = sh.color; ctx.shadowBlur = sh.blur * scale; ctx.shadowOffsetX = sh.x * scale; ctx.shadowOffsetY = sh.y * scale; }
    const x = (r.left - rootRect.left) * scale, y = (r.top + r.height / 2 - rootRect.top) * scale;
    // 影を濃くするため 2 回描く（画面の text-shadow の重ねがけに近づける）
    ctx.fillText(text, x, y);
    if (sh) ctx.fillText(text, x, y);
    ctx.restore();
  }
}

export function makeSnapshot({ renderer, composer, camera, scene, labelRenderer, redrawBackground, beforeRender }) {
  return function snap(W = 1600, H = 1200) {
    const pr = renderer.getPixelRatio();
    const aspect = camera.aspect;
    // 縦の画角はそのままにして、横幅だけ 4:3 に合わせる（画面より細い・広い分は左右が変わる）
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(1);
    renderer.setSize(W, H, false); // 第 3 引数 false: 画面上のキャンバスの大きさ（CSS）は変えない
    composer.setPixelRatio?.(1);
    composer.setSize(W, H);
    redrawBackground?.(W, H);
    beforeRender?.();
    composer.render();

    const out = document.createElement("canvas");
    out.width = W; out.height = H;
    const ctx = out.getContext("2d");
    ctx.drawImage(renderer.domElement, 0, 0, W, H);

    // ラベル: 画面の高さを基準に、同じ見た目の比率で描く
    const scale = H / innerHeight;
    labelRenderer.setSize(W / scale, H / scale);
    labelRenderer.render(scene, camera);
    const root = labelRenderer.domElement;
    drawLabels(ctx, root, scale, root.getBoundingClientRect());

    // 元に戻す
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(pr);
    renderer.setSize(innerWidth, innerHeight, false);
    composer.setPixelRatio?.(pr);
    composer.setSize(innerWidth, innerHeight);
    labelRenderer.setSize(innerWidth, innerHeight);
    redrawBackground?.();
    composer.render();
    labelRenderer.render(scene, camera);
    return out;
  };
}

/** キャンバスを PNG としてクリップボードに入れる。ボタンを押した直後に呼ぶこと */
export async function copyCanvas(canvas) {
  if (!navigator.clipboard?.write || typeof ClipboardItem === "undefined") {
    throw new Error("このブラウザでは画像をクリップボードに入れられません");
  }
  // Safari はクリック直後に write を呼ぶ必要があるので、Blob は Promise のまま渡す
  const blob = new Promise((res, rej) => canvas.toBlob(b => b ? res(b) : rej(new Error("PNG にできませんでした")), "image/png"));
  await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
}

/** 画面の下に短いお知らせを出す */
export function toast(msg, ms = 2200) {
  let t = document.getElementById("toast");
  if (!t) {
    t = document.createElement("div");
    t.id = "toast";
    Object.assign(t.style, {
      position: "fixed", left: "50%", top: "60px", transform: "translateX(-50%)", zIndex: 50,
      background: "var(--panel)", color: "var(--fg)", border: "1px solid var(--accent)", borderRadius: "6px",
      padding: "8px 14px", font: "12px var(--font-mono)", transition: "opacity .3s", pointerEvents: "none",
    });
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.opacity = 1;
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.style.opacity = 0, ms);
}
