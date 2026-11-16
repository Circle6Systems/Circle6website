#!/usr/bin/env bats

# Tests for the FAA National Airspace System outage flash briefing (ADO #3045).
# Publication guardrails: house security headers, no external resources,
# accessibility basics, no internal wording, sources and labels present,
# and registration on the OSINT reports index.

SITE_ROOT="$(cd "$(dirname "$BATS_TEST_FILENAME")/.." && pwd)"
SLUG="faa-nas-outage-2026-11-13"
DIR="$SITE_ROOT/osint-reports/$SLUG"
PAGE="$DIR/index.html"
INDEX="$SITE_ROOT/osint-reports/index.html"

@test "FNO-001: index.html exists" {
  [ -f "$PAGE" ]
}

@test "FNO-001: report folder has its own style.css" {
  [ -f "$DIR/style.css" ]
}

@test "FNO-002: Content-Security-Policy present" {
  grep -qi 'http-equiv="Content-Security-Policy"' "$PAGE"
}

@test "FNO-002: X-Frame-Options DENY present" {
  grep -qi 'X-Frame-Options" content="DENY"' "$PAGE"
}

@test "FNO-002: CSP does not allow unsafe-eval" {
  ! grep -qi 'unsafe-eval' "$PAGE"
}

# outbound <a> links to sources are fine; loaded resources are not
@test "FNO-003: no external src attributes" {
  ! grep -Eq 'src="https?://' "$PAGE"
}

@test "FNO-003: no external stylesheet links" {
  ! grep -Eq '<link[^>]+href="https?://' "$PAGE"
}

@test "FNO-004: html lang declared" {
  grep -q '<html lang="en">' "$PAGE"
}

@test "FNO-004: exactly one h1" {
  [ "$(grep -o '<h1' "$PAGE" | wc -l | tr -d ' ')" -eq 1 ]
}

@test "FNO-004: main landmark present" {
  grep -q '<main' "$PAGE"
}

@test "FNO-004: every img has alt" {
  ! grep -Eo '<img[^>]*>' "$PAGE" | grep -v 'alt='
}

@test "FNO-004: confidence bars carry a text label, not color alone" {
  bars="$(grep -o 'class="confidence-bar"' "$PAGE" | wc -l | tr -d ' ')"
  labels="$(grep -o 'class="conf-label"' "$PAGE" | wc -l | tr -d ' ')"
  [ "$bars" -eq "$labels" ]
}

@test "FNO-005: no em dash characters or entities" {
  ! grep -q $'\xe2\x80\x94' "$PAGE"
  ! grep -Eqi '&m[d]ash;|&#8212;' "$PAGE"
}

@test "FNO-006: no internal work-item, agent, or path references" {
  ! grep -Eiq 'AB#|ADO #|c6s-osint|cti-orch|cti-fusion|00-Claude|/Users/|FLASHBRIEF\.md|SOURCES\.md' "$PAGE"
}

@test "FNO-007: sources section present" {
  grep -q 'id="sources"' "$PAGE"
}

@test "FNO-007: speculation section present and labeled unverified" {
  grep -q 'id="speculation"' "$PAGE"
  grep -qi 'unverified' "$PAGE"
}

@test "FNO-007: key assessments carry confidence language" {
  grep -Eiq '(low|moderate|high) confidence' "$PAGE"
}

@test "FNO-007: times carry a zone" {
  grep -Eq '\b(ET|EST|UTC)\b' "$PAGE"
}

@test "FNO-008: report card links to the briefing" {
  grep -q "href=\"/osint-reports/$SLUG/\"" "$INDEX"
}

@test "FNO-008: briefing is the first report card in the grid" {
  # the pinned featured report sits above .reports-grid by design; check the grid itself
  first="$(sed -n '/class="reports-grid"/,$p' "$INDEX" | grep -o 'href="/osint-reports/[^"]*/"' | head -1)"
  [ "$first" = "href=\"/osint-reports/$SLUG/\"" ]
}

@test "FNO-009: network contractor is named (requester decision, v3)" {
  grep -q 'L3Harris' "$PAGE"
}

@test "FNO-010: live social feeds carrying withheld names are not linked" {
  ! grep -q 'href="https://www.reddit.com/r/FAA' "$PAGE"
}

@test "FNO-V3-1: page carries a 'What changed in v3' panel" {
  grep -q 'id="v3-changes"' "$PAGE"
  grep -q 'What changed in v3' "$PAGE"
  ! grep -q 'What changed in v2' "$PAGE"
}

@test "FNO-V3-2: page title, event date and report card are labeled v3" {
  grep -q '<title>Flash Briefing v3' "$PAGE"
  grep -q 'class="event-date">[^<]*Flash Briefing v3' "$PAGE"
  sed -n '/aria-labelledby="faa-ground-stop-title"/,/<\/article>/p' "$INDEX" | grep -q 'Flash Briefing v3'
}

@test "FNO-V3-3: v3 information cutoff is stated" {
  grep -q '6:07 PM ET' "$PAGE"
  grep -q '23:07 UTC' "$PAGE"
  grep -q '12:10 PM ET' "$PAGE"
}

@test "FNO-V3-4: contractor and router makers are named; stale non-naming lines are gone" {
  grep -q 'L3Harris' "$PAGE"
  grep -q 'Juniper' "$PAGE"
  grep -q 'Cisco' "$PAGE"
  grep -q 'Harris Corp' "$PAGE"
  ! grep -Eqi 'does not name it|do not repeat company names|not name the (network )?contractor' "$PAGE"
}

@test "FNO-V3-5: withheld parties stay withheld (no live r/FAA link, no SMART developer name)" {
  ! grep -Eq 'href="https?://(www\.|old\.)?reddit\.com/r/FAA' "$PAGE"
}

@test "FNO-V3-6: no em dash as character, named entity or numeric entity" {
  ! grep -q $'\xe2\x80\x94' "$PAGE"
  ! grep -q $'\xe2\x80\x94' "$INDEX"
  ! grep -Eqi '&m[d]ash;|&#8212;|&#x2014;' "$PAGE" "$INDEX"
}

@test "FNO-V3-7: every in-text [N] citation has a matching source id" {
  nums="$(sed '/id="sources"/,$d' "$PAGE" | grep -oE '\[[0-9][0-9, -]*\]' | tr -d '[] ' | tr ',' '\n' | awk -F- 'NF==2{for(i=$1;i<=$2;i++)print i;next}{print}' | sort -un)"
  [ -n "$nums" ]
  for n in $nums; do
    grep -q "id=\"src-$n\"" "$PAGE" || { echo "missing src-$n"; return 1; }
  done
}

@test "FNO-V3-8: New York Times story section present with scoping note" {
  grep -q 'id="nyt"' "$PAGE"
  grep -qi 'paywall' "$PAGE"
}

@test "FNO-V3-9: key assessments KA-5 held at unlikely, KA-6 very unlikely" {
  grep -Eq 'KA-5:[^<]*Unlikely; moderate confidence' "$PAGE"
  grep -Eq 'KA-6:[^<]*Very unlikely; moderate confidence' "$PAGE"
}

@test "FNO-V3-10: every table header cell declares a scope" {
  ! grep -E '<th>' "$PAGE"
}
