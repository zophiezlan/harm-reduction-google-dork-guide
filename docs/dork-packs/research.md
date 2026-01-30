# Research & Academic Evidence

> Finding high-quality research, systematic reviews, and grey literature.

[← Back to Dork Packs](README.md) | [← Main Guide](../README.md)

---

## ⚡ Quick Start

Find Australian harm reduction research:

```txt
site:*.edu.au filetype:pdf "harm reduction" (evaluation OR effectiveness) after:2022
```

---

## 📚 Academic Access Tools

> Research should be accessible. These tools help you access scholarly content:

| Tool                 | URL                                                       | Description                                |
| -------------------- | --------------------------------------------------------- | ------------------------------------------ |
| **CORE**             | [core.ac.uk](https://core.ac.uk/)                         | 270M+ open access papers                   |
| **PubMed Central**   | [ncbi.nlm.nih.gov/pmc](https://www.ncbi.nlm.nih.gov/pmc/) | Free biomedical literature                 |
| **Sci-Hub**          | [sci-hub.se](https://sci-hub.se)                          | Direct access (check legal status)         |
| **Semantic Scholar** | [semanticscholar.org](https://www.semanticscholar.org/)   | AI-powered academic search                 |
| **Unpaywall**        | [unpaywall.org](https://unpaywall.org)                    | Browser extension, finds free legal papers |

See [Academic Access](../resources/academic-access.md) for full list.

---

## 🟢 Basic Queries

### Australian Research Institutions

```txt
site:ndarc.med.unsw.edu.au filetype:pdf ("harm reduction" OR "drug checking" OR "overdose")
site:burnet.edu.au "injecting drug use" OR "needle syringe"
site:kirby.unsw.edu.au hepatitis drug use
```

### Generic Australian Academic

```txt
site:*.edu.au filetype:pdf "harm reduction" (evaluation OR effectiveness)
```

### Quality Filters (Systematic Reviews)

```txt
intitle:"systematic review" "needle syringe program" OR "harm reduction"
intitle:"meta-analysis" "opioid substitution therapy" OR "naloxone"
```

---

## 🟡 Intermediate Queries

### Australian Research (Comprehensive)

```txt
site:ndarc.med.unsw.edu.au OR site:burnet.edu.au OR site:turning-point.org.au OR site:nceta.flinders.edu.au filetype:pdf
```

### Randomised Controlled Trials

```txt
intitle:"randomized controlled trial" OR intitle:"randomised controlled trial" "harm reduction" substance use
```

### Recent High-Quality Evidence

```txt
(intitle:"systematic review" OR intitle:"meta-analysis") "harm reduction" after:2020 filetype:pdf
```

### Grey Literature (Exclude Aggregators)

```txt
"harm reduction" filetype:pdf -site:researchgate.net -site:academia.edu -site:arxiv.org
```

---

## 🔴 Advanced Queries

### Comprehensive Evidence Sweep

```txt
site:*.edu.au OR site:*.edu filetype:pdf ("harm reduction" OR "drug checking" OR "needle syringe" OR naloxone) (evaluation OR effectiveness OR outcomes OR "systematic review" OR "meta-analysis") after:2020 -site:researchgate.net -site:academia.edu
```

### Methods-Focused (For Research Design)

```txt
intitle:"methods" OR intitle:"methodology" "harm reduction" filetype:pdf
```

### Peer-Led Research

```txt
("peer-led research" OR "participatory action research" OR "community-based participatory research") drug use Australia filetype:pdf
```

### Citation-Worthy Evidence

```txt
site:*.edu.au ("harm reduction" OR "drug checking") (evaluation OR effectiveness OR outcomes) filetype:pdf after:2020
```

---

## 🏛️ Key Australian Research Centres

### NDARC (National Drug & Alcohol Research Centre)

```txt
site:ndarc.med.unsw.edu.au filetype:pdf
site:ndarc.med.unsw.edu.au [YOUR TOPIC]
```

### Burnet Institute

```txt
site:burnet.edu.au filetype:pdf (harm reduction OR "injecting drug use")
```

### Turning Point

```txt
site:turning-point.org.au filetype:pdf
```

### Kirby Institute

```txt
site:kirby.unsw.edu.au filetype:pdf (hepatitis OR HIV OR BBV)
```

### NCETA (Workforce Development)

```txt
site:nceta.flinders.edu.au filetype:pdf
```

### CSRH (Social Research)

```txt
site:csrh.arts.unsw.edu.au filetype:pdf
```

### Matilda Centre

```txt
site:matildacentre.com.au filetype:pdf
```

---

## 📝 Study Types

### Systematic Reviews

```txt
intitle:"systematic review" ("harm reduction" OR naloxone OR "needle syringe") filetype:pdf
```

### Meta-Analyses

```txt
intitle:"meta-analysis" ("opioid agonist" OR "harm reduction" OR "drug checking") filetype:pdf
```

### Randomised Trials

```txt
(intitle:"randomized" OR intitle:"randomised") trial ("harm reduction" OR AOD) filetype:pdf
```

### Cohort Studies

```txt
intitle:"cohort study" ("drug use" OR "substance use" OR "harm reduction") Australia filetype:pdf
```

### Qualitative Research

```txt
intitle:"qualitative" ("harm reduction" OR "drug use" OR "lived experience") Australia filetype:pdf
```

### Mixed Methods

```txt
"mixed methods" ("harm reduction" OR "drug use") Australia filetype:pdf
```

---

## 📄 Grey Literature

### Reports (Not Peer-Reviewed)

```txt
("evaluation report" OR "final report" OR "project report") "harm reduction" Australia filetype:pdf -journal -doi
```

### Working Papers

```txt
"working paper" OR "discussion paper" ("harm reduction" OR "drug policy") Australia filetype:pdf
```

### Theses & Dissertations

```txt
(thesis OR dissertation) ("harm reduction" OR "drug checking" OR "needle syringe") Australia filetype:pdf
```

### Conference Papers

```txt
("conference paper" OR "conference presentation" OR proceedings) "harm reduction" APSAD filetype:pdf
```

---

## 🔍 Topic-Specific Research

### Drug Checking Research

```txt
site:*.edu.au "drug checking" OR "pill testing" (evaluation OR outcomes) filetype:pdf
```

### Naloxone Research

```txt
site:*.edu.au "take-home naloxone" OR "community naloxone" (evaluation OR effectiveness) filetype:pdf
```

### NSP Research

```txt
site:*.edu.au "needle syringe program" (evaluation OR "cost-effectiveness") filetype:pdf
```

### OAT Research

```txt
site:*.edu.au ("opioid agonist" OR methadone OR buprenorphine) (outcomes OR retention OR effectiveness) filetype:pdf
```

### Peer Work Research

```txt
site:*.edu.au "peer support" OR "peer worker" (effectiveness OR outcomes) "harm reduction" filetype:pdf
```

---

## 🌏 International Research

### UK Research

```txt
site:*.ac.uk "harm reduction" (evaluation OR evidence) filetype:pdf
```

### Canadian Research

```txt
site:*.ca ("safe injection" OR "supervised consumption" OR "safe supply") (evaluation OR outcomes) filetype:pdf
```

### European Research (EMCDDA)

```txt
site:emcdda.europa.eu filetype:pdf ("harm reduction" OR "drug checking")
```

### Cochrane Reviews

```txt
site:cochranelibrary.com ("harm reduction" OR naloxone OR "needle syringe")
```

---

## 🛠️ Research Tools

### AI Research Assistants

```txt
"harm reduction" research [Use with: Elicit, SciSpace, Consensus]
```

See [AI Tools](../tools/ai-tools.md) for research assistants.

### Finding Similar Research

```txt
related:ndarc.med.unsw.edu.au
```

---

## 🔗 Related Resources

- **Resource:** [Academic Access](../resources/academic-access.md)
- **Related Packs:** [Data & Statistics](data-statistics.md),
  [Policy & Advocacy](policy-advocacy.md)
- **Workflow:** [Research Workflow](../workflows/research-workflow.md)
- **Tools:** [AI Tools](../tools/ai-tools.md)

---

[← Back to Dork Packs](README.md)
