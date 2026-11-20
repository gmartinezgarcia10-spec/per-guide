# 0005: Our own Strait chart from open data, validated against the real exams

Date: 20 Nov 2026 · Status: accepted (C0)

## Context
Every one of the 94 real GVA chart questions is set on carta 25-C (Estrecho de Gibraltar) and names its real lights: Trafalgar, Espartel, Tarifa, Carnero, Europa, Cires, Malabata… Tema 11's practice chart is invented, so nothing practised on it carries over. The 25-C itself is a copyrighted IHM chart and the app will be sold, so we can't scan or trace it.

## Decision
- Build our own chart of the same area from open data:
  - **Coastline:** OpenStreetMap `natural=coastline`, simplified. © OpenStreetMap contributors, ODbL: credit OSM in the app, and the extracted coastline file stays under ODbL.
  - **Lights and marks:** positions and light characteristics are facts. They come from OSM seamarks, and from the US NGA *List of Lights* Pub. 113 (public domain) where OSM has gaps: Moroccan port lights, Punta Alcázar.
  - No text, symbols or drawings are copied from 25-C.
- `src/chart/geo.ts` solves on the Mercator plane (rhumb lines, as with a protractor on the chart). It is pure and unit-tested.
- **The real exams are the reference.** `tests/unit/chart-gva.test.ts` solves real questions with our marks and checks that GVA's marked option is the closest of the four, within paper-reading tolerance: 0.5′ position, 2° course, 0.4 mn, 4 min.
  - The right option must also beat the closest distractor by a clear margin, and every option must parse.
  - C0 covers 36 questions using 11 lights. Most answers land within 0.1–0.3′, and the worst is 0.6 of tolerance.
  - The positions are the OSM values as downloaded: none was adjusted to fit the answers. Moving one light by 0.6′ fails four cases.
  - Bearing lines are rays from the mark out to sea, so a bearing traced the wrong way gives no fix.

## Consequences
- A mark can only be added or moved together with a validation case that uses it. Light characteristics (from OSM) aren't validated yet; Punta de Gracia's matches the exam text.
- OSM has WGS84 positions and 25-C is an older chart. So far they agree within reading accuracy, and the validation test is the guard.
- **Still missing**, needed by later cases:
  - Punta Alcázar;
  - the lights of Ceuta, Tánger and the Barbate entrance;
  - the peaks used in transits (Silla del Papa, Órganos, Gitano, Sem-Sem);
  - depth contours (50, 200 and 500 m: EMODnet or GEBCO, both with attribution);
  - the compass-rose dm.
- Two bank issues found by the validation:
  - gva-0445: the correct option "8°" lost its minus sign (Ct −8°) next to a "+ 8°" distractor;
  - several statements leave the dm out ("la dm de la carta").
