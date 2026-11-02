const WA = "6282136822110"; // nomor WhatsApp toko
const PRICE = { A5: { 100: 89000, 200: 119000 }, B5: { 100: 109000, 200: 149000 } }; // harga per buku
const DIM = { A5: "14,8 × 21 cm", B5: "17,6 × 25 cm" };
const rp = n => "Rp" + n.toLocaleString("id-ID");
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const esc = s => s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const PAL = [["Lilac Pink", "#c9b6ff", "#ffe3ef"], ["Peach Cream", "#ffc9a8", "#fff3e4"], ["Mint Fresh", "#a8e6cf", "#f1fff8"], ["Sky Blue", "#a9d4ff", "#eef7ff"], ["Butter Yellow", "#ffe08a", "#fffbe8"], ["Berry Rose", "#ff9fb8", "#fff0f4"]];
const PAT = ["Kotak", "Titik", "Garis"];
const TILE = ["#e8749a", "#7aa7e8", "#f2b84b", "#8ccf9f", "#b08ae0", "#ef8a62"];
const ICONS = ["Bintang", "Love", "Bulan"];
const FL = ["Peony", "Sakura", "Lavender"], FLT = [1, 4, 5];
const PAPER = ["Bergaris", "Polos"];
const INK = "#4a3a40";
function tiles(str, cy, maxW, size) {
  const L = [...str.toUpperCase()].slice(0, 12), n = L.length || 1, w = Math.min(size * 1.1, maxW / n), x0 = 150 - n * w / 2;
  const fonts = ["Fredoka", "Georgia", "Courier New", "Trebuchet MS", "Comic Sans MS"];
  return L.map((c, i) => c == " " ? "" : `<g transform="rotate(${(i % 3 - 1) * 4} ${x0 + i * w + w / 2} ${cy})"><rect x="${x0 + i * w + 1}" y="${cy - w * .75}" width="${w - 2}" height="${w * 1.3}" rx="2" fill="${i % 2 ? "#fff" : TILE[i % 6] + "33"}" stroke="${TILE[i % 6]}" stroke-width=".8"/><text x="${x0 + i * w + w / 2}" y="${cy + w * .3}" font-size="${w * .95}" font-weight="700" font-family="${fonts[i % 5]},sans-serif" text-anchor="middle" fill="${TILE[(i + 2) % 6]}">${esc(c)}</text></g>`).join("");
}
const paperSVG = p => `<svg viewBox="0 0 150 100" role="img" aria-label="Contoh isi kertas ${PAPER[p]}"><path d="M6 4h118l20 20v72H6z" fill="#fffdf8" stroke="#e0d3cc" stroke-width="1.5"/><path d="M124 4v20h20" fill="#f3e8e2" stroke="#e0d3cc" stroke-width="1.5"/>${p == 0 ? [34, 46, 58, 70, 82].map(y => `<path d="M14 ${y}H136" stroke="#bcd4ee" stroke-width="1.3"/>`).join("") + `<path d="M26 8V94" stroke="#f3a8b8" stroke-width="1.2"/>` : `<path d="M60 62q8-8 16 0t16 0" stroke="#e9dfd8" stroke-width="1.5" fill="none"/>`}</svg>`;
const petals = (n, rx, ry, off, c, o = .75, st = "none") => [...Array(n)].map((_, i) => `<ellipse cx="0" cy="${-off}" rx="${rx}" ry="${ry}" fill="${c}" opacity="${o}" stroke="${st}" stroke-width=".7" transform="rotate(${i * 360 / n})"/>`).join("");
function flw(t, x, y, s = 1, r = 0) {
  const leaf = `<ellipse cx="-20" cy="14" rx="11" ry="4" fill="#8fcf9f" opacity=".7" transform="rotate(-35 -20 14)"/><ellipse cx="20" cy="16" rx="11" ry="4" fill="#79c08c" opacity=".7" transform="rotate(35 20 16)"/>`;
  let g = "";
  if (t == 1) g = leaf + petals(8, 11, 16, 14, "#f6a8c0") + petals(6, 8, 11, 8, "#ee86a8") + `<circle r="5" fill="#f9d36b"/>`;
  if (t == 2) g = leaf + petals(5, 13, 13, 10, "#e8668c", .8) + `<circle r="12" fill="#d94b78" opacity=".85"/><path d="M-6 -2a7 7 0 0 1 12 0M-4 3a4 4 0 0 1 8 0" stroke="#fbd0dc" stroke-width="1.6" fill="none"/>`;
  if (t == 3) g = leaf + petals(12, 4.5, 12, 13, "#fff", .95, "#d9cfd6") + `<circle r="6.5" fill="#f7c948"/>`;
  if (t == 4) g = leaf + petals(5, 10, 11, 11, "#ffc4d8", .9) + `<circle r="3.5" fill="#f27da3"/><circle cx="4" cy="-4" r="1.5" fill="#f9d36b"/><circle cx="-4" cy="-3" r="1.5" fill="#f9d36b"/>`;
  if (t == 5) g = `<path d="M0 32Q-5 0 0 -34" stroke="#7fb58f" stroke-width="2.2" fill="none"/>` + [-30, -22, -14, -6, 2, 10].map((yy, i) => `<ellipse cx="${i % 2 ? 5 : -5}" cy="${yy}" rx="3.6" ry="6" fill="${i % 2 ? "#a98be0" : "#b9a2ea"}" opacity=".85" transform="rotate(${i % 2 ? 25 : -25} 0 ${yy})"/>`).join("") + `<ellipse cx="0" cy="-36" rx="3" ry="6" fill="#a98be0" opacity=".85"/>`;
  return `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})">${g}</g>`;
}
const starPts = (R, r) => [...Array(10)].map((_, i) => { const a = Math.PI / 5 * i - Math.PI / 2, d = i % 2 ? r : R; return `${(Math.cos(a) * d).toFixed(1)},${(Math.sin(a) * d).toFixed(1)}`; }).join(" ");
function icon(t, x, y, s = 1) {
  const g = [
    `<polygon points="${starPts(40, 17)}" fill="#ffd34d" stroke="#e5a91c" stroke-width="2" stroke-linejoin="round"/><polygon points="${starPts(22, 9)}" fill="#ffe88f" opacity=".8"/>`,
    `<path d="M0 34C-52 -4-26 -42 0 -16C26 -42 52 -4 0 34Z" fill="#f46f95" stroke="#d94872" stroke-width="2" stroke-linejoin="round"/><path d="M-22 -18q8-8 16-2" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7"/>`,
    `<path d="M14 -34A38 38 0 1 0 14 34A40 40 0 0 1 14 -34Z" fill="#ffe08a" stroke="#e5b23c" stroke-width="2" stroke-linejoin="round"/><polygon points="${starPts(11, 5)}" transform="translate(26 -14)" fill="#ffd34d"/><polygon points="${starPts(7, 3)}" transform="translate(30 16)" fill="#ffd34d"/>`][t];
  return `<g transform="translate(${x} ${y}) scale(${s})">${g}</g>`;
}
const filters = id => `<filter id="w${id}" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency=".03" numOctaves="3" seed="4"/><feDisplacementMap in="SourceGraphic" scale="14"/><feGaussianBlur stdDeviation="2"/></filter><filter id="f${id}" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency=".05" numOctaves="3" seed="9"/><feDisplacementMap in="SourceGraphic" scale="5"/><feGaussianBlur stdDeviation=".6"/></filter>`;
const photoG = o => o.photo && o.kind != 4 ? `<g transform="rotate(-6 70 330)"><rect x="20" y="266" width="106" height="118" fill="#fff" stroke="#e6d9cf"/><clipPath id="cp${o.id}"><rect x="27" y="273" width="92" height="84"/></clipPath><image href="${o.photo}" x="27" y="273" width="92" height="84" preserveAspectRatio="xMidYMid slice" clip-path="url(#cp${o.id})"/><rect x="48" y="258" width="46" height="15" fill="#ffd6e4" opacity=".9"/></g>` : "";
function frame(o, defs, body) {
  const pg = o.pages == 200 ? 12 : 6;
  return `<svg viewBox="0 0 ${300 + pg + 6} 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cover buku ${esc(o.name)}"><defs>${defs}<clipPath id="cc${o.id}"><rect width="300" height="400" rx="10"/></clipPath></defs><rect x="294" y="8" width="${pg + 8}" height="384" rx="3" fill="#fffdf8" stroke="#e6d9cf"/><g clip-path="url(#cc${o.id})">${body}${photoG(o)}<rect width="18" height="400" fill="#000" opacity=".1"/></g></svg>`;
}
function classic(o) {
  const id = o.id, [, a, b] = PAL[o.pal];
  const pats = [`<rect width="60" height="60" fill="${b}"/><rect width="30" height="30" fill="${a}"/><rect x="30" y="30" width="30" height="30" fill="${a}"/>`,
    `<rect width="40" height="40" fill="${b}"/><circle cx="10" cy="10" r="6" fill="${a}"/><circle cx="30" cy="30" r="6" fill="${a}"/>`,
    `<rect width="40" height="40" fill="${b}"/><rect width="20" height="40" fill="${a}"/>`][o.pat];
  const sz = o.pat == 0 ? 60 : 40, words = (o.sub || "").split(" "), h = Math.ceil(words.length / 2);
  const l1 = words.slice(0, h).join(" "), l2 = words.slice(h).join(" ");
  const defs = `<pattern id="p${id}" width="${sz}" height="${sz}" patternUnits="userSpaceOnUse">${pats}</pattern>`;
  const body = `<rect width="300" height="400" fill="url(#p${id})"/><rect width="300" height="400" fill="#fff" opacity=".12"/>
<g transform="rotate(-3 150 150)"><path d="M38 52 L120 40 L205 50 L262 44 L266 140 L260 236 L268 262 L190 258 L110 266 L40 256 L46 160Z" fill="#fffdf8" stroke="#dcd2d8"/>
${[78, 96, 114, 132, 150, 168, 186, 204, 222].map(y => `<path d="M46 ${y}H262" stroke="#cfe0f5" stroke-width="1"/>`).join("")}
<circle cx="225" cy="78" r="9" fill="#ffe27a"/><path d="M225 62v-6M225 94v6M209 78h-6M241 78h6" stroke="#ffcf3d" stroke-width="2.5" stroke-linecap="round"/>
<path d="M62 62l3 7 7 1-6 5 2 7-6-4-6 4 2-7-6-5 7-1z" fill="#f2b84b"/>
${tiles(o.name || "Nama", 112, 214, 34)}${tiles("Journal", 160, 160, 22)}
<rect x="96" y="184" width="108" height="56" fill="#ffc2d4" transform="rotate(2 150 212)"/>
<text x="150" y="208" text-anchor="middle" font-family="Fredoka,sans-serif" font-size="12" font-weight="600" fill="${INK}">${esc(l1.toUpperCase())}</text><text x="150" y="226" text-anchor="middle" font-family="Fredoka,sans-serif" font-size="12" font-weight="600" fill="${INK}">${esc(l2.toUpperCase())}</text></g>
${icon(o.ic, 222, 318, 1.1)}`;
  return frame(o, defs, body);
}
const twig = (x, y, r, L) => `<g transform="translate(${x} ${y}) rotate(${r})"><path d="M0 0Q${L * .15} ${-L / 2} 0 ${-L}" stroke="#79b08a" stroke-width="2.2" fill="none" stroke-linecap="round"/>${[1, 2, 3, 4].map(i => { const sx = i % 2 ? 11 : -11, yy = -L * i / 5; return `<ellipse cx="${sx}" cy="${yy}" rx="11" ry="4.5" fill="#8fcf9f" opacity=".75" transform="rotate(${i % 2 ? -30 : 30} ${sx} ${yy})"/>`; }).join("")}</g>`;
const WASH = [["#ffd1e0", "#f6b3ca", "#cfe8cf"], ["#ffdfe9", "#ffc9b8", "#ece3d8"], ["#dccfff", "#c3b3f2", "#cfe8d8"]], ACC = ["#e8749a", "#e58aa8", "#8e74cf"];
function bouquet(k) {
  if (k == 0) return [[40, 220, 18, 120], [150, 14, 160, 80], [272, 392, -22, 130], [196, 392, 8, 100], [14, 340, 62, 80]].map(t => twig(...t)).join("") + [[62, 72, 2], [134, 38, 1.3], [26, 170, 1.45], [244, 330, 2.2], [178, 376, 1.4], [278, 238, 1.35]].map(f => flw(1, ...f)).join("");
  if (k == 1) return `<path d="M306 18Q224 36 172 108Q142 150 100 152" stroke="#8a6a5a" stroke-width="4.5" fill="none" stroke-linecap="round"/><path d="M-6 322Q58 334 112 396" stroke="#8a6a5a" stroke-width="4" fill="none" stroke-linecap="round"/>`
    + [[270, 30, 1.5], [232, 52, 1.25], [198, 84, 1.5], [172, 116, 1.15], [142, 142, 1.3], [258, 72, 1], [26, 330, 1.4], [66, 350, 1.25], [102, 382, 1.45], [44, 298, 1]].map(f => flw(4, f[0], f[1], f[2], (f[0] * 7) % 72)).join("")
    + [[80, 200], [240, 190], [210, 275], [40, 255], [272, 300]].map(([x, y], i) => `<ellipse cx="${x}" cy="${y}" rx="5" ry="7" fill="#ffc4d8" opacity=".8" transform="rotate(${i * 40} ${x} ${y})"/>`).join("");
  return [[40, 372, 2.2, -18], [84, 376, 2.5, -6], [130, 372, 2.1, 8], [200, 376, 2.4, -10], [248, 372, 2.2, 10], [282, 372, 2, 22], [36, 28, 1.8, 172], [92, 8, 1.5, 186], [262, 24, 1.7, 190]].map(f => flw(5, ...f)).join("");
}
function floral(o) {
  const id = o.id, k = o.fl, w = WASH[k], n = [...(o.name || "Nama")].length, fs = Math.min(44, 190 / (n * .5));
  const body = `<rect width="300" height="400" fill="#fffaf4"/>
<g filter="url(#w${id})" opacity=".7"><circle cx="40" cy="50" r="90" fill="${w[0]}"/><circle cx="270" cy="350" r="100" fill="${w[1]}"/><circle cx="260" cy="40" r="60" fill="${w[2]}"/><circle cx="30" cy="360" r="60" fill="${w[2]}"/></g>
<g filter="url(#f${id})">${bouquet(k)}</g>
<rect x="42" y="148" width="216" height="108" rx="16" fill="#fffdf8" opacity=".9" stroke="#eadfd6"/>
<text x="150" y="205" text-anchor="middle" font-family="Georgia,'Times New Roman',serif" font-style="italic" font-size="${fs.toFixed(1)}" fill="${INK}">${esc(o.name || "Nama")}</text>
<path d="M96 222h108" stroke="${ACC[k]}" stroke-width="1.4"/>
<text x="150" y="242" text-anchor="middle" font-family="Georgia,'Times New Roman',serif" font-style="italic" font-size="12" fill="#85727a">${esc(o.sub || "")}</text>`;
  return frame(o, filters(id), body);
}
const T = (x, y, s, z, f, ff = "Georgia,serif", ex = "") => `<text x="${x}" y="${y}" text-anchor="middle" font-family="${ff}" font-size="${z}" fill="${f}" ${ex}>${esc(String(s))}</text>`;
const spark = (x, y, r, c = "#fff") => `<path d="M${x} ${y - r}Q${x} ${y} ${x + r} ${y}Q${x} ${y} ${x} ${y + r}Q${x} ${y} ${x - r} ${y}Q${x} ${y} ${x} ${y - r}Z" fill="${c}"/>`;
const SCR = "'Brush Script MT','Segoe Script','Snell Roundhand',cursive";
const TH = [[], [], ["Putri Dongeng", "Pulau Tropis", "Sekolah Sihir", "Wonderland"], ["Butterfly", "Botanical", "Celestial"], ["Rose", "Lilac", "Midnight"]];
const AES = [{ bg: "#6b2037", band: "#f1e2c8", gold: "#c9a45a", acc: "#d9a3b8", line: "#e7b9c6" }, { bg: "#1f4036", band: "#efe4cf", gold: "#d4b062", acc: "#a9cfa0", line: "#9cc7a8" }, { bg: "#1d2650", band: "#efe4cf", gold: "#d4b062", acc: "#b9b6ea", line: "#9aa6e0" }];
function ornate(o, c) {
  const id = o.id, rep = (n, f) => [...Array(n)].map((_, i) => f(i)).join("");
  const dots = rep(11, i => `<circle cx="${60 + i * 18}" cy="35" r="2.4" fill="${c.gold}"/><circle cx="${60 + i * 18}" cy="365" r="2.4" fill="${c.gold}"/>`) + rep(15, i => `<circle cx="35" cy="${55 + i * 20}" r="2.4" fill="${c.gold}"/><circle cx="265" cy="${55 + i * 20}" r="2.4" fill="${c.gold}"/>`);
  const corner = (x, y) => `<g transform="translate(${x} ${y})">${petals(8, 6, 10, 9, c.acc, .95)}<circle r="4.5" fill="${c.gold}"/></g>`;
  return `<rect width="300" height="400" fill="${c.bg}"/><rect x="22" y="22" width="256" height="356" rx="22" fill="${c.band}"/>${dots}<rect x="48" y="48" width="204" height="304" rx="14" fill="${c.bg}"/><rect x="48" y="48" width="204" height="304" rx="14" fill="url(#l${id})"/><rect x="52" y="52" width="196" height="296" rx="11" fill="none" stroke="${c.gold}" stroke-width="1.6"/>${corner(34, 34)}${corner(266, 34)}${corner(34, 366)}${corner(266, 366)}`;
}
function carto(cy, w, h, name, sub, c) {
  const n = [...(name || "Nama")].length, fs = Math.min(24, (w - 30) / (n * .8));
  return `<rect x="${150 - w / 2}" y="${cy - h / 2}" width="${w}" height="${h}" rx="16" fill="${c.band}" stroke="${c.gold}" stroke-width="2.5"/><rect x="${150 - w / 2 + 5}" y="${cy - h / 2 + 5}" width="${w - 10}" height="${h - 10}" rx="12" fill="none" stroke="${c.gold}" stroke-width=".8"/>${T(150, cy - 2, (name || "Nama").toUpperCase(), fs.toFixed(1), c.bg, "Georgia,serif", 'letter-spacing="2" font-weight="700"')}<path d="M${150 - w / 3} ${cy + 6}H${150 + w / 3}" stroke="${c.gold}" stroke-width="1"/>${T(150, cy + 22, sub || "", 11.5, c.bg, "Georgia,serif", 'font-style="italic"')}`;
}
function bfly(x, y, s, id) {
  const up = "M0 0C-30 -52 -92 -62 -108 -30C-114 -6 -78 18 0 8Z", lo = "M0 6C-62 14 -90 42 -72 72C-56 92 -18 72 0 30Z";
  const half = `<path d="${up}" fill="url(#bw${id})" stroke="#2c1a22" stroke-width=".8"/><path d="${lo}" fill="url(#bw${id})" stroke="#2c1a22" stroke-width=".8"/><path d="M-10 4Q-50 -10 -88 -26M-10 10Q-50 20 -70 56M-6 0Q-36 -30 -70 -46" stroke="#f2c9a0" stroke-width=".8" fill="none" opacity=".7"/><circle cx="-62" cy="-8" r="4" fill="#f4d9b8"/><circle cx="-48" cy="38" r="3.5" fill="#f4d9b8"/>`;
  return `<g transform="translate(${x} ${y}) scale(${s})"><g fill="#f3dcc9" stroke="#f3dcc9" stroke-width="10" stroke-linejoin="round"><path d="${up}"/><path d="${lo}"/><path d="${up}" transform="scale(-1 1)"/><path d="${lo}" transform="scale(-1 1)"/></g>${half}<g transform="scale(-1 1)">${half}</g><ellipse cx="0" cy="22" rx="5" ry="30" fill="#3a2430"/><path d="M-2 -8Q-14 -30 -26 -34M2 -8Q14 -30 26 -34" stroke="#3a2430" stroke-width="2" fill="none"/></g>`;
}
function aesth(o) {
  const id = o.id, k = o.th || 0, c = AES[k];
  const defs = `<pattern id="l${id}" width="22" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0H22M0 0V22" stroke="${c.line}" stroke-width="1" opacity=".45"/></pattern><linearGradient id="bw${id}" x1="0" x2="-110" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#2e1a22"/><stop offset=".45" stop-color="#6b2d26"/><stop offset=".8" stop-color="#e8873a"/><stop offset="1" stop-color="#f4b35a"/></linearGradient>`;
  let mid = "";
  if (k == 0) mid = carto(112, 160, 64, o.name, o.sub, c) + bfly(150, 238, .8, id);
  if (k == 1) mid = [...Array(14)].map((_, i) => { const a = i * 360 / 14, r = a * Math.PI / 180; return twig((150 + 82 * Math.cos(r)).toFixed(1), (200 + 108 * Math.sin(r)).toFixed(1), a + 180, 46); }).join("") + carto(200, 128, 70, o.name, o.sub, c) + spark(150, 96, 8, c.gold) + spark(150, 304, 8, c.gold);
  if (k == 2) mid = `${[...Array(16)].map((_, i) => { const a = i * Math.PI / 8; return `<path d="M${(150 + 62 * Math.cos(a)).toFixed(1)} ${(128 + 62 * Math.sin(a)).toFixed(1)}L${(150 + 74 * Math.cos(a)).toFixed(1)} ${(128 + 74 * Math.sin(a)).toFixed(1)}" stroke="${c.gold}" stroke-width="1.6"/>`; }).join("")}<path d="M156 80A52 52 0 1 0 156 176A44 44 0 0 1 156 80Z" fill="${c.gold}"/>${[[84, 84, 7], [216, 100, 9], [90, 176, 6], [214, 168, 7]].map(s => spark(...s, c.gold)).join("")}${carto(236, 160, 64, o.name, o.sub, c)}${[0, 1, 2, 3, 4].map(i => `<circle cx="${90 + i * 30}" cy="306" r="10" fill="${c.gold}"/><circle cx="${90 + i * 30 + (i - 2) * 8}" cy="306" r="10" fill="${c.bg}"/>`).join("")}`;
  return frame(o, defs, ornate(o, c) + mid);
}
function princess(o) {
  const id = o.id, n = (o.sub ? o.sub + ", " : "") + (o.name || "Nama"), fs = Math.min(15, 140 / (n.length * .5));
  const ring = [...Array(36)].map((_, i) => { const a = i * Math.PI / 18; return `<circle cx="${(150 + 128 * Math.cos(a)).toFixed(1)}" cy="${(200 + 176 * Math.sin(a)).toFixed(1)}" r="15" fill="${i % 2 ? "#c9a064" : "#8f6236"}"/>`; }).join("");
  const body = `<rect width="300" height="400" fill="#a87c4c"/>${ring}<ellipse cx="150" cy="200" rx="112" ry="158" fill="#f3e3d3"/>
<g clip-path="url(#pc${id})"><ellipse cx="150" cy="168" rx="86" ry="92" fill="#1e1618"/>${[[74, 232], [226, 232], [84, 262], [216, 262]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="20" fill="#1e1618"/>`).join("")}
<path d="M50 360Q58 262 150 252Q242 262 250 360Z" fill="#5a1f2c"/><rect x="132" y="222" width="36" height="42" fill="#f8dcc8"/><path d="M96 262Q150 304 204 262Q192 286 150 294Q108 286 96 262Z" fill="#f6ece0"/>${[112, 128, 144, 160, 176, 192].map(x => `<circle cx="${x}" cy="278" r="2.6" fill="#fff"/>`).join("")}
<ellipse cx="150" cy="178" rx="52" ry="60" fill="#fbe3d2"/><path d="M96 170Q100 112 150 108Q200 112 204 170Q182 138 150 140Q118 138 96 170Z" fill="#1e1618"/>
<ellipse cx="128" cy="184" rx="9.5" ry="12" fill="#2a1c20"/><ellipse cx="172" cy="184" rx="9.5" ry="12" fill="#2a1c20"/><circle cx="125" cy="179" r="3.5" fill="#fff"/><circle cx="169" cy="179" r="3.5" fill="#fff"/>
<path d="M115 166Q128 160 140 165M160 165Q172 160 185 166" stroke="#2a1c20" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M150 190Q146 202 152 204" stroke="#d9a58e" stroke-width="2" fill="none" stroke-linecap="round"/>
<ellipse cx="118" cy="204" rx="9" ry="5" fill="#f4a9a0" opacity=".6"/><ellipse cx="182" cy="204" rx="9" ry="5" fill="#f4a9a0" opacity=".6"/><path d="M138 216Q150 212 162 216Q150 230 138 216Z" fill="#c4263f"/>
<path d="M122 114L128 96L138 106L150 90L162 106L172 96L178 114Z" fill="#e6c168" stroke="#b8923e"/>
<g transform="translate(212 318)">${petals(6, 11, 13, 10, "#c4263f", .92)}<circle r="8" fill="#9e1a30"/></g>${T(150, 334, n, fs.toFixed(1), "#f6ece0", "Georgia,serif", 'font-style="italic"')}</g>`;
  return frame(o, `<clipPath id="pc${id}"><ellipse cx="150" cy="200" rx="112" ry="158"/></clipPath>`, body);
}
function island(o) {
  const id = o.id, nm = o.name || "Nama", fs = Math.min(34, 100 / ([...nm].length * .5));
  const hib = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})">${petals(5, 12, 17, 15, "#f3a05a", .92)}${petals(5, 5, 9, 7, "#f9cf98", .95)}<circle r="4" fill="#fdf0c8"/></g>`;
  const plum = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})">${petals(5, 11, 15, 13, c, .9)}<circle r="4.5" fill="#eaf8f6"/></g>`;
  const leaf = (x, y, r, s, c) => `<ellipse cx="${x}" cy="${y}" rx="${14 * s}" ry="${5.5 * s}" fill="${c}" transform="rotate(${r} ${x} ${y})"/>`;
  const defs = `<linearGradient id="sea${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfeaf0"/><stop offset="1" stop-color="#5fbdd0"/></linearGradient><clipPath id="oc${id}"><ellipse cx="100" cy="120" rx="76" ry="96"/></clipPath>`;
  const body = `<rect width="300" height="400" fill="#f7f2e8"/>${[[236, 28, 20, "#5fbdd0"], [182, 34, -40, "#3aa0b5"], [262, 120, 70, "#7fcf9c"], [150, 250, 30, "#5fbdd0"]].map(l => leaf(l[0], l[1], l[2], 1.3, l[3])).join("")}
<ellipse cx="100" cy="120" rx="84" ry="104" fill="none" stroke="#2fa3b5" stroke-width="9" stroke-dasharray="10 7"/><ellipse cx="100" cy="120" rx="76" ry="96" fill="url(#sea${id})"/>
<g clip-path="url(#oc${id})"><circle cx="130" cy="70" r="22" fill="#fde9a8"/><path d="M0 150Q40 138 80 150T160 150T240 150V240H0Z" fill="#8fd6e2"/><path d="M0 176Q40 164 80 176T160 176T240 176V240H0Z" fill="#3aa0b5"/><path d="M62 160Q100 182 140 160L132 172Q100 186 70 172Z" fill="#1f6f80"/><path d="M100 160V92" stroke="#1f6f80" stroke-width="3"/><path d="M104 96Q134 120 132 156L104 156Z" fill="#f7f2e8"/><path d="M96 104Q74 126 70 156L96 156Z" fill="#fdf0c8"/></g>
${hib(232, 76, 1.2)}${plum(226, 164, 1, "#6fcad6")}${plum(60, 262, .8, "#8fd9c4")}
<ellipse cx="205" cy="300" rx="74" ry="74" fill="#d3f0e4" stroke="#3bbf9a" stroke-width="8" stroke-dasharray="9 6"/>${[46, 32, 18].map(r => `<circle cx="205" cy="300" r="${r}" fill="none" stroke="#f3a05a" stroke-width="5"/>`).join("")}<circle cx="205" cy="300" r="6" fill="#f3a05a"/>
${leaf(40, 230, -60, 1.2, "#3aa0b5")}${leaf(70, 232, 50, 1.1, "#7fcf9c")}${hib(46, 318, .8)}
<text x="26" y="368" font-family="${SCR}" font-size="${fs.toFixed(1)}" font-weight="700" fill="#2fa3b5">${esc(nm)}</text><text x="26" y="388" font-family="Georgia,serif" font-size="11" font-style="italic" fill="#3aa0b5">${esc(o.sub || "")}</text>`;
  return frame(o, defs, body);
}
function magic(o) {
  const id = o.id, nm = o.name || "Nama", ttl = o.sub || "Magic Academy", tf = Math.min(26, 240 / (ttl.length * .5));
  let cur = "M0 0H300V30"; for (let x = 300; x > 0; x -= 30) cur += `Q${x - 15} 56 ${x - 30} 30`; cur += "Z";
  const defs = `<linearGradient id="sk${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4a597"/><stop offset=".5" stop-color="#d7a1c8"/><stop offset=".8" stop-color="#4b2c4a"/></linearGradient>`;
  const tw = [28, 96, 164, 232].map(x => `<rect x="${x}" y="346" width="40" height="54" fill="#6b3a35"/><path d="M${x - 4} 346L${x + 20} 318L${x + 44} 346Z" fill="#8a4a3e"/><rect x="${x + 14}" y="360" width="12" height="16" rx="6" fill="#f3d58a"/>`).join("");
  const cl = [...Array(9)].map((_, i) => `<circle cx="${14 + i * 34}" cy="${326 + (i % 2) * 6}" r="17" fill="#b9a6d0" stroke="#8d79ab" stroke-width="2"/><circle cx="${14 + i * 34}" cy="${326 + (i % 2) * 6}" r="8" fill="none" stroke="#e5dcf2" stroke-width="2"/>`).join("");
  const body = `<rect width="300" height="400" fill="url(#sk${id})"/><path d="${cur}" fill="#8e5a8c"/><circle cx="150" cy="180" r="66" fill="#f0eaf7"/>${[52, 36, 20].map(r => `<circle cx="150" cy="180" r="${r}" fill="none" stroke="#cfc3e6" stroke-width="4"/>`).join("")}
${[[40, 90, 9], [255, 110, 11], [60, 240, 8], [250, 250, 9], [200, 80, 7], [100, 74, 6]].map(s => spark(...s)).join("")}${T(150, 168, ttl, tf.toFixed(1), "#e0556f", SCR, 'font-weight="700"')}
${cl}${tw}<rect x="70" y="268" width="160" height="40" rx="12" fill="#fff" stroke="#c9b8d6" stroke-width="2"/>${T(150, 282, "This book belongs to:", 9, "#6b5a70", "Arial,sans-serif")}${T(150, 301, nm, 16, "#3b2540", SCR, 'font-weight="700"')}${[[30, 380, 7], [150, 392, 6], [270, 382, 7]].map(s => spark(...s, "#f3d58a")).join("")}`;
  return frame(o, defs, body);
}
function wonder(o) {
  const id = o.id, nm = (o.name || "Nama") + "'s Wonderland", fs = Math.min(15, 200 / ([...nm].length * .55));
  const defs = `<pattern id="ck${id}" width="40" height="40" patternUnits="userSpaceOnUse"><rect width="40" height="40" fill="#fdf3e6"/><rect width="20" height="20" fill="#7cc4bc"/><rect x="20" y="20" width="20" height="20" fill="#7cc4bc"/></pattern>`;
  const tick = [...Array(12)].map((_, i) => { const a = i * Math.PI / 6, s = Math.sin(a), c = Math.cos(a); return `<path d="M${(150 + 40 * s).toFixed(1)} ${(112 - 40 * c).toFixed(1)}L${(150 + 46 * s).toFixed(1)} ${(112 - 46 * c).toFixed(1)}" stroke="#8a6a3a" stroke-width="2.4"/>`; }).join("");
  const shroom = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-7" y="-4" width="14" height="26" rx="5" fill="#f7ead6"/><path d="M-30 0Q0 -44 30 0Z" fill="#d94a5a"/><circle cx="-10" cy="-12" r="4" fill="#fff"/><circle cx="8" cy="-18" r="4.5" fill="#fff"/><circle cx="16" cy="-6" r="3" fill="#fff"/></g>`;
  const body = `<rect width="300" height="400" fill="#cfe8e3"/><rect y="290" width="300" height="110" fill="url(#ck${id})"/>${T(150, 36, o.sub || "Down the rabbit hole", 15, "#2f7d78", "Georgia,serif", 'font-style="italic"')}
<circle cx="150" cy="52" r="7" fill="none" stroke="#c9a45a" stroke-width="3"/><circle cx="150" cy="112" r="56" fill="#fffaf0" stroke="#c9a45a" stroke-width="6"/>${tick}<path d="M150 112L132 96M150 112L180 104" stroke="#3b2a2a" stroke-width="3.5" stroke-linecap="round"/><circle cx="150" cy="112" r="4" fill="#d94a5a"/>
<g transform="rotate(-14 62 200)"><rect x="37" y="163" width="50" height="74" rx="6" fill="#fff" stroke="#d94a5a" stroke-width="2"/><path d="M62 216C34 194 46 176 62 190C78 176 90 194 62 216Z" fill="#d94a5a"/></g>
<g transform="rotate(12 238 205)"><rect x="213" y="168" width="50" height="74" rx="6" fill="#fff" stroke="#2b2b3a" stroke-width="2"/><path d="M238 186C262 206 252 222 238 214C224 222 214 206 238 186ZM238 214L232 228H244Z" fill="#2b2b3a"/></g>
<ellipse cx="150" cy="276" rx="56" ry="9" fill="#fff" stroke="#e07a9a" stroke-width="2"/><path d="M110 236Q112 276 150 276Q188 276 190 236Z" fill="#fff" stroke="#e07a9a" stroke-width="2.5"/><path d="M190 242Q216 242 210 262Q204 274 186 268" fill="none" stroke="#e07a9a" stroke-width="3"/><path d="M114 250H186M116 262H184" stroke="#f4b6c8" stroke-width="3"/>
<path d="M140 226Q130 210 142 198Q152 188 142 176M160 226Q172 210 160 198" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>${shroom(46, 326, 1)}${shroom(256, 336, .75)}
<path d="M30 346H270L258 366L270 386H30L42 366Z" fill="#f4b6c8" stroke="#e07a9a" stroke-width="2"/>${T(150, 371, nm, fs.toFixed(1), "#6b2a3e", "Georgia,serif", 'font-style="italic" font-weight="700"')}`;
  return frame(o, defs, body);
}
const cartoon = o => [princess, island, magic, wonder][o.th || 0](o);
const FANP = [{ bg: "#ebc9c2", ink: "#7a2a30", frame: "#a94a4f", tint: "#9a3a40" }, { bg: "#e0d4f3", ink: "#4b2f7a", frame: "#8b6fc4", tint: "#6a4fb0" }, { bg: "#1e2140", ink: "#f0d9a8", frame: "#c9a45a", tint: "#6f64c4" }];
function fan(o) {
  const id = o.id, p = FANP[o.th || 0], ph = o.photos || [];
  const fr = [[26, 98], [154, 98], [26, 224], [154, 224]];
  const frames = fr.map(([x, y], i) => ph[i]
    ? `<clipPath id="fp${id}${i}"><rect x="${x}" y="${y}" width="120" height="118"/></clipPath><image href="${ph[i]}" x="${x}" y="${y}" width="120" height="118" preserveAspectRatio="xMidYMid slice" clip-path="url(#fp${id}${i})" style="filter:grayscale(1) contrast(1.05)"/><rect x="${x}" y="${y}" width="120" height="118" fill="${p.tint}" opacity=".5" style="mix-blend-mode:multiply"/><rect x="${x}" y="${y}" width="120" height="118" fill="none" stroke="${p.ink}" stroke-width="2"/>`
    : `<rect x="${x}" y="${y}" width="120" height="118" fill="${p.tint}" opacity=".3"/><circle cx="${x + 60}" cy="${y + 52}" r="17" fill="${p.frame}" opacity=".55"/><path d="M${x + 24} ${y + 118}Q${x + 26} ${y + 80} ${x + 60} ${y + 76}Q${x + 94} ${y + 80} ${x + 96} ${y + 118}Z" fill="${p.frame}" opacity=".55"/>${T(x + 60, y + 18, "foto kamu", 9, p.ink, "Arial,sans-serif", 'opacity=".75"')}<rect x="${x}" y="${y}" width="120" height="118" fill="none" stroke="${p.ink}" stroke-width="2"/>`).join("");
  const items = (o.list || "").split(/\n+/).map(s => s.trim()).filter(Boolean).map((t, i) => `${i + 1}. ${t}`), lines = [""];
  items.forEach(t => { const l = lines[lines.length - 1]; if (l && (l + "  " + t).length > 52) lines.push(t); else lines[lines.length - 1] = l ? l + "  " + t : t; });
  const body = `<rect width="300" height="400" fill="${p.bg}"/><ellipse cx="150" cy="34" rx="104" ry="20" fill="none" stroke="${p.ink}" stroke-width="1.2"/>${spark(40, 16, 5, p.ink)}${spark(262, 52, 5, p.ink)}${T(150, 38, (o.sub || "").toUpperCase(), 13, p.ink, "Georgia,serif", 'letter-spacing="2"')}
<text x="26" y="84" font-family="${SCR}" font-size="26" font-weight="700" fill="${p.ink}">${esc(o.name || "Nama")}</text>${frames}${lines.slice(0, 4).map((l, i) => T(150, 362 + i * 11, l, 8.5, p.ink, "Georgia,serif", 'font-style="italic"')).join("")}`;
  return frame(o, "", body);
}
const cover = o => [classic, floral, cartoon, aesth, fan][o.kind || 0](o);
const cdesc = c => c.kind == 0 ? `Cover klasik ${ICONS[c.ic]}, ${PAL[c.pal][0]}, pola ${PAT[c.pat]}` : c.kind == 1 ? `Cover watercolor ${FL[c.fl]}` : `Cover ${["", "", "kartun", "aesthetic", "kolase foto"][c.kind]} ${TH[c.kind][c.th]}`;
const desc = c => `${c.size} • ${c.pages} lembar • ${cdesc(c)} • Kertas ${PAPER[c.paper]}`;
const DEFL = "Intro\nGolden Hour\nMidnight Drive\nLast Dance";
const S = { name: "Emma", sub: "Top secret, keep out!", size: "A5", pages: 100, kind: 0, ic: 2, pal: 0, pat: 0, fl: 0, th: 0, list: DEFL, paper: 0, qty: 1, photo: "", photos: [] };
const view = () => cover({ ...S, id: "pv" });
function chips(box, items, key, mk) {
  $(box).innerHTML = items.map((it, i) => mk(it, i)).join("");
  $$(box + " .chip").forEach((b, i) => b.onclick = () => { S[key] = (key == "size" || key == "pages") ? items[i] : i; if (key == "kind") S.th = 0; draw(); });
}
function draw() {
  $("#pv").innerHTML = view();
  $("#pv svg").style.transform = S.size == "B5" ? "scale(1.06)" : "scale(.94)";
  const on = (box, f) => $$(box + " .chip").forEach((b, i) => b.classList.toggle("on", f(i)));
  on("#gSize", i => ["A5", "B5"][i] == S.size); on("#gPages", i => [100, 200][i] == S.pages);
  on("#gKind", i => i == S.kind); on("#gChar", i => i == S.ic); on("#gPal", i => i == S.pal); on("#gPat", i => i == S.pat); on("#gFl", i => i == S.fl); on("#gPaper", i => i == S.paper);
  $(".kc").hidden = S.kind != 0; $(".kf").hidden = S.kind != 1; $(".kt").hidden = S.kind < 2; $(".kx").hidden = S.kind != 4;
  if (S.kind >= 2 && $("#gTh").dataset.k != S.kind) { $("#gTh").dataset.k = S.kind; $("#gTh").innerHTML = TH[S.kind].map(t => `<button class="chip">${t}</button>`).join(""); $$("#gTh .chip").forEach((b, i) => b.onclick = () => { S.th = i; draw(); }); }
  on("#gTh", i => i == S.th);
  $("#pp").innerHTML = paperSVG(S.paper);
  $("#spec").textContent = `Hardcover ${S.size} (${DIM[S.size]}) • ${S.pages} lembar • ${cdesc(S)} • Kertas ${PAPER[S.paper]}`;
  $("#price").textContent = rp(PRICE[S.size][S.pages] * S.qty);
}
chips("#gSize", ["A5", "B5"], "size", s => `<button class="chip">${s}</button>`);
chips("#gPages", [100, 200], "pages", s => `<button class="chip">${s} lembar</button>`);
chips("#gKind", ["Klasik", "Watercolor bunga", "Kartun", "Aesthetic", "Artis (kolase foto)"], "kind", t => `<button class="chip">${t}</button>`);
chips("#gChar", ICONS, "ic", (c, i) => `<button class="chip ic" aria-label="${c}" title="${c}"><svg viewBox="-46 -46 92 92">${icon(i, 0, 0, .95)}</svg></button>`);
chips("#gPal", PAL, "pal", p => `<button class="chip sw" aria-label="${p[0]}" title="${p[0]}" style="--a:${p[1]};--b:${p[2]}"></button>`);
chips("#gPat", PAT, "pat", p => `<button class="chip">${p}</button>`);
chips("#gFl", FL, "fl", (f, i) => `<button class="chip ic" aria-label="${f}" title="${f}"><svg viewBox="-36 -40 72 80">${flw(FLT[i], 0, 0, .95)}</svg></button>`);
chips("#gPaper", PAPER, "paper", (p, i) => `<button class="chip">${i ? "▢" : "☰"} ${p}</button>`);
$("#fName").oninput = e => { S.name = e.target.value; draw(); };
$("#fSub").oninput = e => { S.sub = e.target.value; draw(); };
$("#fList").oninput = e => { S.list = e.target.value; draw(); };
$("#qty").oninput = e => { S.qty = Math.max(1, Math.min(99, +e.target.value || 1)); draw(); };
const wa = t => `https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
$("#order").onclick = () => {
  const p = PRICE[S.size][S.pages];
  window.open(wa(`Halo Jeanne Book, saya mau pesan journalling book custom:\n• Nama di cover: ${S.name}\n• Tulisan kecil: ${S.sub}\n• Ukuran: ${S.size} (${DIM[S.size]}), hardcover\n• Isi: ${S.pages} lembar, kertas ${PAPER[S.paper]}\n• ${cdesc(S)}${S.kind == 4 ? "\n• Daftar lagu: " + S.list.replace(/\n+/g, ", ") : ""}\n• Foto di cover: ${S.photo ? "ya, file akan saya kirim lewat chat ini" : "tidak"}\n• Jumlah: ${S.qty}\n• Total: ${rp(p * S.qty)} (belum termasuk ongkir)\n\nNama penerima:\nAlamat pengiriman:`), "_blank", "noopener");
};
const cfgOf = p => ({ name: p.name, sub: p.sub, kind: p.kind, ic: p.ic || 0, pal: p.pal || 0, pat: p.pat || 0, fl: p.fl || 0, th: p.th || 0, list: p.list || DEFL, paper: 0, size: "A5", pages: 100, qty: 1, photo: "", photos: [] });
const CATS = [
  ["Kartun", "Ilustrasi bergaya buku dongeng: putri, pulau tropis, sekolah sihir, dan negeri ajaib.", [
    { t: "Fairytale Princess", d: "Potret putri bergaya buku dongeng dengan bingkai emas klasik.", name: "Zey", sub: "the fearless soul", kind: 2, th: 0 },
    { t: "Island Voyager", d: "Pelaut pulau tropis dengan bunga hibiscus dan ombak toska.", name: "Jey", sub: "Sail away", kind: 2, th: 1 },
    { t: "Magic Academy", d: "Bola kristal, bintang, dan menara sekolah sihir di langit senja.", name: "Zey", sub: "Magic Academy", kind: 2, th: 2 },
    { t: "Wonderland Tea Party", d: "Jam saku, kartu remi, cangkir teh, dan jamur di negeri ajaib.", name: "Alice", sub: "Down the rabbit hole", kind: 2, th: 3 }]],
  ["Aesthetic", "Ornamen vintage dengan palet elegan, cocok untuk jurnal yang tenang.", [
    { t: "Vintage Butterfly", d: "Bingkai ornamen maroon dan emas dengan ilustrasi kupu-kupu.", name: "Butterfly", sub: "dance in the light", kind: 3, th: 0 },
    { t: "Botanical Gold", d: "Karangan daun hijau zamrud dengan aksen emas yang tenang.", name: "Botanica", sub: "grow in your time", kind: 3, th: 1 },
    { t: "Celestial Night", d: "Bulan, bintang, dan fase bulan di langit malam biru tua.", name: "Celeste", sub: "under the same sky", kind: 3, th: 2 }]],
  ["Artis", "Kolase 4 foto idolamu plus daftar lagu. Upload fotonya di studio desain.", [
    { t: "Idol Collage Rose", d: "Kolase foto bernuansa rose sepia dengan daftar lagu favoritmu.", name: "My Favorite Album", sub: "Favorite Era", kind: 4, th: 0 },
    { t: "Idol Collage Lilac", d: "Kolase foto bernuansa lilac dreamy dengan daftar lagu.", name: "My Favorite Album", sub: "Favorite Era", kind: 4, th: 1 },
    { t: "Idol Collage Midnight", d: "Kolase foto bernuansa midnight dan emas dengan daftar lagu.", name: "My Favorite Album", sub: "Favorite Era", kind: 4, th: 2 }]],
  ["Klasik & Bunga", "Cover kertas catatan dengan ikon, atau ilustrasi watercolor bunga.", [
    { t: "Starlight Stripes", d: "Bintang kuning di atas latar garis butter yellow.", name: "Emma", sub: "Top secret, keep out!", kind: 0, ic: 0, pal: 4, pat: 2 },
    { t: "Lovely Dots", d: "Ikon love merah muda di atas latar titik berry rose.", name: "Nara", sub: "Notes to self", kind: 0, ic: 1, pal: 5, pat: 1 },
    { t: "Moonlit Checks", d: "Bulan sabit di atas latar kotak lilac pink.", name: "Luna", sub: "Dear diary", kind: 0, ic: 2, pal: 0, pat: 0 },
    { t: "Peony Blush", d: "Ilustrasi watercolor peony pink yang lembut dan elegan.", name: "Rara", sub: "My daily journal", kind: 1, fl: 0 },
    { t: "Sakura Dream", d: "Ranting sakura watercolor dengan kelopak pink.", name: "Sasa", sub: "Little moments", kind: 1, fl: 1 },
    { t: "Lavender Field", d: "Ilustrasi watercolor lavender ungu yang menenangkan.", name: "Mika", sub: "Calm & grateful", kind: 1, fl: 2 }]]];
let CUR = [];
function showCat(n) {
  $$(".ctab").forEach((b, i) => b.classList.toggle("on", i == n));
  $("#cdesc").textContent = CATS[n][1]; CUR = CATS[n][2];
  $("#cards").innerHTML = CUR.map((p, i) => `<article class="card">${cover({ ...cfgOf(p), id: "c" + i })}<h3>${p.t}</h3><p>${p.d}</p><div class="pr">${rp(PRICE.A5[100])}<small> • A5, 100 lembar</small></div><div class="row"><button class="btn ghost use" data-i="${i}">Ubah desain</button><button class="btn addp" data-i="${i}">+ Keranjang</button></div></article>`).join("");
  $$(".use").forEach(b => b.onclick = () => { Object.assign(S, cfgOf(CUR[b.dataset.i])); $("#fName").value = S.name; $("#fSub").value = S.sub; $("#fList").value = S.list; $("#qty").value = 1; $("#fPhoto").value = ""; draw(); $("#studio").scrollIntoView({ behavior: "smooth" }); });
  $$(".addp").forEach(b => b.onclick = () => add(cfgOf(CUR[b.dataset.i])));
}
$("#ctabs").innerHTML = CATS.map(c => `<button class="ctab">${c[0]}</button>`).join("");
$$(".ctab").forEach((b, i) => b.onclick = () => showCat(i));
showCat(0);
$("#heroArt").innerHTML = cover({ ...cfgOf(CATS[1][2][0]), id: "h1" }).replace("<svg", '<svg class="a"') + cover({ ...cfgOf(CATS[0][2][1]), id: "h2" }).replace("<svg", '<svg class="b"');
const chs = [0, 1, 2].map(i => `<svg viewBox="-46 -46 92 92">${icon(i, 0, 0, .95)}</svg><svg viewBox="-36 -44 72 88">${flw(FLT[i], 0, 0, .95)}</svg>`).join("");
$("#mq").innerHTML = chs + chs + chs + chs;

/* foto custom */
const readImg = f => new Promise(res => { const im = new Image(), u = URL.createObjectURL(f); im.onload = () => { const k = Math.min(1, 600 / Math.max(im.width, im.height)), cv = document.createElement("canvas"); cv.width = im.width * k; cv.height = im.height * k; cv.getContext("2d").drawImage(im, 0, 0, cv.width, cv.height); URL.revokeObjectURL(u); res(cv.toDataURL("image/jpeg", .8)); }; im.onerror = () => res(""); im.src = u; });
$("#fPhoto").onchange = async e => { const fs = [...e.target.files].slice(0, 4); S.photos = (await Promise.all(fs.map(readImg))).filter(Boolean); S.photo = S.photos[0] || ""; draw(); };
$("#rmPhoto").onclick = () => { S.photos = []; S.photo = ""; $("#fPhoto").value = ""; draw(); };

/* keranjang */
const CART = [], price = c => PRICE[c.size][c.pages] * c.qty;
function toast(t) { const el = $("#toast"); el.textContent = t; el.classList.add("show"); setTimeout(() => el.classList.remove("show"), 2200); }
function add(c) { CART.push({ ...c }); renderCart(true); toast("Masuk keranjang 🛒"); }
function renderCart(bump) {
  $("#cartN").textContent = CART.reduce((s, c) => s + c.qty, 0);
  if (bump) { const b = $("#cartBtn"); b.classList.remove("bump"); void b.offsetWidth; b.classList.add("bump"); }
  $("#cartItems").innerHTML = CART.length ? CART.map((c, i) => `<div class="ci">${cover({ ...c, id: "k" + i })}<div><b>${esc(c.name)}'s Journal</b><p>${desc(c)}${c.photo ? " • foto custom" : ""}</p><div class="q"><button data-d="-1" data-i="${i}" aria-label="Kurangi">−</button><span>${c.qty}</span><button data-d="1" data-i="${i}" aria-label="Tambah">+</button><button class="rm" data-i="${i}" aria-label="Hapus">🗑</button></div><strong>${rp(price(c))}</strong></div></div>`).join("") : `<p class="empty">Keranjangmu masih kosong. Yuk desain bukumu dulu!</p>`;
  $("#cartTotal").textContent = rp(CART.reduce((s, c) => s + price(c), 0));
  $("#checkout").disabled = !CART.length;
}
$("#cartItems").onclick = e => { const t = e.target.closest("button"); if (!t) return; const i = +t.dataset.i; if (t.classList.contains("rm")) CART.splice(i, 1); else CART[i].qty = Math.max(1, Math.min(99, CART[i].qty + +t.dataset.d)); renderCart(); };
const drawer = open => { $("#drawer").classList.toggle("open", open); $("#shade").classList.toggle("open", open); };
$("#cartBtn").onclick = () => drawer(true); $("#closeCart").onclick = $("#shade").onclick = () => drawer(false);
$("#addCart").onclick = () => add({ ...S });
$("#checkout").onclick = () => {
  const lines = CART.map((c, i) => `${i + 1}. Nama: ${c.name} | Catatan: ${c.sub} | ${c.size} hardcover, ${c.pages} lembar | ${cdesc(c)}${c.kind == 4 ? " (lagu: " + c.list.replace(/\n+/g, ", ") + ")" : ""} | Kertas: ${PAPER[c.paper]} | Foto: ${c.photo ? "ya (dikirim lewat chat)" : "tidak"} | Jumlah: ${c.qty} | ${rp(price(c))}`);
  window.open(wa(`Halo Jeanne Book, saya mau pesan:\n${lines.join("\n")}\n\nTotal: ${rp(CART.reduce((s, c) => s + price(c), 0))} (belum termasuk ongkir)\n\nNama penerima:\nAlamat pengiriman:`), "_blank", "noopener");
};
renderCart();

/* slider ulasan */
const REV = [["Nadia A.", "Semarang", "Covernya cantik banget dan hasil cetaknya mirip pratinjau. Dipakai buat jurnal harian, rapi dan awet!", "#e8749a"], ["Salsa P.", "Yogyakarta", "Hardcover-nya kokoh, kertasnya enak buat nulis. Namaku di cover bikin makin semangat jurnalan.", "#7aa7e8"], ["Rahma D.", "Bandung", "Beli buat kado temen dan dia seneng banget. Packing aman, admin ramah bantu pilih karakter.", "#8ccf9f"], ["Aulia M.", "Jakarta", "Fitur upload foto di cover bagus banget, fotoku tercetak jelas. Pasti beli lagi!", "#b08ae0"]];
$("#rtrack").innerHTML = REV.map(r => `<div class="rev"><div class="rcard"><div class="stars" aria-label="Rating 5 dari 5">★★★★★</div><p>“${esc(r[2])}”</p><div class="who"><div class="av" style="background:${r[3]}">${r[0][0]}</div><div><b>${r[0]}</b><small>${r[1]}</small></div></div></div></div>`).join("");
$("#rdots").innerHTML = REV.map((_, i) => `<button aria-label="Ulasan ${i + 1}"></button>`).join("");
let ri = 0, rt;
const goR = i => { ri = (i + REV.length) % REV.length; $("#rtrack").style.transform = `translateX(-${ri * 100}%)`; $$("#rdots button").forEach((d, k) => d.classList.toggle("on", k == ri)); };
const autoR = () => { clearInterval(rt); rt = setInterval(() => goR(ri + 1), 6000); };
$("#prev").onclick = () => { goR(ri - 1); autoR(); }; $("#next").onclick = () => { goR(ri + 1); autoR(); };
$$("#rdots button").forEach((d, i) => d.onclick = () => { goR(i); autoR(); });
goR(0); autoR();

/* animasi muncul saat scroll */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .1 });
$$(".sec h2,.sub,.card,.panel,.preview,.links a,.note-card,details,.legal div").forEach(el => { el.classList.add("rv"); io.observe(el); });
$$(".tab").forEach(t => t.onclick = () => { $$(".tab,.tp").forEach(x => x.classList.remove("on")); t.classList.add("on"); $("#" + t.dataset.t).classList.add("on"); });
$("#burger").onclick = () => $("#menu").classList.toggle("open");
$$("#menu a").forEach(a => a.onclick = () => $("#menu").classList.remove("open"));
$("#waLink").href = wa("Halo Jeanne Book, saya mau tanya."); $("#waLink").textContent = "+62 821-3682-2110";
$("#cf").onsubmit = e => { e.preventDefault(); window.open(wa(`Halo Jeanne Book, saya ${$("#cn").value}.\n${$("#cm").value}`), "_blank", "noopener"); };
$("#yr").textContent = new Date().getFullYear();
$("#fList").value = S.list;
draw();
