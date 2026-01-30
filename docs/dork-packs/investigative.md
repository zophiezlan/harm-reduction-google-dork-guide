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

[👉 **Run this Search**](https://www.google.com/search?q=site%3A*.gov.au%20inurl%3A%22%2Fpublications%2F%22%20filetype%3Apdf%20%22harm%20reduction%22%20-inurl%3Ahtml)

---

## 🟢 Basic Queries

### Directory & Index Mining

```txt
site:*.gov.au inurl:"/publications/" filetype:pdf "harm reduction"
site:*.gov.au inurl:"/uploads/" filetype:pdf "drug"
site:*.gov.au inurl:"/documents/" filetype:pdf "overdose"
```

[👉 **Run this Search**](https://www.google.com/search?q=site%3A*.gov.au%20inurl%3A%22%2Fpublications%2F%22%20filetype%3Apdf%20%22harm%20reduction%22%0Asite%3A*.gov.au%20inurl%3A%22%2Fuploads%2F%22%20filetype%3Apdf%20%22drug%22%0Asite%3A*.gov.au%20inurl%3A%22%2Fdocuments%2F%22%20filetype%3Apdf%20%22overdose%22)

### Finding Draft Documents

```txt
site:*.gov.au filetype:pdf "draft" "harm reduction" -"final"
```

[👉 **Run this Search**](https://www.google.com/search?q=site%3A*.gov.au%20filetype%3Apdf%20%22draft%22%20%22harm%20reduction%22%20-%22final%22)

### Conference Presentations

```txt
filetype:pptx OR filetype:ppt "harm reduction" Australia
```

[👉 **Run this Search**](https://www.google.com/search?q=filetype%3Apptx%20OR%20filetype%3Appt%20%22harm%20reduction%22%20Australia)

---

## 🟡 Intermediate Queries

### Index Pages

```txt
site:*.gov.au intitle:"index of" "harm reduction" OR "drug"
site:*.health.*.gov.au inurl:"/assets/" filetype:pdf
```

[👉 **Run this Search**](https://www.google.com/search?q=site%3A*.gov.au%20intitle%3A%22index%20of%22%20%22harm%20reduction%22%20OR%20%22drug%22%0Asite%3A*.health.*.gov.au%20inurl%3A%22%2Fassets%2F%22%20filetype%3Apdf)

### Internal/Unpublished Documents

```txt
site:*.gov.au filetype:pdf "internal use only" OR "not for distribution" "drug"
site:*.gov.au filetype:pdf "confidential" "alcohol and other drugs" -"de-identified"
```

[👉 **Run this Search**](https://www.google.com/search?q=site%3A*.gov.au%20filetype%3Apdf%20%22internal%20use%20only%22%20OR%20%22not%20for%20distribution%22%20%22drug%22%0Asite%3A*.gov.au%20filetype%3Apdf%20%22confidential%22%20%22alcohol%20and%20other%20drugs%22%20-%22de-identified%22)

### Embargoed/Pre-Release

```txt
site:*.gov.au filetype:pdf "embargoed" OR "pre-release" drug policy
"working paper" OR "discussion paper" harm reduction site:*.gov.au
```

[👉 **Run this Search**](https://www.google.com/search?q=site%3A*.gov.au%20filetype%3Apdf%20%22embargoed%22%20OR%20%22pre-release%22%20drug%20policy%0A%22working%20paper%22%20OR%20%22discussion%20paper%22%20harm%20reduction%20site%3A*.gov.au)

---

## 🔴 Advanced Queries

### Comprehensive Directory Mining

```txt
site:*.gov.au (inurl:"/publications/" OR inurl:"/uploads/" OR inurl:"/documents/" OR inurl:"/assets/" OR inurl:"/files/") filetype:pdf ("harm reduction" OR "drug policy" OR "alcohol and other drugs") -inurl:html
```

[👉 **Run this Search**](<https://www.google.com/search?q=site%3A*.gov.au%20(inurl%3A%22%2Fpublications%2F%22%20OR%20inurl%3A%22%2Fuploads%2F%22%20OR%20inurl%3A%22%2Fdocuments%2F%22%20OR%20inurl%3A%22%2Fassets%2F%22%20OR%20inurl%3A%22%2Ffiles%2F%22)%20filetype%3Apdf%20(%22harm%20reduction%22%20OR%20%22drug%20policy%22%20OR%20%22alcohol%20and%20other%20drugs%22)%20-inurl%3Ahtml>)

### Meeting Minutes & Agendas

```txt
site:*.gov.au filetype:pdf "meeting minutes" ("harm reduction" OR "drug policy")
site:*.gov.au filetype:pdf "agenda" "alcohol and other drugs" committee
"steering committee" OR "working group" minutes harm reduction filetype:pdf
```

[👉 **Run this Search**](<https://www.google.com/search?q=site%3A*.gov.au%20filetype%3Apdf%20%22meeting%20minutes%22%20(%22harm%20reduction%22%20OR%20%22drug%20policy%22)%0Asite%3A*.gov.au%20filetype%3Apdf%20%22agenda%22%20%22alcohol%20and%20other%20drugs%22%20committee%0A%22steering%20committee%22%20OR%20%22working%20group%22%20minutes%20harm%20reduction%20filetype%3Apdf>)

### Tender Documents & Funding

```txt
site:*.gov.au "tender" OR "expression of interest" "harm reduction"
site:*.gov.au filetype:pdf "funding agreement" OR "service agreement" AOD
"request for tender" "alcohol and other drugs" site:*.gov.au
"grant guidelines" harm reduction site:*.gov.au
```

[👉 **Run this Search**](https://www.google.com/search?q=site%3A*.gov.au%20%22tender%22%20OR%20%22expression%20of%20interest%22%20%22harm%20reduction%22%0Asite%3A*.gov.au%20filetype%3Apdf%20%22funding%20agreement%22%20OR%20%22service%20agreement%22%20AOD%0A%22request%20for%20tender%22%20%22alcohol%20and%20other%20drugs%22%20site%3A*.gov.au%0A%22grant%20guidelines%22%20harm%20reduction%20site%3A*.gov.au)

---

## 📊 Spreadsheets & Data Files

### Excel Files

```txt
filetype:xlsx "harm reduction" OR "AOD" site:*.gov.au
filetype:xlsx "service directory" OR "contact list" drug alcohol
```

[👉 **Run this Search**](https://www.google.com/search?q=filetype%3Axlsx%20%22harm%20reduction%22%20OR%20%22AOD%22%20site%3A*.gov.au%0Afiletype%3Axlsx%20%22service%20directory%22%20OR%20%22contact%20list%22%20drug%20alcohol)

### CSV Files

```txt
filetype:csv "needle syringe" OR "NSP" OR "overdose"
filetype:csv "drug" OR "alcohol" site:*.gov.au
```

[👉 **Run this Search**](https://www.google.com/search?q=filetype%3Acsv%20%22needle%20syringe%22%20OR%20%22NSP%22%20OR%20%22overdose%22%0Afiletype%3Acsv%20%22drug%22%20OR%20%22alcohol%22%20site%3A*.gov.au)

### Old Excel Formats

```txt
filetype:xls "opioid treatment" OR "methadone" clinic
```

[👉 **Run this Search**](https://www.google.com/search?q=filetype%3Axls%20%22opioid%20treatment%22%20OR%20%22methadone%22%20clinic)

---

## 📋 FOI (Freedom of Information)

### FOI Releases

```txt
site:*.gov.au "freedom of information" OR "FOI" "drug" OR "harm reduction" filetype:pdf
site:*.gov.au inurl:foi OR inurl:freedom-of-information "alcohol" OR "overdose"
```

[👉 **Run this Search**](https://www.google.com/search?q=site%3A*.gov.au%20%22freedom%20of%20information%22%20OR%20%22FOI%22%20%22drug%22%20OR%20%22harm%20reduction%22%20filetype%3Apdf%0Asite%3A*.gov.au%20inurl%3Afoi%20OR%20inurl%3Afreedom-of-information%20%22alcohol%22%20OR%20%22overdose%22)

### Disclosure Logs

```txt
"disclosure log" site:*.gov.au "drug policy" OR "harm reduction"
"FOI release" "harm reduction" OR "drug checking"
```

[👉 **Run this Search**](https://www.google.com/search?q=%22disclosure%20log%22%20site%3A*.gov.au%20%22drug%20policy%22%20OR%20%22harm%20reduction%22%0A%22FOI%20release%22%20%22harm%20reduction%22%20OR%20%22drug%20checking%22)

---

## 📜 Legacy & Archived Content

### Historical Documents

```txt
site:*.gov.au "harm reduction" 1990..2005 filetype:pdf
"national drug strategy" Australia 1985..2000 filetype:pdf
"needle exchange" Australia history OR origins 1980s
```

[👉 **Run this Search**](https://www.google.com/search?q=site%3A*.gov.au%20%22harm%20reduction%22%201990..2005%20filetype%3Apdf%0A%22national%20drug%20strategy%22%20Australia%201985..2000%20filetype%3Apdf%0A%22needle%20exchange%22%20Australia%20history%20OR%20origins%201980s)

### Web Archive (NLA)

```txt
site:webarchive.nla.gov.au "harm reduction"
site:web.archive.org "aivl.org.au" OR "nuaa.org.au"
```

[👉 **Run this Search**](https://www.google.com/search?q=site%3Awebarchive.nla.gov.au%20%22harm%20reduction%22%0Asite%3Aweb.archive.org%20%22aivl.org.au%22%20OR%20%22nuaa.org.au%22)

### AIDS Era Documents

```txt
"AIDS" "injecting drug use" Australia 1980s OR 1990s filetype:pdf
```

[👉 **Run this Search**](https://www.google.com/search?q=%22AIDS%22%20%22injecting%20drug%20use%22%20Australia%201980s%20OR%201990s%20filetype%3Apdf)

---

## 🔍 Buried Evaluations

### Hidden Evaluations

```txt
site:*.gov.au filetype:pdf "evaluation" "harm reduction" inurl:publications
site:*.gov.au filetype:pdf "review" "needle syringe program" -news
```

[👉 **Run this Search**](https://www.google.com/search?q=site%3A*.gov.au%20filetype%3Apdf%20%22evaluation%22%20%22harm%20reduction%22%20inurl%3Apublications%0Asite%3A*.gov.au%20filetype%3Apdf%20%22review%22%20%22needle%20syringe%20program%22%20-news)

### Process & Outcome Evaluations

```txt
"process evaluation" OR "outcome evaluation" harm reduction Australia filetype:pdf
```

[👉 **Run this Search**](https://www.google.com/search?q=%22process%20evaluation%22%20OR%20%22outcome%20evaluation%22%20harm%20reduction%20Australia%20filetype%3Apdf)

### Cost-Effectiveness (Often Buried)

```txt
"cost-effectiveness" OR "cost-benefit" harm reduction Australia filetype:pdf
site:*.gov.au "economic evaluation" ("harm reduction" OR "needle syringe" OR naloxone)
```

[👉 **Run this Search**](<https://www.google.com/search?q=%22cost-effectiveness%22%20OR%20%22cost-benefit%22%20harm%20reduction%20Australia%20filetype%3Apdf%0Asite%3A*.gov.au%20%22economic%20evaluation%22%20(%22harm%20reduction%22%20OR%20%22needle%20syringe%22%20OR%20naloxone)>)

---

## 📄 Unusual File Types

### RTF & ODT

```txt
filetype:rtf "harm reduction" Australia
filetype:odt "drug checking" OR "pill testing"
```

[👉 **Run this Search**](https://www.google.com/search?q=filetype%3Artf%20%22harm%20reduction%22%20Australia%0Afiletype%3Aodt%20%22drug%20checking%22%20OR%20%22pill%20testing%22)

### Ebooks

```txt
filetype:epub "harm reduction" guide
```

[👉 **Run this Search**](https://www.google.com/search?q=filetype%3Aepub%20%22harm%20reduction%22%20guide)

### Sitemaps (Reveal Hidden Pages)

```txt
filetype:xml "drug" site:*.gov.au sitemap
```

[👉 **Run this Search**](https://www.google.com/search?q=filetype%3Axml%20%22drug%22%20site%3A*.gov.au%20sitemap)

---

## 🗣️ Minority Reports & Dissent

### Dissenting Views

```txt
"minority report" OR "dissenting opinion" drug policy Australia
"addendum" OR "additional comments" harm reduction inquiry
"supplementary submission" drug policy parliament
```

[👉 **Run this Search**](https://www.google.com/search?q=%22minority%20report%22%20OR%20%22dissenting%20opinion%22%20drug%20policy%20Australia%0A%22addendum%22%20OR%20%22additional%20comments%22%20harm%20reduction%20inquiry%0A%22supplementary%20submission%22%20drug%20policy%20parliament)

### Alternative Perspectives

```txt
"alternative view" OR "contrary evidence" drug law reform
```

[👉 **Run this Search**](https://www.google.com/search?q=%22alternative%20view%22%20OR%20%22contrary%20evidence%22%20drug%20law%20reform)

---

## 🔧 URL Pattern Tricks

### Common Directory Patterns

```txt
inurl:publications site:*.gov.au filetype:pdf
inurl:submissions site:*.gov.au filetype:pdf
inurl:reports site:*.gov.au filetype:pdf
inurl:resources site:*.org.au filetype:pdf
```

[👉 **Run this Search**](https://www.google.com/search?q=inurl%3Apublications%20site%3A*.gov.au%20filetype%3Apdf%0Ainurl%3Asubmissions%20site%3A*.gov.au%20filetype%3Apdf%0Ainurl%3Areports%20site%3A*.gov.au%20filetype%3Apdf%0Ainurl%3Aresources%20site%3A*.org.au%20filetype%3Apdf)

### Asset Directories

```txt
inurl:/assets/ OR inurl:/uploads/ OR inurl:/files/ site:*.gov.au filetype:pdf "drug"
```

[👉 **Run this Search**](https://www.google.com/search?q=inurl%3A%2Fassets%2F%20OR%20inurl%3A%2Fuploads%2F%20OR%20inurl%3A%2Ffiles%2F%20site%3A*.gov.au%20filetype%3Apdf%20%22drug%22)

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
