import { reactive, watch } from "vue";
import { getStorageItem, setStorageItem } from "../utils/storage";

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

let favoritesState: FavoritesState | null = null;

export function useFavorites() {
  if (!favoritesState) {
    favoritesState = reactive<FavoritesState>({
      items: [],
    });
  }

  const state = favoritesState;

  function initialize() {
    const saved = getStorageItem<FavoriteItem[]>("favorites", []);
    state.items = saved;
  }

  watch(
    () => state.items,
    (items) => {
      setStorageItem("favorites", items);
    },
    { deep: true }
  );

  function addFavorite(packId: string, title: string, query: string) {
    const id = `${packId}-${title.toLowerCase().replace(/\s+/g, "-")}`;
    if (state.items.some((f) => f.id === id)) return; // Already exists
    state.items.push({
      id,
      packId,
      title,
      query,
      addedAt: Date.now(),
    });
  }

  function removeFavorite(id: string) {
    const idx = state.items.findIndex((f) => f.id === id);
    if (idx !== -1) {
      state.items.splice(idx, 1);
    }
  }

  function isFavorite(packId: string, title: string): boolean {
    const id = `${packId}-${title.toLowerCase().replace(/\s+/g, "-")}`;
    return state.items.some((f) => f.id === id);
  }

  function toggleFavorite(packId: string, title: string, query: string) {
    if (isFavorite(packId, title)) {
      const id = `${packId}-${title.toLowerCase().replace(/\s+/g, "-")}`;
      removeFavorite(id);
    } else {
      addFavorite(packId, title, query);
    }
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
    clearFavorites,
  };
}
