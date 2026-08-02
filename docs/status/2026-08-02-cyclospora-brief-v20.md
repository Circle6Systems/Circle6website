# Cyclosporiasis 2026 Briefing, v20 status

**Version:** v20, published 2026-08-02, data as of 2026-08-02
**Supersedes:** v19 (live on `main` since 2026-07-30)
**Type:** Manual `c6s-daily-brief` local verification pass. MATERIAL: three state totals moved (primary-verified), the multidistrict litigation cleared its first procedural gate, and the Oversight inquiry gained a primary document plus on-the-record responses.
**Issue:** #74. Closes scout backlog issues #72 (MATERIAL) and #73 (NOT MATERIAL, corrections still unapplied).
**Cycle run by:** local workstation, not the cloud routine.

## Step 0: prior-work check

`main` was at v19. No open PR. Two scout issues were open and untriaged:

- **#72 (Jul 31, MATERIAL):** Michigan ~10,773, WV 268/19, White House on-record response, hero badge bug (72 vs 93). All press-sourced (scout was network-blocked).
- **#73 (Aug 1, NOT MATERIAL):** same corrections unapplied a second day; Taylor Farms non-denial + PAC figures; established that the Ohio 2,926 figure is *northwest-Ohio regional*, not statewide.

Both scout cycles rested entirely on WebSearch snippets because the cloud sandbox has no outbound egress. This local pass fetched every primary directly.

## Materiality verdict: MATERIAL

### Primary-source verification results

Every figure fetched directly with Playwright and a real browser UA. All comparable hosts returned HTTP 200 on the first attempt.

| Source | Result | vs. v19 |
|---|---|---|
| CDC surveillance (page dated Jul 28, data through Jul 27) | 6,707 confirmed / 423 hosp / 0 deaths / 45 states; >11,500 under analysis | Unchanged (weekly cadence) |
| FDA CORE table | ref #1392 = **93** ("increased from 72 to 93"); two ongoing unidentified-product *Cyclospora* outbreaks (#1392=93, #1385=10); #1375/#1384/#1381 Ended | Confirms badge fix; #1381 newly Ended |
| FDA 9-state advisory | 1,947 / 98 hosp; 9 states IL,IN,KS,KY,MI,OH,OK,PA,WV | Unchanged (Jul 24) |
| MDHHS (Michigan) | **10,773** / 193 hosp (updated Jul 31) | Corrects live figure (was 10,386) |
| IDOH (Indiana) | **1,285** (updated Jul 31; 723 F / 562 M) | Corrects live figure (was 1,176); *fresher than either scout's 1,176* |
| WV OEPS | **268 / 19** (updated Jul 31) | Corrects live figure (was 245/19) |
| NCDHHS | 718 / 24 (updated Jul 28, data Jul 27) | Unchanged; next update Tue Aug 4 |
| ODH (Ohio) | **Correction (post-review, on a source Jeff surfaced): ODH publishes a live statewide dashboard we and every prior cycle missed.** ODH's DataOhio dashboard ("Summary of Infectious Diseases in Ohio," Tableau, filtered to Cyclosporiasis) reads **4,024** statewide for the rolling year ending Jul 28. ODH is silent only on *news releases* (none since Jul 8; that release had 177 as of Jul 2), not on data. Toledo-Lucas County Health `/cyclo/` reports Lucas County 1,207 / northwest Ohio 3,016 as of Jul 31 | **Ohio 2,574 -> 4,024** (High, ODH's own dashboard). 2,785/2,926 NW-Ohio press figures retired by Lucas County's own 3,016 |

### Litigation, docket-verified (RECAP sweep)

The sweep the scout could not run. JPML docket 73691833 (MDL No. 3196) moved materially since v19:

- **Jul 29, entry 3:** "MDL Number 3196 Assigned -- MOTION FOR TRANSFER ACCEPTED FOR FILING."
- **Jul 29, entry 4:** Order to Show Cause, responses due Jul 30 (Clerk of the Panel Jessica D. Birnbaum).
- **Jul 23, entry 2:** Notice of Major Deficiency (cured).
- **Entry 1 "MODIFIED CASE NUMBER":** resolves v19's open *Granados* question, settling on **5:26-cv-07346** (the number v19 led with). Transfer petitioners named as Granados and **Gelbspan**.

The Panel has **not** yet ruled on transfer; the actions are not yet consolidated. RECAP name sweep filed after Jul 25 returns only *O'Hara v. Border Foods* (Jul 28), already tracked. No new suit. Litigation count holds at nine matters plus the MDL.

### Supply chain / Oversight thread

- **House Oversight (Democrats) press release, Jul 27** (primary-verified): Ranking Member Robert Garcia's letter to Taylor Farms CEO Bruce Taylor alleges the company "donated millions to President Trump, met privately with the White House the night the FDA identified their lettuce as the source," and demands documents. The specific $2M / ~$1M-to-super-PAC breakdown is CBS's characterization, not the committee's words: held at Medium.
- **White House** (CBS, single outlet): "any notion that the White House or Trump administration would ever compromise on the health and safety of the American people ... absolutely false"; FDA "conducting a thorough and evidence-based outbreak investigation." Medium.
- **Taylor Farms** (CBS): soft non-denial, "the safety of our food is paramount." Medium.

## Edits made

- **index.html:** hero stamp -> v20/Aug 2; badge "72 (NEW)" -> "93"; new "What changed in v20" panel; Situation Snapshot rows (Michigan 10,773, Indiana 1,285, litigation MDL assignment + OSC + Granados resolved); v20 paragraphs on Predictions 3, 4, 6; footer stamp + supersedes chain.
- **state-map-embed.html:** MI/IN/WV live data objects updated to 10,773 / 1,285 / 268.
- **full-briefing.html:** new v20 update panel; live prose + state-table rows (MI/WV/IN); litigation line; two v20 timeline entries (Jul 29, Jul 31); footer stamp.
- **supply-chain-analysis.html:** v20 Oversight addition (Garcia letter, White House + Taylor Farms responses); committee press release added to sources; stamp.
- **executive-overview.html, protective-guidance.html, state-map.html:** version stamps to v20 (no live counts carried on these).

## Predictions re-scored

- **P3 (confirmed count converges upward): held at 90%.** State totals (MI 10,773, IN 1,285, WV 268) ran further ahead of an unchanged national 6,707/45. Corroboration without a national move holds, does not raise.
- **P4 (surveillance-capacity narrative): held at 89%.** Nothing this cycle bears on agency capacity; the only process signal is our own (dashboards and the docket answered cleanly). CDC's static page is consistent with weekly cadence, not a stall.
- **P6 (litigation outruns attribution): held at 95%.** The MDL assignment + OSC is squarely this prediction's thesis, and unlike v19 the tracking caught it within days. Not raised: the Panel has not ruled on transfer, and one clean cycle does not offset three blind ones.
- P1, P2, P5 not re-scored (no bearing this cycle).

## Retrieval log (internal)

All primary hosts returned HTTP 200 on the first attempt: CDC, FDA table, FDA 9-state advisory, MDHHS, IDOH, NCDHHS, WV OEPS, CourtListener RECAP (search API + JPML docket render), House Oversight press release. The ODH site loads normally (my first guessed URL `odh.ohio.gov/know-our-programs/foodborne-diseases/cyclosporiasis` 404'd, but that was a wrong path, not a down site). ODH has issued no cyclosporiasis *news release* since Jul 8 (confirmed against its live News Releases index; the next release, Jul 30, is measles; the Jul 8 release had 177 as of Jul 2).

**But "ODH silent" was wrong for data, and this is a real correction.** After the primary pass, Jeff surfaced ODH's **DataOhio dashboard** (`data.ohio.gov/.../summary-of-infectious-diseases-in-ohio`), a Tableau viz embedding `analytics.das.ohio.gov/.../GeneralCaseCountPublicPROD`. Filtered to Cyclosporiasis (the default was Cryptosporidiosis, a different disease), it reports **4,024** statewide for the rolling year ending Jul 28 (county leaders Cuyahoga 459, Fulton 153, Franklin 113, Erie 92, Defiance 82). The URL date param does not override the rolling-year window and the public view has no interaction to narrow it to May 1, so we publish 4,024 with that window stated; given the May-Aug season it is essentially the 2026 total. Jeff also surfaced Toledo-Lucas County Health's own `/cyclo/` page: Lucas County 1,207, northwest Ohio 3,016, last updated Jul 31. This retires both the 2,574 (Jul 24, press) statewide figure carried since v14 and the 2,785/2,926 NW-Ohio press regionals. **Lesson: "no news release" is not "no data." A state can be press-silent while maintaining a live surveillance dashboard, so check the state's open-data portal, not just its newsroom.** CourtListener's `docket-entries` and `dockets/{id}` REST endpoints require auth for full fields; the docket entries were read by rendering the public docket page with Playwright.

**Fourth consecutive cycle** whose cloud-routine blocking claim does not survive a local re-run. The rule stands: treat any routine cycle's retrieval-failure claim as unverified until re-run locally, and fetch before you attribute. Indiana proved it again: both scout cycles carried 1,176 from press; the dashboard read 1,285.

## Next update should check

1. **Whether the JPML rules on transfer** for MDL No. 3196, which court draws it, and any OSC responses / added constituent actions. Highest-value single item.
2. **NCDHHS Tuesday update (Aug 4)** and whether any agency confirms or refutes Gottlieb's NC parsley/cilantro claim.
3. Whether **CDC's national count** moves from 6,707/45 (next weekly update).
4. Whether refs **#1385/#1392** get a product identified, #1392 keeps climbing from 93, or #1375/#1384/#1381 fully close.
5. **Ohio via the DataOhio dashboard** (not the newsroom): whether the 4,024 statewide figure climbs, and whether the rolling-year window can be narrowed to the outbreak start. Also track Toledo-Lucas County Health `/cyclo/` (NW Ohio 3,016 / Lucas 1,207, updated weekdays).
6. Whether **Taylor Farms or the White House** go further on the record, or a committee document (the letter text itself, or a Taylor Farms response) surfaces.
7. Whether **Michigan hospitalizations** move past 193 on the next Thursday weekly refresh.
8. Whether a docket number surfaces for **Ott** (state court, Mahoning County, outside RECAP).
9. Cluster-specific sub-counts for IL, KS, OK, PA, still unpublished.
10. Run the RECAP sweep every cycle, including a separate `court=jpml` query.
