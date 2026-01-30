# Advanced Operators & Techniques

> Power user techniques for precision searching and creative discovery.

[← Back to Main Guide](README.md) | [← Core Operators](02-core-operators.md) |
[Next: Domain Map →](04-domain-map.md)

---

## 🔬 Advanced Operators

### `AROUND(n)` - Proximity Search

Find words that appear within n words of each other. Useful when documents don't use your exact
phrase.

> [!TIP] `AROUND(n)` is particularly powerful for harm reduction searching because official
> documents often use different word orders than you might expect.

```txt
"naloxone" AROUND(5) "program"
```

Finds: "program for the distribution of naloxone", "naloxone distribution program", etc.

```txt
"drug checking" AROUND(8) evaluation
"peer worker" AROUND(10) supervision
"harm reduction" AROUND(5) festival
```

**When to use:** When exact phrase matching returns zero results but you know the concepts should
appear together.

---

### `allintitle:` - Multiple Title Terms

Force multiple words into the page title. Very restrictive but high precision.

```txt
allintitle: drug alert opioid NSW
allintitle: harm reduction guideline 2024
allintitle: peer worker training
```

> [!NOTE] No colon after `allintitle`, uses spaces between terms.

---

### `allinurl:` - Multiple URL Terms

Force multiple words into the URL path.

```txt
allinurl: publications naloxone pdf
allinurl: alerts drug health
allinurl: submissions harm reduction
```

---

### `related:` - Similar Sites

Find websites similar to a known good source.

```txt
related:ndarc.med.unsw.edu.au
related:aivl.org.au
related:penington.org.au
```

**Use case:** Discover new research centres or organisations you didn't know about.

---

### `cache:` - Cached Versions

View Google's cached version of a page.

```txt
cache:health.gov.au/some-policy-page
```

> [!NOTE] Google is phasing out this feature, but it still works in some regions. For more reliable
> archiving, use [Wayback Machine](https://web.archive.org).

---

### `define:` - Quick Definitions

Get dictionary definitions quickly.

```txt
define:naloxone
define:pharmacotherapy
define:buprenorphine
```

**Limited HR use:** Useful for quick term lookups, but not for finding documents.

---

### `info:` - Page Information

Get information about a specific URL.

```txt
info:health.nsw.gov.au
```

Shows: Cached version, similar pages, pages linking to it.

---

### `source:` - Google News Source Filter

Filter news results by publication source.

```txt
source:abc.net.au "drug policy"
source:theguardian.com "harm reduction" australia
```

> [!NOTE] Only works in Google News.

---

### `@` - Social Media Search

Search within social platforms.

```txt
@twitter "harm reduction" australia
@reddit "drug checking"
```

---

### `#` - Hashtag Search

Find hashtag mentions.

```txt
#harmreduction australia
#pilltest festival
#naloxone
```

---

### `imagesize:` - Image Dimensions

Find images of specific sizes. Useful for infographics.

```txt
imagesize:1920x1080 "harm reduction" infographic
imagesize:800x600 "overdose prevention"
```

---

## 🎨 Advanced Combination Patterns

### Pattern 1: Nested OR Groups

Combine multiple synonym groups:

```txt
site:*.gov.au (naloxone OR narcan OR nyxoid) (program OR scheme OR initiative) filetype:pdf
```

### Pattern 2: Stacked Exclusions

Progressive noise removal:

```txt
"peer worker" training
  -jobs -careers -vacancy -position
  -site:seek.com.au -site:indeed.com
  -site:researchgate.net
  filetype:pdf
```

### Pattern 3: Multi-Domain OR with Topic

```txt
(site:nuaa.org.au OR site:aivl.org.au OR site:hrvic.org.au OR site:quihn.org)
  "peer support" OR "peer supervision"
  filetype:pdf
```

### Pattern 4: Directory Mining

Find unlisted files in publication directories:

```txt
site:*.gov.au inurl:"/publications/" filetype:pdf "harm reduction" -inurl:html
site:*.gov.au inurl:"/uploads/" filetype:pdf "drug"
site:*.gov.au inurl:"/assets/" filetype:pdf "overdose"
```

### Pattern 5: Wildcard Phrase Expansion

```txt
"drug * service" site:*.gov.au
"* harm reduction" festival
"needle * program" guidelines
"peer * worker" training
```

---

## 🕵️ Investigative Techniques

> [!CAUTION] **Ethical Framework Required.** These techniques can find sensitive information. Always
> ensure your search serves a legitimate harm reduction purpose and does not target personal or
> identifiable information. See [Investigative Searching](dork-packs/investigative.md) and
> [Security Guidelines](https://github.com/zophiezlan/harm-reduction-google-dork-guide/blob/main/SECURITY.md)
> for the full ethical framework.

### Finding Draft Documents

```txt
site:*.gov.au filetype:pdf "draft" "harm reduction" -"final"
site:*.gov.au filetype:pdf "internal use only" "drug"
"working paper" OR "discussion paper" harm reduction site:*.gov.au
```

### Finding Meeting Minutes & Agendas

```txt
site:*.gov.au filetype:pdf "meeting minutes" "harm reduction"
site:*.gov.au filetype:pdf "agenda" "alcohol and other drugs" committee
"steering committee" minutes harm reduction filetype:pdf
```

### Finding Presentations

```txt
filetype:pptx OR filetype:ppt "harm reduction" Australia
filetype:pptx "drug checking" conference
inurl:presentations "alcohol and other drugs" filetype:pdf
```

### Finding Spreadsheets & Data

```txt
filetype:xlsx "harm reduction" site:*.gov.au
filetype:csv "needle syringe" OR "NSP"
filetype:xlsx "service directory" AOD
```

### Finding FOI Releases

```txt
site:*.gov.au "freedom of information" OR "FOI" "drug" filetype:pdf
site:*.gov.au inurl:foi OR inurl:freedom-of-information "harm reduction"
"disclosure log" site:*.gov.au "drug policy"
```

### Finding Tender Documents

```txt
site:*.gov.au "tender" OR "expression of interest" "harm reduction"
site:*.gov.au filetype:pdf "funding agreement" AOD
"request for tender" "alcohol and other drugs" site:*.gov.au
```

---

## 📊 File Type Deep Dive

### Unusual File Types

```txt
filetype:rtf "harm reduction" Australia
filetype:odt "drug checking"
filetype:epub "harm reduction" guide
```

### XML Sitemaps (Reveal Hidden Pages)

```txt
filetype:xml site:*.gov.au sitemap
```

### Legacy Formats

```txt
filetype:doc "harm reduction" (finds old Word documents)
filetype:xls "service directory" (finds old Excel files)
```

---

## 🔄 Operator Aliases

| Primary     | Alias  | Notes              |
| ----------- | ------ | ------------------ |
| `filetype:` | `ext:` | Identical function |
| `intitle:`  | (none) |                    |
| `inurl:`    | (none) |                    |
| `site:`     | (none) |                    |

---

## ⚠️ Operator Limitations

### Operators Google Ignores

- More than ~32 words in a query
- Some operators in combination with others
- Case variations (operators are case-insensitive)

### Operators That Don't Stack Well

- Multiple `allintitle:` or `allinurl:` in one query
- More than 2-3 `site:` OR combinations

### Deprecated/Unreliable Operators

> [!WARNING] These operators may not work reliably or at all.

- `cache:` - Being phased out
- `link:` - No longer works
- `+` (force inclusion) - Deprecated

---

## 🧪 Testing Your Queries

### Start Simple, Add Complexity

```txt
# Step 1: Base search
"drug checking" Australia

# Step 2: Add domain
"drug checking" site:*.gov.au

# Step 3: Add format
"drug checking" site:*.gov.au filetype:pdf

# Step 4: Add date
"drug checking" site:*.gov.au filetype:pdf after:2023

# Step 5: Add specificity
"drug checking" site:*.gov.au filetype:pdf evaluation after:2023
```

### If No Results

1. Remove `filetype:` first
2. Loosen `site:` restriction
3. Try `AROUND(n)` instead of exact phrase
4. Check for terminology variations
5. Remove date filter

### If Too Many Results

1. Add `filetype:pdf`
2. Add `intitle:`
3. Add date filter
4. Add exclusions

---

## 📝 Complex Query Examples

### Example 1: Comprehensive Drug Alert Search

```txt
site:*.health.*.gov.au
  (intitle:"drug alert" OR intitle:"drug warning" OR intitle:"drug notification" OR intitle:"clinical safety alert")
  (opioid OR stimulant OR "novel substance" OR contamina*)
  after:2024-01-01
  filetype:pdf
```

### Example 2: Peer Workforce Development Sweep

```txt
("peer worker" OR "peer support" OR "lived experience")
  (supervision OR framework OR competencies OR training)
  filetype:pdf
  site:*.org.au OR site:*.gov.au
  -jobs -careers
  after:2020
```

### Example 3: International Best Practice Comparison

```txt
("drug consumption room" OR "supervised consumption" OR "safe injection")
  (evaluation OR effectiveness OR outcomes)
  (Canada OR Europe OR Switzerland)
  filetype:pdf
  -site:*.au
```

---

## 🔗 Related Resources

- [Core Operators](02-core-operators.md) - Essential operators
- [Synonym Blocks](05-synonym-blocks.md) - Reusable term groups
- [Investigative Searching](dork-packs/investigative.md) - Ethical deep searching
- [OSINT Tools](tools/osint.md) - Advanced investigation tools

---

[← Core Operators](02-core-operators.md) | [Domain Map →](04-domain-map.md)
