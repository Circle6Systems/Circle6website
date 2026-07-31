# Cyclosporiasis 2026 Briefing, v19 status

**Version:** v19, published 2026-07-30, data as of 2026-07-30
**Supersedes:** v15 (live on `main` since 2026-07-28), and absorbs the unpublished v16, v17, v18
**Type:** Manual `c6s-daily-brief` trigger run locally by Jeff. MATERIAL, on two corrections against our own published work.
**Issue:** #67. Closes the routine's backlog issues #63 (v16), #65 (v17), #66 (v18).
**Cycle run by:** local workstation, not the cloud routine.

## Step 0: prior-work check

`main` was at v15. PR #64 (`feature/cyclospora-brief-v16-draft`) carried **three** unmerged cycles stacked (v16 -> v17 -> v18) with issues #63, #65 and #66 all open. PR #62, an unrelated one-line typo fix, was also open and is superseded by v16's rewrite of the same sentence.

This cycle branched `feature/cyclospora-brief-v19` from the draft branch rather than from `main`, so the v16/v17/v18 commits and their page panels survive as history. The page's design is an accumulating audit trail, so three unpublished cycles are preserved as panels rather than collapsed.

## Materiality verdict: MATERIAL, on two things we got wrong

### 1. "Four concurrent FDA outbreaks" was two, and the error ran in our own favour

Since v14 this briefing has reported that FDA carries four concurrent *Cyclospora* investigations with an unidentified product alongside the lettuce cluster, and cited that number as support for Predictions 3 and 5.

FDA's CORE table carries two **separate** status columns, `Investigation Status` and `Outbreak/Event Status`, and its legend states: "At times an FDA investigation may be active after an outbreak has ended."

| Ref | Cases | Investigation Status | Outbreak/Event Status |
|---|---|---|---|
| 1375 | 8 | Active | **Ended** |
| 1384 | 18 | Active | **Ended** |
| 1385 | 10 | Active | Ongoing |
| 1392 | **93** (was 72) | Active | Ongoing |

FDA's "What's New" states it in words: "For the outbreak of *Cyclospora* (ref #1384) linked to a not yet identified product, the outbreak has ended."

So: **two** ongoing unidentified-product outbreaks, not four. Two compounding errors produced the wrong number. v15 read #1375's "Ended" as its *traceback* having ended (wrong column) and published that. v18 then treated a Forbes count of four as independent confirmation, when Forbes was counting open **investigations**, not ongoing **outbreaks**.

v14 explicitly flagged this figure as "the kind to scrutinize hardest" because it ran in our own favour. Five versions later, scrutiny is what broke it.

### 2. A JPML consolidation petition sat unnoticed for 13 days

**MDL No. 3196**, *IN RE: 2026 Multistate Cyclosporiasis Outbreak Litigation*, docketed before the Judicial Panel on Multidistrict Litigation **2026-07-17**, carrying an initial Motion to Transfer covering three actions: *Granados* (N.D. Cal. 5:26-cv-07346), *Ayyad* (N.D. Ohio 1:26-cv-01648), *Parrish* (E.D. Mich. 2:26-cv-12448).

Whether the suits consolidate has been an explicit watch item in every status file since v15. Cycles v16, v17 and v18 each affirmatively wrote "no new suit, ruling, consolidation, or settlement found" while the petition sat on a free, public docket.

This is the exact failure v15 diagnosed and declared fixed ("litigation tracking is docket-based from v15 forward"). It was not fixed. The routine kept searching press coverage. The Panel has not yet ruled on transfer.

## Primary-source verification results

Every figure fetched directly with Playwright and a real browser UA.

| Source | Result | vs. draft |
|---|---|---|
| CDC surveillance (page dated Jul 28, data through Jul 27) | 6,707 confirmed / **423** hosp / 0 deaths / **45** states; **>11,500** under analysis; travel-associated **1,018 / 42 hosp / 42 states** | Confirms 6,707/45 |
| FDA CORE table | See correction 1 | **Corrects draft** |
| FDA 9-state advisory | 1,947 / 98 hosp / 0 deaths; onsets Jun 22 to Jul 20 | Confirms |
| MDHHS outbreak page (Jul 30) | **10,386** total, **193** hospitalized; ~475 of the Jul 27 total were backlog | Confirms; upgraded press -> primary |
| IDOH dashboard (Jul 30) | **1,176** (57% female, ages 0-98) | **Corrects draft (~954)** |
| NCDHHS dashboard (updated Jul 28, data 10am Jul 27) | **718 / 24**; +157 cases and +8 hosp since Jul 21; 728 cumulative 2026; Wake 432 | Confirms; upgraded to primary |
| WV OEPS (page dated Jul 28) | **245 / 19** | Confirms; upgraded to primary |
| ODH | No news release since Jul 8 | Watch item stays open |

### Litigation, docket-verified

Nine matters plus the MDL petition. New this cycle:

- ***O'Hara v. Border Foods, LLC***, W.D. Mich. **1:26-cv-02183**, filed Jul 28, Judge Robert James Jonker, NOS 365 product liability. Defendants: Border Foods LLC, **Taylor Farms California, Inc.**, Taylor Fresh Foods Inc., plus unknown parties. Upgrades v18's press-only "ninth matter" to docket-verified and opens a fifth federal district.

**Near-miss recorded so a later cycle does not repeat it:** *Rueda Patino v. Taco Bell of America, LLC* (S.D. Fla. 0:26-cv-62077, filed Jul 29) surfaced in the sweep and is **not** an outbreak case. NOS 442 Civil Rights: Jobs, cause 42:1983 employment discrimination, filed IFP. Not counted.

**Resolved (post-review run-down):** the *Granados* case-number discrepancy is **one action, not two**, so the count of nine matters is unaffected. Two CourtListener docket records exist for it, both showing filing date 2026-07-16 and Judge Nathanael M. Cousins:

| Record | Court | Number cited | Detail |
|---|---|---|---|
| `/docket/73632284/` | District Court, N.D. California | **7:26-cv-07346** | Cause 28:1332 Diversity-Fraud, NOS 360, jury demand plaintiff |
| `/docket/73686367/` | J.P.M.L. | **5:26-cv-07346** | The same action as a constituent case in MDL No. 3196 |

We now cite **5:26-cv-07346** as likely correct: 5 is N.D. California's San Jose divisional prefix, matching Judge Cousins' San Jose posting and the related *Null and Long* filing at 5:26-cv-07629. 7 is not a standard N.D. California division (the district has 3 San Francisco, 4 Oakland, 5 San Jose) and appears on only 17 of that district's dockets against 1,169 carrying 5.

**Not asserted:** that the district docket is in error. No PACER-authoritative confirmation was obtained, so both numbers are published, leading with 5.

## Predictions re-scored

- **Prediction 3 (confirmed count converges upward): held at 90%.** CDC confirmed directly at 6,707/45/423. Combined figure still above 18,200; ratio essentially unchanged from v17.
- **Prediction 4 (surveillance-capacity narrative): lowered 90% to 89%,** reverting v18's raise. v18 raised this partly because Indiana's verification gap had "closed." It had not: IDOH was publishing 1,176 while we prepared to publish 954, and the dashboard answered on the first request. That is a reporting failure in this briefing, not evidence about agency capacity, and cannot support the raise it was used for.
- **Prediction 5 (attribution will not close): lowered 88% to 86%.** The four-outbreak count was among this prediction's strongest cited support. Correctly read it is two, and fewer open unattributed outbreaks is evidence *against* the prediction. Gottlieb's claim is unchanged and remains a former official's statement.
- **Prediction 6 (litigation outruns attribution): held at 95%, deliberately not raised.** The MDL petition is strong confirming evidence, arguably the strongest yet. But this prediction's own tracking missed it for 13 days across three cycles that each affirmatively reported no consolidation. A prediction should not be rewarded for evidence it failed to find.
- Predictions 1 and 2 not re-scored.

## Corrections made against ourselves

Three, all stated plainly on the pages rather than silently edited:

1. Four concurrent FDA outbreaks -> two ongoing (with two whose outbreaks have ended). Affects the Situation Snapshot, the timeline, Prediction 5, and every subpage summary.
2. Travel-associated cases read **440 / 35 states** and was badged **High**. It was stale by several weeks. CDC's own page reports **1,018 / 42 states / 42 hospitalizations**. A stale figure carrying a High badge is worse than a missing one.
3. The claim carried since v14 that ODH's website "returned errors site-wide" is retired. It loads normally.

Also corrected: v16/v17/v18 panels were stamped in UTC, putting v18 at **July 31**, a future date. Normalised to PT (v16 Jul 28, v17 Jul 29, v18 Jul 30).

## Retrieval log (internal, not on any public page)

**Thirteen of thirteen primary pages returned HTTP 200 on the first attempt.** No host required a retry, a fallback, or a header adjustment beyond the standard browser UA.

The v16, v17 and v18 research each recorded categorical retrieval failure and rested every finding on WebSearch snippets:

- v16: "proxy CONNECT tunnel itself rejected with HTTP 403 on every single host"
- v17: same pattern
- v18: "curl exit 56 / HTTP 000 on all four" plus WebFetch 403 on every press site

This is the **third consecutive cycle** whose blocking claim does not survive a local re-run, after v15 had already retired the standing "primary pages unreachable" assumption. The pattern is now well established enough to state as a rule: **treat any routine cycle's retrieval-failure claim as unverified until re-run locally.**

The concrete cost this cycle: Indiana published at 1,176 while the routine prepared to publish 954, having downgraded and then re-upgraded its confidence in the press figure across two cycles rather than fetching the dashboard once.

## Next update should check

1. **Whether the JPML rules on MDL No. 3196**, which court draws it, and whether further actions are added to the motion. This is now the highest-value single watch item in the briefing.
2. Whether a docket number surfaces for *Ott* (state court, outside RECAP) and whether the *Granados* case-number discrepancy (5: vs 7:26-cv-07346) resolves.
3. **Ohio's next statewide figure.** ODH has published nothing since Jul 8; 2,574 (Jul 24) is a press figure now six days old.
4. Whether **CDC's national count** moves from 6,707/45 (next weekly update due).
5. Whether **refs #1385 or #1392** get a product identified, whether #1392 keeps climbing from 93, and whether #1375/#1384 close out entirely.
6. **NCDHHS's next Tuesday dashboard update** (Aug 4), and whether any current agency confirms or refutes Gottlieb's North Carolina parsley/cilantro claim.
7. Whether the **Epi-Aid** deployment produces a public output or extension.
8. Whether **Mexico, FDA or CDC** issue any further on-the-record statement.
9. Whether **Taylor Farms or the White House** respond on the record to the House Democrats inquiry, or a committee document surfaces (vs. press characterization).
10. Cluster-specific sub-counts for IL, KS, OK, PA, still unpublished.
11. **Run the RECAP sweep every cycle, not just when press suggests something happened.** The MDL was found by sweeping, not by searching for it.

## Standing rules added this cycle

- **Fetch before you attribute.** Convergent independent outlets naming a state agency remain acceptable sourcing, but only *after* a direct fetch has been attempted and failed. Indiana is the case study: the convergent-outlet rule produced 954 against a dashboard reading 1,176.
- **Read FDA's table by column.** `Investigation Status` and `Outbreak/Event Status` are different questions. Never quote an investigation count as an outbreak count.
- **Sweep the dockets on a schedule.** Litigation discovery is a query, not a news alert.
