// SVG drawing helpers shared by chapters.

export const COL = {
  b: "var(--black)",
  y: "var(--yellow)",
  r: "var(--red)",
  g: "var(--green)",
  w: "var(--white)",
  bl: "#2a62c9",
} as const;
type Colour = keyof typeof COL;
/** A band is one colour, or several side by side (vertical stripes). */
export type Band = Colour | Colour[];

/** Buoy with coloured bands and an optional top mark (IALA). */
export function buoy(bands: Band[], top?: string): string {
  let s = '<svg viewBox="0 0 60 100" aria-hidden="true">';
  const up = (y: number) => `<polygon points="22,${y + 12} 38,${y + 12} 30,${y}" fill="${COL.b}"/>`;
  const dn = (y: number) => `<polygon points="22,${y} 38,${y} 30,${y + 12}" fill="${COL.b}"/>`;
  if (top === "NN") s += up(2) + up(16);
  if (top === "SS") s += dn(2) + dn(16);
  if (top === "EE") s += up(2) + dn(16);
  if (top === "WW") s += dn(2) + up(16);
  if (top === "can-r") s += `<rect x="23" y="8" width="14" height="18" fill="${COL.r}"/>`;
  if (top === "cone-g") s += `<polygon points="22,26 38,26 30,8" fill="${COL.g}"/>`;
  if (top === "balls2")
    s += `<circle cx="30" cy="8" r="6" fill="${COL.b}"/><circle cx="30" cy="22" r="6" fill="${COL.b}"/>`;
  if (top === "ball") s += `<circle cx="30" cy="16" r="7" fill="${COL.r}"/>`;
  if (top === "x") s += `<path d="M22 8 L38 26 M38 8 L22 26" stroke="${COL.y}" stroke-width="4"/>`;
  if (top === "cross") s += `<path d="M30 6 V28 M20 17 H40" stroke="${COL.y}" stroke-width="4"/>`;
  s += `<line x1="30" y1="28" x2="30" y2="36" stroke="var(--muted)" stroke-width="2"/>`;
  const h = 50 / bands.length;
  bands.forEach((c, i) => {
    if (Array.isArray(c)) {
      const w = 24 / c.length;
      c.forEach((cc, j) => {
        s += `<rect x="${18 + j * w}" y="36" width="${w}" height="50" fill="${COL[cc]}"/>`;
      });
    } else s += `<rect x="18" y="${36 + i * h}" width="24" height="${h}" fill="${COL[c]}"/>`;
  });
  s += `<rect x="18" y="36" width="24" height="50" fill="none" stroke="var(--muted)" stroke-width="1"/>`;
  s += `<path d="M8 92 Q30 84 52 92" stroke="var(--sea)" stroke-width="2" fill="none"/></svg>`;
  return s;
}

/** Boat seen from above, bow pointing up, centred at (cx, cy), length L, rotated `rot` degrees. */
export function boatTop(
  cx: number,
  cy: number,
  L: number,
  rot = 0,
  fill = "var(--paper)",
  extra = "",
): string {
  const w = L * 0.36;
  const h = L / 2;
  return `<g transform="translate(${cx} ${cy}) rotate(${rot})"><path d="M0 ${-h} C ${w * 0.9} ${-h * 0.45}, ${w} ${h * 0.1}, ${w * 0.8} ${h} L ${-w * 0.8} ${h} C ${-w} ${h * 0.1}, ${-w * 0.9} ${-h * 0.45}, 0 ${-h} Z" fill="${fill}" stroke="var(--ink)" stroke-width="1.6"/>${extra}</g>`;
}
