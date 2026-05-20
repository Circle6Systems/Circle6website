---
title: Training Catalog Expansion — Phase 1 Complete, Phase 2 Storyboards Ready
date: 2026-05-20
scope: training content development (consulting-plugin repo on ADO)
---

# Session Summary: 2026-05-19 to 2026-05-20

## What Was Done

All training content work was performed in the **consulting-plugin** repo on Azure DevOps (private), not in this public GitHub repo. No changes were made to Circle6website.

### Phase 1 — Completed and Merged (PR #110, ADO)
- 3 storyboards + 3 interactive HTML modules (4,835 lines total)
- **A1 Prompt Injection** — "Don't Feed the Machine" (storyboard + HTML, 1,520 lines)
- **A2 QR/Quishing** — "QR or Quarantine" (storyboard + HTML, 1,576 lines)
- **B1 CUI Lockdown** — "CUI Lockdown" (storyboard + HTML, 1,739 lines)
- Each HTML module: self-contained, no external deps, BEC template pattern, 8-question assessment, 75% pass, certificate generation
- Linked to AB#1778 (parent: AB#1764)

### Phase 2 — Storyboards Ready for Image Creation (PR #111, ADO)
- 4 storyboards with image specs for illustrator handoff (2,016 lines total)
- **A3 MFA Fatigue** — "Push Back on Push Attacks" (440 lines, 4 scenarios, 7 image specs)
- **A4 Insider Threats** — "The Insider Equation" (519 lines, 9 scenarios, 7 image specs)
- **A5 Smishing** — "Smish or Legit?" (514 lines, 10 scenarios, 7 image specs)
- **C1 AI at Work** — "Responsible Use for Government and Business" (543 lines, 12 scenarios, 6 image specs)
- Each storyboard includes `[IMAGE: description]` placeholders and Image Requirements Summary table
- Linked to AB#1786 (parent: AB#1764)

## Decisions Made

- Training content stays in consulting-plugin (ADO, private) until ready to publish to website
- Phase 2 storyboards written before HTML modules to enable parallel image creation
- Storyboards include detailed image specs (27 total) for illustrator handoff
- No changes to Circle6website until training pages are ready for public deployment

## ADO Work Items

| ID | Title | Status |
|----|-------|--------|
| AB#1764 | Training catalog expansion plan (16 modules) | Complete |
| AB#1778 | Phase 1 modules (A1, A2, B1) | Complete, merged PR #110 |
| AB#1786 | Phase 2 storyboards (A3, A4, A5, C1) | PR #111 pending review |

## What's Next

1. Approve/merge PR #111 on ADO
2. Image creation for Phase 2 (27 image specs across 4 storyboards)
3. Build Phase 2 HTML modules after images are ready
4. Phase 3: A6 Supply Chain, A8 Passwords/Passkeys, A10 Deepfakes, B2 CJIS
5. Eventually: deploy training pages to circle6systems.com/training/

## Lessons Learned

- Subagents consistently failed to write files in the consulting-plugin repo due to permission blocks — writing storyboards directly from the main context was faster and more reliable
- The storyboard-first approach enables parallel workstreams (illustrator can start while HTML modules are queued)
- Phase 1 BEC module template pattern (847 lines) proved effective as canonical template for all new modules
