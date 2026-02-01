# Organizational Intelligence & Infrastructure

> Find the "behind the scenes" of how harm reduction works — strategic plans, governance documents, funding applications, annual reports, tender documents, and operational infrastructure. Power-user searching for understanding how organizations operate.

[← Back to Dork Packs](README.md) | [← Main Guide](../README.md)

---

## ⚡ Quick Start

Find annual reports from Australian harm reduction organizations:

```txt
site:*.org.au "annual report" "harm reduction" filetype:pdf
```

---

## 🟢 Basic Queries

### Annual Reports

Find organizational annual reports.

```txt
("annual report" OR "yearly report") "harm reduction" filetype:pdf
```

**Why this works:**

- Annual reports reveal organizational priorities and achievements
- Usually publicly available as PDFs
- Good for understanding organizational scope and funding

### Strategic Plans

Find organizational strategy documents.

```txt
("strategic plan" OR "strategic framework" OR "corporate plan") "harm reduction" filetype:pdf
```

**Why this works:**

- Strategic plans show where organizations are heading
- Reveal priorities and planned initiatives
- Often multi-year documents

### Governance Documents

Find constitutions, policies, and governance frameworks.

```txt
(constitution OR "governance framework" OR "terms of reference" OR bylaws) "harm reduction" site:*.org.au
```

**Why this works:**

- Governance docs reveal organizational structure
- Show accountability mechanisms
- Often required for funding compliance

---

## 🟡 Intermediate Queries

### Funding Applications & Grants

Find grant applications and funding documents.

```txt
("funding application" OR "grant application" OR "funding submission" OR "expression of interest") "harm reduction" filetype:pdf
```

**Why this works:**

- Reveals how organizations pitch for funding
- Shows program logic and expected outcomes
- Sometimes published for transparency

### Tender Documents & Service Specifications

Find government tenders and service specs.

```txt
(tender OR "request for proposal" OR RFP OR "service specification" OR "funding agreement") "harm reduction" site:*.gov.au filetype:pdf
```

**Why this works:**

- Reveals government priorities and requirements
- Shows what services are being commissioned
- Contains KPIs and outcome expectations

### Board Papers & Meeting Minutes

Find board and committee documentation.

```txt
("board papers" OR "board meeting" OR "meeting minutes" OR "committee minutes") "harm reduction"
```

**Why this works:**

- Board papers reveal decision-making processes
- Minutes show what was discussed and decided
- Governance transparency documents

### Position Descriptions

Find job descriptions and workforce roles.

```txt
("position description" OR "job description" OR "role description" OR "person specification") "harm reduction" filetype:pdf
```

**Why this works:**

- Shows how organizations define roles
- Reveals workforce structure and requirements
- Useful for understanding sector capacity

### Memoranda of Understanding

Find partnership and collaboration agreements.

```txt
("memorandum of understanding" OR MOU OR MoU OR "partnership agreement" OR "collaboration agreement") "harm reduction"
```

**Why this works:**

- Reveals organizational relationships
- Shows formal partnerships
- Indicates collaborative structures

---

## 🔴 Advanced Queries

### Comprehensive Governance Sweep

Find all governance-related documents.

```txt
(site:*.org.au OR site:*.gov.au) "harm reduction" ("annual report" OR "strategic plan" OR "board" OR "governance" OR "constitution") filetype:pdf
```

**Why this works:**

- Broad sweep of organizational documents
- Both gov and non-gov sources
- PDF filter for formal documents

### Budget & Financial Documents

Find organizational financial information.

```txt
("budget" OR "financial statements" OR "financial report" OR "audit report" OR "annual accounts") "harm reduction" filetype:pdf
```

**Why this works:**

- Reveals funding levels and allocation
- Shows financial health
- Required for many funded organizations

### Service Agreements & Contracts

Find contracted service arrangements.

```txt
("service agreement" OR "funding agreement" OR "contract" OR "schedule" OR "deliverables") "harm reduction" site:*.gov.au filetype:pdf
```

**Why this works:**

- Shows what government has contracted
- Reveals KPIs and reporting requirements
- Service delivery specifications

### Evaluation Reports

Find program evaluations and reviews.

```txt
(evaluation OR review OR "program review" OR assessment OR "independent review") "harm reduction" (recommendations OR findings) filetype:pdf
```

**Why this works:**

- Evaluations reveal program effectiveness
- Recommendations show improvement areas
- Independent assessments add credibility

### Organizational Policies

Find internal organizational policies.

```txt
("policy" OR "procedure" OR "guideline" OR "protocol") "harm reduction" (site:*.org.au) inurl:policy OR inurl:policies filetype:pdf
```

**Why this works:**

- Policy documents reveal operational standards
- Procedures show how work is done
- Often publicly accessible for transparency

### CEO/Director Reports

Find executive-level communications.

```txt
("CEO report" OR "director's report" OR "executive report" OR "chair's report") "harm reduction"
```

**Why this works:**

- Executive reports summarize organizational status
- Often published in annual reports
- Reveals leadership priorities

### Workforce Data

Find workforce statistics and analysis.

```txt
("workforce" OR "staffing" OR "FTE" OR "headcount" OR "human resources") "harm reduction" (report OR data OR statistics)
```

**Why this works:**

- Reveals sector capacity
- Shows workforce trends
- Useful for understanding service delivery capacity

---

## 🏛️ Government Infrastructure

### Departmental Reports

Find government department internal documents.

```txt
site:*.gov.au ("departmental report" OR "annual report" OR "corporate plan") ("harm reduction" OR "AOD" OR "alcohol and other drugs")
```

### Budget Papers & Estimates

Find government budget allocations.

```txt
site:*.gov.au ("budget paper" OR "budget estimates" OR "appropriation") ("harm reduction" OR "drug and alcohol" OR "AOD")
```

### Policy Briefs & Cabinet Documents

Find high-level policy documents.

```txt
site:*.gov.au ("policy brief" OR "cabinet" OR "ministerial brief" OR "discussion paper") "harm reduction"
```

### Regulatory Impact Statements

Find RIS and regulatory documents.

```txt
site:*.gov.au ("regulatory impact statement" OR RIS OR "regulation impact") drug OR substance OR harm
```

### Freedom of Information Releases

Find FOI-released documents.

```txt
site:*.gov.au ("freedom of information" OR FOI OR "released under FOI") "harm reduction"
```

---

## 📊 Funding & Commissioning

### PHN Commissioning

Find Primary Health Network documents.

```txt
site:*.com.au OR site:*.org.au (PHN OR "Primary Health Network") ("harm reduction" OR AOD OR "alcohol and other drugs") (tender OR commission OR "needs assessment")
```

### State Health Procurement

Find state health department procurement.

```txt
site:*.health.*.gov.au (tender OR procurement OR "expression of interest" OR EOI) ("harm reduction" OR AOD)
```

### Grant Opportunities

Find current and past grants.

```txt
site:*.gov.au OR site:*.org.au (grant OR "funding round" OR "funding opportunity") "harm reduction" open OR applications
```

### Funding Recipient Lists

Find who received funding.

```txt
site:*.gov.au ("funding recipients" OR "successful applicants" OR "grants awarded") ("harm reduction" OR AOD OR "drug and alcohol")
```

---

## 📋 Document Type Patterns

### Organizational Documents

| Document Type | Search Pattern |
| ------------- | -------------- |
| Annual Report | `"annual report" "harm reduction" filetype:pdf` |
| Strategic Plan | `"strategic plan" "harm reduction" filetype:pdf` |
| Constitution | `constitution "harm reduction" site:*.org.au` |
| Board Minutes | `"board minutes" OR "meeting minutes" "harm reduction"` |
| Policies | `policy OR procedure site:*.org.au "harm reduction"` |

### Government Documents

| Document Type | Search Pattern |
| ------------- | -------------- |
| Tender | `tender site:*.gov.au "harm reduction"` |
| Service Spec | `"service specification" site:*.gov.au AOD` |
| Budget | `budget "harm reduction" site:*.gov.au` |
| Evaluation | `evaluation "harm reduction" site:*.gov.au` |
| FOI Release | `FOI site:*.gov.au "harm reduction"` |

### Workforce Documents

| Document Type | Search Pattern |
| ------------- | -------------- |
| Position Description | `"position description" "harm reduction" filetype:pdf` |
| Competency Framework | `"competency framework" "harm reduction"` |
| Workforce Strategy | `"workforce strategy" OR "workforce plan" "harm reduction"` |
| Training Curriculum | `curriculum OR syllabus "harm reduction" training` |

---

## 🔍 Organization-Specific Deep Dives

### Finding All Documents from One Org

```txt
site:aivl.org.au filetype:pdf
site:nuaa.org.au ("annual report" OR "strategic plan" OR policy)
```

### Comparing Organizations

```txt
"annual report" 2023 (AIVL OR NUAA OR "Harm Reduction Victoria" OR QuIHN) filetype:pdf
```

### Tracking Organizational Changes

```txt
site:web.archive.org/web/*/aivl.org.au "strategic plan"
"strategic plan" aivl (2020 OR 2021 OR 2022 OR 2023)
```

---

## 📋 Quick Copy Document Patterns

### Strategic Documents

```txt
("annual report" OR "strategic plan" OR "corporate plan") filetype:pdf
```

### Governance Documents

```txt
("constitution" OR "governance" OR "board" OR "terms of reference")
```

### Funding Documents

```txt
("tender" OR "grant" OR "funding" OR "expression of interest" OR EOI)
```

### Workforce Documents

```txt
("position description" OR "job description" OR "workforce" OR "staffing")
```

### Evaluation Documents

```txt
("evaluation" OR "review" OR "assessment" OR "audit")
```

---

## 💡 Advanced Techniques

### Finding Document Versions

Compare different versions of the same document:

```txt
"[document title]" (2021 OR 2022 OR 2023 OR 2024) filetype:pdf
site:web.archive.org "[document title]"
```

### Finding Confidential Leaks

Sometimes sensitive documents become public:

```txt
("confidential" OR "internal" OR "not for distribution" OR "draft") "harm reduction" filetype:pdf
```

### Tender Response Deadlines

Find upcoming opportunities:

```txt
site:*.gov.au tender "harm reduction" ("closes" OR "deadline" OR "due date") 2025
```

### Finding Subcontractors

```txt
("subcontract" OR "consortium" OR "partnership" OR "in partnership with") "harm reduction" tender
```

### Discovering Organizational Networks

Find who organizations work with:

```txt
site:aivl.org.au ("partnership" OR "partner" OR "collaboration" OR "in collaboration with")
```

---

## 🌏 State/Territory Specific

### NSW

```txt
(site:*.nsw.gov.au OR site:health.nsw.gov.au) ("harm reduction" OR AOD) (tender OR "annual report" OR strategy)
```

### Victoria

```txt
(site:*.vic.gov.au OR site:health.vic.gov.au) ("harm reduction" OR AOD) (tender OR "annual report" OR strategy)
```

### Queensland

```txt
(site:*.qld.gov.au OR site:health.qld.gov.au) ("harm reduction" OR AOD) (tender OR "annual report" OR strategy)
```

### All States

```txt
site:*.health.*.gov.au ("harm reduction" OR AOD) ("annual report" OR strategy OR tender)
```

---

## ⚠️ Considerations

- **Sensitivity:** Some organizational documents are internal for good reason
- **Currency:** Check document dates; strategies expire
- **Context:** Internal documents may not reflect final decisions
- **Ethics:** Don't misuse access to organizational intelligence
- **Verification:** Cross-reference with official public statements

---

## 🔗 Related Resources

- **Related Packs:** [Policy & Advocacy](policy-advocacy.md), [Research](research.md), [Data & Statistics](data-statistics.md)
- **Temporal:** [Temporal Intelligence](temporal-intelligence.md) for finding old versions
- **Domain Map:** [Government Domains](../04-domain-map.md)

---

[← Back to Dork Packs](README.md)
