# Service Finding & Directories

> Locate hard-to-find lists of AOD, NSP, sexual health, and harm reduction services.

[← Back to Dork Packs](README.md) | [← Main Guide](../README.md)

---

## ⚡ Quick Start

Find AOD service directories:

```txt
(filetype:pdf OR filetype:xlsx) "service directory" (AOD OR "alcohol and other drugs") site:*.gov.au
```

---

## 🟢 Basic Queries

### Government Service Directories

```txt
(filetype:pdf OR filetype:xlsx) ("service directory" OR "service finder" OR "contact list") (AOD OR "alcohol and other drugs") site:*.gov.au
```

### Regional Service Lists

```txt
site:*.health.nsw.gov.au "service directory" ("central coast" OR newcastle OR "hunter region")
```

### Inurl Directory Pattern

```txt
inurl:aod-services OR inurl:directory site:*.gov.au
```

---

## 🟡 Intermediate Queries

### Sexual Health & BBV Services

```txt
("hepatitis" OR "HCV" OR "sexual health") (clinic OR service OR directory) site:*.health.*.gov.au
```

### NSP Directories

```txt
("needle syringe program" OR NSP) (directory OR "service list" OR locations) [YOUR STATE]
```

### Mental Health Service Directories

```txt
site:*.gov.au "mental health" service directory (filetype:pdf OR filetype:xlsx)
```

### Spreadsheet Directories (Data-Rich)

```txt
filetype:xlsx ("service directory" OR "contact list") (AOD OR "drug and alcohol" OR "harm reduction") site:*.gov.au
```

---

## 🔴 Advanced Queries

### Comprehensive Service Directory Sweep

```txt
(filetype:pdf OR filetype:xlsx OR filetype:csv) ("service directory" OR "service finder" OR "service list" OR "contact directory") (AOD OR "alcohol and other drugs" OR "drug and alcohol" OR "harm reduction") site:*.gov.au OR site:*.org.au after:2022
```

### Treatment Service Finders

```txt
(treatment OR rehabilitation OR detox OR counselling) service (directory OR finder OR list) [YOUR STATE] -jobs
```

### Outreach Services

```txt
(outreach OR mobile OR "street-based") service (AOD OR "harm reduction") directory OR list [YOUR STATE]
```

### After-Hours Services

```txt
("after hours" OR "24 hour" OR "crisis") service (AOD OR "drug and alcohol" OR "mental health") [YOUR STATE]
```

---

## 📍 State-by-State Service Directories

### NSW - 1

```txt
site:health.nsw.gov.au OR site:nsw.gov.au "service directory" AOD OR "alcohol drug"
```

### NSW - 2

```txt
site:*.nsw.gov.au filetype:xlsx service directory
```

### Victoria - 1

```txt
site:health.vic.gov.au "service directory" OR "service finder" AOD
```

### Victoria - 2

```txt
site:*.vic.gov.au "alcohol and drug" services directory
```

### Queensland

```txt
site:health.qld.gov.au "service directory" AOD OR "alcohol and other drugs"
```

### Western Australia - 1

```txt
site:health.wa.gov.au "service directory" AOD OR "alcohol and other drugs"
```

### Western Australia - 2

```txt
site:mhc.wa.gov.au services directory
```

### South Australia - 1

```txt
site:sahealth.sa.gov.au service directory drug OR alcohol
```

### South Australia - 2

```txt
site:dassa.sa.gov.au services
```

### Tasmania

```txt
site:health.tas.gov.au "service directory" alcohol drug
```

### ACT - 1

```txt
site:health.act.gov.au service directory AOD
```

### ACT - 2

```txt
site:*.act.gov.au "alcohol and drug" services
```

### NT

```txt
site:health.nt.gov.au service directory AOD
```

---

## 🏥 Service Type Directories

### Opioid Treatment (OAT/OST) Clinics

```txt
("opioid treatment" OR methadone OR buprenorphine) (clinic OR service OR prescriber) directory [YOUR STATE]
```

### Residential Rehabilitation

```txt
("residential rehabilitation" OR "residential treatment" OR rehab) directory OR list [YOUR STATE] AOD
```

### Withdrawal/Detox Services

```txt
(withdrawal OR detox OR "detoxification") service (directory OR list) [YOUR STATE]
```

### Counselling Services

```txt
(counselling OR counseling) service (AOD OR "drug and alcohol") directory [YOUR STATE]
```

### Youth Services

```txt
(youth OR "young people") (AOD OR "drug and alcohol") service directory [YOUR STATE]
```

---

## 🖤💛❤️ First Nations Services

### 🖤💛❤️ First Nations Services - 1

```txt
(Aboriginal OR "Torres Strait Islander" OR Indigenous) (AOD OR "alcohol and other drugs") service directory
```

### 🖤💛❤️ First Nations Services - 2

```txt
(ACCHO OR "community controlled") "alcohol and other drugs" services [YOUR STATE]
```

---

## 🏠 Related Service Directories

### Housing/Homelessness

```txt
(housing OR homelessness OR accommodation) service directory [YOUR STATE]
```

### Mental Health

```txt
"mental health" service directory [YOUR STATE] site:*.gov.au
```

### Family Support

```txt
("family support" OR "family drug support") service directory [YOUR STATE]
```

---

## 🔧 Finding Hidden Directories

### Inurl Patterns - 1

```txt
site:*.gov.au inurl:services OR inurl:directory filetype:pdf AOD
```

### Inurl Patterns - 2

```txt
site:*.gov.au inurl:contacts OR inurl:providers filetype:xlsx
```

### Spreadsheet Mining

```txt
site:*.gov.au filetype:xlsx "service" ("contact" OR "phone" OR "address") drug OR alcohol
```

---

## 📱 Online Service Finders

### Known Online Tools (search for updates) - 1

```txt
"service finder" AOD Australia online
```

### Known Online Tools (search for updates) - 2

```txt
"treatment locator" "drug and alcohol" Australia
```

### App/Digital Services

```txt
(app OR application OR "online tool") "service finder" AOD Australia
```

---

## 🔗 Related Resources

- **Synonym Block:** [AOD Service Terms](../05-synonym-blocks.md#-treatment--service-terms)
- **Related Packs:** [NSP](nsp.md), [OAT/OST](oat-ost.md), [Rural & Remote](rural-remote.md)
- **Domain Map:**
  [State Health Departments](../04-domain-map.md#-state--territory-health-departments)

---

[← Back to Dork Packs](README.md)
