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
          case "ext":
            return block.value ? `ext:${block.value}` : "";
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
          case "intitle":
            return block.value ? `intitle:${block.value}` : "";
          case "allintitle":
            return block.value ? `allintitle:${block.value}` : "";
          case "inurl":
            return block.value ? `inurl:${block.value}` : "";
          case "allinurl":
            return block.value ? `allinurl:${block.value}` : "";
          case "intext":
            return block.value ? `intext:${block.value}` : "";
          case "allintext":
            return block.value ? `allintext:${block.value}` : "";
          case "inanchor":
            return block.value ? `inanchor:${block.value}` : "";
          case "allinanchor":
            return block.value ? `allinanchor:${block.value}` : "";
          case "related":
            return block.value ? `related:${block.value}` : "";
          case "cache":
            return block.value ? `cache:${block.value}` : "";
          case "source":
            return block.value ? `source:${block.value}` : "";
          case "imagesize":
            if (block.options.width && block.options.height) {
              return `imagesize:${block.options.width}x${block.options.height}`;
            }
            return block.value ? `imagesize:${block.value}` : "";
          case "info":
            return block.value ? `info:${block.value}` : "";
          case "link":
            return block.value ? `link:${block.value}` : "";
          case "define":
            return block.value ? `define:${block.value}` : "";
          case "weather":
            return block.value ? `weather:${block.value}` : "";
          case "stocks":
            return block.value ? `stocks:${block.value}` : "";
          case "map":
            return block.value ? `map:${block.value}` : "";
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
    state.blocks.push({ id, type, value, options: { ...defaults, ...options } });
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
    if (!query) return;
    if (query.length > MAX_QUERY_LENGTH) return;
    clearBlocks();

    const operatorList =
      "site|filetype|ext|intitle|allintitle|inurl|allinurl|intext|allintext|inanchor|allinanchor|after|before|daterange|cache|related|info|link|define|source|weather|stocks|map|imagesize";
    const operatorStripRegex = new RegExp(`\\b(?:${operatorList}):[^\\s]+`, "gi");

    const readOperatorValue = (operator: string) => {
      // Match operator value: either a quoted string or non-whitespace characters
      const regex = new RegExp(`${operator}:("[^"]*"|[^\\s]+)`, "i");
      const match = query.match(regex);
      if (!match) return null;
      const value = match[1].trim();
      // Remove surrounding quotes if present
      return value.startsWith('"') && value.endsWith('"') ? value.slice(1, -1) : value;
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

    // Parse operator values (multi-word compatible)
    const intitleValue = readOperatorValue("intitle");
    if (intitleValue) addBlock("intitle", intitleValue);
    const allintitleValue = readOperatorValue("allintitle");
    if (allintitleValue) addBlock("allintitle", allintitleValue);
    const inurlValue = readOperatorValue("inurl");
    if (inurlValue) addBlock("inurl", inurlValue);
    const allinurlValue = readOperatorValue("allinurl");
    if (allinurlValue) addBlock("allinurl", allinurlValue);
    const intextValue = readOperatorValue("intext");
    if (intextValue) addBlock("intext", intextValue);
    const allintextValue = readOperatorValue("allintext");
    if (allintextValue) addBlock("allintext", allintextValue);
    const inanchorValue = readOperatorValue("inanchor");
    if (inanchorValue) addBlock("inanchor", inanchorValue);
    const allinanchorValue = readOperatorValue("allinanchor");
    if (allinanchorValue) addBlock("allinanchor", allinanchorValue);
    const relatedValue = readOperatorValue("related");
    if (relatedValue) addBlock("related", relatedValue);
    const cacheValue = readOperatorValue("cache");
    if (cacheValue) addBlock("cache", cacheValue);
    const sourceValue = readOperatorValue("source");
    if (sourceValue) addBlock("source", sourceValue);
    const imageValue = readOperatorValue("imagesize");
    if (imageValue) addBlock("imagesize", imageValue);
    const infoValue = readOperatorValue("info");
    if (infoValue) addBlock("info", infoValue);
    const linkValue = readOperatorValue("link");
    if (linkValue) addBlock("link", linkValue);
    const defineValue = readOperatorValue("define");
    if (defineValue) addBlock("define", defineValue);
    const weatherValue = readOperatorValue("weather");
    if (weatherValue) addBlock("weather", weatherValue);
    const stocksValue = readOperatorValue("stocks");
    if (stocksValue) addBlock("stocks", stocksValue);
    const mapValue = readOperatorValue("map");
    if (mapValue) addBlock("map", mapValue);
    const daterangeValue = readOperatorValue("daterange");
    if (daterangeValue) addBlock("daterange", daterangeValue);

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

/**
 * Reset the builder state completely.
 * Primarily for testing to avoid state pollution between tests.
 * @internal
 */
export function _resetBuilderState(): void {
  builderState = null;
  blockIdCounter = 0;
}
