# Session Status: Cyclosporiasis Briefing v5

**Date:** 2026-07-19
**Work item:** issue filed same day (daily check)
**PR:** draft, links that issue
**Branch:** `feature/cyclospora-brief-v5-draft`
**Deliverable:** https://circle6systems.com/osint-reports/cyclospora-2026/

---

## What happened

Updated the public cyclosporiasis threat-intelligence briefing from v4 (published Jul 18, data as of Jul 17) to v5 (Jul 19, data as of Jul 18). The triggering development: Taylor Farms posted its own recall notice, and its scope turned out to be materially broader than the FDA's five-state Taco Bell advisory, 27 states, including retail bagged product. That broader footprint also surfaced an unresolved tension: North Carolina, the state we cited in v4 as clean evidence of a second, unrelated vehicle, is itself on the 27-state recall distribution list.

## The development

Per convergent secondary reporting (CNBC, Washington Post, Consumer Reports, Marler Blog, AP via Yahoo News), Taylor Farms de Mexico's recall notice, posted July 18, covers iceberg lettuce distributed June 29 through July 16 to 27 states: Alabama, Arkansas, Connecticut, Florida, Georgia, Iowa, Illinois, Indiana, Kansas, Kentucky, Louisiana, Massachusetts, Maryland, Michigan, Missouri, Mississippi, North Carolina, New Hampshire, New Jersey, Ohio, Oklahoma, Pennsylvania, South Carolina, Tennessee, Texas, Virginia, and Wisconsin. The list includes retail product, Walmart's Marketside Bagged Iceberg Salad and Shredded Iceberg Salad among them; Walmart states it has no confirmed illnesses tied to the retail product.

Separately, multiple law firms filed additional suits this week that for the first time name Taylor Fresh Foods, Inc. and Taylor Farms California, Inc. directly as defendants alongside Taco Bell, including *Caruso v. Taco Bell Corporation, et al.* (N.D. Ohio), filed by Marler Clark and Darr Law on behalf of a Geneva, Ohio plaintiff.

**The North Carolina overlap.** North Carolina's health department maintains its 307 cases are unlinked to the Taco Bell cluster (unchanged from v4). But North Carolina is on Taylor Farms' 27-state recall distribution list. We do not read this as disconfirming NC DHHS's statement, a recalled product reaching a state is not evidence any resident consumed it or fell ill from it, and NC DHHS has not revised its position. But we flag it because it complicates, rather than confirms, our v4 framing of North Carolina as clean evidence of a second, wholly separate vehicle. This is the "cuts against us" item for this cycle: v4's Prediction 5 update read NC as confirming evidence of a second vehicle; v5 has to note that the same supplier's product reaching NC muddies that reading.

**Access limitation (new and more severe than prior cycles).** This session's outbound network access was blocked at the proxy/gateway level for essentially every external host attempted, confirmed via the proxy's own status endpoint (`connect_rejected`, "gateway answered 403 to CONNECT"), including hosts with no history of bot-blocking (e.g., Wikipedia). This is different from, and broader than, the site-specific Akamai-style bot-blocks on cdc.gov/fda.gov we hit in v3 and v4. We could not directly retrieve CDC's, FDA's, or Taylor Farms' own pages this cycle. Every new fact in v5 rests on convergence across multiple independent secondary outlets rather than primary-source text. CDC's national count (still cited at 1,645 by every secondary source found, none reporting a change) could not be independently confirmed as unchanged versus simply not yet re-reported.

## Analytic contributions beyond the news

1. **Surfacing the NC/recall overlap rather than smoothing over it.** It would have been easy to publish this cycle without connecting "recall reaches 27 states" to "North Carolina, a state we already cover, is one of them." We chose to state the overlap plainly and say we do not know what it means, rather than either quietly dropping North Carolina from the narrative or overselling the overlap as new evidence NC's cases are linked. Both would have been worse than the honest "unresolved" framing.
2. **Splitting Prediction 5 into components that the recall separates unevenly.** The prediction had two readings, broader distribution of the same vehicle, or a second concurrent vehicle. The recall confirms the first reading is also true (27-state distribution), which means North Carolina can no longer be cited as clean evidence for the second reading without addressing the overlap. We lowered confidence (85% to 78%) to reflect that the prediction's two halves are no longer cleanly separable, rather than mechanically raising it further on an unexamined assumption.
3. **Naming our own verification gap as a limitation, not a footnote.** Rather than repeating "frozen since Jul 13" as an established fact, v5 explicitly distinguishes what is confirmed (every secondary source still cites 1,645) from what is not (independent confirmation this cycle that CDC's own page has not moved), given this cycle's access block. Prediction 3's confidence was lowered specifically to reflect that gap.

## Prediction calibration

| # | Prediction | v4 | v5 | Status |
|---|---|---|---|---|
| 1 | Leafy-green vehicle | 95% | 95% (unchanged) | Confirmed |
| 2 | Source never conclusively named | 25% | 25% (unchanged) | Disconfirmed (named cluster) / Open (outbreak-wide) |
| 3 | Count converges upward | 40% | 35% | Partially confirmed, trending against us, verification gap noted |
| 4 | Surveillance is the durable story | 83% | 83% (unchanged) | Open |
| 5 | Attribution will not close the case | 85% | 78% | Trending confirmed, complicated by the NC/recall overlap |
| 6 | Litigation outruns attribution | 85% | 90% | Confirmed further (new suits name Taylor Farms directly) |

**P5 is the one to watch next.** If NC DHHS later attributes its cases to Taylor Farms after all, that resolves P5 through its "broader distribution" clause rather than its "second vehicle" clause, a different resolution than v4 anticipated. If NC identifies a genuinely distinct vehicle (parsley, cilantro), the overlap turns out to be recall breadth without epidemiological significance. Either way, this needs a clean answer before it can be marked resolved with confidence.

## Data corrections

- Recall status: "Recall initiated ... formal recall class/number not yet confirmed" to "Recall published, 27 states" with the full state list and retail (Walmart) detail
- Litigation: "First suit filed (*Ayyad v. Pacific Bells, LLC*), no new filings" to "Multiple suits; Taylor Farms now named" (*Caruso v. Taco Bell Corporation, et al.*, N.D. Ohio, and others)
- No change to CDC national topline (1,645/141/0), Michigan (5,002/102 as of Jul 17, no fresher figure found), or NC case count (307); these are carried forward, not re-verified this cycle

## Guidance changes

Added a Walmart/retail-product callout to the Public Protective Checklist (protective-guidance.html) alongside the existing five-state Taco Bell callout and North Carolina callout; added a note to the North Carolina callout about the recall overlap. Updated the "CDC is hiding the real numbers" and "the source is solved" misinformation-matrix rows to reflect the recall's broader scope and the unresolved NC overlap. Food-service operator guidance updated to note the recall's 27-state reach, not just the five-state advisory.

## Verification

- Tag balance confirmed across all five briefing pages plus the report card (div / table / section / p / tr / td / th / ul / ol / li all matched, checked programmatically)
- No long dash character (U+2014) or `&mdash;` entities introduced in any edited file; a repo-wide grep found `&mdash;` only in two unrelated, untouched report cards (FIFA World Cup, another briefing)
- Source-link liveness not independently re-verified this cycle (network access limitation described above); new links added this cycle (CNBC, Washington Post, Consumer Reports, Marler Blog, PR Newswire, Yahoo/AP) were not fetched directly, only surfaced via WebSearch summaries, and should be spot-checked before publish
- Accessibility preserved: table `scope` attributes, skip links, badge text alongside color, no color-only status indicators
- Version stamps consistent across all five pages plus the report card on `/osint-reports/` (v5, 2026-07-19, data as of 2026-07-18)

## Standing cadence

Daily refresh cadence continues. CDC expects cases to rise through the end of August 2026; the outbreak has not been declared over. This cycle's network access limitation (broad proxy-level block, not just government-domain bot-blocking) should be checked at the start of the next session; if it persists, escalate to Jeff rather than silently downgrading every future update's sourcing standard.

## Next update should check

1. **Direct primary-source verification**, this cycle's top priority. Confirm the 27-state recall list and its dates directly against Taylor Farms' or FDA's own recall notice, and CDC's national count, once network access allows, or have Jeff check manually.
2. **North Carolina's actual vehicle**, and specifically whether investigators ever address the overlap between NC's "unlinked" cases and NC's presence on the Taylor Farms recall distribution list. This is now the single most important open analytical question.
3. **Formal FDA recall class and number**, still not confirmed from a primary source across three cycles running.
4. **Whether CDC's national topline (still 1,645/141) ever moves**, and whether this cycle's verification gap can be closed with a direct fetch next time.
5. **Litigation volume**: whether more suits accumulate, whether any become class actions, and whether any suit specifically addresses the NC cases.
6. **Death count**, still 0 across every source checked; keep monitoring.
7. **Michigan's continued trajectory** (5,002 as of Jul 17, no fresher figure found this cycle) and whether any other state approaches that scale.
8. **Whether other states beyond NC report clusters not linked to the Taco Bell/Taylor Farms lettuce**, especially any of the other 26 recall states.

Outbreak not declared over. CDC continues to expect cases to rise through end of August 2026; recommend keeping the daily routine live.
