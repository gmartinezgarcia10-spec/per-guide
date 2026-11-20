// Land polygons from the OSM coastline lines in coast.json. OSM draws the coastline with land on the
// left, so an open line (one that leaves the data area) is closed by walking the data rectangle
// anticlockwise from its end back to its start. Islets are already closed rings.
import data from "./coast.json";
import type { Pos } from "./geo.ts";

type P = [number, number]; // [lat, lon] in minutes

const lines = data.lines as P[][];

/** Rectangle just outside every coastline point, in minutes. */
const R = (() => {
  const all = lines.flat();
  const lats = all.map((p) => p[0]);
  const lons = all.map((p) => p[1]);
  return {
    s: Math.min(...lats) - 1,
    n: Math.max(...lats) + 1,
    w: Math.min(...lons) - 1,
    e: Math.max(...lons) + 1,
  };
})();
const W = R.e - R.w;
const H = R.n - R.s;
const PERIM = 2 * (W + H);

/** Position along the rectangle's edge, anticlockwise from the SW corner, of the nearest edge point. */
function edgeParam([lat, lon]: P): number {
  const d = [lat - R.s, R.e - lon, R.n - lat, lon - R.w];
  const edge = d.indexOf(Math.min(...d));
  if (edge === 0) return lon - R.w;
  if (edge === 1) return W + (lat - R.s);
  if (edge === 2) return W + H + (R.e - lon);
  return 2 * W + H + (R.n - lat);
}
const CORNERS: { s: number; p: P }[] = [
  { s: 0, p: [R.s, R.w] },
  { s: W, p: [R.s, R.e] },
  { s: W + H, p: [R.n, R.e] },
  { s: 2 * W + H, p: [R.n, R.w] },
];

const closed = (l: P[]) => {
  const a = l[0];
  const z = l[l.length - 1];
  return !!a && !!z && a[0] === z[0] && a[1] === z[1];
};

function closeLine(l: P[]): P[] {
  if (closed(l)) return l;
  const from = edgeParam(l[l.length - 1] as P);
  let to = edgeParam(l[0] as P);
  if (to <= from) to += PERIM;
  const corners = [...CORNERS, ...CORNERS.map((c) => ({ s: c.s + PERIM, p: c.p }))]
    .filter((c) => c.s > from && c.s < to)
    .map((c) => c.p);
  return [...l, ...corners, l[0] as P];
}

/** The rectangle the open coastlines are closed along: the chart window must lie inside it. */
export const COAST_BOUNDS = R;
/** Land as closed rings of [lat, lon] minutes: the two coasts and the islets. */
export const LAND: P[][] = lines.map(closeLine);
export const COAST_SOURCE: string = data.source;

function inRing(ring: P[], lat: number, lon: number): boolean {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [yi, xi] = ring[i] as P;
    const [yj, xj] = ring[j] as P;
    if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

export const onLand = (p: Pos): boolean => LAND.some((ring) => inRing(ring, p.lat, p.lon));

/** Shortest distance (miles, approximate) from a point to the coastline. */
export function distanceToCoast(p: Pos): number {
  const k = Math.cos((p.lat / 60) * (Math.PI / 180));
  let best = Number.POSITIVE_INFINITY;
  for (const l of lines) {
    for (let i = 1; i < l.length; i++) {
      const [ay, ax] = l[i - 1] as P;
      const [by, bx] = l[i] as P;
      const dx = (bx - ax) * k;
      const dy = by - ay;
      const px = (p.lon - ax) * k;
      const py = p.lat - ay;
      const t = Math.max(0, Math.min(1, (px * dx + py * dy) / (dx * dx + dy * dy || 1)));
      best = Math.min(best, Math.hypot(px - t * dx, py - t * dy));
    }
  }
  return best;
}
