// Tema 11.2: the interactive practice chart (read coordinates, course and distance, fix by two
// compass bearings) on the Strait chart. Mounted by the tema 11 chapter.
import { $, $$ } from "../core/dom.ts";
import { type TwoBearings, twoBearings } from "./exercises.ts";
import { bearingLine, course, destination, fmtLat, fmtLon, intersectLines, n360, type Pos } from "./geo.ts";
import { MARKS } from "./strait.ts";
import { chartMarkup, mountChart, toXY, WINDOW } from "./view.ts";

const d3 = (x: number) => `${String(Math.round(n360(x)) % 360).padStart(3, "0")}°`;
const signed = (x: number) => `${x >= 0 ? "+" : "−"}${Math.abs(x)}°`;
const dmText = (x: number) => (x === 0 ? "0°" : `${Math.abs(x)}° ${x > 0 ? "E" : "W"}`);
const nm = (d: number) => d.toFixed(1).replace(".", ",");
const f1 = (n: number) => n.toFixed(1);
/** Hold a ± button to keep stepping, faster after a moment. */
function repeatOnHold(b: HTMLElement, step: () => void) {
  let timer = 0;
  const stop = () => window.clearTimeout(timer);
  const run = (delay: number) => {
    step();
    timer = window.setTimeout(() => run(Math.max(40, delay * 0.8)), delay);
  };
  b.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    stop();
    run(400);
  });
  for (const ev of ["pointerup", "pointerleave", "pointercancel"]) b.addEventListener(ev, stop);
  // Keyboard (Enter/Space) still clicks once.
  b.addEventListener("click", (e) => {
    if (e.detail === 0) step();
  });
}

export function practiceHTML(): string {
  return `<div class="widget" id="chPractice"><div class="eyebrow">Interactivo · trabaja sobre la carta del Estrecho</div>
<div class="seg" id="chModes"><button class="btn sm" data-m="pos" aria-pressed="true">Leer coordenadas</button><button class="btn sm ghost" data-m="rd" aria-pressed="false">Rumbo y distancia</button><button class="btn sm ghost" data-m="dem" aria-pressed="false">Situación por 2 demoras</button></div>
${chartMarkup()}
<div id="chPanel" class="info" aria-live="polite"></div></div>
<p class="small muted">Carta dibujada para la app con datos abiertos de la misma zona que la carta 25-C del examen: los faros están donde los sitúan las respuestas de los exámenes reales. Como en cualquier carta Mercator, un minuto de latitud (escala lateral) mide más que uno de longitud (escala de arriba y abajo), y por eso las distancias se miden siempre en la escala lateral. Amplía con + o pellizcando para leer las décimas; las escalas te siguen por los bordes. Con teclado: flechas para moverte, + y − para ampliar, Intro para marcar el centro.<br>Línea de costa © colaboradores de OpenStreetMap (ODbL). Carta de práctica, no apta para navegar.</p>`;
}

type Mode = "pos" | "rd" | "dem";

export function initPractice(root: ParentNode, rand: () => number = Math.random): void {
  const found = $("#chPractice", root);
  const wrap = found && $(".ch-wrap", found);
  const panelEl = $("#chPanel", root);
  if (!found || !wrap || !panelEl) return;
  const box: HTMLElement = found;
  const host: HTMLElement = wrap;
  const panel: HTMLElement = panelEl;
  let mode: Mode = "pos";
  let pts: Pos[] = [];
  let ex: TwoBearings | null = null;
  let guess: [number, number] = [0, 0];
  let solved = false;
  const leftX = toXY({ lat: WINDOW.s, lon: WINDOW.w })[0];
  const bottomY = toXY({ lat: WINDOW.s, lon: WINDOW.w })[1];

  const chart = mountChart(
    wrap,
    (p) => tap(p),
    () => draw(),
  );

  const dot = (p: Pos, cls = "") => {
    const [x, y] = toXY(p);
    return `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(4.5 * chart.unit())}" class="ch-pt ${cls}"/>`;
  };
  const seg = (a: Pos, b: Pos, cls: string) => {
    const [x1, y1] = toXY(a);
    const [x2, y2] = toXY(b);
    // Clipped to the chart frame so long bearing lines don't run over the scales.
    return `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" class="${cls}" clip-path="url(#chClip)"/>`;
  };

  function draw() {
    let s = "";
    if (mode === "pos" && pts[0]) {
      const [x, y] = toXY(pts[0]);
      s += `<line x1="${f1(leftX)}" y1="${f1(y)}" x2="${f1(x)}" y2="${f1(y)}" class="ch-aux"/><line x1="${f1(x)}" y1="${f1(y)}" x2="${f1(x)}" y2="${f1(bottomY)}" class="ch-aux"/>${dot(pts[0])}`;
    }
    if (mode === "rd") {
      const [a, b] = pts;
      if (a && b) {
        const { d } = course(a, b);
        const mid = (a.lat + b.lat) / 2;
        // The same distance on the latitude scale, centred on the course's mean latitude: on the
        // printed border at full view, on the live ruler at the left edge when zoomed.
        const [, y1] = toXY({ lat: mid - d / 2, lon: WINDOW.w });
        const [, y2] = toXY({ lat: mid + d / 2, lon: WINDOW.w });
        const v = chart.view();
        const bx = v.x > 1 || host.hasAttribute("data-dense") ? v.x + 10 * chart.unit() : leftX - 4;
        s += `${seg(a, b, "ch-track")}<line x1="${f1(bx)}" y1="${f1(y1)}" x2="${f1(bx)}" y2="${f1(y2)}" class="ch-bar"/>`;
      }
      s += pts.map((p) => dot(p)).join("");
    }
    if (mode === "dem" && ex) {
      const [a, b] = ex.marks.map((id) => MARKS[id].pos) as [Pos, Pos];
      s += seg(a, destination(a, n360(guess[0] + 180), 30), "ch-track");
      s += seg(b, destination(b, n360(guess[1] + 180), 30), "ch-track b");
      if (solved)
        for (const k of [0, 1] as const) {
          const m = k === 0 ? a : b;
          s += seg(m, destination(m, n360(ex.dv[k] + 180), 30), "ch-sol");
        }
      const cut = intersectLines(bearingLine(a, guess[0]), bearingLine(b, guess[1]));
      if (cut) {
        const [x, y] = toXY(cut);
        s += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(8 * chart.unit())}" class="ch-cut"/>`;
      }
      if (solved) s += dot(ex.ship, "ok");
    }
    chart.layer.innerHTML = s;
  }

  function tap(p: Pos) {
    if (mode === "pos") {
      pts = [p];
      // Don't promise tenths a fingertip can't place: below ~0,12′ per pixel, round to 0,5′ or 1′.
      const res = chart.minutesPerPx();
      const step = res <= 0.12 ? 0 : res <= 0.4 ? 0.5 : 1;
      const r = (m: number) => (step ? Math.round(m / step) * step : m);
      const hint = step
        ? "Amplía la carta para leer las décimas de minuto."
        : "La latitud se lee en la escala lateral y la longitud en la de abajo, siguiendo las líneas de trazos.";
      panel.innerHTML = `<b class="mono">l ${fmtLat(r(p.lat))} · L ${fmtLon(r(p.lon))}</b><br><span class="small muted">${hint}</span>`;
    } else if (mode === "rd") {
      pts = pts.length >= 2 ? [p] : [...pts, p];
      const [a, b] = pts;
      if (a && b) {
        const c = course(a, b);
        panel.innerHTML = `<b>Rv = ${d3(c.rv)}</b> · <b>distancia = ${nm(c.d)} mn</b><br><span class="small">El rumbo de la carta es verdadero. La barra magenta de la escala lateral es esa misma distancia medida en minutos de latitud, a la altura del trayecto: 1′ de latitud = 1 milla.</span><div class="row"><button type="button" class="btn sm ghost" id="chClear">Borrar</button></div>`;
        $("#chClear", panel)?.addEventListener("click", () => setMode("rd"));
      } else panel.textContent = "Ahora toca el punto de llegada.";
    } else return;
    draw();
  }

  function newExercise() {
    ex = twoBearings(rand);
    solved = false;
    guess = [n360(ex.dv[0] + 30 + Math.round(rand() * 40)), n360(ex.dv[1] - 30 - Math.round(rand() * 40))];
    const [na, nb] = ex.marks.map((id) => MARKS[id].name) as [string, string];
    const ctl = (k: 0 | 1, name: string) =>
      `<label class="small" for="chD${k}"><span class="ch-key-${k ? "b" : "a"}">━━</span> Dv al faro de ${name}: <b id="chD${k}V"></b></label><button type="button" class="btn sm ghost" data-k="${k}" data-step="-1" aria-label="Restar un grado a ${name}">−</button><input type="range" id="chD${k}" min="0" max="359" step="1" value="${guess[k]}"><button type="button" class="btn sm ghost" data-k="${k}" data-step="1" aria-label="Sumar un grado a ${name}">+</button>`;
    panel.innerHTML = `<p style="margin-top:0">Tomas a la vez <b>Da ${d3(ex.da[0])}</b> del faro de ${na} y <b>Da ${d3(ex.da[1])}</b> del de ${nb}. dm = ${dmText(ex.dm)}, Δ = ${signed(ex.dev)}. Pasa las dos demoras a verdaderas y ajústalas: cada línea sale del faro hacia el mar (Dv + 180°). Se da por buena a ±1°.</p>
<div id="chOut" class="small" aria-live="polite"></div>
<div class="ch-ctl">${ctl(0, na)}${ctl(1, nb)}</div>
<div class="row"><button class="btn sm" id="chChk">Comprobar</button><button class="btn sm ghost" id="chNew">Otro ejercicio</button></div>`;
    const sync = () => {
      for (const k of [0, 1] as const) {
        const v = $<HTMLInputElement>(`#chD${k}`, panel);
        if (v) v.value = String(guess[k]);
        const out = $(`#chD${k}V`, panel);
        if (out) out.textContent = d3(guess[k]);
      }
      draw();
    };
    for (const k of [0, 1] as const)
      $<HTMLInputElement>(`#chD${k}`, panel)?.addEventListener("input", (e) => {
        guess[k] = Number((e.target as HTMLInputElement).value);
        sync();
      });
    for (const b of $$<HTMLButtonElement>("[data-step]", panel))
      repeatOnHold(b, () => {
        const k = Number(b.dataset.k) as 0 | 1;
        guess[k] = n360(guess[k] + Number(b.dataset.step));
        sync();
      });
    $("#chNew", panel)?.addEventListener("click", newExercise);
    $("#chChk", panel)?.addEventListener("click", () => {
      if (!ex) return;
      const ok = [0, 1].every((k) => Math.abs((((guess[k] ?? 0) - (ex?.dv[k] ?? 0) + 540) % 360) - 180) <= 1);
      solved = true;
      const out = $("#chOut", panel);
      if (out)
        out.innerHTML = `<p class="${ok ? "pass" : "fail"}">${ok ? "✓ Bien trazado." : "✗ Revisa las demoras."}</p><div class="steps">Ct = dm + Δ = ${signed(ex.dm)} ${signed(ex.dev)} = ${signed(ex.ct)}
Dv ${na} = Da + Ct = ${d3(ex.da[0])} ${signed(ex.ct)} = ${d3(ex.dv[0])}
Dv ${nb} = ${d3(ex.da[1])} ${signed(ex.ct)} = ${d3(ex.dv[1])}
Desde cada faro se traza la opuesta (Dv + 180°), hacia el mar.
Situación verdadera: l ${fmtLat(ex.ship.lat)} · L ${fmtLon(ex.ship.lon)}
(En la carta, en verde de trazos, las demoras correctas.)</div>`;
      draw();
    });
    sync();
  }

  const setMode = (m: Mode) => {
    mode = m;
    pts = [];
    ex = null;
    for (const b of $$<HTMLButtonElement>("#chModes button", box)) {
      b.classList.toggle("ghost", b.dataset.m !== m);
      b.setAttribute("aria-pressed", String(b.dataset.m === m));
    }
    if (m === "pos")
      panel.textContent = "Toca cualquier punto de la carta para leer su latitud y su longitud.";
    if (m === "rd") panel.textContent = "Toca el punto de salida y después el de llegada.";
    if (m === "dem") newExercise();
    draw();
  };
  for (const b of $$<HTMLButtonElement>("#chModes button", box))
    b.addEventListener("click", () => setMode(b.dataset.m as Mode));
  setMode("pos");
}
