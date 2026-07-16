# Session Status - 2026-07-15

## Cyclosporiasis 2026 threat-intel brief updated to v2

Refreshed `/osint-reports/cyclospora-2026/` (6 files) from July 13 (v1) data to
**July 13, 2026 CDC-verified data** (published Jul 14), then verified every figure
directly against CDC primary pages using Playwright.

### Data changes (v1 to v2)
- CDC-confirmed **843 to 1,645**; under-analysis **>1,500 to >5,100** (~7,000 combined)
- States **31 to 34** (media maps show 32); hospitalizations **86 to 141**; deaths still **0**
- Michigan **~2,600 to ~3,309**; Ohio **364 to ~1,119** (NW region); added North Carolina 240
- Now exceeds the **~4,700-case 2019 US record**
- Emerging suspected vehicle: **lettuce / salad greens** (Michigan lead, FDA investigating
  produce, Taco Bell under investigation), framed throughout as **unconfirmed**, no recall
- Added **MI/OH/WV/KY shared-source cluster** (>400) and **440 travel-associated** cases (35 states)
- Added **Pacific Northwest regional note**: Oregon (14, none outbreak-linked) and King County WA
  (15, 1 local) both at baseline, relevant for WA-based readership
- Prediction 1 (leafy green) to *partially confirmed*; Prediction 3 (count rises) to *confirmed*
- Exact CDC demographics: age 2-95, median 44, 56% female, median onset June 22, 2026

### Verification
Playwright + standard desktop UA retrieved the CDC surveillance, HAN 00531, and outbreak
pages (all HTTP 200) that had 403'd bare curl/WebFetch. All core figures matched CDC source.

### Work tracking
- GitHub issue **#26** (closed)
- PR **#27**: v2 content refresh (merged, `ead6c11`)
- PR **#28**: CDC-verified figures (merged, `197daa8`)

### Follow-ups
- Brief is time-sensitive; a v3 will be warranted as CDC adjudicates the >5,100 under-analysis
  pool and if/when a food vehicle is officially confirmed.
