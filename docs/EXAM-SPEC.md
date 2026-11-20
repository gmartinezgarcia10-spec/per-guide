# PER exam specification (Generalitat Valenciana)

Checked **20 Nov 2026** against the GVA procedure page [sede.gva.es · id_proc=927](https://sede.gva.es/es/detall-tramit?id_proc=927), which cites RD 875/2014 and DOGV nº 10296 (05/02/2026). This file is the single source of truth for the exam simulator, scoring and readiness. If the page changes, update this file first and then the code.

## Theory exam: PER

| Rule | Value | Source text (GVA) |
|---|---|---|
| Questions | 45, multiple choice, 4 options, 1 correct | "Resolución de 45 preguntas tipo test … con 4 respuestas alternativas siendo únicamente una válida" |
| Duration | 90 min | "(Duración del examen 1 hora y 30 minutos)" |
| Pass mark | ≥ 32 correct (so ≤ 13 errors) | "resolver correctamente 32 preguntas en total" |
| Carta de navegación | ≥ 2 of 4 | "un mínimo de 2 aciertos de las cuatro preguntas de carta de navegación" |
| RIPA (abordajes) | ≥ 5 of 10 | "un mínimo de 5 aciertos de las diez preguntas sobre reglamentos de abordaje" |
| Balizamiento | ≥ 3 of 5 | "un mínimo de 3 aciertos de las cinco preguntas sobre balizamiento" |
| Wrong answers | no penalty | "Las respuestas erróneas no invalidan una correcta" |
| Fail but meet PNB rules | graded *apto* PNB (GVA only), with a complementary exam allowed within 2 sittings | see PNB below |

### Questions per topic (RD 875/2014, annex II, as encoded in `T[]`)

| # | Key | Topic | Questions | Minimum correct |
|---|---|---|---|---|
| 1 | nom | Nomenclatura náutica | 4 | – |
| 2 | amarre | Amarre y fondeo | 2 | – |
| 3 | seg | Seguridad en la mar | 4 | – |
| 4 | leg | Legislación | 2 | – |
| 5 | baliz | Balizamiento | 5 | 3 |
| 6 | ripa | Reglamento (RIPA) | 10 | 5 |
| 7 | man | Maniobra y navegación | 2 | – |
| 8 | emerg | Emergencias en la mar | 3 | – |
| 9 | meteo | Meteorología | 4 | – |
| 10 | teoria | Teoría de navegación | 5 | – |
| 11 | carta | Carta de navegación | 4 | 2 |
| | | **Total** | **45** | **32** |

**Status of the current app:** it matches this spec. The simulator uses 45 questions spread by topic, a 90-minute timer, the 32-correct pass mark and the three minimums. One thing is missing: it doesn't report the PNB fallback result (planned for phase 2).

## Related exams (for reference and the PNB fallback)

| Exam | Questions | Pass | Minimums | Duration |
|---|---|---|---|---|
| PNB | 27 | 17 | RIPA ≥ 5/10, balizamiento ≥ 3/5 | 45 min |
| PER complementario | 18 | 15 | carta ≥ 2/4 | 45 min |

## 2026 sittings (GVA)

| Province | Date | Registration |
|---|---|---|
| Valencia (1st) | 24–25 Apr 2026 | 23 Feb – 4 Mar |
| Alicante | 3–4 Jul 2026 | 25 May – 3 Jun |
| Castellón | 3 Oct 2026 | 1–10 Sep |
| **Valencia (2nd)** | **11–12 Dec 2026**. PER is normally on **Saturday 12 Dec**; the timetable comes out at least one week before | 26 Oct – 4 Nov (closed) |

**Bring:** original ID (DNI/NIE/passport; a digital driving licence is not accepted), the Modelo 046 receipt, and a pen, nautical protractor, ruler, set squares and compass. A non-programmable scientific calculator is allowed. The PER fee is €62.97.

## Open items
- The page shows no last-updated date. Check it again about a week before 12 Dec 2026 for the timetable and venue.
- PNB fallback scoring isn't in the app yet.
