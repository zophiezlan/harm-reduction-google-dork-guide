# Drug Alerts & Early Warning

> Real-time monitoring for high-strength, contaminated, or unexpected substances in drug supply.
> Essential for early warning systems and client safety.

[← Back to Dork Packs](README.md) | [← Main Guide](../../README.md)

---

## ⚡ Quick Start

Get Australian government drug alerts from the last month:

```txt
site:*.gov.au "drug alert" after:2025-12-01
```

[👉 **Run this Search**](https://www.google.com/search?q=site%3A*.gov.au%20%22drug%20alert%22%20after%3A2025-12-01)

---

## 🟢 Basic Queries

### All Recent Government Alerts

```txt
site:*.gov.au intitle:"drug alert" after:2025-01-01
```

[👉 **Run this Search**](https://www.google.com/search?q=site%3A*.gov.au%20intitle%3A%22drug%20alert%22%20after%3A2025-01-01)

**Why this works:**

- `intitle:` ensures "drug alert" is in the page title (official alerts)
- `after:` filters to recent only
- `site:*.gov.au` catches all Australian government sources

### NSW Health Alerts Specifically

```txt
site:health.nsw.gov.au "drug warning"
```

[👉 **Run this Search**](https://www.google.com/search?q=site%3Ahealth.nsw.gov.au%20%22drug%20warning%22)

### Victorian Health Alerts

```txt
site:health.vic.gov.au "drug alert" OR "health alert"
```

[👉 **Run this Search**](https://www.google.com/search?q=site%3Ahealth.vic.gov.au%20%22drug%20alert%22%20OR%20%22health%20alert%22)

---

## 🟡 Intermediate Queries

### Multi-Term Alert Search

```txt
site:*.health.*.gov.au (intitle:"drug alert" OR intitle:"drug warning" OR intitle:"health alert") after:2025-01-01
```

[👉 **Run this Search**](<https://www.google.com/search?q=site%3A*.health.*.gov.au%20(intitle%3A%22drug%20alert%22%20OR%20intitle%3A%22drug%20warning%22%20OR%20intitle%3A%22health%20alert%22)%20after%3A2025-01-01>)

**Why this works:**

- `site:*.health.*.gov.au` catches all state health departments
- Parentheses group the OR terms together
- Multiple title variations catch different naming conventions

### Specific Substance Alerts

```txt
site:*.gov.au ("nitazene" OR "xylazine" OR "fentanyl") (alert OR warning)
```

[👉 **Run this Search**](<https://www.google.com/search?q=site%3A*.gov.au%20(%22nitazene%22%20OR%20%22xylazine%22%20OR%20%22fentanyl%22)%20(alert%20OR%20warning)>)

### Alerts with PDFs (Official Documents)

```txt
site:*.gov.au filetype:pdf ("drug alert" OR "drug warning" OR "drug notification")
```

[👉 **Run this Search**](<https://www.google.com/search?q=site%3A*.gov.au%20filetype%3Apdf%20(%22drug%20alert%22%20OR%20%22drug%20warning%22%20OR%20%22drug%20notification%22)>)

---

## 🔴 Advanced Queries

### Comprehensive Alert Sweep

```txt
site:*.health.*.gov.au (intitle:"drug alert" OR intitle:"drug warning" OR intitle:"drug notification" OR intitle:"clinical safety alert") (opioid OR stimulant OR "novel substance" OR contamina*) after:2025-01-01 filetype:pdf
```

[👉 **Run this Search**](<https://www.google.com/search?q=site%3A*.health.*.gov.au%20(intitle%3A%22drug%20alert%22%20OR%20intitle%3A%22drug%20warning%22%20OR%20intitle%3A%22drug%20notification%22%20OR%20intitle%3A%22clinical%20safety%20alert%22)%20(opioid%20OR%20stimulant%20OR%20%22novel%20substance%22%20OR%20contamina*)%20after%3A2025-01-01%20filetype%3Apdf>)

**Why this works:**

- Multiple title variations cover all alert naming conventions
- Substance categories catch relevant alerts
- PDF filter gets the actual alert documents
- Wildcard `contamina*` catches contamination, contaminated, contaminant

### Directory Mining for Unpublished Alerts

```txt
site:*.gov.au inurl:"/alerts/" OR inurl:"/warnings/" filetype:pdf "drug"
```

[👉 **Run this Search**](https://www.google.com/search?q=site%3A*.gov.au%20inurl%3A%22%2Falerts%2F%22%20OR%20inurl%3A%22%2Fwarnings%2F%22%20filetype%3Apdf%20%22drug%22)

### High-Priority Emerging Substances

```txt
site:*.gov.au filetype:pdf ("nitazene" OR "benzimidazole opioid" OR "xylazine" OR "medetomidine") after:2024
```

[👉 **Run this Search**](<https://www.google.com/search?q=site%3A*.gov.au%20filetype%3Apdf%20(%22nitazene%22%20OR%20%22benzimidazole%20opioid%22%20OR%20%22xylazine%22%20OR%20%22medetomidine%22)%20after%3A2024>)

### Alerts Mentioning Specific Formulations

```txt
site:*.gov.au "drug alert" ("high strength" OR "unexpected" OR "contaminated" OR "adulterated")
```

[👉 **Run this Search**](<https://www.google.com/search?q=site%3A*.gov.au%20%22drug%20alert%22%20(%22high%20strength%22%20OR%20%22unexpected%22%20OR%20%22contaminated%22%20OR%20%22adulterated%22)>)

---

## 🏘️ Local News Monitoring

Government alerts can be slow. Local news often reports "bad batch" incidents or overdoses first.

### The "Location" Operator

Find reports specific to a city or town (Google News only).

```txt
location:Sydney "drug alert"
location:Melbourne "overdose"
```
[👉 **Run this Search**](https://www.google.com/search?q=location%3ASydney%20%22drug%20alert%22%0D%0Alocation%3AMelbourne%20%22overdose%22)

### The "Local Source" Pattern

Target local news domains specifically to catch community reports.

```txt
site:.com.au (news OR times OR herald OR daily) ("bad batch" OR "warning") location:Newcastle
```
[👉 **Run this Search**](https://www.google.com/search?q=site%3A.com.au%20(news%20OR%20times%20OR%20herald%20OR%20daily)%20(%22bad%20batch%22%20OR%20%22warning%22)%20location%3ANewcastle)

> **💡 Pro Tip:** See [Search Tweaks](../tools/search-tweaks.md#local-alert-monitoring) for more
> local monitoring recipes.

---

## 🌏 International Alert Systems

For comparison and early warning from other jurisdictions:

### UK (WEDINOS)

```txt
site:wedinos.org [substance name]
```

[👉 **Run this Search**](https://www.google.com/search?q=site%3Awedinos.org%20%5Bsubstance%20name%5D)

### Canada

```txt
site:drugschecking.ca results
site:tripproject.ca alerts
```

[👉 **Run this Search**](https://www.google.com/search?q=site%3Adrugschecking.ca%20results%0Asite%3Atripproject.ca%20alerts)

### Europe

```txt
site:saferparty.ch OR site:checkit.wien analysis
```

[👉 **Run this Search**](https://www.google.com/search?q=site%3Asaferparty.ch%20OR%20site%3Acheckit.wien%20analysis)

### General International

```txt
"drug alert" (UK OR Canada OR Europe) [substance] 2025
```

[👉 **Run this Search**](<https://www.google.com/search?q=%22drug%20alert%22%20(UK%20OR%20Canada%20OR%20Europe)%20%5Bsubstance%5D%202025>)

---

## 📍 State-by-State Quick Reference

| State | Query                                                   |
| ----- | ------------------------------------------------------- |
| ACT   | `site:health.act.gov.au "drug alert"`                   |
| NSW   | `site:health.nsw.gov.au "drug warning" OR "drug alert"` |
| NT    | `site:health.nt.gov.au "drug alert"`                    |
| QLD   | `site:health.qld.gov.au "drug alert"`                   |
| SA    | `site:sahealth.sa.gov.au "drug alert"`                  |
| TAS   | `site:health.tas.gov.au "drug alert"`                   |
| VIC   | `site:health.vic.gov.au "drug alert" OR "health alert"` |
| WA    | `site:health.wa.gov.au "drug warning"`                  |

---

## 🔔 Setting Up Monitoring

Use these dorks as Google Alerts for automatic notifications:

1. Go to [google.com/alerts](https://www.google.com/alerts)
2. Enter your dork as the query
3. Set frequency to "As-it-happens"
4. Choose email delivery

**Recommended alerts:**

```txt
site:*.health.*.gov.au ("drug alert" OR "drug warning")
```

[👉 **Run this Search**](<https://www.google.com/search?q=site%3A*.health.*.gov.au%20(%22drug%20alert%22%20OR%20%22drug%20warning%22)>)

```txt
("nitazene" OR "benzimidazole opioid") site:*.gov.au
```

[👉 **Run this Search**](<https://www.google.com/search?q=(%22nitazene%22%20OR%20%22benzimidazole%20opioid%22)%20site%3A*.gov.au>)

See [Google Alerts Guide](../tools/google-alerts.md) for detailed setup.

---

## 🔗 Related Resources

- **Synonym Block:** [Alert Terms](../05-synonym-blocks.md#-alert-terms)
- **Related Packs:** [Novel Substances](novel-substances.md),
  [Coroners & Deaths](coroners-deaths.md)
- **Workflow:** [Monitoring & Early Warning](../workflows/monitoring.md)
- **Tool:** [Google Alerts](../tools/google-alerts.md)

---

[← Back to Dork Packs](README.md)
