# Cyclosporiasis 2026 Briefing, v14 status

**Version:** v14, 2026-07-26, data as of 2026-07-26
**Supersedes:** v13 (unpublished draft, same PT day) and v12 (2026-07-25), both on PR #57
**Type:** Manual local refresh, run from the workstation under the "update the c6s-daily-brief" trigger
**Cycle run by:** manual pass, not the scheduled cloud routine

## Why this cycle ran manually, and what that changed

The scheduled routine has reported since v9 that direct fetches of cdc.gov and fda.gov fail, and has therefore
sourced every finding from search-indexed secondary reporting. This cycle re-tested retrieval from the workstation
and found the picture is more specific than "blocked":

| Host | curl, full browser header set | Playwright, real browser context |
|---|---|---|
| www.fda.gov | 200 | 200 |
| www.cdc.gov | 403 (Akamai `errors.edgesuite.net` reference) | **200** |
| in.gov (IDOH dashboard) | not attempted | 200 |
| oeps.wv.gov (WV tracker) | not attempted | 200 |
| odh.ohio.gov | **404 site-wide, including the site root** | 404 |

CDC's 403 is bot fingerprinting that a real browser context defeats outright. Every CDC and FDA figure in this
briefing is therefore primary-verified for the first time since v9, rather than inferred from page titles and search
snippets. Three material developments surfaced immediately that three consecutive secondary-sourced cycles had missed.
The retrieval standard is now recorded globally so future cycles start with the browser context rather than escalating
to it.

**odh.ohio.gov is a genuine outage, not a bad path.** The site root itself returns 404 from both curl and a real
browser, so this is not a reorganized URL. Ohio's `srcUrl` has been removed from the map data this cycle rather than
left pointing at a dead government link, per the standing rule not to display a count whose linked primary does not load.

## Materiality verdict: MATERIAL. Three new findings, one closed watch item, one added caveat.

### 1. Ohio nearly doubled in a week, retiring a caveat carried since v9

Ohio's statewide figure moves from **1,316 (Jul 17) to 2,574 (Jul 24)**, with more than 90% of cases reported after
Jun 20. We had carried the Jul 17 number marked stale for five cycles. Attributed to the Ohio Department of Health by
two independent outlets (WCPO/Scripps and Dayton Daily News/Cox), which agree on the precise figure.

Hedge applied: Spectrum News 1 reports "more than 2,600" and characterises it as "double the number reported the week
before." We adopted **2,574**, the precise figure carried by two outlets, and did not adopt the rounder 2,600-plus
number. The page says so.

### 2. CDC has deployed Epi-Aid surge staffing to Ohio

At ODH's request, CDC is sending Epidemic Intelligence Service officers to Ohio for approximately three weeks to
assist with case interviews, data management, cluster identification, and coordination with federal multistate
traceback. This is the first federal surge-staffing escalation disclosed in this outbreak. It is a capacity
development, not an attribution development, and it is the single strongest data point Prediction 4 has had.

### 3. FDA's own table shows four concurrent Cyclospora investigations, not two

Read directly from FDA's CORE active investigation table:

| Ref # | Product | Cases | Status |
|---|---|---|---|
| 1390 | Iceberg lettuce (the named cluster) | see advisory | Active |
| 1392 | Not yet identified | 72 | Active, posted Jul 22 |
| 1384 | Not yet identified | 18 | Active, posted Jul 8 |
| 1385 | Not yet identified | 10 (up from 8) | Active, posted Jul 8 |
| 1381 | Not yet identified | n/a | Outbreak over, investigation ongoing |

From v11 through v13 we reported a single additional distinct outbreak (the 72-case one) and explicitly declined to
assert a running total because outlet coverage varied. The agency's own table supplies one, and it is higher. This is a
correction that runs **in favour of** our own standing thesis, which is the direction to scrutinise hardest, so the page
states plainly that it changes the count of known vehicles without resolving the origin of any of them.

### 4. Watch item closed: FDA explicitly names the four added states

FDA's advisory, read directly, names Illinois, Indiana, Kansas, Kentucky, Michigan, Ohio, Oklahoma, Pennsylvania, and
West Virginia in its own text and case-count block. v12 and v13 could only infer this from the page title via search
snippets and left the item open. Closed, primary-verified.

## Primary-verified figures, all unchanged from v13

Confirming that the standing numbers survive primary verification is itself a finding, given three cycles of
secondary-only sourcing.

- **National (CDC surveillance page, dated Jul 24):** 4,173 lab-confirmed domestic cases, 41 states, **308
  hospitalizations**, 0 deaths, May 1 to Jul 20. More than **7,400** further cases not yet lab-confirmed, many
  attributed to Michigan and Ohio. Median age 44 (range 2 to 95), 56% female, median onset Jun 26.
- **Cluster (CDC outbreak + investigation pages, FDA advisory, all dated Jul 24):** 1,947 cases, at least 98
  hospitalizations, 0 deaths, 9 states, onset Jun 22 through Jul 20.
- **Distribution:** CDC says "at least 27 states." FDA is internally inconsistent: its Foodservice paragraph lists 27,
  its Case Counts block lists 28 by adding West Virginia. Headline wording changed from "27 states" to "at least 27
  states" to match the agencies' floor.

## Live state dashboards moved

- **Indiana: 684 (Jul 23) to 710 (Jul 24).** IDOH dashboard, updated weekdays by 1pm EDT. 385 female / 325 male, ages 8 to 98.
- **West Virginia: 195 / 15 hosp (Jul 21) to 226 / 19 hosp (Jul 24).** WV OEPS tracker, updated Tuesdays and Fridays.

## Checked and unchanged

- **North Carolina:** 561 holds. NCDHHS's newsroom carries nothing newer than its Jul 17 update and Jul 21 media
  availability; counts update Tuesdays, so the next figure is due Jul 28. Cluster open/closed status still unresolved.
- **Michigan:** 8,176 / 160 hosp holds. MDHHS newsroom's most recent cyclosporiasis release is still Jul 13.
- **Mexico:** no further response. The Cofepris inspection of the Guanajuato plant (Jul 18 to 20, negative for
  *Cyclospora cayetanensis* and fecal coliforms) remains the latest development.
- **Litigation:** no new suits since *Hercula* (filed Jul 20). v13's correction distinguishing *Hercula* from *Parrish*
  is independently confirmed this cycle by Marler Clark's own case-news posting, which also confirms *Caruso v. Taco
  Bell Corporation, et al.* (N.D. Ohio, Eastern Division, filed Jul 17, Valerie Caruso of Geneva, Ohio). v13's
  correction stands.

## Predictions re-scored

- **Prediction 4 (surveillance capacity is the durable story): 85% to 89%.** The Epi-Aid deployment is a state health
  department formally declaring it cannot process its own outbreak workload, with the backfilled functions being
  exactly the interview-and-analysis capacity at issue. Held short of treating it as proof of the causal claim, since
  Epi-Aid is a routine mechanism predating any recent reduction, and a request evidences strain without evidencing its cause.
- **Prediction 5 (attribution will not close the case): 83% to 87%.** Three concurrent unidentified-product Cyclospora
  investigations on FDA's own table is this prediction's core claim stated directly by the agency rather than inferred.
- **Prediction 3 (confirmed count converges upward): held at 85%.** The confirmed figure it is scored against has not
  moved for a fourth consecutive cycle, so no raise. Noted that the pressure underneath is building: Ohio nearly
  doubled, Indiana and West Virginia both moved, and more than 7,400 cases sit awaiting confirmation.
- Predictions 1, 2, and 6 not re-scored; nothing this cycle bears on them beyond what v13 accounted for.

## Corrections against ourselves

**One understatement corrected.** From v11 through v13 the briefing described "a second, separate outbreak" of 72
cases as the only additional distinct Cyclospora event, and declined to assert a total. FDA's table shows three
additional active investigations. Nothing previously asserted was false, but the framing understated the picture, and
it understated it in the direction that flatters our own thesis. Corrected on the page in the Situation Snapshot, the
Prediction 5 panel, the full-briefing update panel, and the report card.

**Version-date housekeeping.** v13 was stamped July 27 because the cloud routine timestamps in UTC; its commit landed
2026-07-27 00:58 UTC, which is 2026-07-26 17:58 PT. v13 was never published. All stamps are normalised to the actual
PT run date, so the live page moves July 24 (v11) to July 26 (v14). This status file is dated 2026-07-26 and therefore
sorts before `2026-07-27-cyclospora-brief-v13.md` despite superseding it.

## Files changed

- `osint-reports/cyclospora-2026/state-map-embed.html`: OH 1,316 to 2,574 with `srcUrl` removed (dead link) and an
  Epi-Aid note; IN 684 to 710; WV 195/15 to 226/19. Both script blocks re-validated with `node --check`.
- `osint-reports/cyclospora-2026/index.html`: v14 "what changed" panel; new Ohio and Epi-Aid Situation Snapshot rows;
  additional-outbreak row rewritten to the FDA table and raised to High confidence; recall row hedged to "at least 27";
  Predictions 3, 4, and 5 re-scored with bars and percentage labels synchronised; stamps.
- `osint-reports/cyclospora-2026/executive-overview.html`: v14 "New this cycle" paragraph; stamps.
- `osint-reports/cyclospora-2026/full-briefing.html`: two timeline entries; a labelled v14 update panel; eight new
  sources (four [A] primary, four [B]); stamps.
- `osint-reports/cyclospora-2026/{protective-guidance,supply-chain-analysis,state-map}.html`: stamps only.
- `osint-reports/index.html`: report card date, version, summary, source count.

## Verification performed

- Tag balance across all 19 checked element types on all edited pages: balanced.
- Both `state-map-embed.html` script blocks pass `node --check`; OH/IN/WV values re-read from the file after edit.
- Em dash scan across all edited pages: none (repo hook ban).
- Confidence bar widths and percentage labels checked as matching for every re-scored prediction.
- No internal retrieval or infrastructure notes on any public page. The public pages say only that figures were
  verified against the agency pages directly, and that Ohio's state website was returning errors, which is a sourcing
  caveat a reader needs in order to judge the Ohio attribution.

## Next update should check

1. **Ohio's next statewide figure**, and whether odh.ohio.gov comes back. If it does, restore the `srcUrl` on the OH
   map entry. If it stays down past a few cycles, that is itself worth a line on the page.
2. **North Carolina's Tuesday update (due Jul 28)**, which should refresh 561 and may resolve the open/closed
   cluster-status question outstanding since v9.
3. Whether **CDC's national confirmed count** finally moves from 4,173/41. Four consecutive quiet cycles, with more
   than 7,400 cases pending and Ohio's state figure nearly doubling, makes a large catch-up increasingly likely.
4. Whether **FDA's refs #1384, #1385, or #1392** get a product identified, or their case counts move. Track them by
   reference number now that we have them.
5. Whether the **Epi-Aid deployment** produces a public output, an interim finding, or an extension beyond three weeks,
   and whether any other state requests the same.
6. Whether **Mexico, FDA, or CDC** respond further to each other following the Cofepris negative result.
7. Whether either **Parrish or Hercula** reaches a filing, ruling, or settlement, and whether further distinct suits
   surface. Verify plaintiff-level detail before characterising coverage as duplicative.
8. **Cluster-specific sub-counts for IL, KS, OK, and PA**, distinct from statewide totals, still not published.
9. Whether Indiana and West Virginia's dashboards keep their stated cadences (IDOH weekdays, WV Tuesdays and Fridays).
