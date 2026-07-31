# Cyclosporiasis 2026 Briefing, v18 status

**Version:** v18, published 2026-07-31, data as of 2026-07-30
**Supersedes:** v17 (2026-07-30, sitting in unmerged draft PR #64 at cycle start)
**Type:** Daily routine check, MATERIAL (Michigan and Indiana both moved on primary-attributed figures; Gottlieb's lead grew more specific and now names North Carolina; a ninth litigation matter surfaced; a Taylor Farms/White House oversight thread emerged).
**Issue:** filed this cycle (linked from the PR body)
**Cycle run by:** the scheduled daily-check routine

## Step 0: prior-work check

`main` is still at v15 (PR #61). PR #64 ("Cyclosporiasis briefing v17...", branch `feature/cyclospora-brief-v16-draft`) has been open, in draft, since 2026-07-29T01:02:50Z, about two days at this cycle's start, still short of the routine's 3-day blocking threshold but close to it. No other draft-content PR was open. Per Step 0 rule 2, this cycle's changes are pushed onto PR #64's existing branch rather than opening a second PR; the content is versioned v18 within that same PR. No issue existed yet for 2026-07-31 at cycle start, so a new issue is filed per Step 0 rule 1. PR #62 (single-line "still" typo fix) remains open and unmerged separately; it is unrelated to this cycle's content changes and not acted on.

## What this cycle checked

Per v17 status's "Next update should check" queue: North Carolina's next Tuesday dashboard update; Ohio's next statewide figure from ODH; whether CDC's national confirmed count moves again from 6,707/45 states; whether FDA's refs #1375/#1384/#1385/#1392 get a product ID and the "four vs. six" investigation-count discrepancy; the Epi-Aid deployment's output; further Mexico/FDA/CDC exchange; whether any of the eight (now nine) tracked suits reach a ruling/consolidation/settlement; Indiana's "nearly 750" figure primary-verification; the Gottlieb/Reuters lead's specificity; cluster-specific sub-counts for IL/KS/OK/PA; and the standing recommendation not to re-run the canary retrieval test.

## Retrieval environment this cycle

Following v17's own recommendation, this cycle did not re-run a standing canary test against cdc.gov/fda.gov. In the course of real research, `curl` attempts (via this environment's outbound proxy) against four state health-department hosts (oeps.wv.gov, in.gov, odh.ohio.gov, dph.ncdhhs.gov) failed at the connection level (curl exit code 56 / HTTP 000), a different failure mode than the HTTP-403-at-the-CONNECT-tunnel pattern recorded in v16/v17. `WebFetch` returned HTTP 403 on every press URL attempted this cycle (cbsnews.com, indianapublicradio.org, wdtn.com, clickondetroit.com), broader than the cdc.gov/fda.gov/abc7chicago.com-specific failures v17 recorded. `WebSearch` again worked normally throughout and is the sole basis for every finding below. This broadens, rather than contradicts, the standing recommendation: direct fetches (of any kind, to any host) are unavailable in this environment by default this cycle, and WebSearch-sourced convergent reporting remains the correct standing method.

## Materiality verdict: MATERIAL

**Michigan and Indiana both moved on primary-attributed figures.** Michigan rose to **10,386** cases (Jul 30, MDHHS's own update, +309 from 10,077), with hospitalizations finally refreshed to **193** (from a stale 160/Jul 23 carried since v17). MDHHS attributes about 475 of the recent increase to a reporting backlog at one health system, not new illness, and says ED visits for diarrhea are slowing; logged as the state's own claim, not yet independently verified. Indiana's "nearly 750" figure, carried at Medium confidence since v17 because IDOH's own dashboard could not be reached directly, is superseded: IDOH is now reporting approximately **954** cases (Jul 28), directly and consistently attributed to IDOH by three independent outlets (Indiana Public Radio, WANE, Fox59), restoring High confidence even without a direct fetch. This resolves the primary-verification item open since v17, and is itself a significant figure jump (roughly 750 to 954, +27%) independent of the confidence upgrade.

**Gottlieb's lead grows more specific, and now names North Carolina.** In a CNBC interview, former FDA Commissioner Scott Gottlieb named clusters in the Great Lakes region, New York, and **North Carolina** specifically as potentially linked to parsley and cilantro from central Mexico, and separately estimated the true case count could be 10 to 20 times the reported figure. This converges with NCDHHS's own previously reported suspected foods (parsley, cilantro) for its unlinked cluster, materially more specific than the general "central Mexico produce" framing carried since v17. North Carolina's status is not upgraded from unlinked to linked: Gottlieb remains a named former official, not a current agency statement naming a specific product or shipment, but the convergence is close enough to move this from a background watch item to a named lead in Prediction 5.

**A ninth litigation matter, press-sourced only.** A Muskegon, Michigan woman sued Taylor Farms, Taylor Fresh Foods, and, for the first time in this briefing's tracking, Taco Bell franchisee **Border Foods** (plus five unnamed corporations), filed Jul 28 in the US District Court for the Western District of Michigan. No docket number was obtained this cycle, so this addition does not meet the docket-verified standard the briefing has held litigation to since v15.

**A Taylor Farms/White House oversight thread, logged but not treated as an attribution change.** Multiple outlets (Insurance Journal, CBS News, Civil Eats) reported that Taylor Farms met privately with White House and FDA officials during the investigation, and that House Democrats opened an inquiry citing more than $2 million in the company's political donations, asking whether the company sought to influence FDA's inquiry. Added to the Supply Chain Analysis page as a corporate-conduct/regulatory-oversight development, not as evidence bearing on the underlying attribution, which FDA has not withdrawn. The Insurance Journal reporting on the meeting itself rests in part on an unnamed source; the House Democrats' inquiry is on the record via CBS News.

**Not material, resolved in the draft's favor.** Forbes' Jul 28 count of FDA's active outbreaks independently confirms four concurrent Cyclospora investigations, resolving the "four vs. six" discrepancy flagged as a watch item in v17 (MedicalDaily's six-count report remains unreconciled and is not adopted).

**Not material, no change found.** CDC's national confirmed count did not move again this cycle (still 6,707/45 states). Ohio (still 2,574, Jul 24) and West Virginia (still 245/19, Jul 28) have no fresher statewide figures. No Epi-Aid interim finding or extension. No further Mexico/FDA/CDC on-the-record exchange. Cluster-specific sub-counts for IL/KS/OK/PA remain unpublished. Deaths remain 0.

## What changed vs. what the draft (v17) currently publishes

| Item | Draft (v17) | This cycle's finding | Source | Verdict |
|---|---|---|---|---|
| Michigan | 10,077 (Jul 29); hosp 160 (stale, Jul 23) | **10,386** (Jul 30, +309); hosp refreshed to **193**; ~475 recent cases attributed to a reporting backlog, not new illness | [CBS Detroit](https://www.cbsnews.com/detroit/news/michigan-cyclosporiasis-cases-193-hospital-cases-july-30/), [Jefferson City News-Tribune/AP](https://www.newstribune.com/news/2026/jul/30/number-of-cyclosporiasis-cases-in-michigan/) | **Material, applied to map, Situation Snapshot, full briefing** |
| Indiana | Nearly 750 (Jul 25 to 27 press), Medium confidence, not primary-verified | **~954** (Jul 28), directly attributed to IDOH by 3 independent outlets, restored to **High confidence** | [Indiana Public Radio](https://indianapublicradio.org/news/2026/07/indiana-reports-nearly-1000-cyclosporiasis-cases/), [WANE](https://www.wane.com/news/indiana/nearly-1000-cases-of-explosive-diarrhea-illness-cyclosporiasis-reported-in-indiana/), [Fox59](https://fox59.com/indiana-news/nearly-1000-cases-of-explosive-diarrhea-illness-cyclosporiasis-reported-in-indiana/) | **Material, resolves the v17 verification gap** |
| Gottlieb/central-Mexico lead | General "large retailers pull back" framing, no state named | Names Great Lakes, New York, **and North Carolina** specifically as potentially parsley/cilantro-linked; "10 to 20x underreported" estimate | [CNBC coverage](https://www.cnbc.com/2026/07/24/cyclospora-cdc-says-outbreak-is-in-nine-states.html) (interview reporting; via The Packer/CNN/Western Producer pickups) | **Material escalation of an existing lead; Prediction 5 raised modestly** |
| Litigation | Eight matters, docket-verified | **Ninth matter**: Muskegon, MI suit names Border Foods (Taco Bell franchisee) for the first time; press-sourced, no docket | [ClickOnDetroit](https://www.clickondetroit.com/news/local/2026/07/30/michigan-woman-sues-taylor-farms-border-foods-over-cyclospora-outbreak-linked-to-lettuce/) | **Material addition; Prediction 6 held at 95% (near ceiling)** |
| Taylor Farms/White House | Not carried | Private meeting reported; House Democrats inquiry citing $2M+ in donations | [Insurance Journal](https://www.insurancejournal.com/news/national/2026/07/29/879441.htm), [CBS News](https://www.cbsnews.com/news/taylor-farms-cyclospora-outbreak-white-house-investigation/) | **Logged on Supply Chain Analysis page; not an attribution change** |
| FDA investigation count | "Four concurrent," conflicting "six" report unreconciled | Forbes independently confirms four | [Forbes](https://www.forbes.com/sites/brucelee/2026/07/28/fda-lists-12-ongoing-foodborne-outbreaks-4-cyclospora-3-salmonella/) | **Resolved in the draft's favor; no change to the figure** |
| CDC national count | 6,707/45 states | No fresher figure found | n/a | Not material |
| Ohio | 2,574 (Jul 24) | No fresher figure found | n/a | Not material |
| West Virginia | 245/19 (Jul 28) | No fresher figure found | n/a | Not material |
| Litigation rulings | None | No ruling, consolidation, or settlement found | n/a | Not material |
| Epi-Aid | Deployed to Ohio | No interim finding or extension found | n/a | Not material |

## Predictions re-scored

- **Prediction 3 (confirmed count converges upward): held at 90%.** No source shows CDC's national count moving again from 6,707/45 states this cycle; one quiet cycle after two catch-up jumps is not yet a signal either way.
- **Prediction 4 (surveillance-capacity becomes the durable story): raised 89% to 90%.** Indiana's verification gap, flagged as a capacity-strain signal in v17, is resolved this cycle (state figure directly and consistently attributed to IDOH by three outlets). Michigan's own backlog explanation is a capacity-relevant disclosure, though we treat the state's "worst has passed" characterization as an unverified claim. Net positive, reversing last cycle's mixed read.
- **Prediction 5 (attribution will not close the case): raised 87% to 88%.** Gottlieb's more specific claim, naming North Carolina directly and converging with NCDHHS's own suspected foods, is directionally confirming, though still a lead rather than a finding.
- **Prediction 6 (litigation outruns attribution): held at 95%.** A ninth matter (Border Foods named for the first time) continues the accumulation pattern this prediction tracks; no ruling or settlement, so no further room to raise given the near-ceiling confidence already assigned.
- Predictions 1, 2 not re-scored; nothing this cycle bears on the commodity-class or named-cluster attribution differently than v17 already accounted for.

## Per-host retrieval log (internal only, not on any public page)

| Host/method | Result |
|---|---|
| `curl` via this session's outbound proxy: oeps.wv.gov, in.gov, odh.ohio.gov, dph.ncdhhs.gov | Connection-level failure (curl exit 56, HTTP 000) on all four, not an HTTP-level 403; a different failure signature than v16/v17's CONNECT-tunnel-403 pattern |
| `WebFetch`: cbsnews.com, indianapublicradio.org, wdtn.com, clickondetroit.com | HTTP 403 on every attempt |
| `WebSearch` | Worked normally throughout; sole basis for every finding this cycle |

This cycle's failures are broader than v16/v17's cdc.gov/fda.gov-specific pattern (general press and state .gov hosts also failed this cycle). Per v17's own recommendation, no standing canary test was re-run; this is a byproduct of real research attempts, not a dedicated retest. Recommend the next cycle continue treating direct fetches as unavailable by default and rely on WebSearch-sourced convergence, revisiting only if a cycle's real research attempts succeed unprompted.

## Verification performed

- Tag balance (div, table, section, p, tr, td, th, ol, li, ul, span, strong, em, a, thead, tbody, h1-h3) checked programmatically on all seven edited pages (six briefing pages plus the report card): balanced.
- No long dashes introduced (repo-wide ban): checked the full diff, clean. The two pre-existing `&mdash;` uses in `osint-reports/index.html`'s unrelated report cards (not the cyclospora card) remain untouched and out of scope, as noted since v17.
- No internal retrieval/infrastructure notes (proxy, CONNECT, HTTP status codes, "network blocked," gateway/policy-denial language) on any public page: scanned the full diff. **Caught and fixed one violation introduced by this session's own first-draft edit**: a sentence added to `full-briefing.html`'s Sources methodology paragraph initially named `curl`, `WebFetch`, and HTTP 403 explicitly; reworded before finalizing to match this briefing's established public-facing convention ("could not establish outbound connections... directly") with no HTTP status codes or tool names, and no change to the underlying sourcing claim.
- `state-map-embed.html`'s two `<script>` blocks both pass `node --check` after the D-object edits (Michigan, Indiana).
- New source URLs (CBS Detroit, Jefferson City News-Tribune, Indiana Public Radio, WANE, Fox59, CNBC, ClickOnDetroit, Insurance Journal, CBS News, Forbes) checked for stray punctuation in the link target: clean. None were independently verified to return HTTP 200 this cycle (see retrieval log); all were returned directly by WebSearch as live result URLs.
- Updated stale "through v17" / "eight tracked matters" phrasing in current-status tables (Situation Snapshot, States Reporting Cases, Reconciling Three Universes) to "through v18" / "nine matters" where the surrounding text describes present status; left untouched everywhere the phrasing sits inside a dated, historical per-cycle panel (v16/v17 update paragraphs), consistent with the standing practice of not rewriting the factual record of what was true at the time.

## Next update should check

1. North Carolina's next Tuesday dashboard update, and whether its per-source suspected-food picture (parsley, cilantro) firms up, especially in light of Gottlieb's Jul 27/28 claim naming North Carolina specifically.
2. Ohio's next statewide figure from ODH.
3. Whether CDC's national confirmed count moves again from 6,707/45 states.
4. Whether FDA's refs #1375, #1384, #1385, or #1392 get a product identified.
5. Whether the Epi-Aid deployment produces a public output or an extension.
6. Whether Mexico, FDA, or CDC issue any further on-the-record statement.
7. Whether any of the nine tracked suits reaches a ruling, consolidation, or settlement, and whether a docket number surfaces for the Border Foods suit.
8. Whether Taylor Farms or the White House responds on the record to the House Democrats' inquiry, and whether any committee document (not just press characterization) becomes available.
9. Whether Gottlieb's North Carolina claim is picked up, confirmed, or refuted by a current FDA/CDC official or by NCDHHS itself.
10. Cluster-specific sub-counts for IL, KS, OK, and PA, still unpublished.
11. Continue treating direct .gov/press fetches as unavailable in this environment by default; do not re-run a standing canary test, but log any organic fetch failure encountered during real research (as this cycle did).

## PR

Draft PR #64 (branch `feature/cyclospora-brief-v16-draft`), content updated to v18 and pushed onto the existing branch per Step 0 rule 2 (not a new PR). Issue: filed this cycle, linked from the PR body.
