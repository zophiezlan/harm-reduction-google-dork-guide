import { reactive, watch } from "vue";
import { getStorageItemSimple, setStorageItem } from "../utils/storage";

// Debounce helper for storage writes
let saveTimeout: ReturnType<typeof setTimeout> | null = null;
function debouncedSave(items: FavoriteItem[]) {
  if (saveTimeout) clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    setStorageItem("favorites", items);
  }, 300);
}

export interface FavoriteItem {
  id: string;
  packId: string;
  title: string;
  query: string;
  addedAt: number;
}

interface FavoritesState {
  items: FavoriteItem[];
}

// Maximum number of favorites to prevent unbounded growth
const MAX_FAVORITES = 500;

let favoritesState: FavoritesState | null = null;

/**
 * Generate a unique ID for a favorite item
 */
function generateFavoriteId(packId: string, title: string): string {
  return `${packId}-${title.toLowerCase().replace(/\s+/g, "-")}`;
}

export function useFavorites() {
  if (!favoritesState) {
    favoritesState = reactive<FavoritesState>({
      items: [],
    });
  }

  const state = favoritesState;

  function initialize() {
    const saved = getStorageItemSimple<FavoriteItem[]>("favorites", []);
    // Validate that saved items have all required properties
    const validItems = Array.isArray(saved)
      ? saved
          .filter(
            (item): item is FavoriteItem =>
              typeof item === "object" &&
              item !== null &&
              typeof item.id === "string" &&
              typeof item.packId === "string" &&
              typeof item.title === "string" &&
              typeof item.query === "string" &&
              typeof item.addedAt === "number"
          )
          .slice(0, MAX_FAVORITES) // Enforce max limit
      : [];
    state.items = validItems;
  }

  watch(
    () => state.items,
    (items) => {
      debouncedSave([...items]); // Clone to capture current state
    },
    { deep: true }
  );

  function addFavorite(packId: string, title: string, query: string): boolean {
    const id = generateFavoriteId(packId, title);
    if (state.items.some((f) => f.id === id)) return false; // Already exists
    if (state.items.length >= MAX_FAVORITES) return false; // At limit
    state.items.push({
      id,
      packId,
      title,
      query,
      addedAt: Date.now(),
    });
    return true;
  }

  function removeFavorite(id: string) {
    const idx = state.items.findIndex((f) => f.id === id);
    if (idx !== -1) {
      state.items.splice(idx, 1);
    }
  }

  function isFavorite(packId: string, title: string): boolean {
    const id = generateFavoriteId(packId, title);
    return state.items.some((f) => f.id === id);
  }

  function toggleFavorite(packId: string, title: string, query: string): boolean {
    if (isFavorite(packId, title)) {
      const id = generateFavoriteId(packId, title);
      removeFavorite(id);
      return false; // Was removed
    } else {
      return addFavorite(packId, title, query); // Returns true if added
    }
  }

  function isAtLimit(): boolean {
    return state.items.length >= MAX_FAVORITES;
  }

  function clearFavorites() {
    state.items = [];
  }

  return {
    favorites: state.items,
    initialize,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
    isAtLimit,
    clearFavorites,
  };
}
