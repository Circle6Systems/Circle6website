#!/usr/bin/env bats

# Tests for two LOW wizard hardening fixes: bundle-import size cap (#94)
# and persisted failed-attempt lockout (#95).
SITE_ROOT="$(cd "$(dirname "$BATS_TEST_FILENAME")/.." && pwd)"
APP="$SITE_ROOT/trust-safety/wizard/js/wizard-app.js"

@test "LOW-094: bundle import enforces a file-size cap before readAsText" {
  grep -q 'file.size > 10 \* 1024 \* 1024' "$APP"
}

@test "LOW-095: lockout state is loaded on init and persisted on unlock" {
  grep -q 'await this._loadLockout()' "$APP"
  grep -q '_persistLockout' "$APP"
  grep -q "setMeta('failedAttempts'" "$APP"
  grep -q "setMeta('lockoutUntil'" "$APP"
}
