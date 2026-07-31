# Cyclosporiasis 2026 Briefing, v17 status

**Version:** v17, published 2026-07-30, data as of 2026-07-29
**Supersedes:** v16 (2026-07-29, sitting in unmerged draft PR #64 at cycle start)
**Type:** Daily routine check, MATERIAL (national CDC topline broke its plateau a second time; three state figures moved; a new press lead logged).
**Issue:** filed this cycle (linked from the PR body)
**Cycle run by:** the scheduled daily-check routine

## Step 0: prior-work check

`main` is still at v15 (PR #61). PR #64 ("Cyclosporiasis briefing v16...", branch `feature/cyclospora-brief-v16-draft`) has been open, in draft, since 2026-07-29T01:02:50Z, about one day at this cycle's start, not yet past the routine's 3-day blocking threshold. No other draft-content PR was open. Per Step 0 rule 2, this cycle's changes are pushed onto PR #64's existing branch rather than opening a second PR; the content is versioned v17 within that same PR. Issue #63 is yesterday's (2026-07-29) daily-check issue and is dated for that day, not today, so a new issue is filed for 2026-07-30 per Step 0 rule 1. Separately, PR #62 (single-line "still" typo fix) remains open and unmerged (about 2 days old); it is unrelated to this cycle's content changes and not acted on.

## What this cycle checked

Per v16 status's "Next update should check" queue: North Carolina's next weekly (Tuesday) update; Ohio's next statewide figure and whether the Jul 28 "northwest Ohio" regional count should inform the statewide figure; whether CDC's national confirmed count moves from 4,173/41 states; whether FDA's refs #1375/#1384/#1385/#1392 get a product ID; an Epi-Aid interim finding, extension, or other-state request; further Mexico/FDA/CDC exchange; whether any of the eight tracked suits reach a ruling/consolidation/settlement; cluster-specific sub-counts for IL/KS/OK/PA; Indiana's "nearly 750" firming up and West Virginia moving past 226/19; the CNN "retailers shun central Mexico produce" lead; and a retry of direct primary-source fetching against a canary host set to test whether v16's categorical retrieval failure was transient.

## Retrieval environment this cycle

Retested per v16's own recommendation (item 11 in its queue). Both `curl` (via this environment's outbound proxy) and the `WebFetch` tool were retried against a canary set (cdc.gov, fda.gov, taylorfarms.com) before any research began. `curl -v` showed the proxy's CONNECT tunnel itself rejected with HTTP 403 for every host tried (confirmed against the proxy's own `/__agentproxy/status` diagnostic, which reported no other relay failures, i.e. this is host-targeted, not a general outage). `WebFetch` independently returned HTTP 403 on cdc.gov, fda.gov, and one press site (abc7chicago.com) tried later in the cycle. **This confirms v16's finding was not transient**: the same categorical failure reproduced this cycle, one calendar day later, in a fresh session. This session's recommendation for the next cycle is to stop re-testing this on every run (it has now failed identically across two independent sessions) and treat direct .gov/press fetches as unavailable in this environment by default, falling back to WebSearch-sourced convergent reporting as the standing method, exactly as v9 through v16 have done. `WebSearch` worked normally throughout and is the basis for every finding below.

## Materiality verdict: MATERIAL

**Leading with what cuts against the open draft PR, per house rule:** the single most material finding this cycle directly contradicts a claim sitting in PR #64's draft text. That draft (v16) states, in the hero, Bottom Line, Situation Snapshot, footer, and Prediction 3/4 text, that CDC's national confirmed count is frozen at 4,173 across 41 states, "a sixth consecutive quiet cycle." That claim did not hold: CDC's own surveillance update (dated Jul 29, per ABC News and AHA News coverage of CDC's release) shows the confirmed count broke its plateau, jumping to **6,707** confirmed cases across **45 states** (Oregon, South Dakota, Vermont, and Delaware newly added), with hospitalizations rising from 308 to **423** and the under-analysis pool growing from >7,400 to **>11,500** (combined total now above **18,200**). This is the second such catch-up jump since the outbreak began (the first broke a nine-day freeze on Jul 22); this one followed a shorter, roughly week-long plateau. Still 0 deaths. Every occurrence of "4,173," "41 states," "308," ">7,400," and the "sixth consecutive quiet cycle" framing that described current status (as opposed to dated historical version-log entries, which are left untouched as a factual record of what was true at the time) has been corrected across all six pages, the report card, and the state-map-embed data object.

**State figures also moved, independent of the national topline.** Michigan rose to **10,077** (Jul 29, MDHHS's own Wednesday update, +397 from 9,680), now spread across 70 of the state's 82 counties. West Virginia rose to **245** cases / 19 hospitalized (Jul 28, up from 226/19). Indiana is reported at **nearly 750** (Jul 25 to 27 press attributing the figure to IDOH, including 100+ in Allen County); this could not be primary-verified against IDOH's own dashboard this cycle (see retrieval note above), so it carries a downgraded Medium rather than the prior High confidence badge in the map data (`basis: "secondary"` rather than `"state"`). Ohio has no fresher statewide figure (still 2,574, Jul 24; the Jul 28 "northwest Ohio" regional count of 2,785 remains unblended per standing rule). North Carolina's own count is unchanged (718/24, Jul 28), but NCDHHS launched a new Cyclosporiasis Cases and Outbreaks Dashboard this cycle (updated Tuesdays), a sourcing upgrade noted for future cycles.

**A named former official on the record, logged as a lead, not a finding.** Reuters reported (Jul 28, picked up by multiple wire subscribers including TradingView, Country Guide, Canadian Cattlemen, and Western Producer) that some large retailers and restaurants have stopped sourcing produce from central Mexico broadly, attributed to former FDA Commissioner Dr. Scott Gottlieb, who cited weather conditions raising contamination risk in the region; the same report says officials are searching for other potentially implicated products. This is a named, on-the-record source, but Gottlieb is a former official, not a current FDA or CDC statement, and no specific new product is named, so it is logged as a watch item (bearing on Prediction 5) rather than published as a new vehicle or a change to the attribution finding.

**Not adopted, and logged as a watch item rather than a change.** Press coverage this cycle describing "six open Cyclospora investigations" at FDA (MedicalDaily) conflicts with other coverage published the same week describing four (Forbes, Jul 28). Cross-checking one candidate "new outbreak" story (QZ.com, dated Jul 23) against this briefing's own tracking shows it in fact describes the already-tracked ref #1392 (72 cases), not a new reference. We could not reconcile the six-vs-four discrepancy against FDA's own investigations table directly this cycle (retrieval blocked, see above), so the "four concurrent, all not yet identified" figure carried since v14 is unchanged in all six pages. This is flagged for direct verification next cycle rather than published as a change either way.

## What changed vs. what the draft (v16) currently publishes

| Item | Draft (v16) | This cycle's finding | Source | Verdict |
|---|---|---|---|---|
| CDC national confirmed count | 4,173 / 41 states, "sixth consecutive quiet cycle" | **6,707 / 45 states** (Jul 29); hospitalizations 308 to 423; under-analysis >7,400 to >11,500; combined total >18,200 | [ABC News](https://abcnews.com/Health/18000-cyclosporiasis-cases-reported-45-states-cdc/story?id=135194065), [AHA News](https://www.aha.org/news/headline/2026-07-29-cdc-reports-more-18000-confirmed-or-suspected-cyclosporiasis-cases), [Newsweek](https://www.newsweek.com/cyclospora-map-update-parasite-cases-cdc-explosive-diarrhea-12259832) | **MATERIAL, directly contradicts the draft; corrected throughout** |
| Michigan | 9,680 (Jul 28) | **10,077** (Jul 29, MDHHS's own update, +397); 70 of 82 counties | [ClickOnDetroit](https://www.clickondetroit.com/news/local/2026/07/29/cyclosporiasis-cases-in-michigan-reach-10000/), [Detroit News](https://www.detroitnews.com/story/news/local/michigan/2026/07/29/number-of-cyclosporiasis-cases-in-michigan-rises-over-10000/91090060007/) | **Material, applied to map, Situation Snapshot, full briefing** |
| West Virginia | 226/19 (Jul 24) | **245/19** (Jul 28) | [WV Public Broadcasting](https://wvpublic.org/story/health-science/w-va-cyclosporiasis-numbers-rise-again/) | **Material, applied to map** |
| Indiana | 710 (Jul 24), High confidence | **~750** (Jul 25 to 27, press-attributed to IDOH), downgraded to Medium/secondary confidence, not primary-verified this cycle | [21ALIVE](https://www.21alivenews.com/2026/07/25/cyclosporiasis-outbreak-continues-impact-indiana-with-over-100-cases-reported-allen-co-nearly-750-infected-statewide/) | **Material, applied with a confidence downgrade** |
| North Carolina | 718/24 (Jul 28) | Unchanged; NCDHHS launched a new Cyclosporiasis Cases and Outbreaks Dashboard | [NCDHHS](https://www.ncdhhs.gov/news/press-releases/2026/07/28/additional-cyclosporiasis-cases-identified-north-carolina-ncdhhs-launches-new-case-dashboard) | Not material on count; sourcing upgrade noted |
| Ohio | 2,574 (Jul 24) | No fresher statewide figure; Jul 28 regional (2,785, Lucas Co. 1,173) not blended | n/a | Not material |
| Retailers/central-Mexico produce | Unconfirmed lead (v16 did not publish) | Corroborated across multiple wire pickups; named source is former FDA Commissioner Scott Gottlieb | [CNN](https://www.cnn.com/2026/07/28/health/cyclospora-central-mexico-produce) | **Logged as a lead in v17, not a finding**; Prediction 5 not moved |
| FDA cyclospora investigation count | "Four concurrent, all not yet identified" since v14 | Conflicting press counts (4 vs. 6) found; could not reconcile against FDA's table directly | [Forbes](https://www.forbes.com/sites/brucelee/2026/07/28/fda-lists-12-ongoing-foodborne-outbreaks-4-cyclospora-3-salmonella/), MedicalDaily | Not adopted; watch item |
| Litigation | 8 matters tracked | No new suit, ruling, or consolidation found | n/a | Not material |
| Epi-Aid | Deployed to Ohio | No interim finding or extension found | n/a | Not material |
| Mexico/FDA/CDC | Dispute + negative Cofepris test | No new on-the-record exchange found | n/a | Not material |

## Predictions re-scored

- **Prediction 3 (confirmed count converges upward): raised 85% to 90%.** A second catch-up jump (4,173 to 6,707/45 states), on a shorter plateau than the first, is direct confirming evidence of the batch-adjudication model this prediction has tracked since v10; the confirmed-to-total ratio held roughly steady (about 2.8x to about 2.7x) rather than widening.
- **Prediction 4 (surveillance-capacity becomes the durable story): held at 89%, mixed.** A second coherent catch-up (shorter plateau than the first) is a capability-positive signal, similar to v10's reasoning the first time this happened; a second occurrence of the plateau-then-batch pattern, plus Indiana's figure only reaching press rather than a verified dashboard this cycle, is a capacity-strain signal in the other direction. Net small and mixed, holding.
- **Prediction 5 (attribution will not close the case): held at 87%.** North Carolina's own figures are unchanged. The Gottlieb/Reuters lead is directionally consistent with this prediction's core claim but is a named former official, not a current agency statement with a named product, so it is logged as a watch item rather than moved into the score.
- **Prediction 6 (litigation outruns attribution): held at 95%.** No new litigation this cycle.
- Predictions 1, 2 not re-scored; nothing this cycle bears on the commodity-class or named-cluster attribution differently than v16 already accounted for.

## Per-host retrieval log (internal only, not on any public page)

| Host/method | Result |
|---|---|
| `curl -v` via this session's outbound proxy: cdc.gov, fda.gov, taylorfarms.com (canary retest per v16's own recommendation) | Proxy CONNECT tunnel rejected with HTTP 403 on every host, reproducing v16's finding exactly one calendar day later in a fresh session; confirmed host-targeted (proxy's own `/__agentproxy/status` reports no other relay failures), not a general outage |
| `WebFetch`, cdc.gov, fda.gov, abc7chicago.com, in.gov (IDOH), oeps.wv.gov (WV) | HTTP 403 on every attempt |
| `WebSearch` | Worked normally throughout; sole basis for every finding this cycle |

This confirms v16's retrieval finding is not transient across at least two independent sessions. Recommend the next cycle stop re-running a canary test as a standing task and instead treat WebSearch-only sourcing as the default method for this environment, same as v9 through v16 already practiced, revisiting only if the environment itself changes.

## Verification performed

- Tag balance (div, table, section, p, tr, td, th, ol, li, ul, span, strong, em, a, thead, tbody, h1-h3) checked programmatically on all seven edited pages (six briefing pages plus the report card): balanced.
- No long dashes introduced (repo-wide ban): checked the full diff programmatically, clean. Two pre-existing `&mdash;` uses were found elsewhere in `osint-reports/index.html`, in unrelated report cards (not the cyclospora card, not touched this cycle) predating this session; left alone as out of scope.
- No internal retrieval/infrastructure notes (proxy, CONNECT, HTTP status codes, "network blocked," gateway/policy-denial language) on any public page: scanned the full diff, clean. **Found and fixed one pre-existing violation** discovered while editing: `state-map-embed.html`'s Ohio entry had carried "returned HTTP 404 site-wide on Jul 26" since v14, an internal retrieval detail that should never have been published; reworded to "could not be linked directly this cycle" with no functional change to the sourcing claim.
- `state-map-embed.html`'s two `<script>` blocks both pass `node --check` after the D-object edits.
- New source URLs (ABC News, AHA News, Newsweek, ClickOnDetroit, Detroit News, WV Public Broadcasting, 21ALIVE, NCDHHS, CNN) checked for stray punctuation in the link target: clean. All nine were returned directly by WebSearch as live result URLs; HTTP 200 could not be independently verified this cycle (see retrieval note).
- Fixed additional pre-existing stale figures discovered while touching `full-briefing.html`: the "States Reporting Cases" table had never been updated for Ohio's v14 jump (was still showing 1,316/Jul 17 and a 2,268 regional figure, several cycles behind the Situation Snapshot and narrative text elsewhere on the same page) and listed West Virginia and Indiana as "not individually specified" despite both having tracked figures elsewhere in this briefing; all three rows brought into agreement with the rest of the document.

## Next update should check

1. North Carolina's next Tuesday dashboard update (the new NCDHHS dashboard), and whether its per-source suspected-food picture firms up.
2. Ohio's next statewide figure from ODH, and whether the "northwest Ohio" regional count should eventually inform (not replace) a fresh statewide total.
3. Whether CDC's national confirmed count moves again from 6,707/45 states, and whether the plateau-then-batch-jump pattern (now twice observed) repeats a third time.
4. Whether FDA's refs #1375, #1384, #1385, or #1392 get a product identified, and reconcile the conflicting "four" vs. "six" open Cyclospora investigation counts directly against FDA's own table if retrieval becomes available.
5. Whether the Epi-Aid deployment produces a public output or an extension.
6. Whether Mexico, FDA, or CDC issue any further on-the-record statement.
7. Whether any of the eight tracked suits reaches a ruling, consolidation, or settlement.
8. Indiana's "nearly 750" figure: attempt to primary-verify against IDOH's own dashboard to restore High confidence.
9. The Gottlieb/Reuters "retailers shun central Mexico produce" lead: watch for a named current agency official or a specific new product before treating it as more than a lead.
10. Cluster-specific sub-counts for IL, KS, OK, and PA, still unpublished.
11. Do not re-run the canary retrieval test as a standing task; this session and v16 both found the same categorical proxy/WebFetch failure against cdc.gov and fda.gov one calendar day apart, so treat it as a standing environment characteristic rather than re-verifying every cycle.

## PR

Draft PR #64 (branch `feature/cyclospora-brief-v16-draft`), content updated to v17 and pushed onto the existing branch per Step 0 rule 2 (not a new PR). Issue: filed this cycle, linked from the PR body.
