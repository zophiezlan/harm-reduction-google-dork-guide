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

[👉 **Run this Search**](https://www.google.com/search?q=filetype%3Axlsx+%22harm+reduction%22+OR+%22AOD%22+site%3A*.gov.au)

---

## 📊 Spreadsheets & Data Files

### Excel Files (Modern)

```txt
filetype:xlsx "harm reduction" site:*.gov.au
filetype:xlsx "needle syringe" OR "NSP" statistics
filetype:xlsx "overdose" data OR statistics Australia
filetype:xlsx "opioid" OR "methadone" treatment
filetype:xlsx "service directory" drug alcohol
```

[👉 **Run XLSX Search**](https://www.google.com/search?q=filetype%3Axlsx+%22harm+reduction%22+site%3A*.gov.au)

### Excel Files (Legacy)

```txt
filetype:xls "opioid treatment" OR "methadone" clinic
filetype:xls "drug" OR "alcohol" statistics Australia
filetype:xls "hepatitis" OR "HIV" surveillance
```

[👉 **Run XLS Search**](https://www.google.com/search?q=filetype%3Axls+%22opioid+treatment%22+OR+%22methadone%22+clinic)

### CSV Data Files

```txt
filetype:csv "needle syringe" OR "NSP" OR "overdose"
filetype:csv "drug" OR "alcohol" site:*.gov.au
filetype:csv "treatment" episodes Australia
filetype:csv "hospitalisation" drug OR alcohol
```

[👉 **Run CSV Search**](https://www.google.com/search?q=filetype%3Acsv+%22needle+syringe%22+OR+%22NSP%22+OR+%22overdose%22)

---

## 🎬 Presentations

### PowerPoint (Modern)

```txt
filetype:pptx "harm reduction" Australia
filetype:pptx "drug checking" OR "pill testing"
filetype:pptx "naloxone" training OR program
filetype:pptx "overdose" prevention OR response
filetype:pptx conference "alcohol and other drugs"
```

[👉 **Run PPTX Search**](https://www.google.com/search?q=filetype%3Apptx+%22harm+reduction%22+Australia)

### PowerPoint (Legacy)

```txt
filetype:ppt "needle exchange" OR "NSP" presentation
filetype:ppt "methadone" OR "buprenorphine" treatment
```

[👉 **Run PPT Search**](https://www.google.com/search?q=filetype%3Appt+%22needle+exchange%22+OR+%22NSP%22+presentation)

### PDF Presentations (Slide Decks)

```txt
filetype:pdf "slide" OR "presentation" "harm reduction" Australia
inurl:presentation filetype:pdf "drug policy"
```

[👉 **Run PDF Slides Search**](https://www.google.com/search?q=filetype%3Apdf+%22slide%22+OR+%22presentation%22+%22harm+reduction%22+Australia)

---

## 📝 Word Documents

### Modern Word Files

```txt
filetype:docx "harm reduction" policy OR procedure
filetype:docx "needle syringe" guidelines
filetype:docx "overdose" protocol OR response
filetype:docx "drug checking" service design
```

[👉 **Run DOCX Search**](https://www.google.com/search?q=filetype%3Adocx+%22harm+reduction%22+policy+OR+procedure)

### Legacy Word Files

```txt
filetype:doc "harm minimisation" Australia
filetype:doc "injecting drug use" guidelines
```

[👉 **Run DOC Search**](https://www.google.com/search?q=filetype%3Adoc+%22harm+minimisation%22+Australia)

### RTF & ODT (Alternative Formats)

```txt
filetype:rtf "harm reduction" Australia
filetype:odt "drug checking" OR "pill testing"
```

[👉 **Run RTF Search**](https://www.google.com/search?q=filetype%3Artf+%22harm+reduction%22+Australia)

---

## 🗃️ Database Files

> [!CAUTION] Database files may contain sensitive information. Only access files that are clearly
> intended for public distribution.

### SQL Dumps (Public Datasets)

```txt
filetype:sql "drug" OR "health" site:*.edu.au
filetype:sql "research" data export
```

[👉 **Run this Search**](https://www.google.com/search?q=filetype%3Asql%20%22drug%22%20OR%20%22health%22%20site%3A*.edu.au%0D%0Afiletype%3Asql%20%22research%22%20data%20export)

### Access Databases

```txt
filetype:mdb "health" OR "drug" research
filetype:accdb "service" directory
```

[👉 **Run this Search**](https://www.google.com/search?q=filetype%3Amdb%20%22health%22%20OR%20%22drug%22%20research%0D%0Afiletype%3Aaccdb%20%22service%22%20directory)

### Structured Data

```txt
filetype:json "harm reduction" OR "drug" API
filetype:xml "health" data Australia
```

[👉 **Run this Search**](https://www.google.com/search?q=filetype%3Ajson%20%22harm%20reduction%22%20OR%20%22drug%22%20API%0D%0Afiletype%3Axml%20%22health%22%20data%20Australia)

---

## 📁 Archive Files

### ZIP Archives

```txt
filetype:zip "harm reduction" resources
filetype:zip "training" materials drug alcohol
filetype:zip "toolkit" AOD OR "alcohol and other drugs"
```

[👉 **Run ZIP Search**](https://www.google.com/search?q=filetype%3Azip+%22harm+reduction%22+resources)

---

## 📖 E-books & Publications

### EPUB Files

```txt
filetype:epub "harm reduction" guide
filetype:epub "drug policy" reform
filetype:epub "addiction" OR "recovery"
```

[👉 **Run EPUB Search**](https://www.google.com/search?q=filetype%3Aepub+%22harm+reduction%22+guide)

---

## 🔧 Configuration & Technical Files

### Sitemaps (Discover Hidden Pages)

```txt
filetype:xml sitemap "health" site:*.gov.au
filetype:xml sitemap "drug" site:*.org.au
```

[👉 **Run Sitemap Search**](https://www.google.com/search?q=filetype%3Axml+sitemap+%22health%22+site%3A*.gov.au)

### Log Files (Public Health Data)

```txt
filetype:log "drug" OR "health" site:*.gov.au
```

[👉 **Run this Search**](https://www.google.com/search?q=filetype%3Alog%20%22drug%22%20OR%20%22health%22%20site%3A*.gov.au)

---

## ☁️ Cloud Storage & Collaboration

### Google Docs (Public)

```txt
site:docs.google.com/document "harm reduction"
site:docs.google.com/spreadsheets "drug" OR "alcohol" data
site:docs.google.com/presentation "AOD" OR "harm reduction"
```

[👉 **Run Google Docs Search**](https://www.google.com/search?q=site%3Adocs.google.com%2Fdocument+%22harm+reduction%22)

### Cloud Storage (Public Files)

```txt
site:drive.google.com "harm reduction" resources
site:dropbox.com "drug policy" OR "harm reduction"
site:onedrive.live.com "AOD" training
```

[👉 **Run this Search**](https://www.google.com/search?q=site%3Adrive.google.com%20%22harm%20reduction%22%20resources%0D%0Asite%3Adropbox.com%20%22drug%20policy%22%20OR%20%22harm%20reduction%22%0D%0Asite%3Aonedrive.live.com%20%22AOD%22%20training)

---

## 🎓 Academic & Research Documents

### Theses & Dissertations

```txt
filetype:pdf "thesis" OR "dissertation" "harm reduction" Australia
filetype:pdf "PhD" "drug policy" OR "drug use"
```

[👉 **Run Thesis Search**](https://www.google.com/search?q=filetype%3Apdf+%22thesis%22+OR+%22dissertation%22+%22harm+reduction%22+Australia)

### Working Papers

```txt
filetype:pdf "working paper" "harm reduction" OR "drug policy"
filetype:pdf "discussion paper" "alcohol and other drugs"
```

[👉 **Run Working Papers Search**](https://www.google.com/search?q=filetype%3Apdf+%22working+paper%22+%22harm+reduction%22+OR+%22drug+policy%22)

---

## 🏥 Health Service Documents

### Service Directories

```txt
filetype:xlsx "service directory" drug OR alcohol Australia
filetype:pdf "service directory" AOD OR "alcohol and other drugs"
filetype:csv "treatment services" drug alcohol
```

[👉 **Run Service Directory Search**](https://www.google.com/search?q=filetype%3Axlsx+%22service+directory%22+drug+OR+alcohol+Australia)

### Clinical Guidelines

```txt
filetype:pdf "clinical guideline" OR "practice guideline" opioid
filetype:pdf "protocol" "overdose" OR "withdrawal"
filetype:docx "procedure" naloxone OR "take-home"
```

[👉 **Run Guidelines Search**](https://www.google.com/search?q=filetype%3Apdf+%22clinical+guideline%22+OR+%22practice+guideline%22+opioid)

---

## 📋 Government Documents

### Meeting Minutes & Agendas

```txt
filetype:pdf "meeting minutes" "harm reduction" OR "drug policy"
filetype:docx "agenda" "alcohol and other drugs" committee
filetype:pdf "steering committee" AOD minutes
```

[👉 **Run Minutes Search**](https://www.google.com/search?q=filetype%3Apdf+%22meeting+minutes%22+%22harm+reduction%22+OR+%22drug+policy%22)

### Budget & Funding

```txt
filetype:xlsx "budget" "harm reduction" OR "AOD" site:*.gov.au
filetype:pdf "funding" allocation drug OR alcohol
filetype:xls "expenditure" health drug services
```

[👉 **Run Budget Search**](https://www.google.com/search?q=filetype%3Axlsx+%22budget%22+%22harm+reduction%22+OR+%22AOD%22+site%3A*.gov.au)

---

## 🔍 Multi-Format Searches

### Combine Multiple File Types

```txt
(filetype:xlsx OR filetype:csv) "overdose" data Australia
(filetype:pptx OR filetype:pdf) "harm reduction" conference presentation
(filetype:docx OR filetype:pdf) "policy" "drug checking"
```

[👉 **Run Multi-Format Search**](https://www.google.com/search?q=%28filetype%3Axlsx+OR+filetype%3Acsv%29+%22overdose%22+data+Australia)

### All Data Files

```txt
(filetype:xlsx OR filetype:xls OR filetype:csv) "drug" statistics Australia
```

[👉 **Run All Data Search**](https://www.google.com/search?q=%28filetype%3Axlsx+OR+filetype%3Axls+OR+filetype%3Acsv%29+%22drug%22+statistics+Australia)

### All Presentation Types

```txt
(filetype:pptx OR filetype:ppt OR filetype:pdf) "harm reduction" slides conference
```

[👉 **Run All Presentations Search**](https://www.google.com/search?q=%28filetype%3Apptx+OR+filetype%3Appt+OR+filetype%3Apdf%29+%22harm+reduction%22+slides+conference)

---

## 💡 Pro Tips

### Finding Hidden Directories

```txt
intitle:"index of" filetype:xlsx site:*.gov.au
intitle:"index of" filetype:pptx site:*.health.*.gov.au
```

[👉 **Run this Search**](https://www.google.com/search?q=intitle%3A%22index%20of%22%20filetype%3Axlsx%20site%3A*.gov.au%0D%0Aintitle%3A%22index%20of%22%20filetype%3Apptx%20site%3A*.health.*.gov.au)

### By Year Range

```txt
filetype:xlsx "harm reduction" 2020..2026
filetype:pptx "drug policy" after:2023
```

[👉 **Run this Search**](https://www.google.com/search?q=filetype%3Axlsx%20%22harm%20reduction%22%202020..2026%0D%0Afiletype%3Apptx%20%22drug%20policy%22%20after%3A2023)

### Exclude Duplicates

```txt
filetype:xlsx "harm reduction" -"copy" -"backup" -"old"
```

[👉 **Run this Search**](https://www.google.com/search?q=filetype%3Axlsx%20%22harm%20reduction%22%20-%22copy%22%20-%22backup%22%20-%22old%22)

---

## 🔗 Related Resources

- [Investigative Searching](investigative.md) - Advanced discovery techniques
- [Research Pack](research.md) - Academic research dorks
- [Data & Statistics](data-statistics.md) - Statistical sources
- [OSINT Tools](../tools/osint.md) - Automated discovery tools

---

[← Back to Dork Packs](README.md)
