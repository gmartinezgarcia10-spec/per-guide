// Shared app namespace. Chapters and the app (src/legacy/*) read everything from window.PER,
// so this module must be imported first (see src/main.ts).
import type { LegacyQuestion } from "../content/schema.ts";
import { TOPICS, type Topic, type TopicId } from "../exam/spec.ts";
import { horn } from "./audio.ts";
import { $, $$ } from "./dom.ts";
import { boatTop, buoy, COL } from "./draw.ts";
import { store } from "./store.ts";
import { deg, esc, n360, pm, r, rad, shuffle } from "./util.ts";

export interface Chapter {
  intro: string;
  sections: [id: string, title: string, html: string][];
  init?: (this: Chapter, root: HTMLElement) => void;
  _cleanup?: () => void;
}

/** Topics in the official order (RD 875/2014, annex II). */
const T: readonly Topic[] = TOPICS;
const TBY = Object.fromEntries(T.map((t) => [t.id, t])) as Record<TopicId, Topic>;
/** Chapter content, filled by the chapter modules. */
const CH: Record<number, Chapter> = {};
/** Question bank in app order, filled from window.PER_BANK. */
const Q: LegacyQuestion[] = [];

export const PER = {
  $,
  $$,
  store,
  T,
  TBY,
  CH,
  Q,
  COL,
  buoy,
  boatTop,
  r,
  n360,
  deg,
  pm,
  rad,
  esc,
  shuffle,
  horn,
};

declare global {
  interface Window {
    PER: typeof PER & Record<string, unknown>;
    PER_BANK: { guide: LegacyQuestion[]; real: LegacyQuestion[] };
  }
}

window.PER = PER;
