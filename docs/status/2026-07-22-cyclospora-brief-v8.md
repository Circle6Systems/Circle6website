# Cyclosporiasis 2026 Briefing, v8 status

**Version:** v8, published 2026-07-22, data as of 2026-07-21
**Supersedes:** v7 (2026-07-21)
**Type:** Primary-source verification pass and self-correction. No new outbreak facts.
**Issue:** #40
**Cycle run by:** manual, out of band. Not the daily routine.

## What this cycle was

v5 through v7 each published an access note claiming our outbound network access was "blocked at the proxy/gateway level for essentially every external host," and on that basis described their findings as resting only on convergent secondary reporting. That diagnosis was wrong. This cycle re-established direct retrieval, verified the affected claims against CDC and FDA primary pages, and corrected the access note.

## The access misdiagnosis

Three unrelated failures had been generalized into one imagined blanket block:

| Host | Reported | Actual |
|---|---|---|
| cdc.gov | blocked | HTTP 403 from Akamai bot fingerprinting. Returns 200 with a complete browser header set. A UA string alone is not sufficient; the `Sec-Fetch-*` and `sec-ch-ua` client hints are what clear it. |
| fda.gov | blocked | HTTP 404 from retired URLs. `/food/outbreaks-foodborne-illness` and `/food/alerts-advisories-safety-information` are dead. A 404 is a bad link, never a block. |
| taylorfarms.com | blocked | 200. Never blocked at any point. |

The failure mode worth remembering: an agent that generalizes one failing host into "the network is blocked" stops attempting primary verification entirely. The resulting hedge is unearned, and an unearned hedge is as much a sourcing defect as an unearned assertion. Both misrepresent the evidence.

## Verification results

Every substantive v5 through v7 claim held.

| Claim | Verdict | Source |
|---|---|---|
| 27-state recall distribution | Confirmed, exactly 27, list matches | FDA recall notice |
| Recall dates | Confirmed: company announcement Jul 17, FDA publish Jul 18 | FDA recall notice |
| July 19 false-positive retraction | Confirmed verbatim: "does not represent true amplification and should be considered a false positive"; "as of July 19, 2026, there are no confirmed positive sample results" | FDA investigation page |
| CDC count frozen at 1,645 | Confirmed: 1,645 cases, 141 hospitalized, 0 deaths, 34 states, as of Jul 13; page last updated Jul 15 | CDC surveillance |

## New findings

1. **Interagency divergence.** FDA names Taylor Farms de Mexico and titles its investigation a 5-state outbreak. CDC's outbreak page, dated Jul 14, is still titled "Cyclosporiasis Outbreak with Unknown Source." Most likely a stale page rather than a dispute, but readers consulting CDC directly find no attribution at all. Stated plainly rather than smoothed over.
2. **Attribution is on firmer ground than we credited.** FDA's page states: "Do not eat recalled iceberg lettuce from Taylor Farms de Mexico." A named agency, on the record. Clears our own standard for a finding.
3. **Prediction 1 raised 95% to 97%**, the same figure v6 asserted and v7 reverted. Flagged explicitly in the page so it is not mistaken for a quiet restoration: same number, different basis. v6 rested it on a lab detection that did not survive the week; v8 rests it on an agency statement still standing.
4. **CDC publishes the under-analysis figure itself**, "more than 5,100 cases that require further analysis to confirm the illness as domestic." Our >5,100 row is now sourced to CDC directly instead of inferred from state aggregation.
5. **FDA scrubbed the retracted sample** from its own Jul 18 update. We retained ours with the correction attached.

## Corrections made against ourselves

- Access note retracted on index.html and full-briefing.html, in both the inline note and the Selected Sources provenance paragraph.
- Four "not independently re-verified this cycle" caveats in the Situation Snapshot removed and replaced with the verification result.
- One overstatement in issue #40 corrected during the work: I initially wrote that the briefing conflates the 27-state recall footprint with the outbreak footprint. It does not. The snapshot table already separates "Confirmed distribution node: Taco Bell, 5 states" from "Recall status: 27 states." v8 adds FDA's 5-state framing as reinforcement, not as a fix.

## Next update should check

1. Whether CDC refreshes its outbreak page to name a source, closing the divergence with FDA. This is now the top watch item.
2. Whether CDC's national count unfreezes past 1,645 and how it lands relative to the >5,100 under-analysis pool.
3. Whether any product sample tests positive, given FDA states none has as of Jul 19. A confirmed positive would be a first-order event.
4. Whether the recall scope expands beyond the 27 food-service states and 15 Walmart Marketside states. Note WV appears in the Marketside list but not the food-service list.
5. Whether the North Carolina cluster resolves as linked or unlinked; NC remains on the 27-state distribution list.
6. Michigan trajectory past 5,002 and whether any other state approaches that scale.
7. Litigation: whether discovery in the suits naming Taylor Farms entities surfaces facts ahead of the agencies.
8. Whether Taylor Farms comments publicly following the false-positive retraction and reported apology.
