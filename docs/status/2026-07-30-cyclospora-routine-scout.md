# Cyclosporiasis daily automation: demoted to scout

**Date:** 2026-07-30 (PT)
**Issue:** #70
**Scope:** Operational change to the daily automation. No page or code changes.
**Related:** #67 / PR #68 (v19 publishing pass), #69 (test run), `docs/status/2026-07-30-cyclospora-brief-v19.md`

## Summary

The cloud routine that has driven this briefing's daily cadence since 2026-07-17 no longer drafts page edits. It now files a GitHub issue and nothing else. The reason is a confirmed environmental limit, not a behavioural one.

## The finding that forced the change

Three consecutive cycles (v16, v17, v18) each logged categorical retrieval failure and rested every finding on WebSearch snippets. Two errors reached an open PR that nearly merged:

- Indiana at approximately 954, against an IDOH dashboard reading 1,176.
- "Four concurrent unidentified-product FDA outbreaks," where FDA's own table showed two ongoing and two ended.

The initial read was that the routine's blocking claims were unreliable, because a local pass fetched 13 of 13 primary pages successfully on the first attempt. That read was wrong, and it is worth recording precisely because it was wrong.

**A test run under a revised prompt tested control hosts.** `google.com` and `wikipedia.org` failed identically to `cdc.gov`, `fda.gov` and `courtlistener.com`: proxy CONNECT rejected, HTTP 403, on every host, by both curl and WebFetch (issue #69, section 6).

**The cloud sandbox has no outbound network access at all.** Blanket session-level egress policy. Not Akamai fingerprinting, not a per-site block, not transient. "13 of 13 succeeded locally" and "nothing worked in the sandbox" are both true.

The routine was never fabricating. The actual defect was narrower and environment-independent: **publishing press figures at High confidence while unable to verify them.**

## Consequences

1. The routine cannot primary-verify anything. WebSearch snippets are its only research tool.
2. The CourtListener docket sweep cannot run there, so litigation tracking is inherently local-only. This is the mechanism that missed MDL No. 3196 for thirteen days.
3. Any draft it produces is structurally Medium confidence at best, while looking publication-ready. That combination is the hazard.

## What changed

The routine (`trig_01LtZBuFkdb82zXqqXNVPWJN`) was rewritten twice on 2026-07-30. First to fix confidence discipline and add the docket sweep; then, after the test run confirmed the egress limit, to remove drafting entirely.

Final state:

- Renamed "Cyclosporiasis briefing daily scout (report only, no edits)".
- `Write` and `Edit` removed from `allowed_tools`. The restriction is structural, not merely instructed. The prompt also forbids using Bash to write into repo files.
- Only output is a GitHub issue. No branch, no PR, no commits.
- Issue section 6 is "Recommended edits for the local pass": prose and file paths only, never a patch, each item stating what must be verified first.
- Press figures capped at Medium. High confidence requires a same-cycle direct fetch.
- Reports retrieval status every run against a neutral control host, and flags prominently if access is ever restored.
- Instructed to recommend reducing its own cadence after several consecutive NOT MATERIAL runs, and to recommend retirement if the outbreak is declared over.

Schedule, repo, model (`claude-sonnet-5`) and MCP connectors unchanged. Cron `47 0 * * *` UTC.

## Division of labour, now explicit

**The routine watches. The local `c6s-daily-brief` trigger verifies and publishes.**

The routine's value is not the nights the local pass runs, where its research is largely duplicative. Its value is the night the local pass does not run and something moves.

## Test evidence

Test run on the revised prompt (issue #69) behaved correctly on every check: NOT MATERIAL verdict with no PR created; correct PT date in the title; escalation banner at the top rather than buried; CDC figures marked Medium rather than High because they could not be fetched; inconsistent press figures for Indiana explicitly not adopted; litigation reported as a COVERAGE GAP rather than "no new litigation". It also added its own control-host test unprompted, which is what produced the egress finding.

## Lessons

1. **A wrong diagnosis can survive several correct corrections.** v15 retired the "primary pages unreachable" assumption locally and was right to. That correct local finding then licensed the inference that the routine's claims were unreliable, which was wrong. Environment-specific facts do not transfer between environments. Test the control case before generalising.
2. **The hazard was not bad research, it was well-formatted bad research.** The routine's issues were consistently useful. Its drafts were dangerous precisely because they looked finished. Removing the capability beats instructing against its misuse.
3. **Prefer structural enforcement to prompt instructions.** Removing `Write` and `Edit` is stronger than any wording.

## Next

1. Watch for the retrieval-status banner flipping to restored. That would materially change this arrangement, since the routine could verify again.
2. Revisit the daily cadence in September. CDC expects cases rising through end of August 2026.
3. Consider `claude-opus-5` for the routine if the judgment-heavy steps (FDA column semantics, materiality calls) keep going wrong. One-field change to `session_context.model`.
