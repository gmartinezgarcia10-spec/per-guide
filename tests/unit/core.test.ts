import { afterEach, describe, expect, it, vi } from "vitest";
import { boatTop, buoy } from "../../src/core/draw";
import { store } from "../../src/core/store";
import { deg, esc, n360, pm, r, shuffle } from "../../src/core/util";

describe("util", () => {
  it("normalises angles", () => {
    expect([n360(0), n360(360), n360(-10), n360(725)]).toEqual([0, 0, 350, 5]);
  });

  it("formats bearings and signed angles", () => {
    expect([deg(5), deg(-90)]).toEqual(["005°", "270°"]);
    // Rounds after normalising, so values just under 360 print as "360°" (legacy behaviour, kept on purpose).
    expect(deg(359.6)).toBe("360°");
    expect([pm(3), pm(-3), pm(0)]).toEqual(["+3°", "−3°", "+0°"]);
  });

  it("escapes HTML", () => {
    expect(esc(`<b a="1">&</b>`)).toBe("&lt;b a=&quot;1&quot;&gt;&amp;&lt;/b&gt;");
    expect(esc(42)).toBe("42");
  });

  it("r stays within bounds and shuffle keeps every element", () => {
    for (let i = 0; i < 200; i++) {
      const x = r(3, 5);
      expect(x).toBeGreaterThanOrEqual(3);
      expect(x).toBeLessThanOrEqual(5);
    }
    const a = [1, 2, 3, 4, 5, 6];
    const s = shuffle(a);
    expect(s).not.toBe(a);
    expect([...s].sort()).toEqual(a);
  });
});

describe("store", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("prefixes keys with per2: and round-trips JSON", () => {
    const m = new Map<string, string>();
    vi.stubGlobal("localStorage", {
      getItem: (k: string) => m.get(k) ?? null,
      setItem: (k: string, v: string) => m.set(k, v),
    });
    store.set("state", { v: 2 });
    expect([...m.keys()]).toEqual(["per2:state"]);
    expect(store.get("state", null)).toEqual({ v: 2 });
    expect(store.get("missing", "default")).toBe("default");
  });

  it("falls back silently when storage is unavailable", () => {
    vi.stubGlobal("localStorage", {
      getItem: () => {
        throw new Error("blocked");
      },
      setItem: () => {
        throw new Error("blocked");
      },
    });
    expect(store.get("state", 7)).toBe(7);
    expect(() => store.set("state", 1)).not.toThrow();
  });
});

describe("draw", () => {
  it("draws a north cardinal buoy with two up cones and black-over-yellow bands", () => {
    const s = buoy(["b", "y"], "NN");
    expect(s.match(/<polygon/g)).toHaveLength(2);
    expect(s).toContain('fill="var(--black)"');
    expect(s).toContain('fill="var(--yellow)"');
    expect(s.startsWith("<svg")).toBe(true);
  });

  it("draws a boat rotated about its centre", () => {
    expect(boatTop(10, 20, 100, 45)).toContain('transform="translate(10 20) rotate(45)"');
  });
});
