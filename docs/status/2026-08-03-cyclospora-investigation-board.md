# 2026-08-03 - Cyclospora 2026 Investigation Board (issue #83)

## What was done

Built a node-edge investigation board for the 2026 cyclosporiasis briefing, following
the Sandpoint precedent (`SANDPOINT-Investigation-Board.html`). New page:
`osint-reports/cyclospora-2026/investigation-board.html`, linked as a new card in the
report index.

- **Library:** vis-network vendored locally at `osint-reports/cyclospora-2026/js/vis-network.min.js`
  (copied from the Sandpoint folder). No CDN. Verified the build contains no `eval` /
  `new Function`, so it runs under the briefing's strict CSP (`script-src 'self' 'unsafe-inline'`,
  no `unsafe-eval`).
- **Model:** five color-coded cluster groups - product (diamond), firm, state, regulatory,
  litigation. 36 nodes, 44 edges.
- **Edge bases:** `verified` (solid green), `inferred` (grey dashed), `gap` (red dashed,
  prefixed `?`). Gaps are the headline: 11 gap edges plus a dedicated "Open Traceback
  Questions" side panel enumerating all 10 unresolved links with the briefing's own
  hedging language and sources.
- **Sourcing:** every node and edge carries a source line drawn from the v21
  primary-verified briefing (FDA CORE two-status-columns, RECAP MDL 3196 sweep, state
  DOH primary counts, Mexico ministry dispute). Data extracted via a read-only pass over
  index.html / full-briefing.html / supply-chain-analysis.html / executive-overview.html.
- **Accessibility:** `lang`, `role="application"` + aria-label on the graph, an sr-only
  text-equivalent summary, legend pairs color with text, keyboard nav enabled, focus-visible
  outlines on controls.

## Testing

- New suite `tests/cyclospora-investigation-board.bats` (14 tests, all green): page exists,
  vis vendored + no external refs, security headers present + no unsafe-eval, three edge
  bases, legend enumerates all three, five groups, index link, accessible name, lang,
  gap panel.
- Headless Playwright render: canvas draws, 36 nodes / 44 edges / 10 gaps, gap panel opens,
  no functional console errors. (The `frame-ancestors` / `X-Frame-Options` via-meta notices
  are benign and identical across all sibling briefing pages - GitHub Pages cannot set real
  HTTP headers.)

## Pre-existing test failures (NOT introduced here)

`tests/security-hardening.bats` SEC-003 / SEC-004 / SEC-006 fail on unrelated files
(`whcd-2026-04-25/*`, `sandpoint-2026-04-30/*`, `training/*`, `trust-safety/wizard/*`).
These predate this branch; the new board page is absent from every missing-header list.
Left as-is - out of scope for #83; worth a separate cleanup issue.

## What's left

- PR review + merge to `main`.
- Optional follow-up: file an issue for the pre-existing SEC-003/004/006 failures.
