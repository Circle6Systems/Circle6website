#!/usr/bin/env bats

# Tests for the New Orleans tanker and riverboat collision flash briefing (ADO #3046).
# Publication guardrails: house security headers, no external resources,
# accessibility basics, no internal wording, sources and labels present,
# and registration on the OSINT reports index.

SITE_ROOT="$(cd "$(dirname "$BATS_TEST_FILENAME")/.." && pwd)"
SLUG="nola-tanker-riverboat-2026-11-13"
DIR="$SITE_ROOT/osint-reports/$SLUG"
PAGE="$DIR/index.html"
INDEX="$SITE_ROOT/osint-reports/index.html"

@test "NTR-001: index.html exists" {
  [ -f "$PAGE" ]
}

@test "NTR-001: report folder has its own style.css" {
  [ -f "$DIR/style.css" ]
}

@test "NTR-002: Content-Security-Policy present" {
  grep -qi 'http-equiv="Content-Security-Policy"' "$PAGE"
}

@test "NTR-002: X-Frame-Options DENY present" {
  grep -qi 'X-Frame-Options" content="DENY"' "$PAGE"
}

@test "NTR-002: CSP does not allow unsafe-eval" {
  ! grep -qi 'unsafe-eval' "$PAGE"
}

# outbound <a> links to sources are fine; loaded resources are not
@test "NTR-003: no external src attributes" {
  ! grep -Eq 'src="https?://' "$PAGE"
}

@test "NTR-003: no external stylesheet links" {
  ! grep -Eq '<link[^>]+href="https?://' "$PAGE"
}

@test "NTR-004: html lang declared" {
  grep -q '<html lang="en">' "$PAGE"
}

@test "NTR-004: exactly one h1" {
  [ "$(grep -o '<h1' "$PAGE" | wc -l | tr -d ' ')" -eq 1 ]
}

@test "NTR-004: main landmark present" {
  grep -q '<main' "$PAGE"
}

@test "NTR-004: every img has alt" {
  ! grep -Eo '<img[^>]*>' "$PAGE" | grep -v 'alt='
}

@test "NTR-004: confidence bars carry a text label, not color alone" {
  bars="$(grep -o 'class="confidence-bar"' "$PAGE" | wc -l | tr -d ' ')"
  labels="$(grep -o 'class="conf-label"' "$PAGE" | wc -l | tr -d ' ')"
  [ "$bars" -eq "$labels" ]
}

@test "NTR-005: no em dash characters or entities" {
  ! grep -q $'\xe2\x80\x94' "$PAGE"
  ! grep -Eqi '&m[d]ash;|&#8212;' "$PAGE"
}

@test "NTR-006: no internal work-item, agent, or path references" {
  ! grep -Eiq 'AB#|ADO #|c6s-osint|cti-orch|cti-fusion|00-Claude|/Users/|FLASHBRIEF\.md|SOURCES\.md' "$PAGE"
}

@test "NTR-007: sources section present" {
  grep -q 'id="sources"' "$PAGE"
}

@test "NTR-007: speculation section present and labeled unverified" {
  grep -q 'id="speculation"' "$PAGE"
  grep -qi 'unverified' "$PAGE"
}

@test "NTR-007: key assessments carry confidence language" {
  grep -Eiq '(low|moderate|high) confidence' "$PAGE"
}

@test "NTR-007: times carry a zone" {
  grep -Eq '\b(ET|EST|UTC)\b' "$PAGE"
}

@test "NTR-008: report card links to the briefing" {
  grep -q "href=\"/osint-reports/$SLUG/\"" "$INDEX"
}

@test "NTR-008: report card appears in the grid" {
  grep -c 'href="/osint-reports/[^"]*/"' "$INDEX" >/dev/null
  grep -q "href=\"/osint-reports/$SLUG/\"" "$INDEX"
}

@test "NTR-009: page states that victims and private individuals are not named" {
  grep -q 'Victims and private individuals are not named' "$PAGE"
}

@test "NTR-010: ownership is never offered as evidence for a blame narrative" {
  ! grep -qi 'China State Shipbuilding' "$PAGE"
  ! grep -qi 'state-linked ownership' "$PAGE"
}

@test "NTR-V2-1: page carries a 'What changed in v2' panel" {
  grep -q 'id="v2-changes"' "$PAGE"
  grep -q 'What changed in v2' "$PAGE"
}

@test "NTR-V2-2: page and report card are labeled v2" {
  grep -q 'Flash Briefing v2' "$PAGE"
  sed -n '/aria-labelledby="nola-tanker-title"/,/<\/article>/p' "$INDEX" | grep -q 'Flash Briefing v2'
}
