# Migration Proposal: Practical Enhancements for the Dork Explorer

## Executive Summary

This proposal focuses on **three high-impact improvements** that solve real problems without
over-engineering:

1. **Structured Pack Metadata** — Replace brittle regex inference with explicit YAML frontmatter
2. **Variable Templates** — Let users customize queries for their jurisdiction/context
3. **Multi-Engine Support** — Carefully curated alternative search engines

These changes improve reliability, usability, and flexibility while preserving the excellent
existing documentation and Explorer experience.

---

## The Problem Today

### 1. Fragile Data Pipeline

The current `build-dorkbase.js` script (21KB) uses regex to infer metadata from markdown:

```javascript
// Current approach: guess difficulty from emoji
if (heading.includes("🟢")) difficulty = "beginner";
if (heading.includes("🟡")) difficulty = "intermediate";
// What if someone uses different emoji? Data breaks silently.
```

This works until it doesn't. Changes to markdown formatting can silently corrupt the Explorer data.

### 2. No Query Customization

Every dork is hardcoded. A NSW-focused query like:

```txt
"drug alert" site:health.nsw.gov.au
```

Can't be adapted for Victoria without manually creating a duplicate.

### 3. Google-Only

Users in organizational contexts may prefer or require alternative engines. The current system
offers no choice.

---

## What We're NOT Doing

Before diving in, let me be clear about what this proposal **avoids**:

- **No new file format** — We won't create `.dork` files. The existing markdown is excellent
  documentation. We'll enhance it with structured metadata instead of replacing it.
- **No complex include system** — The `@include` directive adds tooling complexity for marginal
  benefit when copy-paste works fine.
- **No breaking changes** — Everything is additive. The Explorer continues working throughout
  migration.
- **No feature creep** — Each proposed feature solves a documented user need, not a theoretical one.

---

## Proposed Changes

### Phase 1: Structured Pack Metadata (High Impact, Low Risk)

**Problem:** Pack metadata is inferred from markdown structure, making it fragile and limited.

**Solution:** Add YAML frontmatter to markdown files.

#### Before (current drug-alerts.md)

```markdown
# Drug Alerts & Warnings

> Queries for finding public drug alerts...

## 🟢 Basic Queries
```

#### After (with frontmatter)

```markdown
---
id: drug-alerts
title: Drug Alerts & Warnings
category: Core Services
difficulty: beginner
domains: [government, health]
tags: [alerts, warnings, safety, public-health]
audience: [harm-reduction-workers, health-services]
icon: "⚠️"
sortOrder: 1
variables:
  - name: JURISDICTION
    default: nsw
    options: [nsw, vic, qld, sa, wa, tas, nt, act, federal]
    description: Australian state/territory
  - name: YEAR
    default: "2024"
    description: Year for date-filtered searches
---

# Drug Alerts & Warnings

> Queries for finding public drug alerts...
```

#### Implementation

1. Update `build-dorkbase.js` to parse YAML frontmatter (use `gray-matter` package)
2. Fall back to regex inference when frontmatter is missing (backward compatible)
3. Add TypeScript types for frontmatter schema
4. Migrate packs incrementally — no big-bang required

#### Benefits

- Explicit metadata = no silent failures
- Variables defined per-pack where they make sense
- Searchable, filterable metadata
- Documentation and data stay together
- Git-friendly (plain text)

---

### Phase 2: Variable Template System (High Impact, Medium Effort)

**Problem:** Users can't adapt queries for their context without manual editing.

**Solution:** A simple variable substitution system in the Explorer UI.

#### How It Works

1. **Pack-level variables** are defined in frontmatter (see above)
2. **Query syntax** uses `$VARIABLE` placeholders:

   ```txt
   "drug alert" site:health.$JURISDICTION.gov.au after:$YEAR-01-01
   ```

3. **Explorer UI** shows a variables panel when viewing packs with variables
4. **Substitution** happens at copy/export time, not in the source files

#### UI Design

```text
┌─────────────────────────────────────────────────┐
│  Drug Alerts Pack                    [⚙️ Vars]  │
├─────────────────────────────────────────────────┤
│                                                 │
│  Variables for this pack:                       │
│  ┌─────────────────────────────────────────┐   │
│  │ JURISDICTION: [NSW ▾]                   │   │
│  │ YEAR:         [2024    ]                │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  Preview:                                       │
│  "drug alert" site:health.nsw.gov.au           │
│                           ^^^                   │
│                    (highlighted substitution)   │
│                                                 │
│  [Copy] [Open in Google] [Export Pack]         │
└─────────────────────────────────────────────────┘
```

#### Variable System Implementation

1. Add `variables` field to `DorkPack` type in `types.ts`
2. Create `useVariables.ts` composable:
   - Stores user variable choices in localStorage (per-pack)
   - Provides `applyVariables(query, variables)` function
3. Update `DorkCard.vue` to substitute variables on copy/open
4. Add variables panel to pack detail view
5. Include variable state in URL for sharing

#### Variable Types (keep simple)

| Type     | UI Control  | Example             |
| -------- | ----------- | ------------------- |
| `date`   | Date picker | Date range start    |
| `select` | Dropdown    | Jurisdiction picker |
| `text`   | Input field | Custom domain       |

No complex logic, no conditionals, no computed variables. Just find-and-replace.

---

### Phase 3: Multi-Engine Support (Medium Impact, Low Effort)

**Problem:** Some users need alternatives to Google.

**Solution:** Add carefully curated engine options with ethical guardrails.

#### Allowed Engines (Curated List)

| Engine         | Use Case               | Notes                 |
| -------------- | ---------------------- | --------------------- |
| Bing           | Corporate environments | Good operator support |
| DuckDuckGo     | Privacy preference     | Limited operators     |
| Google         | Default                | Full operator support |
| Google Scholar | Academic research      | Research packs only   |

**Explicitly Excluded:**

- Shodan, Censys (infrastructure scanning — outside harm reduction scope)
- Social media search engines (privacy concerns)
- Any engine that could enable surveillance

#### Search Engine Implementation

1. Add engine selector dropdown to Explorer header
2. Store preference in localStorage
3. Map operators per engine (some don't support all operators)
4. Show compatibility warnings when operators won't work
5. Generate correct URL format per engine

#### Operator Compatibility Matrix

```typescript
const ENGINE_OPERATORS: Record<Engine, Set<string>> = {
  google: new Set(["site:", "filetype:", "inurl:", "intitle:", "after:", "before:", "OR", "-"]),
  bing: new Set(["site:", "filetype:", "inurl:", "intitle:", "OR", "-"]),
  duckduckgo: new Set(["site:", "filetype:", "OR", "-"]),
  scholar: new Set(["site:", "filetype:", "author:", "OR", "-"]),
};
```

When a query uses unsupported operators, show: "⚠️ DuckDuckGo doesn't support `intitle:` — results
may differ"

---

## What About .dork Files?

The `dorkscript-main` tool is interesting, but adopting its format wholesale creates problems:

| Concern             | Issue                                                    |
| ------------------- | -------------------------------------------------------- |
| **Duplication**     | Content would exist in both .dork and .md files          |
| **Learning curve**  | Contributors must learn new syntax                       |
| **Limited benefit** | Variables and metadata can be added to existing markdown |
| **Tooling burden**  | Need to build and maintain a parser                      |

**Recommendation:** Keep dorkscript-main as a separate CLI tool for power users who want it. Don't
make it the source of truth for the Explorer.

If demand emerges later, we can add `.dork` export from the Explorer — letting users download packs
in that format without us maintaining it as a source format.

---

## Migration Path

### Week 1-2: Foundation

- [ ] Add `gray-matter` dependency
- [ ] Update `build-dorkbase.js` to parse frontmatter
- [ ] Define frontmatter TypeScript schema
- [ ] Add frontmatter to 3-5 high-traffic packs as pilot

### Week 3-4: Variables

- [ ] Create `useVariables.ts` composable
- [ ] Add variable UI to DorkCard
- [ ] Add variables panel to pack view
- [ ] Update copy/export to apply substitutions

### Week 5-6: Engines

- [ ] Add engine selector component
- [ ] Implement URL generation per engine
- [ ] Add operator compatibility warnings
- [ ] Update export to respect engine choice

### Week 7-8: Polish & Migration

- [ ] Add frontmatter to remaining packs
- [ ] Document variable syntax for contributors
- [ ] Add validation to build process
- [ ] Update contributor guide

---

## Risks & Mitigations

| Risk                           | Likelihood | Impact | Mitigation                                                |
| ------------------------------ | ---------- | ------ | --------------------------------------------------------- |
| Breaking existing build        | Low        | High   | Frontmatter parsing is additive; regex fallback preserved |
| Engine compatibility confusion | Medium     | Low    | Clear UI warnings; sensible defaults                      |
| Scope creep                    | Medium     | Medium | Strict feature freeze after phase 3                       |
| Variable syntax errors         | Medium     | Low    | Validate at build time; show clear errors                 |

---

## Success Metrics

1. **Reliability:** Zero silent data corruption from markdown changes
2. **Usability:** 50%+ of Explorer sessions use variables (if available)
3. **Flexibility:** Non-Google usage > 5% after engine selector ships
4. **Contributor experience:** New pack creation time unchanged or improved

---

## Out of Scope (Future Consideration)

These ideas have merit but are not part of this proposal:

- **Query validation** — Lint dorks for syntax errors
- **Auto-generated docs** — Generate markdown from structured data
- **Search result preview** — Show what results might look like
- **Collaborative editing** — Multi-user pack creation
- **Analytics** — Track which dorks are most used

---

## Appendix A: Frontmatter Schema

```typescript
interface PackFrontmatter {
  // Required
  id: string; // URL-safe identifier
  title: string; // Human-readable title

  // Recommended
  category?: string; // e.g., "Core Services", "Evidence"
  difficulty?: "beginner" | "intermediate" | "advanced" | "mixed";
  domains?: string[]; // e.g., ["government", "health"]
  tags?: string[]; // Searchable keywords

  // Optional
  audience?: string[]; // Who this pack is for
  icon?: string; // Emoji for display
  sortOrder?: number; // Display ordering
  relatedPacks?: string[]; // Pack IDs for cross-linking

  // Variables (optional)
  variables?: Array<{
    name: string; // e.g., "JURISDICTION"
    description?: string; // Help text
    default?: string; // Default value
    options?: string[]; // For select-type variables
  }>;
}
```

---

## Appendix B: Variable Syntax Examples

### In Markdown Source

````markdown
---
variables:
  - name: STATE
    default: nsw
    options: [nsw, vic, qld, sa, wa, tas, nt, act]
---

### State Health Alerts

```txt
"drug alert" site:health.$STATE.gov.au
```

### In Explorer (after substitution)

```txt
"drug alert" site:health.vic.gov.au
```

### Escaping (if needed)

Use `$$` to output a literal `$`:

```txt
Price: $$50 site:example.com → Price: $50 site:example.com
```

---

## Appendix C: Build Process Changes

### Current Flow

```text
Markdown files ↓ (regex parsing) Inferred metadata + queries ↓ dork-data.json
```

### Proposed Flow

```text
Markdown files with frontmatter ↓ (gray-matter + regex fallback) Explicit metadata + inferred
metadata (merged) ↓ (validation) dork-data.json (enhanced schema)
```

### Validation Rules

1. If frontmatter exists, `id` and `title` are required
2. Variable names must be UPPER_SNAKE_CASE
3. Variable references in queries must have definitions
4. No duplicate pack IDs across all files

---

## Decision Required

**Question:** Should we proceed with this phased approach?

- **Option A:** Yes, start with Phase 1 (frontmatter) immediately
- **Option B:** Yes, but prototype all three phases before committing
- **Option C:** Modify scope (specify changes needed)
- **Option D:** Defer in favor of other priorities

---

_Proposal drafted: February 2025_ _Status: Awaiting review_
````
