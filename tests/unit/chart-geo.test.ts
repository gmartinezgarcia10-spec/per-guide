import { describe, expect, it } from "vitest";
import {
  abeam,
  angleDiff,
  bearingLine,
  course,
  crossing,
  ct,
  destination,
  fmtPos,
  hhmm,
  intersectCircles,
  intersectLineCircle,
  intersectLines,
  nearest,
  parseHhmm,
  passOff,
  pos,
  relToTrue,
  toCompass,
  toTrue,
  transitLine,
} from "../../src/chart/geo";

const A = pos(36, 0, 5, 30);
const close = (a: number, b: number, tol: number) => expect(Math.abs(a - b)).toBeLessThanOrEqual(tol);
const closeAngle = (a: number, b: number, tol: number) =>
  expect(Math.abs(angleDiff(a, b))).toBeLessThanOrEqual(tol);

describe("course and destination", () => {
  it("measures north, south, east and west", () => {
    expect(course(A, pos(36, 10, 5, 30))).toEqual({ rv: 0, d: 10 });
    const s = course(A, pos(35, 50, 5, 30));
    close(s.rv, 180, 1e-9);
    close(s.d, 10, 1e-9);
    // 10′ of longitude at 36° N is 10·cos 36° ≈ 8,09 miles.
    const e = course(A, pos(36, 0, 5, 20));
    close(e.rv, 90, 1e-9);
    close(e.d, 8.09, 0.01);
    closeAngle(course(A, pos(36, 0, 5, 40)).rv, 270, 1e-9);
  });

  it("matches a real exam distance (gva-0313: 26,4 millas)", () => {
    // The exam value is measured with dividers; the exact rhumb distance is 26,27.
    close(course(pos(36, 0, 5, 20), pos(35, 50, 5, 50)).d, 26.4, 0.2);
  });

  it("destination is the inverse of course, including close to due east and west", () => {
    for (const rv of [0, 37, 89.95, 90, 90.1, 135, 180, 222, 269.95, 270, 333]) {
      const b = destination(A, rv, 12.5);
      const c = course(A, b);
      // Near due E/W both switch to the departure formula; the seam costs about a centimetre.
      closeAngle(c.rv, rv, 1e-4);
      close(c.d, 12.5, 1e-4);
    }
  });
});

describe("lines and circles", () => {
  it("a bearing line runs from the mark out to sea, on the reciprocal", () => {
    expect(bearingLine(A, 30).brg).toBe(210);
    expect(bearingLine(A, 200).brg).toBe(20);
  });

  it("two bearings cross where the ship is", () => {
    const ship = pos(35, 55, 5, 35);
    const m1 = pos(36, 3, 5, 40);
    const m2 = pos(35, 52, 5, 28);
    const fix = intersectLines(bearingLine(m1, course(ship, m1).rv), bearingLine(m2, course(ship, m2).rv));
    expect(fix).not.toBeNull();
    close(fix?.lat ?? 0, ship.lat, 1e-6);
    close(fix?.lon ?? 0, ship.lon, 1e-6);
    expect(intersectLines(transitLine(m1, m2), transitLine(m1, m2))).toBeNull();
  });

  it("a bearing traced the wrong way gives no fix", () => {
    const ship = pos(35, 55, 5, 35);
    const m1 = pos(36, 3, 5, 40);
    const m2 = pos(35, 52, 5, 28);
    const dv1 = course(ship, m1).rv;
    const dv2 = course(ship, m2).rv;
    expect(intersectLines(bearingLine(m1, dv1 + 180), bearingLine(m2, dv2))).toBeNull();
    expect(intersectLines(bearingLine(m1, dv1), bearingLine(m2, dv2 + 180))).toBeNull();
  });

  it("lines less than half a degree from parallel give no fix", () => {
    const m1 = pos(36, 3, 5, 40);
    const m2 = pos(35, 52, 5, 28);
    expect(intersectLines({ through: m1, brg: 90 }, { through: m2, brg: 90.3 })).toBeNull();
    expect(intersectLines({ through: m1, brg: 90 }, { through: m2, brg: 91 })).not.toBeNull();
  });

  it("a transit is the infinite line through both marks", () => {
    const m1 = pos(36, 3, 5, 40);
    const m2 = pos(35, 52, 5, 28);
    const t = transitLine(m1, m2);
    expect(t.ray).toBeUndefined();
    // It cuts a meridian east of both marks, beyond m2.
    const p = intersectLines(t, { through: pos(35, 0, 5, 20), brg: 0 });
    close(p?.lon ?? 0, -(5 * 60 + 20), 1e-9);
    expect(p?.lat ?? 0).toBeLessThan(m2.lat);
  });

  it("two distance circles give both crossings, each at the right distances", () => {
    const m1 = pos(36, 3, 5, 40);
    const m2 = pos(35, 58, 5, 35);
    const fixes = intersectCircles({ center: m1, r: 5 }, { center: m2, r: 4 });
    expect(fixes).toHaveLength(2);
    for (const f of fixes) {
      close(course(m1, f).d, 5, 0.01);
      close(course(m2, f).d, 4, 0.01);
    }
    expect(intersectCircles({ center: m1, r: 1 }, { center: m2, r: 1 })).toEqual([]);
  });

  it("bearing and distance to one mark", () => {
    const [near, far] = intersectLineCircle(bearingLine(A, 0), { center: A, r: 4 });
    // On the south side of the mark (it bears north of us) at 4 miles.
    const s = [near, far].find((p) => (p?.lat ?? 0) < A.lat);
    // Distance arcs are circles on the chart plane, good to a few metres at these ranges.
    close(course(A, s ?? A).d, 4, 0.01);
    closeAngle(course(A, s ?? A).rv, 180, 1e-6);
  });
});

describe("passing off and abeam", () => {
  it("the tangent courses pass exactly r miles off", () => {
    const from = pos(36, 5, 5, 50);
    const mark = pos(36, 0, 5, 36);
    const { port, starboard } = passOff(from, mark, 3);
    for (const rv of [port, starboard]) {
      const b = abeam(from, rv, mark);
      close(course(b, mark).d, 3, 0.01);
    }
    // Heading roughly east-south-east with the mark to the south-east: keeping it to port means the
    // course is to the right (larger) of the direct course.
    expect(angleDiff(port, course(from, mark).rv)).toBeGreaterThan(0);
    expect(angleDiff(starboard, course(from, mark).rv)).toBeLessThan(0);
    expect(() => passOff(from, mark, 20)).toThrow();
  });

  it("crossing finds the point ahead on the track, never behind", () => {
    const meridian = { through: pos(36, 0, 5, 40), brg: 0 };
    const ahead = crossing(pos(36, 0, 5, 50), 90, meridian);
    close(ahead?.lon ?? 0, -(5 * 60 + 40), 1e-9);
    expect(crossing(pos(36, 0, 5, 50), 270, meridian)).toBeNull();
  });

  it("nearest picks the candidate closest to a rough position", () => {
    const a = pos(36, 0, 5, 30);
    const b = pos(35, 50, 5, 30);
    expect(nearest([a, b], pos(35, 52, 5, 31))).toBe(b);
    expect(() => nearest([], a)).toThrow();
  });

  it("abeam is the foot of the perpendicular", () => {
    const b = abeam(pos(36, 0, 5, 50), 90, pos(36, 3, 5, 40));
    close(b.lat, 36 * 60, 1e-6);
    close(b.lon, -(5 * 60 + 40), 1e-6);
  });
});

describe("compass, time and formatting", () => {
  it("converts compass to true and back", () => {
    expect(toTrue(12, -6)).toBe(6);
    expect(toTrue(358, 5)).toBe(3);
    expect(toCompass(3, 5)).toBe(358);
    expect(relToTrue(241, 36)).toBe(277);
    expect(relToTrue(70, -135)).toBe(295);
    expect(ct(-4, 2)).toBe(-2);
  });

  it("formats and parses HRB", () => {
    expect(hhmm(19 * 60 + 27)).toBe("19:27");
    expect(hhmm(24 * 60 + 5)).toBe("00:05");
    expect(hhmm(23 * 60 + 59.6)).toBe("00:00");
    expect(hhmm(-10)).toBe("23:50");
    expect(parseHhmm("1727")).toBe(17 * 60 + 27);
    expect(parseHhmm("17:27")).toBe(17 * 60 + 27);
  });

  it("formats positions as on the chart", () => {
    expect(fmtPos(pos(36, 7, 6, 2.1))).toBe("l 36° 07,0′ N · L 006° 02,1′ W");
    expect(fmtPos(pos(35, 59.96, 5, 9.04))).toBe("l 36° 00,0′ N · L 005° 09,0′ W");
  });
});
