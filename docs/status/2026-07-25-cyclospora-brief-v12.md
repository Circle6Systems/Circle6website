# Cyclosporiasis 2026 Briefing, v12 status

**Version:** v12, published 2026-07-25, data as of 2026-07-24
**Supersedes:** v11 (2026-07-24), plus a same-day hand-verified primary-source pass (PRs #53-#55, merged 2026-07-24)
**Type:** Daily routine check. The named Taco Bell cluster itself expanded from five to nine states and Mexico's dispute produced a specific negative
facility test; material update opened as a new draft PR.
**Issue:** filed this cycle (see PR body for link)
**Cycle run by:** the scheduled daily-check routine

## What this cycle was

Step 0 found PR #52 (v11) merged 2026-07-24T03:14Z, followed same-day by three more merged PRs (#53, #54, #55) from a manual/local primary-source
verification pass that corrected several state-map figures (notably a New Hampshire round-trip: 9 confirmed cases reported, briefly reverted to 6 on an
unfetchable primary, then restored to 9 with a verified DHHS URL) and added a `srcUrl` schema to the map. No draft PR was open at the start of this
cycle, so this cycle opened a new branch, `feature/cyclospora-brief-v12-draft`, per the routine's rule that a new draft only opens when none is already
in flight. This cycle read `state-map-embed.html` and the newest status file (`2026-07-24-cyclospora-primary-source-pass.md`) on `main` before
researching, so the hand-verified figures (IN 684, WV 195, KS 289, NH 9, GA 0) were the baseline this cycle built on, not the routine's own v11 draft
figures.

## Retrieval: session network access remained blocked

Re-checked this session's own network diagnostics before researching. `curl` with the full documented header set to cdc.gov, fda.gov, taylorfarms.com,
and a google.com control all failed identically: `CONNECT tunnel failed, response 403`, confirmed at the proxy's CONNECT stage. This is a session-level
egress policy denial, not a per-host block, consistent with every cycle since v9. `WebFetch` also failed with 403 on every URL attempted this cycle
(NBC News, Healio, The Hill, Washington Post, NewsNation, CIDRAP), a broader failure than prior cycles noted for WebFetch specifically. All findings
this cycle are therefore WebSearch-sourced (search-indexed secondary reporting), not direct primary-page or WebFetch-mediated fetches.

## Leading with what cuts against us

**Nothing in this cycle directly cuts against a published claim; the dominant finding instead firms up and extends an already-published dispute and
extends the cluster's own scope.** The two headline findings below are each individually material but do not contradict the current draft or the live
v11 page; they update it.

## Material findings this cycle

1. **The named Taco Bell / Taylor Farms lettuce cluster itself expanded from five to nine states.** CDC retitled its outbreak page (same URL tracked
   since v9) from "Cyclospora Outbreak Linked to Iceberg Lettuce in 5 States" to **"... in 9 States,"** adding Illinois, Kansas, Oklahoma, and
   Pennsylvania to Indiana, Kentucky, Michigan, Ohio, and West Virginia. The cluster-specific case count rose from 1,644 to **1,947**, and
   hospitalizations from 94 to at least **98**. This is convergent across CDC's own page title (confirmed via multiple independent search snippets
   quoting the title and URL) and at least five independent outlets (NBC News, The Washington Post, The Hill, Healio, NewsNation) plus legal-press
   coverage of a lawsuit, all dated 2026-07-24 and citing the same figures and state list. This is a stronger evidentiary footing than the
   search-indexed-only confirmation the 5-state title received in v11.
   - **Direct consequence for the State Involvement Map:** Kansas had been hand-verified in the 2026-07-24 primary-source pass as "not a Taco Bell
     cluster state," tied only to the recall. CDC's own retitling supersedes that distinction. `state-map-embed.html`'s `KS` entry was updated to
     `cluster:true` with a note explaining the reversal. Illinois, Oklahoma, and Pennsylvania were also marked `cluster:true`. State totals (the
     two-number-system discipline) were not changed by this reclassification alone; Illinois separately got a figure upgrade (below).
2. **Mexico's dispute moved from a spoken assertion to a specific negative test.** Following Health Secretary Kershenobich's 2026-07-21 remarks
   (already carried since v11), Mexican federal authorities report that lettuce and water samples collected at the implicated Guanajuato facility
   tested **negative** for both Cyclospora cayetanensis and fecal coliforms (CNN en Espanol, corroborated by ABC17/KESQ syndication, all dated
   2026-07-24). Mexican officials are explicit that a negative environmental test at the plant is a data point, not proof the contamination did not
   occur elsewhere in the same supply chain, and FDA has not withdrawn its own traceback conclusion. Treated as a firmer form of the v11 dispute, not a
   standalone new finding, but materially stronger than a statement alone, so it is reflected in the Situation Snapshot's dispute row and the Bottom
   Line.
3. **Illinois figure upgrade.** IDPH-attributed press coverage (CBS Chicago, dated 2026-07-21) puts Illinois at **408** confirmed/probable cases (215
   domestic, 145 travel-associated, 48 unknown, 31 hospitalized), replacing the stale, secondary-sourced 87 figure (Jul 11) the map had carried since
   before v10. This became relevant to prioritize this cycle specifically because Illinois joined the named cluster (finding 1).
4. **Michigan** rose to **8,176** cases as of Jul 24 (MDHHS), up 6.6% from 7,644-7,664 the day before; hospitalizations held flat at 160 after nearly
   60% growth the day before.
5. **CDC's national confirmed count has not moved** from 4,173/41 states across two consecutive cycles now (Jul 22 to Jul 24). v11 flagged a second
   consecutive freeze as the threshold worth revisiting Prediction 3 over; that threshold was reached this cycle.
6. **No new litigation.** Jul 24 legal-press syndication of a Michigan couple's suit against Taylor Farms and Taco Bell describes the same Jul 17
   E.D. Michigan filing already carried in this briefing since v9, confirmed by cross-referencing plaintiff/venue details against the existing
   Situation Snapshot litigation row. Not a new suit.
7. **No change to Ohio's statewide total** (still stale at 1,316, Jul 17), **North Carolina** (still 561, Jul 20), the **second, 72-case FDA-disclosed
   outbreak** (still no product/supplier identified), or **Taylor Farms' Mexico facility closure** (still closed, no reopening reported).

## Materiality verdict

**MATERIAL.** Two independent triggers fired: a state crossing into the named cluster (four states did, including one, Kansas, explicitly reversing a
same-day hand-verified "not a cluster state" note) and a firming of an already-material dispute from a statement to a specific negative test result.
Per house rules, a cluster state gaining first-published inclusion, and any state materially revising a hand-verified classification, are each
independently material.

## Predictions re-scored

- **Prediction 1 (leafy-green vehicle, 97%): held.** The cluster's expansion is a widening of the same lettuce-linked cluster, not a new commodity;
  Mexico's negative test bears on supplier/origin, not on whether lettuce is the vehicle.
- **Prediction 2 (source never conclusively named): raised 30% to 32%.** Mexico's dispute firming to a specific negative test is stronger disconfirming
  evidence than a statement alone, partly offset by the cluster's expansion cutting the other way (more of the case load is now attributed, not less).
- **Prediction 3 (confirmed count converges upward): lowered 88% to 85%.** The second consecutive freeze v11 flagged as the threshold to watch has now
  happened; not treated as a new freeze of comparable length to the nine-day one yet, but a real signal.
- **Prediction 4 (surveillance-capacity durable story): raised 83% to 85%.** A named cluster quietly growing between cycles, discovered via page
  retitling rather than proactive disclosure, plus a foreign government's dispute escalating to an actual test result, both feed the durable,
  uneven-disclosure narrative.
- **Prediction 5 (attribution won't close the case): lowered 86% to 83%, and we say so plainly.** This cycle's biggest development, the cluster
  expansion, is direct evidence the named attribution explains *more* of the case load, not less, the opposite direction from what this prediction
  anticipates. We did not reverse the overall call (a 1,947-case cluster is still a minority of the 4,173-11,500 national picture, and North Carolina
  and the 72-case outbreak remain genuine second vehicles), but honest calibration means marking the net movement down.
- **Prediction 6 (litigation outruns attribution, 92%): held.** No new litigation this cycle; the Jul 24 legal-press coverage is syndication of an
  already-known suit.

## Corrections made against ourselves

None this cycle beyond the calibration-honest Prediction 5 markdown above; no prior published or drafted claim was found to be factually wrong.

## State map update

Updated `state-map-embed.html`'s `D` object: `IL` (count 87 to 408, basis secondary to state, tier mod to elev, `cluster:true` added), `KS`
(`cluster:true` added, note corrected to reverse the prior "not a cluster state" line), `OK` (`cluster:true` added), `PA` (`cluster:true` added, count
unchanged), `MI` (count/hospitalization 7,664/160 to 8,176/160), `NH` note's "5-state" reference updated to "9-state." Legend text and `state-map.html`'s
body copy updated from "5-state" to "9-state" cluster language, listing all nine states. No state flipped gray-to-figure or figure-to-gray this cycle.

## Next update should check

1. Whether FDA reissues or updates its formal consumer advisory to explicitly name Illinois, Kansas, Oklahoma, and Pennsylvania, distinct from CDC's
   page retitling alone.
2. Whether CDC's national confirmed count moves again from 4,173/41 states, now two consecutive quiet cycles in.
3. Whether the second, 72-case FDA-disclosed outbreak's product, brand, or supplier gets identified, or its case count grows.
4. Whether Mexico's government or FDA/CDC respond further to each other's positions following the negative Guanajuato test.
5. Ohio's statewide (not just northwest-region) case count, to replace the stale Jul 17 figure of 1,316.
6. Whether North Carolina's cluster is among FDA's closed or still-open clusters (open since v9).
7. Whether Taylor Farms' Mexico facility reopens, and under what stated conditions.
8. Whether the four newly added cluster states (IL, KS, OK, PA) get their own individual cluster-specific sub-counts published, distinct from their
   statewide totals, so the map's two-number-system discipline can be applied at the cluster level too.
9. Re-check this session's own network diagnostics at the start of the next cycle; WebFetch failed on every URL attempted this cycle in addition to the
   already-established curl/proxy CONNECT block, worth confirming whether that is a new, broader restriction or incidental to this cycle.
