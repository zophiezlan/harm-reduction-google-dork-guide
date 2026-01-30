import { reactive, computed } from "vue";
import { SYNONYM_GROUPS, findSynonyms } from "../data/synonyms";

export type BlockType = "site" | "filetype" | "keyword" | "date" | "trick";

export interface QueryBlock {
  id: string;
  type: BlockType;
  value: string;
  options: Record<string, any>;
}

interface BuilderState {
  blocks: QueryBlock[];
  selectedBlockId: string | null;
}

let builderState: BuilderState | null = null;
let blockIdCounter = 0;

export function useQueryBuilder() {
  if (!builderState) {
    builderState = reactive<BuilderState>({
      blocks: [],
      selectedBlockId: null,
    });
  }

  const state = builderState;

  // Generate query string from blocks
  const queryString = computed(() => {
    return state.blocks
      .map((block) => {
        switch (block.type) {
          case "site":
            const wildcard = block.options.wildcard ? "*." : "";
            return `site:${wildcard}${block.value}`;
          case "filetype":
            return `filetype:${block.value}`;
          case "keyword":
            if (block.options.useSynonyms) {
              const group = findSynonyms(block.value);
              if (group) return group.pattern;
            }
            if (block.options.exact) return `"${block.value}"`;
            return block.value;
          case "date":
            if (block.options.type === "after") return `after:${block.value}`;
            if (block.options.type === "before") return `before:${block.value}`;
            return "";
          case "trick":
            return block.value;
          default:
            return block.value;
        }
      })
      .filter((s) => s.length > 0)
      .join(" ");
  });

  function addBlock(type: BlockType, value = "", options: Record<string, any> = {}) {
    const id = `block-${++blockIdCounter}`;
    state.blocks.push({ id, type, value, options });
    state.selectedBlockId = id;
    return id;
  }

  function updateBlock(id: string, updates: Partial<Omit<QueryBlock, "id">>) {
    const block = state.blocks.find((b) => b.id === id);
    if (block) {
      Object.assign(block, updates);
    }
  }

  function removeBlock(id: string) {
    const idx = state.blocks.findIndex((b) => b.id === id);
    if (idx !== -1) {
      state.blocks.splice(idx, 1);
      if (state.selectedBlockId === id) {
        state.selectedBlockId = state.blocks[0]?.id || null;
      }
    }
  }

  function selectBlock(id: string | null) {
    state.selectedBlockId = id;
  }

  function clearBlocks() {
    state.blocks = [];
    state.selectedBlockId = null;
  }

  function loadFromQuery(query: string) {
    clearBlocks();

    // Parse site:
    const siteMatch = query.match(/site:(\*\.)?([^\s]+)/i);
    if (siteMatch) {
      addBlock("site", siteMatch[2], { wildcard: !!siteMatch[1] });
    }

    // Parse filetype:
    const filetypeMatch = query.match(/filetype:([^\s]+)/i);
    if (filetypeMatch) {
      addBlock("filetype", filetypeMatch[1]);
    }

    // Parse after:/before:
    const afterMatch = query.match(/after:([^\s]+)/i);
    if (afterMatch) {
      addBlock("date", afterMatch[1], { type: "after" });
    }
    const beforeMatch = query.match(/before:([^\s]+)/i);
    if (beforeMatch) {
      addBlock("date", beforeMatch[1], { type: "before" });
    }

    // Extract remaining keywords (rough extraction)
    let keywords = query
      .replace(/site:[^\s]+/gi, "")
      .replace(/filetype:[^\s]+/gi, "")
      .replace(/after:[^\s]+/gi, "")
      .replace(/before:[^\s]+/gi, "")
      .trim();

    if (keywords) {
      addBlock("keyword", keywords, { useSynonyms: false, exact: keywords.startsWith('"') });
    }
  }

  return {
    blocks: computed(() => state.blocks),
    selectedBlockId: computed(() => state.selectedBlockId),
    selectedBlock: computed(() => state.blocks.find((b) => b.id === state.selectedBlockId)),
    queryString,
    addBlock,
    updateBlock,
    removeBlock,
    selectBlock,
    clearBlocks,
    loadFromQuery,
  };
}
