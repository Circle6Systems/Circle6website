# Session Status: Cyclosporiasis Briefing v6

**Date:** 2026-07-20
**Work item:** issue filed same day (daily check)
**PR:** draft, updates the existing #36 (v5 was never published; this draft supersedes it directly)
**Branch:** `feature/cyclospora-brief-v6-draft`
**Deliverable:** https://circle6systems.com/osint-reports/cyclospora-2026/

---

## What happened

This cycle's daily check found that PR #36 (v5, proposed 2026-07-19) was still open and unmerged, meaning the live site remains on v4. Rather than open a competing draft, this update builds directly on the v5 draft's content and adds one new, material finding: FDA disclosed that its own targeted import surveillance, sampling product at the border independent of any illness investigation, collected a Taylor Farms de Mexico shredded iceberg lettuce sample that tested **positive for Cyclospora**. Because v5 never published, this draft is labeled v6 and supersedes v5 in place, on the same branch lineage, rather than stacking a second unpublished draft on top of a first.

## The development

Per convergent secondary reporting (Detroit News, Fox Business, Marler Blog), FDA's targeted import surveillance program returned a positive Cyclospora test on Taylor Farms de Mexico lettuce. This is a materially different kind of evidence than everything the briefing carried before it: the July 17 attribution rested on epidemiologic and traceback convergence ("a single supplier" identified through investigating illness patterns); this is a direct physical detection of the organism on the implicated commodity itself, collected proactively rather than in response to a reported illness.

FDA states the positive lot was **detained** and is **not part of** Taylor Farms' currently posted 27-state recall (the recall documented in v5). The company says it is working to determine whether any product from that lot reached commerce or consumers. No source found this cycle discloses the lot number, ship dates, or destination states for that positive lot, a gap Marler Blog's coverage criticized directly ("credit where it's due, now tell us where the rest of that lot went"). This leaves an open, unanswered question: whether the 27-state recall already covers the contamination this finding points to, or whether the recall's scope needs to expand.

**Everything else from v5 (27-state recall, North Carolina/recall overlap, new lawsuits) is carried forward unchanged.** No source found this cycle updates any of those threads. CDC's national confirmed count is still cited at 1,645 by every secondary source found, consistent with a continuing freeze, but this remains formally unverified against CDC's own page.

**Access limitation (persists from v5).** This session's outbound network access was again blocked at the proxy/gateway level for essentially every external host attempted, the same broad block first hit preparing v5, confirmed again via the proxy's own status endpoint (`connect_rejected`, "gateway answered 403 to CONNECT"). We could not directly retrieve CDC's, FDA's, or Taylor Farms' own pages, including the FDA import-alert or recall pages that would carry the primary-source wording for this cycle's central finding. The import-surveillance finding rests entirely on convergent secondary reporting.

## Analytic contributions beyond the news

1. **Building on the existing draft rather than duplicating it.** PR #36 (v5) was a thorough, still-open, unmerged draft when this cycle's research began. Opening a second, competing v6 branch and PR would have forced Jeff to reconcile two overlapping unpublished drafts. Instead, this update checks out the v5 branch, folds in the new finding, and relabels the whole draft v6, so there is exactly one coherent, current draft to review.
2. **Treating the lab-positive finding as a genuine "cuts both ways" data point for Prediction 4, not a one-directional confirmation.** FDA's import surveillance catching a contaminated lot at the border is, on its own, evidence that proactive federal detection capability is functioning, which is inconvenient for a "surveillance is simply eroding" thesis and worth stating plainly rather than only reaching for the negative half of the story (the non-disclosure of lot details). We lowered Prediction 4's confidence slightly (83% to 81%) specifically because the evidence this cycle is two-directional, not because we found new disconfirming evidence in the usual sense.
3. **Distinguishing detection from disclosure.** The positive test is a capability win; the absence of any lot number, ship date, or destination-state disclosure is a transparency gap. Collapsing these into a single "good news" or "bad news" verdict would have been less honest than tracking them separately, which is what the v6 predictions and Situation Snapshot do.

## Prediction calibration

| # | Prediction | v5 | v6 | Status |
|---|---|---|---|---|
| 1 | Leafy-green vehicle | 95% | 97% | Confirmed, reinforced by direct lab detection |
| 2 | Source never conclusively named | 25% | 25% (unchanged) | Disconfirmed (named cluster) / Open (outbreak-wide) |
| 3 | Count converges upward | 35% | 35% (unchanged) | Partially confirmed, trending against us, verification gap persists |
| 4 | Surveillance is the durable story | 83% | 81% | Open, evidence this cycle cuts both directions |
| 5 | Attribution will not close the case | 78% | 78% (unchanged) | Trending confirmed, complicated by the NC/recall overlap (no new NC information this cycle) |
| 6 | Litigation outruns attribution | 90% | 90% (unchanged) | Confirmed further; no new filings found this cycle |

**P4 is the one to watch for a genuine test of hedge discipline.** If FDA discloses the positive lot's distribution and it turns out to be fully contained (never reached commerce), that is real evidence surveillance capacity is working, and P4's confidence should come down further, not just hold. If it turns out product from that lot reached consumers before detention, that reinforces the eroded-capacity thesis regardless of the proactive catch. We do not yet know which; the current 81% reflects that genuine uncertainty rather than a settled view.

## Data corrections

- Added: FDA import-surveillance positive Cyclospora test on Taylor Farms lettuce (Jul 19), lot reported separate from the 27-state recall
- Recall status: "Recall published, 27 states" to "Recall published, 27 states; completeness in question" given the separate positive lot
- No change to CDC national topline (1,645/141/0), Michigan (5,002/102 as of Jul 17, no fresher figure found), NC case count (307), the 27-state recall list, or litigation status; all carried forward from v5, not re-verified this cycle

## Guidance changes

Added a new misinformation-matrix row ("The recall covers all the contaminated product" — Unproven) to protective-guidance.html to name the recall-completeness question directly rather than let it sit only in the Situation Snapshot's technical language. Updated the Information-Environment Assessment to describe a fourth active information vector (recall completeness) alongside the three carried from v5.

## Verification

- Tag balance confirmed across all five briefing pages plus the report card (div / table / section / p / tr / td / th / ul / ol / li all matched, checked programmatically)
- No U+2014 em dash character or `&mdash;` entity introduced in any edited file; confirmed via a Python scan of each edited file's raw text, and via a repo-wide grep showing the only `&mdash;` hits remain in two unrelated, untouched report cards (FIFA World Cup, WHCD)
- Source-link liveness not independently re-verified this cycle (same network access limitation as v5); the three new links (Detroit News, Fox Business, Marler Blog) were surfaced via WebSearch summaries only, not fetched directly, and should be spot-checked before publish
- Accessibility preserved: table `scope` attributes, skip links, badge text alongside color, no color-only status indicators
- Version stamps consistent across all five pages plus the report card on `/osint-reports/` (v6, 2026-07-20, data as of 2026-07-19)

## Standing cadence

Daily refresh cadence continues. CDC expects cases to rise through the end of August 2026; the outbreak has not been declared over. The proxy/gateway network block has now persisted across two consecutive cycles (v5, v6). If it continues into the next cycle, this should be escalated to Jeff directly rather than repeated as a routine caveat, since it is now a standing limitation on this routine's ability to do primary-source verification at all.

## Next update should check

1. **Where the FDA import-surveillance positive lot went**, and whether it is folded into an expanded recall or confirmed to have never reached commerce. This is now the single highest-priority open item.
2. **Direct primary-source verification** of the FDA import-alert/recall pages, the 27-state recall list, and CDC's national count, once network access allows, or have Jeff check manually. Open for three cycles running.
3. **North Carolina's actual vehicle**, and whether investigators ever address the overlap between NC's "unlinked" cases and NC's presence on the Taylor Farms recall distribution list.
4. **Formal FDA recall class and number**, still not confirmed from a primary source across four cycles running.
5. **Whether CDC's national topline (still 1,645/141) ever moves.**
6. **Litigation volume**: whether more suits accumulate, whether any address the NC cases specifically.
7. **Death count**, still 0 across every source checked.
8. **Michigan's continued trajectory** (5,002 as of Jul 17, no fresher figure found across two cycles now).
9. **Whether the network access block is a session-specific fluke or a persistent environment policy change**, since it now affects our ability to do primary-source verification at all, not just a nice-to-have.

Outbreak not declared over. CDC continues to expect cases to rise through end of August 2026; recommend keeping the daily routine live.
