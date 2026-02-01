# Synonym Blocks: Reusable Term Groups

> Copy these pre-built term groups to expand your searches and catch all relevant documents.

[← Back to Main Guide](README.md) | [← Domain Map](04-domain-map.md) |
[Next: Dork Packs →](dork-packs/README.md)

---

## 📝 How to Use Synonym Blocks

Synonym blocks are pre-built OR groups that catch terminology variations. Copy and paste them into
your searches.

**Example:**

```txt
site:*.gov.au [ALERT_TERMS] after:2024
```

Becomes:

```txt
site:*.gov.au ("drug alert" OR "drug warning" OR "public health alert" OR "health warning") after:2024
```

---

## 🌏 Spelling Variations (AU/UK vs US)

Australian documents use British spelling, but you may need US spelling to find international
content.

| Pattern                      | Catches                                                |
| ---------------------------- | ------------------------------------------------------ |
| `(behavio*)`                 | behaviour, behavior, behavioural, behavioral           |
| `(centrali*)`                | centralise, centralize, centralisation                 |
| `(harmoni*)`                 | harmonise, harmonize, harmonisation                    |
| `(minimis* OR minimiz*)`     | minimise, minimize, minimisation, minimization         |
| `(organi*)`                  | organisation, organization, organised, organized       |
| `(program*)`                 | programme, program, programmes, programs               |
| `(recogni*)`                 | recognise, recognize, recognition                      |
| `(stigmatis* OR stigmatiz*)` | stigmatise, stigmatize, stigmatisation, stigmatization |

**Combined spelling block:**

```txt
("harm minimisation" OR "harm minimization" OR "harm reduction")
```

---

## 🚨 Alert Terms

For drug alert and early warning searches:

```txt
("drug alert" OR "drug warning" OR "drug notification" OR "public health alert" OR "health warning" OR "clinical safety alert" OR "safety notice" OR "urgent health warning")
```

**Compact version:**

```txt
(intitle:"drug alert" OR intitle:"drug warning" OR intitle:"health alert")
```

---

## 💉 Naloxone Terms

```txt
(naloxone OR narcan OR nyxoid OR "opioid reversal" OR "overdose reversal" OR "opioid antagonist")
```

**Extended with programs:**

```txt
(naloxone OR narcan OR nyxoid) (program OR scheme OR initiative OR distribution OR "take-home" OR THN)
```

---

## 👥 Peer/Lived Experience Terms

```txt
("peer worker" OR "peer support" OR "lived experience" OR "consumer worker" OR PWLE OR "people with lived experience" OR "experts by experience" OR "peer specialist")
```

**For peer workforce development:**

```txt
("peer worker" OR "peer support worker" OR "lived experience worker" OR "consumer consultant" OR "peer educator" OR "peer mentor" OR "peer navigator")
```

**For peer-led initiatives:**

```txt
("peer-led" OR "user-led" OR "consumer-led" OR "peer-driven" OR "peer-based" OR "by peers for peers")
```

---

## 💊 Opioid Treatment Terms

```txt
(OAT OR OST OR "opioid agonist" OR "opioid substitution" OR methadone OR buprenorphine OR suboxone OR "pharmacotherapy" OR "opioid treatment program")
```

**For opioid types:**

```txt
(heroin OR morphine OR oxycodone OR fentanyl OR "pharmaceutical opioid" OR "prescription opioid" OR codeine OR tramadol)
```

---

## 🔬 Drug Checking Terms

```txt
("drug checking" OR "pill testing" OR "substance checking" OR "drug analysis" OR "harm reduction testing")
```

**With services:**

```txt
("drug checking" OR "pill testing") (service OR trial OR program OR evaluation)
```

---

## 💉 NSP Terms (Needle Syringe Program)

```txt
("needle syringe program" OR NSP OR "needle exchange" OR "syringe exchange" OR "syringe service" OR "needle and syringe" OR "injecting equipment")
```

---

## 🧪 Novel/Emerging Substances

### Synthetic Opioids

```txt
(nitazene OR isotonitazene OR protonitazene OR metonitazene OR "benzimidazole opioid" OR "novel opioid")
```

### Adulterants

```txt
(xylazine OR medetomidine OR "novel adulterant" OR "cutting agent" OR "contaminant")
```

### Novel Benzodiazepines

```txt
("novel benzodiazepine" OR "designer benzodiazepine" OR flualprazolam OR etizolam OR clonazolam)
```

### General NPS

```txt
("novel psychoactive" OR NPS OR "new psychoactive" OR "emerging substance" OR "designer drug")
```

---

## 🏥 Treatment & Service Terms

### AOD Services

```txt
(AOD OR "alcohol and other drugs" OR "alcohol and drug" OR "drug and alcohol" OR "substance use" OR "substance abuse")
```

### Treatment Types

```txt
(treatment OR rehabilitation OR detox OR withdrawal OR counselling OR therapy)
```

### Service Models

```txt
("harm reduction" OR "low threshold" OR "drop-in" OR outreach OR "mobile service" OR "assertive outreach")
```

---

## 🎪 Festival/Event Terms

```txt
(festival OR "music event" OR "music festival" OR rave OR "dance party" OR "outdoor event" OR "live music")
```

**With harm reduction:**

```txt
(festival OR "music event") ("harm reduction" OR "drug checking" OR "medical" OR "peer support" OR DanceWize)
```

---

## 👩‍⚕️ Workforce Terms

### Clinical Workforce

```txt
(clinician OR nurse OR GP OR "general practitioner" OR doctor OR prescriber OR pharmacist)
```

### AOD Workforce

```txt
("AOD worker" OR "drug and alcohol worker" OR counsellor OR "case manager" OR "support worker")
```

### Workforce Development

```txt
(training OR supervision OR competencies OR standards OR qualification OR "professional development" OR workforce)
```

---

## 📊 Research Terms

### Study Types

```txt
("systematic review" OR "meta-analysis" OR "randomized controlled trial" OR RCT OR "cohort study" OR "qualitative study")
```

### Evidence Quality

```txt
(evaluation OR effectiveness OR outcomes OR evidence OR "best practice" OR "evidence-based")
```

### Grey Literature

```txt
(report OR "working paper" OR "discussion paper" OR submission OR brief OR "white paper")
```

---

## 🏠 Social Determinants Terms

### Housing

```txt
(housing OR homelessness OR "rough sleeping" OR "housing first" OR "supportive housing" OR "transitional housing" OR accommodation)
```

### Social Factors

```txt
("social determinants" OR poverty OR unemployment OR disadvantage OR "social exclusion" OR marginali*)
```

---

## 🧠 Mental Health Terms

### Co-occurring Conditions

```txt
("dual diagnosis" OR "co-occurring" OR comorbid* OR "co-existing" OR "mental health and substance")
```

### Conditions

```txt
(anxiety OR depression OR PTSD OR trauma OR psychosis OR "mental illness" OR "mental health")
```

---

## 👶 Youth Terms

```txt
(youth OR "young people" OR adolescent OR teen* OR "young adult" OR "emerging adult")
```

**With services:**

```txt
(youth OR "young people") ("early intervention" OR prevention OR education OR service)
```

---

## 👨‍👩‍👧 Family Terms

```txt
(family OR families OR carer OR "affected other" OR parent OR "family member" OR sibling)
```

**For support services:**

```txt
("family support" OR "family inclusive" OR "family therapy" OR "carer support" OR "affected family")
```

---

## 🖤💛❤️ First Nations Terms

> Always prioritise Aboriginal Community Controlled sources.

```txt
(Aboriginal OR "Torres Strait Islander" OR Indigenous OR "First Nations" OR "First Peoples")
```

**For cultural approaches:**

```txt
("cultural healing" OR "connection to country" OR "cultural safety" OR "self-determination" OR "community controlled")
```

**Regional identifiers (examples):**

```txt
(Koori OR Murri OR Nunga OR Nyoongar OR Palawa)
```

---

## ⚖️ Justice Terms

```txt
(prison OR custody OR corrections OR incarceration OR "criminal justice" OR "justice system" OR detention)
```

**For diversion:**

```txt
("drug court" OR diversion OR "drug diversion" OR MERIT OR "court referral")
```

---

## 📋 Policy Terms

```txt
(policy OR strategy OR framework OR guidelines OR "action plan" OR legislation OR law)
```

**For consultations:**

```txt
(consultation OR "call for submissions" OR submission OR inquiry OR "public comment")
```

---

## 🔄 Document Status Terms

```txt
(draft OR final OR "for comment" OR approved OR current OR superseded OR archived)
```

---

## 📅 Time/Currency Terms

**Recent (last 2 years):**

```txt
after:2024-01-01
```

**Historical research:**

```txt
1980..2010
before:2015
```

---

## 🌐 User-Hosted Platform Patterns

> Use these to search across user-published content on community platforms.

### Documentation Platforms

```txt
(site:*.notion.site OR site:*.gitbook.io OR site:*.readthedocs.io OR site:*.readme.io)
```

### Blogging & Newsletter Platforms

```txt
(site:*.wordpress.com OR site:*.blogspot.com OR site:medium.com OR site:*.substack.com OR site:*.tumblr.com OR site:telegra.ph)
```

### Static Site Hosts

```txt
(site:*.github.io OR site:*.pages.dev OR site:*.vercel.app OR site:*.netlify.app OR site:*.web.app OR site:*.glitch.me)
```

### File Hosting Platforms

```txt
(site:drive.google.com OR site:dropbox.com OR site:onedrive.live.com OR site:archive.org OR site:speakerdeck.com)
```

### Community & Forum Platforms

```txt
(site:reddit.com OR site:quora.com OR site:groups.google.com)
```

### Research Data Platforms

```txt
(site:zenodo.org OR site:osf.io OR site:figshare.com OR site:kaggle.com)
```

### Bio Link & Creator Platforms

```txt
(site:linktr.ee OR site:ko-fi.com OR site:patreon.com OR site:about.me)
```

### Self-Hosted Platform Footprints

```txt
("Powered by Discourse" OR "MediaWiki" OR "DokuWiki" OR "BookStack" OR "TiddlyWiki")
```

### All Major User Platforms (Comprehensive)

```txt
(site:*.notion.site OR site:*.gitbook.io OR site:*.wordpress.com OR site:medium.com OR site:*.substack.com OR site:reddit.com)
```

**Using platform patterns with topics:**

```txt
(site:*.notion.site OR site:*.gitbook.io OR site:*.wordpress.com) "harm reduction" guide OR resources
(site:reddit.com OR site:quora.com) "naloxone" OR "drug checking" -advertisement
(site:drive.google.com OR site:speakerdeck.com) "harm reduction" training filetype:pdf
```

---

## 🔧 Using Blocks in Queries

### Example 1: Drug Alerts with Full Synonym Block

```txt
site:*.health.*.gov.au ("drug alert" OR "drug warning" OR "public health alert" OR "health warning") after:2024
```

### Example 2: Peer Workforce with Multiple Blocks

```txt
site:*.org.au
  ("peer worker" OR "peer support" OR "lived experience")
  (training OR supervision OR competencies)
  filetype:pdf
  -jobs
```

### Example 3: Naloxone + Treatment Combo

```txt
site:*.gov.au
  (naloxone OR narcan OR nyxoid)
  (program OR guidelines OR training)
  filetype:pdf
  after:2023
```

---

## 💡 Tips for Building Custom Blocks

1. **Start with 3-5 core terms**
2. **Add Australian/British spelling variants**
3. **Include common abbreviations** (THN, NSP, OAT, etc.)
4. **Test incrementally** - too many OR terms can confuse Google
5. **Save working combinations** for reuse

---

[← Domain Map](04-domain-map.md) | [Dork Packs →](dork-packs/README.md)
