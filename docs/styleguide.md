# Circle 6 Systems Visual Style Guide

Reference for all pages, reports, and deliverables produced under the C6S brand. Extracted from the production site at circle6systems.com.

---

## Color Palette

### Core

| Token | Hex | Usage |
|-------|-----|-------|
| `--c6s-dark` | `#2d2a2e` | Page background |
| `--c6s-panel` | `#3a3640` | Card/panel backgrounds, table headers |
| `--c6s-border` | `#504a52` | Borders, dividers |
| `--c6s-accent` | `#a8c196` | Links, highlights, interactive elements |
| `--c6s-accent-dim` | `#8faa7b` | Button fills, strong CTAs |
| `--c6s-text` | `#d4cab9` | Body text |
| `--c6s-text-dim` | `#beb3a7` | Secondary/muted text |
| `--c6s-text-bright` | `#f5f0e8` | Headings, emphasized text |

### Semantic

| Token | Hex | Usage |
|-------|-----|-------|
| `--c6s-red` | `#ef4444` | Critical alerts, errors |
| `--c6s-amber` | `#f59e0b` | Warnings, classification labels |
| `--c6s-green` | `#22c55e` | Success, completion |

### Derived

| Pattern | Value |
|---------|-------|
| Highlight background | `rgba(168, 193, 150, 0.1)` |
| Nav background | `rgba(45, 42, 46, 0.92)` with `backdrop-filter: blur(12px)` |
| Accent border (subtle) | `rgba(143, 170, 123, 0.08)` |
| Row hover | `rgba(168, 193, 150, 0.03)` |

---

## Typography

### Font Stacks

- **Body:** `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`
- **Headings:** `Georgia, 'Times New Roman', serif`

No external web fonts. System fonts only, for performance and zero external dependencies.

### Scale

| Element | Size | Weight | Notes |
|---------|------|--------|-------|
| H1 (hero) | `clamp(2.25rem, 5.5vw, 4rem)` | 700 | Fluid responsive |
| H1 (report) | `1.75rem` | 700 | Fixed for report pages |
| H2 | `1.15rem` | 700 | Uppercase, accent underline |
| H3 | `1rem` | 600 | Accent color |
| Body | `1rem` | 400 | `line-height: 1.7` |
| Small/label | `0.75rem` | 600 | Uppercase, `letter-spacing: 0.15em` |
| Nav links | `0.875rem` | 500 | `letter-spacing: 0.02em` |

---

## Layout

- **Container max-width:** `1100px` (reports), `1200px` (main site)
- **Container padding:** `2rem` (desktop), `1.5rem` (tablet), `1.25rem` (mobile)
- **Section vertical padding:** `6rem` (main site), `2.5rem` (reports)
- **Breakpoints:** `968px`, `768px`, `480px`

---

## Components

### Navigation Bar

- Fixed top, 72px height
- Frosted glass: `rgba(45, 42, 46, 0.92)` + `backdrop-filter: blur(12px)`
- Logo: Georgia serif, "Circle **6** Systems" with "6" in accent
- Hidden on mobile (<768px); hamburger optional

### Cards

- Background: `--c6s-panel`
- Border: `1px solid` accent-tinted (6-15% opacity)
- Border radius: `8px`
- Padding: `1.25rem` to `2rem`
- Hover: border lightens, `translateY(-2px)`

### Panels (Report Components)

| Variant | Left border | Background |
|---------|-------------|------------|
| `.highlight` | `--c6s-accent` | accent 10% |
| `.warning` | `--c6s-amber` | amber 5% |
| `.critical` | `--c6s-red` | red 5% |
| `.success` | `--c6s-green` | green 5% |

Panel title: `0.85rem`, uppercase, `letter-spacing: 0.05em`, color matches variant.

### Tables

- Header: panel background, accent text, uppercase, `0.75rem`
- Header border-bottom: `2px solid --c6s-accent-dim`
- Cell padding: `0.6rem 1rem`
- Row hover: accent 3% background

### Badges

- Padding: `0.15rem 0.5rem`
- Border radius: `3px`
- Font: `0.7rem`, 700 weight, uppercase
- Variants: `-red`, `-amber`, `-green`, `-blue` (matches semantic colors with 15% bg, 30% border)

### Buttons

- Padding: `0.875rem 2rem`
- Border radius: `4px`
- Outline variant: accent border, no fill
- Filled variant: accent-bg background, dark text
- Hover: `translateY(-1px)`

---

## Header Bar (Reports/OSINT)

Used on intelligence reports and deliverables:

- Gradient background: `linear-gradient(135deg, #2d2a2e 0%, #3a3640 100%)`
- Bottom border: `2px solid --c6s-accent`
- Left: practice name (uppercase, accent, `letter-spacing: 0.15em`)
- Right: TLP classification badge

---

## Animations

- Fade-in on scroll: opacity 0 + `translateY(24px)` to visible, `0.6s ease`
- Hover transitions: `0.2s` to `0.3s`
- All animations respect `prefers-reduced-motion: reduce`

---

## Print Styles

- Nav hidden
- White background, dark text
- Panels get `#f9f9f9` background, `#ccc` borders
- Tables: light header, `#ddd` cell borders
- No transforms on hover

---

## Accessibility

- Skip-to-content links on all pages
- Focus states on all interactive elements
- ARIA labels on navigation and sections
- Color not used as sole differentiator (badges include text)
- High-contrast mode override: `prefers-contrast: more`
- Content Security Policy enforced; no external scripts or fonts

---

## Architecture Constraints

- No build tools, no bundlers, no npm
- No external CSS frameworks (no Tailwind, Bootstrap, etc.)
- All styles embedded in `<style>` tags or single-file CSS
- No CDN links, no analytics, no third-party scripts
- GitHub Pages deployment; push to `main` deploys

---

## File Reference

- Main theme: `/index.html` (lines 21-664, embedded CSS)
- OSINT report CSS: `/osint-reports/whcd-2026-04-25/style.css` (complete report theme)
- Products pages: `/products/index.html` (consistent with main)
- Training pages: `/training/` (consistent with main)

---

*This guide is the authoritative reference. When building new pages, reports, or client deliverables, start from the CSS variables and component patterns documented here rather than from scratch.*
