# Cyclosporiasis 2026 briefing: State Involvement Map (2026-07-23)

## What shipped
New interactive page `osint-reports/cyclospora-2026/state-map.html`: a geographic US choropleth (base map reused from clearthemud.org / ctm-landing) showing every state color-coded by 2026 cyclosporiasis outbreak involvement, with per-state case-count labels, the 5-state lettuce cluster outlined, hover/focus tooltips, a data-table view, and a reporting-completeness note.

Wired in as the focal point: a full-width featured card at the top of the briefing index card-grid, plus a "State Map" link in the footer nav of the four content pages.

## Data provenance (verified 2026-07-23)
A full 50-state + DC sweep established that the map is near-complete and that "gray" is now a verified status, not a collection gap:
- 46 jurisdictions publish a 2026 figure.
- Only 5 publish none: Montana (0 cases), DC, Minnesota, North Dakota, Vermont.
- 2 official state pages blocked our fetch with HTTP 403 (Arizona ein.az.gov, Arkansas healthy.arkansas.gov); their counts were recovered from state-attributed press and are shown.

Two number systems are kept separate on the page and never blended on one scale:
- State health-dept totals (confirmed + probable), marked bold.
- CDC weekly feed (lab-confirmed only, lags), marked with the approx sign.
- Single secondary reports marked with an asterisk.

Attribution discipline: only Indiana, Kentucky, Michigan, Ohio, West Virginia are the Taco Bell / Taylor Farms de Mexico lettuce cluster (outlined). Nearly every other reporting state explicitly says its cases are seasonal, travel-related, or otherwise separate and NOT lettuce-linked.

## Tiering
Color reflects magnitude of reported cases: HIGH (4 states) / ELEV / MOD / BASE / gray (no published figure). North Carolina (561) is a large but separate outbreak. Texas and Florida flagged as endemic-baseline watch.

## Accessibility
Keyboard-focusable states with aria-labels, halo'd labels for contrast on the dark theme, a table view so identity is not color-alone, status text paired with color, CSP-compatible (inline script/style only, no external resources).

## Status
DRAFT PR. Case figures are time-sensitive and need Jeff's review before publish. The map is regenerated from `build_map.py` (standalone) and `build_site_page.py` (site chrome) in the consulting-plugin scratchpad; per-state figures live in the `D` object.

## Next update should check
- Whether Arizona and Arkansas official pages become fetchable (drop the press-sourced caveat if so).
- Whether Montana / DC / Minnesota / North Dakota / Vermont begin publishing a 2026 figure (flip them off gray).
- Refresh per-state counts on the daily cadence using the collection methodology memory (reference-cyclospora-state-data-collection).
- Add a manual label-position override for any concave state whose centered number reads oddly.


## Update (2026-07-23, focal-point pass)
Made the map the hero of the landing page instead of a footer link buried under the narrative. Re-architected to a single data source to prevent drift under the daily routine:
- `state-map-embed.html` is the chromeless map and the ONLY place the per-state `D` data object lives. It auto-reports its height to the parent via postMessage.
- `index.html` embeds it as the hero, immediately below `<main>` and above the "What changed" narrative (which is now secondary). The redundant featured card was removed.
- `state-map.html` (full page) now embeds the same iframe rather than duplicating the map, keeping the "reading honestly" methodology section as page content.
- CSP on index and state-map.html gained `frame-src 'self'`; the embed sets `frame-ancestors 'self'`.
Routine note: per-state figure edits now target `state-map-embed.html` only.
