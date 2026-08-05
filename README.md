---
title: Circle 6 Systems
scope: Project overview and development guide
last_updated: 2026-03-27
---

# Circle 6 Systems

Company website for Circle 6 Systems — strategic technology consulting for government and public-serving organizations.

**Live:** [circle6systems.com](https://circle6systems.com)

## Services

- **Cyber Security** — Assessments, risk analysis, incident response, compliance, security awareness, continuity planning
- **System Design** — Enterprise architecture, infrastructure design, scalability planning, disaster recovery, tech roadmaps
- **System Integration** — Legacy modernization, data integration, API design, cloud migration
- **Custom Development** — Workflow automation, reporting platforms, portals, dashboards

## Industries

- **Government** — State agencies, county/municipal, tribal nations, public safety, health, transportation
- **Enterprise** — Mid-market, regulated industries, critical infrastructure operators

## Tech Stack

Single-page static site with no external dependencies:

- HTML5 / CSS3 / Vanilla JavaScript
- Responsive design (mobile-first, 3 breakpoints)
- Intersection Observer API for scroll animations
- Security headers (CSP, HSTS, X-Frame-Options, Permissions-Policy)
- Hosted on GitHub Pages

## Development

Edit `index.html` directly — the entire site is self-contained in one file.

```bash
# Preview locally (any static server)
python3 -m http.server 8000
# or
npx serve .
```

Push to `main` to deploy via GitHub Pages.

## Design

| Token | Hex | Usage |
|-------|-----|-------|
| Navy | `#0a192f` | Primary background |
| Slate | `#8892b0` | Body text |
| White | `#e6f1ff` | Headings |
| Accent | `#64ffda` | CTAs, highlights |
