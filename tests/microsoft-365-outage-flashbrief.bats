#!/usr/bin/env bats

# Tests for the Microsoft 365 outage flash briefing, featured report (ADO #3048).
# Publication guardrails: house security headers, no external resources,
# accessibility basics, no internal wording, sources and labels present,
# and registration on the OSINT reports index.

SITE_ROOT="$(cd "$(dirname "$BATS_TEST_FILENAME")/.." && pwd)"
SLUG="microsoft-365-outage-2026-11-12"
DIR="$SITE_ROOT/osint-reports/$SLUG"
PAGE="$DIR/index.html"
INDEX="$SITE_ROOT/osint-reports/index.html"

@test "MSO-001: index.html exists" {
  [ -f "$PAGE" ]
}

@test "MSO-001: report folder has its own style.css" {
  [ -f "$DIR/style.css" ]
}

@test "MSO-002: Content-Security-Policy present" {
  grep -qi 'http-equiv="Content-Security-Policy"' "$PAGE"
}

@test "MSO-002: X-Frame-Options DENY present" {
  grep -qi 'X-Frame-Options" content="DENY"' "$PAGE"
}

@test "MSO-002: CSP does not allow unsafe-eval" {
  ! grep -qi 'unsafe-eval' "$PAGE"
}

# outbound <a> links to sources are fine; loaded resources are not
@test "MSO-003: no external src attributes" {
  ! grep -Eq 'src="https?://' "$PAGE"
}

@test "MSO-003: no external stylesheet links" {
  ! grep -Eq '<link[^>]+href="https?://' "$PAGE"
}

@test "MSO-004: html lang declared" {
  grep -q '<html lang="en">' "$PAGE"
}

@test "MSO-004: exactly one h1" {
  [ "$(grep -o '<h1' "$PAGE" | wc -l | tr -d ' ')" -eq 1 ]
}

@test "MSO-004: main landmark present" {
  grep -q '<main' "$PAGE"
}

@test "MSO-004: every img has alt" {
  ! grep -Eo '<img[^>]*>' "$PAGE" | grep -v 'alt='
}

@test "MSO-004: confidence bars carry a text label, not color alone" {
  bars="$(grep -o 'class="confidence-bar"' "$PAGE" | wc -l | tr -d ' ')"
  labels="$(grep -o 'class="conf-label"' "$PAGE" | wc -l | tr -d ' ')"
  [ "$bars" -eq "$labels" ]
}

@test "MSO-005: no em dash characters or entities" {
  ! grep -q $'\xe2\x80\x94' "$PAGE"
  ! grep -Eqi '&m[d]ash;|&#8212;' "$PAGE"
}

@test "MSO-006: no internal work-item, agent, or path references" {
  ! grep -Eiq 'AB#|ADO #|c6s-osint|cti-orch|cti-fusion|00-Claude|/Users/|FLASHBRIEF\.md|SOURCES\.md' "$PAGE"
}

@test "MSO-007: sources section present" {
  grep -q 'id="sources"' "$PAGE"
}

@test "MSO-007: speculation section present and labeled unverified" {
  grep -q 'id="speculation"' "$PAGE"
  grep -qi 'unverified' "$PAGE"
}

@test "MSO-007: key assessments carry confidence language" {
  grep -Eiq '(low|moderate|high) confidence' "$PAGE"
}

@test "MSO-007: times carry a zone" {
  grep -Eq '\b(ET|EST|UTC)\b' "$PAGE"
}

@test "MSO-008: report card links to the briefing" {
  grep -q "href=\"/osint-reports/$SLUG/\"" "$INDEX"
}




featured() { sed -n "/<article class=\"report-featured/,/<\/article>/p" "$INDEX"; }

@test "MSO-008: featured slot links to the Microsoft 365 briefing" {
  featured | grep -q "href=\"/osint-reports/$SLUG/\""
}

@test "MSO-008: exactly one featured report" {
  [ "$(grep -c "<article class=\"report-featured" "$INDEX")" -eq 1 ]
}

@test "MSO-009: cyclospora is no longer featured but is still listed in the grid" {
  ! featured | grep -q "/osint-reports/cyclospora-2026/"
  sed -n "/class=\"reports-grid\"/,\$p" "$INDEX" | grep -q "href=\"/osint-reports/cyclospora-2026/\""
}

@test "MSO-010: every report link aria-label starts with its visible text (WCAG 2.5.3, Bug #3047)" {
  python3 -I - "$INDEX" <<PY
import re,sys
s=open(sys.argv[1],encoding="utf-8").read()
bad=[]
for m in re.finditer(r"<a [^>]*class=\"report-link\"[^>]*aria-label=\"([^\"]*)\"[^>]*>(.*?)<svg",s,re.S):
    label,vis=m.group(1).strip(),re.sub(r"\\s+"," ",m.group(2)).strip()
    if not label.lower().startswith(vis.lower()): bad.append((vis,label))
print(bad); sys.exit(1 if bad else 0)
PY
}

