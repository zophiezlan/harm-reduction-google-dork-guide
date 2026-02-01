# Temporal Intelligence & Archive Diving

> Search across time. Find archived content, deleted pages, policy evolution, historical documents, and content that's been moved or removed. This pack teaches you to think *temporally* about content discovery.

[← Back to Dork Packs](README.md) | [← Main Guide](../README.md)

---

## ⚡ Quick Start

Find archived harm reduction content on the Wayback Machine:

```txt
site:web.archive.org "harm reduction" (Australia OR Australian)
```

---

## 🟢 Basic Queries

### Internet Archive - Wayback Machine

Find preserved snapshots of harm reduction resources.

```txt
site:web.archive.org "harm reduction" filetype:pdf
```

**Why this works:**

- Archive.org preserves millions of web pages over time
- PDFs are often preserved intact with full content
- Catches resources that may no longer exist on original sites

### Recent Content Only

Find content published in the last year.

```txt
site:*.gov.au "harm reduction" after:2024-01-01
```

**Why this works:**

- `after:` operator limits to recent content
- Good for finding current policies and recent publications
- Filters out outdated information

### Historical Deep Dive

Find older foundational documents.

```txt
site:*.gov.au "harm reduction" before:2015
```

**Why this works:**

- `before:` operator finds historical content
- Useful for tracing policy origins
- Finds foundational documents and early research

---

## 🟡 Intermediate Queries

### Decade-Specific Research

Find content from specific time periods.

```txt
"harm reduction" (Australia OR Australian) 2000..2010
```

**Why this works:**

- Number range operator (`..`) finds content mentioning years in that range
- Useful for historical research and policy evolution
- Catches documents that reference specific time periods

### Cached/Recent Versions

Find Google's cached versions of pages.

```txt
cache:aivl.org.au
```

**Why this works:**

- Shows Google's most recent cached snapshot
- Useful when a site is temporarily down
- Can reveal recent changes to content

### Archive.org Specific Site Archives

Find all archived versions of a specific site.

```txt
site:web.archive.org/web/*/aivl.org.au
```

**Why this works:**

- Targets archived snapshots of a specific domain
- Shows content evolution over time
- Finds pages that may have been removed

### Policy Version Tracking

Find different versions of the same policy.

```txt
"National Drug Strategy" (2010 OR 2017 OR 2023) filetype:pdf
```

**Why this works:**

- Finds multiple iterations of policy documents
- Useful for comparative analysis
- Tracks policy evolution over time

### Finding Superseded Guidelines

```txt
site:*.gov.au "harm reduction" ("superseded" OR "replaced by" OR "archived" OR "historical")
```

**Why this works:**

- Finds documents explicitly marked as outdated
- Useful for understanding what's changed
- Locates legacy guidance documents

---

## 🔴 Advanced Queries

### Comprehensive Archive Sweep

Find all archived Australian harm reduction content.

```txt
site:web.archive.org ("harm reduction" OR "needle exchange" OR "naloxone") (Australia OR *.gov.au OR *.org.au)
```

**Why this works:**

- Broad search across all archived Australian content
- Multiple harm reduction terms for comprehensive coverage
- Catches content from any Australian domain

### Deleted Government Pages

Find government content that's no longer on the main site.

```txt
site:web.archive.org/web/*/health.gov.au "harm reduction"
```

**Why this works:**

- Specifically targets archived government health pages
- Finds removed policies, announcements, or resources
- Useful for accountability research

### Before/After Policy Changes

Find content from before and after major policy shifts.

```txt
"drug policy" Australia (before:2016 OR after:2020) filetype:pdf
```

**Why this works:**

- Brackets time periods around policy changes
- Useful for impact analysis
- Finds pre and post-reform content

### Finding Removed Reports

```txt
site:web.archive.org filetype:pdf "harm reduction" "annual report"
```

**Why this works:**

- Annual reports are often archived then removed
- PDFs preserved intact in archives
- Good for longitudinal organizational analysis

### Historical News Coverage

Find historical media coverage of harm reduction.

```txt
site:web.archive.org (site:abc.net.au OR site:smh.com.au OR site:theage.com.au) "safe injecting" OR "pill testing"
```

**Why this works:**

- Major news sites often remove old articles
- Archive preserves historical coverage
- Useful for media analysis and timeline building

### Early Web Era Content

Find early harm reduction web content (1990s-2000s).

```txt
site:web.archive.org/web/199*/  OR site:web.archive.org/web/200*/ "harm reduction" Australia
```

**Why this works:**

- Targets specific decades in the archive
- Finds pioneering harm reduction content
- Historical research gold

### Organizational History

Track how organizations have evolved.

```txt
site:web.archive.org/web/*/nuaa.org.au "about" OR "history" OR "mission"
```

**Why this works:**

- Finds archived "about" pages over time
- Shows how organizations describe themselves differently
- Tracks mission and scope changes

---

## 📅 Time-Based Operator Reference

### Date Operators

| Operator | Example | What It Does |
| -------- | ------- | ------------ |
| `after:YYYY-MM-DD` | `after:2024-01-01` | Content indexed after date |
| `before:YYYY-MM-DD` | `before:2020-12-31` | Content indexed before date |
| `YYYY..YYYY` | `2015..2020` | Content mentioning years in range |

### Combining Date Filters

**Last 6 months:**

```txt
"harm reduction" after:2024-07-01
```

**Specific year:**

```txt
"harm reduction" after:2023-01-01 before:2023-12-31
```

**Excluding recent (finding older content):**

```txt
"harm reduction" before:2020
```

---

## 🏛️ Archive Platform Reference

### Internet Archive (archive.org)

| Pattern | Purpose |
| ------- | ------- |
| `site:web.archive.org` | General Wayback Machine search |
| `site:web.archive.org/web/*/example.com` | All snapshots of specific site |
| `site:web.archive.org/web/2020*/` | Snapshots from specific year |
| `site:archive.org/details/` | Archive.org collections (books, media) |

### Other Archive Sources

| Pattern | Purpose |
| ------- | ------- |
| `site:trove.nla.gov.au` | National Library of Australia archives |
| `site:pandora.nla.gov.au` | Australian web archive (PANDORA) |
| `site:webarchive.org.uk` | UK Web Archive |
| `site:webarchive.loc.gov` | Library of Congress web archive |

---

## 🔬 Research Strategies

### Policy Evolution Tracking

1. Find earliest reference to a policy
2. Search archive for intermediate versions
3. Compare current with historical

```txt
"National Drug Strategy" site:web.archive.org
"National Drug Strategy" site:*.gov.au
```

### Organization Timeline Building

1. Search archived versions of org website
2. Look for "annual report" or "history" pages
3. Compare mission statements over time

```txt
site:web.archive.org/web/*/aivl.org.au "annual report"
site:web.archive.org/web/*/aivl.org.au "about us"
```

### Finding Deleted Content

1. If a resource was referenced but link is broken
2. Take the URL and search archive.org
3. Or search for the document title in archives

```txt
site:web.archive.org "[exact document title]"
site:web.archive.org/web/*/[broken-url-domain]
```

### Before/After Analysis

1. Identify the event or policy change date
2. Search before and after with specific terms
3. Compare content, language, and resources

```txt
"pill testing" Australia before:2019
"pill testing" Australia after:2019
```

---

## 📋 Quick Copy Time Patterns

### Recent Content

```txt
after:2024-01-01
```

### Historical Content

```txt
before:2015
```

### Specific Decade

```txt
2010..2020
```

### Archive Platforms

```txt
site:web.archive.org OR site:trove.nla.gov.au OR site:pandora.nla.gov.au
```

### Archived Australian Content

```txt
site:web.archive.org (*.gov.au OR *.org.au OR *.edu.au)
```

---

## 💡 Advanced Techniques

### Recovering Broken Links

If you have a broken link like `https://health.gov.au/missing-page`:

```txt
site:web.archive.org/web/*/health.gov.au/missing-page
```

### Finding All Versions of a Document

```txt
site:web.archive.org "[exact document title]" filetype:pdf
```

### Tracking URL Changes

Organizations often restructure. Find where content moved:

```txt
site:web.archive.org "[document title or unique phrase]"
```

Then compare with current:

```txt
"[document title or unique phrase]" site:*.gov.au
```

### Seasonal/Annual Patterns

Find annual reports or recurring publications:

```txt
"annual report" "harm reduction" (2020 OR 2021 OR 2022 OR 2023 OR 2024)
```

---

## ⚠️ Considerations

- **Archive Coverage:** Not everything is archived; coverage varies by site and time
- **Date Accuracy:** `after:/before:` reflect Google's index date, not publication date
- **Archive.org Access:** Some archived content may be excluded by robots.txt
- **Context Matters:** Historical content should be understood in its original context
- **Link Rot:** Many older links won't work; archives are your friend

---

## 🔗 Related Resources

- **Operator Guide:** [Core Operators](../02-core-operators.md) - Date operator syntax
- **Related Packs:** [Research](research.md), [Policy & Advocacy](policy-advocacy.md)
- **External:** [Wayback Machine](https://web.archive.org), [Trove](https://trove.nla.gov.au)

---

[← Back to Dork Packs](README.md)
