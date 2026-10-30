// Kabaad Gang character kit. Every character shares the same face construction (eyes, brows, mouth),
// the same outline colour and the same soft-gradient shading, so the gang reads as one universe.
const OUT = "#2a2f45";

function eye(cx, cy, r, mode, look = 0) {
  if (mode === "wink") return `<path d="M${cx - r} ${cy + 4} Q${cx} ${cy + r * .6} ${cx + r} ${cy + 4}" stroke="${OUT}" stroke-width="8" fill="none" stroke-linecap="round"/>`;
  const pr = mode === "angry" ? r * .5 : r * .62;
  return `<ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r * 1.12}" fill="url(#eyeW)" stroke="${OUT}" stroke-width="3"/>
  <circle cx="${cx + look}" cy="${cy + 4}" r="${pr}" fill="url(#iris)"/><circle cx="${cx + look}" cy="${cy + 4}" r="${pr * .48}" fill="#14090a"/>
  <circle cx="${cx + look + pr * .42}" cy="${cy - pr * .3}" r="${pr * .32}" fill="#fff"/>`;
}
function brows(cx, cy, gap, mode) {
  const L = cx - gap, R = cx + gap, w = 28;
  if (mode === "angry") return `<path d="M${L - w} ${cy - 12} L${L + w} ${cy + 10}" stroke="${OUT}" stroke-width="9" stroke-linecap="round"/><path d="M${R - w} ${cy + 10} L${R + w} ${cy - 12}" stroke="${OUT}" stroke-width="9" stroke-linecap="round"/>`;
  return `<path d="M${L - w} ${cy} Q${L} ${cy - 14} ${L + w} ${cy}" stroke="${OUT}" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M${R - w} ${cy} Q${R} ${cy - 14} ${R + w} ${cy}" stroke="${OUT}" stroke-width="8" fill="none" stroke-linecap="round"/>`;
}
function mouth(cx, cy, w, mode) {
  if (mode === "angry") return `<path d="M${cx - w} ${cy + 10} Q${cx} ${cy - 10} ${cx + w} ${cy + 10}" stroke="#5a1f1f" stroke-width="7" fill="none" stroke-linecap="round"/>`;
  if (mode === "open") return `<path d="M${cx - w} ${cy} Q${cx} ${cy + w * 1.3} ${cx + w} ${cy} Z" fill="#7a2a2a" stroke="#5a1f1f" stroke-width="5"/><path d="M${cx - w * .5} ${cy + w * .55} Q${cx} ${cy + w * .3} ${cx + w * .5} ${cy + w * .55}" fill="#e26b6b"/>`;
  return `<path d="M${cx - w} ${cy} Q${cx} ${cy + w * .9} ${cx + w} ${cy}" stroke="#5a1f1f" stroke-width="7" fill="#b8423b" stroke-linecap="round"/>`;
}
function face(cx, cy, opt = {}) {
  const gap = opt.gap || 48, r = opt.r || 28, mode = opt.mode || "happy";
  const blush = `<ellipse cx="${cx - gap - 14}" cy="${cy + r + 10}" rx="22" ry="12" fill="url(#blush)"/><ellipse cx="${cx + gap + 14}" cy="${cy + r + 10}" rx="22" ry="12" fill="url(#blush)"/>`;
  return blush + eye(cx - gap, cy, r, mode === "wink" ? "wink" : mode, opt.look || 0) + eye(cx + gap, cy, r, mode === "wink" ? "happy" : mode, opt.look || 0)
    + brows(cx, cy - r - 18, gap, mode) + mouth(cx, cy + r + 30, opt.mw || 26, opt.mouth || (mode === "angry" ? "angry" : "smile"));
}
function arm(x1, y1, cx, cy, x2, y2, col, edge, hand) {
  return `<path d="M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2}" stroke="${edge}" stroke-width="34" fill="none" stroke-linecap="round"/>
  <path d="M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2}" stroke="${col}" stroke-width="26" fill="none" stroke-linecap="round"/>
  <circle cx="${x2}" cy="${y2}" r="22" fill="${hand}" stroke="${edge}" stroke-width="3"/>`;
}
function legs(x1, x2, top, col, edge, shoe) {
  const leg = x => `<rect x="${x - 22}" y="${top}" width="44" height="${742 - top}" rx="20" fill="${col}" stroke="${edge}" stroke-width="3"/><path d="M${x - 40} 742q40 -24 78 0v12h-78z" fill="${shoe}"/>`;
  return leg(x1) + leg(x2);
}
const shadow = (w = 190) => `<ellipse cx="300" cy="760" rx="${w}" ry="26" fill="url(#shadow)"/>`;

const GANG = {
  botal: (m = "happy") => `${shadow(150)}${legs(255, 345, 640, "#cfe9f7", "#7fb8d8", "#1d5f8a")}
    <path d="M262 118 h76 v44 q0 22 28 44 q60 46 60 120 v300 q0 52 -52 52 h-148 q-52 0 -52 -52 v-300 q0 -74 60 -120 q28 -22 28 -44 z" fill="url(#pet)" stroke="#6fb0d6" stroke-width="4"/>
    <path d="M188 520 q112 18 224 0 v120 q0 40 -40 40 h-144 q-40 0 -40 -40 z" fill="#8fd0f0" opacity=".55"/>
    <path d="M206 262 q-18 120 -6 330" stroke="#fff" stroke-width="14" fill="none" stroke-linecap="round" opacity=".7"/>
    <rect x="176" y="430" width="248" height="74" fill="#2f9a3c"/><text x="300" y="478" text-anchor="middle" font-family="Poppins" font-weight="800" font-size="30" fill="#fff" letter-spacing="2">PET · 1</text>
    <path d="M254 92 h92 v30 h-92 z" fill="#1d5f8a"/><path d="M250 86 q50 -34 100 0 v8 h-100 z" fill="#2f86b8"/><path d="M346 88 q44 -2 62 14 q-30 6 -62 6 z" fill="#1d5f8a"/>
    <g transform="translate(0 0)"><rect x="238" y="70" width="52" height="22" rx="10" fill="#232946"/><rect x="310" y="70" width="52" height="22" rx="10" fill="#232946"/><rect x="288" y="76" width="24" height="6" fill="#232946"/></g>
    ${arm(196, 400, 130, 430, 118, 500, "#cfe9f7", "#7fb8d8", "#e7f5fc")}${arm(404, 400, 470, 360, 500, 300, "#cfe9f7", "#7fb8d8", "#e7f5fc")}
    ${face(300, 300, { gap: 46, r: 26, mode: m, look: 4 })}`,

  tinku: (m = "happy") => `${shadow(170)}${legs(250, 350, 650, "#c8ced6", "#8a929c", "#3b4250")}
    <rect x="170" y="190" width="260" height="470" rx="34" fill="url(#steel)" stroke="#7d8692" stroke-width="4"/>
    <ellipse cx="300" cy="192" rx="130" ry="30" fill="#e3e7ec" stroke="#7d8692" stroke-width="4"/><ellipse cx="300" cy="192" rx="104" ry="20" fill="#c7cdd5"/>
    <path d="M300 186 q36 -30 60 -10 q-10 22 -46 22" fill="none" stroke="#8a929c" stroke-width="10" stroke-linecap="round"/>
    <rect x="170" y="430" width="260" height="70" fill="#d3212c"/><text x="300" y="477" text-anchor="middle" font-family="Poppins" font-weight="800" font-size="30" fill="#fff" letter-spacing="3">STEEL</text>
    <path d="M196 560 q20 18 6 40" stroke="#8a929c" stroke-width="6" fill="none"/><path d="M392 236 q-18 16 -6 34" stroke="#8a929c" stroke-width="6" fill="none"/>
    <path d="M184 214 q-8 200 0 430" stroke="#fff" stroke-width="12" fill="none" opacity=".55" stroke-linecap="round"/>
    <rect x="166" y="232" width="268" height="26" rx="6" fill="#3fae49"/>
    ${arm(178, 390, 100, 400, 96, 300, "#c8ced6", "#8a929c", "#e3e7ec")}<circle cx="128" cy="356" r="24" fill="#c8ced6" stroke="#8a929c" stroke-width="3"/>
    ${arm(422, 390, 500, 400, 504, 300, "#c8ced6", "#8a929c", "#e3e7ec")}<circle cx="472" cy="356" r="24" fill="#c8ced6" stroke="#8a929c" stroke-width="3"/>
    ${face(300, 318, { gap: 48, r: 26, mode: m })}`,

  mobile: (m = "happy") => `${shadow(140)}${legs(262, 338, 668, "#3a4058", "#232946", "#1a1d2b")}
    <path d="M410 610 q70 20 60 80 q-8 40 40 56" stroke="${OUT}" stroke-width="10" fill="none" stroke-linecap="round"/><rect x="494" y="732" width="40" height="30" rx="6" fill="#f3f3f3" stroke="${OUT}" stroke-width="4"/>
    <rect x="190" y="110" width="220" height="580" rx="44" fill="url(#phone)" stroke="#1a1d2b" stroke-width="5"/>
    <rect x="248" y="86" width="22" height="34" rx="8" fill="#1a1d2b"/>
    <rect x="214" y="150" width="172" height="230" rx="16" fill="url(#screen)"/>
    <path d="M300 150 l-20 60 l30 26 l-26 70 M310 236 l52 -20" stroke="#fff" stroke-width="3" fill="none" opacity=".75"/>
    ${[0, 1, 2].map(r => [0, 1, 2].map(c => `<rect x="${226 + c * 54}" y="${410 + r * 62}" width="42" height="44" rx="10" fill="#5a6385" stroke="#1a1d2b" stroke-width="2"/>`).join("")).join("")}
    <rect x="252" y="600" width="96" height="30" rx="12" fill="#3fae49"/>
    ${arm(196, 430, 130, 460, 120, 530, "#3a4058", "#1a1d2b", "#5a6385")}${arm(404, 430, 470, 420, 488, 352, "#3a4058", "#1a1d2b", "#5a6385")}
    ${face(300, 240, { gap: 40, r: 22, mode: m, mw: 22 })}
    <g fill="none" stroke="#c9a227" stroke-width="5"><circle cx="260" cy="246" r="30"/><circle cx="340" cy="246" r="30"/><path d="M290 246 h20"/></g>`,

  tel: (m = "happy") => `${shadow(150)}${legs(258, 342, 650, "#f2c94c", "#c99a1e", "#8a4b1e")}
    <path d="M262 120 h76 v56 q0 18 30 36 q62 38 62 110 v290 q0 50 -50 50 h-160 q-50 0 -50 -50 v-290 q0 -72 62 -110 q30 -18 30 -36 z" fill="url(#glass)" stroke="#d4a12a" stroke-width="4"/>
    <path d="M200 380 q100 -26 200 0 v270 q0 26 -26 26 h-148 q-26 0 -26 -26 z" fill="url(#oil)"/>
    <rect x="252" y="92" width="96" height="40" rx="10" fill="#8a4b1e"/>
    <path d="M232 150 q-60 30 -76 140 q-10 80 30 140 q-6 -110 40 -190 q40 -60 150 -60 q60 0 90 30 q-10 -60 -60 -70 q-80 -14 -174 10 z" fill="#e5489b" opacity=".92"/>
    <path d="M188 300 q-10 60 0 120" stroke="#f7a8cf" stroke-width="6" fill="none"/>
    <circle cx="300" cy="238" r="7" fill="#d3212c"/>
    <rect x="206" y="470" width="188" height="70" rx="10" fill="#fff8e6" stroke="#d4a12a" stroke-width="3"/><text x="300" y="515" text-anchor="middle" font-family="Poppins" font-weight="800" font-size="28" fill="#8a4b1e" letter-spacing="2">UCO</text>
    ${arm(200, 420, 130, 450, 126, 520, "#f2c94c", "#c99a1e", "#f7dc85")}${arm(400, 420, 466, 450, 470, 520, "#f2c94c", "#c99a1e", "#f7dc85")}
    ${face(300, 300, { gap: 44, r: 25, mode: m })}`,

  dump: (m = "angry") => `${shadow(250)}
    <path d="M70 720 q-20 -140 60 -230 q20 -120 120 -150 q60 -90 160 -40 q110 10 130 120 q90 70 70 190 q20 60 -20 110 z" fill="url(#heap)" stroke="#2b2b1c" stroke-width="5"/>
    <rect x="96" y="560" width="60" height="96" rx="20" transform="rotate(-24 126 608)" fill="#8fd0f0" opacity=".9"/>
    <path d="M430 470 l90 -18 l18 70 l-92 20 z" fill="#f3efe3" stroke="#bdb39a" stroke-width="3"/>
    <rect x="420" y="600" width="70" height="80" rx="10" fill="#b9c0c9" stroke="#7d8692" stroke-width="3"/>
    <path d="M200 660 q30 -60 70 -10 q-30 20 -70 10 z" fill="#f2c94c"/>
    <path d="M330 690 q40 -30 90 0" stroke="#5a3b1e" stroke-width="12" fill="none" stroke-linecap="round"/>
    <path d="M226 250 l-30 -90 l60 70 z M380 250 l40 -86 l-10 92 z" fill="#3b3b28" stroke="#2b2b1c" stroke-width="4"/>
    ${[[150, 230], [470, 260], [520, 420], [110, 420], [300, 150]].map(([x, y]) => `<g><circle cx="${x}" cy="${y}" r="7" fill="#232946"/><ellipse cx="${x - 7}" cy="${y - 9}" rx="7" ry="4" fill="#fff" opacity=".8"/><ellipse cx="${x + 7}" cy="${y - 9}" rx="7" ry="4" fill="#fff" opacity=".8"/></g>`).join("")}
    <g><ellipse cx="300" cy="380" rx="70" ry="64" fill="#fff9d6" stroke="${OUT}" stroke-width="5"/><circle cx="300" cy="392" r="34" fill="#d3212c"/><circle cx="300" cy="392" r="16" fill="#14090a"/><circle cx="314" cy="378" r="9" fill="#fff"/>
    <path d="M222 316 L378 344" stroke="${OUT}" stroke-width="14" stroke-linecap="round"/></g>
    <path d="M200 500 q100 70 200 0 q-10 60 -100 70 q-90 -10 -100 -70 z" fill="#3a1a1a" stroke="${OUT}" stroke-width="5"/>
    ${[0, 1, 2, 3, 4].map(i => `<path d="M${228 + i * 38} 506 l16 26 l16 -24 z" fill="#fff9d6"/>`).join("")}`,
};

function raja(head) { return RAJA.replace("{{HEAD}}", head); }
