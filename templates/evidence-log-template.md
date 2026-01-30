# Evidence & Dork Log Template

> Track your search findings and document your research trail.

[← Back to Templates](./README.md) | [← Main Guide](../README.md)

---

## How to Use

1. Copy the table below into your own document
2. Fill in a row for each significant finding
3. Use the confidence scale consistently
4. Save your dorks for future reference

> [!TIP] Keep your evidence log alongside your briefing documents for audit trails and
> reproducibility.

---

## Template

### Research Topic: [Your Topic Here]

**Research Period:** `YYYY-MM-DD` to `YYYY-MM-DD` **Researcher:** [Your name]

---

#### Example Evidence Log

| Date         | Category   | Finding         | Source / URL | Dork Used      | Confidence | Notes              |
| :----------- | :--------- | :-------------- | :----------- | :------------- | :--------: | :----------------- |
| `YYYY-MM-DD` | [Category] | [Brief summary] | [Link]       | `[Your query]` |    1-5     | [Initial thoughts] |
|              |            |                 |              |                |            |                    |
|              |            |                 |              |                |            |                    |

---

#### Category Reference

| Category | Use For                                          |
| :------- | :----------------------------------------------- |
| Policy   | Government policy, guidelines, positions         |
| Research | Academic papers, evaluations, systematic reviews |
| Peer     | Peer-led publications, lived experience content  |
| Data     | Statistics, datasets, surveillance reports       |
| Alert    | Drug alerts, warnings, notifications             |
| Service  | Service directories, provider information        |
| Grey Lit | Reports, submissions, conference papers          |

---

#### Confidence Scale

| Score | Meaning                                          |
| :---: | :----------------------------------------------- |
|   5   | Primary source, authoritative, current, verified |
|   4   | Reliable source, recent, cross-referenced        |
|   3   | Credible source, some limitations noted          |
|   2   | Secondary source, may be dated or unverified     |
|   1   | Uncertain provenance, needs further verification |

---

#### Example Successful Dorks Library

Save queries that worked well for reuse:

```txt
# [Description of what this finds]
[Your successful dork here]
```

```txt
# [Description of what this finds]
[Another successful dork]
```

---

#### Example Gaps Identified

> [!NOTE] Document what you couldn't find or what questions remain unanswered.

| Gap              | Searched For     | Status      |
| :--------------- | :--------------- | :---------- |
| [What's missing] | [What you tried] | Open/Closed |
|                  |                  |             |

---

## Example Filled In

### Research Topic: Drug Checking Services in Australia

**Research Period:** `2026-01-15` to `2026-01-30` **Researcher:** Alex Chen, Policy Officer

---

#### Evidence Log

| Date         | Category | Finding                                                 | Source / URL       | Dork Used                                               | Confidence | Notes                 |
| :----------- | :------- | :------------------------------------------------------ | :----------------- | :------------------------------------------------------ | :--------: | :-------------------- |
| `2026-01-15` | Policy   | ACT drug checking pilot extended to 2027                | [ACT Health]       | `site:*.act.gov.au "drug checking" after:2025`          |     5      | Official announcement |
| `2026-01-17` | Research | UQ evaluation of Canberra DCS shows 85% behavior change | [UQ repository]    | `site:*.edu.au "drug checking" evaluation filetype:pdf` |     4      | Peer-reviewed, N=340  |
| `2026-01-20` | Peer     | AIVL position statement supports national rollout       | [AIVL website]     | `site:aivl.org.au "drug checking"`                      |     5      | Peak body position    |
| `2026-01-22` | Grey Lit | QLD considering pilot - leaked briefing note            | [Journalist tweet] | N/A - tip from colleague                                |     2      | Unconfirmed, monitor  |

---

#### Successful Dorks Library

```txt
# Australian government drug checking documents
site:*.gov.au filetype:pdf "drug checking" OR "pill testing" after:2024
```

```txt
# Academic evaluations of drug checking
site:*.edu.au filetype:pdf "drug checking" (evaluation OR effectiveness OR outcomes)
```

```txt
# International comparisons
site:emcdda.europa.eu OR site:drugschecking.ca "drug checking" filetype:pdf
```

---

#### Gaps Identified

| Gap                                     | Searched For                               | Status |
| :-------------------------------------- | :----------------------------------------- | :----- |
| No cost-benefit analysis for AU context | `"drug checking" "cost benefit" Australia` | Open   |
| Limited First Nations perspectives      | `"drug checking" Aboriginal OR Indigenous` | Open   |

---

_Template from the [Harm Reduction Dorking Guide](../README.md)_
