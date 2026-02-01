# Monitoring & Early Warning

> Set up automated monitoring for harm reduction intelligence.

[← Back to Workflows](README.md) | [← Main Guide](../README.md)

---

## 🔔 Why Monitoring Matters

> [!TIP] Automated monitoring ensures you don't miss critical information. A well-configured system
> can alert you to drug warnings within hours of publication, rather than days or weeks.

Don't rely on manual checks. Set up automated monitoring for:

- Drug alerts and health warnings
- Policy consultations and submissions
- New research and evaluations
- Service changes and announcements

---

## 📧 Google Alerts Setup

### How to Set Up

1. Go to [google.com/alerts](https://www.google.com/alerts)
2. Enter any dork as your alert query
3. Configure frequency (As-it-happens, Daily, Weekly)
4. Choose sources (Automatic, News, Blogs, Web, etc.)
5. Select delivery (email address)

### Recommended Alerts

#### Alert 1: Drug Alerts (Priority - As-it-happens)

```txt
site:*.health.*.gov.au ("drug alert" OR "drug warning" OR "drug notification")
```

#### Alert 2: Drug Checking News (Daily)

```txt
"drug checking" OR "pill testing" (Australia OR NSW OR VIC) -jobs
```

#### Alert 3: Policy Consultations (Weekly)

```txt
site:*.gov.au ("consultation" OR "call for submissions") ("harm reduction" OR "drug policy")
```

#### Alert 4: Research Updates (Weekly)

```txt
site:ndarc.med.unsw.edu.au OR site:burnet.edu.au "harm reduction" OR "drug checking" OR naloxone
```

#### Alert 5: Parliamentary Inquiries (Weekly)

```txt
site:aph.gov.au OR site:parliament.*.gov.au (inquiry OR committee) (drug OR "harm reduction")
```

---

## 📰 RSS Feeds

### RSS Tools

| Tool                    | URL                                                         | Description                           |
| ----------------------- | ----------------------------------------------------------- | ------------------------------------- |
| **Feedly**              | [feedly.com](https://feedly.com/)                           | Modern RSS reader with team features  |
| **Inoreader**           | [inoreader.com](https://www.inoreader.com/)                 | Powerful RSS with automation          |
| **Kill the Newsletter** | [kill-the-newsletter.com](https://kill-the-newsletter.com/) | Convert newsletters to RSS            |
| **RSS Bridge**          | [rss-bridge.org](https://rss-bridge.org/)                   | Generate feeds from sites without RSS |

### Finding Government RSS Feeds

Many government sites have RSS feeds. Check:

- `[site]/rss`
- `[site]/feed`
- `[site]/news/feed`
- `[site]/media-releases.rss`

### Using RSS Bridge

For sites without native RSS:

1. Go to [rss-bridge.org](https://rss-bridge.org/)
2. Choose a bridge type (Twitter, Facebook, etc.)
3. Enter the source URL/account
4. Generate the feed
5. Add to your RSS reader

---

## 🔄 Website Change Monitoring

> [!WARNING] **Data Exposure Risk.** When monitoring websites for changes, be careful about what
> information you capture and store. Avoid monitoring pages that might inadvertently expose personal
> information, and ensure your monitoring tools comply with your organisation's data handling
> policies.

### Tools

| Tool                   | URL                                               | Description                   |
| ---------------------- | ------------------------------------------------- | ----------------------------- |
| **ChangeDetection.io** | [changedetection.io](https://changedetection.io/) | Open-source change monitoring |
| **Distill.io**         | [distill.io](https://distill.io/)                 | Browser extension monitoring  |
| **Visualping**         | [visualping.io](https://visualping.io/)           | Visual change detection       |

### What to Monitor

- Government health alert pages
- Policy consultation pages
- Research centre news/publications
- Key organisation announcement pages

---

## 📅 Manual Monitoring Routines

### Weekly Sweep (15 minutes)

Run these 3 searches every Monday, updating the date:

**1. Alerts (Priority):**

```txt
site:*.health.*.gov.au intitle:"drug warning" after:[LAST_WEEK_DATE]
```

**2. Research (Evidence):**

```txt
site:*.edu.au filetype:pdf ("overdose" OR naloxone OR "drug checking") after:[LAST_WEEK_DATE]
```

**3. Policy (Legislative/Strategic):**

```txt
site:*.gov.au filetype:pdf ("harm reduction" OR "drug policy") after:[LAST_WEEK_DATE]
```

### Monthly Deep Dive

Once per month, run jurisdiction-specific searches:

```txt
site:health.nsw.gov.au filetype:pdf after:[FIRST_OF_MONTH]
site:parliament.*.gov.au "drug" (inquiry OR committee) after:[FIRST_OF_MONTH]
```

---

## 🔍 Monitoring Specific Topics

### Novel Substances

```txt
("nitazene" OR "benzimidazole opioid" OR "xylazine") site:*.gov.au
```

### Drug Checking Developments

```txt
"drug checking" OR "pill testing" Australia (trial OR implementation OR announcement)
```

### Policy Reform

```txt
"decriminalisation" OR "drug law reform" Australia after:[DATE]
```

---

## 📱 Push Notifications

### Using IFTTT

1. Create an IFTTT account
2. Connect Google Alerts to IFTTT
3. Set up applets to send notifications to your phone

### Using Pushover

1. Create a Pushover account
2. Connect to RSS feeds or IFTTT
3. Receive push notifications for new items

---

## 📋 Monitoring Checklist

- [ ] Google Alerts set up for key topics
- [ ] RSS reader configured with key sources
- [ ] Weekly sweep routine scheduled
- [ ] Monthly deep dive in calendar
- [ ] Key pages added to change monitoring

---

## 🔗 Related Resources

- [Google Alerts Tool](../tools/google-alerts.md) - Detailed alert setup
- [Drug Alerts Pack](../dork-packs/drug-alerts.md) - Alert-specific dorks
- [Browser Extensions](../tools/browser-extensions.md) - Monitoring tools

---

[← Back to Workflows](README.md)
