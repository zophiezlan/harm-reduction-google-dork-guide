# User-Hosted Domains & Community Platforms

> Find grassroots harm reduction content on user-published platforms. These are where individuals,
> community groups, students, and small organisations publish guides, resources, and real-world
> knowledge.

[← Back to Dork Packs](README.md) | [← Main Guide](../README.md)

---

## ⚡ Quick Start

Find harm reduction content across major user-hosted platforms:

```txt
(site:*.notion.site OR site:medium.com OR site:*.substack.com OR site:reddit.com) "harm reduction"
```

---

## 🟢 Basic Queries

### Blogs & Newsletters

Find community commentary, essays, and longform harm reduction content.

```txt
(site:*.wordpress.com OR site:*.blogspot.com OR site:medium.com OR site:*.substack.com) "harm reduction"
```

**Why this works:**

- Catches major blogging platforms where advocates publish
- Substack increasingly popular for harm reduction newsletters
- Medium hosts many drug policy and public health essays

### Community Documentation

Find guides, resource directories, and knowledge bases.

```txt
(site:*.notion.site OR site:*.gitbook.io) ("harm reduction" OR "drug checking" OR "safer use")
```

**Why this works:**

- Notion widely used for community resource directories
- GitBook common for project documentation and guides
- High signal for structured, curated content

### Reddit Discussions

Find lived experience and community knowledge.

```txt
site:reddit.com ("harm reduction" OR "drug checking" OR "naloxone") -r/politics
```

**Why this works:**

- Reddit hosts active harm reduction communities
- Excludes political subreddits for cleaner results
- Good for understanding community perspectives

---

## 🟡 Intermediate Queries

### Multi-Platform Documentation Search

```txt
(site:*.notion.site OR site:*.gitbook.io OR site:*.readthedocs.io OR site:*.readme.io) ("harm reduction" OR "drug policy" OR "safer use") (guide OR resources)
```

**Why this works:**

- Covers all major documentation platforms
- `guide OR resources` focuses on practical content
- Finds community-maintained knowledge bases

### Harm Reduction Newsletters & Independent Writers

```txt
(site:*.substack.com OR site:*.ghost.io OR site:bearblog.dev) ("harm reduction" OR "drug policy" OR "decriminalisation")
```

**Why this works:**

- Substack newsletters from advocates and researchers
- Ghost used by independent publications
- Catches emerging voices in drug policy

### Community Forums & Q&A

```txt
(site:reddit.com OR site:quora.com) ("harm reduction" OR "naloxone" OR "fentanyl test strips") -advertisement
```

**Why this works:**

- Reddit and Quora for lived experience perspectives
- Excludes advertisements for cleaner results
- Good for understanding what people are actually asking

### Shared Files & Training Materials

```txt
(site:drive.google.com OR site:dropbox.com OR site:docs.google.com) "harm reduction" (training OR guide OR resources)
```

**Why this works:**

- Community groups often share resources via cloud storage
- Training materials frequently hosted on Google Drive
- Catches PDFs, slide decks, and documents

### Conference Presentations

```txt
(site:slideshare.net OR site:speakerdeck.com) ("harm reduction" OR "drug checking" OR "naloxone")
```

**Why this works:**

- Conference presentations often shared publicly
- Good for finding recent research and program updates
- Visual summaries of harm reduction initiatives

---

## 🔴 Advanced Queries

### Comprehensive User Platform Sweep

```txt
(site:*.notion.site OR site:*.gitbook.io OR site:*.wordpress.com OR site:medium.com OR site:*.substack.com OR site:*.tumblr.com OR site:reddit.com) ("harm reduction" OR "drug checking" OR "naloxone" OR "NSP") (guide OR resources OR directory OR community)
```

**Why this works:**

- Covers all major user-hosted content platforms
- Multiple harm reduction terms for comprehensive coverage
- Content-type terms filter to actionable resources

### Developer & Technical Resources

Find tools, datasets, and technical harm reduction projects.

```txt
(site:github.com OR site:*.github.io OR site:kaggle.com OR site:huggingface.co) ("harm reduction" OR "drug checking" OR "overdose") (data OR dataset OR tool OR model)
```

**Why this works:**

- GitHub for open source harm reduction tools
- GitHub Pages for project documentation
- Kaggle and Hugging Face for datasets and models

### Research Data Repositories

```txt
(site:zenodo.org OR site:osf.io OR site:figshare.com) ("harm reduction" OR "drug policy") (dataset OR data OR report)
```

**Why this works:**

- Academic data repositories often contain research outputs
- OSF popular for harm reduction research projects
- Zenodo for EU-funded research data

### Self-Hosted Community Platforms

Find Discourse forums, wikis, and community-hosted resources.

**Discourse Forums:**

```txt
"Powered by Discourse" "harm reduction" OR "drug policy" OR "drug user"
```

**MediaWiki Sites:**

```txt
"MediaWiki" "harm reduction" site:*.org
```

**BookStack Documentation:**

```txt
"BookStack" "harm reduction"
```

**Why this works:**

- Discourse forums host many advocacy communities
- MediaWiki used by community documentation projects
- Finds content on self-hosted platforms

### Jamstack/Modern App Hosts

Find tools and apps built by the community.

```txt
(site:*.vercel.app OR site:*.netlify.app OR site:*.pages.dev OR site:*.glitch.me) ("harm reduction" OR "drug checking" OR "naloxone" OR "overdose")
```

**Why this works:**

- Modern hosting platforms for web apps
- Glitch popular for educational and prototype tools
- May find harm reduction calculators, tools, or resources

### Video & Presentation Platforms

```txt
(site:slideshare.net OR site:speakerdeck.com OR site:prezi.com) ("harm reduction" OR "drug checking" OR "peer worker" OR "AOD") (conference OR training OR presentation)
```

### Community Resource Boards

```txt
(site:padlet.com OR site:wakelet.com) "harm reduction" OR "drug" OR "AOD" resources
```

**Why this works:**

- Padlet widely used for community resource collections
- Wakelet for curated content collections
- Often maintained by peer workers and community groups

### Bio Link Discovery

Find harm reduction advocates and their resource collections.

```txt
(site:linktr.ee OR site:ko-fi.com OR site:patreon.com) "harm reduction" OR "drug policy" OR "peer worker"
```

**Why this works:**

- Bio links often lead to resources, newsletters, and projects
- Ko-fi and Patreon pages may describe ongoing work
- Good for discovering active community members

---

## 🌍 International User Content

### Global Harm Reduction Blogs

```txt
(site:*.wordpress.com OR site:medium.com) "harm reduction" (Canada OR UK OR Europe OR "New Zealand")
```

### International Community Forums

```txt
site:reddit.com/r/ (harmreduction OR drugsover30 OR opiatesrecovery OR REDDITORSINRECOVERY) international OR Canada OR UK OR Australia
```

---

## 📋 Platform-Specific Searches

### Notion Directories & Guides

```txt
site:*.notion.site ("harm reduction" OR "drug checking" OR "safer use") (directory OR guide OR resources)
```

### Medium Essays

```txt
site:medium.com "harm reduction" (essay OR opinion OR "personal story")
```

### Substack Newsletters

```txt
site:*.substack.com ("drug policy" OR "harm reduction" OR "decriminalisation")
```

### Tumblr Community Content

```txt
site:*.tumblr.com "harm reduction" OR "safer use" OR "drug education"
```

### Reddit Specific Subreddits

```txt
site:reddit.com/r/harmreduction
```

```txt
site:reddit.com/r/drugs "harm reduction"
```

```txt
site:reddit.com/r/opiates "naloxone" OR "narcan"
```

```txt
site:reddit.com/r/reagenttesting
```

### GitHub Projects

**General Projects:**

```txt
site:github.com "harm reduction" README
```

**Tools & Data:**

```txt
site:github.com "drug checking" OR "fentanyl" (tool OR data)
```

### Archive.org Historical Content

```txt
site:archive.org "harm reduction" OR "needle exchange" OR "syringe program"
```

---

## 📋 Quick Copy Domain Buckets

### Docs Bucket

```txt
site:*.notion.site OR site:*.gitbook.io OR site:*.readme.io OR site:*.readthedocs.io
```

### Jamstack/Apps Bucket

```txt
site:*.pages.dev OR site:*.vercel.app OR site:*.netlify.app OR site:*.web.app OR site:*.glitch.me OR site:*.replit.app
```

### Blogs/Writing Bucket

```txt
site:*.wordpress.com OR site:*.blogspot.com OR site:medium.com OR site:*.substack.com OR site:*.tumblr.com OR site:telegra.ph
```

### Files Bucket

```txt
site:drive.google.com OR site:dropbox.com OR site:onedrive.live.com OR site:archive.org OR site:speakerdeck.com
```

### Community Bucket

```txt
site:reddit.com OR site:quora.com OR site:groups.google.com
```

### Research Bucket

```txt
site:zenodo.org OR site:osf.io OR site:figshare.com OR site:kaggle.com
```

---

## 💡 Tips for User-Hosted Searches

1. **Combine with topic terms** - Add harm reduction topic keywords to domain buckets
2. **Filter by date** - Add `after:2024` for recent content
3. **Exclude noise** - Use `-advertisement -"sponsored post"` to clean results
4. **Try multiple platforms** - Different communities prefer different platforms
5. **Follow links** - Bio link pages often lead to main resources
6. **Check archived versions** - Use `site:archive.org` for content that may have moved

---

## ⚠️ Considerations

- **Signal vs. Noise:** User-hosted content varies in quality; verify with official sources
- **Currency:** Some content may be outdated; check publication dates
- **Context:** Community content reflects diverse perspectives; consider source
- **Privacy:** Don't scrape or store personal information from community forums

---

## 🔗 Related Resources

- **Domain Map:**
  [User-Hosted Platforms Section](../04-domain-map.md#-user-hosted--community-platforms)
- **Synonym Blocks:** [Platform Patterns](../05-synonym-blocks.md#-user-hosted-platform-patterns)
- **Related Packs:** [Forum & Community](forum-community.md), [Peer Knowledge](peer-knowledge.md)
- **Workflow:** [Community Research](../workflows/monitoring.md)

---

[← Back to Dork Packs](README.md)
