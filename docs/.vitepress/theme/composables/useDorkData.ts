import { ref, computed } from "vue";
import type { DorkPack, DorkWithPack } from "../data/types";

const dorkPacks = ref<DorkPack[]>([]);
const isLoaded = ref(false);
const isLoading = ref(false);

export function useDorkData() {
  async function loadDorks() {
    if (isLoaded.value || isLoading.value) return;
    isLoading.value = true;

    try {
      // Load from global window object (set by dork-data.js)
      if (typeof window !== "undefined" && (window as any).DORK_DATA) {
        dorkPacks.value = (window as any).DORK_DATA;
        isLoaded.value = true;
      }
    } catch (e) {
      console.error("Failed to load dork data:", e);
    } finally {
      isLoading.value = false;
    }
  }

  const allDorks = computed<DorkWithPack[]>(() => {
    return dorkPacks.value.flatMap((pack) =>
      pack.dorks.map((dork) => ({
        ...dork,
        packId: pack.id,
        packTitle: pack.title,
      }))
    );
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

  function searchDorks(
    query: string,
    filters: {
      packs?: string[];
      categories?: string[];
    } = {}
  ): DorkWithPack[] {
    let results = allDorks.value;

    // Filter by packs
    if (filters.packs && filters.packs.length > 0) {
      results = results.filter((d) => filters.packs!.includes(d.packId));
    }

    // Filter by categories
    if (filters.categories && filters.categories.length > 0) {
      results = results.filter((d) => filters.categories!.includes(d.category));
    }

    // Search query
    if (query.trim()) {
      const lower = query.toLowerCase();
      results = results.filter(
        (d) =>
          d.title.toLowerCase().includes(lower) ||
          d.query.toLowerCase().includes(lower) ||
          d.explanation.toLowerCase().includes(lower) ||
          d.packTitle.toLowerCase().includes(lower)
      );
    }

    return results;
  }

  function getDorksByPack(packId: string): DorkWithPack[] {
    return allDorks.value.filter((d) => d.packId === packId);
  }

  return {
    dorkPacks,
    allDorks,
    packList,
    categories,
    isLoaded,
    isLoading,
    loadDorks,
    searchDorks,
    getDorksByPack,
  };
}
