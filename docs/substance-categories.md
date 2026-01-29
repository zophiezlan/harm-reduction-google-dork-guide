# Substance Categories: AU Priority Map (Culture + Risk + Signals)

> Built from PsychonautWiki categories, tuned to what’s common or higher‑risk in Australia.
> Each block uses a different lens: **alerts**, **harms**, **markets**, **culture/setting**, **treatment/response**.

[← Back to Main Guide](../README.md)

---

## How to Use

- Start with **AU Priority Dashboard** for a fast scan.
- Then jump to a **Substance Cluster** for deeper, more specific angles.
- Replace `Australia` with state/city or a known hotspot (e.g., Sydney, Melbourne, Brisbane).
- Use [Synonym Blocks](05-synonym-blocks.md) when you need broader coverage.

---

## AU Priority Dashboard (one‑screen scan)

```txt
(methamphetamine OR MDMA OR cocaine OR ketamine OR "nitrous oxide" OR cannabis OR alcohol OR opioid OR fentanyl OR nitazene OR benzodiazepine OR bromazolam OR "synthetic cannabinoid" OR PIEDS OR steroid) (alert OR warning OR "health advice") site:*.gov.au
```

```txt
(opioid OR fentanyl OR nitazene OR benzodiazepine OR bromazolam OR methamphetamine OR cocaine) (overdose OR poisoning OR toxicity) Australia filetype:pdf
```

```txt
("drug checking" OR "pill testing" OR "substance checking") (MDMA OR ketamine OR cocaine OR fentanyl OR nitazene OR "synthetic cannabinoid") Australia
```

---

## Ketamine & Analogues (Arylcyclohexylamines)

### Signal Scans

```txt
(ketamine OR "2-FDCK" OR "deschloroketamine" OR MXE OR "O-PCE") (alert OR warning OR "drug checking") Australia
```

```txt
(ketamine) ("bladder" OR cystitis OR "urinary" OR "K-cramps") Australia filetype:pdf
```

```txt
(ketamine) ("nitrous oxide" OR benzodiazepine OR alcohol) ("polysubstance" OR interaction) Australia
```

### Culture / Setting

```txt
(ketamine OR "K") (club OR festival OR "dance party" OR "warehouse") Australia
```

---

## MDMA / Ecstasy (MDxx + Benzofurans)

### Signal Scans

```txt
(MDMA OR ecstasy OR MDA OR MDEA OR "5-APB" OR "6-APB") (alert OR warning OR contamination OR "drug checking") Australia
```

```txt
(MDMA OR ecstasy) (hyperthermia OR dehydration OR hyponatremia OR "water intoxication") Australia filetype:pdf
```

### Culture / Setting

```txt
(MDMA OR ecstasy) (festival OR "music event" OR "dance" OR "rave") Australia
```

---

## Cocaine (Tropanes)

### Signal Scans

```txt
(cocaine) (seizure OR importation OR trafficking OR "drug intelligence") site:*.gov.au filetype:pdf
```

```txt
(cocaine) ("cardiac" OR "chest pain" OR "stroke" OR "emergency department") Australia filetype:pdf
```

### Culture / Setting

```txt
(cocaine OR "coke") ("nightlife" OR "hospitality" OR "workplace" OR "private events") Australia
```

---

## Opioids: Fentanyl + Nitazenes (Novel Watch)

### Signal Scans

```txt
(fentanyl OR nitazene OR "benzimidazole opioid" OR isotonitazene OR metonitazene) (alert OR warning OR contamination) Australia
```

```txt
(fentanyl OR nitazene) (overdose OR poisoning OR toxicity) Australia filetype:pdf
```

```txt
(fentanyl OR nitazene) (xylazine OR "tranq" OR "non-opioid adulterant") Australia
```

### Response / Harm Reduction

```txt
(fentanyl OR nitazene) (naloxone OR "take-home naloxone" OR THN) Australia site:*.gov.au
```

---

## Benzodiazepines (Bromazolam Focus)

### Signal Scans

```txt
(benzodiazepine OR benzo OR bromazolam OR etizolam OR flubromazolam) (alert OR warning OR contamination) Australia
```

```txt
(bromazolam OR etizolam OR flualprazolam OR clonazolam) (toxicity OR overdose OR "unknown pill") Australia
```

### Counterfeit / Adulteration / Pressed Pills

```txt
(benzodiazepine OR bromazolam) (pressed OR counterfeit OR "fake pills" OR "tablets") Australia
```

### Polysubstance Risk

```txt
(benzodiazepine OR bromazolam) (opioid OR fentanyl OR alcohol) (overdose OR toxicity OR "polysubstance") Australia filetype:pdf
```

---

## PIEDS (Performance & Image‑Enhancing Drugs)

> Includes anabolic‑androgenic steroids, peptides, SARMs, and related compounds.

### Signal Scans

```txt
(PIEDS OR steroid OR "anabolic steroid" OR SARMs OR "performance enhancing") (harm OR risk OR adverse) Australia filetype:pdf
```

```txt
(SARMs OR "selective androgen receptor modulator" OR ostarine OR ligandrol OR "LGD-4033" OR "RAD-140") (alert OR warning OR seizure) Australia
```

```txt
(testosterone OR nandrolone OR trenbolone OR oxandrolone OR stanozolol) (health advice OR harms OR "needle" OR injecting) Australia
```

### Culture / Setting

```txt
(PIEDS OR steroid OR "anabolic steroid") (gym OR bodybuilding OR "fitness" OR "strength") Australia
```

---

## Alcohol

### Signal Scans

```txt
(alcohol OR ethanol) ("health advice" OR "public health" OR warning) site:*.gov.au
```

```txt
(alcohol) (withdrawal OR "acute intoxication" OR poisoning OR "emergency department") Australia filetype:pdf
```

### Setting / Policy

```txt
(alcohol) ("late-night" OR "lockout" OR "night-time economy") Australia filetype:pdf
```

---

## Cannabis (Phytocannabinoids + Synthetic Cannabinoids)

### Signal Scans

```txt
(cannabis OR THC OR CBD OR "synthetic cannabinoid" OR "spice" OR "K2") (alert OR warning) site:*.gov.au
```

```txt
("synthetic cannabinoid" OR "spice" OR JWH-018 OR AB-FUBINACA) (toxicity OR poisoning OR psychosis) Australia filetype:pdf
```

### Regulation / Access

```txt
(cannabis OR THC OR CBD) (prescribing OR regulation OR "therapeutic goods" OR TGA) site:*.gov.au
```

### Product / Adulteration Signals

```txt
(cannabis OR "THC" OR "cannabis vape" OR "edible") (contamination OR "unexpected" OR "synthetic cannabinoid") Australia
```

---

## Cross‑Category Risk Patterns (High‑yield)

```txt
(opioid OR fentanyl OR nitazene) (benzodiazepine OR bromazolam) (overdose OR toxicity OR "polysubstance") Australia filetype:pdf
```

```txt
(MDMA OR ketamine OR cocaine) (festival OR "music event" OR "drug checking") Australia
```

```txt
("drug alert" OR "health alert") (nitazene OR xylazine OR fentanyl OR bromazolam OR "synthetic cannabinoid") site:*.gov.au
```

---

## Related Resources

- [Drug Alerts Pack](dork-packs/drug-alerts.md)
- [Drug Checking Pack](dork-packs/drug-checking.md)
- [Novel Substances Pack](dork-packs/novel-substances.md)
- [Synonym Blocks](05-synonym-blocks.md)

---

[← Back to Main Guide](../README.md)