#!/usr/bin/env bats

# Dude Diligence character consistency: Duke is an original character with one
# look. No named actors, films, TV or comic characters, no retired costume cues,
# and portrait alt text must describe what the image actually shows.

SITE_ROOT="$(cd "$(dirname "$BATS_TEST_FILENAME")/.." && pwd)"
DD="$SITE_ROOT/training/dude-diligence"

@test "DD-001: no named-character or retired-costume terms in Dude Diligence HTML" {
  run grep -rniE --include='*.html' \
    'lebowski|superman|gilfoyle|mr\.? rogers|sunglasses|cardigan|sweater' "$DD"
  if [ "$status" -eq 0 ]; then
    echo "$output"
    return 1
  fi
}

@test "DD-002: canonical portrait file exists and is a PNG" {
  [ -f "$DD/img/dude-portrait.png" ]
  run file "$DD/img/dude-portrait.png"
  [[ "$output" == *"PNG image data"* ]]
}

@test "DD-003: every dude-portrait.png img has non-empty alt text" {
  run python3 -I - "$DD" <<'PY'
import re, sys, pathlib
bad, seen = [], 0
for f in pathlib.Path(sys.argv[1]).rglob("*.html"):
    for tag in re.findall(r"<img\b[^>]*>", f.read_text(encoding="utf-8"), re.I):
        if "dude-portrait.png" not in tag:
            continue
        seen += 1
        m = re.search(r'\balt="([^"]*)"', tag, re.I)
        if not m or not m.group(1).strip():
            bad.append(f"{f}: {tag}")
print(f"checked {seen} portrait imgs")
if bad or seen == 0:
    print("\n".join(bad)); sys.exit(1)
PY
  echo "$output"
  [ "$status" -eq 0 ]
}

@test "DD-004: portrait alt text does not mention items absent from the image" {
  run python3 -I - "$DD" <<'PY'
import re, sys, pathlib
banned = re.compile(r"coffee|mug|desk|lanyard|sunglasses|cardigan", re.I)
bad = []
for f in pathlib.Path(sys.argv[1]).rglob("*.html"):
    for tag in re.findall(r"<img\b[^>]*>", f.read_text(encoding="utf-8"), re.I):
        if "dude-portrait.png" not in tag:
            continue
        m = re.search(r'\balt="([^"]*)"', tag, re.I)
        if m and banned.search(m.group(1)):
            bad.append(f"{f}: {m.group(1)}")
if bad:
    print("\n".join(bad)); sys.exit(1)
PY
  echo "$output"
  [ "$status" -eq 0 ]
}

# Two personas only (AB#2667): Duke Dillingham delivers the training; Dude
# Diligence appears only while an incident is live. A bare "Dude" or a
# "(... mode)" qualifier is a third persona.

@test "DD-005: no bare Dude or '(... mode)' persona in Dude Diligence HTML" {
  run python3 -I - "$DD" <<'PY'
import re, sys, pathlib
bad = []
for f in pathlib.Path(sys.argv[1]).rglob("*.html"):
    src = f.read_text(encoding="utf-8")
    text = re.sub(r"(?s)<!--.*?-->|<style\b.*?</style>", " ", src)
    text = re.sub(r"<[^>]+>", " ", text)
    text = re.sub(r"\s+", " ", text)
    for m in re.finditer(r"\bdude\b(?!\.? diligence)|\(\s*\w+ mode\s*\)|\b\w+ mode: activated", text, re.I):
        bad.append(f"{f.relative_to(sys.argv[1])}: ...{text[max(0, m.start()-40):m.end()+40]}...")
if bad:
    print("\n".join(bad)); sys.exit(1)
PY
  echo "$output"
  [ "$status" -eq 0 ]
}

@test "DD-006: fourth-wall '(to reader)' lines are spoken by Duke" {
  run grep -rnoiE --include='*.html' 'class="speaker">[^<]*\(to reader\)' "$DD"
  bad="$(echo "$output" | grep -v 'class="speaker">DUKE (to reader)' || true)"
  if [ -n "$bad" ]; then
    echo "$bad"
    return 1
  fi
}
