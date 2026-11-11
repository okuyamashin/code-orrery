// 見た目のテーマ（フォント・背景・色）。形はどのテーマでも同じで、ここでは色と書体だけを変える。
// "net" が元からの配色。ほかは試しの案。
// 選び方: URL の ?theme=名前 > 前回選んだもの（localStorage） > "net"
// ?render=1（動画書き出し）のときは URL で指定しない限り "net" を使う。
// <head> の中で普通の <script> として読み込み、window.THEME に入れる（ページの描画前に CSS 変数を当てるため）。
(function () {
  const NET = {
    label: "net (original)",
    fontsUrl: null,
    font: { ui: '-apple-system, "Hiragino Sans", sans-serif', mono: "Menlo, monospace", display: "Menlo, monospace" },
    css: {
      bg: "#02060f", fg: "#cfefff", muted: "#6f93bd", line: "#1b4f8a",
      title: "#e6f9ff", hi: "#e6fbff", accent: "#6fe8ff",
      btn: "rgba(6, 26, 51, .85)", btnSolid: "#061a33", panel: "rgba(3, 16, 34, .85)",
      playBg: "rgba(4, 30, 60, .78)", playHover: "rgba(10, 60, 110, .85)",
      glow: "rgba(80, 200, 255, .45)", glowIn: "rgba(80, 200, 255, .25)",
      capBg: "rgba(2, 14, 30, .78)", capLine: "#1f5c9c", capGlow: "rgba(40, 140, 255, .18)",
      capTitle: "#f0fbff", capSrc: "#5f8fbf", capText: "#dff5ff",
      mod: "#3d6fa8", shadow: "#000",
      lblPublic: "#c9f5ff", lblInternal: "#8fe0d6", lblPrivate: "#7fa6d8",
      vlbl: "#b7e6ff", vlblMut: "#ffd08a", coreN: "#f0fbff", coreS: "#8fd0ff",
    },
    scene: {
      bg: 0x02060f, stars: 0x9fd8ff, starOpacity: 1, lineOpacity: 1, grid: 0x0d2a52, gridOpacity: 1,
      shell: 0x123a6a, shellOpacity: 1,
      coreInner: 0x03142c, coreRim: 0x3aa8f0,
      gateFill: 0x04142b, valueFill: 0x072040, valueFillMut: 0x3a2300,
      wirePulse: 0xbfefff, linkPulse: 0xffffff,
      halo: [[0, "rgba(120,200,255,0.55)"], [0.25, "rgba(60,150,240,0.28)"], [0.6, "rgba(30,90,200,0.08)"], [1, "rgba(0,0,0,0)"]],
      haloAdditive: true, haloOpacity: .55,
      bloom: [0.6, 0.4, 0.28], toneMapping: "aces",
    },
    vis: { public: 0x55d8f0, internal: 0x2a9f94, private: 0x2f5a96 },
    read: 0x4fb8e6, write: 0xffa53a, wire: 0x4a86d8,
    link: { call: 0xb8f6ff, ctor: 0x5cf08a, impl: 0xff7ad9, super: 0x7ab8ff,
            override: 0xc99bff, read: 0x5fd4ff, write: 0xffb347, hold: 0x3cc6c8 },
    conduit: { outer: 0x0a3a78, mid: 0x2a8cf0, inner: 0xa8ecff, flow: 0xe6fbff, typecheck: 0xffb347 },
  };

  // 下の案は NET との差分だけを書く
  const VARIANTS = {
    // 琥珀色の古いブラウン管端末。読み = 淡い琥珀、書き = 赤
    phosphor: {
      label: "phosphor (amber CRT)",
      fontsUrl: "https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=VT323&display=swap",
      font: { ui: '"Share Tech Mono", Menlo, monospace', mono: '"Share Tech Mono", Menlo, monospace', display: '"VT323", "Share Tech Mono", monospace' },
      css: {
        bg: "#080502", fg: "#ffd9a0", muted: "#a8763c", line: "#5a3812",
        title: "#ffe8c2", hi: "#fff0d6", accent: "#ffb547",
        btn: "rgba(28, 16, 4, .85)", btnSolid: "#1c1004", panel: "rgba(20, 11, 2, .88)",
        playBg: "rgba(40, 22, 4, .8)", playHover: "rgba(80, 44, 8, .85)",
        glow: "rgba(255, 170, 60, .45)", glowIn: "rgba(255, 170, 60, .22)",
        capBg: "rgba(16, 9, 2, .82)", capLine: "#7a4a14", capGlow: "rgba(255, 150, 40, .16)",
        capTitle: "#fff0d6", capSrc: "#b9844a", capText: "#ffe2b8",
        mod: "#8a5a26", shadow: "#000",
        lblPublic: "#ffe2b0", lblInternal: "#e0a868", lblPrivate: "#a87a4a",
        vlbl: "#ffd38a", vlblMut: "#ff8a6a", coreN: "#fff0d6", coreS: "#e8a860",
      },
      scene: {
        bg: 0x080502, stars: 0xffcf9a, grid: 0x3a2206, shell: 0x5a3410,
        coreInner: 0x1a0c02, coreRim: 0xff9d3a,
        gateFill: 0x140a02, valueFill: 0x241404, valueFillMut: 0x3a0e06,
        wirePulse: 0xfff0d0, linkPulse: 0xfff4e0,
        halo: [[0, "rgba(255,190,110,0.5)"], [0.25, "rgba(240,140,50,0.26)"], [0.6, "rgba(180,80,20,0.08)"], [1, "rgba(0,0,0,0)"]],
        bloom: [0.75, 0.45, 0.25],
      },
      vis: { public: 0xffc46b, internal: 0xd98a3a, private: 0x8a5a2e },
      read: 0xf5c87a, write: 0xff5a3c, wire: 0xc07a30,
      link: { call: 0xffe6b8, ctor: 0x9dff7a, impl: 0xff6f7d, super: 0xffb35c,
              override: 0xe8a6ff, read: 0xffd27a, write: 0xff5a3c, hold: 0xd8c060 },
      conduit: { outer: 0x4a2408, mid: 0xd0761e, inner: 0xffd9a0, flow: 0xfff0d6, typecheck: 0xff5a3c },
    },

    // 深い紫の夜空にオーロラ色。幾何的な書体
    aurora: {
      label: "aurora (violet / mint)",
      fontsUrl: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=JetBrains+Mono:wght@400;700&display=swap",
      font: { ui: '"Space Grotesk", -apple-system, sans-serif', mono: '"JetBrains Mono", Menlo, monospace', display: '"Space Grotesk", -apple-system, sans-serif' },
      css: {
        bg: "#07041a", fg: "#e2dcff", muted: "#8a7fc0", line: "#3a2a7a",
        title: "#f4f0ff", hi: "#f6f2ff", accent: "#7cf7d4",
        btn: "rgba(22, 12, 54, .85)", btnSolid: "#160c36", panel: "rgba(14, 8, 38, .86)",
        playBg: "rgba(26, 14, 66, .78)", playHover: "rgba(50, 28, 110, .85)",
        glow: "rgba(124, 247, 212, .4)", glowIn: "rgba(160, 120, 255, .25)",
        capBg: "rgba(12, 6, 34, .8)", capLine: "#4a3496", capGlow: "rgba(150, 100, 255, .2)",
        capTitle: "#f6f2ff", capSrc: "#9a8ad0", capText: "#ece6ff",
        mod: "#6a58b0", shadow: "#000",
        lblPublic: "#c8fff0", lblInternal: "#a8ccff", lblPrivate: "#9a86d8",
        vlbl: "#b8ecff", vlblMut: "#ffc89a", coreN: "#f6f2ff", coreS: "#c0a8ff",
      },
      scene: {
        bg: 0x07041a, stars: 0xd6c8ff, grid: 0x24145a, shell: 0x3a2480,
        coreInner: 0x12062a, coreRim: 0xb07cff,
        gateFill: 0x0e0626, valueFill: 0x140c3a, valueFillMut: 0x3a1a10,
        wirePulse: 0xe8fff8, linkPulse: 0xffffff,
        halo: [[0, "rgba(190,150,255,0.5)"], [0.25, "rgba(120,90,240,0.26)"], [0.6, "rgba(60,200,180,0.07)"], [1, "rgba(0,0,0,0)"]],
        bloom: [0.7, 0.5, 0.25],
      },
      vis: { public: 0x7cf7d4, internal: 0x5aa9ff, private: 0x6b4fb8 },
      read: 0x6fe3ff, write: 0xff9f5a, wire: 0x9a7cff,
      link: { call: 0xe0d4ff, ctor: 0x6dffb0, impl: 0xff6ec7, super: 0x8fa8ff,
              override: 0xd49bff, read: 0x6fe3ff, write: 0xff9f5a, hold: 0x4fe0c8 },
      conduit: { outer: 0x2a1470, mid: 0x8a5cff, inner: 0xd8c8ff, flow: 0xf0fff8, typecheck: 0xff9f5a },
    },

    // 明るい紙に青インクの製図。光らせずに線で見せる
    paper: {
      label: "paper (blueprint ink)",
      fontsUrl: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;600;700&family=IBM+Plex+Mono:wght@400;600;700&display=swap",
      font: { ui: '"IBM Plex Sans", -apple-system, sans-serif', mono: '"IBM Plex Mono", Menlo, monospace', display: '"IBM Plex Sans", -apple-system, sans-serif' },
      css: {
        bg: "#f3efe4", fg: "#1d2a40", muted: "#6b7690", line: "#b8c2d4",
        title: "#0f1c33", hi: "#0f1c33", accent: "#1d4e89",
        btn: "rgba(255, 252, 244, .9)", btnSolid: "#fffcf4", panel: "rgba(255, 252, 244, .92)",
        playBg: "rgba(255, 252, 244, .92)", playHover: "rgba(230, 236, 246, .95)",
        glow: "rgba(29, 78, 137, .18)", glowIn: "rgba(29, 78, 137, .06)",
        capBg: "rgba(255, 252, 244, .92)", capLine: "#9fb0c9", capGlow: "rgba(29, 42, 64, .12)",
        capTitle: "#0f1c33", capSrc: "#6b7690", capText: "#1d2a40",
        mod: "#8f9ab0", shadow: "#f3efe4",
        lblPublic: "#14335c", lblInternal: "#1f6b60", lblPrivate: "#6b7690",
        vlbl: "#2a5a94", vlblMut: "#c0441e", coreN: "#0f1c33", coreS: "#3a5a86",
      },
      scene: {
        bg: 0xf3efe4, stars: 0x6a7488, starOpacity: .8, lineOpacity: 2.2, grid: 0x8090aa, gridOpacity: 3,
        shell: 0x5a6c8a, shellOpacity: 2.2,
        coreInner: 0xf6f3ea, coreRim: 0x1d4e89,
        gateFill: 0xfbf9f3, valueFill: 0xeef2f8, valueFillMut: 0xfbe6dc,
        wirePulse: 0x1d2a40, linkPulse: 0x1d2a40,
        halo: [[0, "rgba(29,78,137,0.10)"], [0.3, "rgba(29,78,137,0.05)"], [1, "rgba(29,78,137,0)"]],
        haloAdditive: false, haloOpacity: 1,
        bloom: null, toneMapping: "none",
      },
      // 紙の上では線が薄く見えるので、どれも濃いめのインクにする
      vis: { public: 0x0f3366, internal: 0x16594f, private: 0x5a6478 },
      read: 0x1a4f8f, write: 0xb8381a, wire: 0x2e5486,
      link: { call: 0x1c2638, ctor: 0x1d7a3c, impl: 0xa01f5e, super: 0x1f4fae,
              override: 0x5c30a0, read: 0x16699a, write: 0xb8381a, hold: 0x15767a },
      conduit: { outer: 0xa9bcda, mid: 0x3a68b8, inner: 0x0f3366, flow: 0x0a1a33, typecheck: 0xb8661a },
    },

    // 墨の黒と白、赤だけを差し色に（書き換え・暗黙の呼び出し）
    sumi: {
      label: "sumi (mono + red)",
      fontsUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=IBM+Plex+Mono:wght@400;600&display=swap",
      font: { ui: '"Inter", -apple-system, sans-serif', mono: '"IBM Plex Mono", Menlo, monospace', display: '"Inter", -apple-system, sans-serif' },
      css: {
        bg: "#0a0a0b", fg: "#e6e6e6", muted: "#8a8a8a", line: "#3a3a3a",
        title: "#ffffff", hi: "#ffffff", accent: "#ff4a3d",
        btn: "rgba(22, 22, 24, .88)", btnSolid: "#161618", panel: "rgba(16, 16, 18, .9)",
        playBg: "rgba(20, 20, 22, .85)", playHover: "rgba(44, 44, 48, .9)",
        glow: "rgba(255, 74, 61, .35)", glowIn: "rgba(255, 255, 255, .08)",
        capBg: "rgba(12, 12, 13, .85)", capLine: "#444", capGlow: "rgba(255, 255, 255, .06)",
        capTitle: "#ffffff", capSrc: "#8a8a8a", capText: "#ededed",
        mod: "#5a5a5a", shadow: "#000",
        lblPublic: "#f2f2f2", lblInternal: "#b0b0b0", lblPrivate: "#707070",
        vlbl: "#cfcfcf", vlblMut: "#ff6a5c", coreN: "#ffffff", coreS: "#a0a0a0",
      },
      scene: {
        bg: 0x0a0a0b, stars: 0xd0d0d0, starOpacity: .7, grid: 0x262626, shell: 0x4a4a4a,
        coreInner: 0x111112, coreRim: 0xe8e8e8,
        gateFill: 0x0e0e0f, valueFill: 0x1a1a1c, valueFillMut: 0x3a0c08,
        wirePulse: 0xffffff, linkPulse: 0xffffff,
        halo: [[0, "rgba(255,255,255,0.32)"], [0.25, "rgba(200,200,200,0.14)"], [0.6, "rgba(120,120,120,0.04)"], [1, "rgba(0,0,0,0)"]],
        bloom: [0.45, 0.35, 0.35],
      },
      vis: { public: 0xf2f2f2, internal: 0xa8a8a8, private: 0x5c5c5c },
      read: 0xbdbdbd, write: 0xff3b30, wire: 0x7a7a7a,
      link: { call: 0xe6e6e6, ctor: 0xffffff, impl: 0xff8a7a, super: 0x9a9a9a,
              override: 0x6e6e6e, read: 0xbdbdbd, write: 0xff3b30, hold: 0x8a8a8a },
      conduit: { outer: 0x2a2a2a, mid: 0x8a8a8a, inner: 0xf0f0f0, flow: 0xffffff, typecheck: 0xff3b30 },
    },
  };

  // paper を土台に、球へ装甲板の模様を半透明で貼った機械的な製図
  VARIANTS.mech = {
    label: "mech (drafting + plating)",
    fontsUrl: "https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;700&family=IBM+Plex+Mono:wght@400;600&display=swap",
    font: { ui: '"Chakra Petch", -apple-system, sans-serif', mono: '"IBM Plex Mono", Menlo, monospace', display: '"Chakra Petch", -apple-system, sans-serif' },
    css: {
      bg: "#e9e7df", fg: "#202833", muted: "#646c78", line: "#a2a9b3",
      title: "#11161d", hi: "#11161d", accent: "#e0601c",
      btn: "rgba(246, 245, 240, .92)", btnSolid: "#f6f5f0", panel: "rgba(246, 245, 240, .94)",
      playBg: "rgba(246, 245, 240, .94)", playHover: "rgba(255, 236, 222, .96)",
      glow: "rgba(224, 96, 28, .22)", glowIn: "rgba(224, 96, 28, .06)",
      capBg: "rgba(246, 245, 240, .94)", capLine: "#8a929e", capGlow: "rgba(32, 40, 51, .14)",
      capTitle: "#11161d", capSrc: "#646c78", capText: "#202833",
      mod: "#7f8794", shadow: "#e9e7df",
      lblPublic: "#11161d", lblInternal: "#2f4a5c", lblPrivate: "#6a7280",
      vlbl: "#244a70", vlblMut: "#c2410c", coreN: "#11161d", coreS: "#3d4a5c",
    },
    scene: {
      bg: 0xe9e7df, bgCss: "#e9e7df", bgPattern: "drafting",
      patternInk: "#2a3442", patternAccent: "#e0601c",
      shellPattern: "plating", shellPatternOpacity: .5,
      corePattern: "gear", corePatternOpacity: .75,
      stars: 0x6a7488, starOpacity: .5, lineOpacity: 2.2,
      grid: 0x7a8494, gridOpacity: 1.3, shell: 0x4a5566, shellOpacity: .5,
      coreInner: 0xeceae3, coreRim: 0x2b3442,
      gateFill: 0xf4f2ec, valueFill: 0xe3e6ea, valueFillMut: 0xf6dccb,
      wirePulse: 0xe0601c, linkPulse: 0x202833,
      halo: [[0, "rgba(42,52,66,0.06)"], [0.4, "rgba(42,52,66,0.02)"], [1, "rgba(42,52,66,0)"]],
      haloAdditive: false, haloOpacity: 1,
      bloom: null, toneMapping: "none",
    },
    vis: { public: 0x1f2a38, internal: 0x3d5a6e, private: 0x7d8794 },
    read: 0x2f5f8a, write: 0xd9531e, wire: 0x48586c,
    link: { call: 0x1f2a38, ctor: 0x2f7a4a, impl: 0xb83a5a, super: 0x34609e,
            override: 0x6a4c9a, read: 0x2f6f9a, write: 0xd9531e, hold: 0x2f7c7c },
    conduit: { outer: 0xb9c0c9, mid: 0x5b6878, inner: 0x1f2a38, flow: 0xe0601c, typecheck: 0xd9531e },
  };

  const merge = (a, b) => {
    const o = { ...a };
    for (const [k, v] of Object.entries(b || {})) {
      o[k] = v && typeof v === "object" && !Array.isArray(v) && a[k] && typeof a[k] === "object" ? merge(a[k], v) : v;
    }
    return o;
  };
  const THEMES = { net: NET };
  for (const [k, v] of Object.entries(VARIANTS)) THEMES[k] = merge(NET, v);

  const q = new URLSearchParams(location.search);
  let saved = null;
  try { saved = localStorage.getItem("orrery-theme"); } catch (e) { /* 使えない環境では無視 */ }
  let name = q.get("theme") || (q.has("render") ? null : saved) || "net";
  if (!THEMES[name]) name = "net";
  const T = { ...THEMES[name], name, all: THEMES };

  // CSS 変数として当てる（camelCase → --kebab-case）
  const kebab = s => s.replace(/[A-Z]/g, c => "-" + c.toLowerCase());
  const vars = Object.entries(T.css).map(([k, v]) => `--${kebab(k)}: ${v};`)
    .concat(Object.entries(T.font).map(([k, v]) => `--font-${k}: ${v};`));
  document.write(`<style id="theme-vars">:root { ${vars.join(" ")} }</style>`);
  if (T.fontsUrl) {
    document.write(`<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` +
                   `<link rel="stylesheet" href="${T.fontsUrl}">`);
  }

  T.hex = n => "#" + n.toString(16).padStart(6, "0");
  // テーマを選び直す: 覚えてから同じページを読み直す（色は組み立て時に決まるため）
  T.choose = next => {
    try { localStorage.setItem("orrery-theme", next); } catch (e) { /* 無視 */ }
    const u = new URL(location.href);
    u.searchParams.set("theme", next);
    location.href = u.toString();
  };
  // テーマ選択の <select> を作る
  T.mountPicker = parent => {
    const s = document.createElement("select");
    s.setAttribute("aria-label", "theme");
    s.title = "theme";
    for (const [k, v] of Object.entries(THEMES)) {
      const o = document.createElement("option");
      o.value = k; o.textContent = v.label;
      s.appendChild(o);
    }
    s.value = name;
    s.onchange = () => T.choose(s.value);
    parent.appendChild(s);
    return s;
  };
  // ページ間のリンクにテーマを引き継ぐ（localStorage が使えないときのため）
  T.carry = a => {
    if (name === "net" && !q.get("theme")) return;
    const u = new URL(a.getAttribute("href"), location.href);
    u.searchParams.set("theme", name);
    a.href = u.toString();
  };
  window.THEME = T;
})();
