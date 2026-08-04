#!/usr/bin/env bats

# Tests for primary-vault passphrase strength enforcement (issue #93).
SITE_ROOT="$(cd "$(dirname "$BATS_TEST_FILENAME")/.." && pwd)"
APP="$SITE_ROOT/trust-safety/wizard/js/wizard-app.js"
HTML="$SITE_ROOT/trust-safety/wizard/index.html"

@test "PPW-001: createPassphrase enforces a weak-passphrase guard" {
  grep -q '_isWeakPassphrase(this.passphrase)' "$APP"
}

@test "PPW-002: shared scorer exists and both callers use it" {
  grep -q '_scorePassphrase(pp)' "$APP"
  grep -q '_scorePassphrase(this.passphrase)' "$APP"
  grep -q '_scorePassphrase(this.bundlePassphrase)' "$APP"
}

@test "PPW-003: weak guard rejects common + sequential + low-score" {
  grep -q "COMMON = \[" "$APP"
  grep -q 'seq / (pp.length - 1)' "$APP"
}

@test "PPW-004: setup form shows a strength meter" {
  grep -q 'updatePassphraseStrength()' "$HTML"
  grep -q 'setup-strength-hint' "$HTML"
}
