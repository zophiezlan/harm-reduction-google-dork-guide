import { ref } from "vue";
import { getStorageItemSimple, setStorageItem } from "../utils/storage";

export interface HistoryItem {
  id: string;
  query: string;
  timestamp: number;
  label?: string;
}

const STORAGE_KEY = "dork-query-history";
const MAX_HISTORY = 50;

// Singleton state
let historyState: HistoryItem[] | null = null;

export function useQueryHistory() {
  if (!historyState) {
    historyState = [];
  }

  const history = ref<HistoryItem[]>(historyState);

  function initialize() {
    const saved = getStorageItemSimple<HistoryItem[]>(STORAGE_KEY, []);
    // Validate that saved items have required properties
    const validItems = Array.isArray(saved)
      ? saved.filter(
          (item): item is HistoryItem =>
            typeof item === "object" &&
            item !== null &&
            typeof item.id === "string" &&
            typeof item.query === "string" &&
            typeof item.timestamp === "number",
        )
      : [];
    history.value = validItems;
    historyState = validItems;
  }

  function save() {
    setStorageItem(STORAGE_KEY, history.value);
  }

  function addToHistory(query: string, label?: string) {
    if (!query.trim()) return;

    // Deduplicate - remove existing matching query
    const existingIndex = history.value.findIndex((h) => h.query === query);
    if (existingIndex !== -1) {
      history.value.splice(existingIndex, 1);
    }

    // Add to beginning
    const item: HistoryItem = {
      id: crypto.randomUUID(),
      query,
      timestamp: Date.now(),
      label,
    };

    history.value.unshift(item);

    // Trim to max
    if (history.value.length > MAX_HISTORY) {
      history.value = history.value.slice(0, MAX_HISTORY);
    }

    save();
  }

  function removeFromHistory(id: string) {
    const idx = history.value.findIndex((h) => h.id === id);
    if (idx !== -1) {
      history.value.splice(idx, 1);
      save();
    }
  }

  function clearHistory() {
    history.value = [];
    save();
  }

  function updateLabel(id: string, label: string) {
    const item = history.value.find((h) => h.id === id);
    if (item) {
      item.label = label;
      save();
    }
  }

  return {
    history,
    initialize,
    addToHistory,
    removeFromHistory,
    clearHistory,
    updateLabel,
  };
}

// Dork Templates/Presets
export interface DorkTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  query: string;
  icon: string;
}

export const DORK_TEMPLATES: DorkTemplate[] = [
  // Research & Evidence
  {
    id: "research-pdf",
    name: "Academic Research PDFs",
    description: "Find peer-reviewed research papers and academic PDFs",
    category: "Research",
    query:
      'site:edu.au OR site:gov.au filetype:pdf "harm reduction" OR "drug policy"',
    icon: "📚",
  },
  {
    id: "govt-reports",
    name: "Government Reports",
    description: "Official government policy documents and reports",
    category: "Research",
    query: 'site:*.gov.au filetype:pdf "strategy" OR "policy" OR "framework"',
    icon: "🏛️",
  },
  {
    id: "clinical-guidelines",
    name: "Clinical Guidelines",
    description: "Find clinical practice guidelines and treatment protocols",
    category: "Research",
    query:
      'site:health.gov.au OR site:racgp.org.au "clinical guidelines" OR "treatment protocol"',
    icon: "⚕️",
  },

  // Drug Information
  {
    id: "drug-alerts",
    name: "Drug Alerts & Warnings",
    description: "Find recent drug alerts and safety warnings",
    category: "Drug Info",
    query:
      '"drug alert" OR "drug warning" OR "high strength" site:*.au after:2024',
    icon: "⚠️",
  },
  {
    id: "pill-testing",
    name: "Pill Testing / Drug Checking",
    description: "Find information about drug checking services",
    category: "Drug Info",
    query: '"drug checking" OR "pill testing" site:*.au',
    icon: "💊",
  },
  {
    id: "naloxone-programs",
    name: "Naloxone Programs",
    description: "Find naloxone distribution and training programs",
    category: "Drug Info",
    query:
      'site:*.au "take home naloxone" OR "naloxone program" OR "opioid overdose"',
    icon: "💉",
  },

  // Services & Support
  {
    id: "service-directories",
    name: "Service Directories",
    description: "Find directories of harm reduction and AOD services",
    category: "Services",
    query:
      'site:*.au "service directory" OR "find a service" "drug" OR "alcohol"',
    icon: "📍",
  },
  {
    id: "peer-support",
    name: "Peer Support Services",
    description: "Find peer worker and lived experience support services",
    category: "Services",
    query:
      'site:*.au "peer worker" OR "peer support" OR "lived experience" "drug" OR "AOD"',
    icon: "🤝",
  },
  {
    id: "nsp-locations",
    name: "NSP Locations",
    description: "Find needle and syringe program locations",
    category: "Services",
    query:
      'site:*.au "needle syringe program" OR "NSP" OR "fitpack" location OR directory',
    icon: "📌",
  },

  // Policy & Advocacy
  {
    id: "policy-submissions",
    name: "Policy Submissions",
    description: "Find submissions to government inquiries",
    category: "Policy",
    query:
      'site:*.au "submission" "inquiry" "drug" OR "harm reduction" filetype:pdf',
    icon: "📝",
  },
  {
    id: "legislation",
    name: "Drug Legislation",
    description: "Find drug-related legislation and acts",
    category: "Policy",
    query:
      'site:legislation.gov.au "drug" OR "controlled substance" OR "poison"',
    icon: "⚖️",
  },
  {
    id: "strategy-docs",
    name: "National Strategies",
    description: "Find national drug and alcohol strategy documents",
    category: "Policy",
    query:
      'site:*.gov.au "national drug strategy" OR "alcohol strategy" filetype:pdf',
    icon: "📊",
  },

  // Education & Training
  {
    id: "training-resources",
    name: "Training Resources",
    description: "Find workforce training and education materials",
    category: "Education",
    query:
      'site:*.au "training" OR "workforce development" "harm reduction" OR "AOD"',
    icon: "🎓",
  },
  {
    id: "factsheets",
    name: "Factsheets & Info Sheets",
    description: "Find educational factsheets and information materials",
    category: "Education",
    query:
      'site:*.au "fact sheet" OR "factsheet" OR "information sheet" drug filetype:pdf',
    icon: "📄",
  },

  // International
  {
    id: "international-best-practice",
    name: "International Best Practice",
    description: "Find international examples and best practices",
    category: "International",
    query:
      '"harm reduction" "best practice" OR "evidence" site:who.int OR site:unodc.org',
    icon: "🌍",
  },
  {
    id: "decrim-models",
    name: "Decriminalization Models",
    description: "Find information about drug decriminalization approaches",
    category: "International",
    query:
      '"decriminalisation" OR "decriminalization" "drug" "Portugal" OR "Oregon" OR "model"',
    icon: "🔓",
  },

  // Data & Statistics
  {
    id: "overdose-data",
    name: "Overdose Statistics",
    description: "Find overdose data and mortality statistics",
    category: "Data",
    query:
      'site:*.gov.au "overdose" "deaths" OR "mortality" "drug" filetype:pdf after:2022',
    icon: "📈",
  },
  {
    id: "aihw-data",
    name: "AIHW Drug Data",
    description: "Australian Institute of Health and Welfare drug statistics",
    category: "Data",
    query: 'site:aihw.gov.au "drug" OR "alcohol" "statistics" OR "data"',
    icon: "📊",
  },

  // User-Hosted Content
  {
    id: "user-blogs",
    name: "Blogs & Newsletters",
    description:
      "Find harm reduction content on blogs and newsletter platforms",
    category: "User Content",
    query:
      '(site:*.wordpress.com OR site:medium.com OR site:*.substack.com) "harm reduction"',
    icon: "✍️",
  },
  {
    id: "user-docs",
    name: "Community Documentation",
    description:
      "Find guides and resource directories on documentation platforms",
    category: "User Content",
    query:
      '(site:*.notion.site OR site:*.gitbook.io) ("harm reduction" OR "drug checking") (guide OR resources)',
    icon: "📚",
  },
  {
    id: "user-reddit",
    name: "Reddit Discussions",
    description: "Find community discussions and lived experience on Reddit",
    category: "User Content",
    query:
      'site:reddit.com ("harm reduction" OR "naloxone" OR "drug checking") -r/politics',
    icon: "💬",
  },
  {
    id: "user-files",
    name: "Shared Files & Training",
    description:
      "Find training materials and resources on file hosting platforms",
    category: "User Content",
    query:
      '(site:drive.google.com OR site:dropbox.com OR site:speakerdeck.com) "harm reduction" (training OR guide)',
    icon: "📁",
  },
  {
    id: "user-research",
    name: "Research Data Repositories",
    description: "Find datasets and research outputs on academic repositories",
    category: "User Content",
    query:
      '(site:zenodo.org OR site:osf.io OR site:kaggle.com) ("harm reduction" OR "drug policy") data',
    icon: "🔬",
  },
  {
    id: "user-comprehensive",
    name: "All User Platforms",
    description: "Comprehensive search across all major user-hosted platforms",
    category: "User Content",
    query:
      '(site:*.notion.site OR site:*.gitbook.io OR site:*.wordpress.com OR site:medium.com OR site:*.substack.com OR site:reddit.com) "harm reduction"',
    icon: "🌐",
  },
];

export function getTemplatesByCategory(): Record<string, DorkTemplate[]> {
  const byCategory: Record<string, DorkTemplate[]> = {};
  DORK_TEMPLATES.forEach((t) => {
    if (!byCategory[t.category]) byCategory[t.category] = [];
    byCategory[t.category].push(t);
  });
  return byCategory;
}
