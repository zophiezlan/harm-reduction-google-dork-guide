# Browser Bookmarklets

> Save common searches as one-click browser bookmarks.

[← Back to Tools](README.md) | [← Main Guide](../README.md)

---

## 🔧 How to Create a Bookmarklet

1. Create a new bookmark in your browser
2. Name it (e.g., "NSW Drug Alerts")
3. Paste the JavaScript code into the URL field
4. Click the bookmark to run the search instantly

---

## 📋 Ready-to-Use Bookmarklets

### NSW Health Alerts

```javascript
javascript: void (location.href =
  "https://www.google.com/search?q=site:health.nsw.gov.au+(intitle:%22drug+alert%22+OR+intitle:%22health+alert%22)");
```

### Recent Australian Harm Reduction PDFs

```javascript
javascript: void (location.href =
  "https://www.google.com/search?q=site:*.gov.au+filetype:pdf+(%22harm+reduction%22+OR+%22harm+minimisation%22)+after:2024-01-01");
```

### Australian Drug Checking Research

```javascript
javascript: void (location.href =
  "https://www.google.com/search?q=site:*.edu.au+%22drug+checking%22+OR+%22pill+testing%22+filetype:pdf+after:2020");
```

### Peer Worker Training Resources

```javascript
javascript: void (location.href =
  "https://www.google.com/search?q=%22peer+worker%22+(%22training%22+OR+%22supervision%22)+filetype:pdf+-jobs+-careers");
```

### Parliamentary Drug Policy Submissions

```javascript
javascript: void (location.href =
  "https://www.google.com/search?q=site:*.gov.au+inurl:submissions+(%22drug+policy%22+OR+%22harm+reduction%22)+filetype:pdf");
```

### NDARC Research

```javascript
javascript: void (location.href =
  "https://www.google.com/search?q=site:ndarc.med.unsw.edu.au+filetype:pdf");
```

### Peer Organisation Resources

```javascript
javascript: void (location.href =
  "https://www.google.com/search?q=(site:nuaa.org.au+OR+site:aivl.org.au+OR+site:hrvic.org.au)+filetype:pdf");
```

---

## 🎯 Creating Custom Bookmarklets

### Template

```javascript
javascript: void (location.href = "https://www.google.com/search?q=[YOUR_ENCODED_QUERY]");
```

### URL Encoding Reference

| Character | Encoded           |
| --------- | ----------------- |
| `:`       | `%3A`             |
| `"`       | `%22`             |
| `(`       | `%28`             |
| `)`       | `%29`             |
| `*`       | `*` (no encoding) |
| `/`       | `%2F`             |
| Space     | `+` or `%20`      |

### Example: Building Your Own

Original dork:

```txt
site:health.nsw.gov.au "naloxone" filetype:pdf
```

Encoded:

```javascript
javascript: void (location.href =
  "https://www.google.com/search?q=site:health.nsw.gov.au+%22naloxone%22+filetype:pdf");
```

---

## 📂 Organising Bookmarklets

Create a bookmark folder called "Harm Reduction Dorks" with sub-folders:

- Alerts
- Research
- Policy
- Peer Resources

---

## 🔗 Related Resources

- [Core Operators](../02-core-operators.md)
- [Dork Packs](../dork-packs/README.md)

---

[← Back to Tools](README.md)
