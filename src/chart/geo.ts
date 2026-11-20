// Chart geometry for the Strait exercises (carta 25-C style: Mercator, small area).
// Positions are in minutes of arc: lat north +, lon east + (so the Strait is negative lon).
// Work happens on the Mercator plane: x = lon minutes, y = meridional parts in minutes. Straight
// lines on that plane are rhumb lines, which is what a protractor and ruler give on the paper chart.
// Near a point at latitude φ the plane is conformal with scale sec φ units per nautical mile, so
// distance arcs of a few miles are drawn as circles, as with dividers on the chart.
// Meridional parts are spherical; the ellipsoid differs by ~0.2 % in scale at 36° N (< 0.1° in
// angle), far below what can be read on the paper chart.

export type Pos = { lat: number; lon: number };
type Pt = { x: number; y: number };

const RAD = Math.PI / 180;
const EPS = 1e-9;
/** Lines closer than this to parallel (0.5°) don't give a usable fix. */
const MIN_CUT = Math.sin(0.5 * RAD);

export const n360 = (d: number): number => ((d % 360) + 360) % 360;
/** Signed difference a − b folded into (−180, 180]. */
export const angleDiff = (a: number, b: number): number => {
  const d = n360(a - b);
  return d > 180 ? d - 360 : d;
};

const mp = (latMin: number): number =>
  Math.log(Math.tan(Math.PI / 4 + (latMin / 120) * RAD)) * (10800 / Math.PI);
const latFromMp = (y: number): number =>
  (2 * Math.atan(Math.exp((y * Math.PI) / 10800)) - Math.PI / 2) * (60 / RAD);
/** Mercator y (meridional parts) of a latitude, both in minutes: what the chart's vertical axis is. */
export const mercY = mp;
/** Latitude (minutes) of a Mercator y: the inverse of `mercY`. */
export const latOfMercY = latFromMp;
const toPlane = (p: Pos): Pt => ({ x: p.lon, y: mp(p.lat) });
const fromPlane = (p: Pt): Pos => ({ lat: latFromMp(p.y), lon: p.x });
/** Plane units per nautical mile at a latitude. */
const scale = (latMin: number): number => 1 / Math.cos((latMin / 60) * RAD);
const dir = (brg: number): Pt => ({ x: Math.sin(brg * RAD), y: Math.cos(brg * RAD) });
const brgOf = (v: Pt): number => n360(Math.atan2(v.x, v.y) / RAD);

/** True course (rhumb line) from a to b, and the distance in nautical miles. */
export function course(a: Pos, b: Pos): { rv: number; d: number } {
  const A = toPlane(a);
  const B = toPlane(b);
  const rv = brgOf({ x: B.x - A.x, y: B.y - A.y });
  const dLat = b.lat - a.lat;
  const c = Math.cos(rv * RAD);
  // Along a rhumb line d = Δlat / cos(Rv); due east or west use the departure instead.
  const d = Math.abs(c) > 1e-3 ? dLat / c : Math.abs(b.lon - a.lon) / scale((a.lat + b.lat) / 2);
  return { rv, d: Math.abs(d) };
}

/** Where you get to sailing `d` miles on true course `rv` from `from` (dead reckoning). */
export function destination(from: Pos, rv: number, d: number): Pos {
  const c = Math.cos(rv * RAD);
  const s = Math.sin(rv * RAD);
  const lat = from.lat + d * c;
  // Due east or west the rhumb line is (nearly) a parallel: use the departure, as `course` does.
  if (Math.abs(c) < 1e-3) return { lat, lon: from.lon + d * s * scale((from.lat + lat) / 2) };
  return { lat, lon: from.lon + Math.tan(rv * RAD) * (mp(lat) - mp(from.lat)) };
}

/**
 * A line of position through `through` in direction `brg` (true). A `ray` only runs forward from
 * `through`: a bearing line runs from the mark out to sea, a track runs ahead of the ship. Without
 * `ray` it is infinite both ways (a transit or opposition of two marks, a meridian).
 */
export type Line = { through: Pos; brg: number; ray?: boolean };
/** A distance arc: every point `r` miles from `center`. */
export type Circle = { center: Pos; r: number };

/** Line of position from a true bearing (Dv) taken of a mark: the ship lies on Dv + 180 from it. */
export const bearingLine = (mark: Pos, dv: number): Line => ({
  through: mark,
  brg: n360(dv + 180),
  ray: true,
});
/** Transit (enfilación) or opposition (oposición) of two marks: the straight line through both. */
export const transitLine = (a: Pos, b: Pos): Line => ({ through: a, brg: course(a, b).rv });

export function intersectLines(l1: Line, l2: Line): Pos | null {
  const P = toPlane(l1.through);
  const Q = toPlane(l2.through);
  const u = dir(l1.brg);
  const v = dir(l2.brg);
  const den = u.x * v.y - u.y * v.x;
  if (Math.abs(den) < MIN_CUT) return null;
  const t = ((Q.x - P.x) * v.y - (Q.y - P.y) * v.x) / den;
  const s = ((Q.x - P.x) * u.y - (Q.y - P.y) * u.x) / den;
  // A bearing traced the wrong way (from the mark towards land) doesn't cut the other line.
  if ((l1.ray && t < -EPS) || (l2.ray && s < -EPS)) return null;
  return fromPlane({ x: P.x + u.x * t, y: P.y + u.y * t });
}

const circlePlane = (c: Circle): { C: Pt; R: number } => ({
  C: toPlane(c.center),
  R: c.r * scale(c.center.lat),
});

export function intersectLineCircle(l: Line, c: Circle): Pos[] {
  const P = toPlane(l.through);
  const u = dir(l.brg);
  const { C, R } = circlePlane(c);
  const fx = P.x - C.x;
  const fy = P.y - C.y;
  const b = fx * u.x + fy * u.y;
  const disc = b * b - (fx * fx + fy * fy - R * R);
  if (disc < -EPS) return [];
  const sq = Math.sqrt(Math.max(0, disc));
  return [-b - sq, -b + sq]
    .filter((t) => !l.ray || t >= -EPS)
    .map((t) => fromPlane({ x: P.x + u.x * t, y: P.y + u.y * t }));
}

/** Both crossings of two distance arcs, in no particular order: choose one with `nearest`. */
export function intersectCircles(c1: Circle, c2: Circle): Pos[] {
  const a = circlePlane(c1);
  const b = circlePlane(c2);
  const dx = b.C.x - a.C.x;
  const dy = b.C.y - a.C.y;
  const d = Math.hypot(dx, dy);
  if (d < EPS || d > a.R + b.R + EPS || d < Math.abs(a.R - b.R) - EPS) return [];
  const along = (a.R * a.R - b.R * b.R + d * d) / (2 * d);
  const h = Math.sqrt(Math.max(0, a.R * a.R - along * along));
  const mx = a.C.x + (dx * along) / d;
  const my = a.C.y + (dy * along) / d;
  return [
    fromPlane({ x: mx + (dy * h) / d, y: my - (dx * h) / d }),
    fromPlane({ x: mx - (dy * h) / d, y: my + (dx * h) / d }),
  ];
}

/**
 * The two true courses from `from` that pass exactly `r` miles off `mark` (tangents to the
 * distance circle). `port` keeps the mark on the port side, `starboard` on the starboard side.
 */
export function passOff(from: Pos, mark: Pos, r: number): { port: number; starboard: number } {
  const { C, R } = circlePlane({ center: mark, r });
  const F = toPlane(from);
  const v = { x: C.x - F.x, y: C.y - F.y };
  const dist = Math.hypot(v.x, v.y);
  if (dist <= R) throw new Error("passOff: already inside the distance circle");
  const toMark = brgOf(v);
  const half = Math.asin(R / dist) / RAD;
  return { port: n360(toMark + half), starboard: n360(toMark - half) };
}

/** Point on the track (from `from` on course `rv`) where `mark` is abeam (marcación 90°). */
export function abeam(from: Pos, rv: number, mark: Pos): Pos {
  const F = toPlane(from);
  const M = toPlane(mark);
  const u = dir(rv);
  const t = (M.x - F.x) * u.x + (M.y - F.y) * u.y;
  return fromPlane({ x: F.x + u.x * t, y: F.y + u.y * t });
}

/** Point ahead on the track where it crosses a line of position (null if never, or behind). */
export const crossing = (from: Pos, rv: number, l: Line): Pos | null =>
  intersectLines({ through: from, brg: rv, ray: true }, l);

/** Of several candidate fixes, the one closest to a rough expected position. */
export function nearest(cands: Pos[], hint: Pos): Pos {
  let best: Pos | undefined;
  let bd = Number.POSITIVE_INFINITY;
  for (const c of cands) {
    const d = course(hint, c).d;
    if (d < bd) {
      bd = d;
      best = c;
    }
  }
  if (!best) throw new Error("nearest: no candidates");
  return best;
}

// ---- compass and relative bearings ----

/** Corrección total: Ct = dm + Δ (east +, west −). */
export const ct = (dm: number, dev: number): number => dm + dev;
/** Aguja → verdadero (works for courses and bearings): Rv = Ra + Ct, Dv = Da + Ct. */
export const toTrue = (compass: number, ctot: number): number => n360(compass + ctot);
/** Verdadero → aguja: Ra = Rv − Ct. */
export const toCompass = (trueDeg: number, ctot: number): number => n360(trueDeg - ctot);
/** Marcación → demora verdadera: Dv = Rv + M, with M positive to starboard, negative to port. */
export const relToTrue = (rv: number, m: number): number => n360(rv + m);

// ---- time (HRB as minutes after midnight) ----

/** Minutes to run `d` miles at `v` knots. */
export const runMinutes = (d: number, v: number): number => (d / v) * 60;
export const hhmm = (min: number): string => {
  const m = ((Math.round(min) % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
};
export const parseHhmm = (s: string): number => {
  const m = /^(\d{1,2}):?(\d{2})$/.exec(s.replace(/\s/g, ""));
  if (!m) throw new Error(`bad time: ${s}`);
  return Number(m[1]) * 60 + Number(m[2]);
};

// ---- degrees and minutes ----

/** Build a position from chart notation: pos(36, 7.0, 6, 2.1) is 36°07,0′N 006°02,1′W. */
export const pos = (latDeg: number, latMin: number, lonDegW: number, lonMinW: number): Pos => ({
  lat: latDeg * 60 + latMin,
  lon: -(lonDegW * 60 + lonMinW),
});

const fmt = (m: number, degDigits: number, hemi: string): string => {
  const tenths = Math.round(Math.abs(m) * 10);
  const deg = Math.floor(tenths / 600);
  const min = (tenths - deg * 600) / 10;
  return `${String(deg).padStart(degDigits, "0")}° ${min.toFixed(1).replace(".", ",").padStart(4, "0")}′ ${hemi}`;
};
export const fmtLat = (m: number): string => fmt(m, 2, m >= 0 ? "N" : "S");
export const fmtLon = (m: number): string => fmt(m, 3, m >= 0 ? "E" : "W");
export const fmtPos = (p: Pos): string => `l ${fmtLat(p.lat)} · L ${fmtLon(p.lon)}`;
