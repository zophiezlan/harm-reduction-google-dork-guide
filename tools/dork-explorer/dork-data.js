window.DORK_DATA = [
  {
    id: "coroners-deaths",
    title: "Coroners, Inquests & Death Data",
    description: "Understanding drug-related deaths through coronial findings.",
    dorks: [
      {
        title: "Coronial Courts (General)",
        category: "Basic Queries",
        query:
          'site:coroners.nsw.gov.au "drug" OR "overdose" OR "substance"\nsite:coronerscourt.vic.gov.au inquest drug OR overdose',
        explanation: "",
      },
      {
        title: "Coronial Recommendations",
        category: "Basic Queries",
        query:
          '"coronial recommendation" OR "coroner\'s recommendation" drug OR overdose Australia',
        explanation: "",
      },
      {
        title: "Drug Death Statistics",
        category: "Basic Queries",
        query:
          '"drug-induced death" OR "drug-related death" statistics Australia\nsite:aihw.gov.au "drug-induced deaths"',
        explanation: "",
      },
      {
        title: "Finding Coronial Recommendations",
        category: "Intermediate Queries",
        query:
          '"coroner" "recommendation" ("harm reduction" OR naloxone OR prevention)\ninquest finding "drug" OR "overdose" "recommendation" Australia',
        explanation: "",
      },
      {
        title: "Systemic Issues",
        category: "Intermediate Queries",
        query:
          '"systemic issues" OR "systemic failures" coronial drug death\n"coroner" "prevention" drug death Australia',
        explanation: "",
      },
      {
        title: "Cluster Investigations",
        category: "Intermediate Queries",
        query:
          '"cluster" overdose OR "drug death" investigation Australia\n"spike" OR "surge" overdose deaths investigation',
        explanation: "",
      },
      {
        title: "Comprehensive Coronial Sweep",
        category: "Advanced Queries",
        query:
          '(coroner OR coronial OR inquest) ("drug" OR "overdose" OR "substance" OR "opioid") (finding OR recommendation OR inquest) Australia filetype:pdf after:2020',
        explanation: "",
      },
      {
        title: "Enhanced Surveillance",
        category: "Advanced Queries",
        query: '"enhanced surveillance" OR "public health response" overdose cluster',
        explanation: "",
      },
      {
        title: "Prevention-Focused Findings",
        category: "Advanced Queries",
        query:
          '"coroner" (prevention OR "preventable death" OR recommendation) ("drug" OR "overdose") Australia',
        explanation: "",
      },
      {
        title: "NSW",
        category: "State Coroners Courts",
        query:
          'site:coroners.nsw.gov.au "drug" OR "overdose" OR "substance"\nsite:coroners.nsw.gov.au inquest finding',
        explanation: "",
      },
      {
        title: "Victoria",
        category: "State Coroners Courts",
        query:
          "site:coronerscourt.vic.gov.au drug OR overdose\nsite:coronerscourt.vic.gov.au inquest finding",
        explanation: "",
      },
      {
        title: "Queensland",
        category: "State Coroners Courts",
        query: 'site:courts.qld.gov.au/courts/coroners-court "drug" OR "overdose"',
        explanation: "",
      },
      {
        title: "Western Australia",
        category: "State Coroners Courts",
        query: "site:coronerscourt.wa.gov.au drug OR substance OR overdose",
        explanation: "",
      },
      {
        title: "South Australia",
        category: "State Coroners Courts",
        query: 'site:courts.sa.gov.au/courts/coroners-court "drug" death',
        explanation: "",
      },
      {
        title: "ACT",
        category: "State Coroners Courts",
        query: "site:coronialservices.act.gov.au drug OR overdose",
        explanation: "",
      },
      {
        title: "Northern Territory",
        category: "State Coroners Courts",
        query: "site:courts.nt.gov.au/coroner drug OR substance death",
        explanation: "",
      },
      {
        title: "Tasmania",
        category: "State Coroners Courts",
        query: "site:magistratescourt.tas.gov.au/divisions/coronial drug overdose",
        explanation: "",
      },
      {
        title: "AIHW Data",
        category: "Drug Death Data & Statistics",
        query: 'site:aihw.gov.au "drug-induced deaths" OR "opioid deaths" filetype:pdf',
        explanation: "",
      },
      {
        title: "Overdose Mortality",
        category: "Drug Death Data & Statistics",
        query: '"overdose mortality" OR "overdose fatality" data Australia',
        explanation: "",
      },
      {
        title: "Accidental Overdose",
        category: "Drug Death Data & Statistics",
        query: '"accidental drug overdose" OR "unintentional overdose" statistics Australia',
        explanation: "",
      },
      {
        title: "Penington Institute Reports",
        category: "Drug Death Data & Statistics",
        query: 'site:penington.org.au "overdose" OR "Australia\'s Annual Overdose Report"',
        explanation: "",
      },
      {
        title: "Opioids (General)",
        category: "Specific Substances & Death",
        query: '"opioid" death OR overdose Australia (coroner OR statistics)',
        explanation: "",
      },
      {
        title: "Heroin",
        category: "Specific Substances & Death",
        query: '"heroin" death OR overdose Australia (coroner OR statistics)',
        explanation: "",
      },
      {
        title: "Pharmaceutical Opioids",
        category: "Specific Substances & Death",
        query:
          '("pharmaceutical opioid" OR "prescription opioid") death Australia\n(oxycodone OR fentanyl OR codeine) overdose death Australia',
        explanation: "",
      },
      {
        title: "Methamphetamine",
        category: "Specific Substances & Death",
        query: '"methamphetamine" OR "ice" death Australia (coroner OR data)',
        explanation: "",
      },
      {
        title: "Emerging Substances",
        category: "Specific Substances & Death",
        query: '"fentanyl" death OR overdose Australia (emerging)\n"nitazene" death Australia',
        explanation: "",
      },
      {
        title: "Polydrug/Combination",
        category: "Specific Substances & Death",
        query:
          '"benzodiazepine" "opioid" combined overdose death\n"polydrug" OR "multiple substances" overdose death',
        explanation: "",
      },
      {
        title: "Custody Deaths",
        category: "🔍 Specific Case Types",
        query: '"death in custody" drug OR overdose OR withdrawal Australia',
        explanation: "",
      },
      {
        title: "Prison Deaths",
        category: "🔍 Specific Case Types",
        query: '("prison death" OR "correctional") drug OR overdose OR withdrawal Australia',
        explanation: "",
      },
      {
        title: "Hospital/Healthcare Deaths",
        category: "🔍 Specific Case Types",
        query: '"hospital" OR "healthcare" drug OR overdose death coronial',
        explanation: "",
      },
      {
        title: "Post-Release Deaths",
        category: "🔍 Specific Case Types",
        query: '"post-release" OR "release from custody" overdose death Australia',
        explanation: "",
      },
      {
        title: "Prevention Recommendations",
        category: "📋 Recommendations & Prevention",
        query: 'coroner recommendation ("harm reduction" OR naloxone OR "overdose prevention")',
        explanation: "",
      },
      {
        title: "Implementation of Recommendations",
        category: "📋 Recommendations & Prevention",
        query: 'coronial recommendation (implementation OR response OR "government response") drug',
        explanation: "",
      },
      {
        title: "Systemic Change",
        category: "📋 Recommendations & Prevention",
        query: 'coroner ("systemic change" OR "systemic recommendation") drug OR overdose',
        explanation: "",
      },
      {
        title: "Annual Reports",
        category: "📈 Trends & Patterns",
        query: '"drug-related deaths" OR "overdose deaths" "annual report" Australia',
        explanation: "",
      },
      {
        title: "Trend Analysis",
        category: "📈 Trends & Patterns",
        query: '("drug death" OR "overdose") trend Australia 2020..2026',
        explanation: "",
      },
      {
        title: "Geographic Patterns",
        category: "📈 Trends & Patterns",
        query:
          '("drug death" OR "overdose") (rural OR regional OR metropolitan) Australia comparison',
        explanation: "",
      },
    ],
  },
  {
    id: "data-statistics",
    title: "Data, Statistics & Surveillance",
    description: "Datasets, prevalence surveys, overdose statistics, and surveillance reports.",
    dorks: [
      {
        title: "AIHW Drug Statistics",
        category: "Basic Queries",
        query: 'site:aihw.gov.au "alcohol and other drugs" statistics',
        explanation: "",
      },
      {
        title: "ABS Drug Use Data",
        category: "Basic Queries",
        query: 'site:abs.gov.au "illicit drug use" OR "drug use" survey',
        explanation: "",
      },
      {
        title: "Overdose Death Data",
        category: "Basic Queries",
        query: '"overdose deaths" OR "drug-induced deaths" statistics Australia 2023..2026',
        explanation: "",
      },
      {
        title: "National Drug Strategy Household Survey",
        category: "Intermediate Queries",
        query:
          '"National Drug Strategy Household Survey" OR NDSHS (latest OR 2022 OR 2023) filetype:pdf',
        explanation: "",
      },
      {
        title: "IDRS (Illicit Drug Reporting System)",
        category: "Intermediate Queries",
        query:
          '"Illicit Drug Reporting System" OR IDRS filetype:pdf\nsite:ndarc.med.unsw.edu.au IDRS',
        explanation: "",
      },
      {
        title: "EDRS (Ecstasy Reporting System)",
        category: "Intermediate Queries",
        query: '"Ecstasy and Related Drugs Reporting System" OR EDRS filetype:pdf',
        explanation: "",
      },
      {
        title: "Ambulance Data",
        category: "Intermediate Queries",
        query:
          '"ambulance attendance" OR "ambulance callouts" drug related (NSW OR VIC OR QLD) data',
        explanation: "",
      },
      {
        title: "Comprehensive Data Sweep",
        category: "Advanced Queries",
        query:
          'site:aihw.gov.au OR site:abs.gov.au OR site:ndarc.med.unsw.edu.au ("alcohol and other drugs" OR "drug use" OR "substance use") (statistics OR data OR survey OR report) filetype:pdf after:2022',
        explanation: "",
      },
      {
        title: "State-Level Data",
        category: "Advanced Queries",
        query:
          'site:*.gov.au ("drug-related" OR "alcohol-related") (hospitalisation OR hospitalization OR "emergency department" OR ambulance) data [YOUR STATE]',
        explanation: "",
      },
      {
        title: "Treatment Episode Data",
        category: "Advanced Queries",
        query:
          'site:aihw.gov.au "Alcohol and other drug treatment services" OR "AODTS-NMDS" filetype:pdf',
        explanation: "",
      },
      {
        title: "Wastewater Drug Monitoring",
        category: "Advanced Queries",
        query:
          '"wastewater analysis" OR "wastewater epidemiology" (drug OR substance) Australia (data OR report)',
        explanation: "",
      },
      {
        title: "AIHW (National)",
        category: "Key Data Sources",
        query:
          'site:aihw.gov.au filetype:pdf ("alcohol and other drugs" OR "drug use" OR "substance use")',
        explanation:
          "**Key AIHW reports:**\n\n- Alcohol and other drug treatment services data\n- National Drug Strategy Household Survey\n- Drug-induced deaths\n- Alcohol-related deaths",
      },
      {
        title: "ABS (National)",
        category: "Key Data Sources",
        query:
          'site:abs.gov.au ("drug use" OR "substance use" OR "alcohol consumption") survey OR data',
        explanation: "",
      },
      {
        title: "NDARC Drug Trends",
        category: "Key Data Sources",
        query: 'site:ndarc.med.unsw.edu.au ("drug trends" OR IDRS OR EDRS) filetype:pdf',
        explanation: "",
      },
      {
        title: "Penington Institute (Overdose)",
        category: "Key Data Sources",
        query: 'site:penington.org.au "overdose" OR "Australia\'s Annual Overdose Report"',
        explanation: "",
      },
      {
        title: "NSP Distribution Data",
        category: "💉 NSP Data",
        query:
          '"needle syringe" ("distribution data" OR "equipment distributed" OR statistics) Australia\nsite:aihw.gov.au "needle syringe program" data',
        explanation: "",
      },
      {
        title: "BBV & NSP Data",
        category: "💉 NSP Data",
        query: 'site:kirby.unsw.edu.au ("hepatitis C" OR HCV) ("injecting drug use" OR NSP) data',
        explanation: "",
      },
      {
        title: "Treatment Episodes",
        category: "Treatment Data",
        query: 'site:aihw.gov.au "treatment episode" AOD OR "alcohol and other drugs" filetype:pdf',
        explanation: "",
      },
      {
        title: "OAT/Pharmacotherapy Data",
        category: "Treatment Data",
        query:
          'site:aihw.gov.au (methadone OR buprenorphine OR "opioid pharmacotherapy") data OR statistics',
        explanation: "",
      },
      {
        title: "Waiting Lists/Access Data",
        category: "Treatment Data",
        query:
          '"waiting list" OR "wait times" (treatment OR detox OR rehabilitation) AOD [YOUR STATE]',
        explanation: "",
      },
      {
        title: "Drug-Induced Deaths",
        category: "☠️ Mortality & Morbidity",
        query:
          'site:aihw.gov.au "drug-induced deaths" filetype:pdf\n"drug-related mortality" OR "drug deaths" statistics Australia',
        explanation: "",
      },
      {
        title: "Opioid Deaths Specifically",
        category: "☠️ Mortality & Morbidity",
        query:
          '"opioid deaths" OR "opioid mortality" OR "opioid overdose deaths" Australia statistics',
        explanation: "",
      },
      {
        title: "Alcohol-Related Deaths",
        category: "☠️ Mortality & Morbidity",
        query: 'site:aihw.gov.au "alcohol-related deaths" OR "alcohol-attributable deaths"',
        explanation: "",
      },
      {
        title: "Hospitalisations",
        category: "☠️ Mortality & Morbidity",
        query:
          'site:aihw.gov.au ("drug-related" OR "alcohol-related") (hospitalisation OR hospitalization) data',
        explanation: "",
      },
      {
        title: "Drug Market Trends",
        category: "📈 Trend & Surveillance",
        query:
          '"drug market" trend OR surveillance Australia filetype:pdf\nsite:ndarc.med.unsw.edu.au "drug trends" OR "market" filetype:pdf',
        explanation: "",
      },
      {
        title: "Novel Substance Monitoring",
        category: "📈 Trend & Surveillance",
        query:
          '("novel psychoactive" OR NPS) (surveillance OR monitoring OR detection) Australia data',
        explanation: "",
      },
      {
        title: "Drug Checking Results Data",
        category: "📈 Trend & Surveillance",
        query: '"drug checking" (results OR data OR "substances detected") Australia',
        explanation: "",
      },
      {
        title: "NSW",
        category: "State-Specific Data",
        query: "site:health.nsw.gov.au OR site:nsw.gov.au (drug OR alcohol) statistics OR data",
        explanation: "",
      },
      {
        title: "Victoria",
        category: "State-Specific Data",
        query:
          'site:health.vic.gov.au OR site:vic.gov.au ("drug related" OR "alcohol related") data\nsite:turning-point.org.au data OR statistics',
        explanation: "",
      },
      {
        title: "Queensland",
        category: "State-Specific Data",
        query: "site:health.qld.gov.au (drug OR alcohol) statistics",
        explanation: "",
      },
      {
        title: "Other States",
        category: "State-Specific Data",
        query:
          'site:*.gov.au [STATE] ("drug-related" OR "alcohol-related") (statistics OR data OR report)',
        explanation: "",
      },
      {
        title: "Finding Raw Data/Datasets",
        category: "Research Data",
        query:
          "filetype:xlsx OR filetype:csv (drug OR alcohol OR AOD) (data OR dataset) Australia site:*.gov.au",
        explanation: "",
      },
      {
        title: "Open Data Portals",
        category: "Research Data",
        query: 'site:data.gov.au (drug OR alcohol OR "harm reduction" OR overdose)',
        explanation: "",
      },
      {
        title: "Research Data Repositories",
        category: "Research Data",
        query: "site:ada.edu.au OR site:ands.org.au (drug OR alcohol OR AOD) data",
        explanation: "",
      },
    ],
  },
  {
    id: "document-discovery",
    title: "Document Discovery",
    description:
      "Finding spreadsheets, databases, presentations, and other document types beyond PDFs.",
    dorks: [
      {
        title: "Excel Files (Modern)",
        category: "Spreadsheets & Data Files",
        query:
          'filetype:xlsx "harm reduction" site:*.gov.au\nfiletype:xlsx "needle syringe" OR "NSP" statistics\nfiletype:xlsx "overdose" data OR statistics Australia\nfiletype:xlsx "opioid" OR "methadone" treatment\nfiletype:xlsx "service directory" drug alcohol',
        explanation:
          "[👉 **Run XLSX Search**](https://www.google.com/search?q=filetype%3Axlsx+%22harm+reduction%22+site%3A*.gov.au)",
      },
      {
        title: "Excel Files (Legacy)",
        category: "Spreadsheets & Data Files",
        query:
          'filetype:xls "opioid treatment" OR "methadone" clinic\nfiletype:xls "drug" OR "alcohol" statistics Australia\nfiletype:xls "hepatitis" OR "HIV" surveillance',
        explanation:
          "[👉 **Run XLS Search**](https://www.google.com/search?q=filetype%3Axls+%22opioid+treatment%22+OR+%22methadone%22+clinic)",
      },
      {
        title: "CSV Data Files",
        category: "Spreadsheets & Data Files",
        query:
          'filetype:csv "needle syringe" OR "NSP" OR "overdose"\nfiletype:csv "drug" OR "alcohol" site:*.gov.au\nfiletype:csv "treatment" episodes Australia\nfiletype:csv "hospitalisation" drug OR alcohol',
        explanation:
          "[👉 **Run CSV Search**](https://www.google.com/search?q=filetype%3Acsv+%22needle+syringe%22+OR+%22NSP%22+OR+%22overdose%22)",
      },
      {
        title: "PowerPoint (Modern)",
        category: "🎬 Presentations",
        query:
          'filetype:pptx "harm reduction" Australia\nfiletype:pptx "drug checking" OR "pill testing"\nfiletype:pptx "naloxone" training OR program\nfiletype:pptx "overdose" prevention OR response\nfiletype:pptx conference "alcohol and other drugs"',
        explanation:
          "[👉 **Run PPTX Search**](https://www.google.com/search?q=filetype%3Apptx+%22harm+reduction%22+Australia)",
      },
      {
        title: "PowerPoint (Legacy)",
        category: "🎬 Presentations",
        query:
          'filetype:ppt "needle exchange" OR "NSP" presentation\nfiletype:ppt "methadone" OR "buprenorphine" treatment',
        explanation:
          "[👉 **Run PPT Search**](https://www.google.com/search?q=filetype%3Appt+%22needle+exchange%22+OR+%22NSP%22+presentation)",
      },
      {
        title: "PDF Presentations (Slide Decks)",
        category: "🎬 Presentations",
        query:
          'filetype:pdf "slide" OR "presentation" "harm reduction" Australia\ninurl:presentation filetype:pdf "drug policy"',
        explanation:
          "[👉 **Run PDF Slides Search**](https://www.google.com/search?q=filetype%3Apdf+%22slide%22+OR+%22presentation%22+%22harm+reduction%22+Australia)",
      },
      {
        title: "Modern Word Files",
        category: "📝 Word Documents",
        query:
          'filetype:docx "harm reduction" policy OR procedure\nfiletype:docx "needle syringe" guidelines\nfiletype:docx "overdose" protocol OR response\nfiletype:docx "drug checking" service design',
        explanation:
          "[👉 **Run DOCX Search**](https://www.google.com/search?q=filetype%3Adocx+%22harm+reduction%22+policy+OR+procedure)",
      },
      {
        title: "Legacy Word Files",
        category: "📝 Word Documents",
        query:
          'filetype:doc "harm minimisation" Australia\nfiletype:doc "injecting drug use" guidelines',
        explanation:
          "[👉 **Run DOC Search**](https://www.google.com/search?q=filetype%3Adoc+%22harm+minimisation%22+Australia)",
      },
      {
        title: "RTF & ODT (Alternative Formats)",
        category: "📝 Word Documents",
        query:
          'filetype:rtf "harm reduction" Australia\nfiletype:odt "drug checking" OR "pill testing"',
        explanation:
          "[👉 **Run RTF Search**](https://www.google.com/search?q=filetype%3Artf+%22harm+reduction%22+Australia)",
      },
      {
        title: "SQL Dumps (Public Datasets)",
        category: "🗃️ Database Files",
        query: 'filetype:sql "drug" OR "health" site:*.edu.au\nfiletype:sql "research" data export',
        explanation: "",
      },
      {
        title: "Access Databases",
        category: "🗃️ Database Files",
        query: 'filetype:mdb "health" OR "drug" research\nfiletype:accdb "service" directory',
        explanation: "",
      },
      {
        title: "Structured Data",
        category: "🗃️ Database Files",
        query: 'filetype:json "harm reduction" OR "drug" API\nfiletype:xml "health" data Australia',
        explanation: "",
      },
      {
        title: "ZIP Archives",
        category: "📁 Archive Files",
        query:
          'filetype:zip "harm reduction" resources\nfiletype:zip "training" materials drug alcohol\nfiletype:zip "toolkit" AOD OR "alcohol and other drugs"',
        explanation:
          "[👉 **Run ZIP Search**](https://www.google.com/search?q=filetype%3Azip+%22harm+reduction%22+resources)",
      },
      {
        title: "EPUB Files",
        category: "📖 E-books & Publications",
        query:
          'filetype:epub "harm reduction" guide\nfiletype:epub "drug policy" reform\nfiletype:epub "addiction" OR "recovery"',
        explanation:
          "[👉 **Run EPUB Search**](https://www.google.com/search?q=filetype%3Aepub+%22harm+reduction%22+guide)",
      },
      {
        title: "Sitemaps (Discover Hidden Pages)",
        category: "🔧 Configuration & Technical Files",
        query:
          'filetype:xml sitemap "health" site:*.gov.au\nfiletype:xml sitemap "drug" site:*.org.au',
        explanation:
          "[👉 **Run Sitemap Search**](https://www.google.com/search?q=filetype%3Axml+sitemap+%22health%22+site%3A*.gov.au)",
      },
      {
        title: "Log Files (Public Health Data)",
        category: "🔧 Configuration & Technical Files",
        query: 'filetype:log "drug" OR "health" site:*.gov.au',
        explanation: "",
      },
      {
        title: "Google Docs (Public)",
        category: "☁️ Cloud Storage & Collaboration",
        query:
          'site:docs.google.com/document "harm reduction"\nsite:docs.google.com/spreadsheets "drug" OR "alcohol" data\nsite:docs.google.com/presentation "AOD" OR "harm reduction"',
        explanation:
          "[👉 **Run Google Docs Search**](https://www.google.com/search?q=site%3Adocs.google.com%2Fdocument+%22harm+reduction%22)",
      },
      {
        title: "Cloud Storage (Public Files)",
        category: "☁️ Cloud Storage & Collaboration",
        query:
          'site:drive.google.com "harm reduction" resources\nsite:dropbox.com "drug policy" OR "harm reduction"\nsite:onedrive.live.com "AOD" training',
        explanation: "",
      },
      {
        title: "Theses & Dissertations",
        category: "Academic & Research Documents",
        query:
          'filetype:pdf "thesis" OR "dissertation" "harm reduction" Australia\nfiletype:pdf "PhD" "drug policy" OR "drug use"',
        explanation:
          "[👉 **Run Thesis Search**](https://www.google.com/search?q=filetype%3Apdf+%22thesis%22+OR+%22dissertation%22+%22harm+reduction%22+Australia)",
      },
      {
        title: "Working Papers",
        category: "Academic & Research Documents",
        query:
          'filetype:pdf "working paper" "harm reduction" OR "drug policy"\nfiletype:pdf "discussion paper" "alcohol and other drugs"',
        explanation:
          "[👉 **Run Working Papers Search**](https://www.google.com/search?q=filetype%3Apdf+%22working+paper%22+%22harm+reduction%22+OR+%22drug+policy%22)",
      },
      {
        title: "Service Directories",
        category: "🏥 Health Service Documents",
        query:
          'filetype:xlsx "service directory" drug OR alcohol Australia\nfiletype:pdf "service directory" AOD OR "alcohol and other drugs"\nfiletype:csv "treatment services" drug alcohol',
        explanation:
          "[👉 **Run Service Directory Search**](https://www.google.com/search?q=filetype%3Axlsx+%22service+directory%22+drug+OR+alcohol+Australia)",
      },
      {
        title: "Clinical Guidelines",
        category: "🏥 Health Service Documents",
        query:
          'filetype:pdf "clinical guideline" OR "practice guideline" opioid\nfiletype:pdf "protocol" "overdose" OR "withdrawal"\nfiletype:docx "procedure" naloxone OR "take-home"',
        explanation:
          "[👉 **Run Guidelines Search**](https://www.google.com/search?q=filetype%3Apdf+%22clinical+guideline%22+OR+%22practice+guideline%22+opioid)",
      },
      {
        title: "Meeting Minutes & Agendas",
        category: "📋 Government Documents",
        query:
          'filetype:pdf "meeting minutes" "harm reduction" OR "drug policy"\nfiletype:docx "agenda" "alcohol and other drugs" committee\nfiletype:pdf "steering committee" AOD minutes',
        explanation:
          "[👉 **Run Minutes Search**](https://www.google.com/search?q=filetype%3Apdf+%22meeting+minutes%22+%22harm+reduction%22+OR+%22drug+policy%22)",
      },
      {
        title: "Budget & Funding",
        category: "📋 Government Documents",
        query:
          'filetype:xlsx "budget" "harm reduction" OR "AOD" site:*.gov.au\nfiletype:pdf "funding" allocation drug OR alcohol\nfiletype:xls "expenditure" health drug services',
        explanation:
          "[👉 **Run Budget Search**](https://www.google.com/search?q=filetype%3Axlsx+%22budget%22+%22harm+reduction%22+OR+%22AOD%22+site%3A*.gov.au)",
      },
      {
        title: "Combine Multiple File Types",
        category: "🔍 Multi-Format Searches",
        query:
          '(filetype:xlsx OR filetype:csv) "overdose" data Australia\n(filetype:pptx OR filetype:pdf) "harm reduction" conference presentation\n(filetype:docx OR filetype:pdf) "policy" "drug checking"',
        explanation:
          "[👉 **Run Multi-Format Search**](https://www.google.com/search?q=%28filetype%3Axlsx+OR+filetype%3Acsv%29+%22overdose%22+data+Australia)",
      },
      {
        title: "All Data Files",
        category: "🔍 Multi-Format Searches",
        query: '(filetype:xlsx OR filetype:xls OR filetype:csv) "drug" statistics Australia',
        explanation:
          "[👉 **Run All Data Search**](https://www.google.com/search?q=%28filetype%3Axlsx+OR+filetype%3Axls+OR+filetype%3Acsv%29+%22drug%22+statistics+Australia)",
      },
      {
        title: "All Presentation Types",
        category: "🔍 Multi-Format Searches",
        query: '(filetype:pptx OR filetype:ppt OR filetype:pdf) "harm reduction" slides conference',
        explanation:
          "[👉 **Run All Presentations Search**](https://www.google.com/search?q=%28filetype%3Apptx+OR+filetype%3Appt+OR+filetype%3Apdf%29+%22harm+reduction%22+slides+conference)",
      },
      {
        title: "Finding Hidden Directories",
        category: "💡 Pro Tips",
        query:
          'intitle:"index of" filetype:xlsx site:*.gov.au\nintitle:"index of" filetype:pptx site:*.health.*.gov.au',
        explanation: "",
      },
      {
        title: "By Year Range",
        category: "💡 Pro Tips",
        query: 'filetype:xlsx "harm reduction" 2020..2026\nfiletype:pptx "drug policy" after:2023',
        explanation: "",
      },
      {
        title: "Exclude Duplicates",
        category: "💡 Pro Tips",
        query: 'filetype:xlsx "harm reduction" -"copy" -"backup" -"old"',
        explanation: "",
      },
    ],
  },
  {
    id: "drug-alerts",
    title: "Drug Alerts & Early Warning",
    description:
      "Real-time monitoring for high-strength, contaminated, or unexpected substances in drug supply.",
    dorks: [
      {
        title: "All Recent Government Alerts",
        category: "Basic Queries",
        query: 'site:*.gov.au intitle:"drug alert" after:2025-01-01',
        explanation:
          '**Why this works:**\n\n- `intitle:` ensures "drug alert" is in the page title (official alerts)\n- `after:` filters to recent only\n- `site:*.gov.au` catches all Australian government sources',
      },
      {
        title: "NSW Health Alerts Specifically",
        category: "Basic Queries",
        query: 'site:health.nsw.gov.au "drug warning"',
        explanation: "",
      },
      {
        title: "Victorian Health Alerts",
        category: "Basic Queries",
        query: 'site:health.vic.gov.au "drug alert" OR "health alert"',
        explanation: "",
      },
      {
        title: "Multi-Term Alert Search",
        category: "Intermediate Queries",
        query:
          'site:*.health.*.gov.au (intitle:"drug alert" OR intitle:"drug warning" OR intitle:"health alert") after:2025-01-01',
        explanation:
          "**Why this works:**\n\n- `site:*.health.*.gov.au` catches all state health departments\n- Parentheses group the OR terms together\n- Multiple title variations catch different naming conventions",
      },
      {
        title: "Specific Substance Alerts",
        category: "Intermediate Queries",
        query: 'site:*.gov.au ("nitazene" OR "xylazine" OR "fentanyl") (alert OR warning)',
        explanation: "",
      },
      {
        title: "Alerts with PDFs (Official Documents)",
        category: "Intermediate Queries",
        query: 'site:*.gov.au filetype:pdf ("drug alert" OR "drug warning" OR "drug notification")',
        explanation: "",
      },
      {
        title: "Comprehensive Alert Sweep",
        category: "Advanced Queries",
        query:
          'site:*.health.*.gov.au (intitle:"drug alert" OR intitle:"drug warning" OR intitle:"drug notification" OR intitle:"clinical safety alert") (opioid OR stimulant OR "novel substance" OR contamina*) after:2025-01-01 filetype:pdf',
        explanation:
          "**Why this works:**\n\n- Multiple title variations cover all alert naming conventions\n- Substance categories catch relevant alerts\n- PDF filter gets the actual alert documents\n- Wildcard `contamina*` catches contamination, contaminated, contaminant",
      },
      {
        title: "Directory Mining for Unpublished Alerts",
        category: "Advanced Queries",
        query: 'site:*.gov.au inurl:"/alerts/" OR inurl:"/warnings/" filetype:pdf "drug"',
        explanation: "",
      },
      {
        title: "High-Priority Emerging Substances",
        category: "Advanced Queries",
        query:
          'site:*.gov.au filetype:pdf ("nitazene" OR "benzimidazole opioid" OR "xylazine" OR "medetomidine") after:2024',
        explanation: "",
      },
      {
        title: "Alerts Mentioning Specific Formulations",
        category: "Advanced Queries",
        query:
          'site:*.gov.au "drug alert" ("high strength" OR "unexpected" OR "contaminated" OR "adulterated")',
        explanation: "",
      },
      {
        title: 'The "Location" Operator',
        category: "🏘️ Local News Monitoring",
        query: 'location:Sydney "drug alert"\nlocation:Melbourne "overdose"',
        explanation: "",
      },
      {
        title: 'The "Local Source" Pattern',
        category: "🏘️ Local News Monitoring",
        query:
          'site:.com.au (news OR times OR herald OR daily) ("bad batch" OR "warning") location:Newcastle',
        explanation:
          "> **💡 Pro Tip:** See [Search Tweaks](../tools/search-tweaks.md#local-alert-monitoring) for more\n> local monitoring recipes.",
      },
      {
        title: "UK (WEDINOS)",
        category: "International Alert Systems",
        query: "site:wedinos.org [substance name]",
        explanation: "",
      },
      {
        title: "Canada",
        category: "International Alert Systems",
        query: "site:drugschecking.ca results\nsite:tripproject.ca alerts",
        explanation: "",
      },
      {
        title: "Europe",
        category: "International Alert Systems",
        query: "site:saferparty.ch OR site:checkit.wien analysis",
        explanation: "",
      },
      {
        title: "General International",
        category: "International Alert Systems",
        query: '"drug alert" (UK OR Canada OR Europe) [substance] 2025',
        explanation: "",
      },
    ],
  },
  {
    id: "drug-checking",
    title: "Drug Checking & Pill Testing",
    description:
      "Evidence, evaluations, operating models, and implementation resources for drug checking services.",
    dorks: [
      {
        title: "Government Documents",
        category: "Basic Queries",
        query:
          '("drug checking" OR "pill testing") site:*.gov.au filetype:pdf (trial OR evaluation OR report)',
        explanation:
          "**Why this works:**\n\n- Both terms used interchangeably in Australia\n- Government sources for official reports\n- Focus on trials and evaluations",
      },
      {
        title: "Research Evidence",
        category: "Basic Queries",
        query:
          'site:*.edu.au filetype:pdf ("drug checking" OR "pill testing") (evaluation OR outcomes OR "harm reduction")',
        explanation: "",
      },
      {
        title: "Sector Organisation Resources",
        category: "Basic Queries",
        query:
          'site:*.org.au filetype:pdf ("drug checking" OR "pill testing") (practice OR protocol OR training)',
        explanation: "",
      },
      {
        title: "State-Specific Trials",
        category: "Intermediate Queries",
        query: '"drug checking" "festival" ("New South Wales" OR "NSW" OR "Victoria" OR "ACT")',
        explanation: "",
      },
      {
        title: "Festival/Event Context",
        category: "Intermediate Queries",
        query:
          '("drug checking" OR "pill testing") (festival OR "music event") Australia (evaluation OR report) filetype:pdf',
        explanation: "",
      },
      {
        title: "Technology & Methods",
        category: "Intermediate Queries",
        query:
          '("drug checking" OR "pill testing") (FTIR OR "infrared" OR "mass spectrometry" OR "reagent") Australia',
        explanation: "",
      },
      {
        title: "Canberran/ACT Trials",
        category: "Intermediate Queries",
        query:
          'site:*.act.gov.au OR site:*.org.au "drug checking" (Canberra OR ACT OR "Groovin the Moo") filetype:pdf',
        explanation: "",
      },
      {
        title: "Comprehensive Evidence Sweep",
        category: "Advanced Queries",
        query:
          '("drug checking" OR "pill testing" OR "substance checking") (Australia OR NSW OR VIC OR ACT) (trial OR evaluation OR pilot OR outcomes) filetype:pdf -news -opinion after:2018',
        explanation: "",
      },
      {
        title: "Implementation & Governance Models",
        category: "Advanced Queries",
        query:
          '"drug checking" (implementation OR governance OR "operating model" OR framework) Australia filetype:pdf',
        explanation: "",
      },
      {
        title: "International Comparisons",
        category: "Advanced Queries",
        query:
          '"drug checking" OR "pill testing" (evaluation OR effectiveness) (Europe OR UK OR "New Zealand" OR Canada) filetype:pdf',
        explanation: "",
      },
      {
        title: "Policy Submissions on Drug Checking",
        category: "Advanced Queries",
        query: 'site:*.gov.au inurl:submissions ("drug checking" OR "pill testing") filetype:pdf',
        explanation: "",
      },
      {
        title: "Consumer/Client Perspectives",
        category: "Advanced Queries",
        query:
          '"drug checking" ("user experience" OR "client feedback" OR "consumer evaluation" OR survey) Australia filetype:pdf',
        explanation: "",
      },
      {
        title: "FTIR (Fourier Transform Infrared)",
        category: "Technology & Analysis Methods",
        query:
          'FTIR ("drug checking" OR "pill testing") (accuracy OR limitations OR comparison) filetype:pdf',
        explanation: "",
      },
      {
        title: "Reagent Testing",
        category: "Technology & Analysis Methods",
        query:
          '"reagent testing" (accuracy OR limitations OR "harm reduction") ("drug checking" OR "pill testing")',
        explanation: "",
      },
      {
        title: "Mass Spectrometry",
        category: "Technology & Analysis Methods",
        query:
          '"mass spectrometry" "drug checking" OR "pill testing" (method OR validation OR results)',
        explanation: "",
      },
      {
        title: "Comparison of Methods",
        category: "Technology & Analysis Methods",
        query: '"drug checking" (method OR technology) comparison OR review filetype:pdf',
        explanation: "",
      },
      {
        title: "Major Australian Festivals",
        category: "🎪 Festival-Specific",
        query:
          '"Groovin the Moo" ("drug checking" OR "pill testing")\n"Lost Paradise" "drug checking" OR "harm reduction"\n"Splendour in the Grass" "pill testing" OR "harm reduction"',
        explanation: "",
      },
      {
        title: "Event Medical Context",
        category: "🎪 Festival-Specific",
        query:
          '(festival OR "music event") "drug checking" ("medical team" OR "health services" OR "harm reduction tent")',
        explanation: "",
      },
      {
        title: "DanceWize & Peer Programs",
        category: "🎪 Festival-Specific",
        query:
          '(DanceWize OR "peer harm reduction") festival ("drug checking" OR "drug information")',
        explanation: "",
      },
      {
        title: "Finding Published Results",
        category: "Data & Results",
        query:
          '"drug checking" (results OR findings OR "substances detected") Australia filetype:pdf',
        explanation: "",
      },
      {
        title: "Alert/Warning Data from Checking",
        category: "Data & Results",
        query: '"drug checking" (alert OR warning OR "unexpected substance") Australia',
        explanation: "",
      },
      {
        title: "Statistical Reports",
        category: "Data & Results",
        query:
          '"drug checking" (statistics OR data OR "number of samples") Australia report filetype:pdf',
        explanation: "",
      },
      {
        title: "Parliamentary Inquiries",
        category: "Policy & Advocacy",
        query: 'site:aph.gov.au "pill testing" OR "drug checking" (inquiry OR submission)',
        explanation: "",
      },
      {
        title: "Peak Body Positions",
        category: "Policy & Advocacy",
        query:
          '(site:atoda.org.au OR site:nada.org.au OR site:vaada.org.au) "drug checking" OR "pill testing" position OR statement',
        explanation: "",
      },
      {
        title: "International Policy Examples",
        category: "Policy & Advocacy",
        query: '"drug checking" policy (Netherlands OR Switzerland OR UK) "best practice" OR model',
        explanation: "",
      },
      {
        title: "Staff Training",
        category: "Training & Workforce",
        query:
          '"drug checking" (training OR "staff development" OR "workforce") harm reduction filetype:pdf',
        explanation: "",
      },
      {
        title: "Counselling in Drug Checking",
        category: "Training & Workforce",
        query:
          '"drug checking" (counselling OR "brief intervention" OR "health promotion") filetype:pdf',
        explanation: "",
      },
    ],
  },
  {
    id: "families-carers",
    title: "Families, Carers & Affected Others",
    description: "Supporting people affected by someone else's drug use.",
    dorks: [
      {
        title: "Family Support Services",
        category: "Basic Queries",
        query:
          '"family support" drug OR alcohol OR AOD Australia\nsite:fds.org.au OR site:familydrughelp.org.au',
        explanation: "",
      },
      {
        title: "Affected Family Members",
        category: "Basic Queries",
        query: '"affected family member" drug OR alcohol Australia',
        explanation: "",
      },
      {
        title: "Carer Support",
        category: "Basic Queries",
        query: '"carer support" drug OR alcohol OR substance Australia',
        explanation: "",
      },
      {
        title: "Family Inclusive Practice (Frameworks)",
        category: "Intermediate Queries",
        query: '"family inclusive" AOD OR "alcohol and other drugs" practice filetype:pdf',
        explanation: "",
      },
      {
        title: "Working with Families",
        category: "Intermediate Queries",
        query: '"working with families" drug OR alcohol treatment Australia',
        explanation: "",
      },
      {
        title: "Family Therapy",
        category: "Intermediate Queries",
        query: '"family therapy" substance use treatment Australia',
        explanation: "",
      },
      {
        title: "Comprehensive Family Support Sweep",
        category: "Advanced Queries",
        query:
          '("family" OR "families" OR "carer" OR "carers" OR "affected other") ("alcohol and other drugs" OR AOD OR "drug use" OR "substance use") Australia (support OR service OR resource OR research) filetype:pdf after:2020',
        explanation: "",
      },
      {
        title: "Family Involvement in Treatment",
        category: "Advanced Queries",
        query: '"family involvement" AOD treatment outcomes Australia',
        explanation: "",
      },
      {
        title: "Systemic Family Approaches",
        category: "Advanced Queries",
        query: '"systemic family" drug OR alcohol treatment Australia',
        explanation: "",
      },
      {
        title: "Family Drug Support",
        category: "👨‍👩‍👧 Family Support Resources",
        query: 'site:fds.org.au filetype:pdf\n"Family Drug Support" Australia',
        explanation: "",
      },
      {
        title: "Family Drug Help",
        category: "👨‍👩‍👧 Family Support Resources",
        query: 'site:familydrughelp.org.au\n"Family Drug Help" Victoria',
        explanation: "",
      },
      {
        title: "State-Based Family Services",
        category: "👨‍👩‍👧 Family Support Resources",
        query: '"family support" AOD [YOUR STATE] (service OR program)',
        explanation: "",
      },
      {
        title: "Parent Peer Support",
        category: "👥 Peer Support for Families",
        query:
          '"parent peer support" drug OR alcohol child\n"peer support" parents families affected drug',
        explanation: "",
      },
      {
        title: "Parent Support Groups",
        category: "👥 Peer Support for Families",
        query: '"parent support group" drug OR alcohol Australia',
        explanation: "",
      },
      {
        title: "Lived Experience (Family)",
        category: "👥 Peer Support for Families",
        query: '"lived experience" family member drug OR alcohol support',
        explanation: "",
      },
      {
        title: "Culturally Diverse Families",
        category: "CALD & Diverse Families",
        query: '"CALD" OR "culturally diverse" families drug OR alcohol Australia',
        explanation: "",
      },
      {
        title: "Migrant/Refugee Families",
        category: "CALD & Diverse Families",
        query: '"migrant" OR "refugee" families drug OR alcohol support Australia',
        explanation: "",
      },
      {
        title: "Multicultural Services",
        category: "CALD & Diverse Families",
        query: '"multicultural" drug OR alcohol family support Australia',
        explanation: "",
      },
      {
        title: "Children Affected",
        category: "👶 Children of Parents with AOD Issues",
        query:
          '"children of parents" alcohol OR drug problems Australia\n"parental substance use" OR "parental drug use" children impact',
        explanation: "",
      },
      {
        title: "COAP",
        category: "👶 Children of Parents with AOD Issues",
        query: '"COAP" OR "children of alcoholic parents" OR "children affected" Australia',
        explanation: "",
      },
      {
        title: "Hidden Harm",
        category: "👶 Children of Parents with AOD Issues",
        query: '"hidden harm" children parental substance use',
        explanation: "",
      },
      {
        title: "Intergenerational",
        category: "👶 Children of Parents with AOD Issues",
        query: '"intergenerational" drug OR alcohol family Australia',
        explanation: "",
      },
      {
        title: "Family Inclusive Practice",
        category: "📋 Practice Frameworks",
        query: '"family inclusive practice" AOD (framework OR guideline) Australia filetype:pdf',
        explanation: "",
      },
      {
        title: "Family-Sensitive Practice",
        category: "📋 Practice Frameworks",
        query: '"family-sensitive" AOD OR "alcohol and other drugs" Australia',
        explanation: "",
      },
      {
        title: "Involving Families",
        category: "📋 Practice Frameworks",
        query: '"involving families" OR "engaging families" AOD treatment Australia',
        explanation: "",
      },
      {
        title: "Family Research",
        category: "Research & Evidence",
        query: 'site:*.edu.au family ("substance use" OR AOD) Australia filetype:pdf',
        explanation: "",
      },
      {
        title: "Impact on Families",
        category: "Research & Evidence",
        query: '"impact" OR "effect" drug use OR substance use family Australia research',
        explanation: "",
      },
      {
        title: "Family Interventions",
        category: "Research & Evidence",
        query:
          '"family intervention" OR "family therapy" (substance use OR drug use) effectiveness Australia',
        explanation: "",
      },
    ],
  },
  {
    id: "festivals",
    title: "Festivals & Event Harm Reduction",
    description:
      "Planning, safety plans, medical directives, and event-specific intelligence for festival health.",
    dorks: [
      {
        title: "General Festival Harm Reduction",
        category: "Basic Queries",
        query:
          '("festival" OR "music event") ("harm reduction" OR "drug checking" OR "peer-led") filetype:pdf -news',
        explanation: "",
      },
      {
        title: "Festival Medical Planning",
        category: "Basic Queries",
        query:
          '(festival OR "music event") ("medical plan" OR "health plan" OR "event health") filetype:pdf',
        explanation: "",
      },
      {
        title: "Australian Festival Resources",
        category: "Basic Queries",
        query:
          '(festival OR "music festival") harm reduction Australia (guideline OR protocol OR evaluation) filetype:pdf',
        explanation: "",
      },
      {
        title: "Event Safety Plans",
        category: "Intermediate Queries",
        query:
          '(inurl:festival OR inurl:event) ("medical plan" OR "health plan" OR "safety plan") filetype:pdf',
        explanation: "",
      },
      {
        title: "Drug Checking at Festivals",
        category: "Intermediate Queries",
        query: '"drug checking" festival (Australia OR NSW OR VIC OR ACT) (evaluation OR report)',
        explanation: "",
      },
      {
        title: "DanceWize & Peer Programs",
        category: "Intermediate Queries",
        query: '"DanceWize" OR ("peer harm reduction" festival) filetype:pdf',
        explanation: "",
      },
      {
        title: "Festival Medical Guidelines",
        category: "Intermediate Queries",
        query: '"festival medical" (guidelines OR protocol OR "best practice") filetype:pdf',
        explanation: "",
      },
      {
        title: "Comprehensive Festival Health Sweep",
        category: "Advanced Queries",
        query:
          '(festival OR "music event" OR "outdoor event") ("harm reduction" OR "drug safety" OR "event health") (Australia OR NSW OR VIC OR QLD) (evaluation OR report OR guideline) filetype:pdf -news after:2020',
        explanation: "",
      },
      {
        title: "Roving Medical/Welfare Teams",
        category: "Advanced Queries",
        query:
          '(festival OR "music event") ("roving" OR "welfare team" OR "peer support") (protocol OR training OR guideline)',
        explanation: "",
      },
      {
        title: "Chill-Out Spaces",
        category: "Advanced Queries",
        query:
          '("chill out" OR "chill-out" OR "welfare tent" OR "safe space") festival (guideline OR protocol OR training) filetype:pdf',
        explanation: "",
      },
      {
        title: "Heat/Weather Safety",
        category: "Advanced Queries",
        query:
          '(festival OR "outdoor event") (heat OR weather OR dehydration OR "heat stress") (safety OR guideline OR protocol)',
        explanation: "",
      },
      {
        title: "Crowd Safety",
        category: "Advanced Queries",
        query:
          '(festival OR "music event") ("crowd safety" OR "crowd crush" OR "crowd management") (guideline OR protocol)',
        explanation: "",
      },
      {
        title: "Australian Festivals",
        category: "🎪 Specific Major Festivals",
        query:
          '"Groovin the Moo" ("drug checking" OR "harm reduction" OR medical)\n"Lost Paradise" ("drug checking" OR "harm reduction")\n"Splendour in the Grass" ("harm reduction" OR "medical report")\n"Falls Festival" ("harm reduction" OR medical OR "incident report")\n"Rainbow Serpent" harm reduction OR "event health"\n"Strawberry Fields" "drug checking" OR "harm reduction"\n"Subsonic" harm reduction\n"Beyond the Valley" medical OR "harm reduction"',
        explanation: "",
      },
      {
        title: "Finding Event-Specific Intelligence",
        category: "🎪 Specific Major Festivals",
        query: '"[FESTIVAL NAME]" ("harm reduction" OR "medical" OR "drug checking" OR "incident")',
        explanation: "",
      },
      {
        title: "Medical Services at Events",
        category: "🏥 Medical & Clinical",
        query: '"event medical" OR "festival medical" (services OR team OR protocol) Australia',
        explanation: "",
      },
      {
        title: "Drug-Related Presentations",
        category: "🏥 Medical & Clinical",
        query:
          '(festival OR "music event") ("drug related" OR "substance related") (presentation OR emergency OR incident) (data OR report)',
        explanation: "",
      },
      {
        title: "Overdose Response at Events",
        category: "🏥 Medical & Clinical",
        query:
          '(festival OR event) overdose (response OR protocol OR "rapid response") filetype:pdf',
        explanation: "",
      },
      {
        title: "First Aid Protocols",
        category: "🏥 Medical & Clinical",
        query: '"first aid" ("drug related" OR "substance") festival (protocol OR response)',
        explanation: "",
      },
      {
        title: "DanceWize",
        category: "👥 Peer Programs",
        query:
          'site:hrvic.org.au DanceWize filetype:pdf\n"DanceWize" (training OR volunteer OR protocol)',
        explanation: "",
      },
      {
        title: "Peer Outreach at Events",
        category: "👥 Peer Programs",
        query: '("peer outreach" OR "peer support") festival (training OR protocol OR evaluation)',
        explanation: "",
      },
      {
        title: "Volunteer Training",
        category: "👥 Peer Programs",
        query:
          '(festival OR event) ("harm reduction" OR "peer support") volunteer training filetype:pdf',
        explanation: "",
      },
      {
        title: "Festival Harm Reduction Evaluations",
        category: "Evaluation & Research",
        query: '"festival harm reduction" evaluation (report OR findings) filetype:pdf',
        explanation: "",
      },
      {
        title: "Drug Checking Trial Evaluations",
        category: "Evaluation & Research",
        query: '"drug checking" festival (evaluation OR pilot OR trial) Australia filetype:pdf',
        explanation: "",
      },
      {
        title: "Event Health Data",
        category: "Evaluation & Research",
        query:
          '(festival OR "music event") "health data" OR "presentation data" OR statistics (report OR analysis)',
        explanation: "",
      },
      {
        title: "Event Health Planning",
        category: "🔧 Planning & Operations",
        query:
          '"event health" planning OR "risk assessment" (festival OR "music event") filetype:pdf',
        explanation: "",
      },
      {
        title: "Licensing & Regulations",
        category: "🔧 Planning & Operations",
        query:
          '(festival OR "music event") (license OR regulation OR "harm reduction requirements") (NSW OR VIC OR QLD)',
        explanation: "",
      },
      {
        title: "Stakeholder Coordination",
        category: "🔧 Planning & Operations",
        query:
          '(festival OR event) ("multi-agency" OR "stakeholder" OR "coordination") (health OR safety OR "harm reduction")',
        explanation: "",
      },
      {
        title: "UK Festival Health",
        category: "International Best Practice",
        query: 'site:*.gov.uk OR site:*.org.uk "festival" "harm reduction" OR "drug safety"',
        explanation: "",
      },
      {
        title: "European Models",
        category: "International Best Practice",
        query:
          '(Europe OR Netherlands OR Switzerland) festival "drug checking" OR "harm reduction" (model OR "best practice")',
        explanation: "",
      },
      {
        title: "The Loop (UK)",
        category: "International Best Practice",
        query: '"The Loop" "drug checking" festival evaluation OR results',
        explanation: "",
      },
    ],
  },
  {
    id: "first-nations",
    title: "Aboriginal & Torres Strait Islander AOD & Harm Reduction",
    description: "Culturally safe, self-determined approaches to healing.",
    dorks: [
      {
        title: "Aboriginal Community Controlled Health (ACCHOs)",
        category: "Basic Queries",
        query:
          'site:naccho.org.au "alcohol" OR "drug" OR "AOD" OR "substance"\n"Aboriginal Community Controlled Health" AOD OR "alcohol and other drugs"',
        explanation: "",
      },
      {
        title: "Aboriginal-Specific Programs",
        category: "Basic Queries",
        query:
          '"Aboriginal" "harm reduction" program Australia filetype:pdf\n"Aboriginal" "alcohol and other drugs" service OR program',
        explanation: "",
      },
      {
        title: "Indigenous Health (Exclude US/Canada)",
        category: "Basic Queries",
        query: '"Indigenous" "drug and alcohol" OR "AOD" Australia -USA -Canada',
        explanation: "",
      },
      {
        title: "State ACCHOs",
        category: "Intermediate Queries",
        query:
          'site:ahmrc.org.au filetype:pdf\nsite:vaccho.org.au "alcohol and other drugs"\nsite:qaihc.com.au harm reduction OR AOD',
        explanation: "",
      },
      {
        title: "Cultural Healing Approaches",
        category: "Intermediate Queries",
        query:
          '"cultural healing" "alcohol" OR "drug" Aboriginal Australia\n"connection to country" OR "return to country" healing substance',
        explanation: "",
      },
      {
        title: "Regional Identifiers",
        category: "Intermediate Queries",
        query: '"Koori" OR "Murri" OR "Nunga" "drug" OR "alcohol" health',
        explanation: "",
      },
      {
        title: "Comprehensive Aboriginal AOD Sweep",
        category: "Advanced Queries",
        query:
          '("Aboriginal" OR "Torres Strait Islander" OR "Indigenous" OR "First Nations") ("alcohol and other drugs" OR AOD OR "harm reduction" OR "drug and alcohol") Australia (program OR service OR policy OR research) filetype:pdf -USA -Canada after:2020',
        explanation: "",
      },
      {
        title: "Self-Determination in AOD",
        category: "Advanced Queries",
        query:
          '"self-determination" OR "community controlled" (Aboriginal OR Indigenous) ("alcohol and other drugs" OR AOD) Australia',
        explanation: "",
      },
      {
        title: "Culturally Safe Practice",
        category: "Advanced Queries",
        query:
          '"cultural safety" OR "culturally safe" (AOD OR "alcohol and other drugs" OR "harm reduction") Aboriginal filetype:pdf',
        explanation: "",
      },
      {
        title: "National",
        category: "🏥 Aboriginal Community Controlled Organisations",
        query:
          'site:naccho.org.au filetype:pdf\n"National Aboriginal Community Controlled Health Organisation" AOD',
        explanation: "",
      },
      {
        title: "Multi-ACCHO Search",
        category: "🏥 Aboriginal Community Controlled Organisations",
        query:
          '(ACCHO OR "community controlled") ("harm reduction" OR "alcohol drug" OR AOD) filetype:pdf',
        explanation: "",
      },
      {
        title: "Cultural Healing",
        category: "🌿 Cultural Approaches & Healing",
        query:
          '"cultural healing" ("alcohol" OR "drug" OR "substance") Aboriginal Australia filetype:pdf',
        explanation: "",
      },
      {
        title: "Connection to Country",
        category: "🌿 Cultural Approaches & Healing",
        query:
          '"connection to country" OR "return to country" healing (substance OR addiction OR alcohol)',
        explanation: "",
      },
      {
        title: "Ceremony & Cultural Practice",
        category: "🌿 Cultural Approaches & Healing",
        query:
          '"ceremony" OR "cultural practice" healing (addiction OR substance OR alcohol) Aboriginal',
        explanation: "",
      },
      {
        title: "Elders' Roles",
        category: "🌿 Cultural Approaches & Healing",
        query: '"Elders" role healing OR recovery (substance OR alcohol) Aboriginal',
        explanation: "",
      },
      {
        title: "Gender-Specific Healing",
        category: "🌿 Cultural Approaches & Healing",
        query:
          '"men\'s group" OR "women\'s group" Aboriginal healing alcohol drug\n"women\'s business" OR "men\'s business" healing substance',
        explanation: "",
      },
      {
        title: "Yarning",
        category: "🌿 Cultural Approaches & Healing",
        query:
          '"yarning circle" OR "yarning" (substance OR alcohol OR wellbeing OR healing) Aboriginal',
        explanation: "",
      },
      {
        title: "Lowitja Institute",
        category: "📋 Policy & Research",
        query: 'site:lowitja.org.au "alcohol" OR "drug" OR "substance" filetype:pdf',
        explanation: "",
      },
      {
        title: "Closing the Gap",
        category: "📋 Policy & Research",
        query: '"Closing the Gap" ("alcohol" OR "drug" OR "substance")',
        explanation: "",
      },
      {
        title: "National Strategies",
        category: "📋 Policy & Research",
        query:
          '"National Aboriginal and Torres Strait Islander" drug OR alcohol strategy\n"Aboriginal and Torres Strait Islander" health plan AOD',
        explanation: "",
      },
      {
        title: "AIHW Aboriginal Data (Statistics)",
        category: "📋 Policy & Research",
        query:
          'site:aihw.gov.au ("Aboriginal" OR "Indigenous") ("alcohol and other drugs" OR substance)',
        explanation: "",
      },
      {
        title: "Diversion Programs",
        category: "⚖️ Justice & Incarceration",
        query:
          '"Aboriginal" "justice" "alcohol" OR "drug" diversion\n"Koori Court" OR "Murri Court" drug OR alcohol\n"Aboriginal Legal Service" drug OR alcohol diversion',
        explanation: "",
      },
      {
        title: "Over-Representation",
        category: "⚖️ Justice & Incarceration",
        query:
          '"over-representation" Aboriginal prison drug OR alcohol\n"Aboriginal" "incarceration" OR "prison" drug OR alcohol',
        explanation: "",
      },
      {
        title: "Circle Sentencing",
        category: "⚖️ Justice & Incarceration",
        query: '"circle sentencing" drug OR alcohol Aboriginal',
        explanation: "",
      },
      {
        title: "Stolen Generations",
        category: "💔 Trauma & Healing",
        query: '"Stolen Generations" trauma "substance" OR "alcohol"',
        explanation: "",
      },
      {
        title: "Intergenerational Trauma",
        category: "💔 Trauma & Healing",
        query:
          '"intergenerational trauma" "alcohol" OR "drug" Aboriginal\n"historical trauma" OR "collective trauma" Aboriginal substance',
        explanation: "",
      },
      {
        title: "Trauma-Informed Care",
        category: "💔 Trauma & Healing",
        query: '"trauma-informed" Aboriginal (drug OR alcohol) service filetype:pdf',
        explanation: "",
      },
      {
        title: "Aboriginal Youth",
        category: "👨‍👩‍👧 Youth & Families",
        query:
          '"Aboriginal youth" drug OR alcohol prevention\n"Aboriginal young people" (AOD OR "alcohol and other drugs")',
        explanation: "",
      },
      {
        title: "Families",
        category: "👨‍👩‍👧 Youth & Families",
        query:
          '"Aboriginal families" substance OR alcohol support\n"kinship" OR "family" Aboriginal "alcohol drug" healing',
        explanation: "",
      },
      {
        title: "FASD",
        category: "👨‍👩‍👧 Youth & Families",
        query: '"Aboriginal" (FASD OR "fetal alcohol") prevention',
        explanation: "",
      },
      {
        title: "Aboriginal Residential Rehab",
        category: "🏡 Residential & Treatment Services",
        query:
          '"Aboriginal residential rehabilitation" OR "Aboriginal healing centre"\n"Aboriginal" (rehab OR rehabilitation) "drug" OR "alcohol"',
        explanation: "",
      },
      {
        title: "Culturally Safe Treatment",
        category: "🏡 Residential & Treatment Services",
        query: '"culturally safe" treatment (Aboriginal OR Indigenous) (drug OR alcohol) Australia',
        explanation: "",
      },
      {
        title: "AIHW Aboriginal Data",
        category: "Data & Statistics",
        query:
          'site:aihw.gov.au "Aboriginal" "alcohol" statistics\nsite:abs.gov.au "Indigenous" "substance use" OR "alcohol"',
        explanation: "",
      },
      {
        title: "Overdose/Death Data",
        category: "Data & Statistics",
        query:
          '"Aboriginal" "overdose" OR "drug death" data Australia\n"Aboriginal" "alcohol-related" hospitalisation OR death statistics',
        explanation: "",
      },
    ],
  },
  {
    id: "forum-community",
    title: "Forum & Community Research",
    description:
      "Finding harm reduction discussions, peer knowledge, and community insights on forums and social",
    dorks: [
      {
        title: "Harm Reduction Subreddits",
        category: "Reddit",
        query:
          'site:reddit.com/r/harmreduction\nsite:reddit.com/r/drugs "harm reduction" OR "safe use"\nsite:reddit.com/r/opiates naloxone OR "narcan"\nsite:reddit.com/r/researchchemicals Australia',
        explanation:
          "[👉 **Run HR Subreddit Search**](https://www.google.com/search?q=site%3Areddit.com%2Fr%2Fharmreduction)",
      },
      {
        title: "Australian Subreddits",
        category: "Reddit",
        query:
          'site:reddit.com/r/australia "drug" OR "overdose" OR "pill testing"\nsite:reddit.com/r/melbourne "safe injecting" OR "MSIR"\nsite:reddit.com/r/sydney "drug checking" OR "harm reduction"\nsite:reddit.com/r/brisbane naloxone OR "needle exchange"',
        explanation:
          "[👉 **Run Australian Reddit Search**](https://www.google.com/search?q=site%3Areddit.com%2Fr%2Faustralia+%22drug%22+OR+%22overdose%22+OR+%22pill+testing%22)",
      },
      {
        title: "Specific Topics on Reddit",
        category: "Reddit",
        query:
          'site:reddit.com "fentanyl" Australia warning OR alert\nsite:reddit.com "nitazene" OR "metonitazene" Australia\nsite:reddit.com "drug checking" "festival" Australia\nsite:reddit.com "naloxone" "pharmacy" Australia access\nsite:reddit.com "methadone" OR "buprenorphine" Australia experience',
        explanation:
          "[👉 **Run Topic Search**](https://www.google.com/search?q=site%3Areddit.com+%22fentanyl%22+Australia+warning+OR+alert)",
      },
      {
        title: "Recovery & Support Subreddits",
        category: "Reddit",
        query:
          'site:reddit.com/r/OpiatesRecovery Australia\nsite:reddit.com/r/REDDITORSINRECOVERY "harm reduction"\nsite:reddit.com/r/addiction Australia support',
        explanation:
          "[👉 **Run Recovery Search**](https://www.google.com/search?q=site%3Areddit.com%2Fr%2FOpiatesRecovery+Australia)",
      },
      {
        title: "Hashtag Research",
        category: "🐦 Twitter/X",
        query:
          'site:twitter.com "#harmreduction" Australia\nsite:twitter.com "#drugchecking" OR "#pilltesting"\nsite:twitter.com "#overdoseprevention" Australia\nsite:twitter.com "#peersupport" drug OR AOD',
        explanation:
          "[👉 **Run Twitter Hashtag Search**](https://www.google.com/search?q=site%3Atwitter.com+%22%23harmreduction%22+Australia)",
      },
      {
        title: "Organisation Accounts",
        category: "🐦 Twitter/X",
        query:
          "site:twitter.com from:aaborginald harm reduction\nsite:twitter.com from:NUABORGINALTAA naloxone\nsite:twitter.com from:HRVic",
        explanation: "",
      },
      {
        title: "Public Groups & Pages",
        category: "📘 Facebook",
        query:
          'site:facebook.com "harm reduction" Australia group\nsite:facebook.com "naloxone" Australia\nsite:facebook.com "drug checking" OR "pill testing" Australia',
        explanation:
          "[👉 **Run Facebook Search**](https://www.google.com/search?q=site%3Afacebook.com+%22harm+reduction%22+Australia+group)",
      },
      {
        title: "Events & Campaigns",
        category: "📘 Facebook",
        query:
          'site:facebook.com/events "harm reduction" OR "overdose awareness"\nsite:facebook.com "International Overdose Awareness Day" Australia',
        explanation: "",
      },
      {
        title: "General Forum Discovery",
        category: "💬 Forum Platforms",
        query:
          '"harm reduction" inurl:forum\n"drug checking" inurl:forum OR inurl:community\n"naloxone" inurl:forum Australia\n"peer support" drug inurl:forum',
        explanation:
          "[👉 **Run Forum Search**](https://www.google.com/search?q=%22harm+reduction%22+inurl%3Aforum)",
      },
      {
        title: "phpBB Forums",
        category: "💬 Forum Platforms",
        query:
          '"Powered by phpBB" "harm reduction"\n"Powered by phpBB" "drug" Australia\ninurl:viewtopic.php "harm reduction" OR "drug use"',
        explanation:
          "[👉 **Run phpBB Search**](https://www.google.com/search?q=%22Powered+by+phpBB%22+%22harm+reduction%22)",
      },
      {
        title: "vBulletin Forums",
        category: "💬 Forum Platforms",
        query:
          '"Powered by vBulletin" "harm reduction"\n"Powered by vBulletin" "drug" Australia forum\ninurl:showthread.php "overdose" OR "naloxone"',
        explanation:
          "[👉 **Run vBulletin Search**](https://www.google.com/search?q=%22Powered+by+vBulletin%22+%22harm+reduction%22)",
      },
      {
        title: "SMF (Simple Machines Forum)",
        category: "💬 Forum Platforms",
        query:
          '"Powered by SMF" "harm reduction" OR "drug"\ninurl:index.php?topic "harm reduction"',
        explanation: "",
      },
      {
        title: "Discourse Forums",
        category: "💬 Forum Platforms",
        query:
          '"Powered by Discourse" "harm reduction"\nsite:*.discourse.org "drug" OR "harm reduction"',
        explanation: "",
      },
      {
        title: "Invision Forums",
        category: "💬 Forum Platforms",
        query: '"Powered by Invision" "harm reduction"\n"IP.Board" "drug" OR "addiction" forum',
        explanation: "",
      },
      {
        title: "Mental Health Communities",
        category: "🏥 Health & Support Forums",
        query:
          'site:beyondblue.org.au forum "drug" OR "addiction"\nsite:sane.org forum "substance"\n"mental health forum" Australia "drug use"',
        explanation:
          "[👉 **Run Mental Health Forum Search**](https://www.google.com/search?q=site%3Abeyondblue.org.au+forum+%22drug%22+OR+%22addiction%22)",
      },
      {
        title: "Chronic Pain Forums",
        category: "🏥 Health & Support Forums",
        query:
          '"chronic pain forum" Australia opioid\n"pain management" forum Australia medication',
        explanation: "",
      },
      {
        title: "Hepatitis Forums",
        category: "🏥 Health & Support Forums",
        query: '"hepatitis" forum Australia "harm reduction"\n"hep C" forum treatment Australia',
        explanation: "",
      },
      {
        title: "Festival Forums",
        category: "🎪 Festival & Music Communities",
        query:
          '"festival" forum Australia "drug" OR "harm reduction"\n"music festival" forum "pill testing" OR "drug checking"\n"rave" forum Australia "harm reduction"',
        explanation:
          "[👉 **Run Festival Forum Search**](https://www.google.com/search?q=%22festival%22+forum+Australia+%22drug%22+OR+%22harm+reduction%22)",
      },
      {
        title: "EDM Communities",
        category: "🎪 Festival & Music Communities",
        query:
          'site:reddit.com/r/aves Australia "harm reduction"\n"electronic music" forum Australia "safe" drug',
        explanation: "",
      },
      {
        title: "Telegram (Public Groups)",
        category: "📱 Messaging & Chat Platforms",
        query: 'site:t.me "harm reduction" OR "drug checking"\nsite:t.me Australia "drug" alert',
        explanation: "",
      },
      {
        title: "Discord (Server Discovery)",
        category: "📱 Messaging & Chat Platforms",
        query:
          'site:discord.com "harm reduction"\nsite:discord.gg "drug" OR "harm reduction"\nsite:disboard.org "harm reduction"',
        explanation: "",
      },
      {
        title: "Quora",
        category: "🗣️ Q&A Platforms",
        query:
          'site:quora.com "harm reduction" Australia\nsite:quora.com "naloxone" Australia\nsite:quora.com "drug policy" Australia',
        explanation:
          "[👉 **Run Quora Search**](https://www.google.com/search?q=site%3Aquora.com+%22harm+reduction%22+Australia)",
      },
      {
        title: "Stack Exchange",
        category: "🗣️ Q&A Platforms",
        query:
          'site:stackexchange.com "harm reduction"\nsite:health.stackexchange.com "overdose" OR "naloxone"',
        explanation: "",
      },
      {
        title: "Australian News Sites",
        category: "📰 News Comment Sections",
        query:
          'site:abc.net.au/news "pill testing" comments\nsite:theguardian.com/australia "drug checking" comments\nsite:sbs.com.au "harm reduction" comments',
        explanation: "",
      },
      {
        title: "Find Forum Discussions About Specific Topics",
        category: "🔍 Advanced Forum Searches",
        query:
          'inurl:forum OR inurl:thread "fentanyl" Australia alert\ninurl:forum "drug warning" OR "contaminated" Australia\ninurl:forum "naloxone" access Australia',
        explanation: "",
      },
      {
        title: "Find User Experiences",
        category: "🔍 Advanced Forum Searches",
        query:
          'inurl:forum "my experience" "harm reduction" Australia\ninurl:forum "personal story" drug OR overdose\ninurl:thread "what helped me" addiction OR recovery',
        explanation: "",
      },
      {
        title: "Find Local Discussions",
        category: "🔍 Advanced Forum Searches",
        query:
          'inurl:forum "Sydney" "harm reduction" OR "drug"\ninurl:forum "Melbourne" "safe injecting" OR "MSIR"\ninurl:forum "Brisbane" naloxone OR "NSP"',
        explanation: "",
      },
      {
        title: "Most Active Discussions",
        category: "Forum Analytics",
        query:
          'inurl:forum "harm reduction" ("replies" OR "views") Australia\ninurl:viewtopic "harm reduction" Australia',
        explanation: "",
      },
      {
        title: "Recent Discussions",
        category: "Forum Analytics",
        query:
          'inurl:forum "harm reduction" Australia 2024..2026\ninurl:forum "drug checking" Australia after:2024',
        explanation: "",
      },
    ],
  },
  {
    id: "housing-homelessness",
    title: "Housing, Homelessness & Social Determinants",
    description: "The intersection of AOD, housing, and social factors.",
    dorks: [
      {
        title: "Homelessness & Drug Use",
        category: "Basic Queries",
        query:
          '"homelessness" "alcohol and other drugs" OR AOD Australia filetype:pdf\n"rough sleeping" drug OR alcohol Australia',
        explanation: "",
      },
      {
        title: "Housing First",
        category: "Basic Queries",
        query: '"housing first" alcohol OR drug Australia evaluation',
        explanation: "",
      },
      {
        title: "Street-Based Outreach",
        category: "Basic Queries",
        query:
          '"street present" drug OR substance use outreach\n"homeless" "harm reduction" outreach Australia',
        explanation: "",
      },
      {
        title: "Supportive Housing",
        category: "Intermediate Queries",
        query:
          '"supportive housing" AOD OR "alcohol and other drugs" Australia\n"supported accommodation" drug OR alcohol Australia',
        explanation: "",
      },
      {
        title: "Housing Instability",
        category: "Intermediate Queries",
        query:
          '"housing instability" drug use OR substance use Australia\n"eviction" OR "tenancy" drug use OR substance use',
        explanation: "",
      },
      {
        title: "Transitional Housing",
        category: "Intermediate Queries",
        query: '"transitional housing" AOD OR substance use Australia',
        explanation: "",
      },
      {
        title: "Comprehensive Housing/AOD Sweep",
        category: "Advanced Queries",
        query:
          '("housing" OR "homelessness" OR "accommodation") ("alcohol and other drugs" OR AOD OR "drug use" OR "substance use") Australia (service OR program OR research OR policy) filetype:pdf after:2020',
        explanation: "",
      },
      {
        title: "Social Determinants",
        category: "Advanced Queries",
        query: '"social determinants" "drug use" OR "substance use" Australia filetype:pdf',
        explanation: "",
      },
      {
        title: "Poverty & Drug Use",
        category: "Advanced Queries",
        query: '"poverty" AND "drug use" Australia research filetype:pdf',
        explanation: "",
      },
      {
        title: "Supportive Housing Models",
        category: "🏠 Housing & AOD",
        query: '"supportive housing" (model OR program) AOD Australia filetype:pdf',
        explanation: "",
      },
      {
        title: "Housing and Treatment",
        category: "🏠 Housing & AOD",
        query: '"housing" ("treatment" OR "recovery") AOD OR "alcohol and other drugs" Australia',
        explanation: "",
      },
      {
        title: "Tenancy & Drug Use",
        category: "🏠 Housing & AOD",
        query: '"tenancy" OR "rental" drug use (discrimination OR support OR policy)',
        explanation: "",
      },
      {
        title: "Eviction Prevention",
        category: "🏠 Housing & AOD",
        query: '"eviction prevention" drug OR alcohol OR AOD Australia',
        explanation: "",
      },
      {
        title: "Specialist Homelessness Services",
        category: "🏕️ Homelessness Services",
        query:
          '"specialist homelessness services" AOD OR "alcohol and other drugs" Australia\nsite:aihw.gov.au "homelessness" "alcohol and other drugs"',
        explanation: "",
      },
      {
        title: "Crisis Accommodation",
        category: "🏕️ Homelessness Services",
        query: '"crisis accommodation" drug OR alcohol (policy OR service) Australia',
        explanation: "",
      },
      {
        title: "Youth Homelessness",
        category: "🏕️ Homelessness Services",
        query: '"youth homelessness" drug OR alcohol Australia',
        explanation: "",
      },
      {
        title: "Street Outreach",
        category: "🚶 Outreach & Street-Based",
        query:
          '"outreach" OR "street-based" harm reduction Australia\n"mobile service" needle syringe OR harm reduction',
        explanation: "",
      },
      {
        title: "Assertive Outreach",
        category: "🚶 Outreach & Street-Based",
        query: '"assertive outreach" drug OR alcohol homeless',
        explanation: "",
      },
      {
        title: "Drop-In Services",
        category: "🚶 Outreach & Street-Based",
        query: '"drop-in" OR "low threshold" drug OR AOD service Australia',
        explanation: "",
      },
      {
        title: "Social Exclusion",
        category: "Social Determinants Research",
        query: '"social exclusion" "people who use drugs" OR "drug use" Australia',
        explanation: "",
      },
      {
        title: "Unemployment",
        category: "Social Determinants Research",
        query: '"unemployment" drug use OR alcohol use Australia research',
        explanation: "",
      },
      {
        title: "Education",
        category: "Social Determinants Research",
        query: '"education" protective factor drug use OR substance use',
        explanation: "",
      },
      {
        title: "Poverty",
        category: "Social Determinants Research",
        query: '"poverty" "substance use" OR "drug use" Australia research filetype:pdf',
        explanation: "",
      },
      {
        title: "Mental Health & Homelessness",
        category: "🔄 Intersections",
        query: '"mental health" "homelessness" "substance use" OR AOD Australia',
        explanation: "",
      },
      {
        title: "Justice & Homelessness",
        category: "🔄 Intersections",
        query: '"prison release" OR "post-release" "homelessness" drug OR alcohol',
        explanation: "",
      },
      {
        title: "Family Violence & AOD",
        category: "🔄 Intersections",
        query:
          '"family violence" OR "domestic violence" AOD OR "alcohol and other drugs" homelessness',
        explanation: "",
      },
      {
        title: "Housing First Policy",
        category: "📋 Policy & Programs",
        query: '"housing first" policy OR program Australia (evaluation OR implementation)',
        explanation: "",
      },
      {
        title: "Integrated Services",
        category: "📋 Policy & Programs",
        query: '"integrated service" housing AOD OR "mental health" Australia',
        explanation: "",
      },
      {
        title: "No Wrong Door",
        category: "📋 Policy & Programs",
        query: '"no wrong door" housing OR homelessness AOD',
        explanation: "",
      },
    ],
  },
  {
    id: "international",
    title: "International Best Practice",
    description: "Comparators from key international jurisdictions for policy and practice.",
    dorks: [
      {
        title: "New Zealand (Similar Context)",
        category: "Basic Queries",
        query: 'site:*.govt.nz "harm reduction" OR "needle exchange"',
        explanation: "",
      },
      {
        title: "UK Policy & Research",
        category: "Basic Queries",
        query: 'site:*.gov.uk "drug consumption room" OR "drug policy" reform',
        explanation: "",
      },
      {
        title: "Canadian Safe Supply",
        category: "Basic Queries",
        query: 'site:*.gc.ca "supervised consumption" OR "safe supply" evaluation',
        explanation: "",
      },
      {
        title: "European Drug Policy (EMCDDA)",
        category: "Intermediate Queries",
        query: 'site:emcdda.europa.eu filetype:pdf "drug checking" OR "harm reduction"',
        explanation: "",
      },
      {
        title: "Portugal Decriminalisation",
        category: "Intermediate Queries",
        query:
          'site:*.pt OR "Portugal" "decriminalization" drugs (evaluation OR outcomes) 2001..2025',
        explanation: "",
      },
      {
        title: "Swiss Heroin-Assisted Treatment",
        category: "Intermediate Queries",
        query:
          '(Switzerland OR Swiss) "heroin assisted treatment" OR "heroin prescription" evaluation filetype:pdf',
        explanation: "",
      },
      {
        title: "Netherlands Drug Policy",
        category: "Intermediate Queries",
        query:
          '(Netherlands OR Dutch) "drug policy" "harm reduction" (coffeeshop OR cannabis OR "tolerance policy")',
        explanation: "",
      },
      {
        title: "Comprehensive International Sweep",
        category: "Advanced Queries",
        query:
          '("drug consumption room" OR "supervised consumption" OR "supervised injection" OR "safe injection") (evaluation OR effectiveness OR outcomes) (Canada OR UK OR Europe OR Switzerland) filetype:pdf after:2018',
        explanation: "",
      },
      {
        title: "International Best Practice Comparison",
        category: "Advanced Queries",
        query:
          '"harm reduction" ("best practice" OR "gold standard" OR model) international (comparison OR review) filetype:pdf',
        explanation: "",
      },
      {
        title: "Drug Checking International",
        category: "Advanced Queries",
        query:
          '"drug checking" (evaluation OR service OR program) (Europe OR UK OR "New Zealand" OR Canada) filetype:pdf',
        explanation: "",
      },
      {
        title: "Canada",
        category: "🌍 By Country/Region",
        query:
          'site:*.gc.ca "supervised consumption" OR "safe injection" evaluation filetype:pdf\nsite:*.gc.ca "safe supply" OR "safer supply" (opioid OR prescription) filetype:pdf\nsite:bccsu.ca filetype:pdf (guidelines OR protocol)',
        explanation:
          "**Key Canadian Resources:**\n\n- BC Centre on Substance Use (BCCSU)\n- Health Canada supervised consumption\n- Safe supply programs",
      },
      {
        title: "United Kingdom",
        category: "🌍 By Country/Region",
        query:
          'site:*.gov.uk "drug consumption room" OR "drug policy" filetype:pdf\nsite:*.gov.uk "naloxone" OR "take-home naloxone" program\nsite:release.org.uk filetype:pdf',
        explanation: "",
      },
      {
        title: "Europe (EMCDDA)",
        category: "🌍 By Country/Region",
        query:
          'site:emcdda.europa.eu filetype:pdf\nsite:emcdda.europa.eu "drug checking" OR "harm reduction" OR "treatment"',
        explanation: "",
      },
      {
        title: "Portugal",
        category: "🌍 By Country/Region",
        query:
          '"Portugal" "decriminalization" OR "decriminalisation" (drugs OR drug policy) (evaluation OR model OR lessons) filetype:pdf\n"Dissuasion Commission" Portugal drug',
        explanation: "",
      },
      {
        title: "Switzerland",
        category: "🌍 By Country/Region",
        query:
          '(Switzerland OR Swiss) ("heroin assisted treatment" OR HAT OR "heroin prescription") (evaluation OR outcomes) filetype:pdf\n(Switzerland OR Swiss) "drug consumption room" OR "injection room"',
        explanation: "",
      },
      {
        title: "Netherlands",
        category: "🌍 By Country/Region",
        query:
          '(Netherlands OR Dutch) "drug policy" (coffeeshop OR cannabis OR "harm reduction") filetype:pdf\n(Netherlands OR Dutch) "drug checking" OR "pill testing" (evaluation OR service)',
        explanation: "",
      },
      {
        title: "Germany",
        category: "🌍 By Country/Region",
        query:
          '(Germany OR German) "drug consumption room" OR "harm reduction" policy filetype:pdf',
        explanation: "",
      },
      {
        title: "New Zealand",
        category: "🌍 By Country/Region",
        query:
          'site:*.govt.nz "needle exchange" OR "drug checking" OR "harm reduction"\n"New Zealand" "drug checking" OR "pill testing" (legislation OR implementation)',
        explanation: "",
      },
      {
        title: "WHO (World Health Organization)",
        category: "International Bodies",
        query:
          'site:who.int "harm reduction" OR "needle syringe" OR "opioid agonist" guidelines filetype:pdf',
        explanation: "",
      },
      {
        title: "UNODC",
        category: "International Bodies",
        query: 'site:unodc.org "harm reduction" guidelines OR standards filetype:pdf',
        explanation: "",
      },
      {
        title: "EMCDDA (European Monitoring)",
        category: "International Bodies",
        query: 'site:emcdda.europa.eu ("best practice" OR guidelines OR standards) filetype:pdf',
        explanation: "",
      },
      {
        title: "Harm Reduction International",
        category: "International Bodies",
        query: 'site:hri.global "global state of harm reduction" OR report filetype:pdf',
        explanation: "",
      },
      {
        title: "INPUD",
        category: "👥 International Peer Networks",
        query:
          'site:inpud.net filetype:pdf\n"International Network of People Who Use Drugs" (statement OR resources)',
        explanation: "",
      },
      {
        title: "Regional Networks",
        category: "👥 International Peer Networks",
        query:
          '"European Network of People Who Use Drugs" (EuroNPUD OR ENPUD)\n"Canadian Association of People Who Use Drugs" (CAPUD)\n"Asian Network of People Who Use Drugs" (ANPUD)',
        explanation: "",
      },
      {
        title: "Drug Consumption Rooms",
        category: "🏥 Service Model Comparisons",
        query:
          '("drug consumption room" OR "supervised injection" OR "supervised consumption" OR "safe injection facility") (evaluation OR review OR comparison) international filetype:pdf',
        explanation: "",
      },
      {
        title: "Heroin-Assisted Treatment",
        category: "🏥 Service Model Comparisons",
        query:
          '"heroin assisted treatment" OR "heroin prescription" (evaluation OR outcomes OR comparison) (Switzerland OR UK OR Canada OR Germany)',
        explanation: "",
      },
      {
        title: "Safe Supply Programs",
        category: "🏥 Service Model Comparisons",
        query:
          '"safe supply" OR "safer supply" (opioid OR prescription) (Canada OR "British Columbia") evaluation filetype:pdf',
        explanation: "",
      },
      {
        title: "Drug Checking Services",
        category: "🏥 Service Model Comparisons",
        query:
          '"drug checking" service (Europe OR UK OR "New Zealand") (evaluation OR model OR implementation) filetype:pdf',
        explanation: "",
      },
      {
        title: "EMCDDA Data",
        category: "International Data & Statistics",
        query: 'site:emcdda.europa.eu (statistics OR data OR "statistical bulletin") filetype:pdf',
        explanation: "",
      },
      {
        title: "UN World Drug Report",
        category: "International Data & Statistics",
        query: 'site:unodc.org "World Drug Report" filetype:pdf',
        explanation: "",
      },
      {
        title: "Global State of Harm Reduction",
        category: "International Data & Statistics",
        query: 'site:hri.global "global state" filetype:pdf',
        explanation: "",
      },
      {
        title: "Policy Transfer",
        category: "Lessons for Australia",
        query:
          '("policy transfer" OR "policy learning" OR "lessons from") (Portugal OR Canada OR Switzerland) "drug policy" Australia',
        explanation: "",
      },
      {
        title: "International Comparisons (Australian Context)",
        category: "Lessons for Australia",
        query:
          'Australia ("international comparison" OR "compared to" OR "lessons from") "drug policy" OR "harm reduction" filetype:pdf',
        explanation: "",
      },
      {
        title: "What Works Elsewhere",
        category: "Lessons for Australia",
        query:
          '("what works" OR "best practice" OR "evidence-based") "harm reduction" international review filetype:pdf',
        explanation: "",
      },
    ],
  },
  {
    id: "investigative",
    title: "Creative & Investigative Searching",
    description:
      "Finding buried, niche, obscure, and unusual content through creative dorking. Use responsibly.",
    dorks: [
      {
        title: "Directory & Index Mining",
        category: "Basic Queries",
        query:
          'site:*.gov.au inurl:"/publications/" filetype:pdf "harm reduction"\nsite:*.gov.au inurl:"/uploads/" filetype:pdf "drug"\nsite:*.gov.au inurl:"/documents/" filetype:pdf "overdose"',
        explanation: "",
      },
      {
        title: "Finding Draft Documents",
        category: "Basic Queries",
        query: 'site:*.gov.au filetype:pdf "draft" "harm reduction" -"final"',
        explanation: "",
      },
      {
        title: "Conference Presentations",
        category: "Basic Queries",
        query: 'filetype:pptx OR filetype:ppt "harm reduction" Australia',
        explanation: "",
      },
      {
        title: "Index Pages",
        category: "Intermediate Queries",
        query:
          'site:*.gov.au intitle:"index of" "harm reduction" OR "drug"\nsite:*.health.*.gov.au inurl:"/assets/" filetype:pdf',
        explanation: "",
      },
      {
        title: "Internal/Unpublished Documents",
        category: "Intermediate Queries",
        query:
          'site:*.gov.au filetype:pdf "internal use only" OR "not for distribution" "drug"\nsite:*.gov.au filetype:pdf "confidential" "alcohol and other drugs" -"de-identified"',
        explanation: "",
      },
      {
        title: "Embargoed/Pre-Release",
        category: "Intermediate Queries",
        query:
          'site:*.gov.au filetype:pdf "embargoed" OR "pre-release" drug policy\n"working paper" OR "discussion paper" harm reduction site:*.gov.au',
        explanation: "",
      },
      {
        title: "Comprehensive Directory Mining",
        category: "Advanced Queries",
        query:
          'site:*.gov.au (inurl:"/publications/" OR inurl:"/uploads/" OR inurl:"/documents/" OR inurl:"/assets/" OR inurl:"/files/") filetype:pdf ("harm reduction" OR "drug policy" OR "alcohol and other drugs") -inurl:html',
        explanation: "",
      },
      {
        title: "Meeting Minutes & Agendas",
        category: "Advanced Queries",
        query:
          'site:*.gov.au filetype:pdf "meeting minutes" ("harm reduction" OR "drug policy")\nsite:*.gov.au filetype:pdf "agenda" "alcohol and other drugs" committee\n"steering committee" OR "working group" minutes harm reduction filetype:pdf',
        explanation: "",
      },
      {
        title: "Tender Documents & Funding",
        category: "Advanced Queries",
        query:
          'site:*.gov.au "tender" OR "expression of interest" "harm reduction"\nsite:*.gov.au filetype:pdf "funding agreement" OR "service agreement" AOD\n"request for tender" "alcohol and other drugs" site:*.gov.au\n"grant guidelines" harm reduction site:*.gov.au',
        explanation: "",
      },
      {
        title: "Excel Files",
        category: "Spreadsheets & Data Files",
        query:
          'filetype:xlsx "harm reduction" OR "AOD" site:*.gov.au\nfiletype:xlsx "service directory" OR "contact list" drug alcohol',
        explanation: "",
      },
      {
        title: "CSV Files",
        category: "Spreadsheets & Data Files",
        query:
          'filetype:csv "needle syringe" OR "NSP" OR "overdose"\nfiletype:csv "drug" OR "alcohol" site:*.gov.au',
        explanation: "",
      },
      {
        title: "Old Excel Formats",
        category: "Spreadsheets & Data Files",
        query: 'filetype:xls "opioid treatment" OR "methadone" clinic',
        explanation: "",
      },
      {
        title: "FOI Releases",
        category: "📋 FOI (Freedom of Information)",
        query:
          'site:*.gov.au "freedom of information" OR "FOI" "drug" OR "harm reduction" filetype:pdf\nsite:*.gov.au inurl:foi OR inurl:freedom-of-information "alcohol" OR "overdose"',
        explanation: "",
      },
      {
        title: "Disclosure Logs",
        category: "📋 FOI (Freedom of Information)",
        query:
          '"disclosure log" site:*.gov.au "drug policy" OR "harm reduction"\n"FOI release" "harm reduction" OR "drug checking"',
        explanation: "",
      },
      {
        title: "Historical Documents",
        category: "📜 Legacy & Archived Content",
        query:
          'site:*.gov.au "harm reduction" 1990..2005 filetype:pdf\n"national drug strategy" Australia 1985..2000 filetype:pdf\n"needle exchange" Australia history OR origins 1980s',
        explanation: "",
      },
      {
        title: "Web Archive (NLA)",
        category: "📜 Legacy & Archived Content",
        query:
          'site:webarchive.nla.gov.au "harm reduction"\nsite:web.archive.org "aivl.org.au" OR "nuaa.org.au"',
        explanation: "",
      },
      {
        title: "AIDS Era Documents",
        category: "📜 Legacy & Archived Content",
        query: '"AIDS" "injecting drug use" Australia 1980s OR 1990s filetype:pdf',
        explanation: "",
      },
      {
        title: "Hidden Evaluations",
        category: "🔍 Buried Evaluations",
        query:
          'site:*.gov.au filetype:pdf "evaluation" "harm reduction" inurl:publications\nsite:*.gov.au filetype:pdf "review" "needle syringe program" -news',
        explanation: "",
      },
      {
        title: "Process & Outcome Evaluations",
        category: "🔍 Buried Evaluations",
        query: '"process evaluation" OR "outcome evaluation" harm reduction Australia filetype:pdf',
        explanation: "",
      },
      {
        title: "Cost-Effectiveness (Often Buried)",
        category: "🔍 Buried Evaluations",
        query:
          '"cost-effectiveness" OR "cost-benefit" harm reduction Australia filetype:pdf\nsite:*.gov.au "economic evaluation" ("harm reduction" OR "needle syringe" OR naloxone)',
        explanation: "",
      },
      {
        title: "RTF & ODT",
        category: "📄 Unusual File Types",
        query:
          'filetype:rtf "harm reduction" Australia\nfiletype:odt "drug checking" OR "pill testing"',
        explanation: "",
      },
      {
        title: "Ebooks",
        category: "📄 Unusual File Types",
        query: 'filetype:epub "harm reduction" guide',
        explanation: "",
      },
      {
        title: "Sitemaps (Reveal Hidden Pages)",
        category: "📄 Unusual File Types",
        query: 'filetype:xml "drug" site:*.gov.au sitemap',
        explanation: "",
      },
      {
        title: "Dissenting Views",
        category: "🗣️ Minority Reports & Dissent",
        query:
          '"minority report" OR "dissenting opinion" drug policy Australia\n"addendum" OR "additional comments" harm reduction inquiry\n"supplementary submission" drug policy parliament',
        explanation: "",
      },
      {
        title: "Alternative Perspectives",
        category: "🗣️ Minority Reports & Dissent",
        query: '"alternative view" OR "contrary evidence" drug law reform',
        explanation: "",
      },
      {
        title: "Common Directory Patterns",
        category: "🔧 URL Pattern Tricks",
        query:
          "inurl:publications site:*.gov.au filetype:pdf\ninurl:submissions site:*.gov.au filetype:pdf\ninurl:reports site:*.gov.au filetype:pdf\ninurl:resources site:*.org.au filetype:pdf",
        explanation: "",
      },
      {
        title: "Asset Directories",
        category: "🔧 URL Pattern Tricks",
        query:
          'inurl:/assets/ OR inurl:/uploads/ OR inurl:/files/ site:*.gov.au filetype:pdf "drug"',
        explanation: "",
      },
    ],
  },
  {
    id: "lgbtq-health",
    title: "LGBTQ+ Health & Harm Reduction",
    description:
      "Resources for LGBTQ+ communities, including sexual health, chemsex, and inclusive services.",
    dorks: [
      {
        title: "LGBTQ+ AOD Services",
        category: "Basic Queries",
        query:
          '("LGBTQ" OR "LGBTI" OR "queer" OR "rainbow") "alcohol and other drugs" service Australia',
        explanation: "",
      },
      {
        title: "Inclusive Treatment",
        category: "Basic Queries",
        query: '"LGBTQ" OR "LGBTI" inclusive drug OR alcohol treatment Australia',
        explanation: "",
      },
      {
        title: "Rainbow Tick Services",
        category: "Basic Queries",
        query: '"rainbow tick" OR "LGBTI inclusive" AOD OR "harm reduction" Australia',
        explanation: "",
      },
      {
        title: "Chemsex Resources",
        category: "Intermediate Queries",
        query: '"chemsex" OR "chem sex" OR "party and play" harm reduction Australia',
        explanation: "",
      },
      {
        title: "GHB/GBL Specific",
        category: "Intermediate Queries",
        query: '"GHB" OR "GBL" OR "G" harm reduction "gay men" OR "MSM" Australia',
        explanation: "",
      },
      {
        title: "Crystal Meth & LGBTQ+",
        category: "Intermediate Queries",
        query:
          '("crystal meth" OR "methamphetamine" OR "ice") ("gay men" OR "MSM" OR "LGBTQ") harm reduction Australia',
        explanation: "",
      },
      {
        title: "Comprehensive LGBTQ+ AOD Sweep",
        category: "Advanced Queries",
        query:
          '("LGBTQ" OR "LGBTI" OR "LGBTQIA" OR "queer" OR "gay" OR "lesbian" OR "bisexual" OR "transgender" OR "MSM") ("alcohol and other drugs" OR AOD OR "substance use" OR "drug use" OR "harm reduction") Australia (service OR resource OR program OR guideline) filetype:pdf after:2020',
        explanation: "",
      },
      {
        title: "Intersectional Resources",
        category: "Advanced Queries",
        query:
          '("LGBTQ" OR "queer") ("Aboriginal" OR "First Nations" OR "Indigenous") "harm reduction" Australia',
        explanation: "",
      },
      {
        title: "Sexual Health & Drug Use",
        category: "🏥 Sexual Health Integration",
        query:
          '"sexual health" "drug use" OR "substance use" ("gay men" OR "MSM" OR "LGBTQ") Australia',
        explanation: "",
      },
      {
        title: "PrEP & Drug Interactions",
        category: "🏥 Sexual Health Integration",
        query: '"PrEP" OR "pre-exposure prophylaxis" drug interaction harm reduction',
        explanation: "",
      },
      {
        title: "HIV Services & AOD",
        category: "🏥 Sexual Health Integration",
        query: '"HIV" "alcohol and other drugs" OR AOD service Australia',
        explanation: "",
      },
      {
        title: "Trans-Specific Resources",
        category: "🏳️‍⚧️ Trans & Gender Diverse",
        query:
          '("transgender" OR "trans" OR "gender diverse") "alcohol and other drugs" OR "harm reduction" Australia',
        explanation: "",
      },
      {
        title: "Hormone Therapy & Substances",
        category: "🏳️‍⚧️ Trans & Gender Diverse",
        query: '"hormone therapy" OR "HRT" drug interaction "trans" OR "transgender"',
        explanation: "",
      },
      {
        title: "Trans-Inclusive Services",
        category: "🏳️‍⚧️ Trans & Gender Diverse",
        query: '"trans inclusive" OR "trans affirming" AOD OR drug OR alcohol service Australia',
        explanation: "",
      },
      {
        title: "ACON Resources",
        category: "👥 Community Organizations",
        query: 'site:acon.org.au (drug OR alcohol OR "harm reduction" OR chemsex)',
        explanation: "",
      },
      {
        title: "Thorne Harbour Health",
        category: "👥 Community Organizations",
        query: 'site:thorneharbour.org (drug OR alcohol OR "harm reduction" OR chemsex)',
        explanation: "",
      },
      {
        title: "LGBTQ+ Health Australia",
        category: "👥 Community Organizations",
        query: 'site:lgbtiqhealth.org.au (drug OR alcohol OR "substance use")',
        explanation: "",
      },
      {
        title: "Dual Concerns",
        category: "🧠 Mental Health & LGBTQ+",
        query: '("LGBTQ" OR "queer") "mental health" "substance use" OR AOD Australia',
        explanation: "",
      },
      {
        title: "Minority Stress",
        category: "🧠 Mental Health & LGBTQ+",
        query: '"minority stress" ("substance use" OR "drug use" OR AOD) LGBTQ Australia',
        explanation: "",
      },
      {
        title: "Pride Events",
        category: "🎉 Events & Nightlife",
        query: '"pride" OR "mardi gras" "harm reduction" OR "drug safety" Australia',
        explanation: "",
      },
      {
        title: "Queer Nightlife Safety",
        category: "🎉 Events & Nightlife",
        query: '"queer" OR "LGBTQ" nightlife OR club "harm reduction" OR safety Australia',
        explanation: "",
      },
      {
        title: "LGBTQ+ Drug Use Research",
        category: "Research & Data",
        query:
          'site:*.edu.au ("LGBTQ" OR "gay" OR "MSM") "drug use" OR "substance use" Australia filetype:pdf',
        explanation: "",
      },
      {
        title: "Prevalence Studies",
        category: "Research & Data",
        query:
          '("LGBTQ" OR "gay men" OR "MSM") "drug use" (prevalence OR survey OR statistics) Australia',
        explanation: "",
      },
      {
        title: "Young LGBTQ+ People",
        category: "👶 LGBTQ+ Youth",
        query: '("LGBTQ" OR "queer") "young people" OR youth "alcohol and other drugs" Australia',
        explanation: "",
      },
      {
        title: "Minus18 Resources",
        category: "👶 LGBTQ+ Youth",
        query: 'site:minus18.org.au (drug OR alcohol OR "harm reduction")',
        explanation: "",
      },
    ],
  },
  {
    id: "mental-health",
    title: "Mental Health & Dual Diagnosis",
    description: "Co-occurring mental health and substance use.",
    dorks: [
      {
        title: "Dual Diagnosis / Co-occurring",
        category: "Basic Queries",
        query:
          '"dual diagnosis" OR "co-occurring" (mental health AND substance) Australia filetype:pdf',
        explanation: "",
      },
      {
        title: "Comorbidity",
        category: "Basic Queries",
        query: '"comorbidity" OR "comorbid" mental health drug OR alcohol Australia',
        explanation: "",
      },
      {
        title: "Co-existing Conditions",
        category: "Basic Queries",
        query: '"co-existing" mental health AOD OR "alcohol and other drugs"',
        explanation: "",
      },
      {
        title: "Treatment Frameworks",
        category: "Intermediate Queries",
        query: '"dual diagnosis" (treatment OR service OR framework) Australia filetype:pdf',
        explanation: "",
      },
      {
        title: "Trauma & Substance Use",
        category: "Intermediate Queries",
        query: '("trauma" OR "PTSD") "substance use" OR "drug use" treatment Australia',
        explanation: "",
      },
      {
        title: "Integrated Treatment Models",
        category: "Intermediate Queries",
        query: '"integrated treatment" mental health substance use Australia',
        explanation: "",
      },
      {
        title: "Comprehensive Dual Diagnosis Sweep",
        category: "Advanced Queries",
        query:
          '("dual diagnosis" OR "co-occurring" OR "comorbid" OR "co-existing") ("mental health" AND ("substance use" OR "drug use" OR "alcohol" OR AOD)) Australia (treatment OR service OR guideline OR research) filetype:pdf after:2020',
        explanation: "",
      },
      {
        title: "No Wrong Door",
        category: "Advanced Queries",
        query: '"no wrong door" mental health AOD OR "alcohol and other drugs"',
        explanation: "",
      },
      {
        title: "Service Models",
        category: "Advanced Queries",
        query: '"integrated service" OR "integrated care" dual diagnosis Australia',
        explanation: "",
      },
      {
        title: "Trauma & PTSD",
        category: "🧠 Specific Conditions",
        query:
          '("trauma" OR "PTSD" OR "post-traumatic") "substance use" treatment Australia filetype:pdf\n"trauma-informed" AOD OR "alcohol and other drugs" Australia',
        explanation: "",
      },
      {
        title: "Anxiety & Depression",
        category: "🧠 Specific Conditions",
        query: '("anxiety" OR "depression") "substance use" dual treatment Australia',
        explanation: "",
      },
      {
        title: "Psychosis",
        category: "🧠 Specific Conditions",
        query:
          '("psychosis" OR "schizophrenia") "substance use" OR "drug use" Australia filetype:pdf\n"drug-induced psychosis" treatment OR management Australia',
        explanation: "",
      },
      {
        title: "Personality Disorders",
        category: "🧠 Specific Conditions",
        query:
          '"borderline personality" substance use treatment Australia\n"personality disorder" AOD treatment Australia',
        explanation: "",
      },
      {
        title: "ADHD",
        category: "🧠 Specific Conditions",
        query:
          '"ADHD" substance use OR drug use relationship treatment Australia\n"attention deficit" AOD Australia',
        explanation: "",
      },
      {
        title: "Integrated Treatment",
        category: "🏥 Treatment Approaches",
        query:
          '"integrated treatment" mental health substance use Australia filetype:pdf\n"treating together" mental health substance use',
        explanation: "",
      },
      {
        title: "Parallel vs Sequential",
        category: "🏥 Treatment Approaches",
        query:
          '"parallel treatment" vs "integrated" dual diagnosis\n"sequential treatment" dual diagnosis',
        explanation: "",
      },
      {
        title: "Stepped Care",
        category: "🏥 Treatment Approaches",
        query: '"stepped care" mental health AOD OR substance use Australia',
        explanation: "",
      },
      {
        title: "Suicide & Substance Use",
        category: "⚠️ Suicide & Self-Harm",
        query:
          '"suicide" "substance use" OR "drug use" (risk OR prevention) Australia\n"suicidal ideation" substance use treatment',
        explanation: "",
      },
      {
        title: "Self-Harm",
        category: "⚠️ Suicide & Self-Harm",
        query: '"self-harm" drug OR alcohol intoxication',
        explanation: "",
      },
      {
        title: "Intentional Overdose",
        category: "⚠️ Suicide & Self-Harm",
        query: '"overdose" (intentional OR "self-harm" OR suicide) Australia',
        explanation: "",
      },
      {
        title: "Clinical Guidelines",
        category: "📋 Guidelines & Frameworks",
        query:
          '"dual diagnosis" (guideline OR "clinical guideline" OR protocol) Australia filetype:pdf\nsite:*.gov.au "dual diagnosis" OR "co-occurring" guideline',
        explanation: "",
      },
      {
        title: "Screening Tools",
        category: "📋 Guidelines & Frameworks",
        query: '"screening" "dual diagnosis" OR "co-occurring" (tool OR instrument) Australia',
        explanation: "",
      },
      {
        title: "Assessment",
        category: "📋 Guidelines & Frameworks",
        query: '"assessment" "dual diagnosis" Australia (framework OR guideline)',
        explanation: "",
      },
      {
        title: "Dual Diagnosis Capability",
        category: "👥 Workforce & Training",
        query:
          '"dual diagnosis capability" OR "co-occurring capability" (training OR framework) Australia',
        explanation: "",
      },
      {
        title: "Workforce Development",
        category: "👥 Workforce & Training",
        query: '"dual diagnosis" workforce (training OR development OR competencies) Australia',
        explanation: "",
      },
      {
        title: "Australian Research",
        category: "Research",
        query: 'site:*.edu.au "dual diagnosis" OR "co-occurring" Australia filetype:pdf',
        explanation: "",
      },
      {
        title: "Prevalence Data",
        category: "Research",
        query:
          '"dual diagnosis" OR "comorbidity" prevalence (mental health AND substance) Australia',
        explanation: "",
      },
      {
        title: "Treatment Outcomes",
        category: "Research",
        query: '"dual diagnosis" treatment (outcomes OR effectiveness) Australia research',
        explanation: "",
      },
      {
        title: "System Navigation",
        category: "Service System",
        query: '"system navigation" mental health AOD OR "alcohol and other drugs"',
        explanation: "",
      },
      {
        title: "Service Integration",
        category: "Service System",
        query: '"service integration" OR "integrated services" mental health AOD Australia',
        explanation: "",
      },
      {
        title: "Referral Pathways",
        category: "Service System",
        query: '"referral pathway" dual diagnosis OR "co-occurring" Australia',
        explanation: "",
      },
    ],
  },
  {
    id: "naloxone",
    title: "Take-Home Naloxone (THN)",
    description:
      "Guidance, training frameworks, implementation resources, and access information for naloxone",
    dorks: [
      {
        title: "Government Programs & Guidelines",
        category: "Basic Queries",
        query: 'site:*.gov.au filetype:pdf ("take-home naloxone" OR THN) (guideline OR program)',
        explanation:
          "**Why this works:**\n\n- Catches both full term and abbreviation\n- PDF filter gets actual program documents\n- Guideline OR program catches different document types",
      },
      {
        title: "State Health Department Resources",
        category: "Basic Queries",
        query: "site:*.health.*.gov.au filetype:pdf naloxone (community OR peer OR training)",
        explanation: "",
      },
      {
        title: "Naloxone Training Materials",
        category: "Basic Queries",
        query: '"naloxone training" filetype:pdf site:*.org.au',
        explanation: "",
      },
      {
        title: "All Naloxone Formulations",
        category: "Intermediate Queries",
        query:
          "site:*.gov.au (naloxone OR narcan OR nyxoid) (program OR guideline OR training) filetype:pdf",
        explanation:
          "**Why this works:**\n\n- Covers brand names and generic\n- Multiple document types captured",
      },
      {
        title: "Pharmacy Supply & Access",
        category: "Intermediate Queries",
        query:
          '"naloxone" (pharmacy OR pharmacist) (supply OR access OR "S3" OR "schedule 3") Australia',
        explanation: "",
      },
      {
        title: "Peer Distribution Programs",
        category: "Intermediate Queries",
        query:
          'site:*.org.au "naloxone" ("peer distribution" OR "peer-led" OR "community distribution") filetype:pdf',
        explanation: "",
      },
      {
        title: "Training Resources from Sector",
        category: "Intermediate Queries",
        query:
          "(site:nuaa.org.au OR site:aivl.org.au OR site:penington.org.au) naloxone training filetype:pdf",
        explanation: "",
      },
      {
        title: "Comprehensive Naloxone Sweep",
        category: "Advanced Queries",
        query:
          'site:*.gov.au filetype:pdf ("take-home naloxone" OR "take home naloxone" OR THN OR "naloxone program") (guideline OR framework OR program OR implementation) after:2023',
        explanation: "",
      },
      {
        title: "Intranasal/Nasal Spray Resources",
        category: "Advanced Queries",
        query:
          '(nyxoid OR "intranasal naloxone" OR "nasal spray" OR "nasal naloxone") (training OR "how to use" OR administration) Australia filetype:pdf',
        explanation: "",
      },
      {
        title: "Rescheduling & Policy Changes",
        category: "Advanced Queries",
        query:
          '"naloxone" ("S3" OR "schedule 3" OR "rescheduling" OR "down-scheduling") Australia policy',
        explanation: "",
      },
      {
        title: "Community Access Models",
        category: "Advanced Queries",
        query:
          '"naloxone" ("vending" OR "free distribution" OR "public access" OR "community naloxone") Australia',
        explanation: "",
      },
      {
        title: "Standing Order Programs",
        category: "Advanced Queries",
        query: 'site:*.gov.au "naloxone" "standing order" OR "standing authority" filetype:pdf',
        explanation: "",
      },
      {
        title: "Train the Trainer",
        category: "Training-Specific Searches",
        query: '"naloxone" "train the trainer" OR "training package" Australia filetype:pdf',
        explanation: "",
      },
      {
        title: "Peer Education Resources",
        category: "Training-Specific Searches",
        query:
          '"naloxone" ("peer education" OR "peer trainer" OR "peer-led training") filetype:pdf',
        explanation: "",
      },
      {
        title: "Clinical Training",
        category: "Training-Specific Searches",
        query:
          'site:*.gov.au "naloxone" "clinical guideline" OR "prescribing" OR "administration" filetype:pdf',
        explanation: "",
      },
      {
        title: "Video/Multimedia Resources",
        category: "Training-Specific Searches",
        query: '"naloxone" "how to use" OR "administration" training video Australia',
        explanation: "",
      },
      {
        title: "Program Evaluations",
        category: "Research & Evaluation",
        query:
          'site:*.edu.au "naloxone" (evaluation OR effectiveness OR outcomes) Australia filetype:pdf',
        explanation: "",
      },
      {
        title: "Cochrane/Systematic Reviews",
        category: "Research & Evaluation",
        query:
          'intitle:"systematic review" OR intitle:"meta-analysis" "take-home naloxone" OR "community naloxone"',
        explanation: "",
      },
      {
        title: "NDARC Research",
        category: "Research & Evaluation",
        query: "site:ndarc.med.unsw.edu.au naloxone filetype:pdf",
        explanation: "",
      },
      {
        title: "Nyxoid (Nasal Spray)",
        category: "Formulation-Specific",
        query: '"nyxoid" (training OR "how to use" OR guide) Australia',
        explanation: "",
      },
      {
        title: "Injectable",
        category: "Formulation-Specific",
        query: '"naloxone" (injectable OR intramuscular OR IM) (training OR guide) Australia',
        explanation: "",
      },
      {
        title: "Comparison of Formulations",
        category: "Formulation-Specific",
        query:
          '"naloxone" (intranasal OR intramuscular OR injectable) comparison OR review filetype:pdf',
        explanation: "",
      },
    ],
  },
  {
    id: "novel-substances",
    title: "Novel Substances, Pharmacology & Toxicology",
    description: "Surveillance of NPS, nitazenes, adulterants, and emerging drug trends.",
    dorks: [
      {
        title: "Government NPS Reports",
        category: "Basic Queries",
        query:
          'site:*.gov.au filetype:pdf ("novel psychoactive" OR NPS) (trend OR surveillance OR "drug market")',
        explanation: "",
      },
      {
        title: "University Research",
        category: "Basic Queries",
        query:
          'site:*.edu.au filetype:pdf ("nitazene" OR "novel benzodiazepine" OR "synthetic opioid") Australia',
        explanation: "",
      },
      {
        title: "General NPS Information",
        category: "Basic Queries",
        query:
          '"novel psychoactive substance" OR NPS (Australia OR NSW OR VIC) (report OR surveillance) filetype:pdf',
        explanation: "",
      },
      {
        title: "Nitazenes & Benzimidazole Opioids",
        category: "Intermediate Queries",
        query:
          '("nitazene" OR "isotonitazene" OR "protonitazene" OR "metonitazene" OR "benzimidazole opioid") Australia filetype:pdf',
        explanation:
          "**Why this matters:** Nitazenes are highly potent synthetic opioids emerging in drug supplies\nglobally.",
      },
      {
        title: "Xylazine & Adulterants",
        category: "Intermediate Queries",
        query:
          '("xylazine" OR "medetomidine" OR "tranq" OR "adulterant") (Australia OR "drug supply") filetype:pdf',
        explanation: "",
      },
      {
        title: "Novel Benzodiazepines",
        category: "Intermediate Queries",
        query:
          '("novel benzodiazepine" OR "designer benzodiazepine" OR flualprazolam OR etizolam) detection Australia',
        explanation: "",
      },
      {
        title: "Synthetic Cannabinoids",
        category: "Intermediate Queries",
        query:
          '("synthetic cannabinoid" OR "synthetic cannabis" OR "SCRA") Australia (detection OR toxicology OR emergency)',
        explanation: "",
      },
      {
        title: "Comprehensive NPS Surveillance",
        category: "Advanced Queries",
        query:
          'site:*.gov.au OR site:*.edu.au filetype:pdf ("novel psychoactive" OR NPS OR "emerging substance" OR "new psychoactive") (surveillance OR monitoring OR trend OR detection) Australia after:2022',
        explanation: "",
      },
      {
        title: "Fentanyl & Analogues",
        category: "Advanced Queries",
        query:
          '("fentanyl" OR "fentanyl analogue" OR "carfentanil" OR "acetylfentanyl") Australia (detection OR alert OR death OR toxicology)',
        explanation: "",
      },
      {
        title: "Reagent Testing Limitations for NPS",
        category: "Advanced Queries",
        query:
          '"reagent testing" (accuracy OR limitations OR "false positive" OR "false negative") ("novel psychoactive" OR NPS)',
        explanation: "",
      },
      {
        title: "Drug Checking Results for NPS",
        category: "Advanced Queries",
        query:
          '"drug checking" ("novel substance" OR "unexpected" OR NPS) (results OR detected) Australia',
        explanation: "",
      },
      {
        title: "Forensic Detection Methods",
        category: "Advanced Queries",
        query:
          '(detection OR identification OR analysis) ("novel psychoactive" OR NPS OR nitazene) (method OR technique OR "mass spectrometry") filetype:pdf',
        explanation: "",
      },
      {
        title: "Nitazenes (High Priority)",
        category: "🧪 Substance-Specific Searches",
        query:
          '"isotonitazene" OR "protonitazene" (detection OR death OR toxicology OR case) Australia',
        explanation: "",
      },
      {
        title: 'Xylazine ("Tranq")',
        category: "🧪 Substance-Specific Searches",
        query:
          '"xylazine" (Australia OR "drug supply" OR "opioid") (contamination OR adulterant OR detection)',
        explanation: "",
      },
      {
        title: "Novel Stimulants",
        category: "🧪 Substance-Specific Searches",
        query:
          '("synthetic cathinone" OR "bath salts" OR "novel stimulant" OR eutylone OR "N-ethylpentylone") Australia',
        explanation: "",
      },
      {
        title: "Ketamine Analogues",
        category: "🧪 Substance-Specific Searches",
        query:
          '("ketamine analogue" OR "deschloroketamine" OR "2-FDCK") Australia (detection OR emergence)',
        explanation: "",
      },
      {
        title: "GHB/GBL",
        category: "🧪 Substance-Specific Searches",
        query:
          '(GHB OR GBL OR "gamma-hydroxybutyrate" OR "fantasy") Australia (harm reduction OR overdose OR detection)',
        explanation: "",
      },
      {
        title: "IDRS (Illicit Drug Reporting System)",
        category: "Surveillance & Monitoring",
        query: '"Illicit Drug Reporting System" OR IDRS (novel OR emerging OR trend) filetype:pdf',
        explanation: "",
      },
      {
        title: "EDRS (Ecstasy & Related Drugs)",
        category: "Surveillance & Monitoring",
        query: '"Ecstasy and Related Drugs Reporting System" OR EDRS filetype:pdf',
        explanation: "",
      },
      {
        title: "Drug Trends Reports",
        category: "Surveillance & Monitoring",
        query: 'site:ndarc.med.unsw.edu.au "drug trends" OR "market" filetype:pdf',
        explanation: "",
      },
      {
        title: "Wastewater Analysis",
        category: "Surveillance & Monitoring",
        query: '"wastewater analysis" OR "wastewater epidemiology" (drug OR substance) Australia',
        explanation: "",
      },
      {
        title: "Emergency Department Presentations",
        category: "🏥 Clinical & Toxicology",
        query:
          '("emergency department" OR ED) ("novel psychoactive" OR NPS OR "synthetic") (presentation OR poisoning OR overdose) Australia',
        explanation: "",
      },
      {
        title: "Toxicology Case Reports",
        category: "🏥 Clinical & Toxicology",
        query:
          '(case OR case report) (toxicology OR poisoning) ("novel psychoactive" OR NPS OR nitazene) Australia',
        explanation: "",
      },
      {
        title: "Treatment Guidelines for NPS",
        category: "🏥 Clinical & Toxicology",
        query:
          'site:*.gov.au ("novel psychoactive" OR NPS) (treatment OR management OR "clinical guideline") filetype:pdf',
        explanation: "",
      },
      {
        title: "EMCDDA (European)",
        category: "International Surveillance",
        query:
          'site:emcdda.europa.eu ("novel psychoactive" OR NPS OR "early warning") filetype:pdf',
        explanation: "",
      },
      {
        title: "UK Surveillance",
        category: "International Surveillance",
        query: 'site:*.gov.uk ("novel psychoactive" OR NPS) (surveillance OR monitoring OR trend)',
        explanation: "",
      },
      {
        title: "UNODC",
        category: "International Surveillance",
        query: 'site:unodc.org "novel psychoactive" OR NPS (report OR surveillance)',
        explanation: "",
      },
      {
        title: "Receptor Pharmacology",
        category: "⚗️ Pharmacology & Toxicology Research",
        query:
          '(nitazene OR "synthetic opioid") (pharmacology OR "receptor binding" OR potency) filetype:pdf',
        explanation: "",
      },
      {
        title: "Metabolism & Detection Windows",
        category: "⚗️ Pharmacology & Toxicology Research",
        query:
          '("novel psychoactive" OR NPS) (metabolism OR "detection window" OR metabolite) filetype:pdf',
        explanation: "",
      },
      {
        title: "Comparative Potency",
        category: "⚗️ Pharmacology & Toxicology Research",
        query: '(nitazene OR fentanyl) potency comparison OR "relative potency" filetype:pdf',
        explanation: "",
      },
    ],
  },
  {
    id: "nsp",
    title: "Needle & Syringe Programs (NSP)",
    description:
      "Service models, evaluations, policies, directories, and operational guidelines for NSP.",
    dorks: [
      {
        title: "Government NSP Policies",
        category: "Basic Queries",
        query:
          'site:*.health.*.gov.au filetype:pdf ("needle syringe program" OR NSP) (guideline OR policy OR protocol)',
        explanation:
          "**Why this works:**\n\n- State health departments host NSP policies\n- PDF filter gets operational documents\n- Multiple document type terms captured",
      },
      {
        title: "NSP Service Directories",
        category: "Basic Queries",
        query:
          'filetype:xlsx OR filetype:pdf (NSP OR "needle syringe") ("service list" OR directory) site:*.gov.au',
        explanation: "",
      },
      {
        title: "Sector Organisation Resources",
        category: "Basic Queries",
        query:
          'site:*.org.au filetype:pdf ("needle syringe program" OR NSP) (evaluation OR outcomes OR access)',
        explanation: "",
      },
      {
        title: "NSP Evaluations & Evidence",
        category: "Intermediate Queries",
        query:
          'site:*.edu.au filetype:pdf "needle syringe program" (evaluation OR effectiveness OR "cost-effectiveness")',
        explanation: "",
      },
      {
        title: "Peer-Based NSP Resources",
        category: "Intermediate Queries",
        query: 'site:*.org.au "peer-based" OR "peer-led" ("needle syringe" OR NSP) filetype:pdf',
        explanation: "",
      },
      {
        title: "Equipment & Supply Guidelines",
        category: "Intermediate Queries",
        query:
          'site:*.gov.au "injecting equipment" (guideline OR policy OR "safe disposal") filetype:pdf',
        explanation: "",
      },
      {
        title: "Pharmacy-Based NSP",
        category: "Intermediate Queries",
        query:
          '"pharmacy" ("needle syringe" OR NSP OR "injecting equipment") Australia (program OR scheme)',
        explanation: "",
      },
      {
        title: "Comprehensive NSP Document Sweep",
        category: "Advanced Queries",
        query:
          'site:*.gov.au filetype:pdf ("needle syringe program" OR "needle exchange" OR "syringe service" OR NSP) (guideline OR policy OR framework OR manual) after:2020',
        explanation: "",
      },
      {
        title: "NSP Location/Access Information",
        category: "Advanced Queries",
        query:
          '"needle syringe program" location OR address OR "opening hours" [YOUR STATE] -site:facebook.com -site:twitter.com',
        explanation: "",
      },
      {
        title: "Mobile/Outreach NSP",
        category: "Advanced Queries",
        query:
          '("mobile NSP" OR "mobile needle" OR "outreach NSP" OR "van" OR "bus") ("needle syringe" OR "injecting equipment") Australia',
        explanation: "",
      },
      {
        title: "Vending Machine Programs",
        category: "Advanced Queries",
        query:
          '"vending machine" OR "dispensing machine" ("needle" OR "syringe" OR "injecting equipment") Australia',
        explanation: "",
      },
      {
        title: "Secondary Distribution",
        category: "Advanced Queries",
        query:
          '"secondary distribution" OR "peer distribution" ("needle syringe" OR "injecting equipment") Australia filetype:pdf',
        explanation: "",
      },
      {
        title: "Staff Training Resources",
        category: "NSP Workforce & Training",
        query:
          '"NSP" OR "needle syringe" (training OR induction OR "capacity building") Australia filetype:pdf',
        explanation: "",
      },
      {
        title: "Peer Worker NSP Training",
        category: "NSP Workforce & Training",
        query: '"peer worker" ("needle syringe" OR NSP) training filetype:pdf -jobs',
        explanation: "",
      },
      {
        title: "Clinical Considerations",
        category: "NSP Workforce & Training",
        query: '"injecting" (vein care OR "safer injecting" OR technique) training filetype:pdf',
        explanation: "",
      },
      {
        title: "AIHW Data",
        category: "NSP Data & Statistics",
        query: 'site:aihw.gov.au "needle syringe program" OR NSP statistics',
        explanation: "",
      },
      {
        title: "Distribution Data",
        category: "NSP Data & Statistics",
        query:
          '"needle syringe" ("distribution data" OR "equipment distribution" OR statistics) Australia',
        explanation: "",
      },
      {
        title: "BBV Data Related to NSP",
        category: "NSP Data & Statistics",
        query:
          'site:aihw.gov.au ("hepatitis C" OR HCV OR "blood borne virus") "injecting drug use"',
        explanation: "",
      },
      {
        title: "NDARC Research",
        category: "Research & Evidence",
        query:
          'site:ndarc.med.unsw.edu.au "needle syringe" OR NSP OR "injecting drug use" filetype:pdf',
        explanation: "",
      },
      {
        title: "Kirby Institute (BBV Research)",
        category: "Research & Evidence",
        query: 'site:kirby.unsw.edu.au "injecting drug use" OR "needle syringe"',
        explanation: "",
      },
      {
        title: "Systematic Reviews",
        category: "Research & Evidence",
        query:
          'intitle:"systematic review" "needle syringe program" OR "needle exchange" effectiveness',
        explanation: "",
      },
      {
        title: "Cost-Effectiveness Studies",
        category: "Research & Evidence",
        query:
          '"needle syringe program" ("cost-effectiveness" OR "cost-benefit" OR "economic evaluation") filetype:pdf',
        explanation: "",
      },
      {
        title: "Fitpack/Equipment Standards",
        category: "🏥 Equipment & Consumables",
        query:
          '"fitpack" OR "injecting equipment" (contents OR standards OR "what\'s included") Australia',
        explanation: "",
      },
      {
        title: "Safe Disposal",
        category: "🏥 Equipment & Consumables",
        query:
          '"safe disposal" OR "sharps disposal" ("needle" OR "syringe") (guideline OR information) Australia',
        explanation: "",
      },
      {
        title: "Specialised Equipment",
        category: "🏥 Equipment & Consumables",
        query:
          '"low dead space" OR "detachable needle" OR "butterfly" OR "insulin syringe" NSP Australia',
        explanation: "",
      },
    ],
  },
  {
    id: "oat-ost",
    title: "Opioid Agonist Treatment (OAT/OST)",
    description:
      "Guidelines, clinical tools, access policies, and research for opioid pharmacotherapy.",
    dorks: [
      {
        title: "Government Treatment Guidelines",
        category: "Basic Queries",
        query:
          'site:*.health.*.gov.au filetype:pdf ("opioid agonist" OR "opioid treatment program") (guideline OR policy OR protocol)',
        explanation: "",
      },
      {
        title: "Methadone-Specific",
        category: "Basic Queries",
        query: "site:*.gov.au filetype:pdf methadone (guideline OR program OR prescribing)",
        explanation: "",
      },
      {
        title: "Buprenorphine-Specific",
        category: "Basic Queries",
        query:
          "site:*.gov.au filetype:pdf (buprenorphine OR suboxone) (guideline OR program OR prescribing)",
        explanation: "",
      },
      {
        title: "State-Specific OAT Policies",
        category: "Intermediate Queries",
        query:
          'site:*.gov.au filetype:pdf ("opioid treatment" OR "pharmacotherapy") (NSW OR VIC OR QLD OR WA OR SA OR TAS OR ACT OR NT)',
        explanation: "",
      },
      {
        title: "Prescriber Resources",
        category: "Intermediate Queries",
        query:
          'site:*.gov.au "authorised prescriber" OR "prescriber training" (methadone OR buprenorphine OR opioid) filetype:pdf',
        explanation: "",
      },
      {
        title: "Clinic Directories",
        category: "Intermediate Queries",
        query: '"opioid treatment" clinic OR service directory [YOUR STATE] site:*.gov.au',
        explanation: "",
      },
      {
        title: "Dosing Guidelines",
        category: "Intermediate Queries",
        query:
          'site:*.gov.au filetype:pdf (methadone OR buprenorphine) (dosing OR induction OR "dose adjustment")',
        explanation: "",
      },
      {
        title: "Comprehensive OAT Document Sweep",
        category: "Advanced Queries",
        query:
          'site:*.gov.au filetype:pdf (OAT OR OST OR "opioid agonist" OR "opioid substitution" OR methadone OR buprenorphine OR "pharmacotherapy") (guideline OR policy OR framework OR protocol) after:2020',
        explanation: "",
      },
      {
        title: "Long-Acting Injectable Buprenorphine",
        category: "Advanced Queries",
        query:
          '("long-acting" OR "extended-release" OR "depot" OR "monthly") buprenorphine (sublocade OR buvidal) Australia',
        explanation: "",
      },
      {
        title: "Take-Away/Takeaway Doses",
        category: "Advanced Queries",
        query:
          'site:*.gov.au ("take-away" OR "takeaway" OR "unsupervised") (dose OR dosing) (methadone OR buprenorphine) filetype:pdf',
        explanation: "",
      },
      {
        title: "Pregnancy & OAT",
        category: "Advanced Queries",
        query:
          'site:*.gov.au (pregnancy OR pregnant OR antenatal OR perinatal) (methadone OR buprenorphine OR "opioid treatment") guideline filetype:pdf',
        explanation: "",
      },
      {
        title: "Pain Management & OAT",
        category: "Advanced Queries",
        query:
          'site:*.gov.au ("chronic pain" OR "pain management") (methadone OR buprenorphine OR OAT) guideline filetype:pdf',
        explanation: "",
      },
      {
        title: "Prescriber Training",
        category: "Training & Workforce",
        query:
          '"opioid treatment" OR "pharmacotherapy" (prescriber OR "medical practitioner") training Australia',
        explanation: "",
      },
      {
        title: "Nursing in OAT",
        category: "Training & Workforce",
        query:
          '(nurse OR nursing) "opioid treatment" OR "pharmacotherapy" (role OR training OR guideline) Australia filetype:pdf',
        explanation: "",
      },
      {
        title: "Pharmacy Dispensing",
        category: "Training & Workforce",
        query:
          "(pharmacy OR pharmacist) (methadone OR buprenorphine) (dispensing OR protocol OR guideline) Australia",
        explanation: "",
      },
      {
        title: "Australian Research",
        category: "Research & Evidence",
        query:
          "site:ndarc.med.unsw.edu.au OR site:turning-point.org.au (methadone OR buprenorphine OR OAT) filetype:pdf",
        explanation: "",
      },
      {
        title: "Effectiveness Research",
        category: "Research & Evidence",
        query:
          'site:*.edu.au ("opioid agonist therapy" OR methadone OR buprenorphine) (effectiveness OR outcomes OR retention) filetype:pdf',
        explanation: "",
      },
      {
        title: "Systematic Reviews",
        category: "Research & Evidence",
        query:
          'intitle:"systematic review" ("opioid agonist" OR methadone OR buprenorphine) effectiveness',
        explanation: "",
      },
      {
        title: "Drug Interactions",
        category: "🏥 Clinical Considerations",
        query:
          '(methadone OR buprenorphine) "drug interaction" OR interaction (guideline OR warning) filetype:pdf',
        explanation: "",
      },
      {
        title: "Withdrawal Management",
        category: "🏥 Clinical Considerations",
        query:
          'site:*.gov.au "opioid withdrawal" (methadone OR buprenorphine) (induction OR management) filetype:pdf',
        explanation: "",
      },
      {
        title: "Diversion & Safety",
        category: "🏥 Clinical Considerations",
        query:
          'site:*.gov.au (methadone OR buprenorphine) (diversion OR "safe storage" OR supervision) policy filetype:pdf',
        explanation: "",
      },
    ],
  },
  {
    id: "peer-knowledge",
    title: "Peer Knowledge, Publications & Storytelling",
    description: "Finding peer voices, lived experience narratives, and peer-produced knowledge.",
    dorks: [
      {
        title: "Peer Newsletters & Magazines",
        category: "Basic Queries",
        query:
          'site:nuaa.org.au "User\'s News" filetype:pdf\nsite:aivl.org.au "The Advocate" OR newsletter filetype:pdf',
        explanation: "",
      },
      {
        title: "Peer Organisation Publications",
        category: "Basic Queries",
        query: 'site:*.org.au ("by peers" OR "peer written" OR "peer voices") filetype:pdf',
        explanation: "",
      },
      {
        title: "General Peer Newsletters",
        category: "Basic Queries",
        query: '"peer newsletter" OR "peer magazine" harm reduction Australia filetype:pdf',
        explanation: "",
      },
      {
        title: "Lived Experience Narratives",
        category: "Intermediate Queries",
        query:
          '"lived experience" (story OR narrative OR testimony) drug use Australia filetype:pdf',
        explanation: "",
      },
      {
        title: "First-Person Accounts",
        category: "Intermediate Queries",
        query: '"first person" OR "personal account" drug use harm reduction',
        explanation: "",
      },
      {
        title: "Peer Stories in Resources",
        category: "Intermediate Queries",
        query:
          'site:*.org.au ("in their own words" OR "peer perspectives" OR "peer stories") filetype:pdf',
        explanation: "",
      },
      {
        title: "Digital Storytelling",
        category: "Intermediate Queries",
        query: '"photovoice" OR "digital storytelling" "people who use drugs" OR "drug use"',
        explanation: "",
      },
      {
        title: "Comprehensive Peer Knowledge Sweep",
        category: "Advanced Queries",
        query:
          "(site:nuaa.org.au OR site:aivl.org.au OR site:hrvic.org.au OR site:quihn.org OR site:wasua.com.au) filetype:pdf after:2020",
        explanation: "",
      },
      {
        title: "Peer-Developed Resources",
        category: "Advanced Queries",
        query:
          'site:*.org.au ("peer-developed" OR "peer-produced" OR "peer-created") (materials OR resources OR tools) drug use filetype:pdf',
        explanation: "",
      },
      {
        title: "Peer Wisdom & Expertise",
        category: "Advanced Queries",
        query:
          '"peer expertise" OR "experiential knowledge" OR "peer wisdom" drug use filetype:pdf',
        explanation: "",
      },
      {
        title: "Peer Representation Guidelines",
        category: "Advanced Queries",
        query: '"peer representative" (guidelines OR support OR training) filetype:pdf',
        explanation: "",
      },
      {
        title: "User's News (NUAA)",
        category: "📰 Peer Publications",
        query: 'site:nuaa.org.au "User\'s News" filetype:pdf\n"User\'s News" NUAA [TOPIC]',
        explanation: "",
      },
      {
        title: "AIVL Publications",
        category: "📰 Peer Publications",
        query: "site:aivl.org.au filetype:pdf",
        explanation: "",
      },
      {
        title: "HRVic Publications",
        category: "📰 Peer Publications",
        query: "site:hrvic.org.au filetype:pdf",
        explanation: "",
      },
      {
        title: "State Organisation Publications",
        category: "📰 Peer Publications",
        query: "(site:quihn.org OR site:wasua.com.au) filetype:pdf",
        explanation: "",
      },
      {
        title: "Finding Specific Issues",
        category: "📰 Peer Publications",
        query: '"User\'s News" [TOPIC] filetype:pdf\n"peer newsletter" [TOPIC] Australia',
        explanation: "",
      },
      {
        title: "Lived Experience Stories",
        category: "📖 Narratives & Storytelling",
        query:
          '"lived experience" (story OR narrative) "drug use" OR "drug user" Australia filetype:pdf',
        explanation: "",
      },
      {
        title: "Peer Testimonies",
        category: "📖 Narratives & Storytelling",
        query:
          '"peer stories" OR "peer testimonies" OR "peer voices" drug policy OR harm reduction',
        explanation: "",
      },
      {
        title: "Oral Histories",
        category: "📖 Narratives & Storytelling",
        query:
          '"oral history" OR "oral histories" ("drug use" OR "harm reduction" OR "drug user movement") Australia',
        explanation: "",
      },
      {
        title: "Creative Expression",
        category: "📖 Narratives & Storytelling",
        query: '(poetry OR art OR creative) "lived experience" drug use harm reduction',
        explanation: "",
      },
      {
        title: "Factsheets by Peers",
        category: "📚 Peer-Led Resources",
        query:
          'site:nuaa.org.au OR site:aivl.org.au (factsheet OR "fact sheet" OR guide) filetype:pdf',
        explanation: "",
      },
      {
        title: "Peer Education Materials",
        category: "📚 Peer-Led Resources",
        query:
          '"peer education" resources harm reduction Australia filetype:pdf\n"by peers for peers" harm reduction',
        explanation: "",
      },
      {
        title: "Peer-Developed Campaigns",
        category: "📚 Peer-Led Resources",
        query: 'site:*.org.au "peer-led" (campaign OR resource OR toolkit) filetype:pdf',
        explanation: "",
      },
      {
        title: "Peer Submissions",
        category: "🗣️ Peer Voice in Policy",
        query:
          '(site:aivl.org.au OR site:nuaa.org.au) submission filetype:pdf\n"peer organisation" submission (inquiry OR consultation) drug',
        explanation: "",
      },
      {
        title: "Lived Experience in Advisory",
        category: "🗣️ Peer Voice in Policy",
        query: '"lived experience" (advisory OR "reference group" OR committee) drug policy',
        explanation: "",
      },
      {
        title: "Meaningful Participation",
        category: "🗣️ Peer Voice in Policy",
        query:
          '"meaningful participation" OR "authentic engagement" "people who use drugs" (policy OR research)',
        explanation: "",
      },
      {
        title: "Avoiding Tokenism",
        category: "🗣️ Peer Voice in Policy",
        query: '"tokenism" (drug user OR peer) involvement (address OR avoid OR prevent)',
        explanation: "",
      },
      {
        title: "Peer Campaigns",
        category: "📢 Peer Advocacy",
        query: 'site:*.org.au "peer-led" (advocacy OR campaign) drug policy filetype:pdf',
        explanation: "",
      },
      {
        title: '"Nothing About Us Without Us"',
        category: "📢 Peer Advocacy",
        query: '"nothing about us without us" drug policy OR harm reduction filetype:pdf',
        explanation: "",
      },
      {
        title: "Peer Advocacy History",
        category: "📢 Peer Advocacy",
        query:
          '"drug user movement" OR "drug user organising" Australia history\n(NUAA OR AIVL) history OR "early days" OR founding',
        explanation: "",
      },
      {
        title: "Peer-Led Research",
        category: "Peer Research",
        query:
          '"peer-led research" OR "peer researcher" (drug use OR harm reduction) Australia filetype:pdf',
        explanation: "",
      },
      {
        title: "Participatory Research",
        category: "Peer Research",
        query:
          '"participatory action research" OR "community-based participatory research" drug use filetype:pdf',
        explanation: "",
      },
      {
        title: "Co-Design",
        category: "Peer Research",
        query: '"co-design" OR "co-production" "people who use drugs" OR peer filetype:pdf',
        explanation: "",
      },
      {
        title: "INPUD",
        category: "International Peer Content",
        query:
          'site:inpud.net filetype:pdf\n"International Network of People Who Use Drugs" resources',
        explanation: "",
      },
      {
        title: "European Networks",
        category: "International Peer Content",
        query: '"European Network of People Who Use Drugs" (EuroNPUD OR ENPUD)',
        explanation: "",
      },
      {
        title: "Canadian Peer Orgs",
        category: "International Peer Content",
        query:
          '"Canadian Association of People Who Use Drugs" (CAPUD)\nsite:vandu.org OR site:capud.ca filetype:pdf',
        explanation: "",
      },
      {
        title: "Archive.org for Historical Content",
        category: "💡 Finding Unindexed Peer Content",
        query: "site:web.archive.org (nuaa.org.au OR aivl.org.au)",
        explanation: "",
      },
      {
        title: "Historical Peer Publications",
        category: "💡 Finding Unindexed Peer Content",
        query: '"User\'s News" 1990..2010\n"peer newsletter" harm reduction Australia 1990..2015',
        explanation: "",
      },
    ],
  },
  {
    id: "peer-workforce",
    title: "Peer Workforce, Lived Experience & Training",
    description:
      "Supervision, competencies, frameworks, training, and peer-led practice resources.",
    dorks: [
      {
        title: "Peer Workforce Development",
        category: "Basic Queries",
        query:
          '("peer worker" OR "peer support" OR "lived experience") (supervision OR framework OR competencies) filetype:pdf site:*.org.au',
        explanation: "",
      },
      {
        title: "Peer Worker Training",
        category: "Basic Queries",
        query: '"peer worker" "training manual" OR "training package" filetype:pdf',
        explanation: "",
      },
      {
        title: "Lived Experience Workforce Frameworks",
        category: "Basic Queries",
        query:
          '("lived experience" AROUND(6) workforce) (guideline OR framework OR standard) filetype:pdf Australia',
        explanation: "",
      },
      {
        title: "Peer Supervision Models",
        category: "Intermediate Queries",
        query: '"peer supervision" (model OR framework OR guidelines) AOD filetype:pdf',
        explanation: "",
      },
      {
        title: "Competency Frameworks",
        category: "Intermediate Queries",
        query: '"peer worker" (competencies OR standards OR qualification) Australia filetype:pdf',
        explanation: "",
      },
      {
        title: "Peer-Led Research",
        category: "Intermediate Queries",
        query:
          '"peer-led research" OR "participatory action research" drug use Australia filetype:pdf',
        explanation: "",
      },
      {
        title: "Peer Organisation Resources",
        category: "Intermediate Queries",
        query:
          "(site:nuaa.org.au OR site:aivl.org.au OR site:hrvic.org.au OR site:quihn.org) filetype:pdf",
        explanation: "",
      },
      {
        title: "Comprehensive Peer Workforce Sweep",
        category: "Advanced Queries",
        query:
          '("peer worker" OR "peer support worker" OR "lived experience worker" OR "consumer consultant") (supervision OR training OR competencies OR framework OR "professional development") filetype:pdf (Australia OR NSW OR VIC OR QLD) -jobs -careers after:2020',
        explanation: "",
      },
      {
        title: "Reflective Practice & Supervision",
        category: "Advanced Queries",
        query:
          '("reflective practice" AROUND(5) supervision) (AOD OR "alcohol and other drugs") filetype:pdf',
        explanation: "",
      },
      {
        title: "Peer Wellbeing & Self-Care",
        category: "Advanced Queries",
        query:
          '("vicarious trauma" OR "self-care" OR wellbeing) "peer worker" harm reduction filetype:pdf',
        explanation: "",
      },
      {
        title: "Pay Equity & Conditions",
        category: "Advanced Queries",
        query: '"peer worker" (remuneration OR "pay equity" OR conditions OR "award") filetype:pdf',
        explanation: "",
      },
      {
        title: "Career Pathways",
        category: "Advanced Queries",
        query:
          '"peer workforce" ("career pathway" OR "professional development" OR progression) filetype:pdf',
        explanation: "",
      },
      {
        title: "Training Packages",
        category: "Training-Specific Searches",
        query: '"peer worker" training (package OR curriculum OR module) AOD filetype:pdf',
        explanation: "",
      },
      {
        title: "Train the Trainer",
        category: "Training-Specific Searches",
        query: '"peer" "train the trainer" (harm reduction OR AOD) filetype:pdf',
        explanation: "",
      },
      {
        title: "Induction Resources",
        category: "Training-Specific Searches",
        query: '"peer worker" (induction OR orientation OR onboarding) filetype:pdf',
        explanation: "",
      },
      {
        title: "Supervision Training",
        category: "Training-Specific Searches",
        query: '(supervising OR supervision) "peer worker" training filetype:pdf',
        explanation: "",
      },
      {
        title: "National/State Frameworks",
        category: "📋 Frameworks & Standards",
        query:
          '"lived experience workforce" (strategy OR framework OR policy) Australia filetype:pdf',
        explanation: "",
      },
      {
        title: "Competency Standards",
        category: "📋 Frameworks & Standards",
        query:
          '"peer worker" ("competency framework" OR "capability framework" OR "practice standards") filetype:pdf',
        explanation: "",
      },
      {
        title: "Role Descriptions",
        category: "📋 Frameworks & Standards",
        query:
          '"peer worker" OR "peer support worker" ("role description" OR "position description" OR "job description") AOD filetype:pdf',
        explanation: "",
      },
      {
        title: "Group Supervision",
        category: "🧠 Supervision & Support",
        query: '"group supervision" "peer worker" harm reduction filetype:pdf',
        explanation: "",
      },
      {
        title: "External Supervision",
        category: "🧠 Supervision & Support",
        query: '"external supervision" "peer worker" OR "lived experience" filetype:pdf',
        explanation: "",
      },
      {
        title: "Debriefing",
        category: "🧠 Supervision & Support",
        query: '(debriefing OR "critical incident") "peer worker" support filetype:pdf',
        explanation: "",
      },
      {
        title: "Peer Advocacy Resources",
        category: '✊ Advocacy & "Nothing About Us Without Us"',
        query: '"nothing about us without us" drug policy Australia filetype:pdf',
        explanation: "",
      },
      {
        title: "Lived Experience Representation",
        category: '✊ Advocacy & "Nothing About Us Without Us"',
        query: '"lived experience" representation (committee OR advisory OR consultation) drug',
        explanation: "",
      },
      {
        title: "Peer Voice in Policy",
        category: '✊ Advocacy & "Nothing About Us Without Us"',
        query: '"peer advocate" OR "peer advocacy" drug policy reform filetype:pdf',
        explanation: "",
      },
      {
        title: "Meaningful Participation",
        category: '✊ Advocacy & "Nothing About Us Without Us"',
        query:
          '"meaningful participation" OR "authentic engagement" "people who use drugs" policy filetype:pdf',
        explanation: "",
      },
      {
        title: "Peer-Led Service Models",
        category: "🏢 Service Models",
        query: '"peer-led" (service OR program OR initiative) harm reduction filetype:pdf',
        explanation: "",
      },
      {
        title: "Peer Navigation",
        category: "🏢 Service Models",
        query:
          '"peer navigation" OR "peer navigator" (drug OR AOD OR "harm reduction") filetype:pdf',
        explanation: "",
      },
      {
        title: "Peer Outreach",
        category: "🏢 Service Models",
        query: '"peer outreach" (drug OR "harm reduction" OR "needle syringe") filetype:pdf',
        explanation: "",
      },
      {
        title: "Peer Distribution Programs",
        category: "🏢 Service Models",
        query: '"peer distribution" (naloxone OR "needle syringe" OR NSP) Australia filetype:pdf',
        explanation: "",
      },
      {
        title: "Effectiveness of Peer Work",
        category: "Research on Peer Work",
        query:
          '"peer support" OR "peer worker" (effectiveness OR outcomes OR evaluation) "harm reduction" filetype:pdf',
        explanation: "",
      },
      {
        title: "Peer Work Evidence Base",
        category: "Research on Peer Work",
        query:
          'site:*.edu.au "peer worker" OR "peer support" (evidence OR research OR evaluation) AOD filetype:pdf',
        explanation: "",
      },
      {
        title: "Co-Design & Participatory Research",
        category: "Research on Peer Work",
        query: '"co-design" OR "co-production" ("people who use drugs" OR peer) filetype:pdf',
        explanation: "",
      },
      {
        title: "Vicarious Trauma",
        category: "💚 Wellbeing & Self-Care",
        query:
          '"vicarious trauma" OR "secondary trauma" "peer worker" (prevention OR support OR management)',
        explanation: "",
      },
      {
        title: "Self-Care Resources",
        category: "💚 Wellbeing & Self-Care",
        query:
          '"self-care" "peer worker" (drug OR AOD OR "harm reduction") (resource OR guide OR toolkit) filetype:pdf',
        explanation: "",
      },
      {
        title: "Burnout Prevention",
        category: "💚 Wellbeing & Self-Care",
        query:
          'burnout "peer worker" OR "lived experience worker" (prevention OR support) filetype:pdf',
        explanation: "",
      },
    ],
  },
  {
    id: "policy-advocacy",
    title: "Policy, Inquiries & Advocacy",
    description: "Parliamentary submissions, inquiries, policy directives, and advocacy resources.",
    dorks: [
      {
        title: "Commonwealth Government Policy",
        category: "Basic Queries",
        query: 'site:health.gov.au filetype:pdf "national drug strategy"',
        explanation: "",
      },
      {
        title: "Parliamentary Inquiries",
        category: "Basic Queries",
        query:
          'site:aph.gov.au (committee OR committees) (drug OR "alcohol and other drugs") (inquiry OR submissions)',
        explanation: "",
      },
      {
        title: "AIHW Policy Analysis",
        category: "Basic Queries",
        query: 'site:aihw.gov.au "alcohol and other drugs" policy',
        explanation: "",
      },
      {
        title: "State Parliamentary Inquiries",
        category: "Intermediate Queries",
        query:
          'site:parliament.nsw.gov.au "special commission of inquiry" drugs\nsite:parliament.*.gov.au ("drug law reform" OR "decriminalisation" OR "inquiry")',
        explanation: "",
      },
      {
        title: "Current Consultations",
        category: "Intermediate Queries",
        query:
          '"public consultation" "harm reduction" "closing date" 2025..2026\n"call for submissions" AOD policy 2025..2026',
        explanation: "",
      },
      {
        title: "Draft Policies",
        category: "Intermediate Queries",
        query: 'site:*.gov.au "draft" ("harm reduction" OR "drug policy") filetype:pdf',
        explanation: "",
      },
      {
        title: "Policy Briefs",
        category: "Intermediate Queries",
        query:
          '"policy brief" ("drug checking" OR "pill testing" OR "harm reduction") Australia filetype:pdf',
        explanation: "",
      },
      {
        title: "Comprehensive Policy Document Sweep",
        category: "Advanced Queries",
        query:
          'site:*.gov.au filetype:pdf ("drug policy" OR "drug strategy" OR "harm reduction" OR "alcohol and other drugs") (policy OR strategy OR framework OR "action plan") after:2022',
        explanation: "",
      },
      {
        title: "Parliamentary Submissions (All States)",
        category: "Advanced Queries",
        query:
          'site:*.gov.au inurl:submissions ("drug policy" OR "harm reduction" OR "drug law reform") filetype:pdf',
        explanation: "",
      },
      {
        title: "Decriminalisation/Reform Documents",
        category: "Advanced Queries",
        query:
          '("decriminalisation" OR "decriminalization" OR "depenalisation" OR "drug law reform") Australia (analysis OR evaluation OR model) filetype:pdf',
        explanation: "",
      },
      {
        title: "International Comparisons",
        category: "Advanced Queries",
        query:
          '"drug policy" "international comparison" Australia filetype:pdf\n"harm reduction" policy (Portugal OR Canada OR Switzerland) comparison Australia',
        explanation: "",
      },
      {
        title: "Commonwealth Parliament",
        category: "Parliamentary Sources",
        query:
          'site:aph.gov.au/parliamentary_business/committees "drug policy"\nsite:aph.gov.au "inquiry" ("illicit drugs" OR "harm reduction" OR "drug policy")',
        explanation: "",
      },
      {
        title: "Finding Submissions",
        category: "Parliamentary Sources",
        query: 'site:aph.gov.au "submission" "harm reduction" OR "drug policy" filetype:pdf',
        explanation: "",
      },
      {
        title: "Hansard (Parliamentary Debate)",
        category: "Parliamentary Sources",
        query:
          'site:aph.gov.au OR site:parliament.*.gov.au "hansard" ("harm reduction" OR "drug policy")',
        explanation: "",
      },
      {
        title: "National Drug Strategy",
        category: "📋 Strategy & Framework Documents",
        query:
          'site:health.gov.au "National Drug Strategy" filetype:pdf\n"National Drug Strategy" 2017..2026 Australia',
        explanation: "",
      },
      {
        title: "State Strategies",
        category: "📋 Strategy & Framework Documents",
        query:
          'site:*.gov.au ("drug strategy" OR "AOD strategy" OR "alcohol and other drugs strategy") [STATE] filetype:pdf',
        explanation: "",
      },
      {
        title: "Action Plans",
        category: "📋 Strategy & Framework Documents",
        query:
          'site:*.gov.au "action plan" ("harm reduction" OR "alcohol and other drugs") filetype:pdf',
        explanation: "",
      },
      {
        title: "Peak Body Positions",
        category: "✊ Advocacy Resources",
        query:
          "(site:atoda.org.au OR site:nada.org.au OR site:vaada.org.au) (position OR statement OR submission) filetype:pdf",
        explanation: "",
      },
      {
        title: "Drug User Organisation Advocacy",
        category: "✊ Advocacy Resources",
        query:
          "(site:aivl.org.au OR site:nuaa.org.au) (submission OR advocacy OR position) filetype:pdf",
        explanation: "",
      },
      {
        title: "Reform Campaigns",
        category: "✊ Advocacy Resources",
        query: '("drug law reform" OR "drug policy reform") (campaign OR advocacy) Australia',
        explanation: "",
      },
      {
        title: "Human Rights Approaches",
        category: "✊ Advocacy Resources",
        query:
          '"drug policy" "human rights" Australia filetype:pdf\n"harm reduction" "human rights" (framework OR approach) filetype:pdf',
        explanation: "",
      },
      {
        title: "Evidence Reviews",
        category: "Policy Analysis",
        query:
          '"evidence review" OR "evidence base" ("drug policy" OR "harm reduction") Australia filetype:pdf',
        explanation: "",
      },
      {
        title: "Evaluations of Policies",
        category: "Policy Analysis",
        query:
          'site:*.gov.au OR site:*.edu.au "drug policy" evaluation OR review Australia filetype:pdf',
        explanation: "",
      },
      {
        title: "Economic Analysis",
        category: "Policy Analysis",
        query:
          '("cost-benefit" OR "cost-effectiveness" OR "economic analysis") ("drug policy" OR "harm reduction") Australia filetype:pdf',
        explanation: "",
      },
      {
        title: "Decriminalisation Models",
        category: "International Policy",
        query:
          '"decriminalisation" Portugal (model OR evaluation OR lessons) filetype:pdf\n"drug policy" reform (Canada OR Switzerland OR Netherlands) evaluation',
        explanation: "",
      },
      {
        title: "UN & WHO Policy",
        category: "International Policy",
        query: 'site:who.int OR site:unodc.org "drug policy" OR "harm reduction" guidelines',
        explanation: "",
      },
      {
        title: "International Best Practice",
        category: "International Policy",
        query:
          '"drug policy" "best practice" (international OR global) (comparison OR review) filetype:pdf',
        explanation: "",
      },
      {
        title: "Open Consultations",
        category: "📅 Tracking Current Consultations",
        query:
          'site:*.gov.au "consultation" ("harm reduction" OR "drug policy") "closing date" 2026\ninurl:consultation site:*.gov.au (drug OR alcohol) "open" OR "current"',
        explanation: "",
      },
      {
        title: "Recent Submissions",
        category: "📅 Tracking Current Consultations",
        query: 'site:*.gov.au inurl:submissions ("harm reduction" OR "drug policy") after:2025',
        explanation: "",
      },
    ],
  },
  {
    id: "prisons-justice",
    title: "Prisons, Justice & Corrections Health",
    description: "Harm reduction in closed settings and justice system interactions.",
    dorks: [
      {
        title: "Prison Health & AOD",
        category: "Basic Queries",
        query: 'site:*.gov.au "prison health" OR "correctional health" "alcohol and other drugs"',
        explanation: "",
      },
      {
        title: "Custody Drug/Overdose",
        category: "Basic Queries",
        query: 'site:*.gov.au "custody" "drug" OR "overdose" OR "withdrawal"',
        explanation: "",
      },
      {
        title: "Corrections Harm Reduction",
        category: "Basic Queries",
        query: '"corrections" OR "correctional" "harm reduction" Australia filetype:pdf',
        explanation: "",
      },
      {
        title: "Opioid Treatment in Prisons",
        category: "Intermediate Queries",
        query:
          '"prison" OR "custody" "opioid treatment" OR "methadone" OR "buprenorphine" Australia',
        explanation: "",
      },
      {
        title: "Correctional Pharmacotherapy",
        category: "Intermediate Queries",
        query: '"correctional" "pharmacotherapy" OR "OAT" policy guidelines filetype:pdf',
        explanation: "",
      },
      {
        title: "Prison Naloxone",
        category: "Intermediate Queries",
        query: '"prison naloxone" OR "custody naloxone" OR "release naloxone" Australia',
        explanation: "",
      },
      {
        title: "Throughcare/Continuity",
        category: "Intermediate Queries",
        query: '"throughcare" OR "continuity of care" "opioid treatment" prison release',
        explanation: "",
      },
      {
        title: "Comprehensive Prison AOD Sweep",
        category: "Advanced Queries",
        query:
          '("prison" OR "custody" OR "correctional" OR "incarceration") ("alcohol and other drugs" OR AOD OR "harm reduction" OR "drug treatment" OR "opioid treatment") Australia (policy OR guideline OR program OR research) filetype:pdf after:2020',
        explanation: "",
      },
      {
        title: "Post-Release Overdose Risk",
        category: "Advanced Queries",
        query:
          '"post-release" "overdose" OR "drug death" risk Australia\n"prison release" overdose (prevention OR harm reduction)',
        explanation: "",
      },
      {
        title: "Withdrawal Management",
        category: "Advanced Queries",
        query: '"prison" OR "custody" "withdrawal" (management OR protocol OR guideline) Australia',
        explanation: "",
      },
      {
        title: "Justice Health Services",
        category: "🏥 Healthcare in Custody",
        query:
          'site:justicehealth.nsw.gov.au filetype:pdf\n"justice health" drug OR alcohol OR AOD',
        explanation: "",
      },
      {
        title: "Prison Health Guidelines",
        category: "🏥 Healthcare in Custody",
        query: '"prison health" OR "prisoner health" (guideline OR standard) AOD Australia',
        explanation: "",
      },
      {
        title: "Forensic AOD",
        category: "🏥 Healthcare in Custody",
        query: '"forensic" AOD OR "alcohol and other drugs" service Australia',
        explanation: "",
      },
      {
        title: "Drug Court Programs",
        category: "⚖️ Drug Courts & Diversion",
        query: '"drug court" Australia (evaluation OR outcomes) filetype:pdf',
        explanation: "",
      },
      {
        title: "State Drug Courts",
        category: "⚖️ Drug Courts & Diversion",
        query: '"drug court" (NSW OR VIC OR QLD OR WA OR SA) evaluation',
        explanation: "",
      },
      {
        title: "MERIT (NSW)",
        category: "⚖️ Drug Courts & Diversion",
        query: '"MERIT" OR "Magistrates Early Referral Into Treatment" NSW',
        explanation: "",
      },
      {
        title: "CISP (Victoria)",
        category: "⚖️ Drug Courts & Diversion",
        query: '"CISP" OR "Court Integrated Services Program" Victoria',
        explanation: "",
      },
      {
        title: "Diversion Programs",
        category: "⚖️ Drug Courts & Diversion",
        query:
          '"diversion" drug OR substance offence Australia evaluation\n"drug diversion" program Australia effectiveness',
        explanation: "",
      },
      {
        title: "Re-entry Support",
        category: "🔄 Post-Release & Re-entry",
        query:
          '"re-entry" OR "reintegration" AOD support Australia\n"transition" custody community drug OR alcohol support',
        explanation: "",
      },
      {
        title: "Throughcare Programs",
        category: "🔄 Post-Release & Re-entry",
        query: '"throughcare" drug OR alcohol prison release Australia',
        explanation: "",
      },
      {
        title: "Post-Release Services",
        category: "🔄 Post-Release & Re-entry",
        query: '"post-release" (AOD OR "alcohol and other drugs") (service OR support) Australia',
        explanation: "",
      },
      {
        title: "Housing & Re-entry",
        category: "🔄 Post-Release & Re-entry",
        query: '"housing" "prison release" OR "post-release" drug OR alcohol Australia',
        explanation: "",
      },
      {
        title: "Youth Justice AOD",
        category: "👥 Youth Justice",
        query: '"youth justice" OR "juvenile justice" drug OR alcohol Australia',
        explanation: "",
      },
      {
        title: "Youth Diversion",
        category: "👥 Youth Justice",
        query:
          '"young offenders" drug OR alcohol diversion Australia\n"youth detention" drug OR alcohol program\n"children\'s court" drug OR alcohol diversion',
        explanation: "",
      },
      {
        title: "Prison AOD Data",
        category: "Data & Research",
        query:
          '"prisoner" "drug use" OR "alcohol" statistics Australia\nsite:aihw.gov.au "prisoner health" drug OR alcohol',
        explanation: "",
      },
      {
        title: "Research on Prison AOD",
        category: "Data & Research",
        query:
          'site:*.edu.au "prison" OR "incarceration" (AOD OR "drug treatment") Australia filetype:pdf',
        explanation: "",
      },
      {
        title: "Post-Release Mortality Studies",
        category: "Data & Research",
        query:
          '"post-release" OR "release from prison" (mortality OR death OR overdose) research Australia',
        explanation: "",
      },
      {
        title: "Aboriginal Over-Representation",
        category: "🖤💛❤️ First Nations & Justice",
        query:
          '"Aboriginal" "over-representation" prison drug OR alcohol\n"Aboriginal" "incarceration" drug OR alcohol Australia',
        explanation: "",
      },
      {
        title: "Aboriginal Courts",
        category: "🖤💛❤️ First Nations & Justice",
        query: '"Koori Court" OR "Murri Court" OR "circle sentencing" drug OR alcohol',
        explanation: "",
      },
      {
        title: "Aboriginal Diversion",
        category: "🖤💛❤️ First Nations & Justice",
        query:
          '"Aboriginal" diversion drug OR alcohol Australia\n"Aboriginal Legal Service" drug OR alcohol',
        explanation: "",
      },
    ],
  },
  {
    id: "research",
    title: "Research & Academic Evidence",
    description: "Finding high-quality research, systematic reviews, and grey literature.",
    dorks: [
      {
        title: "Australian Research Institutions",
        category: "Basic Queries",
        query:
          'site:ndarc.med.unsw.edu.au filetype:pdf ("harm reduction" OR "drug checking" OR "overdose")\nsite:burnet.edu.au "injecting drug use" OR "needle syringe"\nsite:kirby.unsw.edu.au hepatitis drug use',
        explanation: "",
      },
      {
        title: "Generic Australian Academic",
        category: "Basic Queries",
        query: 'site:*.edu.au filetype:pdf "harm reduction" (evaluation OR effectiveness)',
        explanation: "",
      },
      {
        title: "Quality Filters (Systematic Reviews)",
        category: "Basic Queries",
        query:
          'intitle:"systematic review" "needle syringe program" OR "harm reduction"\nintitle:"meta-analysis" "opioid substitution therapy" OR "naloxone"',
        explanation: "",
      },
      {
        title: "Australian Research (Comprehensive)",
        category: "Intermediate Queries",
        query:
          "site:ndarc.med.unsw.edu.au OR site:burnet.edu.au OR site:turning-point.org.au OR site:nceta.flinders.edu.au filetype:pdf",
        explanation: "",
      },
      {
        title: "Randomised Controlled Trials",
        category: "Intermediate Queries",
        query:
          'intitle:"randomized controlled trial" OR intitle:"randomised controlled trial" "harm reduction" substance use',
        explanation: "",
      },
      {
        title: "Recent High-Quality Evidence",
        category: "Intermediate Queries",
        query:
          '(intitle:"systematic review" OR intitle:"meta-analysis") "harm reduction" after:2020 filetype:pdf',
        explanation: "",
      },
      {
        title: "Grey Literature (Exclude Aggregators)",
        category: "Intermediate Queries",
        query:
          '"harm reduction" filetype:pdf -site:researchgate.net -site:academia.edu -site:arxiv.org',
        explanation: "",
      },
      {
        title: "Comprehensive Evidence Sweep",
        category: "Advanced Queries",
        query:
          'site:*.edu.au OR site:*.edu filetype:pdf ("harm reduction" OR "drug checking" OR "needle syringe" OR naloxone) (evaluation OR effectiveness OR outcomes OR "systematic review" OR "meta-analysis") after:2020 -site:researchgate.net -site:academia.edu',
        explanation: "",
      },
      {
        title: "Methods-Focused (For Research Design)",
        category: "Advanced Queries",
        query: 'intitle:"methods" OR intitle:"methodology" "harm reduction" filetype:pdf',
        explanation: "",
      },
      {
        title: "Peer-Led Research",
        category: "Advanced Queries",
        query:
          '("peer-led research" OR "participatory action research" OR "community-based participatory research") drug use Australia filetype:pdf',
        explanation: "",
      },
      {
        title: "Citation-Worthy Evidence",
        category: "Advanced Queries",
        query:
          'site:*.edu.au ("harm reduction" OR "drug checking") (evaluation OR effectiveness OR outcomes) filetype:pdf after:2020',
        explanation: "",
      },
      {
        title: "NDARC (National Drug & Alcohol Research Centre)",
        category: "Key Australian Research Centres",
        query: "site:ndarc.med.unsw.edu.au filetype:pdf\nsite:ndarc.med.unsw.edu.au [YOUR TOPIC]",
        explanation: "",
      },
      {
        title: "Burnet Institute",
        category: "Key Australian Research Centres",
        query: 'site:burnet.edu.au filetype:pdf (harm reduction OR "injecting drug use")',
        explanation: "",
      },
      {
        title: "Turning Point",
        category: "Key Australian Research Centres",
        query: "site:turning-point.org.au filetype:pdf",
        explanation: "",
      },
      {
        title: "Kirby Institute",
        category: "Key Australian Research Centres",
        query: "site:kirby.unsw.edu.au filetype:pdf (hepatitis OR HIV OR BBV)",
        explanation: "",
      },
      {
        title: "NCETA (Workforce Development)",
        category: "Key Australian Research Centres",
        query: "site:nceta.flinders.edu.au filetype:pdf",
        explanation: "",
      },
      {
        title: "CSRH (Social Research)",
        category: "Key Australian Research Centres",
        query: "site:csrh.arts.unsw.edu.au filetype:pdf",
        explanation: "",
      },
      {
        title: "Matilda Centre",
        category: "Key Australian Research Centres",
        query: "site:matildacentre.com.au filetype:pdf",
        explanation: "",
      },
      {
        title: "Systematic Reviews",
        category: "📝 Study Types",
        query:
          'intitle:"systematic review" ("harm reduction" OR naloxone OR "needle syringe") filetype:pdf',
        explanation: "",
      },
      {
        title: "Meta-Analyses",
        category: "📝 Study Types",
        query:
          'intitle:"meta-analysis" ("opioid agonist" OR "harm reduction" OR "drug checking") filetype:pdf',
        explanation: "",
      },
      {
        title: "Randomised Trials",
        category: "📝 Study Types",
        query:
          '(intitle:"randomized" OR intitle:"randomised") trial ("harm reduction" OR AOD) filetype:pdf',
        explanation: "",
      },
      {
        title: "Cohort Studies",
        category: "📝 Study Types",
        query:
          'intitle:"cohort study" ("drug use" OR "substance use" OR "harm reduction") Australia filetype:pdf',
        explanation: "",
      },
      {
        title: "Qualitative Research",
        category: "📝 Study Types",
        query:
          'intitle:"qualitative" ("harm reduction" OR "drug use" OR "lived experience") Australia filetype:pdf',
        explanation: "",
      },
      {
        title: "Mixed Methods",
        category: "📝 Study Types",
        query: '"mixed methods" ("harm reduction" OR "drug use") Australia filetype:pdf',
        explanation: "",
      },
      {
        title: "Reports (Not Peer-Reviewed)",
        category: "📄 Grey Literature",
        query:
          '("evaluation report" OR "final report" OR "project report") "harm reduction" Australia filetype:pdf -journal -doi',
        explanation: "",
      },
      {
        title: "Working Papers",
        category: "📄 Grey Literature",
        query:
          '"working paper" OR "discussion paper" ("harm reduction" OR "drug policy") Australia filetype:pdf',
        explanation: "",
      },
      {
        title: "Theses & Dissertations",
        category: "📄 Grey Literature",
        query:
          '(thesis OR dissertation) ("harm reduction" OR "drug checking" OR "needle syringe") Australia filetype:pdf',
        explanation: "",
      },
      {
        title: "Conference Papers",
        category: "📄 Grey Literature",
        query:
          '("conference paper" OR "conference presentation" OR proceedings) "harm reduction" APSAD filetype:pdf',
        explanation: "",
      },
      {
        title: "Drug Checking Research",
        category: "🔍 Topic-Specific Research",
        query:
          'site:*.edu.au "drug checking" OR "pill testing" (evaluation OR outcomes) filetype:pdf',
        explanation: "",
      },
      {
        title: "Naloxone Research",
        category: "🔍 Topic-Specific Research",
        query:
          'site:*.edu.au "take-home naloxone" OR "community naloxone" (evaluation OR effectiveness) filetype:pdf',
        explanation: "",
      },
      {
        title: "NSP Research",
        category: "🔍 Topic-Specific Research",
        query:
          'site:*.edu.au "needle syringe program" (evaluation OR "cost-effectiveness") filetype:pdf',
        explanation: "",
      },
      {
        title: "OAT Research",
        category: "🔍 Topic-Specific Research",
        query:
          'site:*.edu.au ("opioid agonist" OR methadone OR buprenorphine) (outcomes OR retention OR effectiveness) filetype:pdf',
        explanation: "",
      },
      {
        title: "Peer Work Research",
        category: "🔍 Topic-Specific Research",
        query:
          'site:*.edu.au "peer support" OR "peer worker" (effectiveness OR outcomes) "harm reduction" filetype:pdf',
        explanation: "",
      },
      {
        title: "UK Research",
        category: "International Research",
        query: 'site:*.ac.uk "harm reduction" (evaluation OR evidence) filetype:pdf',
        explanation: "",
      },
      {
        title: "Canadian Research",
        category: "International Research",
        query:
          'site:*.ca ("safe injection" OR "supervised consumption" OR "safe supply") (evaluation OR outcomes) filetype:pdf',
        explanation: "",
      },
      {
        title: "European Research (EMCDDA)",
        category: "International Research",
        query: 'site:emcdda.europa.eu filetype:pdf ("harm reduction" OR "drug checking")',
        explanation: "",
      },
      {
        title: "Cochrane Reviews",
        category: "International Research",
        query: 'site:cochranelibrary.com ("harm reduction" OR naloxone OR "needle syringe")',
        explanation: "",
      },
      {
        title: "AI Research Assistants",
        category: "🛠️ Research Tools",
        query: '"harm reduction" research [Use with: Elicit, SciSpace, Consensus]',
        explanation: "See [AI Tools](../tools/ai-tools.md) for research assistants.",
      },
      {
        title: "Finding Similar Research",
        category: "🛠️ Research Tools",
        query: "related:ndarc.med.unsw.edu.au",
        explanation: "",
      },
    ],
  },
  {
    id: "rural-remote",
    title: "Rural, Regional & Remote Australia",
    description: "Harm reduction services and research specific to non-metropolitan areas.",
    dorks: [
      {
        title: "General Rural/Regional AOD",
        category: "Basic Queries",
        query:
          '("rural" OR "regional" OR "remote") "alcohol and other drugs" (service OR access) site:*.gov.au',
        explanation: "",
      },
      {
        title: "Rural Harm Reduction",
        category: "Basic Queries",
        query: '("rural" OR "regional") "harm reduction" Australia filetype:pdf',
        explanation: "",
      },
      {
        title: "Tyranny of Distance",
        category: "Basic Queries",
        query: '"tyranny of distance" drug OR alcohol OR AOD Australia',
        explanation: "",
      },
      {
        title: "Non-Metropolitan Services",
        category: "Intermediate Queries",
        query:
          '"non-metropolitan" ("harm reduction" OR AOD OR "alcohol and other drugs") Australia filetype:pdf',
        explanation: "",
      },
      {
        title: "Country/Bush Context",
        category: "Intermediate Queries",
        query: '("country" OR "bush") ("drug use" OR "alcohol") Australia -USA -UK',
        explanation: "",
      },
      {
        title: "Telehealth AOD",
        category: "Intermediate Queries",
        query:
          '"telehealth" OR "telemedicine" (AOD OR "alcohol and other drugs" OR "drug and alcohol") Australia',
        explanation: "",
      },
      {
        title: "Remote Health Services",
        category: "Intermediate Queries",
        query:
          '"remote health" "alcohol and other drugs" Australia\nsite:rfds.org.au "alcohol" OR "drug" OR "AOD"',
        explanation: "",
      },
      {
        title: "Comprehensive Rural Sweep",
        category: "Advanced Queries",
        query:
          '("rural" OR "regional" OR "remote" OR "non-metropolitan" OR "country") ("harm reduction" OR "alcohol and other drugs" OR AOD OR "drug and alcohol") Australia (service OR access OR workforce OR research) filetype:pdf -USA -UK after:2020',
        explanation: "",
      },
      {
        title: "FIFO/DIDO Contexts",
        category: "Advanced Queries",
        query:
          '"fly-in fly-out" OR "FIFO" OR "drive-in drive-out" (drug OR alcohol) health\n"mining" OR "resources sector" (drug OR alcohol) (testing OR policy OR health)',
        explanation: "",
      },
      {
        title: "Farming Communities",
        category: "Advanced Queries",
        query:
          '"farming" OR "agriculture" ("alcohol" OR "drug use") mental health Australia\n"drought" OR "natural disaster" "alcohol" OR "drug" rural Australia',
        explanation: "",
      },
      {
        title: "NSW Regions",
        category: "Specific Regional Areas",
        query:
          '"Central West" OR "Far West" NSW AOD OR "alcohol drug"\n"North Coast" OR "Northern Rivers" NSW harm reduction OR AOD\n"Hunter" OR "New England" AOD services NSW\n"Riverina" OR "Murray" harm reduction OR "needle syringe"',
        explanation: "",
      },
      {
        title: "Queensland Regions",
        category: "Specific Regional Areas",
        query:
          '"North Queensland" OR "Far North Queensland" harm reduction\n"Central Queensland" OR "Wide Bay" AOD services\n"Outback Queensland" drug OR alcohol health',
        explanation: "",
      },
      {
        title: "Western Australia Regions",
        category: "Specific Regional Areas",
        query:
          '"Kimberley" OR "Pilbara" OR "Goldfields" drug OR alcohol health\n"Wheatbelt" OR "Great Southern" WA AOD',
        explanation: "",
      },
      {
        title: "Victoria Regions",
        category: "Specific Regional Areas",
        query:
          '"Gippsland" OR "Mallee" OR "Wimmera" AOD services\n"Murray" OR "Hume" VIC harm reduction',
        explanation: "",
      },
      {
        title: "Northern Territory",
        category: "Specific Regional Areas",
        query:
          '"Top End" OR "Katherine" OR "Alice Springs" alcohol drug\n"Central Australia" AOD OR "alcohol and other drugs"',
        explanation: "",
      },
      {
        title: "Tasmania",
        category: "Specific Regional Areas",
        query: '"Tasmania" ("rural" OR "regional") harm reduction OR AOD',
        explanation: "",
      },
      {
        title: "South Australia",
        category: "Specific Regional Areas",
        query: '"Eyre Peninsula" OR "Riverland" SA drug OR alcohol\n"outback" SA AOD health',
        explanation: "",
      },
      {
        title: "Royal Flying Doctor Service",
        category: "🏥 Remote Health Services",
        query:
          'site:rfds.org.au "alcohol" OR "drug" OR "AOD"\n"Royal Flying Doctor Service" harm reduction OR overdose OR AOD',
        explanation: "",
      },
      {
        title: "Remote Area Nurses",
        category: "🏥 Remote Health Services",
        query: '"remote area nurse" OR "RAN" (drug OR alcohol OR AOD) Australia',
        explanation: "",
      },
      {
        title: "Aboriginal Health Services (Remote)",
        category: "🏥 Remote Health Services",
        query:
          '"remote" "Aboriginal" (AOD OR "alcohol and other drugs") health\n"Aboriginal Community Controlled" remote (drug OR alcohol)',
        explanation: "",
      },
      {
        title: "Workforce Development",
        category: "👥 Rural Workforce",
        query:
          '"rural workforce" (AOD OR "alcohol and other drugs") filetype:pdf\n"rural health" (peer worker OR AOD worker) training',
        explanation: "",
      },
      {
        title: "Generalist Practice",
        category: "👥 Rural Workforce",
        query:
          '"generalist" (AOD OR "alcohol drug") rural practitioner\n"upskilling" OR "professional development" rural AOD worker',
        explanation: "",
      },
      {
        title: "Retention & Support",
        category: "👥 Rural Workforce",
        query:
          '(retention OR support OR "professional isolation") rural (AOD OR "drug and alcohol") worker',
        explanation: "",
      },
      {
        title: "Academic Research",
        category: "Rural Research",
        query:
          'site:*.edu.au filetype:pdf "rural" harm reduction Australia\nsite:crrmh.com.au OR site:ruralhealth.org.au "alcohol" OR "drug"',
        explanation: "",
      },
      {
        title: "National Rural Health Alliance",
        category: "Rural Research",
        query: '"National Rural Health Alliance" alcohol OR drug OR AOD',
        explanation: "",
      },
      {
        title: "Centre for Rural and Remote Mental Health",
        category: "Rural Research",
        query: '"Centre for Rural and Remote Mental Health" AOD OR "alcohol and other drugs"',
        explanation: "",
      },
      {
        title: "Farming Families",
        category: "🚜 Agricultural & Farming Contexts",
        query:
          '"farming families" substance use OR alcohol\n"rural men" alcohol OR drug use help-seeking',
        explanation: "",
      },
      {
        title: "Drought & Disasters",
        category: "🚜 Agricultural & Farming Contexts",
        query:
          '"drought" OR "bushfire" OR "flood" (alcohol OR drug) rural Australia\n"natural disaster" substance use OR alcohol rural',
        explanation: "",
      },
      {
        title: "Seasonal Workers",
        category: "🚜 Agricultural & Farming Contexts",
        query: '"seasonal workers" OR "harvest workers" drug OR alcohol health Australia',
        explanation: "",
      },
    ],
  },
  {
    id: "safer-use-education",
    title: "Safer Use Education & Health Promotion",
    description:
      "Finding factsheets, brochures, and health promotion resources for safer use education.",
    dorks: [
      {
        title: "Safer Injecting Factsheets",
        category: "Basic Queries",
        query:
          '("safer injecting" OR "safer injection") (factsheet OR brochure OR "information sheet") site:*.org.au filetype:pdf',
        explanation: "",
      },
      {
        title: "Safer Smoking or Snorting Materials",
        category: "Basic Queries",
        query:
          '("safer smoking" OR "safer snorting" OR "safer use") (factsheet OR brochure OR leaflet) site:*.org.au filetype:pdf',
        explanation: "",
      },
      {
        title: "Overdose Prevention Education",
        category: "Basic Queries",
        query:
          '("overdose prevention" OR "overdose education") (factsheet OR "information sheet") site:*.org.au',
        explanation: "",
      },
      {
        title: "Health Promotion Toolkits",
        category: "Intermediate Queries",
        query:
          '("harm reduction" OR "safer use") ("health promotion" OR toolkit OR resources) site:*.org.au filetype:pdf',
        explanation: "",
      },
      {
        title: "Peer Education Resources",
        category: "Intermediate Queries",
        query:
          '("peer education" OR "peer-led") ("harm reduction" OR "safer use") site:*.org.au filetype:pdf',
        explanation: "",
      },
      {
        title: "Government Factsheets and Brochures",
        category: "Intermediate Queries",
        query:
          'site:*.gov.au ("harm reduction" OR "safer use") (factsheet OR brochure OR leaflet) filetype:pdf',
        explanation: "",
      },
      {
        title: "Multilingual or Easy Read Materials",
        category: "Advanced Queries",
        query:
          '("harm reduction" OR "safer use") (translated OR multilingual OR "easy read" OR "plain language") site:*.org.au filetype:pdf',
        explanation: "",
      },
      {
        title: "Substance-Specific Harm Reduction Sheets",
        category: "Advanced Queries",
        query:
          '("harm reduction" OR "safer use") (opioid OR stimulant OR benzodiazepine OR alcohol) "information sheet" site:*.org.au filetype:pdf',
        explanation: "",
      },
      {
        title: "Campaigns, Posters, and Communications",
        category: "Advanced Queries",
        query:
          '("harm reduction" OR "safer use") (campaign OR "social marketing" OR poster OR "communication plan") Australia filetype:pdf',
        explanation: "",
      },
    ],
  },
  {
    id: "service-directories",
    title: "Service Finding & Directories",
    description:
      "Locate hard-to-find lists of AOD, NSP, sexual health, and harm reduction services.",
    dorks: [
      {
        title: "Government Service Directories",
        category: "Basic Queries",
        query:
          '(filetype:pdf OR filetype:xlsx) ("service directory" OR "service finder" OR "contact list") (AOD OR "alcohol and other drugs") site:*.gov.au',
        explanation: "",
      },
      {
        title: "Regional Service Lists",
        category: "Basic Queries",
        query:
          'site:*.health.nsw.gov.au "service directory" ("central coast" OR newcastle OR "hunter region")',
        explanation: "",
      },
      {
        title: "Inurl Directory Pattern",
        category: "Basic Queries",
        query: "inurl:aod-services OR inurl:directory site:*.gov.au",
        explanation: "",
      },
      {
        title: "Sexual Health & BBV Services",
        category: "Intermediate Queries",
        query:
          '("hepatitis" OR "HCV" OR "sexual health") (clinic OR service OR directory) site:*.health.*.gov.au',
        explanation: "",
      },
      {
        title: "NSP Directories",
        category: "Intermediate Queries",
        query:
          '("needle syringe program" OR NSP) (directory OR "service list" OR locations) [YOUR STATE]',
        explanation: "",
      },
      {
        title: "Mental Health Service Directories",
        category: "Intermediate Queries",
        query: 'site:*.gov.au "mental health" service directory (filetype:pdf OR filetype:xlsx)',
        explanation: "",
      },
      {
        title: "Spreadsheet Directories (Data-Rich)",
        category: "Intermediate Queries",
        query:
          'filetype:xlsx ("service directory" OR "contact list") (AOD OR "drug and alcohol" OR "harm reduction") site:*.gov.au',
        explanation: "",
      },
      {
        title: "Comprehensive Service Directory Sweep",
        category: "Advanced Queries",
        query:
          '(filetype:pdf OR filetype:xlsx OR filetype:csv) ("service directory" OR "service finder" OR "service list" OR "contact directory") (AOD OR "alcohol and other drugs" OR "drug and alcohol" OR "harm reduction") site:*.gov.au OR site:*.org.au after:2022',
        explanation: "",
      },
      {
        title: "Treatment Service Finders",
        category: "Advanced Queries",
        query:
          "(treatment OR rehabilitation OR detox OR counselling) service (directory OR finder OR list) [YOUR STATE] -jobs",
        explanation: "",
      },
      {
        title: "Outreach Services",
        category: "Advanced Queries",
        query:
          '(outreach OR mobile OR "street-based") service (AOD OR "harm reduction") directory OR list [YOUR STATE]',
        explanation: "",
      },
      {
        title: "After-Hours Services",
        category: "Advanced Queries",
        query:
          '("after hours" OR "24 hour" OR "crisis") service (AOD OR "drug and alcohol" OR "mental health") [YOUR STATE]',
        explanation: "",
      },
      {
        title: "NSW",
        category: "State-by-State Service Directories",
        query:
          'site:health.nsw.gov.au OR site:nsw.gov.au "service directory" AOD OR "alcohol drug"\nsite:*.nsw.gov.au filetype:xlsx service directory',
        explanation: "",
      },
      {
        title: "Victoria",
        category: "State-by-State Service Directories",
        query:
          'site:health.vic.gov.au "service directory" OR "service finder" AOD\nsite:*.vic.gov.au "alcohol and drug" services directory',
        explanation: "",
      },
      {
        title: "Queensland",
        category: "State-by-State Service Directories",
        query: 'site:health.qld.gov.au "service directory" AOD OR "alcohol and other drugs"',
        explanation: "",
      },
      {
        title: "Western Australia",
        category: "State-by-State Service Directories",
        query:
          'site:health.wa.gov.au "service directory" AOD OR "alcohol and other drugs"\nsite:mhc.wa.gov.au services directory',
        explanation: "",
      },
      {
        title: "South Australia",
        category: "State-by-State Service Directories",
        query:
          "site:sahealth.sa.gov.au service directory drug OR alcohol\nsite:dassa.sa.gov.au services",
        explanation: "",
      },
      {
        title: "Tasmania",
        category: "State-by-State Service Directories",
        query: 'site:health.tas.gov.au "service directory" alcohol drug',
        explanation: "",
      },
      {
        title: "ACT",
        category: "State-by-State Service Directories",
        query:
          'site:health.act.gov.au service directory AOD\nsite:*.act.gov.au "alcohol and drug" services',
        explanation: "",
      },
      {
        title: "NT",
        category: "State-by-State Service Directories",
        query: "site:health.nt.gov.au service directory AOD",
        explanation: "",
      },
      {
        title: "Opioid Treatment (OAT/OST) Clinics",
        category: "🏥 Service Type Directories",
        query:
          '("opioid treatment" OR methadone OR buprenorphine) (clinic OR service OR prescriber) directory [YOUR STATE]',
        explanation: "",
      },
      {
        title: "Residential Rehabilitation",
        category: "🏥 Service Type Directories",
        query:
          '("residential rehabilitation" OR "residential treatment" OR rehab) directory OR list [YOUR STATE] AOD',
        explanation: "",
      },
      {
        title: "Withdrawal/Detox Services",
        category: "🏥 Service Type Directories",
        query: '(withdrawal OR detox OR "detoxification") service (directory OR list) [YOUR STATE]',
        explanation: "",
      },
      {
        title: "Counselling Services",
        category: "🏥 Service Type Directories",
        query:
          '(counselling OR counseling) service (AOD OR "drug and alcohol") directory [YOUR STATE]',
        explanation: "",
      },
      {
        title: "Youth Services",
        category: "🏥 Service Type Directories",
        query:
          '(youth OR "young people") (AOD OR "drug and alcohol") service directory [YOUR STATE]',
        explanation: "",
      },
      {
        title: "Housing/Homelessness",
        category: "🏠 Related Service Directories",
        query: "(housing OR homelessness OR accommodation) service directory [YOUR STATE]",
        explanation: "",
      },
      {
        title: "Mental Health",
        category: "🏠 Related Service Directories",
        query: '"mental health" service directory [YOUR STATE] site:*.gov.au',
        explanation: "",
      },
      {
        title: "Family Support",
        category: "🏠 Related Service Directories",
        query: '("family support" OR "family drug support") service directory [YOUR STATE]',
        explanation: "",
      },
      {
        title: "Inurl Patterns",
        category: "🔧 Finding Hidden Directories",
        query:
          "site:*.gov.au inurl:services OR inurl:directory filetype:pdf AOD\nsite:*.gov.au inurl:contacts OR inurl:providers filetype:xlsx",
        explanation: "",
      },
      {
        title: "Spreadsheet Mining",
        category: "🔧 Finding Hidden Directories",
        query:
          'site:*.gov.au filetype:xlsx "service" ("contact" OR "phone" OR "address") drug OR alcohol',
        explanation: "",
      },
      {
        title: "Known Online Tools (search for updates)",
        category: "📱 Online Service Finders",
        query:
          '"service finder" AOD Australia online\n"treatment locator" "drug and alcohol" Australia',
        explanation: "",
      },
      {
        title: "App/Digital Services",
        category: "📱 Online Service Finders",
        query: '(app OR application OR "online tool") "service finder" AOD Australia',
        explanation: "",
      },
    ],
  },
  {
    id: "sex-worker-health",
    title: "Sex Worker Health & Safety",
    description: "Resources for sex worker health, safety, and harm reduction services.",
    dorks: [
      {
        title: "Sex Worker Health Services",
        category: "Basic Queries",
        query: '"sex worker" health service OR clinic Australia',
        explanation: "",
      },
      {
        title: "Peer Organizations",
        category: "Basic Queries",
        query: '"sex worker" "peer organisation" OR "peer organization" Australia',
        explanation: "",
      },
      {
        title: "Harm Reduction Resources",
        category: "Basic Queries",
        query: '"sex work" "harm reduction" Australia (resource OR guideline OR information)',
        explanation: "",
      },
      {
        title: "Drug Use & Sex Work",
        category: "Intermediate Queries",
        query: '"sex worker" OR "sex work" "drug use" OR "alcohol and other drugs" Australia',
        explanation: "",
      },
      {
        title: "Overdose Prevention",
        category: "Intermediate Queries",
        query: '"sex worker" OR "sex work" (overdose OR naloxone) prevention Australia',
        explanation: "",
      },
      {
        title: "Stimulant Use",
        category: "Intermediate Queries",
        query:
          '"sex work" OR "sex worker" (methamphetamine OR "crystal meth" OR stimulant) harm reduction',
        explanation: "",
      },
      {
        title: "Comprehensive Sex Worker Resources",
        category: "Advanced Queries",
        query:
          '("sex worker" OR "sex work" OR "people in the sex industry") ("harm reduction" OR "health service" OR "peer support" OR safety) Australia (resource OR guideline OR service OR program) filetype:pdf after:2020',
        explanation: "",
      },
      {
        title: "Intersectional Resources",
        category: "Advanced Queries",
        query:
          '"sex worker" ("Aboriginal" OR "First Nations" OR "migrant" OR "trans" OR "CALD") Australia',
        explanation: "",
      },
      {
        title: "Scarlet Alliance",
        category: "👥 Peer Organizations",
        query: 'site:scarletalliance.org.au (drug OR alcohol OR "harm reduction" OR health)',
        explanation: "",
      },
      {
        title: "RhED (Resourcing Health & Education)",
        category: "👥 Peer Organizations",
        query: 'site:sexworker.org.au (drug OR alcohol OR "harm reduction" OR overdose)',
        explanation: "",
      },
      {
        title: "SWOP NSW",
        category: "👥 Peer Organizations",
        query: "site:swop.org.au (drug OR alcohol OR health OR safety)",
        explanation: "",
      },
      {
        title: "Respect Inc (QLD)",
        category: "👥 Peer Organizations",
        query: 'site:respectqld.org.au (drug OR alcohol OR health OR "harm reduction")',
        explanation: "",
      },
      {
        title: "Sexual Health",
        category: "🏥 Health Services",
        query: '"sex worker" "sexual health" service OR clinic Australia',
        explanation: "",
      },
      {
        title: "BBV Prevention",
        category: "🏥 Health Services",
        query: '"sex worker" ("HIV" OR "hepatitis" OR "BBV") prevention Australia',
        explanation: "",
      },
      {
        title: "Outreach Services",
        category: "🏥 Health Services",
        query: '"sex worker" outreach (health OR "harm reduction") Australia',
        explanation: "",
      },
      {
        title: "Workplace Safety",
        category: "🛡️ Safety Resources",
        query: '"sex worker" OR "sex work" (safety OR "occupational health") Australia guideline',
        explanation: "",
      },
      {
        title: "Violence Prevention",
        category: "🛡️ Safety Resources",
        query: '"sex worker" violence prevention OR safety resource Australia',
        explanation: "",
      },
      {
        title: "Legal Information",
        category: "🛡️ Safety Resources",
        query: '"sex work" law OR legal rights (NSW OR VIC OR QLD) Australia',
        explanation: "",
      },
      {
        title: "Trans-Specific Resources",
        category: "🏳️‍⚧️ Trans Sex Workers",
        query: '"trans" OR "transgender" "sex worker" (health OR safety OR resource) Australia',
        explanation: "",
      },
      {
        title: "Trans Health & Sex Work",
        category: "🏳️‍⚧️ Trans Sex Workers",
        query: '"trans sex worker" OR "transgender sex worker" harm reduction Australia',
        explanation: "",
      },
      {
        title: "Migrant Resources",
        category: "Migrant Sex Workers",
        query: '"migrant" "sex worker" (health OR support OR service) Australia',
        explanation: "",
      },
      {
        title: "Multilingual Resources",
        category: "Migrant Sex Workers",
        query: '"sex worker" (Chinese OR Thai OR Korean OR Vietnamese) resource Australia',
        explanation: "",
      },
      {
        title: "Mental Health Support",
        category: "🧠 Mental Health & Wellbeing",
        query: '"sex worker" "mental health" support OR service Australia',
        explanation: "",
      },
      {
        title: "Peer Support",
        category: "🧠 Mental Health & Wellbeing",
        query: '"sex worker" "peer support" OR "peer counselling" Australia',
        explanation: "",
      },
      {
        title: "Academic Research",
        category: "Research & Data",
        query:
          'site:*.edu.au "sex worker" OR "sex work" health OR "harm reduction" Australia filetype:pdf',
        explanation: "",
      },
      {
        title: "Health Data",
        category: "Research & Data",
        query: '"sex worker" (survey OR study OR data) health Australia filetype:pdf',
        explanation: "",
      },
      {
        title: "Decriminalisation",
        category: "⚖️ Policy & Advocacy",
        query: '"sex work" decriminalisation OR decriminalization (Australia OR NSW OR VIC) policy',
        explanation: "",
      },
      {
        title: "Rights-Based Approaches",
        category: "⚖️ Policy & Advocacy",
        query: '"sex worker rights" OR "rights-based" "sex work" policy Australia',
        explanation: "",
      },
      {
        title: "Submissions & Inquiries",
        category: "⚖️ Policy & Advocacy",
        query:
          '"sex work" OR "sex worker" (submission OR inquiry) parliament Australia filetype:pdf',
        explanation: "",
      },
    ],
  },
  {
    id: "stigma-language",
    title: "Stigma, Language & Historical Research",
    description:
      "Understanding how language has changed and finding historical documents using legacy terminology.",
    dorks: [
      {
        title: "Tracking Language Change",
        category: "Basic Queries",
        query:
          '"people who use drugs" OR "person who uses drugs" (definition OR meaning OR "why we say")\n"stigma" "language" drug use harm reduction',
        explanation: "",
      },
      {
        title: "People-First Language",
        category: "Basic Queries",
        query:
          "\"people-first language\" drug OR substance use\n\"from 'addict' to 'person'\" language change",
        explanation: "",
      },
      {
        title: "Language Guides",
        category: "Basic Queries",
        query:
          '("terminology" OR "language") harm reduction guide filetype:pdf\n"words matter" drug OR substance use campaign',
        explanation: "",
      },
      {
        title: "Historical/Stigmatising Terms (For Research Only)",
        category: "Intermediate Queries",
        query:
          '"drug addict" OR "drug abuser" Australia 1980..2010 filetype:pdf\n"intravenous drug user" OR "IVDU" Australia harm reduction\n"substance abuser" policy OR program Australia before:2015',
        explanation: "",
      },
      {
        title: "Compare Language Across Eras",
        category: "Intermediate Queries",
        query:
          '"injecting drug user" OR "IDU" 1990..2010 Australia\n"people who inject drugs" OR "PWID" 2010..2026 Australia',
        explanation: "",
      },
      {
        title: "Media Analysis",
        category: "Intermediate Queries",
        query:
          '"junkie" OR "druggie" (media OR news) Australia analysis\n"media portrayal" OR "media representation" drug use Australia',
        explanation: "",
      },
      {
        title: "Comprehensive Stigma Research",
        category: "Advanced Queries",
        query:
          '"stigma" ("people who use drugs" OR "drug users" OR "substance use") Australia (research OR study OR analysis) filetype:pdf after:2015',
        explanation: "",
      },
      {
        title: "Structural Stigma",
        category: "Advanced Queries",
        query: '"structural stigma" drug use OR substance use (policy OR system OR institutional)',
        explanation: "",
      },
      {
        title: "Self-Stigma",
        category: "Advanced Queries",
        query: '"self-stigma" OR "internalised stigma" OR "internalized stigma" drug use',
        explanation: "",
      },
      {
        title: "Stigma Reduction Interventions",
        category: "Advanced Queries",
        query: '"stigma reduction" intervention drug use effectiveness filetype:pdf',
        explanation: "",
      },
      {
        title: "Origins & Early History",
        category: "📜 History of Harm Reduction in Australia",
        query:
          '"harm minimisation" Australia history OR origins 1980s OR 1990s\n"needle exchange" Australia first OR "pilot program" history',
        explanation: "",
      },
      {
        title: "Methadone History",
        category: "📜 History of Harm Reduction in Australia",
        query: '"methadone program" Australia history OR establishment',
        explanation: "",
      },
      {
        title: "AIDS Response",
        category: "📜 History of Harm Reduction in Australia",
        query: '"AIDS response" Australia "injecting drug use" 1980s',
        explanation: "",
      },
      {
        title: "Supervised Injecting History",
        category: "📜 History of Harm Reduction in Australia",
        query:
          '"supervised injecting" OR "medically supervised injecting" Sydney history OR origins\n"Kings Cross" "injecting room" history OR campaign',
        explanation: "",
      },
      {
        title: "Movement History",
        category: "✊ History of Drug User Organising",
        query:
          '"drug user organisation" Australia history\n(NUAA OR AIVL OR VIVAIDS) history OR "early days" OR founding',
        explanation: "",
      },
      {
        title: "Activism",
        category: "✊ History of Drug User Organising",
        query:
          '"drug user activism" OR "drug user movement" Australia\n"civil society" drug users Australia 1980s OR 1990s',
        explanation: "",
      },
      {
        title: "Peer Movement",
        category: "✊ History of Drug User Organising",
        query: '"peer movement" drug use Australia history',
        explanation: "",
      },
      {
        title: "Australian Stigma Research",
        category: "Stigma Research",
        query:
          '"stigma" "people who use drugs" Australia research filetype:pdf\nsite:*.edu.au "stigma" "drug use" OR "substance use" Australia',
        explanation: "",
      },
      {
        title: "Healthcare Stigma",
        category: "Stigma Research",
        query:
          '"discrimination" drug use "health care" OR healthcare Australia\n"stigma" "drug use" (hospital OR "emergency department" OR "health service") Australia',
        explanation: "",
      },
      {
        title: "Employment & Housing Stigma",
        category: "Stigma Research",
        query: '"discrimination" drug use (housing OR employment) Australia',
        explanation: "",
      },
      {
        title: "Criminal Justice Stigma",
        category: "Stigma Research",
        query:
          '"stigma" OR "discrimination" "drug use" ("criminal record" OR "justice system") Australia',
        explanation: "",
      },
      {
        title: "Terminology Shifts",
        category: "Language Evolution Studies",
        query: '"terminology" change OR evolution "drug use" OR "substance use" filetype:pdf',
        explanation: "",
      },
      {
        title: "Style Guides",
        category: "Language Evolution Studies",
        query:
          '"style guide" OR "language guide" ("drug use" OR "substance use" OR "harm reduction") filetype:pdf',
        explanation: "",
      },
      {
        title: "International Language Standards",
        category: "Language Evolution Studies",
        query: '"people-first language" OR "person-centred language" drug international guidelines',
        explanation: "",
      },
      {
        title: "Finding Legacy vs Current Terminology",
        category: "🔄 Before/After Comparisons",
        query:
          '("people who use drugs" OR "PWUD" OR "person with lived experience") 2010..2026 filetype:pdf',
        explanation: "**2010s-2020s terminology:**",
      },
      {
        title: "Anti-Stigma Campaigns",
        category: "💬 Challenging Stigma",
        query: '"anti-stigma" OR "stigma campaign" drug OR substance Australia',
        explanation: "",
      },
      {
        title: "Changing the Narrative",
        category: "💬 Challenging Stigma",
        query: '"changing the narrative" OR "reframing" drug use OR "drug policy"',
        explanation: "",
      },
      {
        title: "Peer-Led Stigma Work",
        category: "💬 Challenging Stigma",
        query:
          '("peer-led" OR "lived experience") stigma (reduction OR challenge OR campaign) drug',
        explanation: "",
      },
    ],
  },
  {
    id: "supervised-consumption",
    title: "Supervised Consumption & Overdose Prevention Sites",
    description:
      "Finding evidence, evaluations, and policy documents about supervised consumption services and",
    dorks: [
      {
        title: "NSW and Sydney MSIC Material",
        category: "Basic Queries",
        query:
          'site:health.nsw.gov.au ("medically supervised injecting" OR "supervised injecting" OR MSIC)',
        explanation: "",
      },
      {
        title: "Victoria Supervised Injecting Room",
        category: "Basic Queries",
        query:
          'site:health.vic.gov.au ("supervised injecting room" OR "medically supervised injecting" OR MSIR)',
        explanation: "",
      },
      {
        title: "NGO and Community Evidence",
        category: "Basic Queries",
        query:
          'site:*.org.au ("supervised injecting" OR "drug consumption room" OR "supervised consumption") (evaluation OR report OR review)',
        explanation: "",
      },
      {
        title: "Business Cases and Community Consultation",
        category: "Intermediate Queries",
        query:
          '("supervised injecting" OR "drug consumption room") (consultation OR community OR "community engagement" OR "business case") site:*.gov.au',
        explanation: "",
      },
      {
        title: "Operational Guidance and Protocols",
        category: "Intermediate Queries",
        query:
          '("supervised injecting" OR "supervised consumption") (guideline OR protocol OR "standard operating") site:*.gov.au filetype:pdf',
        explanation: "",
      },
      {
        title: "Overdose Prevention Sites (Alternative Terminology)",
        category: "Intermediate Queries",
        query:
          '("overdose prevention site" OR "safe consumption site" OR "supervised consumption service") Australia (report OR evaluation)',
        explanation: "",
      },
      {
        title: "Legislation and Regulatory Frameworks",
        category: "Advanced Queries",
        query:
          '("supervised injecting" OR "drug consumption room") (legislation OR regulation OR "regulatory framework" OR "trial") site:*.gov.au filetype:pdf',
        explanation: "",
      },
      {
        title: "Evidence and Outcomes (Australia)",
        category: "Advanced Queries",
        query:
          '("supervised injecting" OR "drug consumption room" OR "supervised consumption") (effectiveness OR outcomes OR evaluation OR "cost-benefit") Australia filetype:pdf',
        explanation: "",
      },
      {
        title: "Workforce and Clinical Governance",
        category: "Advanced Queries",
        query:
          '("supervised injecting" OR "supervised consumption") (clinical governance OR "model of care" OR staffing OR training) site:*.gov.au filetype:pdf',
        explanation: "",
      },
    ],
  },
  {
    id: "youth",
    title: "Youth & Young People",
    description: "Young people specific resources and approaches.",
    dorks: [
      {
        title: "Youth AOD Services",
        category: "Basic Queries",
        query: '"youth" OR "young people" "alcohol and other drugs" service Australia',
        explanation: "",
      },
      {
        title: "Adolescent Programs",
        category: "Basic Queries",
        query: '"adolescent" drug OR alcohol treatment program Australia',
        explanation: "",
      },
      {
        title: "Early Intervention",
        category: "Basic Queries",
        query: '"early intervention" youth drug OR alcohol Australia',
        explanation: "",
      },
      {
        title: "Youth Outreach",
        category: "Intermediate Queries",
        query: '"youth outreach" drug OR alcohol harm reduction Australia',
        explanation: "",
      },
      {
        title: "School-Based Programs",
        category: "Intermediate Queries",
        query: '"school-based" OR "school" drug OR alcohol prevention Australia evaluation',
        explanation: "",
      },
      {
        title: "Peer Education (Youth)",
        category: "Intermediate Queries",
        query: '"peer education" youth drug OR alcohol Australia',
        explanation: "",
      },
      {
        title: "Comprehensive Youth AOD Sweep",
        category: "Advanced Queries",
        query:
          '("youth" OR "young people" OR "adolescent" OR "teen" OR "young adult") ("alcohol and other drugs" OR AOD OR "drug use" OR "harm reduction") Australia (service OR program OR prevention OR research) filetype:pdf after:2020',
        explanation: "",
      },
      {
        title: "Life Skills Programs",
        category: "Advanced Queries",
        query: '"life skills" OR "resilience" drug prevention young people Australia',
        explanation: "",
      },
      {
        title: "Youth-Specific Harm Reduction",
        category: "Advanced Queries",
        query: '"youth" OR "young people" "harm reduction" approach Australia filetype:pdf',
        explanation: "",
      },
      {
        title: "Drug Education",
        category: "Prevention & Education",
        query: '"drug education" schools Australia (effectiveness OR evaluation) filetype:pdf',
        explanation: "",
      },
      {
        title: "Prevention Programs",
        category: "Prevention & Education",
        query: '"prevention" "young people" OR youth (drug OR alcohol) Australia evaluation',
        explanation: "",
      },
      {
        title: "Evidence-Based Prevention",
        category: "Prevention & Education",
        query: '"evidence-based" prevention youth (drug OR alcohol) Australia',
        explanation: "",
      },
      {
        title: "Harm Reduction Education",
        category: "Prevention & Education",
        query: '"harm reduction education" young people Australia',
        explanation: "",
      },
      {
        title: "Specialist Youth Services",
        category: "🏥 Youth AOD Services",
        query:
          '"youth" AOD service OR "alcohol and other drugs" (directory OR list) [YOUR STATE]\nsite:ysas.org.au filetype:pdf',
        explanation: "",
      },
      {
        title: "Youth Withdrawal",
        category: "🏥 Youth AOD Services",
        query: '"youth" OR "adolescent" withdrawal OR detox (service OR program) Australia',
        explanation: "",
      },
      {
        title: "Youth Residential",
        category: "🏥 Youth AOD Services",
        query:
          '"youth residential" OR "adolescent residential" (treatment OR rehabilitation) drug alcohol Australia',
        explanation: "",
      },
      {
        title: "Festival Safety",
        category: "🎪 Nightlife & Festivals (Youth Focus)",
        query: '"festival" young people drug OR alcohol safety Australia',
        explanation: "",
      },
      {
        title: "Party/Nightlife",
        category: "🎪 Nightlife & Festivals (Youth Focus)",
        query: '"party" OR "nightlife" young people harm reduction Australia',
        explanation: "",
      },
      {
        title: "Drink Spiking",
        category: "🎪 Nightlife & Festivals (Youth Focus)",
        query: '"drink spiking" prevention young people Australia',
        explanation: "",
      },
      {
        title: "Safer Partying",
        category: "🎪 Nightlife & Festivals (Youth Focus)",
        query: '"safer partying" OR "safer clubbing" young people Australia',
        explanation: "",
      },
      {
        title: "Youth Justice AOD",
        category: "⚖️ Youth Justice",
        query: '"youth justice" OR "juvenile justice" drug OR alcohol Australia filetype:pdf',
        explanation: "",
      },
      {
        title: "Youth Diversion",
        category: "⚖️ Youth Justice",
        query: '"young offenders" drug OR alcohol diversion Australia',
        explanation: "",
      },
      {
        title: "Youth Detention",
        category: "⚖️ Youth Justice",
        query: '"youth detention" drug OR alcohol program Australia',
        explanation: "",
      },
      {
        title: "Children's Court",
        category: "⚖️ Youth Justice",
        query: '"children\'s court" drug OR alcohol diversion Australia',
        explanation: "",
      },
      {
        title: "Youth Mental Health & AOD",
        category: "🧠 Mental Health & Youth",
        query:
          '"youth" OR "young people" "mental health" ("substance use" OR AOD) Australia\nsite:headspace.org.au drug OR alcohol',
        explanation: "",
      },
      {
        title: "Early Psychosis",
        category: "🧠 Mental Health & Youth",
        query: '"early psychosis" substance use youth Australia',
        explanation: "",
      },
      {
        title: "Family Involvement",
        category: "👨‍👩‍👧 Family & Youth",
        query: '"family" "youth" OR "adolescent" AOD treatment Australia',
        explanation: "",
      },
      {
        title: "Parent Programs",
        category: "👨‍👩‍👧 Family & Youth",
        query: '"parent" program youth drug OR alcohol prevention Australia',
        explanation: "",
      },
      {
        title: "Youth Drug Use Data",
        category: "Research & Data",
        query:
          '"young people" OR "youth" drug use (survey OR statistics) Australia\nsite:aihw.gov.au youth "alcohol and other drugs"',
        explanation: "",
      },
      {
        title: "Research",
        category: "Research & Data",
        query:
          'site:*.edu.au "youth" OR "young people" (AOD OR "alcohol and other drugs") Australia filetype:pdf',
        explanation: "",
      },
      {
        title: "Online Interventions",
        category: "📱 Digital & Online",
        query: '"online" OR "digital" (intervention OR program) youth drug OR alcohol Australia',
        explanation: "",
      },
      {
        title: "Apps for Youth",
        category: "📱 Digital & Online",
        query: "(app OR application) youth drug OR alcohol Australia",
        explanation: "",
      },
    ],
  },
];
