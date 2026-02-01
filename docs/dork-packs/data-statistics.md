# Data, Statistics & Surveillance

> Datasets, prevalence surveys, overdose statistics, and surveillance reports.

[← Back to Dork Packs](README.md) | [← Main Guide](../README.md)

---

## ⚡ Quick Start

Find AIHW alcohol and drug statistics:

```txt
site:aihw.gov.au "alcohol and other drugs" statistics filetype:pdf
```

---

## 🟢 Basic Queries

### AIHW Drug Statistics

```txt
site:aihw.gov.au "alcohol and other drugs" statistics
```

### ABS Drug Use Data

```txt
site:abs.gov.au "illicit drug use" OR "drug use" survey
```

### Overdose Death Data

```txt
"overdose deaths" OR "drug-induced deaths" statistics Australia 2023..2026
```

---

## 🟡 Intermediate Queries

### National Drug Strategy Household Survey

```txt
"National Drug Strategy Household Survey" OR NDSHS (latest OR 2022 OR 2023) filetype:pdf
```

### IDRS (Illicit Drug Reporting System) - 1

```txt
"Illicit Drug Reporting System" OR IDRS filetype:pdf
```

### IDRS (Illicit Drug Reporting System) - 2

```txt
site:ndarc.med.unsw.edu.au IDRS
```

### EDRS (Ecstasy Reporting System)

```txt
"Ecstasy and Related Drugs Reporting System" OR EDRS filetype:pdf
```

### Ambulance Data

```txt
"ambulance attendance" OR "ambulance callouts" drug related (NSW OR VIC OR QLD) data
```

---

## 🔴 Advanced Queries

### Comprehensive Data Sweep

```txt
site:aihw.gov.au OR site:abs.gov.au OR site:ndarc.med.unsw.edu.au ("alcohol and other drugs" OR "drug use" OR "substance use") (statistics OR data OR survey OR report) filetype:pdf after:2022
```

### State-Level Data

```txt
site:*.gov.au ("drug-related" OR "alcohol-related") (hospitalisation OR hospitalization OR "emergency department" OR ambulance) data [YOUR STATE]
```

### Treatment Episode Data

```txt
site:aihw.gov.au "Alcohol and other drug treatment services" OR "AODTS-NMDS" filetype:pdf
```

### Wastewater Drug Monitoring

```txt
"wastewater analysis" OR "wastewater epidemiology" (drug OR substance) Australia (data OR report)
```

---

## 📊 Key Data Sources

### AIHW (National)

```txt
site:aihw.gov.au filetype:pdf ("alcohol and other drugs" OR "drug use" OR "substance use")
```

**Key AIHW reports:**

- Alcohol and other drug treatment services data
- National Drug Strategy Household Survey
- Drug-induced deaths
- Alcohol-related deaths

### ABS (National)

```txt
site:abs.gov.au ("drug use" OR "substance use" OR "alcohol consumption") survey OR data
```

### NDARC Drug Trends

```txt
site:ndarc.med.unsw.edu.au ("drug trends" OR IDRS OR EDRS) filetype:pdf
```

### Penington Institute (Overdose)

```txt
site:penington.org.au "overdose" OR "Australia's Annual Overdose Report"
```

---

## 💉 NSP Data

### NSP Distribution Data - 1

```txt
"needle syringe" ("distribution data" OR "equipment distributed" OR statistics) Australia
```

### NSP Distribution Data - 2

```txt
site:aihw.gov.au "needle syringe program" data
```

### BBV & NSP Data

```txt
site:kirby.unsw.edu.au ("hepatitis C" OR HCV) ("injecting drug use" OR NSP) data
```

---

## 💊 Treatment Data

### Treatment Episodes

```txt
site:aihw.gov.au "treatment episode" AOD OR "alcohol and other drugs" filetype:pdf
```

### OAT/Pharmacotherapy Data

```txt
site:aihw.gov.au (methadone OR buprenorphine OR "opioid pharmacotherapy") data OR statistics
```

### Waiting Lists/Access Data

```txt
"waiting list" OR "wait times" (treatment OR detox OR rehabilitation) AOD [YOUR STATE]
```

---

## ☠️ Mortality & Morbidity

### Drug-Induced Deaths - 1

```txt
site:aihw.gov.au "drug-induced deaths" filetype:pdf
```

### Drug-Induced Deaths - 2

```txt
"drug-related mortality" OR "drug deaths" statistics Australia
```

### Opioid Deaths Specifically

```txt
"opioid deaths" OR "opioid mortality" OR "opioid overdose deaths" Australia statistics
```

### Alcohol-Related Deaths

```txt
site:aihw.gov.au "alcohol-related deaths" OR "alcohol-attributable deaths"
```

### Hospitalisations

```txt
site:aihw.gov.au ("drug-related" OR "alcohol-related") (hospitalisation OR hospitalization) data
```

---

## 📈 Trend & Surveillance

### Drug Market Trends - 1

```txt
"drug market" trend OR surveillance Australia filetype:pdf
```

### Drug Market Trends - 2

```txt
site:ndarc.med.unsw.edu.au "drug trends" OR "market" filetype:pdf
```

### Novel Substance Monitoring

```txt
("novel psychoactive" OR NPS) (surveillance OR monitoring OR detection) Australia data
```

### Drug Checking Results Data

```txt
"drug checking" (results OR data OR "substances detected") Australia
```

---

## 📍 State-Specific Data

### NSW

```txt
site:health.nsw.gov.au OR site:nsw.gov.au (drug OR alcohol) statistics OR data
```

### Victoria - 1

```txt
site:health.vic.gov.au OR site:vic.gov.au ("drug related" OR "alcohol related") data
```

### Victoria - 2

```txt
site:turning-point.org.au data OR statistics
```

### Queensland

```txt
site:health.qld.gov.au (drug OR alcohol) statistics
```

### Other States

```txt
site:*.gov.au [STATE] ("drug-related" OR "alcohol-related") (statistics OR data OR report)
```

---

## 🔬 Research Data

### Finding Raw Data/Datasets

```txt
filetype:xlsx OR filetype:csv (drug OR alcohol OR AOD) (data OR dataset) Australia site:*.gov.au
```

### Open Data Portals

```txt
site:data.gov.au (drug OR alcohol OR "harm reduction" OR overdose)
```

### Research Data Repositories

```txt
site:ada.edu.au OR site:ands.org.au (drug OR alcohol OR AOD) data
```

---

## 🖤💛❤️ First Nations Data

### 🖤💛❤️ First Nations Data - 1

```txt
site:aihw.gov.au ("Aboriginal" OR "Indigenous") ("alcohol" OR "drug" OR "substance") statistics
```

### 🖤💛❤️ First Nations Data - 2

```txt
"Closing the Gap" (alcohol OR drug OR substance) data
```

---

## 🔗 Related Resources

- **Related Packs:** [Research](research.md), [Coroners & Deaths](coroners-deaths.md)
- **Key Sources:** [AIHW](https://aihw.gov.au), [ABS](https://abs.gov.au),
  [NDARC](https://ndarc.med.unsw.edu.au)
- **Workflow:** [Research Workflow](../workflows/research-workflow.md)

---

[← Back to Dork Packs](README.md)
