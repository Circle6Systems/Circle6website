#!/usr/bin/env bats

# ADO Bug #3054: the OSINT report header bar must be a banner landmark
# (<header class="header-bar">), not a bare <div>, so axe-core's `region`
# rule passes. Negative checks use `if grep ...; then return 1; fi` because a
# bare `! grep` is vacuous when it is not the last line of a test (Bug #3053).

SITE_ROOT="$(cd "$(dirname "$BATS_TEST_FILENAME")/.." && pwd)"
REPORTS="$SITE_ROOT/osint-reports"

@test "OHL-001: header-bar pages exist (guards against a vacuous suite)" {
  count=$(grep -rl 'class="header-bar"' "$REPORTS" --include='*.html' | wc -l)
  [ "$count" -ge 28 ]
}

@test "OHL-002: no <div> carries class header-bar" {
  if grep -rEn '<div[^>]*class="[^"]*\bheader-bar\b' "$REPORTS" --include='*.html'; then
    return 1
  fi
}

@test "OHL-003: every class=header-bar element is a <header>" {
  files=$(grep -rl 'class="header-bar"' "$REPORTS" --include='*.html')
  [ -n "$files" ]
  for f in $files; do
    if grep 'class="header-bar"' "$f" | grep -v '<header[^>]*class="header-bar"'; then
      echo "not a <header>: $f"
      return 1
    fi
  done
}

@test "OHL-004: each header-bar page has at most one banner landmark" {
  files=$(grep -rl 'class="header-bar"' "$REPORTS" --include='*.html')
  for f in $files; do
    n=$(grep -oE '<header[ >]|role="banner"' "$f" | wc -l)
    if [ "$n" -gt 1 ]; then
      echo "duplicate banner ($n): $f"
      return 1
    fi
  done
}

@test "OHL-005: every <header> open tag is balanced by a close tag" {
  files=$(grep -rl 'class="header-bar"' "$REPORTS" --include='*.html')
  for f in $files; do
    o=$(grep -oE '<header[ >]' "$f" | wc -l)
    c=$(grep -oE '</header>' "$f" | wc -l)
    if [ "$o" -ne "$c" ]; then
      echo "unbalanced header tags in $f: $o open, $c close"
      return 1
    fi
  done
}
