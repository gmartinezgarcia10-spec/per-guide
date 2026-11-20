// Our Strait chart data + solver against the real GVA exam answers. GVA marks the right option from a
// paper carta 25-C, so each case solves the question the way a candidate would (with our marks) and
// checks that the option GVA marked is the closest of the four and within paper-reading tolerance.
// A failure here means a mark is in the wrong place or the solver is wrong.
import { describe, expect, it } from "vitest";
import gva from "../../content/questions/gva/carta.json";
import {
  abeam,
  bearingLine,
  course,
  crossing,
  destination,
  intersectCircles,
  intersectLineCircle,
  intersectLines,
  nearest,
  type Pos,
  passOff,
  pos,
  relToTrue,
  runMinutes,
  toCompass,
  toTrue,
  transitLine,
} from "../../src/chart/geo";
import { mark as M } from "../../src/chart/strait";
import { type Facet, type Facets, parseOption, score } from "./helpers/gva-options";

type Case = { id: string; facets: Facet[]; solve: () => Facets };
const hrb = (h: number, m: number) => h * 60 + m;
/** Fix by two lines of position. */
const fix = (a: Parameters<typeof intersectLines>[0], b: Parameters<typeof intersectLines>[1]): Pos => {
  const p = intersectLines(a, b);
  if (!p) throw new Error("parallel lines");
  return p;
};
/** Point on a transit/opposition line between two marks at `r` miles from `from`. */
const onLineAt = (a: Pos, b: Pos, from: Pos, r: number, hint: Pos) =>
  nearest(intersectLineCircle(transitLine(a, b), { center: from, r }), hint);

const CASES: Case[] = [
  // ---- coordinates, course and distance ----
  { id: "gva-0311", facets: ["pos"], solve: () => ({ pos: M("tarifa") }) },
  { id: "gva-0088", facets: ["pos"], solve: () => ({ pos: destination(M("trafalgar"), 180, 4) }) },
  { id: "gva-0313", facets: ["d"], solve: () => ({ d: course(pos(36, 0, 5, 20), pos(35, 50, 5, 50)).d }) },
  {
    id: "gva-0312",
    facets: ["ra"],
    solve: () => ({ ra: toCompass(course(destination(M("trafalgar"), 180, 6), pos(36, 10, 6, 10)).rv, -6) }),
  },
  {
    id: "gva-0952",
    facets: ["ra"],
    solve: () => ({
      ra: toCompass(course(pos(36, 1.2, 6, 10), destination(M("trafalgar"), 180, 6)).rv, -4 + 8),
    }),
  },
  {
    id: "gva-0953",
    facets: ["dur"],
    solve: () => ({
      dur: runMinutes(course(pos(35, 56.6, 6, 12.2), destination(M("trafalgar"), 180, 6)).d, 9),
    }),
  },
  // "desvío 3º y dm 3º −": Ct = +3 − 3 = 0.
  {
    id: "gva-0669",
    facets: ["x"],
    solve: () => ({ x: toCompass(course(pos(36, 4, 6, 15), destination(M("espartel"), 270, 6.2)).rv, 0) }),
  },
  {
    id: "gva-0623",
    facets: ["hrb", "rv"],
    solve: () => {
      const c = course(pos(36, 5.6, 6, 15), destination(M("espartel"), 0, 10));
      return { hrb: hrb(10, 0) + runMinutes(c.d, 14), rv: c.rv };
    },
  },
  // ---- dead reckoning ----
  {
    id: "gva-0043",
    facets: ["pos"],
    solve: () => ({ pos: destination(pos(36, 5.4, 5, 55.2), toTrue(151, -3 + 2), (10 * 78) / 60) }),
  },
  {
    id: "gva-0355",
    facets: ["pos"],
    solve: () => ({ pos: destination(pos(36, 12.5, 5, 17), toTrue(185, 5), (11 * 45) / 60) }),
  },
  {
    id: "gva-0444",
    facets: ["d", "pos"],
    solve: () => {
      const d = (11 * 156) / 60;
      return { d, pos: destination(pos(36, 0.8, 5, 17.2), toTrue(256, -4 + 10), d) };
    },
  },
  // ---- Ct from a transit or opposition ----
  {
    id: "gva-0041",
    facets: ["ct"],
    solve: () => ({ ct: course(M("carnero"), M("europa")).rv - 70 }),
  },
  {
    // The bank's right option reads "8°" with the minus sign lost (next to a "+ 8°" distractor), so
    // only the position is scored here and the Ct (−8°) is checked separately.
    id: "gva-0445",
    facets: ["pos"],
    solve: () => {
      // South of Trafalgar on the Trafalgar–Roche transit, looking at both in line to the NNW.
      const dvTransit = course(M("trafalgar"), M("roche")).rv;
      const ctot = dvTransit - 331;
      // The ship sees the transit 8° to the right of its true bearing on the compass: Ct = −8°.
      expect(Math.abs(ctot + 8)).toBeLessThanOrEqual(1.5);
      return { pos: fix(transitLine(M("trafalgar"), M("roche")), bearingLine(M("gracia"), 80 + ctot)) };
    },
  },
  {
    id: "gva-0132",
    facets: ["dv"],
    solve: () => ({ dv: relToTrue(course(M("carnero"), M("europa")).rv, 93) }),
  },
  // ---- fixes ----
  {
    id: "gva-0044",
    facets: ["pos"],
    solve: () => {
      const rv = toTrue(70, 5);
      return {
        pos: fix(bearingLine(M("tarifa"), relToTrue(rv, -135)), bearingLine(M("cires"), relToTrue(rv, 80))),
      };
    },
  },
  {
    id: "gva-0175",
    facets: ["pos"],
    solve: () => ({
      pos: fix(bearingLine(M("carnero"), relToTrue(241, 36)), bearingLine(M("europa"), relToTrue(241, 90))),
    }),
  },
  {
    id: "gva-0223",
    facets: ["pos"],
    solve: () => ({ pos: destination(M("europa"), relToTrue(161, 136) + 180, 2) }),
  },
  {
    id: "gva-0310",
    facets: ["pos"],
    solve: () => ({
      pos: fix(bearingLine(M("cires"), relToTrue(253, -90)), bearingLine(M("tarifa"), relToTrue(253, 33))),
    }),
  },
  {
    id: "gva-0086",
    facets: ["pos"],
    solve: () => ({ pos: fix(bearingLine(M("malabata"), 150), bearingLine(M("espartel"), 210)) }),
  },
  {
    id: "gva-0625",
    facets: ["pos"],
    solve: () => {
      const c = -1 - 4;
      return { pos: fix(bearingLine(M("trafalgar"), toTrue(5, c)), bearingLine(M("gracia"), toTrue(95, c))) };
    },
  },
  {
    id: "gva-0715",
    facets: ["pos"],
    solve: () => {
      const c = 1 + 4;
      return {
        pos: fix(bearingLine(M("espartel"), toTrue(213, c)), bearingLine(M("malabata"), toTrue(129, c))),
      };
    },
  },
  {
    id: "gva-0863",
    facets: ["pos"],
    solve: () => ({
      pos: fix(bearingLine(M("tarifa"), toTrue(276, -6)), bearingLine(M("carnero"), toTrue(22, -6))),
    }),
  },
  {
    id: "gva-0134",
    facets: ["d"],
    solve: () => {
      const p = nearest(
        intersectLineCircle(bearingLine(M("espartel"), 180), { center: M("malabata"), r: 13 }),
        M("tarifa"),
      );
      return { d: course(p, M("paloma")).d };
    },
  },
  // ---- pass X miles off ----
  // From SE of Trafalgar heading NW, round the cape to seaward: the cape is to starboard.
  {
    id: "gva-0089",
    facets: ["x"],
    solve: () => ({ x: toCompass(passOff(pos(36, 2.4, 5, 54), M("trafalgar"), 4).starboard, -4 + 2) }),
  },
  // Heading NNW into the Bay of Algeciras, Europa (to the east) stays to starboard.
  {
    id: "gva-0908",
    facets: ["ra"],
    solve: () => ({ ra: toCompass(passOff(pos(36, 1.4, 5, 19.2), M("europa"), 1.8).starboard, 4 + 2) }),
  },
  // Heading ESE along the Spanish coast, Tarifa (to the north) stays to port.
  {
    id: "gva-0265",
    facets: ["ra", "hrb"],
    solve: () => {
      const from = destination(M("trafalgar"), 180, 5);
      const rv = passOff(from, M("tarifa"), 3).port;
      const t = runMinutes(course(from, abeam(from, rv, M("paloma"))).d, 10);
      return { ra: toCompass(rv, -2 - 4), hrb: hrb(12, 0) + t };
    },
  },
  // Heading ESE along the Spanish coast, Tarifa (to the north) stays to port.
  {
    id: "gva-0357",
    facets: ["pos"],
    solve: () => {
      const from = destination(M("trafalgar"), 180, 6);
      const rv = passOff(from, M("tarifa"), 3.5).port;
      return { pos: destination(from, rv, (8 * (hrb(18, 45) - hrb(16, 21))) / 60) };
    },
  },
  // From mid-Strait heading NE, Europa (to the north) stays to port.
  {
    id: "gva-0714",
    facets: ["ra"],
    solve: () => {
      const from = onLineAt(M("carnero"), M("cires"), M("cires"), 4, M("tarifa"));
      const rv = passOff(from, M("europa"), 5).port;
      const at = crossing(from, rv, transitLine(M("europa"), M("almina")));
      if (!at) throw new Error("no crossing");
      const ctot = course(at, M("almina")).rv - 160;
      return { ra: toCompass(rv, ctot) };
    },
  },
  // Heading WSW out of the Strait, Espartel (Africa, to the south) stays to port.
  {
    id: "gva-0403",
    facets: ["dur", "ra"],
    solve: () => {
      const from = fix(transitLine(M("cires"), M("carnero")), bearingLine(M("tarifa"), 291));
      const rv = passOff(from, M("espartel"), 5).port;
      return { dur: runMinutes(course(from, abeam(from, rv, M("espartel"))).d, 8), ra: toCompass(rv, 3) };
    },
  },
  {
    id: "gva-0400",
    facets: ["pos", "ra"],
    solve: () => {
      const p = fix(bearingLine(M("gracia"), toTrue(360, 5)), bearingLine(M("tarifa"), toTrue(95, 5)));
      return { pos: p, ra: toCompass(course(p, destination(M("espartel"), 0, 5.4)).rv, 3 - 4) };
    },
  },
  {
    id: "gva-0042",
    facets: ["ra", "hrb"],
    solve: () => {
      const from = destination(M("trafalgar"), 324 + 180, 5);
      const c = course(from, pos(36, 3.7, 5, 55));
      return { ra: toCompass(c.rv, -5 + 2), hrb: hrb(12, 50) + runMinutes(c.d, 11.5) };
    },
  },
  {
    id: "gva-0222",
    facets: ["hrb"],
    solve: () => {
      const from = onLineAt(M("cires"), M("tarifa"), M("tarifa"), 4, M("cires"));
      return { hrb: hrb(18, 47) + runMinutes(course(from, destination(M("almina"), 0, 3)).d, 10) };
    },
  },
  {
    id: "gva-0268",
    facets: ["pos", "v"],
    solve: () => {
      const from = onLineAt(M("carnero"), M("cires"), M("cires"), 4, M("tarifa"));
      const a = destination(M("malabata"), 0, 4);
      return { pos: a, v: course(from, a).d / 2 };
    },
  },
  {
    id: "gva-0831",
    facets: ["x"],
    solve: () => {
      const from = nearest(
        intersectCircles({ center: M("trafalgar"), r: 8 }, { center: M("gracia"), r: 8 }),
        M("tarifa"),
      );
      return { x: toCompass(course(from, { lat: M("espartel").lat, lon: -360 }).rv, 3 - 3) };
    },
  },
  {
    id: "gva-0909",
    facets: ["hrb"],
    solve: () => {
      const p = fix(
        bearingLine(M("carnero"), relToTrue(257, 35)),
        bearingLine(M("almina"), relToTrue(257, -90)),
      );
      return { hrb: hrb(8, 0) + runMinutes(course(p, destination(M("tarifa"), 135, 3)).d, 7) };
    },
  },
  {
    id: "gva-0954",
    facets: ["hrb"],
    solve: () => {
      const from = destination(M("europa"), 180, 4.4);
      const at = crossing(from, 252, { through: M("tarifa"), brg: 0 });
      if (!at) throw new Error("no crossing");
      return { hrb: hrb(17, 20) + runMinutes(course(from, at).d, 8) };
    },
  },
];

type Q = { id: string; options: string[]; answer: number };
const BANK = new Map((gva as Q[]).map((q) => [q.id, q]));

describe("Strait chart vs real GVA answers", () => {
  for (const c of CASES) {
    it(c.id, () => {
      const q = BANK.get(c.id);
      if (!q) throw new Error(`${c.id} not in the bank`);
      const got = c.solve();
      const scores = q.options.map((o) => score(got, parseOption(o, c.facets)));
      const best = scores.indexOf(Math.min(...scores));
      const rivals = scores.filter((_, i) => i !== q.answer);
      const detail = `got ${JSON.stringify(got)}; scores ${scores.map((s) => s.toFixed(2)).join(" ")}; GVA: ${q.options[q.answer]}`;
      expect(best, detail).toBe(q.answer);
      expect(scores[q.answer], detail).toBeLessThanOrEqual(1);
      // Every option must parse (an unparsed one would silently drop out), and the right one must
      // win clearly: no tie, and a margin over the closest distractor.
      expect(scores.every(Number.isFinite), detail).toBe(true);
      expect(Math.min(...rivals) - (scores[q.answer] ?? 0), detail).toBeGreaterThanOrEqual(0.4);
      if (process.env.CHART_REPORT) console.log(c.id, (scores[q.answer] ?? 0).toFixed(2), detail);
    });
  }
});
