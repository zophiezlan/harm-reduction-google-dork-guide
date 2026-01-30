# Documentation Style Guide

> Consistent GitHub Flavored Markdown patterns for this project.

---

## GitHub Alerts

Use GitHub's built-in alert syntax for consistent, visually distinctive callouts.

### Alert Types

> [!NOTE] Supplementary information users should know.

> [!TIP] Helpful advice for better results.

> [!IMPORTANT] Essential information for success.

> [!WARNING] Potential issues requiring attention.

> [!CAUTION] Risks or negative consequences.

### When to Use Each

| Alert Type     | Use For                            | Example Context                    |
| :------------- | :--------------------------------- | :--------------------------------- |
| `[!NOTE]`      | Background context, clarifications | "Google may change this operator"  |
| `[!TIP]`       | Optional enhancements, pro tips    | "Combine with `filetype:pdf`"      |
| `[!IMPORTANT]` | Critical success factors           | "Use `OR` in uppercase only"       |
| `[!WARNING]`   | Things that could cause problems   | "May expose personal information"  |
| `[!CAUTION]`   | Ethical/safety considerations      | "Never search for identifiable..." |

---

## Collapsible Sections

Use `<details>` for content that's optional, advanced, or lengthy.

### Basic Syntax

```markdown
<details>
<summary>Click to expand</summary>

Content goes here. **Markdown works inside.**

- Lists work
- Links work
- Everything works

</details>
```

### Common Collapsible Patterns

#### FAQ Section

```markdown
<details>
<summary><strong>Why isn't my search working?</strong></summary>

Check these common issues:

1. Ensure `OR` is uppercase
2. Verify domain syntax (`site:*.gov.au` not `site:gov.au`)
3. Remove `filetype:` if getting zero results

</details>
```

#### Advanced Content

```markdown
<details>
<summary>🔬 <strong>Advanced Techniques</strong></summary>

These queries require understanding of boolean logic...

</details>
```

#### Long Lists

```markdown
<details>
<summary>📋 <strong>Full Domain Reference</strong> (47 domains)</summary>

| Domain | Description |
| ------ | ----------- |
| ...    | ...         |

</details>
```

---

## Tables

### Alignment Conventions

| Pattern           | Alignment      | Use For                |
| :---------------- | :------------- | :--------------------- |
| `:---` (or `---`) | Left (default) | Text, descriptions     |
| `:---:`           | Center         | Status badges, icons   |
| `---:`            | Right          | Numbers, dates, counts |

### Standard Table Types

#### Navigation Tables

```markdown
| Destination                      | Description         |
| :------------------------------- | :------------------ |
| [Quick Start](01-quick-start.md) | Get started fast    |
| [Core Operators](02-core.md)     | Essential operators |
```

#### Quick Reference Tables

```markdown
| Operator    | Purpose       | Example         |
| :---------- | :------------ | :-------------- |
| `site:`     | Limit domain  | `site:*.gov.au` |
| `filetype:` | Document type | `filetype:pdf`  |
```

#### State/Jurisdiction Tables

```markdown
| State | Health Domain       | Query                            |
| :---: | :------------------ | :------------------------------- |
|  NSW  | `health.nsw.gov.au` | `site:health.nsw.gov.au "alert"` |
|  VIC  | `health.vic.gov.au` | `site:health.vic.gov.au "alert"` |
```

---

## Code Blocks

### Language Hints

Always specify language for syntax highlighting:

````markdown
```txt
site:*.gov.au "harm reduction" filetype:pdf
```
````

Use `txt` for dorks/queries, not `bash` or `shell`.

### Query Blocks with Explanations

````markdown
### Query Name

```txt
site:*.gov.au filetype:pdf "harm reduction"
```

**What this does:**

- `site:*.gov.au` → Limits to Australian government
- `filetype:pdf` → Only PDF documents
- `"harm reduction"` → Exact phrase match
````

### Live Search Links

Code blocks with dork queries automatically get an "Instant Dork" button (search icon) that opens
Google in a new tab:

````markdown
```txt
site:*.gov.au "drug alert" after:2025-01-01
```
````

The search button appears on hover next to the copy button.

---

## Headers & Navigation

### Document Header Pattern

```markdown
# Page Title

> Brief description of what this page covers.

[← Back to Section](../README.md) | [← Main Guide](../../README.md)

---
```

### Section Progression Emojis

Use these consistently to indicate difficulty/progression:

| Emoji | Meaning      | Use For                          |
| :---: | :----------- | :------------------------------- |
|  ⚡   | Quick Start  | Fastest path to results          |
|  🟢   | Basic        | Simple, no prerequisites         |
|  🟡   | Intermediate | Requires understanding of basics |
|  🔴   | Advanced     | Complex, power user content      |
|  💡   | Pro Tips     | Optional enhancements            |

### Footer Navigation

```markdown
---

[← Previous: Page Name](previous.md) | [Next: Page Name →](next.md)
```

---

## Links

### Reference-Style Links (Recommended for Maintainability)

For documents with many links, use reference style at the bottom:

```markdown
Check the [Quick Start Guide][quick-start] or browse [Dork Packs][dork-packs].

<!-- References -->

[quick-start]: ../01-quick-start.md
[dork-packs]: ../dork-packs/README.md
```

### Inline Links

For one-off links within paragraphs:

```markdown
See the [Google Alerts Guide](../tools/google-alerts.md) for setup.
```

---

## Checklists

Use task lists for verification workflows:

```markdown
## ✅ Verification Checklist

- [ ] Publication date verified
- [ ] Issuing authority confirmed
- [ ] Jurisdiction matches requirements
- [ ] Document type appropriate (guideline vs draft)
```

---

## Emphasis & Formatting

### Semantic Emphasis

| Format     | Use For                   | Example                        |
| :--------- | :------------------------ | :----------------------------- |
| **Bold**   | Key terms, important info | **Always** use uppercase `OR`  |
| _Italic_   | Emphasis, new terms       | the _actual_ document          |
| `code`     | Operators, commands, URLs | Use `site:*.gov.au`            |
| ~~Strike~~ | Deprecated/wrong approach | ~~`site:gov.au`~~ (won't work) |

### Keyboard Keys

For keyboard shortcuts, use `<kbd>`:

```markdown
Press <kbd>Ctrl</kbd>+<kbd>F</kbd> to search the page.
```

---

## Common Patterns

### "Why This Works" Explanation

```markdown
**Why this works:**

- `site:*.gov.au` → Catches all government subdomains
- `filetype:pdf` → Gets actual documents, not web pages
- `after:2024` → Filters to recent publications only
```

### Version/Compatibility Badges

> [!NOTE] This operator requires Google Search. It may not work on other search engines.

### Deprecated Content

> [!WARNING] **Deprecated:** This operator no longer works reliably as of 2025. Use [`intitle:`]
> instead.

---

## File Naming

| Type            | Pattern                  | Example                     |
| :-------------- | :----------------------- | :-------------------------- |
| Sequential docs | `NN-descriptive-name.md` | `01-quick-start.md`         |
| Topic packs     | `topic-name.md`          | `drug-alerts.md`            |
| Index/Overview  | `README.md`              | `docs/dork-packs/README.md` |
| Style/Config    | `SCREAMING_CASE.md`      | `STYLE_GUIDE.md`            |

---

## Accessibility

### Alt Text for Images

Always provide descriptive alt text:

```markdown
![Screenshot showing Google search results with drug alerts](images/alert-results.png)
```

### Semantic Structure

- Use proper heading hierarchy (don't skip levels)
- Keep tables simple; complex data should use lists
- Ensure links are descriptive (not "click here")

---

## Anti-Patterns to Avoid

| Don't Do This                     | Do This Instead                  |
| :-------------------------------- | :------------------------------- |
| `> **Note:**` manual styling      | `> [!NOTE]`                      |
| Inline HTML for simple formatting | Native markdown                  |
| `bash` for search queries         | `txt` language hint              |
| Generic "click here" links        | Descriptive link text            |
| Skip heading levels               | Proper H1 → H2 → H3 hierarchy    |
| Huge unbroken tables              | Collapsible `<details>` sections |

---

Last updated: January 2026.
