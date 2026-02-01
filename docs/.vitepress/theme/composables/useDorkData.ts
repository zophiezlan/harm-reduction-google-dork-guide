import { ref, computed } from "vue";
import type {
  DorkPack,
  Dork,
  DorkWithPack,
  DorkDifficulty,
  DomainCategory,
  DorkOperator,
} from "../data/types";

// Shared state across all instances
const dorkPacks = ref<DorkPack[]>([]);
const documentationDorks = ref<Dork[]>([]);
const isLoaded = ref(false);
const isLoading = ref(false);

// Extended window interface for type safety
declare global {
  interface Window {
    DORK_DATA?: DorkPack[];
    DORK_DOCUMENTATION?: Dork[];
    DORK_META?: {
      buildDate: string;
      version: string;
      totalDorks: number;
      sourceFiles: string[];
    };
  }
}

export interface DorkFilters {
  packs?: string[];
  categories?: string[];
  difficulty?: DorkDifficulty[];
  domainCategory?: DomainCategory[];
  operators?: DorkOperator[];
  tags?: string[];
  includeDocumentation?: boolean;
}

export function useDorkData() {
  async function loadDorks() {
    if (isLoaded.value || isLoading.value) return;
    isLoading.value = true;

    try {
      if (typeof window !== "undefined") {
        // Load pack data
        if (window.DORK_DATA) {
          dorkPacks.value = window.DORK_DATA;
        }
        // Load documentation dorks (new)
        if (window.DORK_DOCUMENTATION) {
          documentationDorks.value = window.DORK_DOCUMENTATION;
        }
        isLoaded.value = true;
      }
    } catch (e) {
      console.error("Failed to load dork data:", e);
    } finally {
      isLoading.value = false;
    }
  }

  // All dorks from packs (with pack metadata attached)
  const packDorks = computed<DorkWithPack[]>(() => {
    return dorkPacks.value.flatMap((pack) =>
      pack.dorks.map((dork) => ({
        ...dork,
        packId: pack.id,
        packTitle: pack.title,
      }))
    );
  });

  // Documentation dorks (from workflows, tools, resources, etc.)
  const docDorks = computed<DorkWithPack[]>(() => {
    return documentationDorks.value.map((dork) => ({
      ...dork,
      packId: "documentation",
      packTitle: "Documentation & Guides",
    }));
  });

  // Combined view of all dorks
  const allDorks = computed<DorkWithPack[]>(() => {
    return [...packDorks.value, ...docDorks.value];
  });

  const packList = computed(() =>
    dorkPacks.value.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      count: p.dorks.length,
    }))
  );

  const categories = computed(() => {
    const cats = new Set<string>();
    allDorks.value.forEach((d) => cats.add(d.category));
    return Array.from(cats).sort();
  });

  // Extract unique difficulty levels
  const difficulties = computed<DorkDifficulty[]>(() => {
    const set = new Set<DorkDifficulty>();
    allDorks.value.forEach((d) => {
      if (d.difficulty) set.add(d.difficulty);
    });
    return ["beginner", "intermediate", "advanced", "expert"].filter((d) =>
      set.has(d as DorkDifficulty)
    ) as DorkDifficulty[];
  });

  // Extract unique domain categories
  const domainCategories = computed<DomainCategory[]>(() => {
    const set = new Set<DomainCategory>();
    allDorks.value.forEach((d) => {
      if (d.domainCategory && d.domainCategory !== "any") {
        set.add(d.domainCategory);
      }
    });
    return Array.from(set).sort();
  });

  // Extract unique operators used
  const operators = computed<string[]>(() => {
    const set = new Set<string>();
    allDorks.value.forEach((d) => {
      d.operators?.forEach((op) => set.add(op));
    });
    return Array.from(set).sort();
  });

  // Extract unique tags
  const allTags = computed<string[]>(() => {
    const set = new Set<string>();
    allDorks.value.forEach((d) => {
      d.tags?.forEach((tag) => set.add(tag));
    });
    return Array.from(set).sort();
  });

  function searchDorks(query: string, filters: DorkFilters = {}): DorkWithPack[] {
    // Start with appropriate dataset
    let results = filters.includeDocumentation !== false ? allDorks.value : packDorks.value;

    // Filter by packs
    if (filters.packs && filters.packs.length > 0) {
      results = results.filter((d) => filters.packs!.includes(d.packId));
    }

    // Filter by categories
    if (filters.categories && filters.categories.length > 0) {
      results = results.filter((d) => filters.categories!.includes(d.category));
    }

    // Filter by difficulty
    if (filters.difficulty && filters.difficulty.length > 0) {
      results = results.filter((d) => d.difficulty && filters.difficulty!.includes(d.difficulty));
    }

    // Filter by domain category
    if (filters.domainCategory && filters.domainCategory.length > 0) {
      results = results.filter(
        (d) => d.domainCategory && filters.domainCategory!.includes(d.domainCategory)
      );
    }

    // Filter by operators
    if (filters.operators && filters.operators.length > 0) {
      results = results.filter(
        (d) => d.operators && filters.operators!.some((op) => d.operators!.includes(op))
      );
    }

    // Filter by tags
    if (filters.tags && filters.tags.length > 0) {
      results = results.filter((d) => d.tags && filters.tags!.some((tag) => d.tags!.includes(tag)));
    }

    // Search query
    if (query.trim()) {
      const lower = query.toLowerCase();
      results = results.filter(
        (d) =>
          d.title.toLowerCase().includes(lower) ||
          d.query.toLowerCase().includes(lower) ||
          d.explanation.toLowerCase().includes(lower) ||
          d.packTitle.toLowerCase().includes(lower) ||
          d.tags?.some((t) => t.toLowerCase().includes(lower))
      );
    }

    return results;
  }

  function getDorksByPack(packId: string): DorkWithPack[] {
    return allDorks.value.filter((d) => d.packId === packId);
  }

  // Get stats about the dork collection
  const stats = computed(() => ({
    total: allDorks.value.length,
    fromPacks: packDorks.value.length,
    fromDocs: docDorks.value.length,
    byDifficulty: difficulties.value.reduce(
      (acc, d) => {
        acc[d] = allDorks.value.filter((dork) => dork.difficulty === d).length;
        return acc;
      },
      {} as Record<DorkDifficulty, number>
    ),
  }));

  return {
    dorkPacks,
    documentationDorks,
    allDorks,
    packDorks,
    docDorks,
    packList,
    categories,
    difficulties,
    domainCategories,
    operators,
    allTags,
    stats,
    isLoaded,
    isLoading,
    loadDorks,
    searchDorks,
    getDorksByPack,
  };
}
