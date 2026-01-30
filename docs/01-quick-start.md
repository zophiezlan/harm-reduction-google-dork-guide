# Quick Start: The 90-Second Workflow

> Get useful search results in under 2 minutes. No prior knowledge required.

[← Back to Main Guide](README.md)

---

## 🚀 The Formula

When you need _anything_ fast, follow this pattern:

```txt
[DOMAIN] + [FORMAT] + [TOPIC] + [DATE] + [EXCLUSIONS]
```

### Step-by-Step

| Step | Action                      | Example                                           |
| :--: | :-------------------------- | :------------------------------------------------ |
|  1   | Define what you need        | alert / policy / service / evidence / training    |
|  2   | Choose the authority domain | `site:*.gov.au` or a known org/university         |
|  3   | Force document formats      | `filetype:pdf` (or `docx`, `pptx`, `xlsx`)        |
|  4   | Use exact phrases           | `"take-home naloxone"` `"needle syringe program"` |
|  5   | Add a date constraint       | `after:2024-01-01` (or a range `2020..2025`)      |
|  6   | Exclude junk                | `-jobs -careers -news`                            |
|  7   | Open 2-3 candidates         | Cross-check dates, capture citations              |

---

## ⚡ Your First Dork

Copy and paste this into Google right now:

```txt
site:*.gov.au filetype:pdf "harm reduction" after:2024
```

[👉 **Run this Search**](https://www.google.com/search?q=site%3A*.gov.au+filetype%3Apdf+%22harm+reduction%22+after%3A2024)

<details>
<summary><strong>What this does</strong></summary>

| Component          | Purpose                            |
| :----------------- | :--------------------------------- |
| `site:*.gov.au`    | Only Australian government domains |
| `filetype:pdf`     | Only PDF documents (not web pages) |
| `"harm reduction"` | Exact phrase match                 |
| `after:2024`       | Published in 2024 or later         |

</details>

---

## 📋 5 Essential Starter Dorks

### 1. Recent Government Documents

```txt
site:*.gov.au filetype:pdf "harm reduction" after:2024
```

[👉 **Run this Search**](https://www.google.com/search?q=site%3A*.gov.au+filetype%3Apdf+%22harm+reduction%22+after%3A2024)

### 2. Drug Alerts from NSW Health

```txt
site:health.nsw.gov.au intitle:"drug warning" OR intitle:"drug alert"
```

[👉 **Run this Search**](https://www.google.com/search?q=site%3Ahealth.nsw.gov.au+intitle%3A%22drug+warning%22+OR+intitle%3A%22drug+alert%22)

### 3. Peer Worker Training Resources

```txt
"peer worker" training filetype:pdf site:*.org.au -jobs -careers
```

[👉 **Run this Search**](https://www.google.com/search?q=%22peer+worker%22+training+filetype%3Apdf+site%3A*.org.au+-jobs+-careers)

### 4. Research from Australian Universities

```txt
site:*.edu.au filetype:pdf "drug checking" OR "pill testing"
```

[👉 **Run this Search**](https://www.google.com/search?q=site%3A*.edu.au+filetype%3Apdf+%22drug+checking%22+OR+%22pill+testing%22)

### 5. Naloxone Guidelines

```txt
site:*.gov.au "take-home naloxone" guidelines filetype:pdf
```

[👉 **Run this Search**](https://www.google.com/search?q=site%3A*.gov.au+%22take-home+naloxone%22+guidelines+filetype%3Apdf)

---

## 🔧 Quick Customization

<details open>
<summary><strong>Change the Topic</strong></summary>

Replace `"harm reduction"` with:

| Topic               | Query Term                 |
| :------------------ | :------------------------- |
| Needle programs     | `"needle syringe program"` |
| Pill testing        | `"drug checking"`          |
| Opioid treatment    | `"opioid treatment"`       |
| Overdose prevention | `"overdose prevention"`    |

</details>

<details>
<summary><strong>Change the Jurisdiction</strong></summary>

| Jurisdiction            | Domain Pattern           |
| :---------------------- | :----------------------- |
| All AU Government       | `site:*.gov.au`          |
| Australian Universities | `site:*.edu.au`          |
| NSW Health              | `site:health.nsw.gov.au` |
| QLD Health              | `site:health.qld.gov.au` |
| VIC Health              | `site:health.vic.gov.au` |
| Sector Orgs             | `site:*.org.au`          |

</details>

<details>
<summary><strong>Change the Document Type</strong></summary>

| Filetype        | Use For                        |
| :-------------- | :----------------------------- |
| `filetype:docx` | Templates, drafts              |
| `filetype:pdf`  | Reports, guidelines, policies  |
| `filetype:pptx` | Presentations, training slides |
| `filetype:xlsx` | Data, service directories      |

</details>

---

## ❌ Common Mistakes to Avoid

> [!WARNING] These are the most common issues that break searches.

| Mistake                     | Fix                                       |
| :-------------------------- | :---------------------------------------- |
| `or` (lowercase)            | Use `OR` (must be uppercase)              |
| `site:gov.au` (missing `*`) | Use `site:*.gov.au` to catch subdomains   |
| Forgetting exclusions       | Add `-jobs -careers` to remove noise      |
| No quotes around phrases    | Use `"exact phrase"` for multi-word terms |
| Too many operators at once  | Start simple, add operators one at a time |

---

## ✅ Quick Verification Checklist

Before using any document you find:

- [ ] **Publication date** - Is it current enough?
- [ ] **Issuing authority** - Who published it?
- [ ] **Jurisdiction** - Does it apply to your state/territory?
- [ ] **Document type** - Is it a guideline, draft, or discussion paper?

---

## 🎯 Next Steps

Now that you have the basics:

| Next                      | Link                                    |
| :------------------------ | :-------------------------------------- |
| Learn the operators       | [Core Operators](02-core-operators.md)  |
| Find topic-specific dorks | [Dork Packs](dork-packs/README.md)               |
| Set up monitoring         | [Google Alerts](tools/google-alerts.md) |

---

## 💡 Pro Tips

<details>
<summary><strong>Tip 1: Start Broad, Then Narrow</strong></summary>

```txt
# Start here (broad)
"drug checking" Australia

# Then narrow by domain
"drug checking" site:*.gov.au

# Then narrow by document type
"drug checking" site:*.gov.au filetype:pdf

# Then narrow by date
"drug checking" site:*.gov.au filetype:pdf after:2024
```

</details>

<details>
<summary><strong>Tip 2: Save Your Best Dorks</strong></summary>

Create browser bookmarks for searches you use regularly. See [Bookmarklets](tools/bookmarklets.md)
for one-click searching.

</details>

<details>
<summary><strong>Tip 3: Use Date Ranges for Research</strong></summary>

```txt
"harm reduction" Australia 2020..2025
```

This finds documents mentioning dates in that range.

</details>

> [!TIP] **Keyboard shortcut:** Press <kbd>Ctrl</kbd>+<kbd>L</kbd> (or <kbd>Cmd</kbd>+<kbd>L</kbd>
> on Mac) to jump straight to your browser's address bar and start searching.

---

[← Back to Main Guide](README.md) | [Next: Core Operators →](02-core-operators.md)
