# Session Status: Cyclosporiasis Briefing v3

**Date:** 2026-07-16
**Work item:** [#31](https://github.com/Circle6Systems/Circle6website/issues/31)
**PR:** [#32](https://github.com/Circle6Systems/Circle6website/pull/32)
**Branch:** `feature/cyclospora-brief-v3`
**Deliverable:** https://circle6systems.com/osint-reports/cyclospora-2026/

---

## What happened

Updated the public cyclosporiasis threat-intelligence briefing from v2 (published Jul 15, data as of Jul 14) to v3 (Jul 16, data as of Jul 16). The reporting period produced the most consequential development since the briefing opened: the investigation acquired named targets.

## The development

An FDA traceback reportedly identified a single supplier, **Taylor Farms** (Salinas, CA), and a single commodity, **iceberg lettuce grown in Mexico**, supplied to **Taco Bell** in five states (MI, OH, WV, KY, IN). Taco Bell removed the ingredient indefinitely nationwide within 24 hours, ahead of any regulatory direction. Taylor Farms has not commented. Bloomberg reports an FDA consumer advisory for those five states is pending.

**Attribution status is the whole ballgame here.** This came from CBS and NBC citing "a person familiar with the investigation." No agency has confirmed it on the record. No recall exists. The briefing rates it Medium confidence and will not raise it until an agency states it directly. A firm that may yet be exonerated is being named publicly on an anonymous source, and v3 says so explicitly rather than laundering the leak into a finding.

## Analytic contributions beyond the news

Three things in v3 are ours rather than aggregated reporting:

1. **The five-state / 34-state mismatch.** The reported lead maps neatly onto the known 400+ shared-source cluster but accounts for a fraction of a 34-state outbreak. Offered three non-exclusive readings, weighting "distribution broader than Taco Bell" and "concurrent second vehicle" jointly as most likely. Conclusion: a formal attribution probably will not close this outbreak, and readers should not expect one announcement to resolve it.

2. **The frozen federal count.** CDC has been static at 1,645 since Jul 13 while Michigan alone added 550 cases in a day and state totals passed 7,500, widening the federal/state ratio from ~2.4x to ~4.6x. Assessed as adjudication latency (batch processing), not concealment, but flagged that an unexplained frozen number during a visible surge is close to ideal raw material for a cover-up narrative, and CDC has not preempted it.

3. **The 2013 replay.** New supply-chain section. Same firm, commodity, and country of origin as the 2013 outbreak (631 cases / 25 states). The uncomfortable finding carried forward: FDA's 2013 environmental assessment found practices "in accordance with known food safety protocols" and operations resumed within weeks. If 2026 resolves the same way, the recurrence indicts the absence of an industry kill-step for this organism on raw leafy greens, plus unmanaged upstream irrigation-water contamination, rather than one bad operator. Counter-weighted with the honest caveat that Taylor Farms supplies so much US foodservice leafy green that its appearance in a leafy-green outbreak carries less information than the pairing first suggests.

## Prediction calibration (two moved against us)

| # | Prediction | v2 | v3 | Status |
|---|---|---|---|---|
| 1 | Leafy-green vehicle | 80% | 90% | Trending confirmed |
| 2 | Source never conclusively named | 60% | 40% | Trending disconfirmed |
| 3 | Count converges upward | 80% "Confirmed" | 55% "Partially confirmed" | Corrected down |
| 4 | Surveillance is the durable story | 75% | 80% | Open |
| 5 | Attribution will not close the case | new | 70% | Open |
| 6 | Litigation outruns attribution | new | 85% | Open |

**P2** was the "source likely never identified" call. FDA reached a named supplier, commodity, and country of origin in roughly ten weeks, materially better than forecast. Not abandoned outright (attribution is not on the record, and the five-state scope may leave much unattributed), but marked down.

**P3 is the one worth remembering.** v2 marked it "Confirmed" because the count doubled 843 to 1,645. That was calling half a prediction a win. The second half (gap *narrows* toward state tallies) has actively reversed. Marked back down to Partially confirmed at 55%, with an explicit in-body note that the underlying claim holds but our model of *how* the numbers would reconcile was wrong: CDC adjudicates in lagging multi-day batches rather than converging continuously.

Publishing the correction in the briefing body, not just the changelog, is the point of running calibrated predictions at all.

## Data corrections

- Michigan 3,309 to **4,312** (102 hospitalized), plus county distribution
- State aggregate >4,000 to **>7,500**
- Added 2025 baseline comparison (249 cases at the same point), CDC's expectation of rise through end of August, and the state-count discrepancy (CDC HAN cites 35, we carry 34, media maps show 32)
- First litigation: *Ayyad v. Pacific Bells, LLC* (federal court, Ohio)

## Guidance changes

Misinformation matrix reworked around an **inverted risk**. In v2 the danger was premature source-naming. In v3 it is a credible-but-unofficial naming, where a reader can err in both directions: dismissing a well-sourced lead as rumor, or treating a five-state lead as a closed 34-state case. Six matrix rows rewritten/added, including "the source is solved so the outbreak is over" and "CDC is hiding the real numbers."

Added a five-state reader callout (skipping Taco Bell shredded lettuce there is reasonable precaution, explicitly not an official directive). Food-service guidance reframed around lot-level supplier traceability, using Taco Bell's own 24-hour substitution as the benchmark question: could you do the same?

## Verification

- Tag balance confirmed across all five pages (div / table / section / p all matched)
- No em-dash entities (hook-compliant)
- All new source links return 200 except Bloomberg and The Hill, which 403 on bot-block with valid URLs
- Accessibility preserved: table `scope` attributes, skip links, badge text alongside color, no color-only status indicators
- Version stamps consistent across all five pages plus the report card on `/osint-reports/`

## Standing cadence

User asked for a **24-hour refresh cadence** on this briefing, with a reminder to them rather than an autonomous publish. Scheduled accordingly. The briefing is a live event product and CDC expects cases to rise through end of August, so expect daily churn at least through the FDA advisory landing and likely through late summer.

## Next update should check

1. **Whether FDA formalizes the Taylor Farms attribution.** This is the single highest-value watch item. If it lands, P1 resolves confirmed and P2 likely resolves disconfirmed.
2. **Whether the pending five-state consumer advisory publishes**, and whether its scope matches the reported MI/OH/WV/KY/IN set.
3. **Whether CDC's confirmed count unfreezes**, and by how much. A large batch jump would validate the latency read in P3; continued freeze deserves harder scrutiny.
4. **Whether a recall is issued.** None so far; only voluntary removal.
5. **Whether Taylor Farms comments.** Still silent as of v3.
6. **Whether a second vehicle emerges** outside the five states (P5).
7. **Michigan's trajectory** and whether other states begin reporting at Michigan's scale.
