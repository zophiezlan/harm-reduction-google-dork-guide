# VitePress Enhancement Design

> Industry-leading harm reduction Google dork guide with polished UX, rich metadata, and an intuitive Dork Builder experience.

## Overview

Transform the current VitePress documentation from a static dork catalog into an interactive, customizable research tool that serves beginners through experts.

### Goals

- **Dork Builder**: Hybrid visual/text query construction tool
- **Enhanced Explorer**: Upgraded from iframe to full Vue component with favorites, filtering, keyboard nav
- **User Preferences**: Persistent settings, theme customization, export/import
- **Rich Metadata**: SEO, OpenGraph, structured data
- **Modern Polish**: Stripe/Tailwind-quality design with OSINT edge
- **Fully Responsive**: Works on tablets for field workers

---

## Architecture

### Site Structure

```
/                       → Home (hero + quick paths by role)
/guide/                 → Learning content (existing docs, reorganized)
/explorer/              → Dork Explorer (upgraded - full page, not iframe)
/builder/               → Dork Builder (new - query construction tool)
/settings/              → User preferences (new)
```

### Navigation

- **Top nav**: Home | Guide | Explorer | Builder (4 items max)
- **Command palette**: `Cmd/Ctrl+K` opens universal search
- **Contextual sidebar**: TOC in Guide, filters in Explorer/Builder
- **Breadcrumbs**: Always visible in Guide section

### Experience Modes

Global toggle (Beginner/Practitioner/Expert) affects:
- Default synonym expansion
- Tooltip verbosity
- Suggested dorks surfacing
- Builder complexity

Mode persists in localStorage.

### URL Sharing

```
/explorer?q=naloxone&pack=opioids&au=1
/builder?q=site:*.gov.au+filetype:pdf+"harm+reduction"
/builder?preset=gov-policy-search
```

---

## Dork Explorer (Upgraded)

### Layout

```
┌─────────────────────────────────────────────────────────────┐
│  [Search: "naloxone"]              [Filters ▼]  [Settings ⚙]│
├─────────────┬───────────────────────────────────────────────┤
│ PACKS       │  RESULTS (142 dorks)           [Grid│List] ↗  │
│ ○ All       │ ┌─────────────────────────────────────────┐   │
│ ● Opioids   │ │ Naloxone Distribution Programs          │   │
│ ○ Stimulants│ │ site:*.health.gov.au "naloxone" "take   │   │
│ ...         │ │ home"                                   │   │
│             │ │ [Copy] [Search] [→ Builder] [+ Favorite]│   │
│ DIFFICULTY  │ └─────────────────────────────────────────┘   │
│ ☑ Basic     │                                               │
│ ☑ Intermed  │                                               │
│ ☐ Advanced  │                                               │
│             │                                               │
│ MODIFIERS   │                                               │
│ ☐ 🇦🇺 AU Only │                                               │
│ ☐ 🏛 Gov     │                                               │
│ ☐ 📄 PDF    │                                               │
│ ☐ 📅 Recent │                                               │
└─────────────┴───────────────────────────────────────────────┘
```

### Features

| Feature | Description |
|---------|-------------|
| → Builder button | Takes any dork into the Builder for customization |
| Favorites | Star dorks, persisted locally, exportable |
| Smart search | Searches query text, titles, explanations, AND synonym expansions |
| Related dorks | Click a dork to see panel with similar queries |
| Use-case tags | Filter by intent: "policy research", "supplier finding", etc. |
| Keyboard nav | `j/k` to move, `c` to copy, `enter` to search, `b` for builder |

### Dork Card (Expanded View)

- Full explanation
- "Why use this" context
- Related dorks from same/other packs
- Modification suggestions
- Direct "Edit in Builder" action

---

## Dork Builder

### Layout

```
┌─────────────────────────────────────────────────────────────┐
│  DORK BUILDER                        [Reset] [Save] [Share] │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─ LIVE QUERY ───────────────────────────────────────────┐ │
│  │                                                        │ │
│  │  site:*.gov.au  "harm reduction"  filetype:pdf  2024+  │ │
│  │  ▔▔▔▔▔▔▔▔▔▔▔▔▔  ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔  ▔▔▔▔▔▔▔▔▔▔▔▔  ▔▔▔▔▔  │ │
│  │  [site block]   [keyword block]   [filetype]   [date]  │ │
│  │                                                        │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                             │
│       [ 🔍 Search Google ]     [ 📋 Copy Query ]            │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  + ADD BLOCK                                                │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐    │
│  │ 🌐     │ │ 📄     │ │ 💬     │ │ 📅     │ │ ⚡     │    │
│  │ Site   │ │ File   │ │ Keywords│ │ Date   │ │ Tricks │    │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘    │
├─────────────────────────────────────────────────────────────┤
│  BLOCK EDITOR (when selected)                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ SITE SCOPE                                    [× remove]│ │
│  │ ○ Australian Gov    site:*.gov.au                      │ │
│  │ ● Health Gov        site:*.health.gov.au               │ │
│  │ ○ Custom...         site:[____________]                │ │
│  │ ☑ Include subdomains (wildcard)                        │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Block Types

| Block | Options |
|-------|---------|
| 🌐 Site | Presets (.gov.au, .edu.au, .org.au, health portals) + custom + wildcard toggle |
| 📄 Filetype | PDF, DOCX, XLSX, PPT, HTML - multi-select |
| 💬 Keywords | Free text + synonym expansion toggle |
| 📅 Date | Presets (last year, 2 years, custom) using `after:`/`before:` |
| ⚡ Tricks | `intitle:`, `inurl:`, `related:`, `-exclude`, `OR` groups, `*` wildcard |

### Synonym Integration

```
┌────────────────────────────────────────────────────────────┐
│ KEYWORDS                                         [× remove]│
│                                                            │
│ Enter terms: [naloxone_____________]                       │
│                                                            │
│ 💡 Synonym expansion available          [Expand ▼]         │
│                                                            │
│ Preview: (naloxone OR narcan OR "nyxoid" OR "opioid        │
│          reversal" OR "overdose reversal")                 │
│                                                            │
│ ☑ Use synonyms   [Edit synonym group...]                   │
└────────────────────────────────────────────────────────────┘
```

---

## Settings & Preferences

### Panel Layout

```
┌─────────────────────────────────────────────────────────────┐
│  SETTINGS                                                   │
├─────────────────────────────────────────────────────────────┤
│  EXPERIENCE MODE                                            │
│  [Beginner] [Practitioner] [Expert]                         │
│                                                             │
│  BUILDER DEFAULTS                                           │
│  ☑ Auto-expand synonyms                                     │
│  ☑ Include date restriction (default: last 2 years)         │
│  ☐ Default to Australian sites only                         │
│                                                             │
│  THEME                                                      │
│  Color: [●vio][blu][tea][grn][amb][org][ros][gry]          │
│  Mode:  ○ Dark   ○ Light   ○ System                        │
│                                                             │
│  YOUR DATA                                                  │
│  Favorites: 12 dorks saved                                  │
│  Custom synonyms: 3 groups                                  │
│  [Export All (.json)]    [Import]    [Clear Data]          │
│                                                             │
│  SHARE SETUP                                                │
│  [Generate Settings Link]                                   │
└─────────────────────────────────────────────────────────────┘
```

### Data Persistence

| Data | Storage | Exportable |
|------|---------|------------|
| Experience mode | localStorage | ✓ |
| Builder defaults | localStorage | ✓ |
| Theme preference | localStorage | ✓ |
| Favorites | localStorage | ✓ |
| Custom synonyms | localStorage | ✓ |
| Recent searches | localStorage (last 50) | ✓ |

### Export Format

```json
{
  "version": 1,
  "mode": "practitioner",
  "theme": { "color": "violet", "mode": "dark" },
  "defaults": { "synonyms": true, "dateRange": "2y", "auOnly": false },
  "favorites": ["opioids-003", "stimulants-017"],
  "customSynonyms": {
    "my-terms": ["fentanyl", "fent", "carfentanil", "synthetic opioid"]
  }
}
```

---

## Visual Design System

### Color Palette

```css
/* Background */
--bg-deep:     #0a0a0f;
--bg-surface:  #12121a;
--bg-elevated: #1a1a24;

/* Text */
--text-primary:   #f4f4f5;
--text-secondary: #a1a1aa;
--text-muted:     #71717a;

/* Accent (user-selectable) */
--accent:         var(--color-violet);
--accent-hover:   color-mix(in srgb, var(--accent) 80%, white);
--accent-subtle:  color-mix(in srgb, var(--accent) 15%, transparent);

/* Semantic */
--success:  #10b981;
--warning:  #f59e0b;
--danger:   #ef4444;
--info:     #3b82f6;

/* Block Colors */
--block-site:     #6366f1;
--block-filetype: #ec4899;
--block-keyword:  #8b5cf6;
--block-date:     #14b8a6;
--block-trick:    #f59e0b;
```

### Theme Colors

| Name | Hex |
|------|-----|
| Violet | `#8b5cf6` |
| Blue | `#3b82f6` |
| Teal | `#14b8a6` |
| Green | `#10b981` |
| Amber | `#f59e0b` |
| Orange | `#f97316` |
| Rose | `#f43f5e` |
| Gray | `#71717a` |

### Typography

```css
--font-sans:  'Inter', system-ui, sans-serif;
--font-mono:  'JetBrains Mono', monospace;
```

### Micro-interactions

- Buttons: Subtle scale on hover (1.02)
- Cards: Border glow on hover
- Blocks: Smooth drag with drop shadow
- Copy: Checkmark morph + toast
- Search: Live filtering (debounced)
- Pages: Subtle fade transitions (150ms)

### Breakpoints

```css
--mobile:  < 640px;
--tablet:  640-1024px;
--desktop: > 1024px;
```

---

## Metadata & SEO

### Enhanced Frontmatter

```yaml
---
title: "Opioid Harm Reduction Dorks"
description: "Google search queries for naloxone programs and overdose prevention"
category: dork-pack
tags: [opioids, naloxone, overdose, treatment]
difficulty: intermediate
head:
  - - meta
    - property: og:image
      content: /og/dork-pack-opioids.png
---
```

### Structured Data (JSON-LD)

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Find Naloxone Distribution Programs",
  "step": [{
    "@type": "HowToStep",
    "text": "Use query: site:*.health.gov.au \"naloxone\" \"take home\""
  }]
}
```

### OpenGraph

Dynamic OG images per section type.

### Analytics

Vercel Analytics (privacy-respecting, no cookies).

---

## Component Architecture

```
docs/.vitepress/
├── config.mts
├── theme/
│   ├── index.ts
│   ├── styles/
│   │   ├── vars.css
│   │   ├── base.css
│   │   └── themes/*.css
│   │
│   ├── components/
│   │   ├── global/
│   │   │   ├── CommandPalette.vue
│   │   │   ├── ThemeSwitcher.vue
│   │   │   └── Toast.vue
│   │   │
│   │   ├── explorer/
│   │   │   ├── DorkExplorer.vue
│   │   │   ├── DorkCard.vue
│   │   │   ├── DorkDetail.vue
│   │   │   ├── FilterSidebar.vue
│   │   │   └── SearchInput.vue
│   │   │
│   │   ├── builder/
│   │   │   ├── DorkBuilder.vue
│   │   │   ├── QueryDisplay.vue
│   │   │   ├── BlockPalette.vue
│   │   │   ├── BlockEditor.vue
│   │   │   └── blocks/*.vue
│   │   │
│   │   └── settings/
│   │       ├── SettingsPanel.vue
│   │       └── ThemeSettings.vue
│   │
│   ├── composables/
│   │   ├── useSettings.ts
│   │   ├── useFavorites.ts
│   │   ├── useDorkData.ts
│   │   ├── useQueryBuilder.ts
│   │   ├── useSynonyms.ts
│   │   └── useShare.ts
│   │
│   └── utils/
│       ├── storage.ts
│       ├── query.ts
│       └── export.ts
```

### State Management

Composables with `reactive` + localStorage. No Pinia needed.

### Build Pipeline

```
npm run build
  ├─▶ build-dorkbase.js      # MD → dork-data.js
  ├─▶ build-synonyms.js      # Extract synonym groups
  ├─▶ generate-og-images.js  # Create OG images
  └─▶ vitepress build
```

---

## Implementation Phases

### Phase 1: Foundation
- [ ] Restructure to new folder layout
- [ ] CSS custom properties system with theme switcher
- [ ] Settings composable + persistence
- [ ] Command palette (Cmd+K)
- [ ] Enhanced frontmatter across all docs

### Phase 2: Explorer Upgrade
- [ ] Vue component replacing iframe
- [ ] Favorites system
- [ ] Improved filtering + search
- [ ] Keyboard navigation
- [ ] "Open in Builder" action

### Phase 3: Dork Builder
- [ ] Block-based query construction
- [ ] All 5 block types
- [ ] Synonym integration
- [ ] URL sharing
- [ ] Export options

### Phase 4: Polish
- [ ] OG image generation
- [ ] Structured data (JSON-LD)
- [ ] Light mode refinement
- [ ] Mobile optimization
- [ ] Analytics integration
- [ ] Vercel deployment config

---

## Deployment

- **Platform**: Vercel
- **Build**: `npm run build && vitepress build docs`
- **Analytics**: Vercel Analytics (privacy-respecting)
