# Creative & Investigative Searching

> Finding buried, niche, obscure, and unusual content through creative dorking. Use responsibly.

[← Back to Dork Packs](README.md) | [← Main Guide](../README.md)

---

## ⚠️ Ethical Framework

> These techniques can surface sensitive, obscure, or "hidden" information. Before using them:

1. **Ask:** Is there a legitimate harm reduction purpose?
2. **Consider:** Could this information cause harm if misused?
3. **Check:** Does your organisation have policies on investigative research?
4. **Protect:** Never expose personal data or breach privacy
5. **Document:** Keep records of what you searched and why

**The purpose is always to help people who use drugs, support advocacy, or hold systems
accountable—never to harm individuals or organisations.**

---

## ⚡ Quick Start

Find unlisted PDF documents in government publication directories:

```txt
site:*.gov.au inurl:"/publications/" filetype:pdf "harm reduction" -inurl:html
```

---

## 🟢 Basic Queries

### Directory & Index Mining - 1

```txt
site:*.gov.au inurl:"/publications/" filetype:pdf "harm reduction"
```

### Directory & Index Mining - 2

```txt
site:*.gov.au inurl:"/uploads/" filetype:pdf "drug"
```

### Directory & Index Mining - 3

```txt
site:*.gov.au inurl:"/documents/" filetype:pdf "overdose"
```

### Finding Draft Documents

```txt
site:*.gov.au filetype:pdf "draft" "harm reduction" -"final"
```

### Conference Presentations

```txt
filetype:pptx OR filetype:ppt "harm reduction" Australia
```

---

## 🟡 Intermediate Queries

### Index Pages - 1

```txt
site:*.gov.au intitle:"index of" "harm reduction" OR "drug"
```

### Index Pages - 2

```txt
site:*.health.*.gov.au inurl:"/assets/" filetype:pdf
```

### Internal/Unpublished Documents - 1

```txt
site:*.gov.au filetype:pdf "internal use only" OR "not for distribution" "drug"
```

### Internal/Unpublished Documents - 2

```txt
site:*.gov.au filetype:pdf "confidential" "alcohol and other drugs" -"de-identified"
```

### Embargoed/Pre-Release - 1

```txt
site:*.gov.au filetype:pdf "embargoed" OR "pre-release" drug policy
```

### Embargoed/Pre-Release - 2

```txt
"working paper" OR "discussion paper" harm reduction site:*.gov.au
```

---

## 🔴 Advanced Queries

### Comprehensive Directory Mining

```txt
site:*.gov.au (inurl:"/publications/" OR inurl:"/uploads/" OR inurl:"/documents/" OR inurl:"/assets/" OR inurl:"/files/") filetype:pdf ("harm reduction" OR "drug policy" OR "alcohol and other drugs") -inurl:html
```

### Meeting Minutes & Agendas - 1

```txt
site:*.gov.au filetype:pdf "meeting minutes" ("harm reduction" OR "drug policy")
```

### Meeting Minutes & Agendas - 2

```txt
site:*.gov.au filetype:pdf "agenda" "alcohol and other drugs" committee
```

### Meeting Minutes & Agendas - 3

```txt
"steering committee" OR "working group" minutes harm reduction filetype:pdf
```

### Tender Documents & Funding - Tender

```txt
site:*.gov.au "tender" OR "expression of interest" "harm reduction"
```

### Tender Documents & Funding - Funding agreement

```txt
site:*.gov.au filetype:pdf "funding agreement" OR "service agreement" AOD
```

### Tender Documents & Funding - Request for tender

```txt
"request for tender" "alcohol and other drugs" site:*.gov.au
```

### Tender Documents & Funding - Grant guidelines

```txt
"grant guidelines" harm reduction site:*.gov.au
```

---

## 📊 Spreadsheets & Data Files

### Excel Files - 1

```txt
filetype:xlsx "harm reduction" OR "AOD" site:*.gov.au
```

### Excel Files - 2

```txt
filetype:xlsx "service directory" OR "contact list" drug alcohol
```

### CSV Files - 1

```txt
filetype:csv "needle syringe" OR "NSP" OR "overdose"
```

### CSV Files - 2

```txt
filetype:csv "drug" OR "alcohol" site:*.gov.au
```

### Old Excel Formats

```txt
filetype:xls "opioid treatment" OR "methadone" clinic
```

---

## 📋 FOI (Freedom of Information)

### FOI Releases - 1

```txt
site:*.gov.au "freedom of information" OR "FOI" "drug" OR "harm reduction" filetype:pdf
```

### FOI Releases - 2

```txt
site:*.gov.au inurl:foi OR inurl:freedom-of-information "alcohol" OR "overdose"
```

### Disclosure Logs - 1

```txt
"disclosure log" site:*.gov.au "drug policy" OR "harm reduction"
```

### Disclosure Logs - 2

```txt
"FOI release" "harm reduction" OR "drug checking"
```

---

## 📜 Legacy & Archived Content

### Historical Documents - 1

```txt
site:*.gov.au "harm reduction" 1990..2005 filetype:pdf
```

### Historical Documents - 2

```txt
"national drug strategy" Australia 1985..2000 filetype:pdf
```

### Historical Documents - 3

```txt
"needle exchange" Australia history OR origins 1980s
```

### Web Archive (NLA) - 1

```txt
site:webarchive.nla.gov.au "harm reduction"
```

### Web Archive (NLA) - 2

```txt
site:web.archive.org "aivl.org.au" OR "nuaa.org.au"
```

### AIDS Era Documents

```txt
"AIDS" "injecting drug use" Australia 1980s OR 1990s filetype:pdf
```

---

## 🔍 Buried Evaluations

### Hidden Evaluations - 1

```txt
site:*.gov.au filetype:pdf "evaluation" "harm reduction" inurl:publications
```

### Hidden Evaluations - 2

```txt
site:*.gov.au filetype:pdf "review" "needle syringe program" -news
```

### Process & Outcome Evaluations

```txt
"process evaluation" OR "outcome evaluation" harm reduction Australia filetype:pdf
```

### Cost-Effectiveness (Often Buried) - 1

```txt
"cost-effectiveness" OR "cost-benefit" harm reduction Australia filetype:pdf
```

### Cost-Effectiveness (Often Buried) - 2

```txt
site:*.gov.au "economic evaluation" ("harm reduction" OR "needle syringe" OR naloxone)
```

---

## 📄 Unusual File Types

### RTF & ODT - 1

```txt
filetype:rtf "harm reduction" Australia
```

### RTF & ODT - 2

```txt
filetype:odt "drug checking" OR "pill testing"
```

### Ebooks

```txt
filetype:epub "harm reduction" guide
```

### Sitemaps (Reveal Hidden Pages)

```txt
filetype:xml "drug" site:*.gov.au sitemap
```

---

## 🗣️ Minority Reports & Dissent

### Dissenting Views - 1

```txt
"minority report" OR "dissenting opinion" drug policy Australia
```

### Dissenting Views - 2

```txt
"addendum" OR "additional comments" harm reduction inquiry
```

### Dissenting Views - 3

```txt
"supplementary submission" drug policy parliament
```

### Alternative Perspectives

```txt
"alternative view" OR "contrary evidence" drug law reform
```

---

## 🔧 URL Pattern Tricks

### Common Directory Patterns - Query 1

```txt
inurl:publications site:*.gov.au filetype:pdf
```

### Common Directory Patterns - Query 2

```txt
inurl:submissions site:*.gov.au filetype:pdf
```

### Common Directory Patterns - Query 3

```txt
inurl:reports site:*.gov.au filetype:pdf
```

### Common Directory Patterns - Query 4

```txt
inurl:resources site:*.org.au filetype:pdf
```

### Asset Directories

```txt
inurl:/assets/ OR inurl:/uploads/ OR inurl:/files/ site:*.gov.au filetype:pdf "drug"
```

---

## ⚖️ When to Use These Techniques

**Appropriate uses:**

- Finding official documents that should be public but aren't linked
- Locating historical policy documents for research
- Finding evaluation reports that weren't publicised
- Accessing meeting minutes from public committees
- Researching funding and tender processes for advocacy

**Inappropriate uses:**

- Finding personal information about individuals
- Accessing content that's clearly private/confidential
- Circumventing legitimate access controls
- Any purpose that could harm people who use drugs

---

## 🔗 Related Resources

- **Advanced Operators:** [Advanced Operators](../03-advanced-operators.md)
- **Related Packs:** [Policy & Advocacy](policy-advocacy.md), [Research](research.md)
- **Tools:** [OSINT Tools](../tools/osint.md)

---

[← Back to Dork Packs](README.md)
