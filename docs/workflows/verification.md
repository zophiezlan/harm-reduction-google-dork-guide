# Verification Workflow: Source Validity & Trust

> Assess document quality, reliability, and currency.

[← Back to Workflows](README.md) | [← Main Guide](../README.md)

---

## 📊 The Source Ladder

When assessing documents, prefer sources in this order:

| Priority | Source Type                     | Examples                           | Trust Level                         |
| -------- | ------------------------------- | ---------------------------------- | ----------------------------------- |
| **1**    | Government Health Authority     | `*.health.*.gov.au`, `aihw.gov.au` | Official policy, alerts, guidelines |
| **2**    | University / Research Institute | `*.edu.au`, NDARC, Burnet          | Peer-reviewed evidence              |
| **3**    | Sector Org / Peak Body          | `*.org.au`, NUAA, AIVL             | Practice wisdom, lived experience   |
| **4**    | Everything Else                 | Blogs, media, social               | Context only, not primary evidence  |

---

## ✅ Verification Checklist

For every document you use, verify:

### 1. Publication Date / Last Updated

- [ ] Is there a clear publication date?
- [ ] When was it last updated?
- [ ] Is it still current for your purpose?

**If no date visible:** Search the PDF for `©` year or "version".

### 2. Author Credentials & Affiliations

- [ ] Who wrote it?
- [ ] What organisation are they from?
- [ ] Do they have relevant expertise?

### 3. Issuing Authority

- [ ] Which organisation published this?
- [ ] Is it an official government document?
- [ ] Is it from a reputable research institution?

### 4. Jurisdiction

- [ ] Which state/territory does this apply to?
- [ ] Is it national or state-specific?
- [ ] Does it apply to your context?

> ⚠️ **NSW guidance ≠ WA guidance.** Always check jurisdiction.

---

## 🔍 Quick Verification Patterns

### Check Document Currency

```txt
site:[DOMAIN] [DOCUMENT TITLE] (updated OR revised OR version)
```

### Find the Original Source

When news mentions a report:

```txt
"[REPORT TITLE]" filetype:pdf -site:news.* -site:*.com.au/news
```

### Verify Government Source

```txt
site:*.gov.au "[DOCUMENT TITLE]" filetype:pdf
```

### Check for Superseded Versions

```txt
site:[DOMAIN] "[DOCUMENT TITLE]" (superseded OR replaced OR updated)
```

---

## 🆔 Identity Verification (Name Net)

When verifying a researcher, peer worker, or sector expert, names can appear in many formats across
journals, conferences, and reports.

**The "Name Net" Pattern:** Search for multiple name variations simultaneously to catch all
citations.

```txt
("Jane Doe" OR "Jane M. Doe" OR "J. Doe" OR "Doe, Jane") (harm reduction OR "drug policy")
```

> **💡 Pro Tip:** See
> [The "Name Net"](../tools/search-tweaks.md#%EF%B8%8F-the-name-net-identity-verification) in Search
> Tweaks for the full technique.

---

## ⚠️ Red Flags

Watch for these warning signs:

| Red Flag                      | What It Means             |
| ----------------------------- | ------------------------- |
| No publication date           | May be outdated           |
| Unknown author/org            | May not be authoritative  |
| Not on official domain        | May be unofficial version |
| "Draft" watermark             | May not be final          |
| Pre-2020 clinical guidance    | May be outdated           |
| US/UK guidance for AU context | May not apply             |

---

## 🟢 Green Flags

Signs of reliable sources:

| Green Flag                    | What It Means          |
| ----------------------------- | ---------------------- |
| Government domain (`.gov.au`) | Official source        |
| University domain (`.edu.au`) | Academic rigour        |
| Clear publication date        | Currency verifiable    |
| Version control visible       | Document is maintained |
| PDF on official site          | Direct from source     |
| Peer-reviewed                 | Quality controlled     |

---

## 📋 Clinical Currency Check

For clinical guidance (withdrawal, overdose management, dosing), always check:

1. **Publication date** - Is it recent enough?
2. **Issuing authority** - Which health department?
3. **Jurisdiction** - Does it apply to your state?
4. **Supersession** - Has it been replaced?

### Clinical Guidance Search Pattern

```txt
site:*.health.*.gov.au "[TOPIC]" (guideline OR protocol) filetype:pdf after:2022
```

---

## 🔄 Cross-Verification

Don't rely on a single source. Cross-check with:

### Government Position

```txt
site:*.gov.au "[TOPIC]" (position OR statement OR policy)
```

### Research Evidence

```txt
site:*.edu.au "[TOPIC]" (evaluation OR evidence OR effectiveness) filetype:pdf
```

### Sector/Peer Perspective

```txt
site:*.org.au "[TOPIC]" (position OR practice OR perspective)
```

---

## 📥 Archiving Verified Documents

Government URLs frequently break. When you find a verified document:

1. **Save the PDF locally** - URLs can change
2. **Note the access date** - For citations
3. **Archive with Wayback Machine** - Go to [web.archive.org](https://web.archive.org) and save the
   URL

---

## 🔍 Finding Original Sources

### When You Have a Citation

```txt
"[EXACT TITLE]" filetype:pdf
```

### When News Mentions a Report

```txt
"[REPORT NAME]" site:*.gov.au OR site:*.edu.au filetype:pdf
```

### When You Have an Author

```txt
"[AUTHOR NAME]" [TOPIC] filetype:pdf site:*.edu.au
```

---

## 📊 Assessing Research Quality

### Systematic Reviews (Highest Quality)

```txt
intitle:"systematic review" [TOPIC] filetype:pdf
```

### Meta-Analyses

```txt
intitle:"meta-analysis" [TOPIC] filetype:pdf
```

### RCTs

```txt
intitle:"randomized controlled trial" [TOPIC] filetype:pdf
```

### Quality Indicators

Look for:

- Published in peer-reviewed journal
- Clear methodology described
- Sample size reported
- Limitations acknowledged

---

## 🔗 Related Resources

- [Research Workflow](research-workflow.md)
- [Troubleshooting](../troubleshooting.md)
- [Browser Extensions](../tools/browser-extensions.md) - Archiving tools

---

[← Back to Workflows](README.md)
