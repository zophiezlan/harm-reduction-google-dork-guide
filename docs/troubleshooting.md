# Troubleshooting: When Google Fails

> Solutions for common search problems.

[← Back to Main Guide](README.md)

---

## 🔴 Zero Results?

<details open>
<summary><strong>Fix 1: Remove <code>filetype:</code> First</strong></summary>

The information might be on a webpage, not a PDF.

```txt
# Instead of:
site:*.gov.au "harm reduction" filetype:pdf

# Try:
site:*.gov.au "harm reduction"
```

</details>

<details>
<summary><strong>Fix 2: Loosen <code>site:</code> Restrictions</strong></summary>

```txt
# Instead of:
site:health.nsw.gov.au "drug checking"

# Try:
site:*.nsw.gov.au "drug checking"

# Or:
site:*.gov.au "drug checking"
```

</details>

<details>
<summary><strong>Fix 3: Swap Terminology</strong></summary>

Different documents use different terms:

| Try this                   | Instead of                 |
| :------------------------- | :------------------------- |
| `"harm minimisation"`      | `"harm reduction"`         |
| `"needle exchange"`        | `"needle syringe program"` |
| `"opioid pharmacotherapy"` | `"OAT"` or `"OST"`         |
| `"public health warning"`  | `"drug alert"`             |

</details>

<details>
<summary><strong>Fix 4: Use <code>AROUND(n)</code> for Looser Phrasing</strong></summary>

```txt
# Instead of exact phrase:
"naloxone program"

# Try proximity:
naloxone AROUND(5) program
```

</details>

<details>
<summary><strong>Fix 5: Remove Date Filter</strong></summary>

Date filtering can be imprecise.

```txt
# Instead of:
"drug checking" after:2024

# Try:
"drug checking" 2024
```

</details>

> [!TIP] **Debug technique:** Remove operators one at a time to find which one is too restrictive.

---

## 🟡 Too Many Results?

Progressive narrowing steps:

| Step | Action              | Example                                       |
| :--: | :------------------ | :-------------------------------------------- |
|  1   | Add exact phrases   | `"exact phrase"` instead of just words        |
|  2   | Add `filetype:pdf`  | `"harm reduction" filetype:pdf`               |
|  3   | Add `site:*.gov.au` | `"harm reduction" site:*.gov.au filetype:pdf` |
|  4   | Add date filter     | Add `after:2023`                              |
|  5   | Add exclusions      | Add `-news -opinion -jobs`                    |

---

## 🚫 Filtering Out Stigmatising Content

<details>
<summary><strong>Exclude Stigmatising Terms</strong></summary>

```txt
[your search] -"drug addict" -"drug abuse" -"substance abuse" -junkie
```

</details>

<details>
<summary><strong>Prioritise People-First Language</strong></summary>

```txt
"people who use drugs" OR "people who inject drugs" [your topic]
```

</details>

<details>
<summary><strong>Find Peer-Led Content (Not Just Peer-Reviewed)</strong></summary>

```txt
# Peer-reviewed (academic)
site:*.edu.au [topic] filetype:pdf

# Peer-led (lived experience)
site:*.org.au "peer-led" [topic] filetype:pdf
```

</details>

> [!NOTE] Sometimes you need stigmatising terms to find older documents. That's okay—just be aware
> of context.

---

## 🔗 Broken Link or Deleted Page?

<details open>
<summary><strong>Quick Reference: Archive Options</strong></summary>

| Option                                     | Best For                           |
| :----------------------------------------- | :--------------------------------- |
| [archive.today](https://archive.today/)    | Alternative, sometimes has more    |
| [CachedView](https://cachedview.com/)      | Searches multiple archives at once |
| [Wayback Machine](https://web.archive.org) | Most comprehensive, historical     |
| `cache:URL` in Google                      | Recent pages (being phased out)    |

</details>

### Using Wayback Machine

1. Go to [web.archive.org](https://web.archive.org)
2. Paste the broken URL
3. Browse archived versions by date

> [!WARNING] Google Cache (`cache:URL`) is being phased out and may not work reliably.

---

## ⚠️ Google Blocking Your Searches?

### CAPTCHA Appearing?

| Issue             | Solution                 |
| :---------------- | :----------------------- |
| Network flagged   | Try a different network  |
| Temporary block   | Wait and try again later |
| Too many searches | Slow down your searching |

### Results Seem Filtered?

- Try different search engines (DuckDuckGo, Brave)
- Use a VPN
- Try in private/incognito mode

---

## 📋 Query Too Complex?

> [!IMPORTANT] Google may silently ignore operators if the query is too complex.

<details>
<summary><strong>Example: Simplifying a Complex Query</strong></summary>

```txt
# Too complex (Google may ignore parts):
site:*.health.*.gov.au (intitle:"drug alert" OR intitle:"drug warning" OR intitle:"drug notification") (opioid OR stimulant OR "novel substance") after:2024 filetype:pdf -news

# Better - split into focused queries:
site:*.health.*.gov.au intitle:"drug alert" opioid after:2024 filetype:pdf
site:*.health.*.gov.au intitle:"drug warning" stimulant after:2024 filetype:pdf
```

</details>

---

## 🔍 Can't Find What You Know Exists?

<details>
<summary><strong>Search Strategies</strong></summary>

### Try Title Search

```txt
intitle:"[document title]" filetype:pdf
```

### Try Exact Document Name

```txt
"[exact document name]" site:*.gov.au
```

### Try Author/Organisation

```txt
"[author name]" OR "[organisation]" [topic] filetype:pdf
```

### Check Web Archive

The document may have been removed. Try [Wayback Machine](https://web.archive.org).

</details>

---

## 📊 Wrong File Type Results?

### PDF Viewer Pollution

Add exclusions for PDF viewer sites:

```txt
-pdfviewer -flipbook -issuu -docplayer -scribd
```

### Syntax Check

| Correct         | Wrong           |
| :-------------- | :-------------- |
| `ext:pdf`       | `extension:pdf` |
| `filetype:pdf`  | `filetype:.pdf` |
| `filetype:xlsx` | `file:xlsx`     |

---

## 🌐 International Results When You Want Australian?

| Strategy                | Query Addition             |
| :---------------------- | :------------------------- |
| Add Australia           | `[topic] Australia`        |
| Exclude other countries | `[topic] -USA -UK -Canada` |
| Government only         | `site:*.gov.au [topic]`    |
| Use AU domains          | `site:*.au [topic]`        |

---

## 💡 General Debugging Checklist

- [ ] `OR` is uppercase (not `or`)
- [ ] Exact phrases have quotes (`"like this"`)
- [ ] No space after `site:` or `filetype:`
- [ ] Domain has wildcard for subdomains (`site:*.gov.au`)
- [ ] Date format is correct (`after:2024-01-01`)

### Alternative Operators

| If this doesn't work | Try this              |
| :------------------- | :-------------------- |
| `"exact phrase"`     | `AROUND(1)` for words |
| `filetype:pdf`       | `ext:pdf`             |
| `intitle:`           | Just search the title |

---

## 🔗 Related Resources

| Resource                                          | Description           |
| :------------------------------------------------ | :-------------------- |
| [Advanced Operators](03-advanced-operators.md)    | Power user techniques |
| [Browser Extensions](tools/browser-extensions.md) | Archiving tools       |
| [Core Operators](02-core-operators.md)            | Operator reference    |

---

[← Back to Main Guide](README.md)
