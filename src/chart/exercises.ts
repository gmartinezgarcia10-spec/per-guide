// Exercise generators on the Strait chart. Pure: they take the random source, so tests can seed it.
import { distanceToCoast, onLand } from "./coast.ts";
import { angleDiff, bearingLine, course, intersectLines, n360, type Pos } from "./geo.ts";
import { MARKS, type MarkId } from "./strait.ts";

export type Rand = () => number;
const int = (rand: Rand, a: number, b: number) => a + Math.floor(rand() * (b - a + 1));

/** Open water a candidate can be in: inside the practice area, clear of the coast. */
const AREA = { s: 35 * 60 + 45, n: 36 * 60 + 12, w: -(6 * 60 + 10), e: -(5 * 60 + 15) };
export function randomWaterPos(rand: Rand, clearance = 1.5): Pos {
  for (let i = 0; i < 1000; i++) {
    const p = { lat: AREA.s + rand() * (AREA.n - AREA.s), lon: AREA.w + rand() * (AREA.e - AREA.w) };
    if (!onLand(p) && distanceToCoast(p) >= clearance) return p;
  }
  throw new Error("randomWaterPos: no water found");
}

export type TwoBearings = {
  /** The answer: where the two true bearings cross. */
  ship: Pos;
  marks: [MarkId, MarkId];
  /** True bearings (Dv) of each mark, whole degrees. */
  dv: [number, number];
  /** Compass bearings (Da) as read, whole degrees: Da = Dv − Ct. */
  da: [number, number];
  /** Declination (dm) and deviation (Δ), whole degrees, east +. Ct = dm + Δ. */
  dm: number;
  dev: number;
  ct: number;
};

/** "Situación por dos demoras de aguja simultáneas": two lights in range with a good angle of cut. */
export function twoBearings(rand: Rand): TwoBearings {
  const ids = Object.keys(MARKS) as MarkId[];
  for (let i = 0; i < 500; i++) {
    const guess = randomWaterPos(rand);
    const near = ids.filter((id) => {
      const d = course(guess, MARKS[id].pos).d;
      return d >= 2 && d <= 14;
    });
    const pairs: [MarkId, MarkId][] = [];
    for (const a of near)
      for (const b of near) {
        if (a >= b) continue;
        const cut = Math.abs(angleDiff(course(guess, MARKS[a].pos).rv, course(guess, MARKS[b].pos).rv));
        if (cut >= 40 && cut <= 140) pairs.push([a, b]);
      }
    const pair = pairs[int(rand, 0, pairs.length - 1)];
    if (!pair) continue;
    const dv = pair.map((id) => n360(Math.round(course(guess, MARKS[id].pos).rv))) as [number, number];
    const ship = intersectLines(
      bearingLine(MARKS[pair[0]].pos, dv[0]),
      bearingLine(MARKS[pair[1]].pos, dv[1]),
    );
    if (!ship || onLand(ship) || distanceToCoast(ship) < 1) continue;
    const dm = int(rand, -3, 3);
    const dev = int(rand, -5, 5);
    const ct = dm + dev;
    return { ship, marks: pair, dv, da: dv.map((d) => n360(d - ct)) as [number, number], dm, dev, ct };
  }
  throw new Error("twoBearings: no exercise found");
}
