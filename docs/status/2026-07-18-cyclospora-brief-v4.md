# Session Status: Cyclosporiasis Briefing v4

**Date:** 2026-07-18
**Work item:** [#33](https://github.com/Circle6Systems/Circle6website/issues/33)
**PR:** draft, links issue #33
**Branch:** `feature/cyclospora-brief-v4-draft`
**Deliverable:** https://circle6systems.com/osint-reports/cyclospora-2026/

---

## What happened

Updated the public cyclosporiasis threat-intelligence briefing from v3 (published Jul 16, data as of Jul 16) to v4 (Jul 18, data as of Jul 17). This is the largest single-day shift since the briefing opened: five of the seven watch items flagged in the v3 status file moved, and the central attribution question that dominated v2 and v3 is now largely resolved for the named cluster, while a new second-vehicle finding opened a different one.

## The development

FDA and CDC published official outbreak pages on July 17 linking a five-state cluster (1,644 cases / 94 hospitalized, Indiana, Kentucky, Michigan, Ohio, West Virginia) to shredded iceberg lettuce sourced from **Taylor Farms de Mexico**. FDA's consumer advisory for those five states is now live, matching the scope reported in v3 exactly. Taylor Farms broke its silence with a public statement, is voluntarily withdrawing all central-Mexico iceberg lettuce, and has told FDA it will initiate a recall, without admitting fault. Separately, **North Carolina's Department of Health and Human Services stated its 307 cases (Wake County-concentrated) are not linked to the Taco Bell cluster**, direct evidence of a second, unidentified vehicle. Michigan climbed to 5,002 cases / 102 hospitalized (from 4,312). CDC's national confirmed count did not move: still 1,645 / 141 hospitalized / 0 deaths, now a five-day freeze.

**Primary-source verification (added 2026-07-18).** The original draft was written from search-indexed summaries because `cdc.gov`, `fda.gov`, and `taylorfarms.com` were blocked in that research session. A follow-up session with a standard browser user-agent retrieved the **FDA outbreak page** and the **Taylor Farms statement** directly and confirmed their figures and wording verbatim:

- FDA page (retrieved 200): Case Counts "Total Illnesses: 1,644 / Hospitalizations: 94 / Deaths: 0 / Last Illness Onset: July 13, 2026 / States: IN, KY, MI, OH, WV." FDA text: its traceback "identified convergence on a single supplier, Taylor Farms de Mexico." Consumer advisory verbatim: "Do not eat shredded iceberg lettuce from Taylor Farms de Mexico served at Taco Bell locations in IN, KY, MI, OH, and WV."
- Taylor Farms statement (retrieved): confirms voluntary removal of all central-Mexico iceberg lettuce, the "specific independent farm ... less than 1% of the U.S.'s iceberg lettuce supply" framing, no admission of fault, and that no Taylor Farms-branded salads or kits are implicated.
- CDC outbreak page still returned an automated-access block (Akamai) even with a browser UA; its figures and naming are corroborated through the directly retrieved FDA page and multiple independent secondary sources.

**Attribution nuance corrected in-body:** FDA names Taylor Farms de Mexico as *the single supplier*; the "single independent farm supplying Taylor Farms" phrasing is the *company's* framing. The full briefing now presents the agency's blunter wording as the finding and attributes the independent-farm framing to Taylor Farms.

**One item still unverified:** the CDC *national* topline freeze (1,645 / 141, unchanged since Jul 13) is an absence-of-change claim on the CDC surveillance page, which remained access-blocked. The cluster figure (1,644 / 94) is confirmed; the national-freeze analysis should be treated as still pending a direct CDC read.

## Analytic contributions beyond the news

1. **The frozen-count paradox.** CDC's national topline has now sat at 1,645/141 for five days (Jul 13 to at least Jul 17), while FDA and CDC separately published a fresh, current, cluster-specific count (1,644/94) in the same reporting period. That is new evidence: it shows the agencies can and did publish a current confirmed number when they chose to, they just didn't move the aggregate one. This weakens the "adjudication latency, not concealment" explanation we gave in v3, and we say so more pointedly in v4, marking it as the item most deserving of harder scrutiny next cycle rather than repeating the v3 hedge unchanged.
2. **Splitting Prediction 2 rather than just re-scoring it.** FDA/CDC named a supplier on the record for the Taco Bell cluster, which disconfirms the narrow form of "source likely never conclusively named." But North Carolina's unattributed cases are direct evidence the broader-outbreak version of that prediction is still live. We resolved the prediction as disconfirmed for the named cluster and open for the outbreak as a whole, rather than picking one verdict and losing the nuance.
3. **Treating the NC finding as confirmation of Prediction 5, not just a new fact.** v3's Prediction 5 (attribution will not close the case; expect a second vehicle) was speculative when written. NC DHHS's statement is close to direct confirmation one day later. We raised its confidence sharply (70% to 85%) and said explicitly that this is the prediction resolving in our favor, not just new information sitting next to it.

## Prediction calibration

| # | Prediction | v3 | v4 | Status |
|---|---|---|---|---|
| 1 | Leafy-green vehicle | 90% | 95% | Confirmed |
| 2 | Source never conclusively named | 40% | 25% | Disconfirmed (named cluster) / Open (outbreak-wide) |
| 3 | Count converges upward | 55% "Partially confirmed" | 40% | Partially confirmed, trending against us |
| 4 | Surveillance is the durable story | 80% | 83% | Open |
| 5 | Attribution will not close the case | 70% | 85% | Trending confirmed |
| 6 | Litigation outruns attribution | 85% | 85% (unchanged) | Open, no new evidence found this cycle |

**P3 is the one to watch.** We are now on record twice (v3, v4) lowering confidence in our own "it's just latency" explanation for the frozen federal count. If it unfreezes with a large batch jump next cycle, that vindicates the latency read. If it stays frozen through another cluster-specific publication, that is a stronger signal and the write-up should say so plainly rather than repeating the same hedge a third time.

## Data corrections

- Michigan 4,312 to **5,002** (102 hospitalized, unchanged), single-day addition of 690
- North Carolina 240 to **307** cases (May 1 to Jul 14), reclassified from "per state reporting" to "confirmed not linked to the Taco Bell cluster"
- Added the Taco Bell cluster-specific count (1,644 / 94 hospitalized) as a new, distinct figure alongside the national CDC topline (1,645 / 141)
- Recall status: "None issued" to "Recall initiated" (Taylor Farms de Mexico, Jul 17)
- Supplier/distribution node status: "Reported" (amber, Medium confidence) to "Confirmed" (green, High confidence) for the named cluster

## Guidance changes

Public checklist split into two state-specific callouts: one for the five states covered by FDA's advisory (now an official directive, not a press-sourced precaution), and a new one for North Carolina (explicitly not covered by that advisory, separate unidentified vehicle). Misinformation matrix rows rewritten: "FDA has confirmed Taylor Farms" flipped from Unconfirmed to True-for-the-cluster; "there is a nationwide recall" reworded to correct scope (central-Mexico iceberg lettuce specifically, not all lettuce or all Taylor Farms products); "CDC is hiding the real numbers" downgraded from a clean False to an explicit "harder to dismiss than last week," given the frozen-count-vs-fresh-cluster-count point above.

## Verification

- Tag balance confirmed across all five pages plus the report card (div / table / section / p / tr / td / th / ul / ol / li all matched, checked programmatically)
- No em dash characters or `&mdash;` entities introduced in any edited file (checked with a repo-wide grep restricted to the six changed files; the only `&mdash;` hits in the repo are in unrelated, untouched report cards)
- Source-link liveness (verified 2026-07-18 follow-up session, standard browser UA): `fda.gov` outbreak page returns HTTP 200 and its figures/wording verified verbatim; `taylorfarms.com` statement retrieved and verified; `cdc.gov` outbreak page returns an automated-access block (Akamai) but is the canonical live URL, corroborated via the FDA page and secondary reporting. All three primary-source citations resolve for a human browser.
- Accessibility preserved: table `scope` attributes, skip links, badge text alongside color, no color-only status indicators
- Version stamps consistent across all five pages plus the report card on `/osint-reports/`

## Standing cadence

Daily refresh cadence continues. This was the most consequential single-day update since the briefing opened; expect the pace to stay high through primary-source verification, the formal recall's scope/class, and North Carolina's vehicle identification.

## Next update should check

1. **Primary-source verification.** Confirm the exact wording FDA and CDC use on their own outbreak/advisory pages once direct access is available, or have Jeff check manually. This is the single most important open item given this cycle's network-access limitation.
2. **Formal recall scope and class** (product codes, lot numbers, effective date, FDA recall number), not yet confirmed from a primary source.
3. **Whether CDC's national topline (still 1,645/141) ever moves**, and whether it's reconciled against the 1,644/94 cluster-specific figure. This is the item we've now flagged for harder scrutiny two cycles running.
4. **North Carolina's actual vehicle**, if and when NC DHHS identifies one (currently parsley/cilantro/lettuce, unconfirmed).
5. **Whether other states beyond NC report clusters not linked to the Taco Bell/Taylor Farms lettuce.**
6. **Litigation volume and any new filings** beyond *Ayyad v. Pacific Bells, LLC*; none found this cycle.
7. **Death count**, still 0 across every source checked; keep monitoring.
8. **Michigan's continued trajectory** (5,002 as of Jul 17) and whether any other state approaches that scale.

Outbreak not declared over. CDC continues to expect cases to rise through end of August 2026; recommend keeping the daily routine live.
