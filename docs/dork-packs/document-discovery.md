# Document Discovery

> Finding spreadsheets, databases, presentations, and other document types beyond PDFs.

[← Back to Dork Packs](README.md) | [← Main Guide](../README.md)

---

## ⚠️ Ethical Framework

These techniques can surface sensitive documents. Use responsibly:

- Only search for publicly accessible information
- Never attempt to access password-protected or private content
- Respect copyright and data protection laws
- Consider whether the information should be public before using it

---

## ⚡ Quick Start

Find spreadsheets with harm reduction data on government sites:

```txt
filetype:xlsx "harm reduction" OR "AOD" site:*.gov.au
```

---

## 📊 Spreadsheets & Data Files

### Excel Files (Modern) - Harm reduction

```txt
filetype:xlsx "harm reduction" site:*.gov.au
```

### Excel Files (Modern) - Needle syringe

```txt
filetype:xlsx "needle syringe" OR "NSP" statistics
```

### Excel Files (Modern) - Overdose

```txt
filetype:xlsx "overdose" data OR statistics Australia
```

### Excel Files (Modern) - Opioid

```txt
filetype:xlsx "opioid" OR "methadone" treatment
```

### Excel Files (Modern) - Service directory

```txt
filetype:xlsx "service directory" drug alcohol
```

### Excel Files (Legacy) - 1

```txt
filetype:xls "opioid treatment" OR "methadone" clinic
```

### Excel Files (Legacy) - 2

```txt
filetype:xls "drug" OR "alcohol" statistics Australia
```

### Excel Files (Legacy) - 3

```txt
filetype:xls "hepatitis" OR "HIV" surveillance
```

### CSV Data Files - Needle syringe

```txt
filetype:csv "needle syringe" OR "NSP" OR "overdose"
```

### CSV Data Files - Drug

```txt
filetype:csv "drug" OR "alcohol" site:*.gov.au
```

### CSV Data Files - Treatment

```txt
filetype:csv "treatment" episodes Australia
```

### CSV Data Files - Hospitalisation

```txt
filetype:csv "hospitalisation" drug OR alcohol
```

---

## 🎬 Presentations

### PowerPoint (Modern) - Harm reduction

```txt
filetype:pptx "harm reduction" Australia
```

### PowerPoint (Modern) - Drug checking

```txt
filetype:pptx "drug checking" OR "pill testing"
```

### PowerPoint (Modern) - Naloxone

```txt
filetype:pptx "naloxone" training OR program
```

### PowerPoint (Modern) - Overdose

```txt
filetype:pptx "overdose" prevention OR response
```

### PowerPoint (Modern) - Alcohol and other drugs

```txt
filetype:pptx conference "alcohol and other drugs"
```

### PowerPoint (Legacy) - 1

```txt
filetype:ppt "needle exchange" OR "NSP" presentation
```

### PowerPoint (Legacy) - 2

```txt
filetype:ppt "methadone" OR "buprenorphine" treatment
```

### PDF Presentations (Slide Decks) - 1

```txt
filetype:pdf "slide" OR "presentation" "harm reduction" Australia
```

### PDF Presentations (Slide Decks) - 2

```txt
inurl:presentation filetype:pdf "drug policy"
```

---

## 📝 Word Documents

### Modern Word Files - Harm reduction

```txt
filetype:docx "harm reduction" policy OR procedure
```

### Modern Word Files - Needle syringe

```txt
filetype:docx "needle syringe" guidelines
```

### Modern Word Files - Overdose

```txt
filetype:docx "overdose" protocol OR response
```

### Modern Word Files - Drug checking

```txt
filetype:docx "drug checking" service design
```

### Legacy Word Files - 1

```txt
filetype:doc "harm minimisation" Australia
```

### Legacy Word Files - 2

```txt
filetype:doc "injecting drug use" guidelines
```

### RTF & ODT (Alternative Formats) - 1

```txt
filetype:rtf "harm reduction" Australia
```

### RTF & ODT (Alternative Formats) - 2

```txt
filetype:odt "drug checking" OR "pill testing"
```

---

## 🗃️ Database Files

> [!CAUTION] Database files may contain sensitive information. Only access files that are clearly
> intended for public distribution.

### SQL Dumps (Public Datasets) - 1

```txt
filetype:sql "drug" OR "health" site:*.edu.au
```

### SQL Dumps (Public Datasets) - 2

```txt
filetype:sql "research" data export
```

### Access Databases - 1

```txt
filetype:mdb "health" OR "drug" research
```

### Access Databases - 2

```txt
filetype:accdb "service" directory
```

### Structured Data - 1

```txt
filetype:json "harm reduction" OR "drug" API
```

### Structured Data - 2

```txt
filetype:xml "health" data Australia
```

---

## 📁 Archive Files

### ZIP Archives - 1

```txt
filetype:zip "harm reduction" resources
```

### ZIP Archives - 2

```txt
filetype:zip "training" materials drug alcohol
```

### ZIP Archives - 3

```txt
filetype:zip "toolkit" AOD OR "alcohol and other drugs"
```

---

## 📖 E-books & Publications

### EPUB Files - 1

```txt
filetype:epub "harm reduction" guide
```

### EPUB Files - 2

```txt
filetype:epub "drug policy" reform
```

### EPUB Files - 3

```txt
filetype:epub "addiction" OR "recovery"
```

---

## 🔧 Configuration & Technical Files

### Sitemaps (Discover Hidden Pages) - 1

```txt
filetype:xml sitemap "health" site:*.gov.au
```

### Sitemaps (Discover Hidden Pages) - 2

```txt
filetype:xml sitemap "drug" site:*.org.au
```

### Log Files (Public Health Data)

```txt
filetype:log "drug" OR "health" site:*.gov.au
```

---

## ☁️ Cloud Storage & Collaboration

### Google Docs (Public) - 1

```txt
site:docs.google.com/document "harm reduction"
```

### Google Docs (Public) - 2

```txt
site:docs.google.com/spreadsheets "drug" OR "alcohol" data
```

### Google Docs (Public) - 3

```txt
site:docs.google.com/presentation "AOD" OR "harm reduction"
```

### Cloud Storage (Public Files) - 1

```txt
site:drive.google.com "harm reduction" resources
```

### Cloud Storage (Public Files) - 2

```txt
site:dropbox.com "drug policy" OR "harm reduction"
```

### Cloud Storage (Public Files) - 3

```txt
site:onedrive.live.com "AOD" training
```

---

## 🎓 Academic & Research Documents

### Theses & Dissertations - 1

```txt
filetype:pdf "thesis" OR "dissertation" "harm reduction" Australia
```

### Theses & Dissertations - 2

```txt
filetype:pdf "PhD" "drug policy" OR "drug use"
```

### Working Papers - 1

```txt
filetype:pdf "working paper" "harm reduction" OR "drug policy"
```

### Working Papers - 2

```txt
filetype:pdf "discussion paper" "alcohol and other drugs"
```

---

## 🏥 Health Service Documents

### Service Directories - 1

```txt
filetype:xlsx "service directory" drug OR alcohol Australia
```

### Service Directories - 2

```txt
filetype:pdf "service directory" AOD OR "alcohol and other drugs"
```

### Service Directories - 3

```txt
filetype:csv "treatment services" drug alcohol
```

### Clinical Guidelines - 1

```txt
filetype:pdf "clinical guideline" OR "practice guideline" opioid
```

### Clinical Guidelines - 2

```txt
filetype:pdf "protocol" "overdose" OR "withdrawal"
```

### Clinical Guidelines - 3

```txt
filetype:docx "procedure" naloxone OR "take-home"
```

---

## 📋 Government Documents

### Meeting Minutes & Agendas - 1

```txt
filetype:pdf "meeting minutes" "harm reduction" OR "drug policy"
```

### Meeting Minutes & Agendas - 2

```txt
filetype:docx "agenda" "alcohol and other drugs" committee
```

### Meeting Minutes & Agendas - 3

```txt
filetype:pdf "steering committee" AOD minutes
```

### Budget & Funding - 1

```txt
filetype:xlsx "budget" "harm reduction" OR "AOD" site:*.gov.au
```

### Budget & Funding - 2

```txt
filetype:pdf "funding" allocation drug OR alcohol
```

### Budget & Funding - 3

```txt
filetype:xls "expenditure" health drug services
```

---

## 🔍 Multi-Format Searches

### Combine Multiple File Types - 1

```txt
(filetype:xlsx OR filetype:csv) "overdose" data Australia
```

### Combine Multiple File Types - 2

```txt
(filetype:pptx OR filetype:pdf) "harm reduction" conference presentation
```

### Combine Multiple File Types - 3

```txt
(filetype:docx OR filetype:pdf) "policy" "drug checking"
```

### All Data Files

```txt
(filetype:xlsx OR filetype:xls OR filetype:csv) "drug" statistics Australia
```

### All Presentation Types

```txt
(filetype:pptx OR filetype:ppt OR filetype:pdf) "harm reduction" slides conference
```

---

## 💡 Pro Tips

### Finding Hidden Directories - 1

```txt
intitle:"index of" filetype:xlsx site:*.gov.au
```

### Finding Hidden Directories - 2

```txt
intitle:"index of" filetype:pptx site:*.health.*.gov.au
```

### By Year Range - 1

```txt
filetype:xlsx "harm reduction" 2020..2026
```

### By Year Range - 2

```txt
filetype:pptx "drug policy" after:2023
```

### Exclude Duplicates

```txt
filetype:xlsx "harm reduction" -"copy" -"backup" -"old"
```

---

## 🔗 Related Resources

- [Investigative Searching](investigative.md) - Advanced discovery techniques
- [Research Pack](research.md) - Academic research dorks
- [Data & Statistics](data-statistics.md) - Statistical sources
- [OSINT Tools](../tools/osint.md) - Automated discovery tools

---

[← Back to Dork Packs](README.md)
