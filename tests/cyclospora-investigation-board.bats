#!/usr/bin/env bats

# Tests for the Cyclospora 2026 investigation-board graph (issue #83).
# The board links four evidence clusters (product/firm/state/regulatory/
# litigation) and surfaces the GAPS between them.

SITE_ROOT="$(cd "$(dirname "$BATS_TEST_FILENAME")/.." && pwd)"
BOARD="$SITE_ROOT/osint-reports/cyclospora-2026/investigation-board.html"
DIR="$SITE_ROOT/osint-reports/cyclospora-2026"

# CIB-001: the page exists
@test "CIB-001: investigation-board.html exists" {
  [ -f "$BOARD" ]
}

# CIB-002: vis-network vendored locally in this report folder (no CDN)
@test "CIB-002: vis-network vendored locally under cyclospora-2026/js" {
  [ -f "$DIR/js/vis-network.min.js" ]
}

@test "CIB-002: board references only the local vendored vis-network" {
  grep -q 'src="js/vis-network.min.js"' "$BOARD"
}

# CIB-003: no external/CDN script or style references anywhere on the page
@test "CIB-003: no external http(s) src/href resources on the board" {
  ! grep -Eo '(src|href)="https?://[^"]+"' "$BOARD" | grep -v 'circle6systems.com'
}

# CIB-004: security headers present and not weaker than sibling briefing pages
@test "CIB-004: board has Content-Security-Policy" {
  grep -qi 'Content-Security-Policy' "$BOARD"
}

@test "CIB-004: board has X-Frame-Options" {
  grep -qi 'X-Frame-Options' "$BOARD"
}

@test "CIB-004: board CSP does not weaken to unsafe-eval" {
  ! grep -i 'unsafe-eval' "$BOARD"
}

# CIB-005: the three declared edge bases all appear (Verified / Inferred / Gap)
@test "CIB-005: edges use verified, inferred, and gap bases" {
  grep -Eq "basis: *'verified'" "$BOARD"
  grep -Eq "basis: *'inferred'" "$BOARD"
  grep -Eq "basis: *'gap'" "$BOARD"
}

# CIB-006: legend enumerates all three edge styles by their text labels
@test "CIB-006: legend names Verified, Inferred, and Gap" {
  grep -q '>[[:space:]]*Verified' "$BOARD"
  grep -q '>[[:space:]]*Inferred' "$BOARD"
  grep -q '>[[:space:]]*Gap' "$BOARD"
}

# CIB-007: all five cluster groups are defined
@test "CIB-007: five cluster groups present (product/firm/state/regulatory/litigation)" {
  for g in product firm state regulatory litigation; do
    grep -Eq "group: *'$g'" "$BOARD" || { echo "missing group: $g"; return 1; }
  done
}

# CIB-008: the board is linked from the report index
@test "CIB-008: index links to the investigation board" {
  grep -q 'investigation-board.html' "$DIR/index.html"
}

# CIB-009: accessibility - legend pairs color with text (not color alone)
#          and the graph region carries an accessible name.
@test "CIB-009: graph region has an accessible name" {
  grep -Eq 'id="graph"[^>]*(aria-label|role=)' "$BOARD" \
    || grep -q 'aria-label=' "$BOARD"
}

@test "CIB-009: page declares document language" {
  grep -q '<html lang=' "$BOARD"
}

# CIB-010: a text-equivalent gap summary exists (the open-questions panel),
#          so gaps read as a deliberate product, not an empty render.
@test "CIB-010: board includes an open-questions / gap summary panel" {
  grep -qi 'open[- ]\(traceback\)\?[- ]\?question' "$BOARD" \
    || grep -qi 'unresolved' "$BOARD"
}
