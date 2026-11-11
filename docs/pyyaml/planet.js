// 1つのクラスを「惑星」（球面にゲートが並ぶ球）として組み立てる部品。
// class_sphere.html（1クラス）と system.html（惑星系）の両方から使う。
import * as THREE from "three";
import { CSS2DObject } from "three/addons/renderers/CSS2DRenderer.js";
import { sphereTexture } from "./textures.js?v=2";

// 色は theme.js（window.THEME）から取る。読み込まれていなければ元の配色
const T = window.THEME || null;
const S = T ? T.scene : { gateFill: 0x04142b, valueFill: 0x072040, valueFillMut: 0x3a2300, shell: 0x123a6a, shellOpacity: 1,
  coreInner: 0x03142c, coreRim: 0x3aa8f0, wirePulse: 0xbfefff, lineOpacity: 1 };
// 線の不透明度にテーマの倍率を掛ける（明るい背景では線が薄く見えるため）
const LO = o => Math.min(1, o * (S.lineOpacity ?? 1));
export const COLORS = T ? T.vis : { public: 0x55d8f0, internal: 0x2a9f94, private: 0x2f5a96 };
export const READ = T ? T.read : 0x4fb8e6, WRITE = T ? T.write : 0xffa53a, WIRE = T ? T.wire : 0x4a86d8;

export const gateRadius = lines => 9 + 2.6 * Math.sqrt(lines);

export function fibonacci(i, n) {
  // ソース順に北極から南極へ螺旋状に並べる
  const y = n === 1 ? 0 : 1 - 2 * (i + 0.5) / n;
  const r = Math.sqrt(1 - y * y);
  const t = i * Math.PI * (3 - Math.sqrt(5));
  return new THREE.Vector3(r * Math.cos(t), y, r * Math.sin(t));
}

export function basic(color, opacity = 1, extra = {}) {
  return new THREE.MeshBasicMaterial({ color, transparent: opacity < 1, opacity, side: THREE.DoubleSide, ...extra });
}

export function fresnelMaterial(inner, rim) {
  return new THREE.ShaderMaterial({
    transparent: true, depthWrite: false,
    uniforms: { inner: { value: new THREE.Color(inner) }, rim: { value: new THREE.Color(rim) },
                boost: { value: 1 } },
    vertexShader: `varying vec3 vN; varying vec3 vV;
      void main(){ vec4 mv = modelViewMatrix * vec4(position,1.0);
        vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }`,
    fragmentShader: `uniform vec3 inner; uniform vec3 rim; uniform float boost; varying vec3 vN; varying vec3 vV;
      void main(){ float f = pow(1.0 - max(dot(vN, vV), 0.0), 2.2);
        gl_FragColor = vec4(mix(inner, rim * boost, f), 0.35 + 0.55 * f); }`,
  });
}

function makeGate(gate) {
  const r = gateRadius(gate.lines);
  const color = COLORS[gate.vis];
  const g = new THREE.Group();
  g.add(new THREE.Mesh(new THREE.CircleGeometry(r, 48), basic(S.gateFill, .92)));
  const tube = gate.vis === "public" ? 1.5 : 1.1;
  if (gate.abstract) {
    const pts = new THREE.EllipseCurve(0, 0, r, r).getPoints(64).map(p => new THREE.Vector3(p.x, p.y, 0.5));
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),
      new THREE.LineDashedMaterial({ color, dashSize: 4, gapSize: 3 }));
    line.computeLineDistances();
    g.add(line);
  } else {
    const arc = gate.vis === "public" ? Math.PI * 2 - 1.1 : Math.PI * 2;
    const ring = new THREE.Mesh(new THREE.TorusGeometry(r, tube, 10, 72, arc), basic(color));
    ring.rotation.z = Math.PI / 2 + 0.55; // 切れ目を上（北）に向ける
    g.add(ring);
  }
  if (gate.dunder) g.add(new THREE.Mesh(new THREE.TorusGeometry(r + 5, 0.6, 8, 72), basic(color, .65)));
  // 目盛り: 10 行ごとに 1 本
  const n = Math.max(1, Math.round(gate.lines / 10));
  const seg = [];
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + (n > 18 ? 2 * Math.PI * i / n : (i - (n - 1) / 2) * 0.32);
    seg.push(new THREE.Vector3(Math.cos(a) * r * .55, Math.sin(a) * r * .55, 0.6),
             new THREE.Vector3(Math.cos(a) * r * .8, Math.sin(a) * r * .8, 0.6));
  }
  g.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(seg), new THREE.LineBasicMaterial({ color })));
  g.add(new THREE.Mesh(new THREE.SphereGeometry(Math.max(2.5, r * .18), 16, 12), basic(color)));
  return g;
}

function valueMesh(v) {
  const color = v.mutated ? WRITE : READ;
  const geo = v.kind === "property" ? new THREE.OctahedronGeometry(8)
            : v.kind === "classvar" ? new THREE.BoxGeometry(10, 10, 10)
            : new THREE.SphereGeometry(6, 20, 14);
  const m = new THREE.Mesh(geo, basic(v.mutated ? S.valueFillMut : S.valueFill));
  m.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo, 1), new THREE.LineBasicMaterial({ color })));
  if (v.kind === "field") m.add(new THREE.Mesh(new THREE.SphereGeometry(6.6, 20, 14), basic(color, .35, { wireframe: true })));
  return m;
}

export function slerpDir(a, b, t) {
  const dot = THREE.MathUtils.clamp(a.dot(b), -1, 1);
  const omega = Math.acos(dot);
  if (omega < 1e-4) return a.clone();
  if (Math.PI - omega < 1e-3) { // ほぼ反対側: 直交方向を経由する
    let mid = new THREE.Vector3(0, 1, 0).cross(a);
    if (mid.lengthSq() < 1e-6) mid = new THREE.Vector3(1, 0, 0).cross(a);
    mid.normalize();
    return t < .5 ? slerpDir(a, mid, t * 2) : slerpDir(mid, b, (t - .5) * 2);
  }
  const s = Math.sin(omega);
  return a.clone().multiplyScalar(Math.sin((1 - t) * omega) / s).add(b.clone().multiplyScalar(Math.sin(t * omega) / s));
}

function label(className, html, pos) {
  const d = document.createElement("div");
  d.className = className;
  d.innerHTML = html;
  const o = new CSS2DObject(d);
  o.position.copy(pos);
  return o;
}

/**
 * クラス C（data.js の classes の1要素）から惑星を作る。
 * 返り値: { C, group, R, coreR, valR, reach, core, gates, vpos, wires, spokes,
 *           gateWorld(name), valueWorld(name), setDetail(bool), setHover(gate|null), update(t, camera) }
 */
export function buildPlanet(C) {
  const group = new THREE.Group();
  const coreR = 46 + 2 * Math.sqrt(C.lines);
  const valR = coreR + 34;
  const radii = C.gates.map(g => gateRadius(g.lines));
  const gmax = Math.max(20, ...radii);
  const area = radii.reduce((s, r) => s + (r + 26) ** 2, 0);
  const R = Math.max(Math.sqrt(area / (4 * 0.42)), valR + gmax + 110);

  const shell = new THREE.Mesh(new THREE.SphereGeometry(R, 48, 32), basic(S.shell, Math.min(1, .035 * S.shellOpacity), { wireframe: true }));
  group.add(shell);
  // テーマによっては外殻に模様を貼る（半透明。ゲートは同じ半径の上に重なる）
  const skin = (pattern, radius, opacity, segs) => {
    const map = pattern && sphereTexture(pattern, S.patternInk, S.patternAccent);
    if (!map) return null;
    const m = new THREE.Mesh(new THREE.SphereGeometry(radius, segs, segs / 2),
      new THREE.MeshBasicMaterial({ map, transparent: true, opacity, depthWrite: false, side: THREE.FrontSide }));
    m.renderOrder = -1;
    return m;
  };
  const shellSkin = skin(S.shellPattern, R * 0.995, S.shellPatternOpacity ?? .5, 64);
  if (shellSkin) group.add(shellSkin);

  // コア
  const core = new THREE.Group();
  const coreMat = fresnelMaterial(S.coreInner, S.coreRim);
  const coreMesh = new THREE.Mesh(new THREE.SphereGeometry(coreR, 64, 48), coreMat);
  core.add(coreMesh);
  core.add(new THREE.Mesh(new THREE.IcosahedronGeometry(coreR * 1.13, 2), basic(S.coreRim, .08, { wireframe: true })));
  const tick = new THREE.Mesh(new THREE.TorusGeometry(coreR + 14, 2, 6, 120), basic(S.coreRim, .22));
  tick.rotation.x = Math.PI / 2;
  core.add(tick);
  const coreSkin = skin(S.corePattern, coreR * 1.02, S.corePatternOpacity ?? .6, 48);
  if (coreSkin) core.add(coreSkin);
  group.add(core);
  const coreLabel = label("core-lbl",
    `<div class="n">${C.name}</div><div class="s">${C.lines} lines · ${C.gates.length} gates · ${C.values.length} values</div>`,
    new THREE.Vector3());
  group.add(coreLabel);

  const detailLabels = [];

  // 値
  const vpos = {};
  C.values.forEach((v, i) => {
    const p = fibonacci(i, C.values.length).multiplyScalar(valR);
    const m = valueMesh(v);
    m.position.copy(p);
    group.add(m);
    vpos[v.name] = p;
    const l = label("vlbl" + (v.mutated ? " mut" : ""), v.name, p);
    group.add(l);
    detailLabels.push(l);
  });

  // ゲート
  const gates = {};
  C.gates.forEach((gate, i) => {
    const dir = fibonacci(i, C.gates.length);
    const g = makeGate(gate);
    g.position.copy(dir).multiplyScalar(R);
    g.lookAt(dir.clone().multiplyScalar(R * 2));
    group.add(g);
    const l = label(`lbl ${gate.vis}`, `${gate.name}<small>${gate.lines}</small>`,
      dir.clone().multiplyScalar(R + radii[i] + 14));
    group.add(l);
    detailLabels.push(l);
    gates[gate.name] = { dir, r: radii[i], mesh: g, label: l.element, data: gate, links: [] };
  });

  // 内向きの線: ゲート → 値
  const spokes = [];
  for (const s of C.spokes) {
    const G = gates[s.gate];
    if (!G || !vpos[s.value]) continue;
    const a = G.dir.clone().multiplyScalar(R - 2);
    const curve = new THREE.QuadraticBezierCurve3(a, G.dir.clone().multiplyScalar(valR * .6), vpos[s.value]);
    const color = s.op === "write" ? WRITE : READ;
    const base = LO(s.op === "write" ? .55 : .25);
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(32)),
      new THREE.LineBasicMaterial({ color, transparent: true, opacity: base }));
    line.userData.base = base;
    group.add(line);
    spokes.push(line);
    G.links.push(line);
  }

  // 外側の弧: 同じクラス内の呼び出し
  const wires = [];
  let reach = R + gmax;
  for (const w of C.wires) {
    const A = gates[w.from], B = gates[w.to];
    if (!A || !B) continue;
    const ang = Math.acos(THREE.MathUtils.clamp(A.dir.dot(B.dir), -1, 1));
    const h = 30 + ang * R * 0.33;
    reach = Math.max(reach, R + h);
    const pts = [];
    for (let k = 0; k <= 48; k++) {
      const t = k / 48;
      pts.push(slerpDir(A.dir, B.dir, t).normalize().multiplyScalar(R + 3 + h * Math.sin(Math.PI * t)));
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 64, 0.55, 6), basic(WIRE, LO(.55)));
    tube.userData.base = LO(.55);
    group.add(tube);
    const cone = new THREE.Mesh(new THREE.ConeGeometry(3.2, 9, 10), basic(WIRE, .9));
    cone.position.copy(curve.getPointAt(0.97));
    cone.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), curve.getTangentAt(0.97));
    group.add(cone);
    const pulse = new THREE.Mesh(new THREE.SphereGeometry(1.8, 10, 8), basic(S.wirePulse));
    group.add(pulse);
    wires.push({ curve, tube, cone, pulse, phase: Math.random(), speed: 0.12 + 40 / curve.getLength() });
    A.links.push(tube, cone, pulse);
    B.links.push(tube, cone, pulse);
  }

  // 脆弱性アラート（alerts.js があるときだけ）
  const alert = buildAlert(C, group, R, coreR, gates, coreLabel, coreMat);

  const planet = {
    C, group, R, coreR, valR, reach, core: coreMesh, coreMat, gates, vpos, wires, spokes, coreLabel, alert,
    detail: true, hovered: null,
    gateWorld(name) { return group.localToWorld(gates[name].dir.clone().multiplyScalar(R)); },
    valueWorld(name) { return group.localToWorld(vpos[name].clone()); },
    setDetail(on) {
      planet.detail = on;
      // CSS2DRenderer は毎フレーム display を書き換えるので、表示の切り替えは visible で行う
      for (const l of detailLabels) l.visible = on;
    },
    setHover(G) {
      planet.hovered = G;
      const all = [...wires.flatMap(w => [w.tube, w.cone, w.pulse]), ...spokes];
      for (const o of all) {
        o.material.transparent = true;
        o.material.opacity = G ? (G.links.includes(o) ? 1 : 0.06) : (o.userData.base ?? .9);
      }
      for (const g of Object.values(gates)) g.mesh.scale.setScalar(g === G ? 1.25 : 1);
    },
    update(t, camera) {
      for (const w of wires) w.pulse.position.copy(w.curve.getPointAt((w.phase + t * w.speed) % 1));
      if (alert) alert.update(t);
      if (!planet.detail) return;
      // 裏側のゲートのラベルは薄くする
      const toCam = camera.position.clone().sub(group.position).normalize();
      for (const g of Object.values(gates)) {
        g.label.style.opacity = g === planet.hovered ? 1 : (g.dir.dot(toCam) > -0.1 ? 1 : 0.18);
      }
    },
  };
  return planet;
}

// ---- 脆弱性アラート ----
// window.ALERTS（alerts.js）に載っているクラスとゲートに、役割の色の輪をかぶせて点滅させる。
// problem = 赤で速く点滅、path = 琥珀色でゆっくり脈打つ、fix = 緑で点灯（ほぼ一定）
export const ALERT_COLORS = { problem: 0xff3550, path: 0xffa53a, fix: 0x45f0a0 };
const ALERT_BLINK = {
  problem: t => 0.5 + 0.5 * Math.sin(t * 7),
  path: t => 0.5 + 0.5 * Math.sin(t * 2.2),
  fix: () => 0.85,
};

export function alertOf(cls, gate) {
  const c = window.ALERTS?.classes?.[cls];
  if (!c) return null;
  return gate === undefined ? c : c.gates?.[gate] || null;
}

function buildAlert(C, group, R, coreR, gates, coreLabel, coreMat) {
  const A = alertOf(C.name);
  if (!A) return null;
  const parts = [];  // { mats: [{m, lo, hi}], role }
  const add = (role, objs) => {
    const mats = objs.map(([o, lo, hi]) => { o.material.transparent = true; return { m: o.material, lo, hi }; });
    parts.push({ role, mats });
  };

  // 惑星全体: 殻を覆う網と、赤道の太い輪
  const color = ALERT_COLORS[A.role];
  const net = new THREE.Mesh(new THREE.SphereGeometry(R * 1.04, 40, 28), basic(color, .1, { wireframe: true, depthWrite: false }));
  const band = new THREE.Mesh(new THREE.TorusGeometry(R * 1.12, Math.max(2.5, R * 0.012), 8, 160), basic(color, .8, { depthWrite: false }));
  band.rotation.x = Math.PI / 2;
  const band2 = band.clone();
  band2.material = band.material.clone();
  band2.rotation.set(Math.PI / 2 + 0.5, 0.4, 0);
  group.add(net, band, band2);
  add(A.role, [[net, .02, .16], [band, .15, .95], [band2, .1, .7]]);

  // コアのラベルに印
  coreLabel.element.classList.add("alert", `alert-${A.role}`);
  const tag = document.createElement("div");
  tag.className = "a";
  tag.textContent = A.role === "problem" ? `⚠ ${window.ALERTS.id}` : A.role === "fix" ? `✓ fix ${window.ALERTS.fixedIn}` : `⚠ attack path`;
  coreLabel.element.appendChild(tag);

  // コアの縁の色: 問題のクラスは赤と元の色のあいだで揺らす
  const rim0 = coreMat.uniforms.rim.value.clone();
  const rimAlert = new THREE.Color(color);

  // ゲート
  for (const [name, G] of Object.entries(gates)) {
    const ga = alertOf(C.name, name);
    if (!ga) continue;
    const gc = ALERT_COLORS[ga.role];
    const ring = new THREE.Mesh(new THREE.TorusGeometry(G.r + 9, 2.4, 10, 72), basic(gc, .9, { depthWrite: false }));
    const glow = new THREE.Mesh(new THREE.CircleGeometry(G.r + 16, 48), basic(gc, .25, { depthWrite: false }));
    ring.position.z = glow.position.z = 1;
    G.mesh.add(ring, glow);
    add(ga.role, [[ring, .25, 1], [glow, .02, .3]]);
    G.label.classList.add("alert", `alert-${ga.role}`);
    G.alert = ga;
  }

  return {
    role: A.role, note: A.note,
    update(t) {
      for (const p of parts) {
        const k = ALERT_BLINK[p.role](t);
        for (const { m, lo, hi } of p.mats) m.opacity = lo + (hi - lo) * k;
      }
      if (A.role !== "fix") coreMat.uniforms.rim.value.copy(rim0).lerp(rimAlert, 0.35 + 0.65 * ALERT_BLINK[A.role](t));
    },
  };
}

/** ゲートの円盤（当たり判定用）の一覧と、当たったゲートを返す関数 */
export function gatePicker(planet) {
  const discs = Object.values(planet.gates).map(g => g.mesh.children[0]);
  return {
    discs,
    find(obj) { return Object.values(planet.gates).find(g => g.mesh.children[0] === obj) || null; },
  };
}

/** HTML の共通スタイル（ラベル類） */
export const LABEL_CSS = `
  .lbl { font: 11px var(--font-mono, Menlo, monospace); white-space: nowrap;
    text-shadow: 0 0 6px var(--shadow, #000), 0 0 2px var(--shadow, #000);
    transform: translateY(-18px); transition: opacity .15s; }
  .lbl small { display: block; font-size: 9.5px; opacity: .7; }
  .lbl.public { color: var(--lbl-public, #c9f5ff); } .lbl.internal { color: var(--lbl-internal, #8fe0d6); }
  .lbl.private { color: var(--lbl-private, #7fa6d8); }
  .vlbl { font: 10px var(--font-mono, Menlo, monospace); color: var(--vlbl, #b7e6ff); text-shadow: 0 0 4px var(--shadow, #000);
    transform: translateY(-12px); }
  .vlbl.mut { color: var(--vlbl-mut, #ffd08a); }
  .core-lbl { text-align: center; text-shadow: 0 0 10px var(--shadow, #000); pointer-events: none; }
  .core-lbl .n { font: 700 22px var(--font-display, Menlo, monospace); color: var(--core-n, #f0fbff); letter-spacing: 1px; }
  .core-lbl .s { font: 11px var(--font-mono, Menlo, monospace); color: var(--core-s, #8fd0ff); }
  .hide-labels .lbl, .hide-labels .vlbl { visibility: hidden; }
  /* 脆弱性アラート */
  @keyframes alertBlink { 0%, 100% { opacity: 1; } 50% { opacity: .35; } }
  .lbl.alert-problem { color: #ff6b7d; font-weight: 700; animation: alertBlink .9s infinite; }
  .lbl.alert-path { color: #ffc070; }
  .lbl.alert-fix { color: #7dffc0; }
  .lbl.alert-problem::before, .lbl.alert-path::before { content: "⚠ "; }
  .lbl.alert-fix::before { content: "✓ "; }
  .core-lbl .a { font: 700 12px var(--font-mono, Menlo, monospace); letter-spacing: 1px; margin-top: 2px; }
  .core-lbl.alert-problem .n { color: #ff8a98; }
  .core-lbl.alert-problem .a { color: #ff4d64; animation: alertBlink .9s infinite; }
  .core-lbl.alert-path .a { color: #ffb347; }
  .core-lbl.alert-fix .a { color: #5dffb0; }
`;
