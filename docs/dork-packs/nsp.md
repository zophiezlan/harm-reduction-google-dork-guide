# Needle & Syringe Programs (NSP)

> Service models, evaluations, policies, directories, and operational guidelines for NSP.

[← Back to Dork Packs](README.md) | [← Main Guide](../README.md)

---

## ⚡ Quick Start

Find NSP guidelines from Australian health departments:

```txt
site:*.health.*.gov.au filetype:pdf "needle syringe program" guideline
```

---

## 🟢 Basic Queries

### Government NSP Policies

```txt
site:*.health.*.gov.au filetype:pdf ("needle syringe program" OR NSP) (guideline OR policy OR protocol)
```

**Why this works:**

- State health departments host NSP policies
- PDF filter gets operational documents
- Multiple document type terms captured

### NSP Service Directories

```txt
filetype:xlsx OR filetype:pdf (NSP OR "needle syringe") ("service list" OR directory) site:*.gov.au
```

### Sector Organisation Resources

```txt
site:*.org.au filetype:pdf ("needle syringe program" OR NSP) (evaluation OR outcomes OR access)
```

---

## 🟡 Intermediate Queries

### NSP Evaluations & Evidence

```txt
site:*.edu.au filetype:pdf "needle syringe program" (evaluation OR effectiveness OR "cost-effectiveness")
```

### Peer-Based NSP Resources

```txt
site:*.org.au "peer-based" OR "peer-led" ("needle syringe" OR NSP) filetype:pdf
```

### Equipment & Supply Guidelines

```txt
site:*.gov.au "injecting equipment" (guideline OR policy OR "safe disposal") filetype:pdf
```

### Pharmacy-Based NSP

```txt
"pharmacy" ("needle syringe" OR NSP OR "injecting equipment") Australia (program OR scheme)
```

---

## 🔴 Advanced Queries

### Comprehensive NSP Document Sweep

```txt
site:*.gov.au filetype:pdf ("needle syringe program" OR "needle exchange" OR "syringe service" OR NSP) (guideline OR policy OR framework OR manual) after:2020
```

### NSP Location/Access Information

```txt
"needle syringe program" location OR address OR "opening hours" [YOUR STATE] -site:facebook.com -site:twitter.com
```

### Mobile/Outreach NSP

```txt
("mobile NSP" OR "mobile needle" OR "outreach NSP" OR "van" OR "bus") ("needle syringe" OR "injecting equipment") Australia
```

### Vending Machine Programs

```txt
"vending machine" OR "dispensing machine" ("needle" OR "syringe" OR "injecting equipment") Australia
```

### Secondary Distribution

```txt
"secondary distribution" OR "peer distribution" ("needle syringe" OR "injecting equipment") Australia filetype:pdf
```

---

## 📍 State-by-State NSP Resources

| State | Query                                             |
| ----- | ------------------------------------------------- |
| NSW   | `site:health.nsw.gov.au "needle syringe program"` |
| QLD   | `site:health.qld.gov.au "needle syringe program"` |
| SA    | `site:sahealth.sa.gov.au "needle syringe"`        |
| VIC   | `site:health.vic.gov.au "needle syringe" OR NSP`  |
| WA    | `site:health.wa.gov.au "needle exchange"`         |

---

## 🎓 NSP Workforce & Training

### Staff Training Resources

```txt
"NSP" OR "needle syringe" (training OR induction OR "capacity building") Australia filetype:pdf
```

### Peer Worker NSP Training

```txt
"peer worker" ("needle syringe" OR NSP) training filetype:pdf -jobs
```

### Clinical Considerations

```txt
"injecting" (vein care OR "safer injecting" OR technique) training filetype:pdf
```

---

## 📊 NSP Data & Statistics

### AIHW Data

```txt
site:aihw.gov.au "needle syringe program" OR NSP statistics
```

### Distribution Data

```txt
"needle syringe" ("distribution data" OR "equipment distribution" OR statistics) Australia
```

### BBV Data Related to NSP

```txt
site:aihw.gov.au ("hepatitis C" OR HCV OR "blood borne virus") "injecting drug use"
```

---

## 🔬 Research & Evidence

### NDARC Research

```txt
site:ndarc.med.unsw.edu.au "needle syringe" OR NSP OR "injecting drug use" filetype:pdf
```

### Kirby Institute (BBV Research)

```txt
site:kirby.unsw.edu.au "injecting drug use" OR "needle syringe"
```

### Systematic Reviews

```txt
intitle:"systematic review" "needle syringe program" OR "needle exchange" effectiveness
```

### Cost-Effectiveness Studies

```txt
"needle syringe program" ("cost-effectiveness" OR "cost-benefit" OR "economic evaluation") filetype:pdf
```

---

## 🏥 Equipment & Consumables

### Fitpack/Equipment Standards

```txt
"fitpack" OR "injecting equipment" (contents OR standards OR "what's included") Australia
```

### Safe Disposal

```txt
"safe disposal" OR "sharps disposal" ("needle" OR "syringe") (guideline OR information) Australia
```

### Specialised Equipment

```txt
"low dead space" OR "detachable needle" OR "butterfly" OR "insulin syringe" NSP Australia
```

---

## 🔗 Related Resources

- **Synonym Block:** [NSP Terms](../05-synonym-blocks.md#-nsp-terms-needle-syringe-program)
- **Related Packs:** [Peer Workforce](peer-workforce.md),
  [Service Directories](service-directories.md)
- **Related Domains:** [NUAA](https://nuaa.org.au), [QuIHN](https://quihn.org)

---

[← Back to Dork Packs](README.md)
