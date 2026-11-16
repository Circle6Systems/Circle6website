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

@test "NTR-V3-1: page carries a 'What changed in v3' panel and no v2 panel" {
  grep -q 'id="v3-changes"' "$PAGE"
  grep -q 'What changed in v3' "$PAGE"
  ! grep -q 'What changed in v2' "$PAGE"
}

@test "NTR-V3-2: page title, event date and report card are labeled v3" {
  grep -q '<title>Flash Briefing v3' "$PAGE"
  grep -q 'class="event-date">[^<]*Flash Briefing v3, November 15, 2026' "$PAGE"
  sed -n '/aria-labelledby="nola-tanker-title"/,/<\/article>/p' "$INDEX" | grep -q 'Flash Briefing v3'
  ! sed -n '/aria-labelledby="nola-tanker-title"/,/<\/article>/p' "$INDEX" | grep -q 'Flash Briefing v2'
}

@test "NTR-V3-3: v2 and v3 cutoffs are both stated" {
  grep -q '10:30 a.m. CST' "$PAGE"
  grep -q '16:30 UTC' "$PAGE"
  grep -q '11:02 p.m. CST' "$PAGE"
  grep -q '05:02 UTC' "$PAGE"
}

@test "NTR-V3-4: no em dash as character, named entity or numeric entity (page and index)" {
  # pattern built from a hex escape so this file carries no literal em dash
  emdash=$'\xe2\x80\x94'
  ! grep -q "$emdash" "$PAGE"
  ! grep -q "$emdash" "$INDEX"
  ! grep -Eqi '&m[d]ash;|&#8212;|&#x2014;' "$PAGE" "$INDEX"
}

@test "NTR-V3-5: every [S..] citation has a matching source id" {
  ids="$(sed '/id="sources"/,$d' "$PAGE" | grep -oE '\[S[0-9][0-9, S]*\]' | grep -oE 'S[0-9]+' | sort -u)"
  [ -n "$ids" ]
  for id in $ids; do
    lower="$(echo "$id" | tr 'S' 's')"
    grep -q "id=\"$lower\"" "$PAGE" || { echo "missing $lower"; return 1; }
  done
}

@test "NTR-V3-6: sources S70 to S100 are listed" {
  for n in 70 85 100; do
    grep -q "id=\"s$n\"" "$PAGE" || { echo "missing s$n"; return 1; }
  done
}

@test "NTR-V3-7: no 'second crash' item (unread lead cut)" {
  ! grep -Eqi 'second (ship )?crash|second-crash|Bulker Hits Bridge' "$PAGE"
}

@test "NTR-V3-8: no visible snapshot or method codes" {
  ! grep -Eqi 'jsonl|v[23]-recon|page-texts|snapshot code|site parameter|\bPIR[- ]?[0-9]|socmint|fusion check|\bR1[0-3]\b' "$PAGE"
}

@test "NTR-V3-9: legal items are labeled as allegations" {
  grep -Eqi 'allegations' "$PAGE"
  sed -n '/The lawsuits/,/<\/section>/p' "$PAGE" | grep -qi 'allegations'
  sed -n '/id="bluf-h"/,/<\/section>/p' "$PAGE" | grep -qi 'allegations'
}

@test "NTR-V3-10: every table header cell declares a scope" {
  ! grep -E '<th>' "$PAGE"
  ! grep -E '<th [^>]*>' "$PAGE" | grep -v 'scope='
}

@test "NTR-V3-11: ownership rulings hold (no private individual, generic defendants, no ownership-as-cause)" {
  ! grep -qi 'China State Shipbuilding' "$PAGE"
  ! grep -Eqi 'defendants? (are|is) (named|Nave)' "$PAGE"
  ! grep -qi 'Barnum' "$PAGE"
  sed -n '/The lawsuits/,/<\/div>/p' "$PAGE" | grep -q "registered owner and its ship manager"
}

@test "NTR-V3-12: editorial defaults applied (flag-state line, hospital 6 vs 5, 1302, pilot caption label)" {
  grep -q 'a substantially interested state' "$PAGE"
  grep -q 'six individuals remain hospitalized' "$PAGE"
  grep -q 'about 1302 local time' "$PAGE"
  grep -q 'not identified in the auto-generated captions' "$PAGE"
}

@test "NTR-V3-13: S88 and S95 are listed without addresses" {
  ! sed -n '/id="s88"/p;/id="s95"/p' "$PAGE" | grep -q '<a '
}
