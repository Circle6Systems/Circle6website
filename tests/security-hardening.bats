#!/usr/bin/env bats

SITE_ROOT="$(cd "$(dirname "$BATS_TEST_FILENAME")/.." && pwd)"

# SEC-001: No personal info in public OSINT reports
@test "SEC-001: no personal/familial references in Sandpoint reports" {
  ! grep -ri "jeff's aunt\|jeff's uncle\|jeff's family\|my aunt\|my uncle" \
    "$SITE_ROOT/osint-reports/sandpoint-2026-04-30/"
}

# SEC-002: No unpinned CDN scripts
@test "SEC-002: no unpkg.com script references" {
  ! grep -rn 'src="https://unpkg.com' "$SITE_ROOT" --include='*.html'
}

@test "SEC-002: vis-network vendored locally" {
  [ -f "$SITE_ROOT/osint-reports/sandpoint-2026-04-30/js/vis-network.min.js" ]
}

# SEC-003: All HTML pages have CSP meta tag
@test "SEC-003: all HTML files have Content-Security-Policy" {
  missing=()
  while IFS= read -r f; do
    if ! grep -qi 'Content-Security-Policy' "$f"; then
      missing+=("$f")
    fi
  done < <(git -C "$SITE_ROOT" ls-files -- '*.html')
  if [ ${#missing[@]} -gt 0 ]; then
    echo "Missing CSP: ${missing[*]}"
    return 1
  fi
}

@test "SEC-003: all HTML files have X-Frame-Options" {
  missing=()
  while IFS= read -r f; do
    if ! grep -qi 'X-Frame-Options' "$SITE_ROOT/$f"; then
      missing+=("$f")
    fi
  done < <(git -C "$SITE_ROOT" ls-files -- '*.html')
  if [ ${#missing[@]} -gt 0 ]; then
    echo "Missing X-Frame-Options: ${missing[*]}"
    return 1
  fi
}

# SEC-004: No unsafe-eval in wizard CSP
@test "SEC-004: wizard CSP does not include unsafe-eval" {
  ! grep -i "unsafe-eval" "$SITE_ROOT/trust-safety/wizard/index.html"
}

@test "SEC-004: Alpine.js CSP build exists" {
  [ -f "$SITE_ROOT/trust-safety/wizard/js/vendor/alpine.min.js" ]
}

# SEC-005: No external Google Fonts
@test "SEC-005: no fonts.googleapis.com references" {
  ! grep -rn 'fonts.googleapis.com' "$SITE_ROOT" --include='*.html' --include='*.css'
}

@test "SEC-005: local font files exist" {
  ls "$SITE_ROOT/training/dude-diligence/fonts/"*.woff2 >/dev/null 2>&1
}

# SEC-006: All wizard scripts have SRI integrity attributes
@test "SEC-006: wizard scripts have integrity attributes" {
  missing=0
  for script in crypto.js storage.js checklist.js content.js utils.js wizard-app.js; do
    if ! grep -q "integrity=.*$script\|$script.*integrity=" "$SITE_ROOT/trust-safety/wizard/index.html"; then
      echo "Missing SRI: $script"
      missing=$((missing + 1))
    fi
  done
  [ "$missing" -eq 0 ]
}

# SEC-007: No un-defanged malicious URLs in training
@test "SEC-007: no live malicious URLs in training content" {
  ! grep -rn 'http://fix-driver\.xyz' "$SITE_ROOT/training/" --include='*.html'
}

# SEC-008: security.txt exists
@test "SEC-008: security.txt exists" {
  [ -f "$SITE_ROOT/.well-known/security.txt" ]
}

@test "SEC-008: security.txt has Contact field" {
  grep -q '^Contact:' "$SITE_ROOT/.well-known/security.txt"
}

@test "SEC-008: security.txt has Expires field" {
  grep -q '^Expires:' "$SITE_ROOT/.well-known/security.txt"
}

# SEC-009: unreleased wizard is kept out of search indexes until launch (#90)
@test "SEC-009: wizard page has robots noindex" {
  grep -qiE 'name="robots"[^>]*noindex' "$SITE_ROOT/trust-safety/wizard/index.html"
}

@test "SEC-009: robots.txt disallows the wizard path" {
  grep -qE '^Disallow: /trust-safety/wizard/' "$SITE_ROOT/robots.txt"
}
