// =============================================================================
// DORK DATA TYPES
// Comprehensive type definitions for the Needle dork system
// =============================================================================

// -----------------------------------------------------------------------------
// Core Enums and Constants
// -----------------------------------------------------------------------------

/** Difficulty level for dorks */
export type DorkDifficulty =
  | "beginner"
  | "intermediate"
  | "advanced"
  | "expert";

/** Search methodology category */
export type DorkMethodology =
  | "broad-to-narrow" // Start wide, filter down
  | "triangulation" // Multiple source verification
  | "monitoring" // Ongoing alerts/tracking
  | "verification" // Fact-checking/validation
  | "discovery" // Finding hidden/buried content
  | "peer-centered" // Community/lived experience focus
  | "temporal" // Time-based analysis
  | "comparative"; // Cross-jurisdiction comparison

/** Document/content type targeted */
export type ContentType =
  | "pdf"
  | "doc"
  | "xls"
  | "ppt"
  | "html"
  | "news"
  | "image"
  | "video"
  | "dataset"
  | "any";

/** Domain category */
export type DomainCategory =
  | "government"
  | "health"
  | "education"
  | "research"
  | "ngo"
  | "news"
  | "community"
  | "international"
  | "user-hosted"
  | "any";

/** Search operators */
export type DorkOperator =
  | "site"
  | "filetype"
  | "ext"
  | "intitle"
  | "allintitle"
  | "inurl"
  | "allinurl"
  | "intext"
  | "allintext"
  | "inanchor"
  | "allinanchor"
  | "after"
  | "before"
  | "daterange"
  | "cache"
  | "related"
  | "info"
  | "link"
  | "define"
  | "source"
  | "location"
  | "weather"
  | "stocks"
  | "map"
  | "imagesize"
  | "AROUND";

/** Source file type for extracted dorks */
export type SourceType =
  | "dork-pack" // Primary dork packs
  | "documentation" // Core/advanced operator docs
  | "workflow" // Workflow guides
  | "tool" // Tool guides
  | "resource" // Reference materials
  | "template"; // Templates

// -----------------------------------------------------------------------------
// Core Dork Interface (Enhanced)
// -----------------------------------------------------------------------------

export interface Dork {
  /** Unique identifier (pack-id + slugified title) */
  id: string;

  /** Display title */
  title: string;

  /** Category within the pack (e.g., "Basic Queries", "Advanced Queries") */
  category: string;

  /** The actual dork query */
  query: string;

  /** Explanation of why/how the dork works */
  explanation: string;

  // --- Enhanced Metadata ---

  /** Difficulty level */
  difficulty?: DorkDifficulty;

  /** Search methodology this dork belongs to */
  methodology?: DorkMethodology;

  /** Operators used in this dork */
  operators?: DorkOperator[];

  /** Target content type */
  contentType?: ContentType;

  /** Target domain category */
  domainCategory?: DomainCategory;

  /** Specific domains targeted (extracted from site: operators) */
  targetDomains?: string[];

  /** Use case tags */
  tags?: string[];

  /** Related dork IDs for alternatives/variations */
  relatedDorks?: string[];

  /** Alternative query variations */
  alternateQueries?: string[];

  /** Performance/usage notes */
  performanceNote?: string;

  /** When the dork was last verified as working */
  lastVerified?: string;

  /** Source file this was extracted from */
  sourceFile?: string;

  /** Source type */
  sourceType?: SourceType;

  /** Line number in source file */
  sourceLine?: number;

  /** Whether this is a template/starter dork */
  isTemplate?: boolean;

  /** Icon for display (emoji) */
  icon?: string;
}

// -----------------------------------------------------------------------------
// Dork Pack Interface (Enhanced)
// -----------------------------------------------------------------------------

export interface DorkPack {
  /** Unique pack identifier (filename without extension) */
  id: string;

  /** Display title */
  title: string;

  /** Pack description */
  description: string;

  /** Dorks in this pack */
  dorks: Dork[];

  // --- Enhanced Metadata ---

  /** Pack-level tags */
  tags?: string[];

  /** Primary methodology for this pack */
  methodology?: DorkMethodology;

  /** Target audience */
  audience?: string[];

  /** Related pack IDs */
  relatedPacks?: string[];

  /** Source file path */
  sourceFile?: string;

  /** Icon for display */
  icon?: string;

  /** Sort order for display */
  sortOrder?: number;
}

// -----------------------------------------------------------------------------
// Workflow Types
// -----------------------------------------------------------------------------

export interface WorkflowStep {
  /** Step number */
  step: number;

  /** Step title */
  title: string;

  /** Step description */
  description: string;

  /** Dork query for this step */
  query: string;

  /** Explanation of this step */
  explanation?: string;

  /** Tips for this step */
  tips?: string[];
}

export interface DorkWorkflow {
  /** Unique workflow identifier */
  id: string;

  /** Display title */
  title: string;

  /** Workflow description */
  description: string;

  /** Methodology type */
  methodology: DorkMethodology;

  /** Ordered steps */
  steps: WorkflowStep[];

  /** When to use this workflow */
  whenToUse?: string[];

  /** Example use case */
  example?: string;

  /** Source file */
  sourceFile?: string;

  /** Icon */
  icon?: string;
}

// -----------------------------------------------------------------------------
// Template Types
// -----------------------------------------------------------------------------

export interface DorkTemplate {
  /** Unique template identifier */
  id: string;

  /** Display name */
  name: string;

  /** Description */
  description: string;

  /** Category for grouping */
  category: string;

  /** The template query */
  query: string;

  /** Icon */
  icon: string;

  /** Difficulty level */
  difficulty?: DorkDifficulty;

  /** Tags */
  tags?: string[];

  /** Variables that can be substituted (e.g., "[substance]") */
  variables?: string[];

  /** Example substitutions */
  examples?: Record<string, string>;
}

// -----------------------------------------------------------------------------
// Synonym/Block Types
// -----------------------------------------------------------------------------

export interface SynonymBlock {
  /** Block identifier */
  id: string;

  /** Display name */
  name: string;

  /** The OR-joined terms */
  terms: string[];

  /** Category */
  category: string;

  /** Description of what this block covers */
  description?: string;

  /** Usage example */
  example?: string;
}

// -----------------------------------------------------------------------------
// Aggregate Data Types
// -----------------------------------------------------------------------------

export interface DorkDatabase {
  /** All dork packs */
  packs: DorkPack[];

  /** Standalone dorks from documentation */
  documentationDorks: Dork[];

  /** Workflows */
  workflows: DorkWorkflow[];

  /** Templates */
  templates: DorkTemplate[];

  /** Synonym blocks */
  synonyms: SynonymBlock[];

  /** Metadata */
  meta: {
    /** Build timestamp */
    buildDate: string;

    /** Version */
    version: string;

    /** Total dork count */
    totalDorks: number;

    /** Source files processed */
    sourceFiles: string[];
  };
}

// -----------------------------------------------------------------------------
// Display/UI Types
// -----------------------------------------------------------------------------

export interface DorkWithPack extends Dork {
  /** Pack ID this dork belongs to */
  packId: string;

  /** Pack title for display */
  packTitle: string;
}

export interface DorkSearchResult extends DorkWithPack {
  /** Search relevance score */
  score?: number;

  /** Matched terms for highlighting */
  matchedTerms?: string[];
}

export interface DorkStats {
  /** Total dorks */
  total: number;

  /** Dorks by pack */
  byPack: Record<string, number>;

  /** Dorks by difficulty */
  byDifficulty: Record<DorkDifficulty, number>;

  /** Dorks by methodology */
  byMethodology: Record<DorkMethodology, number>;

  /** Dorks by operator */
  byOperator: Record<string, number>;

  /** Dorks by domain category */
  byDomainCategory: Record<DomainCategory, number>;
}

// -----------------------------------------------------------------------------
// Syntax/Linting Types
// -----------------------------------------------------------------------------

export interface DorkLintError {
  /** Error type */
  type:
    | "unbalanced-quotes"
    | "unbalanced-parens"
    | "unknown-operator"
    | "empty-value"
    | "invalid-date"
    | "invalid-imagesize"
    | "around-misuse"
    | "performance-warning"
    | "redundant-operator"
    | "conflicting-operators";

  /** Error message */
  message: string;

  /** Severity */
  severity: "error" | "warning" | "info";

  /** Character position */
  position?: number;

  /** Suggested fix */
  suggestion?: string;
}

export interface DorkParseResult {
  /** Parsed operators */
  operators: Array<{
    operator: DorkOperator;
    value: string;
    negated: boolean;
    position: number;
  }>;

  /** Free text terms */
  freeText: string[];

  /** Boolean operators used */
  booleans: Array<{
    type: "OR" | "AND";
    position: number;
  }>;

  /** Parentheses groups */
  groups: Array<{
    content: string;
    position: number;
  }>;

  /** Lint errors/warnings */
  errors: DorkLintError[];

  /** Estimated result volume */
  estimatedVolume?: "low" | "medium" | "high" | "very-high";
}

// -----------------------------------------------------------------------------
// Legacy Compatibility (keep old exports working)
// -----------------------------------------------------------------------------

// Re-export for backwards compatibility
export type { Dork as DorkBasic };
export type { DorkPack as DorkPackBasic };
