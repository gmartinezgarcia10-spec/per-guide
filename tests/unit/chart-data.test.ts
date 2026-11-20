import { describe, expect, it } from "vitest";
import coast from "../../src/chart/coast.json";
import { course } from "../../src/chart/geo";
import { MARKS } from "../../src/chart/strait";

const pts = (coast.lines as [number, number][][]).flat().map(([lat, lon]) => ({ lat, lon }));

describe("Strait chart data", () => {
  it("has both coasts of the Strait, with attribution", () => {
    expect(coast.source).toMatch(/OpenStreetMap/);
    const north = pts.filter((p) => p.lat > 36 * 60 + 5).length;
    const south = pts.filter((p) => p.lat < 35 * 60 + 55).length;
    expect(north).toBeGreaterThan(100);
    expect(south).toBeGreaterThan(100);
  });

  it("puts every lighthouse on the coastline (coast and marks agree)", () => {
    for (const [id, m] of Object.entries(MARKS)) {
      const off = Math.min(...pts.map((p) => course(m.pos, p).d));
      expect(off, id).toBeLessThan(0.5);
    }
  });
});
