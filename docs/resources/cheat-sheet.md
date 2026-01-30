# Quick Reference Cheat Sheet

> One-page reference for essential operators and searches.

[← Back to Main Guide](../README.md) | [← Resources](../tools/README.md)

---

## ⚡ Essential Operators

| Operator    | What It Does    | Example                      |
| :---------- | :-------------- | :--------------------------- |
| `site:`     | Limit to domain | `site:*.gov.au`              |
| `filetype:` | Document type   | `filetype:pdf`               |
| `"phrase"`  | Exact match     | `"harm reduction"`           |
| `intitle:`  | In page title   | `intitle:"drug alert"`       |
| `inurl:`    | In URL          | `inurl:publications`         |
| `OR`        | Either term     | `naloxone OR narcan`         |
| `-exclude`  | Remove results  | `-jobs -careers`             |
| `after:`    | After date      | `after:2024-01-01`           |
| `AROUND(n)` | Words nearby    | `naloxone AROUND(5) program` |
| `*`         | Wildcard        | `"drug * service"`           |

> [!IMPORTANT] `OR` must be **UPPERCASE**. Lowercase `or` is ignored.

---

## 🎯 Top 10 Most Useful Dorks

<details open>
<summary><strong>Copy-paste ready queries</strong></summary>

### 1. Recent Government Harm Reduction Docs

```txt
site:*.gov.au filetype:pdf "harm reduction" after:2024
```

[👉 **Run**](https://www.google.com/search?q=site%3A*.gov.au+filetype%3Apdf+%22harm+reduction%22+after%3A2024)

### 2. NSW Drug Alerts

```txt
site:health.nsw.gov.au intitle:"drug warning" OR intitle:"drug alert"
```

[👉 **Run**](https://www.google.com/search?q=site%3Ahealth.nsw.gov.au+intitle%3A%22drug+warning%22+OR+intitle%3A%22drug+alert%22)

### 3. Drug Checking Research

```txt
site:*.edu.au "drug checking" OR "pill testing" filetype:pdf
```

[👉 **Run**](https://www.google.com/search?q=site%3A*.edu.au+%22drug+checking%22+OR+%22pill+testing%22+filetype%3Apdf)

### 4. Peer Worker Training (No Jobs)

```txt
"peer worker" training filetype:pdf -jobs -careers
```

[👉 **Run**](https://www.google.com/search?q=%22peer+worker%22+training+filetype%3Apdf+-jobs+-careers)

### 5. Naloxone Guidelines

```txt
site:*.gov.au "take-home naloxone" guidelines filetype:pdf
```

[👉 **Run**](https://www.google.com/search?q=site%3A*.gov.au+%22take-home+naloxone%22+guidelines+filetype%3Apdf)

### 6. Parliamentary Submissions

```txt
site:*.gov.au inurl:submissions "drug policy" filetype:pdf
```

[👉 **Run**](https://www.google.com/search?q=site%3A*.gov.au+inurl%3Asubmissions+%22drug+policy%22+filetype%3Apdf)

### 7. Peer Organisation Resources

```txt
(site:nuaa.org.au OR site:aivl.org.au OR site:hrvic.org.au) filetype:pdf
```

[👉 **Run**](https://www.google.com/search?q=%28site%3Anuaa.org.au+OR+site%3Aaivl.org.au+OR+site%3Ahrvic.org.au%29+filetype%3Apdf)

### 8. Service Directories

```txt
site:*.gov.au filetype:xlsx "service directory" AOD
```

[👉 **Run**](https://www.google.com/search?q=site%3A*.gov.au+filetype%3Axlsx+%22service+directory%22+AOD)

### 9. Novel Substance Surveillance

```txt
site:*.gov.au ("nitazene" OR "novel psychoactive") filetype:pdf after:2023
```

[👉 **Run**](https://www.google.com/search?q=site%3A*.gov.au+%28%22nitazene%22+OR+%22novel+psychoactive%22%29+filetype%3Apdf+after%3A2023)

### 10. Lived Experience Frameworks

```txt
("lived experience" OR "peer worker") framework filetype:pdf Australia
```

[👉 **Run**](https://www.google.com/search?q=%28%22lived+experience%22+OR+%22peer+worker%22%29+framework+filetype%3Apdf+Australia)

</details>

---

## 📋 Query Building Formula

```txt
[DOMAIN] + [FORMAT] + [TOPIC] + [DATE] + [EXCLUSIONS]
```

**Example breakdown:**

| Component          | Purpose                    |
| :----------------- | :------------------------- |
| `site:*.gov.au`    | Australian government only |
| `filetype:pdf`     | PDF documents              |
| `"harm reduction"` | Exact phrase               |
| `after:2024`       | Recent only                |
| `-jobs`            | Exclude job listings       |

---

## 🌐 Key Domains

<details>
<summary><strong>Government & Health</strong></summary>

| Organization      | Domain Pattern           |
| :---------------- | :----------------------- |
| All AU Government | `site:*.gov.au`          |
| All State Health  | `site:*.health.*.gov.au` |
| AIHW              | `site:aihw.gov.au`       |
| TGA               | `site:tga.gov.au`        |

</details>

<details>
<summary><strong>Research & Academic</strong></summary>

| Organization        | Domain Pattern               |
| :------------------ | :--------------------------- |
| All AU Universities | `site:*.edu.au`              |
| NDARC               | `site:ndarc.med.unsw.edu.au` |
| Burnet Institute    | `site:burnet.edu.au`         |
| NDRI                | `site:ndri.curtin.edu.au`    |

</details>

<details>
<summary><strong>Peer & Sector Orgs</strong></summary>

| Organization       | Domain Pattern       |
| :----------------- | :------------------- |
| NUAA (NSW)         | `site:nuaa.org.au`   |
| AIVL (National)    | `site:aivl.org.au`   |
| Harm Reduction Vic | `site:hrvic.org.au`  |
| QuIVAA (QLD)       | `site:quivaa.org.au` |
| QuIHN (QLD)        | `site:quihn.org`     |

</details>

---

## 🔧 Quick Fixes

| Problem            | Solution                              |
| :----------------- | :------------------------------------ |
| Job listings       | Add `-jobs -careers`                  |
| Old content        | Add `after:2024`                      |
| Too many results   | Add `filetype:pdf`                    |
| Wrong jurisdiction | Add `site:*.gov.au`                   |
| Zero results       | Remove `filetype:pdf`                 |
| Missing subdomains | Use `site:*.gov.au` not `site:gov.au` |

> [!TIP] **Zero results?** Remove operators one at a time to find which one is too restrictive.

---

## ✅ Before Using Any Document

- [ ] Check publication date
- [ ] Verify issuing authority
- [ ] Confirm jurisdiction applies
- [ ] Note if draft or final version

---

## 🚨 State Drug Alert Quick Reference

| State | Quick Query                             |
| :---: | :-------------------------------------- |
|  ACT  | `site:health.act.gov.au "drug alert"`   |
|  NSW  | `site:health.nsw.gov.au "drug warning"` |
|  NT   | `site:health.nt.gov.au "drug alert"`    |
|  QLD  | `site:health.qld.gov.au "drug alert"`   |
|  SA   | `site:sahealth.sa.gov.au "drug alert"`  |
|  TAS  | `site:health.tas.gov.au "drug alert"`   |
|  VIC  | `site:health.vic.gov.au "health alert"` |
|  WA   | `site:health.wa.gov.au "drug warning"`  |

---

## 📄 Document Type Quick Reference

| Extension | Typical Content                         |
| :-------- | :-------------------------------------- |
| `.pdf`    | Reports, guidelines, official documents |
| `.docx`   | Templates, drafts, working documents    |
| `.xlsx`   | Data, directories, contact lists        |
| `.pptx`   | Presentations, training materials       |
| `.csv`    | Raw data exports                        |

---

## 🔗 Related

| Resource                                  | Description             |
| :---------------------------------------- | :---------------------- |
| [Core Operators](../02-core-operators.md) | Full operator reference |
| [Dork Packs](../dork-packs/README.md)     | Topic-specific queries  |
| [Troubleshooting](../troubleshooting.md)  | When searches fail      |

---

[← Back to Main Guide](../README.md)
