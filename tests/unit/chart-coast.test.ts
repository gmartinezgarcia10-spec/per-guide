import { describe, expect, it } from "vitest";
import { COAST_BOUNDS, distanceToCoast, LAND, onLand } from "../../src/chart/coast";
import { pos } from "../../src/chart/geo";
import { WINDOW } from "../../src/chart/view";

describe("land polygons", () => {
  it("covers the whole chart window, so open coasts close outside it", () => {
    expect(COAST_BOUNDS.s).toBeLessThan(WINDOW.s);
    expect(COAST_BOUNDS.n).toBeGreaterThan(WINDOW.n);
    expect(COAST_BOUNDS.e).toBeGreaterThan(WINDOW.e);
    // West of the data is open Atlantic: the window's west edge must still classify as water.
    expect(onLand({ lat: (WINDOW.s + WINDOW.n) / 2, lon: WINDOW.w })).toBe(false);
  });

  it("closes the coasts on the right side (land on the left of the OSM line)", () => {
    expect(LAND.length).toBeGreaterThanOrEqual(2);
    const mid = (a: number, b: number) => (a + b) / 2;
    // North edge mid is Spain, south edge mid is Morocco, the middle of the window is the Strait.
    expect(onLand({ lat: WINDOW.n, lon: mid(WINDOW.w, WINDOW.e) })).toBe(true);
    expect(onLand({ lat: WINDOW.s, lon: mid(WINDOW.w, WINDOW.e) })).toBe(true);
    expect(onLand({ lat: mid(WINDOW.s, WINDOW.n), lon: mid(WINDOW.w, WINDOW.e) })).toBe(false);
  });

  it("knows land from water on both coasts", () => {
    // Land: Tarifa town, Vejer, inland Tangier, Ceuta's Monte Hacho, the Rock.
    for (const p of [
      pos(36, 1.5, 5, 36),
      pos(36, 15.5, 5, 58),
      pos(35, 45, 5, 50),
      pos(35, 53.8, 5, 17.2),
      pos(36, 8, 5, 21),
    ])
      expect(onLand(p), JSON.stringify(p)).toBe(true);
    // Water: mid-Strait, off Trafalgar, the Bay of Algeciras, the Atlantic approach, off Ceuta.
    for (const p of [
      pos(35, 57, 5, 35),
      pos(36, 7, 6, 5),
      pos(36, 6, 5, 24),
      pos(35, 55, 6, 10),
      pos(35, 56, 5, 18),
    ])
      expect(onLand(p), JSON.stringify(p)).toBe(false);
  });

  it("measures distance to the coast", () => {
    // Mid-Strait off Tarifa is a few miles from either coast; a point on a light is on it.
    const mid = distanceToCoast(pos(35, 57, 5, 35));
    expect(mid).toBeGreaterThan(1);
    expect(mid).toBeLessThan(5);
    expect(distanceToCoast(pos(36, 10.97, 6, 2.11))).toBeLessThan(0.3);
  });
});
