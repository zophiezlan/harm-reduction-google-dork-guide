# Research Workflow: Four-Step Funnel

> Systematic approach to gathering evidence on any harm reduction topic.

[← Back to Workflows](README.md) | [← Main Guide](../README.md)

---

## 🎯 The Four-Step Funnel

Progressive narrowing from broad context to specific, current documents.

### Step 1: Get the Landscape (Broad)

Start with a simple search to understand what's out there.

```txt
"drug checking" Australia
```

**Purpose:** See what terminology is used, identify key organisations, understand the landscape.

### Step 2: Focus on Jurisdiction

Narrow to your relevant domain.

```txt
"drug checking" NSW site:*.gov.au
```

**Purpose:** Focus on authoritative sources in your jurisdiction.

### Step 3: Find Specific Documents

Add document type filters.

```txt
site:health.nsw.gov.au filetype:pdf "drug checking trial" evaluation
```

**Purpose:** Get actual reports and documents, not just web pages.

### Step 4: Filter by Recency

Add date constraints.

```txt
site:health.nsw.gov.au filetype:pdf "drug checking trial" after:2024-01-01
```

**Purpose:** Ensure you're finding current information.

---

## 🔄 Cross-Reference Workflow (Triangulation)

When researching a topic, search three perspectives to build a complete picture.

### 1. Government Position

```txt
site:*.gov.au "drug checking" (position OR statement OR policy)
```

What does government say? Official policy, guidelines, statements.

### 2. Research Evidence

```txt
site:*.edu.au filetype:pdf "drug checking" (effectiveness OR evaluation)
```

What does the evidence say? Academic research, evaluations, systematic reviews.

### 3. Peer/Sector Perspective

```txt
site:*.org.au "drug checking" (advocacy OR support OR "lived experience")
```

What do peers and the sector say? Practice wisdom, advocacy positions, lived experience.

---

## 🧠 Advanced: Synonym Expansion

Don't guess keywords. Use Wikipedia to generate a comprehensive list of synonyms, street names, and
chemical names for your target substance.

**Workflow:**

1. Search `site:wikipedia.org [substance]`
2. Extract **"Also known as"**, **IUPAC names**, and **Street names**
3. Build a "Synonym Block" (OR group)

> **💡 Pro Tip:** See
> [Wikipedia Synonym Expansion](../tools/search-tweaks.md#-wikipedia-synonym-expansion) for the
> step-by-step recipe.

---

## ⚓ Advanced: Bias Counteraction

Search results often skew towards "recovery" or law enforcement narratives. Use the **"Sinker"**
method to force Google to prioritize harm reduction context.

**The Technique:** Add weighted terms to "sink" the query into your desired context.

```txt
"nitazenes" AROUND(15) "harm reduction"
```

> **💡 Pro Tip:** See
> [The "Sinker" Method](../tools/search-tweaks.md#-the-sinker-method-bias-counteraction) for more
> weighting patterns.

---

## ✅ Quality Control: Junk Removal

Apply these exclusions progressively when results are messy.

### Level 1: Remove Job Listings

```txt
-jobs -careers -position -vacancy -employment
```

### Level 2: Remove Aggregators

```txt
-site:researchgate.net -site:academia.edu -site:scribd.com -site:pinterest.com
```

### Level 3: Remove News/Opinion

```txt
-news -opinion -editorial -comment -site:news.*
```

### Level 4: Remove PDF Viewers

```txt
-pdfviewer -flipbook -issuu -docplayer
```

### Force Documents

```txt
filetype:pdf
```

---

## 🔍 Finding Original Sources

When a news article mentions a report, find the actual document.

### Skip the News

```txt
"drug checking trial" filetype:pdf -site:news.* -site:*.com.au/news
```

### Find Primary Research

```txt
intitle:"methods" OR intitle:"methodology" "harm reduction" filetype:pdf
```

---

## 📋 Building Citation Lists

### Systematic Reviews & Meta-Analyses

```txt
intitle:"systematic review" harm reduction intervention filetype:pdf
intitle:"meta-analysis" needle syringe program effectiveness
```

### Recent High-Quality Evidence

```txt
(intitle:"randomized controlled trial" OR intitle:"systematic review") "harm reduction" after:2020 filetype:pdf
```

### Australian-Specific Evidence

```txt
site:*.edu.au "harm reduction" (evaluation OR effectiveness OR outcomes) filetype:pdf after:2020
```

---

## 📝 Documentation Template

When gathering evidence, document:

| Field                  | Notes                   |
| ---------------------- | ----------------------- |
| **Topic**              | What you're researching |
| **Search Strategy**    | Key dorks used          |
| **Sources Found**      | List of documents       |
| **Quality Assessment** | Source reliability      |
| **Key Findings**       | Main takeaways          |
| **Gaps**               | What's missing          |

---

## 💡 Pro Tips

### Tip 1: Start Simple

Don't over-engineer your first search. Begin broad and add operators incrementally.

### Tip 2: Save Working Searches

When you find a dork that works well, save it for future use.

### Tip 3: Check Multiple Institutions

Don't rely on one source. Check:

- Multiple government departments
- Different research centres
- Peer organisations

### Tip 4: Look for Grey Literature

Much valuable evidence isn't in journals:

- Government reports
- Evaluations
- Conference presentations
- Sector publications

---

## 🔗 Related Resources

- [Verification Workflow](verification.md) - Assess source quality
- [Research Pack](../dork-packs/research.md) - Research-specific dorks
- [Academic Access](../resources/academic-access.md) - Access paywalled content

---

[← Back to Workflows](README.md)
