# Cyclosporiasis 2026 Briefing, v16 status

**Version:** v16, published 2026-07-29, data as of 2026-07-28
**Supersedes:** v15 (2026-07-28, live on main)
**Type:** Daily routine check, MATERIAL (narrow: State Involvement Map figure only, not outbreak facts).
**Issue:** filed this cycle (linked from the PR body)
**Cycle run by:** the scheduled daily-check routine

## Step 0: prior-work check

`main` is at v15 (merged via PR #61, closed/merged 2026-07-28T05:19:37Z). No issue existed yet for 2026-07-29; this is the first issue filed today. One open PR exists, `#62` ("Fix orphaned 'still' typo in v15 litigation panel," branch `fix/cyclospora-v15-still-typo`, **not draft**, unmerged since 2026-07-28T05:21Z, about a day old at cycle start). It is a single-line capitalization fix tracked under issue #60, not a `feature/cyclospora-brief-vN-draft` content branch, so it does not trigger the "push onto the existing draft" rule. This cycle's own edit to `index.html` independently rewrites the exact sentence PR #62 targets (the orphaned "still" is capitalized as part of rewriting that paragraph's Ohio/Indiana/West Virginia/North Carolina figures), so PR #62 will likely be superseded once this cycle's PR merges; flagged for Jeff in the new PR's body rather than acted on unilaterally (no authority to close another PR).

No `feature/cyclospora-brief-vN-draft` PR was open at cycle start, so this cycle opens a fresh branch (`feature/cyclospora-brief-v16-draft`) off `main`.

## What this cycle checked

Per v15's "Next update should check" queue: North Carolina's Jul 28 Tuesday update; Ohio's next statewide figure and whether odh.ohio.gov is back online; whether CDC's national confirmed count moves from 4,173/41; whether FDA's refs #1384/#1385/#1392 get a product ID; an Epi-Aid interim finding, extension, or similar request; further Mexico/FDA/CDC exchange; whether any of the eight tracked suits reach a ruling/consolidation/settlement, and a self-audit of the sources list for untracked litigation; cluster-specific sub-counts for IL/KS/OK/PA; and Indiana's "nearly 750" figure firming up / West Virginia moving past 226/19.

## Retrieval environment this cycle

This session's outbound fetching failed categorically, distinct from prior cycles' host-specific findings. Both direct `curl` (via the environment's outbound proxy) and the `WebFetch` tool returned failures against essentially every external host tried this session, including hosts v15's local re-run (by Jeff, outside this proxied environment) confirmed return HTTP 200 normally (cdc.gov, fda.gov, taylorfarms.com, michigan.gov). Diagnosis: `curl -v` showed the **proxy's CONNECT tunnel itself was rejected with 403** for every host tested (`www.ncdhhs.gov`, `odh.ohio.gov`, `www.cdc.gov`, `www.fda.gov`, `www.taylorfarms.com`, `www.michigan.gov`, `www.courthousenews.com`), confirmed via the proxy's own `/__agentproxy/status` diagnostic endpoint, which logged `connect_rejected: gateway answered 403 to CONNECT (policy denial or upstream failure)` for each. This is a network-egress-policy characteristic of *this specific sandboxed session*, not a per-host bot-fingerprinting issue (the cdc.gov/Akamai narrative carried in this briefing since v9), and not something a UA/header change can work around. `WebFetch` (a different retrieval path) also 403'd on every site tried (spectrumlocalnews.com, wbtv.com, witn.com, cnn.com, toledoblade.com, cidrap.umn.edu, marlerblog.com, ncdhhs.gov), likely each site's own bot defenses rather than the proxy. **Net effect: this cycle is entirely `WebSearch`-sourced** (snippets and cross-outlet corroboration only); no primary or secondary page was independently fetched and read in full. All figures below are graded accordingly (secondary, not primary-verified this cycle) and the public pages say only "press-sourced," never naming this infrastructure detail.

## Materiality verdict: MATERIAL, narrowly, on the State Involvement Map; NOT material on outbreak facts

No case-count, attribution, recall, or litigation development changed this cycle: CDC's national confirmed count remains 4,173/41 states, a sixth consecutive quiet cycle; no product/supplier ID for FDA's refs #1375/#1384/#1385/#1392; no Epi-Aid interim finding or extension; no further Mexico/FDA/CDC on-the-record exchange; no reopening date for Taylor Farms' Guanajuato facility; no new suit, ruling, or consolidation among the eight tracked matters; no second vehicle/commodity beyond what is already tracked; no lab retraction or reclassification.

**North Carolina's separate (non-lettuce-linked) outbreak jumped materially.** NCDHHS's Jul 28 weekly update (per WITN, WBTV, Spectrum News, Watauga Democrat, all citing the same NCDHHS-attributed figures) reports **718 cases and 24 hospitalizations**, up from 561/16 (Jul 20): a 28% rise in cases and 50% rise in hospitalizations in one week, the sharpest single-week movement this briefing has recorded for North Carolina. This qualifies as MATERIAL under the routine's explicit Step 2B rule ("a state materially revising its total"), even though it does not bear on attribution, recall scope, or the Taco Bell cluster (NC's own no-link statement is unchanged) and does not itself change the outbreak-wide verdict. Applied to the State Involvement Map (`state-map-embed.html`), the Situation Snapshot's "Second vehicle" row, and Prediction 5's tracking (held at 87%, not raised, since this is continued growth of an already-counted vehicle rather than a qualitatively new one).

**Michigan's map entry was two cycles stale and is brought current as routine upkeep.** `state-map-embed.html`'s Michigan figure had not been touched since v14 (8,176, Jul 24) even though the narrative pages moved to 9,253 in v15; this cycle updates the map to 9,680 (Jul 28, MDHHS via press, up from 9,253 Jul 27) so the map matches the narrative pages again.

An unconfirmed lead was found and NOT published: a CNN headline ("Retailers shun central Mexico produce as US cyclospora outbreak spreads, former FDA chief says," Jul 28) could not be fetched this cycle (see retrieval note above), so neither the claim's specifics, the named official, nor whether it implicates any product beyond the already-tracked lettuce cluster could be verified. Logged as a watch item rather than published, per hedge discipline.

## What changed vs. what we currently publish (v15)

| Item | Live/draft (v15) | This cycle's finding | Source | Verdict |
|---|---|---|---|---|
| North Carolina | 561 cases / 16 hosp. (Jul 20) | **718 / 24** (Jul 28, NCDHHS's own update); +28% cases, +50% hosp. w/w | [WBTV](https://www.wbtv.com/2026/07/28/north-carolina-reaches-over-700-cases-cyclosporiasis-what-know/), [WITN](https://www.witn.com/2026/07/28/state-reports-28-jump-cyclosporiasis-cases-50-rise-hospitalizations-since-last-week/) | **Material, applied to map, Situation Snapshot, Prediction 5** |
| Michigan (map only; narrative pages already current) | Map stale at 8,176 (Jul 24) | 9,680 (Jul 28, MDHHS via press), narrative pages already had 9,253 (Jul 27) | [US News/AP](https://www.usnews.com/news/us/articles/2026-07-28/michigan-reports-9-680-cyclosporiasis-cases-in-ongoing-outbreak) | Not material alone; applied as routine map-sync upkeep |
| CDC national count | 4,173/41, frozen since Jul 22 | Unchanged; sixth consecutive quiet cycle | Multiple search-indexed sources | Not material |
| Ohio | 2,574 (Jul 24), statewide | No fresher statewide figure; a Jul 28 "northwest Ohio" regional count (2,785, Lucas County 1,173, Toledo Blade) is a sub-state figure, not adopted per standing rule against blending regional/statewide counts | [Toledo Blade](https://www.toledoblade.com/news/medical/2026/07/28/96-new-cyclosporiasis-reported-northwest-ohio/stories/20260728109) (headline/snippet only; could not fetch full article) | Not material; not adopted, watch item stays open |
| Indiana | 710 (Jul 24) | No fresher figure found | n/a | Not material |
| West Virginia | 226/19 (Jul 24) | No fresher figure found | n/a | Not material |
| FDA refs #1375/#1384/#1385/#1392 | No product ID | Unchanged | n/a | Not material |
| Epi-Aid | Deployed to Ohio, ~3 weeks | No interim finding, extension, or other-state request found | n/a | Not material |
| Mexico/FDA/CDC | Dispute + negative Cofepris test | No new on-the-record exchange found | n/a | Not material |
| Litigation | 8 matters tracked | No new suit, ruling, or consolidation found | n/a | Not material |
| Retailers/central-Mexico produce | n/a | CNN headline (Jul 28) suggests broader retailer avoidance of central-Mexico produce, per a "former FDA chief"; could not fetch article, so claim, official's name, and scope unverified | [CNN](https://www.cnn.com/2026/07/28/health/cyclospora-central-mexico-produce) (headline/snippet only) | **Not published; logged as unconfirmed lead for next cycle** |

## Predictions re-scored

- **Prediction 3 (confirmed count converges upward): held at 85%.** Sixth consecutive quiet cycle for the national count; both Michigan (9,680) and North Carolina (718) continued climbing at the state level, further widening the gap this prediction tracks, without changing the score.
- **Prediction 5 (attribution will not close the case): held at 87%.** North Carolina, already counted as a second-vehicle candidate since v4, grew 28% in a week with its no-link status unchanged. This is continued growth of an already-counted vehicle, not new evidence of a different kind, so we held rather than raised, consistent with this briefing's practice of not re-rewarding the same evidence category twice.
- **Prediction 6 (litigation outruns attribution): held at 95%.** No new litigation developments identified this cycle.
- Predictions 1, 2, 4 not re-scored; nothing this cycle bears on them differently than v15 already accounted for.

## Per-host retrieval log (internal only, not on any public page)

| Host/URL | Result |
|---|---|
| `curl` via environment proxy, all hosts tried (ncdhhs.gov, odh.ohio.gov, cdc.gov, fda.gov, taylorfarms.com, michigan.gov, courthousenews.com, witn.com) | Proxy CONNECT tunnel rejected with 403 on every host (`connect_rejected: gateway answered 403 to CONNECT`, per `/__agentproxy/status`). Environment-level egress policy, not a per-host bot block. |
| `WebFetch`, all sites tried (spectrumlocalnews.com, wbtv.com, witn.com, cnn.com, toledoblade.com, cidrap.umn.edu, marlerblog.com, ncdhhs.gov) | HTTP 403 on every attempt |
| `WebSearch` | Worked normally throughout; sole basis for every finding this cycle |

Because no page was independently fetched, the NC and Michigan figures are graded secondary (convergent across 2+ independent outlets each, all citing the same state-agency-attributed numbers) rather than primary-verified, and the full-briefing.html sourcing note says so explicitly.

## Verification performed

- Tag balance (div, table, section, p, tr, td, th, ol, li, ul, span, strong, em, a, thead, tbody, h1-h3) checked programmatically on all eight edited pages: balanced.
- No long dashes introduced (repo-wide ban): scanned the full diff, clean.
- No internal retrieval/infrastructure notes (proxy, CONNECT, HTTP status codes, "network blocked," gateway/policy-denial language) on any public page: scanned the full diff, clean (one false-positive match on the English word "proxy" in "burden proxy," not the networking term).
- `state-map-embed.html`'s two `<script>` blocks both pass `node --check`.
- New source URLs (WBTV, WITN, US News/AP) checked for stray punctuation in the link target: clean. HTTP 200 status could not be independently verified this cycle (see retrieval note); these are the same URLs WebSearch itself returned as live article results.
- Fixed a pre-existing stale figure while touching these files: `full-briefing.html`'s "Case Counts by Geography" Michigan row and Predictive Assessment #2 text were still at 8,176 (Jul 24) despite the narrative already having moved to 9,253 in v15; both now read 9,680.
- Fixed the orphaned lowercase "still" typo in `index.html`'s litigation/state-figures panel (the same line open PR #62 targets) as part of rewriting that paragraph's figures.

## Next update should check

1. **North Carolina's next weekly (Tuesday) update**, and whether its per-source suspected-food picture (parsley/cilantro, but "many cases" report neither) firms up.
2. **Ohio's next statewide figure** from ODH, and whether the Jul 28 "northwest Ohio" regional count (2,785, Lucas County 1,173) is a distinct sub-cluster or should eventually inform (not replace) the statewide figure; do not blend without a clear statewide ODH source.
3. Whether **CDC's national confirmed count** finally moves from 4,173/41 states, now six consecutive quiet cycles.
4. Whether **FDA's refs #1375, #1384, #1385, or #1392** get a product identified, or their case counts move.
5. Whether the **Epi-Aid deployment** produces a public output, an extension, or a similar request from another state.
6. Whether **Mexico, FDA, or CDC** issue any further on-the-record statement engaging directly with the other's position.
7. Whether **any of the eight tracked suits** reaches a ruling, consolidation, or settlement, and whether further distinct suits surface; continue the self-audit of this briefing's own sources list for untracked litigation.
8. **Cluster-specific sub-counts for IL, KS, OK, and PA**, still not published.
9. Whether **Indiana's "nearly 750" (Jul 25)** figure firms up, and whether West Virginia's tracker has moved past 226/19.
10. **The CNN "retailers shun central Mexico produce" lead (Jul 28)**: attempt a direct fetch next cycle; if confirmed, determine whether it names a new product/vehicle or is a market response to the existing lettuce cluster before publishing anything from it.
11. **Retry direct primary-source fetching** (both `curl` and `WebFetch`) against a small canary set (e.g. cdc.gov, fda.gov) at the start of next cycle to check whether this cycle's categorical proxy/WebFetch failure was transient or persistent; if persistent, this briefing should stop citing "WebFetch failed" as if it were host-specific and instead note the session-level limitation once, briefly, in each cycle's issue.
