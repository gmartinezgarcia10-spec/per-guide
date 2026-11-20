// Rebuilds src/chart/coast.json, the Strait coastline, from OpenStreetMap (© OpenStreetMap
// contributors, ODbL). Not part of the build: run it by hand when the chart area changes.
//   node scripts/build-coast.ts                # fetch from Overpass
//   node scripts/build-coast.ts --from osm.json  # use a saved Overpass response
// Output: merged coastline polylines in minutes of arc ([lat, lon], lon west negative), rounded to
// 0.01′ and simplified to SIMPLIFY minutes, which is far below what can be read on a 25-C-scale chart.
import { readFileSync, writeFileSync } from "node:fs";

const BBOX = { s: 35.62, w: -6.35, n: 36.4, e: -5.1 };
const SIMPLIFY = 0.03;
const OUT = new URL("../src/chart/coast.json", import.meta.url);

type Way = { type: "way"; id: number; geometry?: { lat: number; lon: number }[] };
type P = [number, number];

async function load(): Promise<Way[]> {
  const i = process.argv.indexOf("--from");
  if (i > 0) return JSON.parse(readFileSync(process.argv[i + 1] ?? "", "utf8")).elements;
  const q = `[out:json][timeout:180];way["natural"="coastline"](${BBOX.s},${BBOX.w},${BBOX.n},${BBOX.e});out geom;`;
  const res = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    headers: { "User-Agent": "per-guide-build/0.1" },
    body: new URLSearchParams({ data: q }),
  });
  if (!res.ok) throw new Error(`Overpass ${res.status}`);
  return ((await res.json()) as { elements: Way[] }).elements;
}

/** Join ways that share end nodes into the longest possible lines (OSM splits the coast). */
function merge(lines: P[][]): P[][] {
  const key = (p: P) => `${p[0].toFixed(7)},${p[1].toFixed(7)}`;
  const pool = lines.map((l) => l.slice());
  let joined = true;
  while (joined) {
    joined = false;
    for (let i = 0; i < pool.length && !joined; i++) {
      for (let j = 0; j < pool.length && !joined; j++) {
        const a = pool[i];
        const b = pool[j];
        if (i === j || !a || !b) continue;
        const aEnd = a[a.length - 1];
        const bStart = b[0];
        if (aEnd && bStart && key(aEnd) === key(bStart)) {
          pool[i] = a.concat(b.slice(1));
          pool.splice(j, 1);
          joined = true;
        }
      }
    }
  }
  return pool;
}

/** Douglas–Peucker on the local plane (lon scaled by cos lat), tolerance in minutes. */
function simplify(pts: P[], tol: number): P[] {
  if (pts.length < 3) return pts;
  const k = Math.cos((36 * Math.PI) / 180);
  const keep = new Uint8Array(pts.length);
  keep[0] = 1;
  keep[pts.length - 1] = 1;
  const stack: [number, number][] = [[0, pts.length - 1]];
  while (stack.length) {
    const [s, e] = stack.pop() as [number, number];
    const A = pts[s] as P;
    const B = pts[e] as P;
    const dx = (B[1] - A[1]) * k;
    const dy = B[0] - A[0];
    const len = Math.hypot(dx, dy) || 1e-12;
    let worst = -1;
    let at = -1;
    for (let i = s + 1; i < e; i++) {
      const p = pts[i] as P;
      const d = Math.abs(((p[1] - A[1]) * k * dy - (p[0] - A[0]) * dx) / len);
      if (d > worst) {
        worst = d;
        at = i;
      }
    }
    if (worst > tol && at > 0) {
      keep[at] = 1;
      stack.push([s, at], [at, e]);
    }
  }
  return pts.filter((_, i) => keep[i]);
}

const ways = await load();
const raw: P[][] = ways
  .filter((w) => w.type === "way" && w.geometry?.length)
  .map((w) => (w.geometry ?? []).map((g): P => [g.lat * 60, g.lon * 60]));
/** Closed rings (islets) start and end on the same point: split at the far side so they survive. */
function simplifyLine(l: P[]): P[] {
  const a = l[0];
  const z = l[l.length - 1];
  if (!a || !z || a[0] !== z[0] || a[1] !== z[1] || l.length < 4) return simplify(l, SIMPLIFY);
  const d = (p: P) => Math.hypot(p[0] - a[0], p[1] - a[1]);
  let far = 1;
  l.forEach((p, i) => {
    if (d(p) > d(l[far] as P)) far = i;
  });
  return simplify(l.slice(0, far + 1), SIMPLIFY).concat(simplify(l.slice(far), SIMPLIFY).slice(1));
}

const lines = merge(raw)
  .map((l) => simplifyLine(l).map((p): P => [Math.round(p[0] * 100) / 100, Math.round(p[1] * 100) / 100]))
  // Rocks smaller than the simplification tolerance collapse to a point or a sliver: drop them.
  .filter((l) => l.length >= 4);
const pts = lines.reduce((n, l) => n + l.length, 0);
writeFileSync(
  OUT,
  `${JSON.stringify({
    source: "© OpenStreetMap contributors, ODbL 1.0 (natural=coastline)",
    bbox: BBOX,
    simplify: SIMPLIFY,
    lines,
  })}\n`,
);
console.log(`coast: ${raw.length} ways → ${lines.length} lines, ${pts} points`);
