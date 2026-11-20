// The Strait practice chart as SVG: Mercator projection, latitude and longitude scales on the four
// borders (1′ bars, 0,2′ ticks), meridians and parallels every 10′, land from OSM, the lights with
// their characteristics, a compass rose. Zoom and pan by pinch, ctrl+wheel, buttons or keyboard.
// Drawing on top goes in the `layer` group, in chart units (the viewBox), via the Chart helpers.
import "./chart.css";
import { COAST_SOURCE, LAND } from "./coast.ts";
import { latOfMercY, mercY, type Pos } from "./geo.ts";
import { MARKS, type MarkId } from "./strait.ts";

/** Chart window, minutes: 35°38′–36°20′ N, 006°20′–005°10′ W. */
export const WINDOW = { s: 35 * 60 + 38, n: 36 * 60 + 20, w: -(6 * 60 + 20), e: -(5 * 60 + 10) };
const K = 10; // chart units per minute of longitude
const M = 46; // border width for the scales and their labels
const CW = (WINDOW.e - WINDOW.w) * K;
const CH = (mercY(WINDOW.n) - mercY(WINDOW.s)) * K;
export const SIZE = { w: CW + 2 * M, h: CH + 2 * M };

/** Chart units of a position (x right, y down). */
export const toXY = (p: Pos): [number, number] => [
  M + (p.lon - WINDOW.w) * K,
  M + (mercY(WINDOW.n) - mercY(p.lat)) * K,
];
/** Position of chart units (inverse of toXY). */
export function toPos(x: number, y: number): Pos {
  return { lat: latOfMercY(mercY(WINDOW.n) - (y - M) / K), lon: WINDOW.w + (x - M) / K };
}
export const insideChart = (x: number, y: number): boolean => x >= M && x <= M + CW && y >= M && y <= M + CH;

const f1 = (n: number) => Number(n.toFixed(1));
const deg = (m: number) =>
  `${Math.floor(Math.abs(m) / 60)}°${String(Math.round(Math.abs(m) % 60)).padStart(2, "0")}′`;

/** Where each light's label goes, so neighbours don't collide. */
const LABEL: Record<MarkId, { dx: number; dy: number; anchor: "start" | "end" | "middle" }> = {
  roche: { dx: -8, dy: 2, anchor: "end" },
  trafalgar: { dx: -8, dy: 2, anchor: "end" },
  gracia: { dx: -6, dy: -10, anchor: "end" },
  paloma: { dx: 0, dy: -14, anchor: "middle" },
  tarifa: { dx: 0, dy: 16, anchor: "middle" },
  carnero: { dx: -8, dy: 2, anchor: "end" },
  europa: { dx: 8, dy: 2, anchor: "start" },
  almina: { dx: 0, dy: 16, anchor: "middle" },
  cires: { dx: 0, dy: 16, anchor: "middle" },
  malabata: { dx: 0, dy: 16, anchor: "middle" },
  espartel: { dx: -8, dy: 2, anchor: "end" },
};

function scales(): string {
  let s = "";
  const band = 8;
  // Latitude: left and right borders.
  for (let m = WINDOW.s; m < WINDOW.n; m++) {
    const [, y0] = toXY({ lat: m, lon: WINDOW.w });
    const [, y1] = toXY({ lat: m + 1, lon: WINDOW.w });
    const fill = m % 2 ? "var(--ink)" : "var(--paper)";
    for (const x of [M - band, M + CW]) {
      s += `<rect x="${x}" y="${f1(y1)}" width="${band}" height="${f1(y0 - y1)}" fill="${fill}" stroke="var(--ink)" stroke-width=".4"/>`;
      for (let k = 1; k < 5; k++) {
        const yy = f1(y0 - ((y0 - y1) * k) / 5);
        const [xa, xb] = x < M ? [M - band - 4, M - band] : [M + CW + band, M + CW + band + 4];
        s += `<line x1="${xa}" y1="${yy}" x2="${xb}" y2="${yy}" stroke="var(--ink)" stroke-width=".4"/>`;
      }
    }
    if (m % 5 === 0 && m > WINDOW.s) {
      s += `<text x="${M - band - 6}" y="${f1(y0 - 2)}" class="ch-scale" text-anchor="end">${deg(m)}</text>`;
      s += `<text x="${M + CW + band + 6}" y="${f1(y0 - 2)}" class="ch-scale">${deg(m)}</text>`;
    }
  }
  // Longitude: top and bottom borders.
  for (let m = WINDOW.w; m < WINDOW.e; m++) {
    const [x0] = toXY({ lat: WINDOW.s, lon: m });
    const fill = m % 2 ? "var(--ink)" : "var(--paper)";
    for (const y of [M - band, M + CH]) {
      s += `<rect x="${f1(x0)}" y="${y}" width="${K}" height="${band}" fill="${fill}" stroke="var(--ink)" stroke-width=".4"/>`;
      for (let k = 1; k < 5; k++) {
        const xx = f1(x0 + (K * k) / 5);
        const [ya, yb] = y < M ? [M - band - 4, M - band] : [M + CH + band, M + CH + band + 4];
        s += `<line x1="${xx}" y1="${ya}" x2="${xx}" y2="${yb}" stroke="var(--ink)" stroke-width=".4"/>`;
      }
    }
    if (m % 5 === 0 && m > WINDOW.w) {
      s += `<text x="${f1(x0)}" y="${M - band - 4}" class="ch-scale" text-anchor="middle">${deg(m)}W</text>`;
      s += `<text x="${f1(x0)}" y="${M + CH + band + 12}" class="ch-scale" text-anchor="middle">${deg(m)}W</text>`;
    }
  }
  return s;
}

function grid(): string {
  let s = "";
  for (let m = Math.ceil(WINDOW.s / 10) * 10; m < WINDOW.n; m += 10) {
    const [, y] = toXY({ lat: m, lon: WINDOW.w });
    s += `<line x1="${M}" y1="${f1(y)}" x2="${M + CW}" y2="${f1(y)}" class="ch-grid"/>`;
  }
  for (let m = Math.ceil(WINDOW.w / 10) * 10; m < WINDOW.e; m += 10) {
    const [x] = toXY({ lat: WINDOW.s, lon: m });
    s += `<line x1="${f1(x)}" y1="${M}" x2="${f1(x)}" y2="${M + CH}" class="ch-grid"/>`;
  }
  return s;
}

function land(): string {
  const d = LAND.map(
    (ring) => `M${ring.map(([lat, lon]) => toXY({ lat, lon }).map(f1).join(" ")).join("L")}Z`,
  ).join("");
  return `<path d="${d}" class="ch-land" fill-rule="evenodd"/>`;
}

function lights(): string {
  return (Object.keys(MARKS) as MarkId[])
    .map((id) => {
      const m = MARKS[id];
      const [x, y] = toXY(m.pos).map(f1) as [number, number];
      const l = LABEL[id];
      const light = "light" in m ? `<tspan x="${x + l.dx}" dy="9" class="ch-light">${m.light}</tspan>` : "";
      return `<g class="ch-mark" data-mark="${id}"><path d="M${x} ${y} l9 -6 a10 10 0 0 1 -3 11 z" class="ch-flare"/><circle cx="${x}" cy="${y}" r="2.2" class="ch-dot"/><text x="${x + l.dx}" y="${y + l.dy}" text-anchor="${l.anchor}" class="ch-name">${m.name.replace(/^(Punta de |Punta |Cabo |Isla de )/, '<tspan class="ch-pre">$1</tspan>')}${light}</text></g>`;
    })
    .join("");
}

function rose(): string {
  const [cx, cy] = toXY({ lat: 35 * 60 + 44, lon: -(6 * 60 + 9) }).map(f1) as [number, number];
  let s = `<g class="ch-rose" transform="translate(${cx} ${cy})"><circle r="42"/><circle r="30"/>`;
  for (let a = 0; a < 360; a += 10) {
    const len = a % 90 === 0 ? 10 : a % 30 === 0 ? 7 : 4;
    const t = (a * Math.PI) / 180;
    s += `<line x1="${f1(42 * Math.sin(t))}" y1="${f1(-42 * Math.cos(t))}" x2="${f1((42 - len) * Math.sin(t))}" y2="${f1(-(42 - len) * Math.cos(t))}"/>`;
  }
  for (const a of [0, 90, 180, 270])
    s += `<text x="${f1(52 * Math.sin((a * Math.PI) / 180))}" y="${f1(-52 * Math.cos((a * Math.PI) / 180) + 3)}" text-anchor="middle">${String(a).padStart(3, "0")}</text>`;
  return `${s}<path d="M0 -30 L4 0 L0 30 L-4 0 Z" class="ch-needle"/><text y="-58" text-anchor="middle" class="ch-north">N</text></g>`;
}

function labels(): string {
  const t = (lat: number, lon: number, text: string, cls: string) => {
    const [x, y] = toXY({ lat, lon }).map(f1);
    return `<text x="${x}" y="${y}" class="${cls}" text-anchor="middle">${text}</text>`;
  };
  return (
    t(36 * 60 + 15, -(5 * 60 + 45), "ESPAÑA", "ch-country") +
    t(35 * 60 + 41, -(5 * 60 + 35), "MARRUECOS", "ch-country") +
    t(35 * 60 + 57.5, -(5 * 60 + 47), "Estrecho de Gibraltar", "ch-sea") +
    t(36 * 60 + 2, -(6 * 60 + 12), "Océano Atlántico", "ch-sea")
  );
}

/** The chart widget's markup. `mountChart` brings it to life. */
export function chartMarkup(label = "Carta de práctica del Estrecho"): string {
  const credit = `${COAST_SOURCE.replace(/ \(.*\)$/, "").replace("© OpenStreetMap contributors", "© colaboradores de OpenStreetMap")} · Carta de práctica, no apta para navegar`;
  return `<div class="ch-wrap"><div class="ch-stage"><svg class="ch-svg" viewBox="0 0 ${f1(SIZE.w)} ${f1(SIZE.h)}" role="application" tabindex="0" aria-label="${label}. Flechas para desplazar, + y − para ampliar, Intro para marcar el centro.">
<defs><clipPath id="chClip"><rect x="${M}" y="${M}" width="${f1(CW)}" height="${f1(CH)}"/></clipPath></defs>
<rect width="${f1(SIZE.w)}" height="${f1(SIZE.h)}" class="ch-paper"/>
<g clip-path="url(#chClip)"><rect x="${M}" y="${M}" width="${f1(CW)}" height="${f1(CH)}" class="ch-water"/>${land()}${grid()}${labels()}${rose()}${lights()}
<text x="${M + 4}" y="${f1(M + CH - 4)}" class="ch-credit">${credit}</text></g>
<rect x="${M}" y="${M}" width="${f1(CW)}" height="${f1(CH)}" class="ch-frame"/>${scales()}
<g class="ch-ruler" aria-hidden="true"></g><g class="ch-layer"></g></svg><div class="ch-cross" aria-hidden="true"></div></div>
<div class="ch-zoom"><button type="button" class="btn sm" data-z="in" aria-label="Ampliar">+</button><button type="button" class="btn sm" data-z="out" aria-label="Reducir">−</button><button type="button" class="btn sm ghost" data-z="reset">Ver toda</button></div></div>`;
}

export type Chart = {
  svg: SVGSVGElement;
  layer: SVGGElement;
  /** Chart units per screen pixel right now: multiply by it to keep marks the same size when zoomed. */
  unit: () => number;
  /** Minutes of longitude per screen pixel: how finely a tap can be read right now. */
  minutesPerPx: () => number;
  zoom: () => number;
  /** The part of the chart on screen, in chart units. */
  view: () => { x: number; y: number; w: number; h: number };
  zoomBy: (f: number, at?: [number, number]) => void;
  reset: () => void;
};

const MAX_ZOOM = 8;
/** Above this many chart units per screen pixel (a phone at full view) labels need the room. */
const DENSE = 1.6;

/** Smallest step from `steps` (minutes) whose screen length is at least `px`. */
const pick = (steps: number[], pxPerMin: number, px: number) =>
  steps.find((s) => s * pxPerMin >= px) ?? (steps[steps.length - 1] as number);
const minLabel = (m: number, step: number) => {
  const a = Math.abs(m);
  const d = Math.floor(a / 60 + 1e-9);
  const mm = a - d * 60;
  const min =
    step < 1 ? mm.toFixed(1).replace(".", ",").padStart(4, "0") : String(Math.round(mm)).padStart(2, "0");
  return `${d}°${min}′`;
};

/**
 * Latitude and longitude scales along the left and bottom edges of whatever part of the chart is
 * on screen, so they can be read when zoomed in (the printed border scales are then off screen).
 */
function ruler(vb: { x: number; y: number; w: number; h: number }, u: number): string {
  const bw = 16 * u; // bottom band
  const lw = 44 * u; // left band, wide enough for "36°05′"
  const font = 9 * u;
  const top = toPos(0, vb.y).lat;
  const bottom = toPos(0, vb.y + vb.h).lat;
  const pxLat = K / Math.cos(((top + bottom) / 120) * (Math.PI / 180)) / u;
  const pxLon = K / u;
  let s = `<rect x="${f1(vb.x)}" y="${f1(vb.y)}" width="${f1(lw)}" height="${f1(vb.h)}" class="ch-rband"/><rect x="${f1(vb.x)}" y="${f1(vb.y + vb.h - bw)}" width="${f1(vb.w)}" height="${f1(bw)}" class="ch-rband"/>`;
  const minor = pick([0.1, 0.2, 0.5, 1, 5], pxLat, 5);
  const label = pick([1, 2, 5, 10, 20], pxLat, 28);
  for (let m = Math.ceil(bottom / minor) * minor; m <= top; m += minor) {
    const y = toXY({ lat: m, lon: WINDOW.w })[1];
    if (y > vb.y + vb.h - bw) continue;
    const whole = Math.abs(m - Math.round(m)) < 1e-6;
    const isLabel = whole && Math.round(m) % label === 0;
    const len = (isLabel ? 10 : whole ? 7 : 4) * u;
    s += `<line x1="${f1(vb.x + lw - len)}" y1="${f1(y)}" x2="${f1(vb.x + lw)}" y2="${f1(y)}" class="ch-rtick"/>`;
    if (isLabel)
      s += `<text x="${f1(vb.x + 2 * u)}" y="${f1(y - 2 * u)}" font-size="${f1(font)}" class="ch-rtext">${minLabel(m, 1)}</text>`;
  }
  const minorL = pick([0.1, 0.2, 0.5, 1, 5], pxLon, 5);
  const labelL = pick([1, 2, 5, 10, 20], pxLon, 60);
  const west = toPos(vb.x, 0).lon;
  const east = toPos(vb.x + vb.w, 0).lon;
  for (let m = Math.ceil(west / minorL) * minorL; m <= east; m += minorL) {
    const x = toXY({ lat: WINDOW.s, lon: m })[0];
    if (x < vb.x + lw) continue;
    const whole = Math.abs(m - Math.round(m)) < 1e-6;
    const isLabel = whole && Math.round(m) % labelL === 0;
    const len = (isLabel ? 10 : whole ? 7 : 4) * u;
    const yb = vb.y + vb.h - bw;
    s += `<line x1="${f1(x)}" y1="${f1(yb)}" x2="${f1(x)}" y2="${f1(yb + len)}" class="ch-rtick"/>`;
    if (isLabel)
      s += `<text x="${f1(x + 2 * u)}" y="${f1(vb.y + vb.h - 3 * u)}" font-size="${f1(font)}" class="ch-rtext">${minLabel(m, 1)}W</text>`;
  }
  return s;
}

/**
 * Brings a `chartMarkup` element to life. `onTap` gets chart positions of taps that weren't drags
 * (and of Enter, at the centre of the view). `onView` runs after every zoom or pan.
 */
export function mountChart(wrap: HTMLElement, onTap: (p: Pos) => void, onView: () => void = () => {}): Chart {
  const svg = wrap.querySelector("svg") as SVGSVGElement;
  const layer = svg.querySelector(".ch-layer") as SVGGElement;
  const rulerG = svg.querySelector(".ch-ruler") as SVGGElement;
  const vb = { x: 0, y: 0, w: SIZE.w, h: SIZE.h };
  let ready = false;
  const apply = () => {
    vb.w = Math.min(SIZE.w, Math.max(SIZE.w / MAX_ZOOM, vb.w));
    vb.h = (vb.w * SIZE.h) / SIZE.w;
    vb.x = Math.min(SIZE.w - vb.w, Math.max(0, vb.x));
    vb.y = Math.min(SIZE.h - vb.h, Math.max(0, vb.y));
    svg.setAttribute("viewBox", [vb.x, vb.y, vb.w, vb.h].map(f1).join(" "));
    wrap.dataset.zoom = (SIZE.w / vb.w).toFixed(2);
    // Text keeps a readable screen size (chart.css scales it by --u); on a phone at full view the
    // border scales are too small to read, so the live ruler takes over.
    const u = unit();
    svg.style.setProperty("--u", u.toFixed(3));
    const dense = u > DENSE;
    wrap.toggleAttribute("data-dense", dense);
    rulerG.innerHTML = dense || vb.w < SIZE.w * 0.95 ? ruler(vb, u) : "";
    // At full view a one-finger vertical drag scrolls the page; once zoomed in, it pans the chart.
    svg.style.touchAction = vb.w < SIZE.w * 0.99 ? "none" : "pan-y";
    if (ready) onView();
  };
  // The viewBox maps to the content box (inside the border), not the border box.
  const unit = () => vb.w / (svg.clientWidth || SIZE.w);
  const toChart = (cx: number, cy: number): [number, number] => {
    const b = svg.getBoundingClientRect();
    const w = svg.clientWidth || b.width;
    const h = svg.clientHeight || b.height;
    return [
      vb.x + ((cx - b.left - svg.clientLeft) * vb.w) / w,
      vb.y + ((cy - b.top - svg.clientTop) * vb.h) / h,
    ];
  };
  const zoomBy = (f: number, at: [number, number] = [vb.x + vb.w / 2, vb.y + vb.h / 2]) => {
    const w = Math.min(SIZE.w, Math.max(SIZE.w / MAX_ZOOM, vb.w / f));
    const k = w / vb.w;
    vb.x = at[0] - (at[0] - vb.x) * k;
    vb.y = at[1] - (at[1] - vb.y) * k;
    vb.w = w;
    apply();
  };
  const reset = () => {
    Object.assign(vb, { x: 0, y: 0, w: SIZE.w, h: SIZE.h });
    apply();
  };
  const tap = (x: number, y: number) => {
    if (insideChart(x, y)) onTap(toPos(x, y));
  };

  // Pointers: one finger drags to pan (a tap if it barely moves), two fingers pinch.
  const down = new Map<number, { x: number; y: number }>();
  let moved = false;
  let pinch: { d: number } | null = null;
  svg.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    // A new first finger means any old pointer was lost (e.g. an iOS system gesture): start over.
    if (e.isPrimary) {
      down.clear();
      pinch = null;
    }
    svg.setPointerCapture(e.pointerId);
    down.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (down.size === 1) moved = false;
    if (down.size === 2) {
      const [a, b] = [...down.values()] as [{ x: number; y: number }, { x: number; y: number }];
      pinch = { d: Math.hypot(a.x - b.x, a.y - b.y) };
      moved = true;
    }
  });
  svg.addEventListener("pointermove", (e) => {
    const prev = down.get(e.pointerId);
    if (!prev) return;
    const cur = { x: e.clientX, y: e.clientY };
    if (down.size === 1) {
      if (!moved && Math.hypot(cur.x - prev.x, cur.y - prev.y) < 6) return;
      moved = true;
      const u = unit();
      vb.x -= (cur.x - prev.x) * u;
      vb.y -= (cur.y - prev.y) * u;
      down.set(e.pointerId, cur);
      apply();
    } else if (down.size === 2 && pinch) {
      down.set(e.pointerId, cur);
      const [a, b] = [...down.values()] as [{ x: number; y: number }, { x: number; y: number }];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d > 0 && pinch.d > 0) zoomBy(d / pinch.d, toChart((a.x + b.x) / 2, (a.y + b.y) / 2));
      pinch.d = d;
    }
  });
  const up = (e: PointerEvent) => {
    if (!down.has(e.pointerId)) return;
    down.delete(e.pointerId);
    if (down.size < 2) pinch = null;
    if (down.size === 0 && !moved && e.type === "pointerup") tap(...toChart(e.clientX, e.clientY));
  };
  svg.addEventListener("pointerup", up);
  svg.addEventListener("pointercancel", up);
  svg.addEventListener("lostpointercapture", up);
  // Trackpad pinches arrive as ctrl+wheel; a plain wheel keeps scrolling the page.
  svg.addEventListener(
    "wheel",
    (e) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      zoomBy(Math.exp(-e.deltaY / 200), toChart(e.clientX, e.clientY));
    },
    { passive: false },
  );
  svg.addEventListener("keydown", (e) => {
    // Leave Ctrl/⌘ + − 0 to the browser's own zoom.
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const step = vb.w / 8;
    const keys: Record<string, () => void> = {
      ArrowLeft: () => {
        vb.x -= step;
        apply();
      },
      ArrowRight: () => {
        vb.x += step;
        apply();
      },
      ArrowUp: () => {
        vb.y -= step;
        apply();
      },
      ArrowDown: () => {
        vb.y += step;
        apply();
      },
      "+": () => zoomBy(1.5),
      "=": () => zoomBy(1.5),
      "-": () => zoomBy(1 / 1.5),
      "0": reset,
      Enter: () => tap(vb.x + vb.w / 2, vb.y + vb.h / 2),
    };
    const run = keys[e.key];
    if (run) {
      e.preventDefault();
      run();
    }
  });
  for (const b of wrap.querySelectorAll<HTMLButtonElement>(".ch-zoom button"))
    b.addEventListener("click", () => {
      if (b.dataset.z === "in") zoomBy(1.6);
      else if (b.dataset.z === "out") zoomBy(1 / 1.6);
      else reset();
    });
  apply();
  ready = true;
  // The chart is laid out after the chapter renders and again on rotation: keep text sizes right.
  if (typeof ResizeObserver !== "undefined") new ResizeObserver(() => apply()).observe(svg);
  return {
    svg,
    layer,
    unit,
    minutesPerPx: () => unit() / K,
    zoom: () => SIZE.w / vb.w,
    view: () => ({ ...vb }),
    zoomBy,
    reset,
  };
}
