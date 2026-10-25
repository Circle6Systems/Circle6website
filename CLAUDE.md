---
title: Project Standards
scope: Development workflow, architecture, and coding standards
last_updated: 2026-03-27
---

# CLAUDE.md -- Project Standards

These instructions govern all development work in this repository. They are mandatory and override default behavior.

---

## Project Overview

Company website for Circle 6 Systems -- strategic technology consulting for government and public-serving organizations. Static site hosted on GitHub Pages.

- **Live site:** https://circle6systems.com
- **GitHub org:** circle6systems
- **Visibility:** Public (required for free GitHub Pages hosting)

---

## Development Workflow

**All work must follow this sequence -- no exceptions.**

1. **Work items first.** Every code change must map to a documented ADO work item. Work items live in ADO project `c6s-firm-internal` (User Story or Bug). Never open GitHub issues. The work item must include a remediation/implementation plan before any code is written. Do not write code for work that isn't tracked in a work item.
2. **Tests before code.** Write tests for the expected behavior before writing implementation code (TDD). If the repo has no test infrastructure, set it up as the first task before any feature work.
3. **Plan, then implement.** Use plan mode to design the approach, get alignment, then execute. Do not start coding without a plan for non-trivial work.

---

## Branching & Commits

- Create feature branches from `main` (e.g., `feature/new-service-page`, `fix/mobile-nav`)
- One commit per work item for clean history, referencing it as `ADO #NNNN`
- Write concise commit messages that explain the "why", not just the "what"
- PR back to `main` when work is complete; do not merge without review

---

## Work Item Standards

Every ADO work item must include:

- **Problem/Objective**: What needs to change and why
- **Location**: Files, functions, or components affected
- **Implementation Plan**: Step-by-step remediation or implementation approach
- **Testing**: Specific test cases to write before implementation
- **Verification**: How to confirm the fix/feature works end-to-end

---

## Code Quality

- Do not write code without reading the existing codebase first
- Follow existing patterns and conventions in the repo
- This is a static site with no external dependencies. Keep it that way.
- Main site is in `index.html` (self-contained). Product pages are in `products/`. Training content is in `training/`.
- Security headers (CSP, HSTS, X-Frame-Options, Permissions-Policy) are set in HTML. Do not weaken them.
- Mobile-first responsive design with 3 breakpoints. Test all changes on mobile.
- Validate inputs at system boundaries
- Do not add features, refactoring, or "improvements" beyond what the work item specifies
- Keep solutions simple -- the right amount of complexity is the minimum needed

---

## Architecture Notes

- **No build tools.** HTML/CSS/vanilla JS only. No bundlers, frameworks, or npm for the site.
- **No external dependencies.** No CDN links, no analytics, no third-party scripts.
- **GitHub Pages deployment.** Push to `main` deploys automatically.
- **Custom domain:** `circle6systems.com` with HTTPS enforced.

---

## Documentation

- `docs/styleguide.md` -- Visual style guide (colors, typography, components, layout patterns). This is a local, untracked file on the maintainer's machine (`docs/` is gitignored except `docs/status/`), so it is not in the repo and may be absent in a fresh clone. Do not treat it as an in-repo authoritative reference; ask the user if you need it.
- `docs/status/` -- Status reports, session summaries, and lessons learned (date-prefixed)
- Do not create documentation files unless explicitly requested
- Keep CLAUDE.md up to date as the project evolves

## End-of-Session Documentation

Before closing any work session, complete these steps:

1. **Status file.** Write a date-prefixed summary to `docs/status/` covering: what was done, decisions made, what's left, and lessons learned.
2. **Commit, then give the user the push command.** Agents do not push, merge, or complete PRs. All changes (including status docs) must be committed so no work is left uncommitted.
3. **Verify clean state.** Run `git status` to confirm no uncommitted changes.

---

## What NOT to Do

- Do not write code for work that isn't tracked in an ADO work item
- Do not open GitHub issues
- Do not write implementation code before tests
- Do not skip the plan-first workflow for non-trivial changes
- Do not push to `main` directly -- use feature branches and PRs
- Do not introduce external dependencies or CDN links
- Do not weaken Content Security Policy or other security headers
