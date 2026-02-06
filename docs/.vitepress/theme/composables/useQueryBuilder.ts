import { reactive, computed } from "vue";
import { SYNONYM_GROUPS, findSynonyms } from "../data/synonyms";

export type BlockType =
  | "site"
  | "filetype"
  | "keyword"
  | "date"
  | "ext"
  | "intitle"
  | "allintitle"
  | "inurl"
  | "allinurl"
  | "intext"
  | "allintext"
  | "inanchor"
  | "allinanchor"
  | "related"
  | "cache"
  | "source"
  | "imagesize"
  | "info"
  | "link"
  | "define"
  | "weather"
  | "stocks"
  | "map"
  | "daterange"
  | "around"
  | "exclude"
  | "or"
  | "exact"
  | "wildcard";

// Type-safe options for different block types
export interface BlockOptions {
  // site
  wildcard?: boolean;
  // keyword
  useSynonyms?: boolean;
  exact?: boolean;
  // date
  type?: "after" | "before";
  // imagesize
  width?: string;
  height?: string;
  // daterange
  start?: string;
  end?: string;
  // around
  termA?: string;
  termB?: string;
  distance?: number;
}

export interface QueryBlock {
  id: string;
  type: BlockType;
  value: string;
  options: BlockOptions;
}

interface BuilderState {
  blocks: QueryBlock[];
  selectedBlockId: string | null;
}

let builderState: BuilderState | null = null;
let blockIdCounter = 0;
const MAX_QUERY_LENGTH = 2000;
const MAX_BLOCK_ID = 10000; // Reset counter when it gets too high

export function useQueryBuilder() {
  if (!builderState) {
    builderState = reactive<BuilderState>({
      blocks: [],
      selectedBlockId: null,
    });
  }

  const state = builderState;

  // Reset counter if it gets too high to prevent unbounded growth
  if (blockIdCounter >= MAX_BLOCK_ID) {
    blockIdCounter = 0;
  }

  // Block types that follow the simple "operator:value" pattern
  const SIMPLE_OPERATOR_TYPES = new Set<BlockType>([
    "filetype",
    "ext",
    "intitle",
    "allintitle",
    "inurl",
    "allinurl",
    "intext",
    "allintext",
    "inanchor",
    "allinanchor",
    "related",
    "cache",
    "source",
    "info",
    "link",
    "define",
    "weather",
    "stocks",
    "map",
  ]);

  // Generate query string from blocks
  const queryString = computed(() => {
    return state.blocks
      .map((block) => {
        // Handle simple operator:value types in one place
        if (SIMPLE_OPERATOR_TYPES.has(block.type)) {
          return block.value ? `${block.type}:${block.value}` : "";
        }

        switch (block.type) {
          case "site": {
            const wildcard = block.options.wildcard ? "*." : "";
            return `site:${wildcard}${block.value}`;
          }
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
          case "imagesize":
            if (block.options.width && block.options.height) {
              return `imagesize:${block.options.width}x${block.options.height}`;
            }
            return block.value ? `imagesize:${block.value}` : "";
          case "daterange": {
            const start = block.options.start || "";
            const end = block.options.end || "";
            if (start && end) return `daterange:${start}-${end}`;
            return block.value ? `daterange:${block.value}` : "";
          }
          case "around": {
            const termA = block.options.termA || "";
            const termB = block.options.termB || "";
            const distance = block.options.distance || 5;
            if (termA && termB) {
              return `"${termA}" AROUND(${distance}) "${termB}"`;
            }
            return block.value || "";
          }
          case "exclude":
            if (!block.value) return "";
            if (block.options.exact) return `-"${block.value}"`;
            return `-${block.value}`;
          case "or": {
            const termA = block.options.termA || "";
            const termB = block.options.termB || "";
            if (termA && termB) return `(${termA} OR ${termB})`;
            return block.value || "";
          }
          case "exact":
            return block.value ? `"${block.value}"` : "";
          case "wildcard":
            return block.value || "*";
          default:
            return block.value;
        }
      })
      .filter((s) => s.length > 0)
      .join(" ");
  });

  function addBlock(type: BlockType, value = "", options: BlockOptions = {}) {
    const defaults: BlockOptions = {};
    if (type === "around") defaults.distance = 5;
    if (type === "date") defaults.type = "after";
    if (type === "exclude") defaults.exact = false;
    if (type === "imagesize") {
      defaults.width = "";
      defaults.height = "";
    }
    if (type === "or") {
      defaults.termA = "";
      defaults.termB = "";
    }
    const id = `block-${++blockIdCounter}`;
    state.blocks.push({
      id,
      type,
      value,
      options: { ...defaults, ...options },
    });
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

  function moveBlock(id: string, direction: "up" | "down") {
    const idx = state.blocks.findIndex((b) => b.id === id);
    if (idx === -1) return;
    const targetIdx = direction === "up" ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= state.blocks.length) return;
    const temp = state.blocks[idx];
    state.blocks[idx] = state.blocks[targetIdx];
    state.blocks[targetIdx] = temp;
  }

  function clearBlocks() {
    state.blocks = [];
    state.selectedBlockId = null;
  }

  function loadFromQuery(query: string) {
    if (!query) return;
    if (query.length > MAX_QUERY_LENGTH) return;
    clearBlocks();

    const operatorList =
      "site|filetype|ext|intitle|allintitle|inurl|allinurl|intext|allintext|inanchor|allinanchor|after|before|daterange|cache|related|info|link|define|source|weather|stocks|map|imagesize";
    const operatorStripRegex = new RegExp(
      `\\b(?:${operatorList}):[^\\s]+`,
      "gi",
    );

    const readOperatorValue = (operator: string) => {
      // Match operator value: either a quoted string or non-whitespace characters
      const regex = new RegExp(`${operator}:("[^"]*"|[^\\s]+)`, "i");
      const match = query.match(regex);
      if (!match) return null;
      const value = match[1].trim();
      // Remove surrounding quotes if present
      return value.startsWith('"') && value.endsWith('"')
        ? value.slice(1, -1)
        : value;
    };

    // Parse site:
    const siteMatch = query.match(/site:(\*\.)?([^\s]+)/i);
    if (siteMatch) {
      addBlock("site", siteMatch[2], { wildcard: !!siteMatch[1] });
    }

    // Parse filetype/ext
    const filetypeMatch = query.match(/filetype:([^\s]+)/i);
    if (filetypeMatch) {
      addBlock("filetype", filetypeMatch[1]);
    }
    const extMatch = query.match(/ext:([^\s]+)/i);
    if (extMatch) {
      addBlock("ext", extMatch[1]);
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

    // Parse remaining operators via readOperatorValue
    const parsableOperators: BlockType[] = [
      "intitle",
      "allintitle",
      "inurl",
      "allinurl",
      "intext",
      "allintext",
      "inanchor",
      "allinanchor",
      "related",
      "cache",
      "source",
      "imagesize",
      "info",
      "link",
      "define",
      "weather",
      "stocks",
      "map",
      "daterange",
    ];
    for (const op of parsableOperators) {
      const value = readOperatorValue(op);
      if (value) addBlock(op, value);
    }

    // Parse AROUND
    const aroundMatch = query.match(/"([^"]+)"\s+AROUND\((\d+)\)\s+"([^"]+)"/i);
    if (aroundMatch) {
      addBlock("around", "", {
        termA: aroundMatch[1],
        termB: aroundMatch[3],
        distance: Number(aroundMatch[2]),
      });
    }

    // Parse exclusion (first)
    const excludeMatch = query.match(/(^|\s)-("[^"]+"|[^\s]+)/);
    if (excludeMatch) {
      const raw = excludeMatch[2];
      if (raw.startsWith('"')) {
        addBlock("exclude", raw.replace(/(^"|"$)/g, ""), { exact: true });
      } else {
        addBlock("exclude", raw);
      }
    }

    // Extract remaining keywords (rough extraction)
    let keywords = query
      .replace(/site:[^\s]+/gi, "")
      .replace(/filetype:[^\s]+/gi, "")
      .replace(/ext:[^\s]+/gi, "")
      .replace(/after:[^\s]+/gi, "")
      .replace(/before:[^\s]+/gi, "")
      .replace(operatorStripRegex, "")
      .replace(/"[^"]+"\s+AROUND\(\d+\)\s+"[^"]+"/gi, "")
      .replace(/(^|\s)-("[^"]+"|[^\s]+)/g, "")
      .trim();

    if (keywords) {
      addBlock("keyword", keywords, {
        useSynonyms: false,
        exact: keywords.startsWith('"'),
      });
    }
  }

  return {
    blocks: computed(() => state.blocks),
    selectedBlockId: computed(() => state.selectedBlockId),
    selectedBlock: computed(() =>
      state.blocks.find((b) => b.id === state.selectedBlockId),
    ),
    queryString,
    addBlock,
    updateBlock,
    removeBlock,
    moveBlock,
    selectBlock,
    clearBlocks,
    loadFromQuery,
  };
}

/**
 * Reset the builder state completely.
 * Primarily for testing to avoid state pollution between tests.
 * @internal
 */
export function _resetBuilderState(): void {
  builderState = null;
  blockIdCounter = 0;
}
