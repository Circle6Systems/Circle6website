# Cyclosporiasis 2026 Briefing, v9 status

**Version:** v9, published 2026-07-22, data as of 2026-07-21
**Supersedes:** v8 (2026-07-22)
**Type:** Daily routine check. Corrects incomplete v8 follow-through; adds two agency-level leads and updated case figures.
**Issue:** filed same day, see repo issue tracker
**Cycle run by:** the scheduled daily-check routine

## What this cycle was

The daily routine's mandatory first step is checking its own prior work before researching anything new. That check found v8 (merged 2026-07-21, a manual out-of-band pass) had described itself as correcting a retracted access-block claim across the briefing, but the correction was incomplete. This cycle finished that correction, then researched what changed since v8's data-as-of date, and found two agency-level developments plus updated case figures.

## Leading with what cuts against us: v8's self-correction was incomplete

v8 retracted the v5-through-v7 claim that outbound access was "blocked at the proxy/gateway level for essentially every external host," and said the affected facts had been verified against primary sources. That retraction reached index.html's main narrative note and full-briefing.html's Selected Sources paragraph. It did not reach:

- index.html's Situation Snapshot table (the CDC-confirmed-cases row still said "not independently re-verified... network access limitation")
- full-briefing.html's case-count table and Key Assessments table (same stale language)
- executive-overview.html's body text, which still read "This cycle's research session again hit a broad network access block that prevented us from directly reading CDC's, FDA's, and Taylor Farms' own pages," word for word, even though the page's own meta-grid had already been bumped to "v8"
- protective-guidance.html's misinformation-matrix row on CDC's case count, which still said "we could not independently re-verify the freeze this cycle due to a network access limitation, now for a third consecutive cycle"

All five instances are corrected in this version. We record this prominently because an incomplete self-correction is itself a sourcing defect of the same kind v8 was trying to fix, not a minor formatting gap.

## This cycle's own retrieval: a real, different, verified limitation

Before concluding anything about network access, this cycle checked the session's own proxy diagnostics rather than assuming a block, per the routine's own hard-learned lesson from v5-v7. The result: this session's outbound network policy rejected direct connections (403 at the CONNECT/gateway level, logged as "policy denial") to every host tried, including cdc.gov, fda.gov, taylorfarms.com, foodsafetynews.com, cidrap.umn.edu, marlerblog.com, michigan.gov, and ncdhhs.gov, and, as a control, two unrelated domains (google.com, wikipedia.org) that failed identically. Only api.github.com, needed for this routine's own GitHub access, succeeded. This is confirmed via the environment's own diagnostic tool and documented in its README as an organization-level egress policy, not a bot-fingerprinting or dead-link issue like the v5-v7 misdiagnosis.

Practical effect: this cycle's new findings rest on WebSearch (search-engine-indexed snippets), not a direct fetch of CDC's or FDA's own pages. Every new claim below is labeled accordingly.

## New findings this cycle (secondary-sourced, not directly fetched)

1. **CDC's outbreak page appears to have been retitled to name the source.** Search-indexed results now show a CDC page titled "Cyclospora Outbreak Linked to Iceberg Lettuce in 5 States," recommending against "shredded iceberg lettuce from Taylor Farms de Mexico," in contrast to the "Cyclosporiasis Outbreak with Unknown Source" title v8 found as of Jul 14. If accurate, this closes the interagency divergence v8 flagged as its top watch item. Labeled a lead, not a verified finding, since this session could not fetch the page directly to confirm wording or update date.
2. **FDA disclosed a fifth-cluster count.** At a press conference this week, per multiple outlets, acting FDA Commissioner Kyle Diamantas said federal officials have investigated five distinct cyclosporiasis clusters since the start of parasite season in May, three of which are now considered over. The Taco Bell cluster, the largest, remains active. No source found states whether North Carolina's cluster is among the three closed or the two still open.
3. **Michigan cases continue rising sharply:** 6,571 as of Jul 21 (MDHHS), up from 6,148 (Jul 20) and 5,002 (Jul 17).
4. **North Carolina cases rose to more than 500** as of Jul 21, up from 307 (Jul 14); NC DHHS still maintains these are unlinked to the Taco Bell cluster.
5. **Additional litigation:** a 27-year Army veteran's suit and a Michigan couple's federal suit (E.D. Michigan, filed Jul 17) both name Taylor Farms entities directly, reinforcing the litigation trend.
6. **CDC's national confirmed count remains at 1,645** in every source found through Jul 21, a ninth consecutive day unmoved; this cycle could not re-verify that directly against CDC's own page.

## Materiality verdict

MATERIAL. The incomplete v8 self-correction alone would qualify (a correction to our own sourcing claims is explicitly material), and the CDC-retitling lead plus the FDA five-cluster disclosure are independently material as potential resolutions to previously flagged open questions. Recommend publish after Jeff's review, with explicit attention to the two leads (CDC retitling, cluster count) that are not yet independently verified.

## Predictions re-scored

- Prediction 1 (leafy-green/Taylor Farms vehicle): held at 97%; the CDC retitling lead reinforces but is not yet confirmed.
- Prediction 2 (source never conclusively named, split resolution): held at 25%; FDA's 5-clusters/3-closed disclosure is ambiguous without knowing NC's status.
- Prediction 3 (confirmed count converges): lowered 35% to 30%; freeze continues into a ninth day and this cycle could not re-verify it directly (a genuine, different limitation than v5-v7, logged rather than glossed over). Also backfilled a missing v8 log entry that had verified the freeze but was never recorded against this prediction.
- Prediction 4 (surveillance-capacity durable story): held at 85%; net mixed (our own incomplete correction cuts one way, FDA's 3-of-5-clusters-resolved cuts the other). Backfilled a missing v8 log entry.
- Prediction 5 (attribution won't close the case): raised 78% to 80%; FDA's five-cluster disclosure is on-the-record confirmation of a multi-cluster structure.
- Prediction 6 (litigation outruns attribution): raised 90% to 92%; two additional suits reported.

## Corrections made against ourselves

- Fixed the four residual stale access-limitation instances described above (index.html, full-briefing.html x2, executive-overview.html, protective-guidance.html).
- Backfilled missing v8 log entries in Predictions 3 and 4, which v8's own verification work should have produced but did not.

## Next update should check

1. Whether CDC's outbreak page retitling can be directly confirmed (fetch CDC's page once network access allows; confirm exact title, wording, and update date). Top priority, carried forward from v8 and still unresolved.
2. Whether North Carolina's cluster is among the three FDA now considers closed, or the two still open.
3. Whether CDC's national count unfreezes past 1,645, now a ninth-plus day.
4. Whether the recall scope expands beyond 27 states.
5. Michigan's trajectory past 6,571, and whether the rate of increase slows.
6. Any new product-sample test result, given none has been confirmed positive since the Jul 19 retraction.
7. Whether Taylor Farms comments further following the false-positive retraction.
8. If this session's own network restriction differs in a future cycle, re-attempt direct primary-source retrieval per the documented recipe before assuming it still applies; do not carry this cycle's diagnosis forward without re-checking.
