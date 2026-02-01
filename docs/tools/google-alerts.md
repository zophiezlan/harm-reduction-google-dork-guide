# Google Alerts

> Set up automated monitoring for harm reduction intelligence.

[← Back to Tools](README.md) | [← Main Guide](../README.md)

---

## 🔧 Setup Guide

### Step 1: Go to Google Alerts

Visit [google.com/alerts](https://www.google.com/alerts)

### Step 2: Enter Your Query

Use any dork as your alert query. Example:

```txt
site:*.health.*.gov.au ("drug alert" OR "drug warning")
```

### Step 3: Configure Options

- **How often:** As-it-happens, Daily, or Weekly
- **Sources:** Automatic, News, Blogs, Web, etc.
- **Language:** English
- **Region:** Australia
- **How many:** All results or Only the best results
- **Deliver to:** Your email address

### Step 4: Create Alert

Click "Create Alert" and you're done.

---

## 📋 Recommended Alerts

### Priority: Drug Alerts (As-it-happens)

> [!IMPORTANT] This is the most critical alert for frontline harm reduction workers. Set this to
> "As-it-happens" for immediate notification of health warnings.

```txt
site:*.health.*.gov.au ("drug alert" OR "drug warning" OR "drug notification")
```

**Why:** Immediate notification of health warnings.

### Daily: Drug Checking News

```txt
"drug checking" OR "pill testing" (Australia OR NSW OR VIC) -jobs
```

**Why:** Stay current on drug checking developments.

### Weekly: Policy Consultations

```txt
site:*.gov.au ("consultation" OR "call for submissions") ("harm reduction" OR "drug policy")
```

**Why:** Don't miss consultation deadlines.

### Weekly: Research Updates

```txt
site:ndarc.med.unsw.edu.au OR site:burnet.edu.au "harm reduction" OR naloxone
```

**Why:** Track new research from key institutions.

### Weekly: Parliamentary Inquiries

```txt
site:aph.gov.au OR site:parliament.*.gov.au (inquiry OR committee) (drug OR "harm reduction")
```

**Why:** Monitor parliamentary activity.

---

## 🎯 Topic-Specific Alerts

### Novel Substances

```txt
("nitazene" OR "benzimidazole opioid" OR "xylazine") Australia
```

### Naloxone Programs

```txt
"take-home naloxone" OR "THN" (Australia OR NSW OR VIC) (program OR expansion)
```

### Peer Workforce

```txt
"peer worker" OR "lived experience worker" (AOD OR "harm reduction") Australia -jobs
```

### Specific State (e.g., NSW)

```txt
site:*.nsw.gov.au "harm reduction" OR "drug policy" OR "drug alert"
```

---

## 💡 Tips

> [!TIP] The key to effective alerting is specificity. It's better to have 5 targeted alerts than
> one broad alert that floods your inbox with irrelevant results.

### Tip 1: Use Specific Queries

Broad queries generate too many alerts. Be specific.

**Too broad:**

```txt
drug Australia
```

**Better:**

```txt
site:*.gov.au "drug alert" OR "drug warning"
```

### Tip 2: Combine with Exclusions

Remove noise with exclusions:

```txt
"peer worker" training Australia -jobs -careers -vacancy
```

### Tip 3: Create Multiple Alerts

Create separate alerts for different topics rather than one broad alert.

### Tip 4: Review and Refine

After a week, check your alerts. Getting too many irrelevant results? Refine the query.

---

## 🔄 Managing Alerts

### View All Alerts

Go to [google.com/alerts](https://www.google.com/alerts) to see and manage all your alerts.

### Edit an Alert

Click the pencil icon next to any alert to modify it.

### Delete an Alert

Click the trash icon to remove an alert.

### Pause Alerts

You can temporarily pause alerts if needed.

---

## 🔗 Related Resources

- [Monitoring Workflow](../workflows/monitoring.md)
- [Drug Alerts Pack](../dork-packs/drug-alerts.md)

---

[← Back to Tools](README.md)
