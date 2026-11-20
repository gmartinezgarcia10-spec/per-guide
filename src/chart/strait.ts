// Marks of the Strait of Gibraltar practice area (the area of the exam chart, carta 25-C).
// Positions are facts, not copied from the chart: they come from OpenStreetMap (© OpenStreetMap
// contributors, ODbL) and are checked against the positions the real GVA exam answers imply
// (tests/unit/chart-gva.test.ts). All positions are the OSM values as downloaded, not adjusted to fit
// the exams; light characteristics are OSM's and not yet checked. See docs/decisions/0005.
import { type Pos, pos } from "./geo.ts";

export type MarkKind = "faro" | "luz" | "marca";
export type Mark = {
  name: string;
  kind: MarkKind;
  pos: Pos;
  /** Light characteristic in the notation the GVA exams use ("Oc(2) 5s 13M"), when it has a light. */
  light?: string;
};

export const MARKS = {
  roche: { name: "Cabo Roche", kind: "faro", pos: pos(36, 17.73, 6, 8.4), light: "Fl(4) 24s 20M" },
  trafalgar: {
    name: "Cabo Trafalgar",
    kind: "faro",
    pos: pos(36, 10.97, 6, 2.11),
    light: "Fl(2+1) 15s 22M",
  },
  gracia: { name: "Punta de Gracia", kind: "faro", pos: pos(36, 5.4, 5, 48.63), light: "Oc(2) 5s 13M" },
  paloma: { name: "Punta Paloma", kind: "faro", pos: pos(36, 3.83, 5, 43.22) },
  tarifa: { name: "Isla de Tarifa", kind: "faro", pos: pos(36, 0.07, 5, 36.57) },
  carnero: { name: "Punta Carnero", kind: "faro", pos: pos(36, 4.63, 5, 25.58) },
  europa: { name: "Punta Europa", kind: "faro", pos: pos(36, 6.58, 5, 20.69) },
  almina: { name: "Punta Almina", kind: "faro", pos: pos(35, 53.9, 5, 16.85) },
  cires: { name: "Punta Cires", kind: "faro", pos: pos(35, 54.61, 5, 28.89) },
  malabata: { name: "Punta Malabata", kind: "faro", pos: pos(35, 49.01, 5, 44.98), light: "Fl 5s 22M" },
  espartel: { name: "Cabo Espartel", kind: "faro", pos: pos(35, 47.46, 5, 55.42) },
} satisfies Record<string, Mark>;

export type MarkId = keyof typeof MARKS;
export const mark = (id: MarkId): Pos => MARKS[id].pos;
