#!/usr/bin/env bats

# Tests for the generated encrypted-bundle self-protecting CSP (issue #92).
# Source-level guards on the bundle builder in wizard-app.js; the behavioral
# proof (injected onerror/script blocked, round-trip still works) is in
# tests/wizard_bundle_csp_behavior.py (Playwright).

SITE_ROOT="$(cd "$(dirname "$BATS_TEST_FILENAME")/.." && pwd)"
APP="$SITE_ROOT/trust-safety/wizard/js/wizard-app.js"

@test "BND-001: generated bundle emits a Content-Security-Policy" {
  grep -q 'Content-Security-Policy' "$APP"
}

@test "BND-002: bundle CSP pins the decrypt script with a sha256 source hash" {
  grep -q "script-src 'sha256-" "$APP"
}

@test "BND-003: script-src carries only the hash (unsafe-inline is style-src only)" {
  # script-src must be immediately terminated by the hash + ';' with no unsafe-inline
  grep -qF "script-src 'sha256-\" + hashB64 + \"'; style-src 'unsafe-inline'" "$APP"
}

@test "BND-004: generated bundle has no inline onclick handler" {
  ! grep -q "onclick=" "$APP"
}

@test "BND-005: bundle builder is async and awaited (hash computed per bundle)" {
  grep -q 'async _buildBundleHtml' "$APP"
  grep -q 'await this._buildBundleHtml' "$APP"
}
