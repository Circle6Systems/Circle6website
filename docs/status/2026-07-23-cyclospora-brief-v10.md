# Cyclosporiasis 2026 Briefing, v10 status

**Version:** v10, published 2026-07-23, data as of 2026-07-22
**Supersedes:** v9 (2026-07-22)
**Type:** Daily routine check. CDC's national confirmed count broke its nine-day freeze; material update pushed onto the existing open draft PR.
**Issue:** filed same day, see repo issue tracker
**Cycle run by:** the scheduled daily-check routine

## What this cycle was

Step 0 found one open item from this routine: PR #43 (v9 draft, branch `feature/cyclospora-brief-v9-draft`), open since 2026-07-22, one day unmerged at the start of this cycle, closing issue #42. No open issue existed yet for 2026-07-23. Per the routine's rules, this cycle's changes were pushed onto PR #43's existing branch rather than opening a second PR, and the draft's current claims (not the live site's) were read first and treated as the state of the art.

## Retrieval: re-verified this session's network restriction rather than assuming it still applied

v9 diagnosed a genuine, verified, session-level egress policy denial (distinct from the v5-v7 misdiagnosis) after checking this environment's own proxy diagnostics. This cycle repeated that check rather than carrying the diagnosis forward unverified, per v9's own "next update should check" item 8. The result was the same: `curl` with the full documented header set to cdc.gov, fda.gov, taylorfarms.com, and a google.com control all failed identically with `CONNECT tunnel failed, response 403`, and the environment's own `/__agentproxy/status` endpoint logged each as `connect_rejected` / "gateway answered 403 to CONNECT (policy denial or upstream failure)" immediately after the attempts. WebFetch to cdc.gov also returned 403. Per this environment's README, a 403/407 from the proxy is an organization-level egress policy decision, not to be retried or routed around, so this cycle's new findings rest on WebSearch (search-indexed secondary sources), the same posture as v9, not a regression.

## The material finding: CDC's confirmed count broke its nine-day freeze

CDC's national confirmed tally, static at 1,645 since Jul 13 across every cycle from v3 through v9, jumped to **4,173** confirmed domestic cases across **41 states** on Jul 22, with more than **7,400** additional cases under analysis (combined total above **11,500**) and national hospitalizations rising from 141 to **308**. Per the Washington Post's reporting on the update, CDC attributes the earlier gap to its own adjudication method: it counts only cases states have formally reported as lab-confirmed and assumes roughly a six-week reporting lag, while states such as Michigan count confirmed and probable cases close to real time, so state totals run higher and climb faster. Multiple independent outlets (Washington Post, ABC News, UPI, Contagion Live) cite the same CDC-attributed figures.

This is squarely within the routine's own materiality bar ("CDC count moving significantly" is an explicit MATERIAL trigger) and is also a direct, on-the-record resolution of the single question Predictions 3 and 4 have tracked since v3.

## Other findings this cycle

1. **Michigan** rose to **7,171** cases as of Jul 22 (MDHHS), up from 6,571 the day before, a 9% single-day increase.
2. **North Carolina** rose to **561** cases as of Jul 21 (up from "more than 500" as reported in v9, and from 307 on Jul 14), with hospitalizations rising to 16.
3. No further developments found on: the CDC outbreak-page retitling lead (still unconfirmed, direct fetch still blocked), whether North Carolina's cluster is among FDA's three closed clusters, a second vehicle/commodity, any new lab-sample result or retraction, deaths, or new litigation.
4. No indication the outbreak has been declared over; CDC continues to expect cases to rise through the end of August.

## Materiality verdict

**MATERIAL.** The CDC count-freeze breaking is explicitly the kind of development this routine is built to catch, and it also directly resolves (rather than merely informs) a tracked prediction. Pushed onto PR #43's existing branch as v10.

## Predictions re-scored

- **Prediction 3 (confirmed count converges upward toward state tallies): raised 30% to 88%, marked Confirmed.** This is the honest-calibration highlight of this cycle: the prediction's exact two-clause structure (rise substantially above the v1 baseline of 843; narrow, not close, the gap to the state aggregate) is what happened. We had marked this down repeatedly (80% in v2 to 30% by v9) as the freeze extended with no visible movement; that skepticism was reasonable given what was observable at each point, but the prediction's underlying model (adjudication as a catch-up batch process, not a permanent gap) is what actually occurred. Using CDC's own combined figure (>11,500) as the current burden proxy, the confirmed-to-total ratio narrowed from roughly 4.6x at its widest to roughly 2.8x.
- **Prediction 4 (surveillance-capacity durable story): lowered 85% to 80%.** This cycle's central fact, a large, coherent catch-up update rather than a continued silent freeze, is a genuine capability-positive data point that cuts against the erosion narrative more than it supports it. We are not reversing the underlying FoodNet-cuts and workforce-reduction story, but we should not undercount evidence that complicates our own thesis.
- **Prediction 5 (attribution won't close the case): raised 80% to 83%.** CDC's confirmed footprint (41 states) is not plausibly explained by the five-state Taco Bell cluster alone, an inference from the widened state count rather than a new agency statement, so the raise is modest.
- **Prediction 1 (leafy-green vehicle, 97%) and Prediction 2 (source never conclusively named, 25%): held.** No new evidence bearing on either this cycle.
- **Prediction 6 (litigation outruns attribution, 92%): held.** No new litigation developments found this cycle.

## Corrections made against ourselves

None needed this cycle; the v9 self-audit's fixes (the incomplete access-note correction across five pages) were verified still in place before new edits were layered on top.

## Next update should check

1. Whether CDC's outbreak-page retitling to name Taylor Farms de Mexico can be directly confirmed (fetch cdc.gov once network access allows). Carried forward from v8/v9, still unresolved, now the single most overdue item.
2. Whether North Carolina's cluster is among FDA's three closed clusters or the two still open.
3. Whether CDC's confirmed count continues moving (a real catch-up trend) or freezes again at 4,173, which would materially change the read on Prediction 3.
4. Michigan's trajectory past 7,171, and whether the rate of increase slows.
5. Any new product-sample test result, given none has been confirmed positive since the Jul 19 retraction.
6. Whether Taylor Farms or Taco Bell comment further.
7. Any new litigation.
8. Re-check this session's own network diagnostics at the start of the next cycle rather than assuming this cycle's confirmed restriction still applies; if it has lifted, re-attempt direct primary-source retrieval per the documented recipe before defaulting to secondary sourcing.
9. If PR #43/v10 is still unmerged after three days, the next cycle's issue must lead with a blocking note asking Jeff to merge or close it.
