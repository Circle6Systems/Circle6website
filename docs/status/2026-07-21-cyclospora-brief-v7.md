# Session Status: Cyclosporiasis Briefing v7

**Date:** 2026-07-21
**Work item:** [#39](https://github.com/Circle6Systems/Circle6website/issues/39) (supersedes a duplicate issue, #38, filed in error this same cycle before this thread was discovered; see note below)
**PR:** draft, updates the existing #36 (v5/v6 never published; this draft supersedes them directly, on the same branch)
**Branch:** `feature/cyclospora-brief-v5-draft`
**Deliverable:** https://circle6systems.com/osint-reports/cyclospora-2026/

---

## What happened, and a process note first

This cycle's research began without first checking for open issues or PRs on this recurring routine, and independently found the same 27-state recall story that a prior cycle (issue #35, 2026-07-19) had already surfaced, plus a new development. That produced a duplicate issue (**#38**) before the existing thread (issues #33/#35/#37, PR #36, now on its third revision as v6) was discovered. Once discovered, the branch was checked out fresh from `origin/feature/cyclospora-brief-v5-draft` (which carried v6, not v5, since v5 was superseded in place per the v6 status doc's own note) and this update was built on top of the real v6 content rather than force-pushing a conflicting version over it. Issue #38 is being closed as superseded; this status doc and a new issue (#39) carry the real finding forward. **Lesson for future cycles, added to the "next update should check" list below: check `list_issues` and `list_pull_requests` for this repo before filing a new daily-check issue.**

That said, the research this cycle did surface something genuinely new and valuable that the existing v6 draft did not have: **the "direct positive lab test" v6 reported as the strongest evidence in the case to date was retracted by FDA the very next day as a false positive.** This is a correction to the in-flight draft, not a duplicate of it.

## The development

v6 (built from a session on 2026-07-20 at 01:37 UTC) reported that FDA's targeted import surveillance had returned a direct positive laboratory test for Cyclospora on Taylor Farms de Mexico lettuce, and called it "the strongest evidentiary footing yet" for the attribution. Per convergent secondary reporting found this cycle (NBC News, CNBC, Newsweek, Forbes, CBS News, all dated 2026-07-19 or 2026-07-20), FDA re-reviewed that same sample and concluded on July 19 that it was a **false positive**, stating the finding "does not represent true amplification," and reportedly apologized to Taylor Farms. As of that date, there are no confirmed positive product-sample test results anywhere in this outbreak. FDA states its epidemiological and traceback conclusion, that the outbreak is linked to Taylor Farms de Mexico iceberg lettuce, is unchanged.

Under our own hedge-discipline standard, this does not demote the named-cluster attribution from a finding back to a lead, since it still rests on on-the-record agency naming independent of this specific lab result. But v6's specific characterization ("strongest evidentiary footing yet") no longer holds, and this update corrects it in place, following the site's practice of layering a correction alongside the original claim rather than quietly rewriting history (the same approach v3 used when it walked back v2's premature "Prediction 3: Confirmed" call).

**Everything else from v6 (the 27-state recall, the North Carolina/recall overlap, litigation naming Taylor Farms entities directly) is carried forward unchanged.** No source found this cycle updates any of those threads.

## Access limitation (persists from v5/v6, now a third cycle)

WebFetch returned HTTP 403 for every domain attempted this cycle, including fda.gov, cdc.gov, and multiple news domains, and a control fetch against a neutral site also failed, confirming (via the proxy's own status endpoint) a gateway-level `connect_rejected` policy denial rather than bot-blocking. This is the same broad block reported in the v5 and v6 status docs. All figures in this update, including the false-positive retraction itself, come from WebSearch-mediated summaries rather than a direct primary-source read. This is now the third consecutive cycle without primary-source access, and per the v6 status doc's own recommendation, we are flagging this explicitly to Jeff again rather than repeating it as a routine caveat: **if this persists another cycle, it should be treated as a standing environment issue, not noise.**

## Analytic contributions beyond the news

1. **Correcting an in-flight draft honestly, including reverting our own confidence bump.** v6 raised Prediction 1's confidence (95% to 97%) specifically because of the now-retracted lab result. Rather than leaving that figure standing on a foundation that no longer exists, this update reverts it to 95% and says why. This is the same calibration-honesty practice the briefing has followed since v3, applied here to a same-week self-correction rather than a multi-day one.
2. **Re-reading the "capability positive" argument v6 made about Prediction 4.** v6 credited FDA's import surveillance with catching contamination proactively, evidence cutting against the "eroded surveillance" thesis, and lowered Prediction 4's confidence slightly (83% to 81%) to reflect genuinely mixed evidence. Since the catch itself was a lab error, that specific argument evaporates: the accurate description is not "surveillance caught contamination" but "surveillance produced an erroneous result requiring public correction." We raised Prediction 4 above its pre-v6 baseline (81% to 85%) rather than merely reverting, since a public retraction and apology is itself a new, if modest, capacity-strain data point.
3. **Distinguishing what the retraction changes from what it does not.** It does not reopen the outbreak-wide attribution question (Prediction 2), the North Carolina overlap (Prediction 5), or litigation (Prediction 6), none of which depended on this specific lab result. We said so explicitly for each rather than letting the correction bleed into predictions it does not actually touch.

## Prediction calibration

| # | Prediction | v6 | v7 | Status |
|---|---|---|---|---|
| 1 | Leafy-green vehicle | 97% | 95% (reverted) | Confirmed |
| 2 | Source never conclusively named | 25% | 25% (unchanged) | Disconfirmed (named cluster) / Open (outbreak-wide) |
| 3 | Count converges upward | 35% | 35% (unchanged) | Partially confirmed, trending against us, verification gap now three cycles |
| 4 | Surveillance is the durable story | 81% | 85% | Open, corrected upward past the pre-v6 baseline |
| 5 | Attribution will not close the case | 78% | 78% (unchanged) | Trending confirmed, complicated by the NC/recall overlap |
| 6 | Litigation outruns attribution | 90% | 90% (unchanged) | Confirmed further; no new filings found this cycle |

**Prediction 1 and Prediction 4 together are the clearest illustration of why we correct in place rather than silently.** Both moved on the strength of a lab result that lasted about 24 hours before FDA itself retracted it. A briefing that had quietly dropped the v6 language without flagging the reversal would have left two confidence figures resting on nothing. Saying so plainly, including that we got it wrong for a day, is the same practice that made v3's Prediction 3 correction credible.

## Data corrections

- Import-surveillance lab test: "Positive for Cyclospora" (v6) to "Retracted (false positive)" (v7); no confirmed positive product-sample result exists in this outbreak as of Jul 19
- Recall status: removed the "completeness in question" framing that was premised on the now-retracted separate positive lot; the recall's 27-state scope itself is unaffected and still stands
- Confirmed supplier (cluster) row: removed "elevated by a direct positive lab test," reverted to epidemiologic/traceback grounds only
- No change to CDC national topline (1,645/141/0), Michigan (5,002/102 as of Jul 17, no fresher figure found), NC case count (307), the 27-state recall list, or litigation status; all carried forward from v6, not re-verified this cycle

## Guidance changes

Protective Guidance's "The recall covers all the contaminated product" row (Unproven), which was premised on the separate positive lot, was replaced with a new row addressing the false-positive headline directly ("the false-positive lettuce test means the source is unconfirmed / back to square one," rated Overstated rather than False, since the underlying physical-evidence point is real even though "source unknown again" overstates FDA's own position). The Information-Environment Assessment's "fourth vector" discussion was rewritten to describe the false-positive retraction and its headline framing rather than the now-resolved recall-completeness question.

## Verification

- Tag balance confirmed across all five briefing pages plus the report card (div / section / p / table / tr / td / th / ul / ol / li / nav / a / h1 / h2 / h3, checked programmatically, all matched)
- No em dash characters or `&mdash;` entities introduced in any edited file (repo-wide grep restricted to the six changed files; the only hits remain in unrelated, untouched report cards, consistent with every prior status doc in this series)
- Accessibility preserved: table `scope` attributes, skip links, badge text alongside color, no color-only status indicators
- Version stamps consistent across all five pages plus the report card on `/osint-reports/` (v7, 2026-07-21, data as of 2026-07-20)
- Source-link liveness: not verified this cycle, same network access limitation as v5/v6; new sources (NBC, CNBC, Newsweek, Forbes, CBS) are cited via WebSearch summaries, not direct fetch

## Standing cadence

Daily refresh cadence continues. CDC continues to expect cases to rise through end of August 2026; the outbreak is not declared over.

## Next update should check

1. **Check `list_issues` and `list_pull_requests` before filing a new daily-check issue or branch**, to avoid the duplicate-issue process error this cycle produced. Added as a standing item, not just a one-off note.
2. **Direct primary-source verification** of the FDA recall notice, the import-surveillance finding and its retraction, and CDC's national count, now blocked for three consecutive cycles. Escalate to Jeff if it persists a fourth.
3. **Where the FDA import-surveillance lot went**, if FDA ever discloses it, now a secondary question given the test itself was retracted, but the underlying lot-disposition question v6 raised is technically still open on its own terms.
4. **North Carolina's actual vehicle**, and whether investigators ever address the overlap between NC's "unlinked" cases and NC's presence on the Taylor Farms recall distribution list.
5. **Formal FDA recall class and number**, still not confirmed from a primary source across five cycles running.
6. **Whether CDC's national topline (still 1,645/141) ever moves.**
7. **Litigation volume**: whether more suits accumulate, whether any address the NC cases specifically.
8. **Death count**, still 0 across every source checked.
9. **Michigan's continued trajectory** (5,002 as of Jul 17, no fresher figure found across three cycles now).

Outbreak not declared over. CDC continues to expect cases to rise through end of August 2026; recommend keeping the daily routine live.
