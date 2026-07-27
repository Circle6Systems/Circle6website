# Cyclosporiasis 2026 Briefing, v13 status

**Version:** v13, published 2026-07-27, data as of 2026-07-26
**Supersedes:** v12 (2026-07-25, still in draft as PR #57 at the start of this cycle)
**Type:** Daily routine check. No new outbreak facts; a correction to v12's own litigation claim, made before v12 ever published.
**Issue:** filed this cycle (see PR body for link)
**Cycle run by:** the scheduled daily-check routine

## What this cycle was

Step 0 found PR #57 (v12, branch `feature/cyclospora-brief-v12-draft`) open and unmerged, opened 2026-07-25, **2 days unmerged** as of this cycle
(under the 3-day blocking threshold). No second PR was open. An intervening non-material cycle (2026-07-26, issue #58) had already checked the draft
against fresh reporting and found nothing material, leaving PR #57's content unchanged since it opened. This cycle read `index.html` and the newest
status file (`2026-07-25-cyclospora-brief-v12.md`) on the **PR #57 branch**, plus issue #58's own body for its updated watch-item queue (notably its
flagged, unresolved litigation item), per Step 0/Step 1 rules. All edits in this cycle were pushed to PR #57's existing branch; no second PR was opened.

## Retrieval: WebSearch worked, direct fetch remained blocked

`curl` with the full documented browser-header recipe to cdc.gov again failed identically to every cycle since v9: `CONNECT tunnel failed, response 403`
at the proxy's CONNECT stage, confirmed against a fresh verbose trace this cycle. `WebFetch` also returned `403 Forbidden` on both URLs attempted
(a CDC outbreak page and an FDA investigation page). `WebSearch`, by contrast, worked normally and was the sole source for every finding below, consistent
with the routine's documented fallback path when direct fetch is unavailable.

## Leading with what's most relevant: v12's own litigation claim was wrong

Issue #58 (2026-07-26 cycle) had already flagged this as unresolved: a Jul 24 report of "a Michigan couple's suit" against Taylor Farms and Taco Bell,
which v12's draft dismissed as duplicate coverage of the already-tracked *Parrish v. Taylor Farms, et al.* filing (filed Jul 17). This cycle ran targeted
searches on both suits by name and found they are **not the same suit**:

| Detail | *Parrish v. Taylor Farms, et al.* (already tracked since v9) | *Hercula v. Taco Bell of America, LLC, et al.* (new this cycle) |
|---|---|---|
| Plaintiffs | Preston and Marie Parrish | Karl and Gina Hercula |
| Home county | Durand, Shiawassee County | Clinton Township, Macomb County |
| Restaurant / exposure date | Shiawassee County Taco Bell, Jun 30 | 37510 Gratiot Ave, Clinton Township, Jun 21 |
| Filed | Jul 17, E.D. Michigan | Jul 20, E.D. Michigan, Southern Division |
| Counsel / notice | (secondary press) | Marler Clark (own press release) |
| Damages sought | $75,000 | Not specified in sources found |

Sourcing: the Hercula suit is confirmed via Marler Clark's own press release (PR Newswire, syndicated by Morningstar, Fox2Detroit, WWMT) naming the
plaintiffs, county, and filing date; the Parrish suit is confirmed via Detroit News's Jul 24 report (also syndicated by Virginia Lawyers Weekly and SC
Lawyers Weekly) naming its own distinct plaintiffs, county, and damages figure. No PACER or other docket-level source was available this cycle, so this
correction rests on convergent secondary sourcing (a law firm's own release plus independent press), not a primary docket pull; we say so on the page.
The corroborating detail (different names, counties, restaurant locations, exposure dates, filing dates, and damages) is specific enough to clear our own
bar for a correction rather than leaving it as an open lead.

## Materiality verdict

**MATERIAL**, on the routine's own top-priority basis: this directly contradicts a claim in the currently open draft PR. v12's Situation Snapshot
litigation row and Prediction 6 both stated "no new litigation" for the Jul 24 cycle; that was incorrect. Correcting an unpublished draft before Jeff
merges it is exactly the highest-value outcome the routine is designed to produce. No other watch item (FDA advisory naming the four new cluster states,
CDC national count movement, the 72-case outbreak's product ID, Mexico/FDA/CDC further response, Ohio's statewide refresh, North Carolina's cluster
status, or the Taylor Farms Mexico facility's status) produced anything material this cycle; all are unchanged from v12 and remain open watch items.

## What changed versus what we currently publish or have queued (PR #57)

| Item | v12 draft currently said | This cycle's finding | Source | Verdict |
|---|---|---|---|---|
| Litigation, Jul 24 coverage | Same Jul 17 Parrish filing, not a new suit | Distinct suit: *Hercula v. Taco Bell of America, LLC* (filed Jul 20, Clinton Township/Macomb County) | [PR Newswire](https://www.prnewswire.com/news-releases/clinton-township-couple-with-the-help-of-marler-clark-sues-taco-bell-and-taylor-farms-over-cyclospora-illnesses-302832465.html), [Detroit News (Parrish, for contrast)](https://www.detroitnews.com/story/news/local/michigan/2026/07/24/michigan-couple-parrish-sues-taylor-farms-taco-bell-cyclosporiasis/91026909007/) | **Material correction, applied to PR #57** |
| FDA advisory naming IL/KS/OK/PA | Not yet found distinct from CDC's retitling | FDA's own investigation page (title: "Investigation of 9-State Outbreak...") independently reflects the 9-state, 4-added-states framing, per search snippets of the page itself | [FDA investigation page](https://www.fda.gov/food/outbreaks-foodborne-illness/investigation-9-state-outbreak-cyclospora-illnesses-iceberg-lettuce-july-2026) (title/snippet only, direct fetch blocked) | Not material; narrows a watch item but not primary-verified, left open |
| CDC national confirmed count | 4,173/41 states, frozen 2 cycles | No source found shows movement; still 4,173/41 | Multiple search snippets, consistent | Not material; extends the trend v12 already scored (Prediction 3) |
| Ohio statewide total | 1,316 (stale, Jul 17) | No fresher statewide figure found | n/a | Not material; watch item stays open |
| North Carolina | 561 (Jul 20), open/closed status unresolved | No fresher figure or status found | n/a | Not material; watch item stays open |
| 72-case second FDA outbreak | Product/supplier not yet identified | Unchanged | n/a | Not material |
| Mexico/FDA/CDC further response | Negative Guanajuato test carried since v12 | No further response found | n/a | Not material |
| Taylor Farms Mexico facility | Still closed (resolved-negative on reopening per the 07-26 cycle) | Unchanged | n/a | Not material |

## Predictions re-scored

- **Prediction 6 (litigation outruns attribution): raised 92% to 93%.** A second, independently filed Michigan federal suit landing three days after the
  first is itself supporting evidence for this prediction's core claim. The correction itself, that we mischaracterized one suit as a restatement of
  another, is also a reminder to verify litigation claims against plaintiff-level detail, which we now say on the page.
- No other prediction re-scored; nothing else found this cycle bears on Predictions 1 through 5 differently than v12 already accounted for.

## Corrections made against ourselves

**One correction, on our own unpublished draft.** v12's Situation Snapshot litigation row and Prediction 6 stated "no new litigation" for the Jul 24
cycle, reading the Hercula coverage as a restatement of the already-tracked Parrish suit. That was wrong; they are two distinct suits. Since v12 was never
published, we corrected the erroneous text directly (Situation Snapshot litigation row, Prediction 6, the Bottom-Line-adjacent "what changed" panel) rather
than only appending a footnote, and added a v13 "what changed" panel documenting the correction transparently, plus matching corrections in
`executive-overview.html` and `full-briefing.html` (the latter as a new, visibly labeled Correction panel rather than a silent edit, since it also carries
the underlying litigation narrative for a general reader). This status file is the audit trail for that correction per the routine's own house rules.

## State map update

No changes to `state-map-embed.html` this cycle. No state crossed a tier, no state flipped gray-to-figure or figure-to-gray, and no state's figure was
found to have materially changed. The FDA-page confirmation of the 9-state cluster framing (see table above) does not change any `D` object entry, since
the four newly added cluster states (IL, KS, OK, PA) already carry `cluster:true` as of v12.

## Next update should check

1. Whether FDA reissues or updates its formal consumer advisory to explicitly and directly name Illinois, Kansas, Oklahoma, and Pennsylvania on a
   primary-fetched (not search-snippet) basis; this cycle found supporting title/snippet evidence but could not fetch the page directly.
2. Whether CDC's national confirmed count moves again from 4,173/41 states, now three-plus consecutive quiet cycles.
3. Whether the second, 72-case FDA-disclosed outbreak's product, brand, or supplier gets identified, or its case count grows.
4. Whether Mexico's government or FDA/CDC respond further to each other's positions following the negative Guanajuato test.
5. Ohio's statewide (not just regional) case count, to replace the stale Jul 17 figure of 1,316.
6. Whether North Carolina's cluster is among FDA's closed or still-open clusters (open since v9).
7. Whether either the Parrish or Hercula suit reaches a filing, ruling, or settlement worth tracking, and whether any further distinct suits surface;
   verify new litigation claims against plaintiff-level detail (names, counties, filing dates) before characterizing coverage as duplicative.
8. Whether the four newly added cluster states (IL, KS, OK, PA) get their own individual cluster-specific sub-counts published, distinct from their
   statewide totals.
9. Re-check this session's own network diagnostics at the start of the next cycle; curl/proxy CONNECT and WebFetch both remained blocked this cycle,
   consistent with every cycle since v9, while WebSearch continued to work normally.
