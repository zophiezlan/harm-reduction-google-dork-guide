# Core Operators: The Essentials

> Master these operators first. They cover 90% of harm reduction search needs.

[← Back to Main Guide](README.md) | [Next: Advanced Operators →](03-advanced-operators.md)

---

## 📊 Essential Operators Reference

| Operator         | Purpose                         | Example                           |
| :--------------- | :------------------------------ | :-------------------------------- |
| `-exclude`       | Remove unwanted results         | `-jobs -careers -news`            |
| `..`             | Number/date range               | `2020..2025`                      |
| `"exact phrase"` | Match exact words in order      | `"take-home naloxone"`            |
| `*`              | Wildcard (any word)             | `"drug * service"`                |
| `after:`         | Published after date            | `after:2024-01-01`                |
| `before:`        | Published before date           | `before:2020-01-01`               |
| `filetype:`      | Find specific document types    | `filetype:pdf "harm reduction"`   |
| `intext:`        | Search body text only           | `intext:"peer worker"`            |
| `intitle:`       | Search within page titles only  | `intitle:"drug alert"`            |
| `inurl:`         | Search within URL strings       | `inurl:publications filetype:pdf` |
| `OR`             | Either term (MUST be uppercase) | `naloxone OR narcan`              |
| `site:`          | Limit to specific domain/TLD    | `site:*.gov.au "drug warning"`    |

---

## 🎯 Operator Deep Dives

### `site:` - Domain Targeting

Limit searches to specific websites or domain types.

**Basic usage:**

```txt
site:health.nsw.gov.au naloxone
```

**Wildcard for subdomains:**

```txt
site:*.gov.au "harm reduction"
```

```txt
site:*.health.*.gov.au "drug alert"
```

**Multiple domains with OR:**

```txt
site:nuaa.org.au OR site:aivl.org.au "peer support"
```

**Exclude a domain:**

```txt
site:*.gov.au -site:news.gov.au "drug policy"
```

**Common domain patterns:**

| Pattern                  | Catches                      |
| ------------------------ | ---------------------------- |
| `site:*.edu.au`          | All Australian universities  |
| `site:*.gov.au`          | All Australian government    |
| `site:*.health.*.gov.au` | All state health departments |
| `site:*.org.au`          | All Australian organisations |

---

### `filetype:` - Document Format Filter

Find specific file types instead of web pages.

**Common file types:**

| Type                              | Use For                         |
| --------------------------------- | ------------------------------- |
| `filetype:csv`                    | Raw data files                  |
| `filetype:docx` or `filetype:doc` | Word documents, templates       |
| `filetype:pdf`                    | Reports, guidelines, policies   |
| `filetype:pptx` or `filetype:ppt` | Presentations, training         |
| `filetype:xlsx` or `filetype:xls` | Spreadsheets, data, directories |

**Examples:**

```txt
filetype:pdf "needle syringe program" guidelines
```

```txt
filetype:xlsx "service directory" AOD site:*.gov.au
```

```txt
filetype:pptx "harm reduction" conference presentation
```

> [!TIP] `ext:` works the same as `filetype:` (they are aliases). Use whichever you find easier to
> remember.

---

### `"exact phrase"` - Precision Matching

Find these exact words in this exact order.

```txt
"take-home naloxone"
```

```txt
"needle syringe program"
```

```txt
"people who use drugs"
```

```txt
"drug checking trial"
```

**Without quotes:** Google finds pages with those words anywhere (often not what you want)

**With quotes:** Google finds that exact phrase only

---

### `OR` - Boolean Logic

Search for either term.

> [!IMPORTANT] `OR` **must be UPPERCASE**. Lowercase `or` is treated as a regular search term and
> will not function as a boolean operator.

```txt
naloxone OR narcan OR nyxoid
```

```txt
"harm reduction" OR "harm minimisation"
```

```txt
"pill testing" OR "drug checking"
```

**Group with parentheses:**

```txt
site:*.gov.au (naloxone OR narcan) program
```

```txt
("peer worker" OR "peer support") training filetype:pdf
```

---

### `-` Exclusions - Remove Noise

Remove unwanted results from your search.

**Common exclusions:**

```txt
peer worker -jobs -careers -vacancy -employment
```

```txt
pill testing -news -opinion -editorial
```

```txt
[ARTICLE] -site:researchgate.net -site:academia.edu
```

```txt
[PAPER] -pdfviewer -flipbook -scribd
```

## **Progressive noise removal:**

### Level 1: Remove job listings

```txt
"peer worker" training -jobs -careers
```

### Level 2: Remove aggregators

```txt
"peer worker" training -jobs -site:researchgate.net -site:academia.edu
```

### Level 3: Add document filter

```txt
"peer worker" training filetype:pdf -jobs
```

---

### `intitle:` - Title Search

Find terms in the page/document title. High precision for official documents.

```txt
intitle:"drug alert" site:*.gov.au
```

```txt
intitle:"annual report" harm reduction
```

```txt
intitle:"clinical guideline" opioid
```

**Why use it:** Page titles usually contain the main topic. `intitle:` filters out pages that merely
mention a term.

---

### `inurl:` - URL Search

Search within the URL path. Useful for finding publication directories.

```txt
inurl:publications filetype:pdf harm reduction
```

```txt
inurl:submissions drug policy
```

```txt
inurl:alerts site:*.health.*.gov.au
```

```txt
inurl:aod-services site:*.gov.au
```

**Directory mining patterns:**

```txt
site:*.gov.au inurl:/publications/ filetype:pdf
```

```txt
site:*.gov.au inurl:/uploads/ filetype:pdf
```

```txt
site:*.gov.au inurl:/documents/ filetype:pdf
```

---

### `after:` and `before:` - Date Filtering

Filter by publication/index date.

**Format:** `YYYY-MM-DD` or just `YYYY`

```txt
"drug alert" site:*.gov.au after:2024-01-01
```

```txt
"harm reduction" policy before:2020-01-01
```

```txt
"overdose" report after:2023 before:2025
```

> [!NOTE] This uses Google's index date, which approximates publication date but isn't always exact.
> For critical currency verification, always check the document's actual publication date.

---

### `..` Number Range

Search within a range of numbers (dates, figures, etc.)

```txt
"overdose deaths" Australia 2020..2025
```

```txt
"harm reduction" funding $100000..$500000
```

```txt
"festival attendance" 10000..50000
```

---

### `*` Wildcard

Matches any word. Useful when you don't know the exact phrasing.

#### drug treatment service, drug checking service

```txt
"drug * service"
```

#### festival harm reduction, community harm reduction

```txt
"* harm reduction"
```

#### needle syringe program, needle exchange program

```txt
"needle * program"
```

---

### `intext:` - Body Text Only

Search within the page body, ignoring title and URL.

```txt
intext:"peer worker" training
```

```txt
intext:"lived experience" supervision
```

---

## 🔧 Query Building Formula

Construct searches systematically:

```txt
[DOMAIN] + [FORMAT] + [TOPIC] + [SYNONYMS] + [DATE] + [EXCLUSIONS]
```

### Building Blocks

| Component      | Purpose         | Example                |
| -------------- | --------------- | ---------------------- |
| **Date**       | Currency        | `after:2024`           |
| **Domain**     | Where to search | `site:*.gov.au`        |
| **Exclusions** | Remove noise    | `-jobs -careers`       |
| **Format**     | Document type   | `filetype:pdf`         |
| **Synonyms**   | Variations      | `(naloxone OR narcan)` |
| **Topic**      | Core phrase     | `"harm reduction"`     |

### Example Build

**Goal:** Find recent NSW government guidelines on take-home naloxone

#### Start with domain

```txt
site:health.nsw.gov.au
```

#### Add format

```txt
site:health.nsw.gov.au filetype:pdf
```

#### Add topic

```txt
site:health.nsw.gov.au filetype:pdf "take-home naloxone"
```

#### Add synonyms

```txt
site:health.nsw.gov.au filetype:pdf ("take-home naloxone" OR THN)
```

#### Add date

```txt
site:health.nsw.gov.au filetype:pdf ("take-home naloxone" OR THN) after:2023
```

#### Add specificity

```txt
site:health.nsw.gov.au filetype:pdf ("take-home naloxone" OR THN) guidelines after:2023
```

---

## 📝 Operator Combination Templates

### Template 1: Recent Documents from Specific Domain

```txt
site:[domain] filetype:pdf [topic] after:[YYYY-MM-DD]
```

Example: `site:health.nsw.gov.au filetype:pdf naloxone after:2024-01-01`

### Template 2: Multi-Domain Search

```txt
(site:[domain1] OR site:[domain2]) [topic] filetype:pdf
```

Example: `(site:nuaa.org.au OR site:aivl.org.au) "peer support" filetype:pdf`

### Template 3: Clean Results (No Junk)

```txt
[topic] filetype:pdf -site:researchgate.net -site:academia.edu -news -jobs
```

Example: `"drug checking" evaluation filetype:pdf -site:researchgate.net -news`

### Template 4: Regional Service Search

```txt
site:*.gov.au [service] ([location1] OR [location2])
```

Example: `site:*.health.nsw.gov.au "needle syringe program" ("central coast" OR newcastle)`

### Template 5: Title-Focused Alert Search

```txt
site:*.health.*.gov.au intitle:"[alert type]" after:[date]
```

Example: `site:*.health.*.gov.au intitle:"drug warning" after:2024-01-01`

---

## ⚠️ Common Mistakes

> [!WARNING] These are the most frequent errors that cause searches to fail or return poor results.

| Mistake            | Problem                 | Fix                  |
| ------------------ | ----------------------- | -------------------- |
| `or` lowercase     | Treated as regular word | Use `OR` uppercase   |
| `site:gov.au`      | Misses subdomains       | Use `site:*.gov.au`  |
| No quotes          | Words found separately  | Use `"exact phrase"` |
| Too many operators | Google ignores some     | Build incrementally  |
| Wrong date format  | Doesn't filter          | Use `YYYY-MM-DD`     |

---

## 🎯 Practice Exercises

Try building these searches yourself:

1. **Find** PDF reports about drug checking from Australian universities published after 2022

2. **Find** NSW Health documents with "harm reduction" in the title

3. **Find** peer worker training resources from sector organisations, excluding job listings

<details>
<summary>Click for answers</summary>

1. Search for drug checking research:

```txt
site:*.edu.au filetype:pdf "drug checking" after:2022
```

1. Search for harm reduction pages:

```txt
site:health.nsw.gov.au intitle:"harm reduction"
```

1. Search for peer worker training:

```txt
site:*.org.au "peer worker" training filetype:pdf -jobs -careers
```

</details>

---

## 🔗 Related Resources

- [Advanced Operators](03-advanced-operators.md) - Power user techniques
- [Synonym Blocks](05-synonym-blocks.md) - Reusable term groups
- [Domain Map](04-domain-map.md) - Where to search

---

[← Quick Start](01-quick-start.md) | [Advanced Operators →](03-advanced-operators.md)
