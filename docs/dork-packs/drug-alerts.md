# Drug Alerts & Early Warning

> Real-time monitoring for high-strength, contaminated, or unexpected substances in drug supply.
> Essential for early warning systems and client safety.

[← Back to Dork Packs](README.md) | [← Main Guide](../README.md)

---

## ⚡ Quick Start

Get Australian government drug alerts from the last month:

```txt
site:*.gov.au "drug alert" after:2025-12-01
```

---

## 🟢 Basic Queries

### All Recent Government Alerts

```txt
site:*.gov.au intitle:"drug alert" after:2025-01-01
```

**Why this works:**

- `intitle:` ensures "drug alert" is in the page title (official alerts)
- `after:` filters to recent only
- `site:*.gov.au` catches all Australian government sources

### NSW Health Alerts Specifically

```txt
site:health.nsw.gov.au "drug warning"
```

### Victorian Health Alerts

```txt
site:health.vic.gov.au "drug alert" OR "health alert"
```

---

## 🟡 Intermediate Queries

### Multi-Term Alert Search

```txt
site:*.health.*.gov.au (intitle:"drug alert" OR intitle:"drug warning" OR intitle:"health alert") after:2025-01-01
```

**Why this works:**

- `site:*.health.*.gov.au` catches all state health departments
- Parentheses group the OR terms together
- Multiple title variations catch different naming conventions

### Specific Substance Alerts

```txt
site:*.gov.au ("nitazene" OR "xylazine" OR "fentanyl") (alert OR warning)
```

### Alerts with PDFs (Official Documents)

```txt
site:*.gov.au filetype:pdf ("drug alert" OR "drug warning" OR "drug notification")
```

---

## 🔴 Advanced Queries

### Comprehensive Alert Sweep

```txt
site:*.health.*.gov.au (intitle:"drug alert" OR intitle:"drug warning" OR intitle:"drug notification" OR intitle:"clinical safety alert") (opioid OR stimulant OR "novel substance" OR contamina*) after:2025-01-01 filetype:pdf
```

**Why this works:**

- Multiple title variations cover all alert naming conventions
- Substance categories catch relevant alerts
- PDF filter gets the actual alert documents
- Wildcard `contamina*` catches contamination, contaminated, contaminant

### Directory Mining for Unpublished Alerts

```txt
site:*.gov.au inurl:"/alerts/" OR inurl:"/warnings/" filetype:pdf "drug"
```

### High-Priority Emerging Substances

```txt
site:*.gov.au filetype:pdf ("nitazene" OR "benzimidazole opioid" OR "xylazine" OR "medetomidine") after:2024
```

### Alerts Mentioning Specific Formulations

```txt
site:*.gov.au "drug alert" ("high strength" OR "unexpected" OR "contaminated" OR "adulterated")
```

---

## 🏘️ Local News Monitoring

Government alerts can be slow. Local news often reports "bad batch" incidents or overdoses first.

### The "Location" Operator

Find reports specific to a city or town (Google News only).

```txt
location:Sydney "drug alert"
location:Melbourne "overdose"
```

### The "Local Source" Pattern

Target local news domains specifically to catch community reports.

```txt
site:.com.au (news OR times OR herald OR daily) ("bad batch" OR "warning") location:Newcastle
```

> **💡 Pro Tip:** See [Search Tweaks](../tools/search-tweaks.md#local-alert-monitoring) for more
> local monitoring recipes.

---

## 🌏 International Alert Systems

For comparison and early warning from other jurisdictions:

### UK (WEDINOS)

```txt
site:wedinos.org [substance name]
```

### Canada - 1

```txt
site:drugschecking.ca results
```

### Canada - 2

```txt
site:tripproject.ca alerts
```

### Europe

```txt
site:saferparty.ch OR site:checkit.wien analysis
```

### General International

```txt
"drug alert" (UK OR Canada OR Europe) [substance] 2025
```

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

```txt
("nitazene" OR "benzimidazole opioid") site:*.gov.au
```

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
