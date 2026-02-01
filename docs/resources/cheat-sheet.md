# Quick Reference Cheat Sheet

> One-page reference for essential operators and searches.

[← Back to Main Guide](../README.md) | [← Resources](../tools/README.md)

---

## ⚡ Essential Operators

| Operator    | What It Does    | Example                      |
| :---------- | :-------------- | :--------------------------- |
| `-exclude`  | Remove results  | `-jobs -careers`             |
| `"phrase"`  | Exact match     | `"harm reduction"`           |
| `*`         | Wildcard        | `"drug * service"`           |
| `after:`    | After date      | `after:2024-01-01`           |
| `AROUND(n)` | Words nearby    | `naloxone AROUND(5) program` |
| `filetype:` | Document type   | `filetype:pdf`               |
| `intitle:`  | In page title   | `intitle:"drug alert"`       |
| `inurl:`    | In URL          | `inurl:publications`         |
| `OR`        | Either term     | `naloxone OR narcan`         |
| `site:`     | Limit to domain | `site:*.gov.au`              |

> [!IMPORTANT] `OR` must be **UPPERCASE**. Lowercase `or` is ignored.

---

## 🎯 Top 10 Most Useful Dorks

<details open>
<summary><strong>Copy-paste ready queries</strong></summary>

### 1. Recent Government Harm Reduction Docs

```txt
site:*.gov.au filetype:pdf "harm reduction" after:2024
```

### 2. NSW Drug Alerts

```txt
site:health.nsw.gov.au intitle:"drug warning" OR intitle:"drug alert"
```

### 3. Drug Checking Research

```txt
site:*.edu.au "drug checking" OR "pill testing" filetype:pdf
```

### 4. Peer Worker Training (No Jobs)

```txt
"peer worker" training filetype:pdf -jobs -careers
```

### 5. Naloxone Guidelines

```txt
site:*.gov.au "take-home naloxone" guidelines filetype:pdf
```

### 6. Parliamentary Submissions

```txt
site:*.gov.au inurl:submissions "drug policy" filetype:pdf
```

### 7. Peer Organisation Resources

```txt
(site:nuaa.org.au OR site:aivl.org.au OR site:hrvic.org.au) filetype:pdf
```

### 8. Service Directories

```txt
site:*.gov.au filetype:xlsx "service directory" AOD
```

### 9. Novel Substance Surveillance

```txt
site:*.gov.au ("nitazene" OR "novel psychoactive") filetype:pdf after:2023
```

### 10. Lived Experience Frameworks

```txt
("lived experience" OR "peer worker") framework filetype:pdf Australia
```

</details>

---

## 📋 Query Building Formula

```txt
[DOMAIN] + [FORMAT] + [TOPIC] + [DATE] + [EXCLUSIONS]
```

**Example breakdown:**

| Component          | Purpose                    |
| :----------------- | :------------------------- |
| `-jobs`            | Exclude job listings       |
| `"harm reduction"` | Exact phrase               |
| `after:2024`       | Recent only                |
| `filetype:pdf`     | PDF documents              |
| `site:*.gov.au`    | Australian government only |

---

## 🌐 Key Domains

<details>
<summary><strong>Government & Health</strong></summary>

| Organization      | Domain Pattern           |
| :---------------- | :----------------------- |
| AIHW              | `site:aihw.gov.au`       |
| All AU Government | `site:*.gov.au`          |
| All State Health  | `site:*.health.*.gov.au` |
| TGA               | `site:tga.gov.au`        |

</details>

<details>
<summary><strong>Research & Academic</strong></summary>

| Organization        | Domain Pattern               |
| :------------------ | :--------------------------- |
| All AU Universities | `site:*.edu.au`              |
| Burnet Institute    | `site:burnet.edu.au`         |
| NDARC               | `site:ndarc.med.unsw.edu.au` |
| NDRI                | `site:ndri.curtin.edu.au`    |

</details>

<details>
<summary><strong>Peer & Sector Orgs</strong></summary>

| Organization       | Domain Pattern       |
| :----------------- | :------------------- |
| AIVL (National)    | `site:aivl.org.au`   |
| Harm Reduction Vic | `site:hrvic.org.au`  |
| NUAA (NSW)         | `site:nuaa.org.au`   |
| QuIHN (QLD)        | `site:quihn.org`     |
| QuIVAA (QLD)       | `site:quivaa.org.au` |

</details>

---

## 🔧 Quick Fixes

| Problem            | Solution                              |
| :----------------- | :------------------------------------ |
| Job listings       | Add `-jobs -careers`                  |
| Missing subdomains | Use `site:*.gov.au` not `site:gov.au` |
| Old content        | Add `after:2024`                      |
| Too many results   | Add `filetype:pdf`                    |
| Wrong jurisdiction | Add `site:*.gov.au`                   |
| Zero results       | Remove `filetype:pdf`                 |

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
| `.csv`    | Raw data exports                        |
| `.docx`   | Templates, drafts, working documents    |
| `.pdf`    | Reports, guidelines, official documents |
| `.pptx`   | Presentations, training materials       |
| `.xlsx`   | Data, directories, contact lists        |

---

## 🔗 Related

| Resource                                  | Description             |
| :---------------------------------------- | :---------------------- |
| [Core Operators](../02-core-operators.md) | Full operator reference |
| [Dork Packs](../dork-packs/README.md)     | Topic-specific queries  |
| [Troubleshooting](../troubleshooting.md)  | When searches fail      |

---

[← Back to Main Guide](../README.md)
