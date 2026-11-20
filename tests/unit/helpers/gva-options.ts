// Reads the values out of a GVA chart-question option ("Ra = 154º Hrb 1927", "l = 36° 07,0' N L = …")
// so the solver's answer can be scored against each of the four options.
import { angleDiff, type Pos } from "../../../src/chart/geo";

export type Facets = {
  pos?: Pos;
  ra?: number;
  rv?: number;
  dv?: number;
  ct?: number;
  /** distance, miles */
  d?: number;
  /** HRB, minutes after midnight */
  hrb?: number;
  /** elapsed time, minutes */
  dur?: number;
  /** speed, knots */
  v?: number;
  /** a bare number, for options like "303°." */
  x?: number;
};
export type Facet = keyof Facets;

const num = (s: string) => Number(s.replace(",", "."));
const MINUS = /[-‒−–]/;

function parsePos(s: string): Pos | undefined {
  const re = /(\d{1,3})\s*[°º]\s*(\d{1,2}(?:[.,]\d+)?)/g;
  const found: { v: number; tail: string }[] = [];
  for (let m = re.exec(s); m; m = re.exec(s)) {
    found.push({ v: num(m[1] ?? "") * 60 + num(m[2] ?? ""), tail: s.slice(re.lastIndex, re.lastIndex + 6) });
  }
  const [la, lo] = found;
  if (!la || !lo) return undefined;
  // A wrong hemisphere is a deliberate distractor: push it far away.
  const lat = /^\s*['´’′]*\s*S\b/.test(la.tail) ? -la.v : la.v;
  const lon = /^\s*['´’′]*\s*E\b/.test(lo.tail) ? lo.v : -lo.v;
  return { lat, lon };
}

function parseCt(s: string): number | undefined {
  const body = /C[Tt]\s*=?\s*(.*)$/.exec(s)?.[1] ?? s;
  const m = /^\s*\(?\s*([-‒−–+]?)\s*(\d+(?:[.,]\d+)?)\s*[°º]?\s*\)?\s*([-‒−–+]|negativ|positiv)?/.exec(body);
  if (!m) return undefined;
  const sign = m[1] || m[3] || "";
  return (MINUS.test(sign) || sign.startsWith("negativ") ? -1 : 1) * num(m[2] ?? "");
}

function parseHrb(s: string): number | undefined {
  const m = /(?:HRB|Hrb|A las)\s*[=:]?\s*(\d{1,2})\s*[: ]?\s*(\d{2})/.exec(s);
  return m ? num(m[1] ?? "") * 60 + num(m[2] ?? "") : undefined;
}

function parseDur(s: string): number | undefined {
  const h = /(\d+)\s*h(?:ora)?s?\b/.exec(s);
  const m = /(\d+)\s*(?:´|'|’|min)/.exec(h ? s.slice((h.index ?? 0) + h[0].length) : s);
  if (!h && !m) return undefined;
  return num(h?.[1] ?? "0") * 60 + num(m?.[1] ?? "0");
}

const after = (label: string) => (s: string) => {
  const m = new RegExp(`\\b${label}\\s*=?\\s*(\\d+(?:[.,]\\d+)?)`).exec(s);
  return m ? num(m[1] ?? "") : undefined;
};

const PARSERS: { [K in Facet]: (s: string) => Facets[K] } = {
  pos: parsePos,
  ra: after("Ra"),
  rv: after("Rv"),
  dv: after("Dv"),
  ct: parseCt,
  d: (s) => {
    const m = /(?:\bd\s*=\s*)?(\d+(?:[.,]\d+)?)\s*millas/.exec(s) ?? /\bd\s*=\s*(\d+(?:[.,]\d+)?)/.exec(s);
    return m ? num(m[1] ?? "") : undefined;
  },
  hrb: parseHrb,
  dur: parseDur,
  v: after("Vb"),
  x: (s) => {
    const m = /(\d+(?:[.,]\d+)?)/.exec(s);
    return m ? num(m[1] ?? "") : undefined;
  },
};

export function parseOption(option: string, facets: Facet[]): Facets {
  const out: Facets = {};
  for (const f of facets) Object.assign(out, { [f]: PARSERS[f](option) });
  return out;
}

/** How far each facet may be off and still count as the same answer read off a paper chart. */
export const TOL = { pos: 0.5, angle: 2, ct: 1.5, d: 0.4, time: 4, v: 0.3 } as const;

/** Worst error over the facets, in units of tolerance (≤ 1 means "the same answer"). */
export function score(got: Facets, opt: Facets): number {
  let worst = 0;
  const bump = (e: number) => {
    worst = Math.max(worst, Number.isFinite(e) ? e : Number.POSITIVE_INFINITY);
  };
  for (const k of Object.keys(got) as Facet[]) {
    const g = got[k];
    const o = opt[k];
    if (g === undefined) continue;
    if (o === undefined) {
      bump(Number.POSITIVE_INFINITY);
      continue;
    }
    if (k === "pos") {
      const gp = g as Pos;
      const op = o as Pos;
      const dLat = Math.abs(gp.lat - op.lat);
      const dLon = Math.abs(gp.lon - op.lon) * Math.cos((gp.lat / 60) * (Math.PI / 180));
      bump(Math.max(dLat, dLon) / TOL.pos);
    } else if (k === "ra" || k === "rv" || k === "dv" || k === "x") {
      bump(Math.abs(angleDiff(g as number, o as number)) / TOL.angle);
    } else if (k === "ct") bump(Math.abs((g as number) - (o as number)) / TOL.ct);
    else if (k === "d") bump(Math.abs((g as number) - (o as number)) / TOL.d);
    // HRB wraps at midnight: 1440 min / 4 = 360°, so angleDiff folds it; the tolerance is scaled to match.
    else if (k === "hrb") bump(Math.abs(angleDiff((g as number) / 4, (o as number) / 4)) / (TOL.time / 4));
    else if (k === "dur") bump(Math.abs((g as number) - (o as number)) / TOL.time);
    else if (k === "v") bump(Math.abs((g as number) - (o as number)) / TOL.v);
  }
  return worst;
}
