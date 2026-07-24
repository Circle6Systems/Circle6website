# Cyclosporiasis 2026 Briefing, v11 status

**Version:** v11, published 2026-07-24, data as of 2026-07-23
**Supersedes:** v10 (2026-07-23)
**Type:** Daily routine check. Two developments cut against our published assessments (Mexico disputes the Taylor Farms attribution; FDA discloses a separate, new outbreak); material update opened as a new draft PR.
**Issue:** #51
**Cycle run by:** the scheduled daily-check routine

## What this cycle was

Step 0 found PR #43 (v10) had already merged 2026-07-23, so no open draft existed at the start of this cycle. This cycle opened a new branch,
`feature/cyclospora-brief-v11-draft`, per the routine's rule that a new draft only opens when none is already in flight. No issue existed yet for
2026-07-24 (the most recent prior issue, #44, covered v10 and dated 2026-07-23); issue #51 was filed fresh for this cycle. Note: issue #44 remained
open after PR #43 merged and closed it in spirit; we flagged this repo-hygiene item in #51 for Jeff to close manually.

## Retrieval: re-verified this session's network restriction

Re-checked this session's own network diagnostics before researching, per the standing instruction. The result was identical to v9/v10: `curl` with the
full documented header set to cdc.gov, fda.gov, taylorfarms.com, and a google.com control all failed identically with `CONNECT tunnel failed, response
403`, confirmed at the proxy's CONNECT stage (verbose curl shows the 403 originates before the request reaches any target host, so this is a session-level
egress policy denial, not a per-host block). All findings this cycle are therefore WebSearch-sourced (search-indexed secondary reporting), not direct
primary-page fetches, and are labeled as such throughout the draft.

## Leading with what cuts against us

**Mexico's Health Secretary publicly disputed the Taylor Farms de Mexico attribution on the record.** At a news conference reported 2026-07-21, Mexican
Health Secretary David Kershenobich said Mexico's own investigation found no evidence the outbreak originated at the Taylor Farms de Mexico facility FDA
has traced the Taco Bell cluster to. This is a named foreign government publicly disputing the named US agencies' own traceback conclusion, a materially
different and more direct challenge than the earlier retracted lab test (an internal FDA correction) or the North Carolina recall overlap (an unresolved
distribution question). FDA and CDC have not withdrawn or revised their attribution as of this cycle, so under our hedge-discipline standard the finding
for the named cluster stands, but we led the draft with this dispute rather than let the "High confidence" badge on that attribution stand unqualified.

Separately, on the same day, HHS Secretary Robert F. Kennedy Jr. said the outbreak is "under control," a claim we noted sits in tension with Michigan's
continued rapid case growth and CDC's own stated expectation that cases rise through August. We did not treat this as a rescoring trigger on its own,
only as a tension worth stating.

## Other material findings this cycle

1. **FDA disclosed a second, wholly distinct cyclosporiasis outbreak** of at least 72 cases, with a product, brand, or supplier "not yet identified,"
   explicitly not linked to the Taylor Farms lettuce cluster. Coverage of the total number of concurrent FDA cyclospora investigations varies by outlet
   and date (from "at least four active" to the five clusters, three closed, disclosed in v9); we did not assert a specific running total, only that this
   72-case cluster is confirmed new and distinct. This is materially stronger, more direct evidence for Prediction 5 than the state-count inference relied
   on in v10.
2. **Taylor Farms voluntarily and temporarily shut its central-Mexico processing facility** (reported 2026-07-23), the one producing the 5-lb
   shredded-iceberg bags sold to Taco Bell, Sysco, and other distributors, as US case counts continued climbing, even though no product sample from that
   facility has ever tested positive.
3. **The CDC outbreak-page retitling, an unconfirmed lead since v9, is now search-confirmed**: search-indexed content directly quotes a CDC page titled
   "Cyclospora Outbreak Linked to Iceberg Lettuce in 5 States" and a companion "Investigation Update" page naming Taylor Farms de Mexico verbatim. This
   closes our single most overdue watch item since v8, though it is still search-indexed rather than a raw direct fetch, since cdc.gov access remained
   blocked this cycle.
4. **Michigan** rose to approximately 7,644 to 7,664 cases (2026-07-23, MDHHS via press; outlets reported both figures the same day), with
   hospitalizations rising sharply to 160 from 102 the day before.
5. **Ohio's statewide figure was not refreshed this cycle**; the last verified state-department total remains 1,316 (Jul 17). A regional
   northwest-Ohio count (Toledo Blade, citing county health departments) reached 2,268 as of Jul 22, already well above that stale statewide number. We
   did not blend the two, consistent with the "two number systems, never blended" rule, and flagged the statewide figure as stale in both the Full
   Briefing and the state map.
6. **CDC's national confirmed count has not moved** from 4,173/41 states in any source found this cycle. One quiet cycle after the Jul 22 catch-up is not
   enough to call a second freeze, so Prediction 3 was held rather than moved.
7. **North Carolina**: no new figure; NCDHHS updates weekly on Tuesdays, so 561 (its own Jul 20 release date) remains current. We corrected a minor date
   label (v10 said Jul 21; NCDHHS's own release is dated Jul 20).
8. No new litigation, deaths, or laboratory retractions found this cycle.

## Materiality verdict

**MATERIAL.** Two independent triggers fired: an on-the-record dispute of the named-cluster attribution by a named government, and a new,
FDA-disclosed distinct outbreak. Per the routine's own rule, correcting or complicating a published (not just drafted) assessment before the next reader
sees it is the highest-value outcome of a run, and this cycle had two such corrections.

## Predictions re-scored

- **Prediction 1 (leafy-green vehicle, 97%): held.** Mexico's dispute concerns the specific supplier/facility, not the commodity class; no source
  disputes that lettuce is the vehicle for the named cluster. Added a note distinguishing this from the new Situation Snapshot "Attribution dispute" row.
- **Prediction 2 (source never conclusively named): raised 25% to 30%.** The named-cluster half of this prediction is less settled than "disconfirmed"
  now implies, given Mexico's dispute; the new 72-case outbreak is a concrete instance of a source not being conclusively named.
- **Prediction 3 (confirmed count converges upward): held at 88%.** No further national topline movement found this cycle; one quiet cycle is not enough
  to call a second freeze after nine quiet days preceded the Jul 22 catch-up.
- **Prediction 4 (surveillance-capacity durable story): raised 80% to 83%.** Three new developments (the Mexico dispute, the RFK Jr. "under control"
  statement in tension with case growth, and a second concurrent unexplained outbreak) all feed the durable-story narrative, without reversing last
  cycle's capability-positive read on the CDC catch-up.
- **Prediction 5 (attribution won't close the case): raised 83% to 86%.** The new 72-case FDA-disclosed outbreak is direct agency evidence of a second,
  distinct source, stronger than the state-count inference relied on last cycle.
- **Prediction 6 (litigation outruns attribution, 92%): held.** No new litigation developments found this cycle.

## Corrections made against ourselves

Corrected a minor date-label error carried from v10: North Carolina's 561-case figure is NCDHHS's own Jul 20 release, not Jul 21 as v10 labeled it (fixed
across index.html and full-briefing.html).

## State map update

Updated `state-map-embed.html`'s `D` object: Michigan's count and hospitalization figure (7,171/102 to 7,664/160); Ohio's note flags the stale statewide
figure against the newer, non-comparable regional (northwest Ohio) count, without changing Ohio's count or basis field, since blending a regional press
figure into a state-basis cell would violate the "two number systems, never blended" rule. No state crossed a tier boundary this cycle; no gray state
began or stopped publishing a figure.

## Next update should check

1. Whether Mexico's government or FDA/CDC respond further to each other's positions (retraction, reaffirmation, joint statement).
2. Whether the new 72-case FDA outbreak's product, brand, or supplier gets identified, and whether its case count grows.
3. Whether CDC's national confirmed count moves again from 4,173/41 states, or a second consecutive freeze becomes a stronger signal.
4. Ohio's statewide (not just northwest-region) case count, to replace the stale Jul 17 figure of 1,316.
5. Whether North Carolina's cluster is among FDA's closed or still-open clusters.
6. Any new litigation.
7. Whether Taylor Farms' Mexico facility reopens, and under what stated conditions.
8. Re-check this session's own network diagnostics at the start of the next cycle before assuming today's confirmed restriction still applies.
9. Repo hygiene: issue #44 remained open after PR #43 merged; flagged for Jeff to close.
