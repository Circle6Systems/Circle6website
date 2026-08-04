# Cyclosporiasis 2026 Briefing, v21 status: the outbreak's first deaths

**Version:** v21, 2026-08-03 (data as of 2026-08-03)
**Type:** Local publishing pass off the daily scout (issue #80, MATERIAL).
**Scope:** Michigan's first 2 deaths corrected across the report set; the standing "zero deaths / clinically mild" framing revised; Michigan statewide total 10,773 to 11,234. No other state changed.

## Why

Scout issue #80 flagged, on convergent press attribution to MDHHS, that Michigan had announced the outbreak's **first two deaths** on 2026-08-03 -- directly contradicting the "0 Deaths" hero badge and "clinically mild" framing every version has carried since v1. The scout was network-blocked (blanket sandbox egress, unchanged) and explicitly held: **do not publish the death count from press alone; primary-verify against MDHHS's own page first.**

## Primary verification (this pass)

Fetched MDHHS's own outbreak page directly via Playwright, **HTTP 200**:
`michigan.gov/mdhhs/keep-mi-healthy/infectious-diseases/infectious-disease-outbreaks`
- **Total Cases: 11,234**
- **Deaths: 2** -- "Two deaths have been identified as part of the cyclosporiasis outbreak." Both decedents "had significant underlying health conditions that may have been impacted by cyclosporiasis and dehydration," and both "became ill prior to the voluntary recall of iceberg lettuce... on July 17." MDHHS adds cyclosporiasis "is generally not a life-threatening illness" and death from it "is uncommon in the United States."
- Hospitalizations: 193 (as of Jul 30; weekly Thursday refresh, next Aug 6)
- Last updated: **August 3, 2026**

CDC's national surveillance page, also fetched HTTP 200, still reads **Deaths: 0** (6,707 confirmed / 45 states / 423 hospitalized, data through Jul 27). The national tally lagging the state agency's own count by days is the expected surveillance behavior this briefing has documented throughout; recorded as a lag, not a discrepancy. All press figures the scout carried (11,234; 2 deaths; 193) matched the primary source exactly.

## What changed on the pages

- **index.html:** hero Deaths badge 0/green to 2/red (labeled Michigan, MDHHS, Aug 3); BLUF opening rewritten from "clinically mild... zero deaths" to carry the deaths with MDHHS's own comorbidity/pre-recall nuance and the CDC lag; new v21 "What changed" note at top of the stack (v20 note demoted to neutral border); Situation Snapshot Deaths row 0 to 2, Michigan burden row 10,773 to 11,234 + 2 deaths; footer/event-date to v21.
- **state-map-embed.html:** `MI` object count 10,773 to 11,234, note records the 2 deaths and MDHHS nuance.
- **full-briefing.html:** new v21 update panel; concentration prose, Michigan table row, MDHHS source line updated to 11,234/2 deaths; severity-assessment row 1 downgraded High to Medium and reworded ("low for most... no longer zero deaths"); Aug 3 timeline entry; footer to v21.
- **executive-overview.html:** "Low direct severity" card retitled and reworded to reflect the deaths; date/footer to v21.
- **protective-guidance.html:** information-environment line and the "People are dying from this" myth-vs-fact row reframed False to "Mostly false, with a caveat" (2 deaths, very low fatality rate, but "nobody has died" no longer accurate); date/footer to v21.
- **supply-chain-analysis.html, state-map.html:** publication banners/footers bumped to v21 (no content change).
- **osint-reports/index.html:** hub card brought from v19 to v21; deaths surfaced as the lead; Michigan/Indiana figures refreshed.

## Held, not changed

- **Litigation: docket sweep run locally (v21.1 addendum), no movement.** The scout could not reach CourtListener; this pass ran the RECAP sweep directly on the JPML docket for MDL No. 3196 (CourtListener docket 73691833, PACER jpml 1760583). Four entries, nothing past v20's read: Motion to Transfer (Jul 17), Notice of Major Deficiency cured (Jul 23), MDL No. 3196 Assigned (Jul 29), Order to Show Cause with response due Jul 30 (Jul 29). MLD status still **Pending**; Panel has **not ruled on transfer**; no new constituent action. Caveat: RECAP's mirror was last refreshed Jul 29, so the Jul 30 OSC response and any Panel order since are not yet reflected -- a PACER-authoritative pull would be needed to close the Jul 30-to-Aug 3 gap.
- FDA refs #1385/#1392 unchanged from v20's direct Jul 30 read; stale press "4-6 outbreaks" not adopted.
- Ohio, Indiana, West Virginia, North Carolina, NY/NYC unchanged from v20.2.

## Lessons

1. **The scout's discipline worked as designed.** It correctly flagged MATERIAL, correctly capped the death figure at press-confidence, and correctly told the local pass to fetch MDHHS before publishing. The local pass did, and the primary source confirmed the press exactly.
2. **A standing "safe" framing can silently go stale.** "Zero deaths / clinically mild" was true for 20 versions and load-bearing across five files; the correction had to touch the hero badge, the BLUF, a severity-assessment row, and a myth-busting row, not just one number. Grep the whole set when a headline claim flips.

## Next

1. Watch whether CDC's national page updates its deaths tally from 0 to reflect Michigan (expected lag; note when it lands).
2. NCDHHS Tuesday update due 2026-08-04.
3. Michigan hospitalizations past 193 on the Aug 6 Thursday refresh.
4. JPML ruling on MDL No. 3196 -- docket confirmed Pending as of the Jul 29 RECAP refresh (sweep run this pass). Re-run against a fresher RECAP mirror (or PACER) to pick up the Jul 30 OSC response and any transfer order.
