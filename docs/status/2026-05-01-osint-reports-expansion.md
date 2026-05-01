---
title: OSINT Reports Expansion — WHCD Merge + Sandpoint Investigation
scope: Session summary for 2026-05-01
last_updated: 2026-05-01
---

# 2026-05-01 — OSINT Reports Expansion

## What Was Done

### PR #6 — Intelligence Section (WHCD Briefing)
- Merged `feature/osint-reports` branch into `main`
- Content already committed across prior sessions: Intelligence nav section, OSINT reports index, services page, WHCD 2026-04-25 briefing package (6 V1 reports + V2 72-hour validation update), and visual styleguide
- ~5,400 lines across 19 files

### PR #7 — Sandpoint OSINT Investigation
- Added Sandpoint land developer influence investigation package from consulting-plugin deliverables
- 5 pages: package index, investigation briefing, interactive investigation board (vis-network knowledge graph), Averill Hospitality entity profile, collection gaps & phased roadmap
- Reclassified TLP from GREEN to CLEAR (all public government records)
- Added report card to OSINT reports index page
- Added "Investigation Package" and "Interactive Investigation Board" to deliverable types list
- CDN exception granted for vis-network (unpkg.com) used by the interactive investigation board

## Decisions Made

- **TLP:CLEAR** for Sandpoint package — user confirmed all content is derived from public government records, so TLP:GREEN restriction was unnecessary
- **CDN exception** for vis-network in the investigation board — approved deviation from the no-external-dependencies rule in CLAUDE.md
- **No GitHub issue filed** for either merge — user directed fast execution

## What's Left

- No open work items on this repo
- Both PRs merged and deployed via GitHub Pages
- The OSINT reports index now has two report cards (WHCD + Sandpoint)

## Lessons Learned

- Sandpoint investigation package was sourced from `~/Local/00-Claude/Clients/SANDPOINT/Deliverables/` (not the consulting-plugin repo code directory)
- The consulting-plugin repo has Sandpoint research scrapers at `research/sandpoint/` but the deliverable zip was in the client folder
