# Cyclosporiasis Briefing - Primary-Source Pass (post-v11)

**Date:** 2026-07-24
**Repo:** Circle6Systems/Circle6website
**Scope:** `osint-reports/cyclospora-2026/state-map-embed.html`
**Driver:** manual local run (cloud sandbox routine unreliable; see the new `update-the-c6s-daily-brief` trigger)
**Refs:** issue #51; PRs #52, #53, #54 (all merged to `main`)

## Objective

Tie the automated state-map research to primary government sources: for every non-dashboard state, locate the official newsroom/release/dashboard, add a linkable source to the map, and correct any figure the primary contradicted.

## What shipped

### Schema + rendering
- Added a `srcUrl` field to each per-state `D` entry.
- New **Source** column in the data table: renders a linked agency name when `srcUrl` is present, plain text otherwise.
- Tooltip now reads "Primary source" (with an up-right arrow) when a government URL exists, "Source" otherwise.
- Fallback-safe: entries without `srcUrl` still render.

### Source coverage
- **22 states** now cite a government primary (release, newsroom, or live dashboard).
- Provenance discipline preserved:
  - AK, ME kept as "CDC HAN echo" (state rebroadcast, not a state-authored primary) - no `srcUrl`.
  - MO, IA, LA, PA, MA, OR, WY, NM, ID, DE stay plain-text secondary (spokesperson-to-media only).
  - AR, MA logged as fetch-blocked (403).
  - MT, MN, ND, VT, DC confirmed genuinely gray via portal check.

### Figure corrections surfaced by the primary-source pass
| State | Was | Now | Primary source |
|-------|-----|-----|----------------|
| Georgia | 71 (secondary) | 0 | GA DPH release (Jul 14): no GA-specific outbreaks/clusters/links |
| Indiana | n/p | 684 | IDOH live dashboard (Jul 23) |
| West Virginia | n/p | 195 | WV OEPS tracker (Jul 21; 15 hosp.) |
| Kansas | 55 | 289 | KDHE release (Jul 22; 114 domestic / 24 travel / 6 / 145 pending) |
| New Hampshire | 5 | 9 | NH DHHS release (Jul 23; Cheshire Medical Center cafeteria cluster) |
| Nevada | not consolidated | 6 (2 outbreak-linked) | SNHD release |

- IN, WV, KS kept OFF the bold 5-state Taco Bell cluster ring (KS/NH tie to the recalled product, not the Taco Bell cluster; IN/WV are canonical cluster members and retained `cluster:true`).
- Two-number-systems discipline held: state totals live on the map; the narrative pages' CDC-confirmed cluster figures were left untouched (no blending). No stat-bar edits.

### NH round-trip (documented so it is not repeated)
- Subagent reported a 9-case cluster; its cited URL 404'd (real slug ends `-taylor-fresh-foods`, not `-lettuce`).
- Over-corrected to 6 (PR #53) based on the only fetchable NH primary (Jul 19 release).
- User flagged the over-swing; WebSearch + user's browser confirmed 9 is real and well-corroborated (NHPR, Concord Monitor, CBS/NBC Boston, WCAX).
- Restored to 9 with the verified DHHS URL (PR #54).
- Lesson captured in memory: do not delete a finding you cannot fetch headlessly (Akamai blocks NH/AZ/AR/MA); mark it a LEAD and verify in a real browser before publishing OR retracting.

## Browser spot-check (all exact)
| State | Verified figure | Source type |
|-------|-----------------|-------------|
| Indiana | 684 (updated Jul 23) | live dashboard |
| West Virginia | 195, 15 hosp. (Jul 21) | live tracker |
| Kansas | 289 (Jul 22) | dated release |
| Georgia | 0 | official statement |

KDHE's release independently corroborated the national stat bar (4,173 confirmed / >7,400 under analysis / 308 hospitalizations / 0 deaths) as current to Jul 22.

## Memory updates
- New `feedback-c6s-daily-brief-trigger`: named trigger to run the briefing refresh manually/locally; now includes the `srcUrl` maintenance rule and the NH cautionary tale.
- `reference-cyclospora-state-data-collection`: added IN, WV, and NH to the self-updating-dashboards list; recorded the NH slug gotcha and "verify NH in a real browser" note.

## Next update should check
- IN and WV dashboards (both update on a cadence) - pull directly rather than via press.
- NH DHHS cyclosporiasis page for cluster growth (hospital identified 16 exposed; DHHS confirmed 9 so far) and any new exposure locations.
- Whether the remaining 21 `srcUrl` links (beyond the four browser-verified) hold; spot-check the next highest-stakes ones.
- Reconcile the cloud routine's next draft PR against this hand-verified state; the routine is still stacking commits.
