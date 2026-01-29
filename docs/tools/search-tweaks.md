# Search Tweaks & Creative Methodologies

> Creative "recipes" and search patterns adapted from OSINT and power-user communities for the
> specific challenges of harm reduction research.

[← Back to Main Guide](../../README.md)

---

## 🧹 The "Clean Search" Filter (Clutter Removal)

Harm reduction searches are often plagued by "rehab spam"—commercial addiction treatment centers
that use SEO to dominate search results for drug terms. These results often contain stigmatizing
language or unscientific information.

Use this "cleaning block" to remove the most common commercial clutter.

### The Standard Cleaner Block

Copy and append this to your queries to remove commercial rehab aggregators and generic treatment
directories.

```txt
-site:rehabs.com -site:addictioncenter.com -site:recovery.org -site:drugabuse.com -site:treatment-centers.net -site:projectknow.com -site:americanaddictioncenters.org
```

### The "Sales" Cleaner

Removes pages trying to sell you something or get you to sign up.

```txt
-pricing -buy -shop -cart -checkout -"call now" -"insurance accepted"
```

### Example Usage

**Query:** Finding info on "kratom withdrawal" without the sales pitch.

```txt
"kratom" withdrawal symptoms -site:rehabs.com -site:addictioncenter.com -pricing -buy
```

---

## ⚓ The "Sinker" Method (Bias Counteraction)

Search engines often bias results towards "recovery" or "law enforcement" narratives because those
sites have higher authority. The "Sinker" method uses weighted terms to "sink" the query deep into
the harm reduction context.

### How it works

Add strongly associated harm reduction terms to your query, sometimes repeating them or using the
`AROUND(n)` operator to force context.

### Pattern 1: The Context Anchor

Force Google to find your term _only_ when it appears near specific HR language.

```txt
"nitazenes" AROUND(15) "harm reduction"
"xylazine" AROUND(10) "supply"
"methamphetamine" AROUND(20) "safe smoking"
```

### Pattern 2: The Repetition Weighting

Repeating a term can sometimes signal higher relevance to search algorithms (results vary, but
effective for niche topics).

```txt
"safe supply" "safe supply" "safe supply" hydromorphone
```

---

## 🕸️ The "Name Net" (Identity Verification)

When verifying a researcher, peer worker, or vendor, names can appear in various formats. This
technique (adapted from "Carl's Name Net") helps you find all mentions.

### The Concept

Search for the person's name in multiple formats simultaneously to catch academic citations,
conference proceedings, and news mentions.

### The Pattern

For a person named **Jane Mary Doe**:

```txt
("Jane Doe" OR "Jane M. Doe" OR "J. Doe" OR "Doe, Jane" OR "Doe, J.")
```

### Contextual Filtering

Add keywords to avoid false positives (other people with the same name).

```txt
("Jane Doe" OR "Doe, Jane") (harm reduction OR "drug policy" OR nuaa OR unsw)
```

---

## ⏳ Time-Travel Searching (Trend Analysis)

Track the emergence of a new substance or term over time to pinpoint when it first appeared in
public discourse. This is the "TimeCake" method adaptation.

### The "First Appearance" Hunt

Use strict date ranges to find the earliest mentions.

**Query:** When did "isotonitazene" first appear in reports?

**Step 1:** Broad search.

```txt
"isotonitazene" before:2019-01-01
```

**Step 2:** Narrow the window.

```txt
"isotonitazene" after:2019-01-01 before:2019-06-01
```

### The "Crisis Timeline"

Map a specific event (like a bad batch) day-by-day.

```txt
"heroin" overdose location:Sydney after:2024-01-01 before:2024-01-07
```

---

## 📰 Local Alert Monitoring

Standard news searches often miss hyper-local reports. Use these tweaks to find community-level
alerts.

### The "Location" Operator

Google News supports a `location:` operator that is often overlooked.

```txt
location:Sydney "drug alert"
location:Melbourne "overdose"
```

### The "Local Source" Pattern

Target local news domains specifically.

```txt
site:.com.au (news OR times OR herald OR chronicle OR daily) "bad batch" OR "warning"
```

---

## 🧠 Wikipedia Synonym Expansion

Use Wikipedia not as a source, but as a keyword generator. Wikipedia articles often list chemical
synonyms, street names, and brand names in the first paragraph or infobox.

**Workflow:**

1. Search Wikipedia for the substance (e.g., `site:wikipedia.org nitazenes`).
2. Look for **"also known as"**, **IUPAC names**, or **street names**.
3. Build a huge OR block with these terms.

**Resulting Dork:**

```txt
("nitazene" OR "2-benzylbenzimidazole" OR "etonitazene" OR "isotonitazene" OR "protonitazene") ("drug alert" OR "warning")
```
