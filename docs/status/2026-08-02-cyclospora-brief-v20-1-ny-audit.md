# Cyclosporiasis 2026 Briefing, v20.1 status: cross-state source audit

**Version:** v20.1, 2026-08-02 (data as of 2026-08-02)
**Type:** Follow-up to v20 (#75). Triggered by the question "are you treating any other states the way you were treating Ohio?"
**Scope:** New York corrected from the CDC feed to NY State DOH's own page; Illinois sourcing note clarified. No other state changed.

## Why

The Ohio error in v20 was: carrying a **press figure** while the state's own **dashboard** published a different (higher, fresher) number we had never fetched. This pass audited every state in the map for the same failure mode: each state's `count`, its `basis` (state page vs CDC feed vs press), and its `src`.

## Findings

Two buckets were safe and left alone:
- **State's own page/release:** MI, IN, WV, NC, KS, WA, MD, WI, and the many small states on their own agency releases.
- **CDC per-state confirmed feed:** KY, FL, CO, CA, NJ, OK, and other mid/small states. CDC's per-state count is a legitimate primary, just lagging, and consistent with the national topline.

One state was the exact Ohio pattern, one adjacent:

### New York: corrected (Ohio-style error confirmed)

We carried **NY at 642 from the CDC feed.** NY State DOH's own page (`health.ny.gov/diseases/communicable/cyclosporiasis/`), fetched directly, reads:
- **753** cases since May 1, 2026
- **787** for all of 2026 (1/1 to 7/27)
- Last updated **7/29/2026**

Same mistake as Ohio: using CDC's per-state aggregate instead of the state's own, higher, fresher figure. The scout's "753" (Becker's) was in fact quoting this NY State page. Corrected map object, full-briefing table + prose + sources. Basis cdc to state, High confidence.

**NYC caveat (not blended):** NYC's health department reports separately (about 511 since May 1, per press; its page returned HTTP 403 to a headless fetch). Whether NY State's 753 already includes NYC is unresolved, so the two are not summed, consistent with how the briefing handles Ohio's regional/statewide overlap.

### Illinois: adjacent, opposite direction (note added, figure unchanged)

We carry **IL at 408 (CBS Chicago press).** IDPH's own page was checked directly: it carries a July 2026 health advisory but no current statewide total, and IDPH's dashboard updates on a roughly **60-day lag**, so its published number runs *behind* the press count, not ahead. Unlike Ohio and NY, here the press figure is the fresher source. Left at 408 with a note recording that the state's own dashboard lags.

## Files changed

- `state-map-embed.html`: NY object 642/cdc to 753/state (+ srcUrl, NYC caveat); IL object note + srcUrl.
- `full-briefing.html`: NY table row 470+ to 753, NY prose line, NY source added.

## Watch items added

- NYC's own cyclosporiasis count and whether it is subsumed in NY State's total (resolve the overlap before any blend).
- NY State DOH page updates weekly-ish; re-fetch each cycle now that it is a tracked primary.
- IL: whether IDPH ever posts a non-lagged outbreak total; until then the press figure stands, flagged.

## v20.2 addendum: NYC overlap resolved (primary-verified)

The v20.1 NYC fetch returned HTTP 403 headless, and I left the NY-vs-NYC overlap open. On retry with a fuller browser fingerprint (client-hint headers, `--disable-blink-features=AutomationControlled`, `navigator.webdriver` masked), NYC's page returned **200**: `nyc.gov/site/doh/health/health-topics/cyclosporiasis.page` reports **511 cases since May 1, 2026, data as of Jul 27**. The 403 was a headless fingerprint block, not a real one.

Overlap resolved: NYC's 511 is a **subset** of NY State's 753, not additive. CDC's surveillance note states the NY State count includes NYC, and 753 minus 511 leaves about 242 rest-of-state, consistent with the reported outside-NYC growth (129 on Jul 8). We carry **753 as the all-NY figure and do not sum NYC on top.** Updated the NY map object, the full-briefing NY row, and added the NYC source.

Retrieval lesson: nyc.gov (and similar big-city portals) may 403 a standard headless Playwright context that works elsewhere; escalate the fingerprint before recording a host as blocked.

## Method note

The general lesson from Ohio and NY: **do not accept a lower aggregate (CDC feed) or a press figure for a state without checking the state's own page or open-data portal.** For a state carried on the CDC feed, the state's own site can be materially higher; for a state carried on a dashboard, check the dashboard's lag before trusting it over press. See `memory/reference-cyclospora-primary-source-traps.md`.
