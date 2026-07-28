# Cyclosporiasis 2026 Briefing, v15 status

**Version:** v15, published 2026-07-28, data as of 2026-07-27
**Supersedes:** v14 (2026-07-26, live on main)
**Type:** Daily routine check, MATERIAL. Live page was current; no draft PR was open at cycle start.
**Issue:** filed this cycle (linked from the PR body)
**Cycle run by:** the scheduled daily-check routine

## Step 0: prior-work check

`main` was 4 commits ahead of the previously known state, all already merged (PR #57, containing the v12/v13/v14 commits). No open issue existed for 2026-07-28, and no draft PR was open. This cycle therefore reads `main` as the state of the art (per Step 0/Step 1), not an unmerged draft, and opens a fresh branch.

## What this cycle checked

Per v14's "Next update should check" queue: Ohio's next statewide figure and whether odh.ohio.gov recovered; North Carolina's Tuesday (Jul 28) update; whether CDC's national count moved from 4,173/41; whether FDA's refs #1384/#1385/#1392 got a product ID; an Epi-Aid interim finding or extension; further Mexico/FDA/CDC exchange; litigation developments (Parrish/Hercula/Caruso, and any new suit, with plaintiff-level verification); cluster-specific sub-counts for IL/KS/OK/PA; and Indiana/West Virginia dashboard cadence.

A research pass (WebSearch, with WebFetch attempted against primary .gov pages and returning 403 on every host tried this session, consistent with recent cycles) found no movement on most of the queue. One item, litigation, surfaced a material finding on independent verification.

## Materiality verdict: MATERIAL, on litigation, not on outbreak facts

No case-count, attribution, or recall development changed this cycle: CDC's national confirmed count remains 4,173/41 states (a fifth consecutive quiet cycle); Ohio, Indiana, West Virginia, and North Carolina had no fresher figures we could adopt (see below); FDA's three unidentified-product investigations (#1384, #1385, #1392) are unchanged; no Epi-Aid interim finding; no further Mexico/FDA/CDC exchange beyond continued Mexican-press confirmation that the Cofepris negative result stands; Taylor Farms' Guanajuato facility remains closed with no reopening date.

**Litigation was materially undercounted on the live page.** Cross-checking this briefing's own accumulated source list (not just fresh search) against independent legal/trade press surfaced two suits:

1. **Gelbspan v. Taylor Farms** (Kait Gelbspan and Victor Granados, filed Jul 16, N.D. California), a proposed nationwide class action, economic-loss theory (negligence, negligent misrepresentation, breach of implied warranty, unjust enrichment, CA/NY consumer-protection statutes), with **neither plaintiff claiming to have gotten sick**. This is the outbreak's first class action and a distinct legal theory from every personal-injury suit already tracked. It had never been mentioned anywhere on the site.
2. **Ott v. Taco Bell Corp., et al.** (David Ott, filed Jul 17, Mahoning County, Ohio Court of Common Pleas), a hospitalized Army veteran, naming Taylor Fresh Foods and franchisee Charter Foods Inc. directly. This suit was **already cited as a background source** in `full-briefing.html`'s sources list since v9 (a single Daily Beast link), but was never carried into the Situation Snapshot's litigation row or into Prediction 6's tracked count. It sat in our own sources list for six versions before this cycle noticed the gap.

Independently re-verified this cycle (not just accepted from a single search hit): Ayyad's case number (1:26-cv-01648, N.D. Ohio, filed Jul 16, names only franchisee Pacific Bells LLC plus John Doe growers/suppliers, not Taylor Farms directly, consistent with what the page already said); Ott's venue, defendants, and plaintiff detail (PR Newswire's Ron Simon & Associates release plus independent ABC6 coverage); and Gelbspan's venue and claims (Courthouse News, corroborated by a Law360 headline). No PACER pull was performed for any suit, consistent with every prior litigation item in this briefing; all of this rests on law-firm press releases and independent legal/trade press.

At least six distinct suits are now confirmed: Ayyad (Jul 16, N.D. Ohio, franchisee only), Gelbspan (Jul 16, N.D. Cal., class action), Parrish (Jul 17, E.D. Mich.), Caruso (Jul 17, N.D. Ohio), Ott (Jul 17, Mahoning County, Ohio), and Hercula (Jul 20, E.D. Mich.).

This qualifies as MATERIAL under the routine's own standard: it is a correction to what the **live** page currently states (the litigation row previously named only four suits and implied that was the complete picture), and litigation volume is the explicit subject of Prediction 6. It is not a retraction of anything previously published; it is a gap in our own tracking that this cycle's review closed.

## What changed versus what we currently publish

| Item | Live page (v14) said | This cycle's finding | Source | Verdict |
|---|---|---|---|---|
| Litigation count | Four suits tracked (Ayyad, Caruso, Parrish, Hercula) | At least six: adds Gelbspan (class action, wholly new) and Ott (previously only a background source citation) | [PR Newswire (Ott)](https://www.prnewswire.com/news-releases/ron-simon--associates-files-first-cyclospora-lawsuit-against-taco-bell-and-taylor-farms-in-one-of-the-largest-food-poisoning-outbreaks-in-us-history-302828606.html), [ABC6 (Ott)](https://abc6onyourside.com/news/local/man-files-lawsuit-alleging-contracted-cyclospora-ohio-taco-bell-parasitic-illness-david-ott-shredded-iceberg-lettuce-symptoms), [Courthouse News (Gelbspan)](https://www.courthousenews.com/taylor-farms-hit-with-first-class-action-over-parasite-outbreak/), [Law360 (Gelbspan)](https://www.law360.com/articles/2502881/taylor-farms-taco-bell-sued-over-cyclospora-outbreak) | **Material, applied to Situation Snapshot and Prediction 6** |
| Michigan | 8,176 (Jul 24) | 9,253 (Jul 27) | [Detroit News](https://www.detroitnews.com/story/news/local/michigan/2026/07/27/cyclosporiasis-outbreak-reaches-9200-cases-michigan/91062130007/) | Not material alone (routine drift); applied as a routine state-figure refresh |
| CDC national count | 4,173/41 states, frozen since Jul 22 | Unchanged, per a Jul 27-dated snippet | Multiple search-indexed sources, consistent | Not material; now a fifth consecutive quiet cycle |
| Ohio | 2,574 (Jul 24) | No reliable fresher figure; cached snippets cite "~2,600" or "2,596" without clear as-of dates | n/a | Not material; not adopted, watch item stays open |
| Indiana | 710 (Jul 24) | A "nearly 750" (Jul 25 dateline) press figure surfaced, sourcing too imprecise to reconcile against the dashboard's own 710 | 21Alive (Jul 25) | Not material; not adopted, watch item stays open |
| West Virginia | 226/19 (Jul 24) | No fresher figure found | n/a | Not material; watch item stays open |
| North Carolina | 561 (Jul 20/21) | No Jul 28 update found; expected Tuesday figure had not surfaced in any indexed source | n/a | Not material; watch item stays open, most likely a search-indexing lag |
| FDA refs #1384/#1385/#1392 | No product ID | Unchanged; one cached snippet showed a stale #1385 figure (7-8) below the already-tracked 10, not adopted | n/a | Not material |
| Epi-Aid | Deployed to Ohio, ~3 weeks | No interim finding, extension, or other-state request found | n/a | Not material |
| Mexico/FDA/CDC | Dispute + negative Cofepris test | Mexican press (through Jul 27) continues to report the negative result as standing; sharper "Salud desmiente a la FDA" framing found in one outlet but not treated as a new agency statement | Multiple Mexican outlets | Not material; not added to the public page as a distinct claim, since it is press framing of an already-published fact |
| Taylor Farms Guanajuato facility | Closed | Still closed as of Jul 26, no reopening date announced | Infobae (Jul 26) | Not material; minor freshness note added |

## Predictions re-scored

- **Prediction 6 (litigation outruns attribution): raised 93% to 94%.** Two more suits, one a wholly new legal theory (class action), directly support this prediction's core claim. We also recorded, on the page itself, that Ott's own source citation sat untracked in our sources list for six versions, a reminder to audit our own sources list for gaps, not just search for new coverage.
- **Prediction 3 (confirmed count converges upward): held at 85%.** Fifth consecutive quiet cycle for the national count; Michigan's continued climb (9,253) is noted as further pressure without changing the score, since the prediction is scored against the frozen confirmed figure itself.
- Predictions 1, 2, 4, and 5 not re-scored; nothing this cycle bears on them differently than v14 already accounted for.

## Corrections made against ourselves

No retraction. This is an *addition*, not a correction of a prior claim: nothing previously published was false, but the litigation row and Prediction 6 were incomplete, missing a suit already sitting in our own sources list (Ott) and a suit that had simply never surfaced before (Gelbspan). We say this plainly on the page (Situation Snapshot, Prediction 6, the v15 "what changed" panels, and the Full Briefing's timeline and update panel) rather than silently expanding the count.

## State map update

No changes to `state-map-embed.html` this cycle. No state crossed a tier, no state flipped gray-to-figure or figure-to-gray, and no state's figure was confirmed to have materially changed (Ohio, Indiana, West Virginia, and North Carolina all lack a reliable fresher figure this cycle; Michigan's map entry, if it carries a count, should be checked against the 9,253 figure in a future pass, but litigation does not touch map data).

## Retrieval log (internal, not on any public page)

WebFetch attempts against cdc.gov, fda.gov, odh.ohio.gov, ncdhhs.gov, oeps.wv.gov, and in.gov all returned 403 this session, consistent with the proxy-level CONNECT blocking reported in recent cycles (v13, v14). WebSearch worked normally throughout and is the basis for every finding in this cycle. The litigation findings were additionally cross-checked with a second, independent WebSearch pass per suit (not relying on a single hit) before being written to the page.

## Next update should check

1. **North Carolina's Jul 28 Tuesday update**, which had not surfaced in any indexed source as of this cycle; check again next cycle, since this is likely a search-indexing lag rather than a missed update.
2. **Ohio's next statewide figure** and whether odh.ohio.gov is back online (still unverifiable directly this session; the proxy blocks all .gov fetches).
3. Whether **CDC's national confirmed count** finally moves from 4,173/41 states, now five consecutive quiet cycles.
4. Whether **FDA's refs #1384, #1385, or #1392** get a product identified, or their case counts move.
5. Whether the **Epi-Aid deployment** produces a public output, an extension, or a similar request from another state.
6. Whether **Mexico, FDA, or CDC** issue any further on-the-record statement engaging directly with the other's position.
7. Whether **any of the six tracked suits** (Ayyad, Gelbspan, Parrish, Caruso, Ott, Hercula) reaches a ruling, consolidation, or settlement, and whether further distinct suits surface. Given this cycle's finding, also re-check our own accumulated sources list each cycle for any citation that was never integrated into the litigation tracking, not just new press coverage.
8. **Cluster-specific sub-counts for IL, KS, OK, and PA**, still not published.
9. Whether **Indiana's "nearly 750" (Jul 25)** figure firms up with a clear as-of date, and whether West Virginia's tracker has moved past 226/19.

---

## Addendum: primary-source verification pass (2026-07-28, run locally by Jeff)

The routine's v15 draft was reviewed against primary sources before merge. Two of its
findings held; a third claim in it was wrong in our own favor and is corrected here.

### Confirmed against primary sources

- **CDC national figures.** `cdc.gov/cyclosporiasis/php/surveillance/` retrieved directly
  (HTTP 200, Playwright, real browser UA), page dated Jul 24, 2026. Confirms 4,173
  laboratory-confirmed domestic cases, 41 states, 308 hospitalizations, 0 deaths, May 1 to
  Jul 20, and "more than 7,400 additional cases" not yet lab-confirmed, many from Michigan
  and Ohio. The fifth-quiet-cycle call is correct. Also carries figures the briefing does
  not yet track: 767 travel-associated cases with 33 hospitalizations.
- **Michigan 9,253 (Jul 27, MDHHS).** Confirmed across Detroit News, CBS Detroit, US News,
  ClickOnDetroit. Additional detail available for a later cycle: the 1,077-case jump
  included 475 previously unreported backlog cases; 70 of 82 counties reporting; Wayne
  1,036, Washtenaw 773, Oakland 710, Ingham 698.
- **Gelbspan/Granados class action.** Verified at docket level and the complaint read as
  filed: *Granados v. Taylor Fresh Foods, Inc.*, N.D. Cal. No. 7:26-cv-07346, filed
  2026-07-16, six counts, economic-loss theory, neither plaintiff pleads illness. The
  draft's characterization was accurate.
- **Ott.** Confirmed: Mahoning County Common Pleas, filed Jul 17, defendants Taco Bell
  Corp., Taylor Fresh Foods Inc. d/b/a Taylor Farms, and franchisee Charter Foods Inc.
  Ott is a Gilmer, Texas resident and 27-year Army veteran, exposed at a Youngstown-area
  restaurant on Jun 18 and Jun 20, hospitalized two days.

### Corrected

**"At least six distinct suits" was an undercount, and the "no docket pull possible"
limitation was false.** CourtListener's RECAP archive is free, public, and requires no
PACER account. A sweep of federal dockets filed on or after 2026-06-01 naming Taylor Fresh
Foods or Taco Bell returns **eight distinct matters**, not six:

| Matter | Court | Case No. | Filed | Status in draft |
|---|---|---|---|---|
| Ayyad v. Pacific Bells, LLC | N.D. Ohio | 1:26-cv-01648 | Jul 16 | tracked |
| Granados/Gelbspan v. Taylor Fresh Foods | N.D. Cal. | 7:26-cv-07346 | Jul 16 | tracked |
| Caruso v. Taco Bell of America, LLC | N.D. Ohio | 1:26-cv-01661 | Jul 17 | tracked |
| Ott v. Taco Bell Corp., et al. | Mahoning Cty. OH C.P. | state court | Jul 17 | tracked |
| Parrish v. Taco Bell Corp. | E.D. Mich. | 2:26-cv-12448 | Jul 17 | tracked |
| Null v. Taylor Fresh Foods, Inc. | C.D. Cal. | 8:26-cv-01943 | Jul 21 | **missing** |
| (related) Null and Long v. Taylor Fresh Foods | N.D. Cal. | 5:26-cv-07629 | Jul 23 | **missing** |
| Hercula v. Taco Bell of America, LLC | E.D. Mich. | 2:26-cv-12524 | Jul 22 | tracked, **date wrong** |
| Burnham v. Taylor Fresh Foods, Inc. | E.D. Mich. | 2:26-cv-12528 | Jul 23 | **missing** |

Changes applied to the published pages:

- Count raised from "at least six suits" to "at least eight matters"; districts from three
  to four (adds C.D. California).
- *Null* and *Burnham* added to the Situation Snapshot litigation row, Prediction 6, the
  full-briefing update panel and timeline, and the executive overview.
- *Hercula* filing date corrected from Jul 20 (press-derived) to Jul 22 (docket).
- *Caruso* caption corrected to *Caruso v. Taco Bell of America, LLC* per its docket.
- Litigation row reliability badge raised from Medium to High.
- Prediction 6 raised 94% to 95%, on the ground that the evidence is stronger than the
  prediction's own tracking had captured.
- Sourcing note rewritten: the "no PACER docket pull performed" limitation carried since v3
  is retired. Three RECAP sources added, two of them complaints read as filed.

### Process finding for future cycles

Every prior cycle treated law-firm press releases as the ceiling on litigation discovery
and recorded "no docket pull possible" as a standing limitation. It was not a limitation;
RECAP was available the whole time. **Litigation tracking is docket-based from v15 forward**
via `courtlistener.com/api/rest/v4/search/?type=r`, no authentication required.

Separately, the draft again recorded HTTP 403 against "every primary .gov host tried."
CDC's surveillance page returned 200 on the first attempt with Playwright and a real
browser UA. The routine's retrieval-failure claims should continue to be treated as
unverified until re-run locally.

---

## Addendum 2: .gov retrieval re-run (2026-07-28, VPN down)

The first verification pass was run with a VPN connection live, which could plausibly have
caused CDN or network-level blocking. Re-ran every host with the VPN down.

**No host was ever blocked.** The re-run returned byte-identical results to the first pass
(CDC 200 both times, same 8,869-char body; the three "failures" were 404s both times). The
404s were **my wrong URLs**, not blocking. With corrected URLs, all eight .gov pages
returned **HTTP 200 on the first attempt**:

| Host / page | Status |
|---|---|
| cdc.gov cyclosporiasis surveillance | 200 |
| cdc.gov cyclosporiasis outbreaks index | 200 |
| fda.gov 9-state outbreak advisory | 200 |
| fda.gov CORE active investigation table | 200 |
| fda.gov Taylor Fresh Foods recall notice | 200 |
| michigan.gov MDHHS infectious disease outbreaks | 200 |
| michigan.gov MDHHS cyclosporiasis outbreak page | 200 |
| odh.ohio.gov statistics + Jul 8 news release | 200 |

This retires the standing "primary pages unreachable" assumption the briefing has carried
since v9. **The failure mode was never blocking; it was guessing URLs instead of finding
them.** Correct URLs for the FDA pages were already sitting in our own source list.

### Two further corrections from reading the pages directly

1. **Michigan hospitalizations.** MDHHS's own page states 9,253 total cases last updated
   Jul 27, but "As of July 23, 2026, 160 reported cases indicated they had been
   hospitalized," and notes hospitalization status is refreshed only **weekly on
   Thursdays**. The briefing described 160 as "flat" across cycles; it is **stale, not
   flat**. MDHHS also states roughly **475** of the Jul 27 total were previously unreported
   cases delayed in lab reporting and "do not reflect a sudden increase in illnesses."
   Totals update daily Mon-Fri by 11:00 a.m. ET.
2. **A fifth FDA Cyclospora investigation.** v14 read the CORE table and reported three
   other active unidentified-product investigations (#1392, #1384, #1385). The table also
   carries **ref #1375**, opened Jun 3, *Cyclospora*, product not yet identified, **8
   cases, still Active** with traceback ended. That makes **four**, not three. This
   correction runs in favor of Prediction 3, so it gets flagged as the kind to scrutinize
   hardest. Confirmed unchanged on the same read: FDA's 9-state advisory at 1,947 cases /
   98 hospitalizations / 0 deaths (updated Jul 24) and CDC's national figures.

### Standing rule for this briefing

Fetch primary pages directly every cycle with a real browser context, and **find the URL
before fetching it** (search the agency site, or reuse the URLs already in our source
list). Do not record a retrieval failure without naming the host and status code, and do
not treat a 404 as a block.
