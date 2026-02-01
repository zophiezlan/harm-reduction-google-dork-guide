# Australia-First Domain Map

> Know where information lives. Use this to choose `site:` targets quickly.

[← Back to Main Guide](README.md) | [← Advanced Operators](03-advanced-operators.md) |
[Next: Synonym Blocks →](05-synonym-blocks.md)

---

## 🏛️ National Government

### Primary Health & Drug Policy

| Domain               | Organisation                             | Focus                          |
| -------------------- | ---------------------------------------- | ------------------------------ |
| `site:abs.gov.au`    | Australian Bureau of Statistics          | Census, surveys                |
| `site:aihw.gov.au`   | Australian Institute of Health & Welfare | National statistics, data      |
| `site:health.gov.au` | Department of Health                     | National policies, strategies  |
| `site:tga.gov.au`    | Therapeutic Goods Administration         | Medicine scheduling, approvals |

### Policy & Parliamentary

| Domain             | Organisation                     | Focus                           |
| ------------------ | -------------------------------- | ------------------------------- |
| `site:ag.gov.au`   | Attorney-General's Department    | Drug law, legal frameworks      |
| `site:alrc.gov.au` | Australian Law Reform Commission | Law reform reports              |
| `site:aph.gov.au`  | Parliament                       | Inquiries, submissions, Hansard |
| `site:pmc.gov.au`  | Prime Minister & Cabinet         | National coordination           |

### Quick Pattern: All Federal Government

```txt
site:*.gov.au -site:*.nsw.gov.au -site:*.vic.gov.au -site:*.qld.gov.au -site:*.wa.gov.au -site:*.sa.gov.au -site:*.tas.gov.au -site:*.act.gov.au -site:*.nt.gov.au
```

---

## 🏥 State & Territory Health Departments

Use these for **drug alerts, guidelines, NSP policies, and local health information**.

| State/Territory | Health Department         | Broader Government  |
| --------------- | ------------------------- | ------------------- |
| **ACT**         | `site:health.act.gov.au`  | `site:*.act.gov.au` |
| **NSW**         | `site:health.nsw.gov.au`  | `site:*.nsw.gov.au` |
| **NT**          | `site:health.nt.gov.au`   | `site:*.nt.gov.au`  |
| **QLD**         | `site:health.qld.gov.au`  | `site:*.qld.gov.au` |
| **SA**          | `site:sahealth.sa.gov.au` | `site:*.sa.gov.au`  |
| **TAS**         | `site:health.tas.gov.au`  | `site:*.tas.gov.au` |
| **VIC**         | `site:health.vic.gov.au`  | `site:*.vic.gov.au` |
| **WA**          | `site:health.wa.gov.au`   | `site:*.wa.gov.au`  |

### All State Health at Once

```txt
site:*.health.*.gov.au "harm reduction"
```

This pattern catches all state/territory health department subdomains.

---

## 🔬 Research Centres & Universities

### Premier AOD Research Institutions

| Domain                       | Institution                             | Focus                      |
| ---------------------------- | --------------------------------------- | -------------------------- |
| `site:burnet.edu.au`         | Burnet Institute                        | Infectious disease, HR     |
| `site:csrh.arts.unsw.edu.au` | Centre for Social Research in Health    | Social research, stigma    |
| `site:kirby.unsw.edu.au`     | Kirby Institute                         | BBV, hepatitis, HIV        |
| `site:lowitja.org.au`        | Lowitja Institute                       | Aboriginal health research |
| `site:matildacentre.com.au`  | Matilda Centre                          | Substance use              |
| `site:nceta.flinders.edu.au` | NCETA                                   | Workforce development      |
| `site:ndarc.med.unsw.edu.au` | National Drug & Alcohol Research Centre | Premier AOD research       |
| `site:ndri.curtin.edu.au`    | National Drug Research Institute        | National policy research   |
| `site:turning-point.org.au`  | Turning Point                           | Treatment research         |

### Generic University Research

```txt
site:*.edu.au filetype:pdf "harm reduction"
```

### Multi-Institution Search

```txt
site:ndarc.med.unsw.edu.au OR site:burnet.edu.au OR site:turning-point.org.au filetype:pdf
```

---

## 👥 Peer-Led & Drug User Organisations

> **Peer knowledge is expert knowledge.** Start here for lived experience perspectives.

| Organisation | Domain              | State    | Focus                            |
| ------------ | ------------------- | -------- | -------------------------------- |
| **AIVL**     | `site:aivl.org.au`  | National | Peak body for user organisations |
| **CAHMA**    | (search by name)    | ACT      | ACT peer advocacy                |
| **HRVic**    | `site:hrvic.org.au` | VIC      | DanceWize, peer programs         |
| **NTAHC**    | `site:ntahc.org.au` | NT       | NT peer programs                 |
| **NUAA**     | `site:nuaa.org.au`  | NSW      | User's News, peer programs       |
| **QuIHN**    | `site:quihn.org`    | QLD      | Peer services, NSP               |
| **SAVIVE**   | (search by name)    | SA       | SA peer voice                    |
| **TUHSL**    | `site:tuhsl.org.au` | TAS      | Tasmania peer voice              |
| **WASUA**    | `site:wasua.com.au` | WA       | Peer support, advocacy           |

### Multi-Peer-Org Search

```txt
(site:nuaa.org.au OR site:aivl.org.au OR site:hrvic.org.au OR site:quihn.org) filetype:pdf
```

### Finding Peer-Led Content Across Orgs

```txt
site:*.org.au ("peer-led" OR "user-led" OR "lived experience") filetype:pdf -jobs
site:*.org.au "nothing about us without us" harm reduction
site:*.org.au "peer worker" ("by peers" OR "for peers") filetype:pdf
```

---

## 🏢 Harm Reduction & Policy Organisations

| Organisation              | Domain                        | Focus                  |
| ------------------------- | ----------------------------- | ---------------------- |
| **ACON**                  | `site:acon.org.au`            | LGBTQ+ health, chemsex |
| **Hepatitis Australia**   | `site:hepatitisaustralia.com` | BBV, hep C elimination |
| **Penington Institute**   | `site:penington.org.au`       | Overdose data, policy  |
| **Uniting (ReGen, MSIR)** | `site:uniting.org`            | Services, MSIR reports |

---

## 🏛️ State Peak Bodies

AOD sector peak bodies coordinate services and advocacy in each state.

| State | Organisation | Domain               |
| ----- | ------------ | -------------------- |
| ACT   | ATODA        | `site:atoda.org.au`  |
| NSW   | NADA         | `site:nada.org.au`   |
| NT    | AADANT       | `site:aadant.org.au` |
| QLD   | QNADA        | `site:qnada.org.au`  |
| SA    | SANDAS       | `site:sandas.org.au` |
| TAS   | ATDC         | `site:atdc.org.au`   |
| VIC   | VAADA        | `site:vaada.org.au`  |
| WA    | WANADA       | `site:wanada.org.au` |

### Multi-Peak Search

```txt
(site:nada.org.au OR site:vaada.org.au OR site:qnada.org.au OR site:atoda.org.au) filetype:pdf
```

---

## 🖤💛❤️ Aboriginal Community Controlled Health

| Organisation | Domain               | Focus                           |
| ------------ | -------------------- | ------------------------------- |
| **AHMRC**    | `site:ahmrc.org.au`  | NSW Aboriginal health           |
| **NACCHO**   | `site:naccho.org.au` | National Aboriginal health peak |
| **QAIHC**    | `site:qaihc.com.au`  | QLD Aboriginal health           |
| **VACCHO**   | `site:vaccho.org.au` | VIC Aboriginal health           |

### Finding ACCHO Content

```txt
(ACCHO OR "community controlled") "harm reduction" OR "alcohol drug"
"Aboriginal Community Controlled Health" AOD
```

---

## ⚖️ Coronial & Legal

### Coroners Courts (by State)

| State | Domain                                                |
| ----- | ----------------------------------------------------- |
| ACT   | `site:coronialservices.act.gov.au`                    |
| NSW   | `site:coroners.nsw.gov.au`                            |
| NT    | `site:courts.nt.gov.au/coroner`                       |
| QLD   | `site:courts.qld.gov.au/courts/coroners-court`        |
| SA    | `site:courts.sa.gov.au/courts/coroners-court`         |
| TAS   | `site:magistratescourt.tas.gov.au/divisions/coronial` |
| VIC   | `site:coronerscourt.vic.gov.au`                       |
| WA    | `site:coronerscourt.wa.gov.au`                        |

### Legal Resources

| Domain                     | Focus                   |
| -------------------------- | ----------------------- |
| `site:alrc.gov.au`         | Law Reform Commission   |
| `site:legalaid.nsw.gov.au` | Legal Aid (NSW example) |

---

## 🎓 Professional Bodies & Conferences

| Organisation    | Domain                  | Focus                    |
| --------------- | ----------------------- | ------------------------ |
| **APSAD**       | `site:apsad.org.au`     | Professional society     |
| **ATODA (NDC)** | `site:atoda.org.au/ndc` | National Drug Conference |
| **RACGP**       | `site:racgp.org.au`     | GP guidelines on AOD     |

### Conference Proceedings

```txt
"APSAD conference" proceedings filetype:pdf
"National Drug Conference" OR "NDC" presentation filetype:pdf
```

---

## 🌏 International Comparators

| Country/Org     | Domain                  | Focus                      |
| --------------- | ----------------------- | -------------------------- |
| **Canada**      | `site:*.gc.ca`          | Safe supply, SCS           |
| **EMCDDA**      | `site:emcdda.europa.eu` | European data              |
| **INPUD**       | `site:inpud.net`        | International peer network |
| **Netherlands** | `site:*.nl`             | Drug policy, coffeeshops   |
| **New Zealand** | `site:*.govt.nz`        | Similar context            |
| **Portugal**    | `site:*.pt`             | Decriminalisation          |
| **Switzerland** | `site:*.ch`             | Heroin-assisted treatment  |
| **UK**          | `site:*.gov.uk`         | DCRs, policy               |
| **WHO**         | `site:who.int`          | Global guidance            |

### International Best Practice Pattern

```txt
("drug consumption room" OR "supervised consumption") evaluation (Canada OR Europe)
```

---

## 🌐 User-Hosted & Community Platforms

> **The real-world signal layer.** These are where individuals, community groups, students, hobbyists, and small organisations publish pages, notes, guides, and resources. High-signal for "what are people saying / sharing" research including grassroots harm reduction content.

### 📚 Documentation & Knowledge Bases

Public notes, wikis, SOPs, zines, workshop notes, and community how-tos.

| Domain Pattern             | Platform                  | Best For                              |
| -------------------------- | ------------------------- | ------------------------------------- |
| `site:*.notion.site`       | Notion                    | Guides, directories, resource hubs    |
| `site:*.gitbook.io`        | GitBook                   | Technical docs, project documentation |
| `site:*.readme.io`         | ReadMe                    | API docs, developer resources         |
| `site:*.readthedocs.io`    | Read the Docs             | Open source project documentation     |
| `site:*.slite.page`        | Slite                     | Team knowledge bases                  |
| `site:*.helpscoutdocs.com` | Help Scout                | Community support docs                |
| `site:*.intercom.help`     | Intercom                  | Help centers, FAQs                    |
| `site:*.zendesk.com`       | Zendesk                   | Support centers, knowledge bases      |
| `site:*.freshdesk.com`     | Freshdesk                 | Help documentation                    |
| `site:*.document360.io`    | Document360               | Knowledge management                  |
| `site:*.nuclino.com`       | Nuclino                   | Collaborative wikis                   |

**Quick Docs Search:**

```txt
(site:*.notion.site OR site:*.gitbook.io OR site:*.readthedocs.io) "harm reduction"
```

---

### 🚀 Static Site & App Hosts

Personal sites, project pages, micro-sites — massive volume of "real person" content.

| Domain Pattern           | Platform          | Best For                        |
| ------------------------ | ----------------- | ------------------------------- |
| `site:*.github.io`       | GitHub Pages      | Developer projects, open source |
| `site:*.gitlab.io`       | GitLab Pages      | Open source projects            |
| `site:*.pages.dev`       | Cloudflare Pages  | Modern static sites             |
| `site:*.netlify.app`     | Netlify           | JAMstack sites, apps            |
| `site:*.vercel.app`      | Vercel            | Next.js apps, modern frontends  |
| `site:*.surge.sh`        | Surge             | Quick static deployments        |
| `site:*.web.app`         | Firebase Hosting  | Web apps, PWAs                  |
| `site:*.firebaseapp.com` | Firebase (legacy) | Older Firebase projects         |
| `site:*.herokuapp.com`   | Heroku            | Web apps (large legacy base)    |
| `site:*.onrender.com`    | Render            | Full-stack apps                 |
| `site:*.railway.app`     | Railway           | Modern app hosting              |
| `site:*.fly.dev`         | Fly.io            | Distributed apps                |
| `site:*.deno.dev`        | Deno Deploy       | Edge deployments                |
| `site:*.workers.dev`     | Cloudflare Workers| Serverless functions            |
| `site:*.glitch.me`       | Glitch            | Creative coding, prototypes     |
| `site:*.replit.app`      | Replit            | Educational projects            |
| `site:*.repl.co`         | Replit (legacy)   | Older Replit projects           |
| `site:*.codeberg.page`   | Codeberg          | FOSS community projects         |
| `site:*.neocities.org`   | Neocities         | Personal websites, indie web    |

**Jamstack/Apps Search:**

```txt
(site:*.pages.dev OR site:*.vercel.app OR site:*.netlify.app OR site:*.web.app OR site:*.glitch.me) "harm reduction"
```

---

### ✍️ Website Builders

No-code personal sites, landing pages, small community pages.

| Domain Pattern           | Platform      | Best For                      |
| ------------------------ | ------------- | ----------------------------- |
| `site:*.weebly.com`      | Weebly        | Small business, personal      |
| `site:*.wixsite.com`     | Wix           | Personal sites, portfolios    |
| `site:*.webflow.io`      | Webflow       | Designer portfolios, agencies |
| `site:*.squarespace.com` | Squarespace   | Creative sites, portfolios    |
| `site:*.square.site`     | Square        | Small business sites          |
| `site:*.carrd.co`        | Carrd         | Single-page sites, link hubs  |
| `site:*.strikingly.com`  | Strikingly    | Landing pages                 |
| `site:*.tilda.ws`        | Tilda         | Magazine-style sites          |
| `site:*.jimdosite.com`   | Jimdo         | Small business sites          |

**Website Builder Search:**

```txt
(site:*.carrd.co OR site:*.wixsite.com OR site:*.weebly.com) "harm reduction" OR "drug checking"
```

---

### 📝 Blogging & Writing Platforms

Essays, explainers, trip reports, narrative content, community commentary.

| Domain Pattern         | Platform       | Best For                          |
| ---------------------- | -------------- | --------------------------------- |
| `site:*.wordpress.com` | WordPress.com  | Blogs, news sites, community orgs |
| `site:*.blogspot.com`  | Blogger        | Personal blogs, legacy content    |
| `site:medium.com`      | Medium         | Longform articles, essays         |
| `site:*.substack.com`  | Substack       | Newsletters, independent writers  |
| `site:*.tumblr.com`    | Tumblr         | Community content, visual blogs   |
| `site:*.ghost.io`      | Ghost          | Independent publications          |
| `site:*.hashnode.dev`  | Hashnode       | Developer blogs                   |
| `site:dev.to`          | DEV Community  | Developer articles                |
| `site:write.as`        | Write.as       | Anonymous/minimal publishing      |
| `site:telegra.ph`      | Telegraph      | Quick posts, instant publishing   |
| `site:bearblog.dev`    | Bear Blog      | Minimal personal blogs            |

**Blogs/Writing Search:**

```txt
(site:*.wordpress.com OR site:*.blogspot.com OR site:medium.com OR site:*.substack.com OR site:*.tumblr.com OR site:telegra.ph) "harm reduction"
```

---

### 🔗 Bio Link & Creator Hubs

Pivot points — not content itself, but great for finding where someone's docs/resources live.

| Domain                   | Platform       | Best For                     |
| ------------------------ | -------------- | ---------------------------- |
| `site:linktr.ee`         | Linktree       | Creator link collections     |
| `site:*.campsite.bio`    | Campsite       | Creator portfolios           |
| `site:beacons.ai`        | Beacons        | Creator landing pages        |
| `site:*.bio.site`        | Bio.site       | Link in bio pages            |
| `site:lnk.bio`           | Lnk.Bio        | Link aggregators             |
| `site:solo.to`           | Solo.to        | Personal link pages          |
| `site:about.me`          | About.me       | Personal profiles            |
| `site:ko-fi.com`         | Ko-fi          | Creator support pages        |
| `site:patreon.com`       | Patreon        | Creator communities          |
| `site:buymeacoffee.com`  | Buy Me a Coffee| Creator support              |
| `site:stan.store`        | Stan Store     | Creator storefronts          |

**Find Harm Reduction Creators:**

```txt
(site:linktr.ee OR site:ko-fi.com OR site:patreon.com) "harm reduction" OR "drug policy"
```

---

### 📋 Forms & Surveys

Resource intake, community sign-ups, program registrations.

| Domain Pattern             | Platform      | Best For                    |
| -------------------------- | ------------- | --------------------------- |
| `site:docs.google.com`     | Google Forms  | Community surveys, sign-ups |
| `site:forms.gle`           | Google Forms  | Short-form links            |
| `site:forms.office.com`    | Microsoft     | Organisation forms          |
| `site:typeform.com`        | Typeform      | Interactive surveys         |
| `site:tally.so`            | Tally         | No-code forms               |
| `site:airtable.com`        | Airtable      | Shared databases, bases     |
| `site:surveymonkey.com`    | SurveyMonkey  | Research surveys            |
| `site:jotform.com`         | JotForm       | Community forms             |

**Community Program Forms:**

```txt
(site:docs.google.com OR site:typeform.com OR site:tally.so) "harm reduction" registration OR signup OR training
```

---

### 📁 File & Document Hosts

PDFs, slide decks, training packs, flyers, alerts, reports.

| Domain Pattern               | Platform       | Best For                        |
| ---------------------------- | -------------- | ------------------------------- |
| `site:drive.google.com`      | Google Drive   | Shared documents, folders       |
| `site:docs.google.com`       | Google Docs    | Public documents, spreadsheets  |
| `site:dropbox.com`           | Dropbox        | Shared files                    |
| `site:dl.dropboxusercontent.com` | Dropbox    | Direct file links               |
| `site:onedrive.live.com`     | OneDrive       | Microsoft shared files          |
| `site:sharepoint.com`        | SharePoint     | Organisation file shares        |
| `site:box.com`               | Box            | Enterprise file sharing         |
| `site:mega.nz`               | MEGA           | Large file shares               |
| `site:archive.org`           | Internet Archive| Historical documents, backups  |
| `site:scribd.com`            | Scribd         | Document library (paywalled)    |
| `site:slideshare.net`        | SlideShare     | Presentations, training decks   |
| `site:speakerdeck.com`       | Speaker Deck   | Conference presentations        |
| `site:prezi.com`             | Prezi          | Visual presentations            |

**Training & Resource Files:**

```txt
(site:drive.google.com OR site:dropbox.com OR site:archive.org OR site:speakerdeck.com) "harm reduction" filetype:pdf
```

---

### 📋 Paste & Quick-Publish Text

Field notes, drafts, raw guides — often messy but extremely high signal for niche topics.

| Domain Pattern               | Platform       | Best For                      |
| ---------------------------- | -------------- | ----------------------------- |
| `site:gist.github.com`       | GitHub Gist    | Code snippets, quick notes    |
| `site:raw.githubusercontent.com` | GitHub Raw | Direct file access            |
| `site:pastebin.com`          | Pastebin       | Text dumps, quick shares      |
| `site:rentry.co`             | Rentry         | Markdown pastes               |
| `site:justpaste.it`          | JustPaste.it   | Quick text publishing         |
| `site:controlc.com`          | ControlC       | Text pastes                   |
| `site:dpaste.org`            | dpaste         | Developer pastes              |
| `site:paste.ee`              | Paste.ee       | Text sharing                  |
| `site:privatebin.net`        | PrivateBin     | Encrypted pastes              |

**Raw Community Content:**

```txt
(site:gist.github.com OR site:pastebin.com OR site:rentry.co) "harm reduction" OR "drug checking"
```

---

### 💬 Forums & Communities

Discussion, lived experience, emerging issues — high signal but also noise.

| Domain Pattern             | Platform       | Best For                        |
| -------------------------- | -------------- | ------------------------------- |
| `site:reddit.com`          | Reddit         | Community discussions           |
| `site:old.reddit.com`      | Reddit (old)   | Same content, different UI      |
| `site:quora.com`           | Quora          | Q&A, lived experience           |
| `site:stackexchange.com`   | Stack Exchange | Topic-specific Q&A              |
| `site:groups.google.com`   | Google Groups  | Mailing lists, old communities  |

**Harm Reduction Subreddits:**

```txt
site:reddit.com/r/harmreduction OR site:reddit.com/r/drugs OR site:reddit.com/r/opiates "harm reduction"
```

---

### 🔧 Self-Hosted Platform Footprints

These aren't single domains — they're patterns you can target with dorks because they appear on many domains.

| Footprint                            | Platform       | Best For                     |
| ------------------------------------ | -------------- | ---------------------------- |
| `"Powered by Discourse"`             | Discourse      | Community forums             |
| `"MediaWiki" OR "Special:RecentChanges"` | MediaWiki  | Community wikis              |
| `"DokuWiki"`                         | DokuWiki       | Lightweight wikis            |
| `"Wiki.js"`                          | Wiki.js        | Modern wikis                 |
| `"TiddlyWiki"`                       | TiddlyWiki     | Personal wikis               |
| `"BookStack"`                        | BookStack      | Documentation platforms      |
| `"Outline" "Knowledge base"`         | Outline        | Team knowledge bases         |
| `inurl:"/p/" "Etherpad"`             | Etherpad       | Collaborative documents      |
| `inurl:"/s/" nextcloud`              | Nextcloud      | File sharing                 |

**Self-Hosted Community Content:**

```txt
"Powered by Discourse" "harm reduction" OR "drug policy"
"MediaWiki" "harm reduction" site:*.org
```

---

### 📦 Developer & Research Ecosystems

When people publish harm reduction tools, calculators, datasets, or scripts.

| Domain Pattern           | Platform       | Best For                        |
| ------------------------ | -------------- | ------------------------------- |
| `site:npmjs.com`         | npm            | JavaScript packages, READMEs    |
| `site:pypi.org`          | PyPI           | Python packages                 |
| `site:crates.io`         | Crates.io      | Rust packages                   |
| `site:huggingface.co`    | Hugging Face   | AI models, datasets, spaces     |
| `site:kaggle.com`        | Kaggle         | Datasets, notebooks             |
| `site:zenodo.org`        | Zenodo         | Research outputs, datasets      |
| `site:osf.io`            | OSF            | Research project pages          |
| `site:figshare.com`      | Figshare       | Research outputs                |

**Harm Reduction Data & Tools:**

```txt
(site:github.com OR site:kaggle.com OR site:zenodo.org OR site:osf.io) "harm reduction" OR "drug policy" data OR dataset
```

---

### 🗺️ Maps & Directory Platforms

Service directories, outreach maps, community resource lists.

| Domain Pattern             | Platform       | Best For                      |
| -------------------------- | -------------- | ----------------------------- |
| `site:google.com/maps`     | Google Maps    | Service locations, reviews    |
| `site:mymaps.google.com`   | My Maps        | Custom community maps         |
| `site:openstreetmap.org`   | OpenStreetMap  | Community-edited maps         |
| `site:padlet.com`          | Padlet         | Resource boards, collections  |
| `site:wakelet.com`         | Wakelet        | Curated content collections   |

**Community Resource Directories:**

```txt
(site:padlet.com OR site:wakelet.com OR site:*.notion.site) "harm reduction" directory OR resources
```

---

### 🏚️ Legacy Free Website Hosts

Older content still lives here — archived outreach resources, historical harm reduction content.

| Domain Pattern           | Platform       | Best For                      |
| ------------------------ | -------------- | ----------------------------- |
| `site:sites.google.com`  | Google Sites   | Organisation pages            |
| `site:angelfire.com`     | Angelfire      | 90s/00s personal sites        |
| `site:tripod.com`        | Tripod         | Legacy personal sites         |

**Archived Harm Reduction Content:**

```txt
(site:sites.google.com OR site:archive.org) "harm reduction" OR "needle exchange"
```

---

### 📋 Quick Copy Domain Buckets

Rotate through these for comprehensive searches:

**Docs Bucket:**

```txt
site:*.notion.site OR site:*.gitbook.io OR site:*.readme.io OR site:*.readthedocs.io
```

**Jamstack/Apps Bucket:**

```txt
site:*.pages.dev OR site:*.vercel.app OR site:*.netlify.app OR site:*.web.app OR site:*.glitch.me OR site:*.replit.app
```

**Blogs/Writing Bucket:**

```txt
site:*.wordpress.com OR site:*.blogspot.com OR site:medium.com OR site:*.substack.com OR site:*.tumblr.com OR site:telegra.ph
```

**Files Bucket:**

```txt
site:drive.google.com OR site:dropbox.com OR site:onedrive.live.com OR site:archive.org OR site:speakerdeck.com
```

**Community Bucket:**

```txt
site:reddit.com OR site:quora.com OR site:groups.google.com
```

**All User-Hosted (Comprehensive):**

```txt
(site:*.notion.site OR site:*.gitbook.io OR site:*.wordpress.com OR site:medium.com OR site:*.substack.com OR site:reddit.com) "harm reduction"
```

---

## 🔍 Domain Patterns Cheat Sheet

### Wildcard Patterns

| Pattern                  | Catches                      |
| ------------------------ | ---------------------------- |
| `site:*.edu.au`          | All Australian universities  |
| `site:*.gov.au`          | All Australian government    |
| `site:*.health.*.gov.au` | All state health depts       |
| `site:*.org.au`          | All Australian organisations |
| `site:*.org`             | All .org domains globally    |

### Exclusion Patterns

```txt
# Government without news sites
site:*.gov.au -site:news.* -site:media.*

# Research without aggregators
site:*.edu.au -site:researchgate.net -site:academia.edu
```

### Multi-Domain OR

```txt
(site:health.nsw.gov.au OR site:health.vic.gov.au OR site:health.qld.gov.au) "drug alert"
```

---

## 📋 Quick Reference: What to Search Where

| I'm looking for...        | Search here                             |
| ------------------------- | --------------------------------------- |
| Coronial findings         | State coroner domain                    |
| Drug alerts               | `site:*.health.*.gov.au`                |
| International comparison  | `site:*.gc.ca` / `site:*.gov.uk` / etc. |
| National policy           | `site:health.gov.au`                    |
| Parliamentary submissions | `site:aph.gov.au`                       |
| Peer resources            | Peer org domains (NUAA, AIVL, etc.)     |
| Research evidence         | `site:*.edu.au` or specific institution |
| Service directories       | `site:*.gov.au` + state                 |
| State policy              | `site:health.[state].gov.au`            |
| Statistics                | `site:aihw.gov.au` or `site:abs.gov.au` |

---

[← Advanced Operators](03-advanced-operators.md) | [Synonym Blocks →](05-synonym-blocks.md)
