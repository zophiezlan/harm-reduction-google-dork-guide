export type DorkLintSeverity = "error" | "warning" | "info";

export interface DorkLintIssue {
  message: string;
  start: number;
  end: number;
  severity: DorkLintSeverity;
  suggestion?: string;
}

// Categorized operators for semantic highlighting
export const DORK_OPERATORS = [
  // Site/domain operators
  "site",
  "related",
  "cache",
  "info",
  "link",
  // Content operators
  "intitle",
  "allintitle",
  "inurl",
  "allinurl",
  "intext",
  "allintext",
  "inanchor",
  "allinanchor",
  // File operators
  "filetype",
  "ext",
  // Date operators
  "after",
  "before",
  "daterange",
  // Special operators
  "imagesize",
  "define",
  "source",
  "location",
  "weather",
  "stocks",
  "map",
];

// Operator categories for semantic highlighting
const SITE_OPERATORS = new Set(["site", "related", "cache", "info", "link"]);
const FILE_OPERATORS = new Set(["filetype", "ext"]);
const DATE_OPERATORS = new Set(["after", "before", "daterange"]);
const CONTENT_OPERATORS = new Set([
  "intitle",
  "allintitle",
  "inurl",
  "allinurl",
  "intext",
  "allintext",
  "inanchor",
  "allinanchor",
]);
const NUMERIC_OPERATORS = new Set(["imagesize"]);

const OPERATOR_SET = new Set(DORK_OPERATORS);
const operatorRegex = new RegExp(`\\b(${DORK_OPERATORS.join("|")}):`, "gi");
const operatorTestRegex = new RegExp(`\\b(${DORK_OPERATORS.join("|")}):`, "i");
const operatorValueRegex = new RegExp(`^(${DORK_OPERATORS.join("|")}):`, "i");

export function isDorkQuery(text: string): boolean {
  if (operatorTestRegex.test(text)) return true;
  if (/\bAROUND\(\d+\)/i.test(text)) return true;
  if (/[#@][\w-]{2,}/.test(text)) return true;
  if (/(^|\s)[*-](?=\S)/.test(text)) return true;
  return /\b(OR|AND)\b/.test(text);
}

export function lintDorkScript(text: string): DorkLintIssue[] {
  const issues: DorkLintIssue[] = [];

  // Unbalanced quotes
  let openQuoteIndex: number | null = null;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char !== '"') continue;
    const isEscaped = i > 0 && text[i - 1] === "\\";
    if (isEscaped) continue;
    if (openQuoteIndex === null) {
      openQuoteIndex = i;
    } else {
      openQuoteIndex = null;
    }
  }
  if (openQuoteIndex !== null) {
    issues.push({
      message: "Unclosed quote detected",
      start: openQuoteIndex,
      end: openQuoteIndex + 1,
      severity: "error",
    });
  }

  // Unbalanced parentheses
  const parenStack: number[] = [];
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === "(") {
      parenStack.push(i);
    } else if (char === ")") {
      if (parenStack.length === 0) {
        issues.push({
          message: "Unmatched closing parenthesis",
          start: i,
          end: i + 1,
          severity: "error",
        });
      } else {
        parenStack.pop();
      }
    }
  }
  parenStack.forEach((index) => {
    issues.push({
      message: "Unmatched opening parenthesis",
      start: index,
      end: index + 1,
      severity: "error",
    });
  });

  // Unknown operators + counts
  const anyOperatorRegex = /\b([a-zA-Z][\w-]*):/g;
  let match: RegExpExecArray | null;
  const operatorCounts: Record<string, number> = {};
  while ((match = anyOperatorRegex.exec(text))) {
    const operator = match[1].toLowerCase();
    operatorCounts[operator] = (operatorCounts[operator] || 0) + 1;
    if (!OPERATOR_SET.has(operator)) {
      issues.push({
        message: `Unknown operator: ${match[1]}:`,
        start: match.index,
        end: match.index + match[0].length,
        severity: "warning",
      });
    }
  }

  // Empty operator values
  while ((match = operatorRegex.exec(text))) {
    const afterIndex = match.index + match[0].length;
    let cursor = afterIndex;
    while (cursor < text.length && text[cursor] === " ") cursor++;

    const nextChar = text[cursor];
    const nextToken = text.slice(cursor, cursor + 3);

    if (!nextChar || nextChar === ")" || nextToken === "OR " || nextToken === "AND") {
      issues.push({
        message: `Missing value for ${match[1]} operator`,
        start: match.index,
        end: match.index + match[0].length,
        severity: "error",
      });
    }
  }

  // Multiple site/filetype operators (suggest OR grouping)
  if ((operatorCounts.site || 0) > 1 && !/\bOR\b/i.test(text)) {
    issues.push({
      message: "Multiple site: operators detected. Consider grouping with OR.",
      start: 0,
      end: Math.min(5, text.length),
      severity: "warning",
    });
  }
  if ((operatorCounts.filetype || 0) > 1 && !/\bOR\b/i.test(text)) {
    issues.push({
      message: "Multiple filetype: operators detected. Consider grouping with OR.",
      start: 0,
      end: Math.min(5, text.length),
      severity: "warning",
    });
  }

  // Date format validation for after/before
  const dateRegex = /\b(after|before):([^\s)]+)/gi;
  while ((match = dateRegex.exec(text))) {
    const value = match[2];
    if (!/^\d{4}(-\d{2}-\d{2})?$/.test(value)) {
      issues.push({
        message: `Invalid ${match[1]} date format. Use YYYY or YYYY-MM-DD.`,
        start: match.index,
        end: match.index + match[0].length,
        severity: "error",
      });
    }
  }

  // imagesize format validation
  const imageSizeRegex = /\bimagesize:([^\s)]+)/gi;
  while ((match = imageSizeRegex.exec(text))) {
    const value = match[1];
    if (!/^\d{2,5}x\d{2,5}$/i.test(value)) {
      issues.push({
        message: "Invalid imagesize format. Use WIDTHxHEIGHT (e.g., 1920x1080).",
        start: match.index,
        end: match.index + match[0].length,
        severity: "error",
      });
    }
  }

  // AROUND usage
  if (/\bAROUND\b/i.test(text) && !/\bAROUND\(\d+\)/i.test(text)) {
    const idx = text.toLowerCase().indexOf("around");
    if (idx >= 0) {
      issues.push({
        message: "AROUND should include a distance like AROUND(5).",
        start: idx,
        end: Math.min(idx + 6, text.length),
        severity: "warning",
      });
    }
  }

  return issues;
}

/**
 * Get the semantic CSS class for an operator's value
 */
function getOperatorValueClass(operator: string): string {
  const op = operator.toLowerCase();
  if (SITE_OPERATORS.has(op)) return "dork-domain";
  if (FILE_OPERATORS.has(op)) return "dork-filetype";
  if (DATE_OPERATORS.has(op)) return "dork-date";
  if (NUMERIC_OPERATORS.has(op)) return "dork-number";
  if (CONTENT_OPERATORS.has(op)) return "dork-content-value";
  return "dork-value";
}

/**
 * Get the semantic CSS class for an operator itself
 */
function getOperatorClass(operator: string): string {
  const op = operator.toLowerCase();
  if (SITE_OPERATORS.has(op)) return "dork-operator dork-op-site";
  if (FILE_OPERATORS.has(op)) return "dork-operator dork-op-file";
  if (DATE_OPERATORS.has(op)) return "dork-operator dork-op-date";
  if (CONTENT_OPERATORS.has(op)) return "dork-operator dork-op-content";
  return "dork-operator";
}

export function highlightDorkText(text: string): string {
  let result = "";
  let i = 0;

  const take = (len: number) => {
    const chunk = text.slice(i, i + len);
    i += len;
    return chunk;
  };

  while (i < text.length) {
    const rest = text.slice(i);

    // Quoted strings - with semantic distinction
    const stringMatch = rest.match(/^"([^"]*)"/);
    if (stringMatch) {
      const content = stringMatch[1];
      // Check if it looks like an exact phrase vs a value
      const isPhrase = content.includes(" ");
      const cls = isPhrase ? "dork-phrase" : "dork-string";
      result += `<span class="${cls}">${escapeHtml(take(stringMatch[0].length))}</span>`;
      continue;
    }

    // Operators with values
    const operatorMatch = rest.match(operatorValueRegex);
    if (operatorMatch) {
      const op = operatorMatch[1];
      const opClass = getOperatorClass(op);
      result += `<span class="${opClass}">${escapeHtml(take(op.length + 1))}</span>`;

      const valueStart = text.slice(i);
      let value = "";
      if (valueStart.startsWith('"')) {
        const quoted = valueStart.match(/^"[^"]*"/);
        if (quoted) value = quoted[0];
      } else if (valueStart.startsWith("(")) {
        // OR group after operator - parse recursively
        const paren = valueStart.match(/^\([^)]*\)/);
        if (paren) {
          result += `<span class="dork-paren">(</span>`;
          take(1);
          const innerContent = paren[0].slice(1, -1);
          result += highlightDorkText(innerContent);
          take(innerContent.length);
          result += `<span class="dork-paren">)</span>`;
          take(1);
          continue;
        }
      } else {
        const token = valueStart.match(/^[^\s)]+/);
        if (token) value = token[0];
      }

      if (value) {
        const valueClass = getOperatorValueClass(op);
        // Special handling for wildcards within domains
        if (value.includes("*")) {
          const parts = value.split(/(\*)/);
          for (const part of parts) {
            if (part === "*") {
              result += `<span class="dork-wildcard">${escapeHtml(take(1))}</span>`;
            } else if (part) {
              result += `<span class="${valueClass}">${escapeHtml(take(part.length))}</span>`;
            }
          }
        } else {
          result += `<span class="${valueClass}">${escapeHtml(take(value.length))}</span>`;
        }
      }

      continue;
    }

    // AROUND(n) proximity operator
    const aroundMatch = rest.match(/^\bAROUND\s*\(\s*(\d+)\s*\)/i);
    if (aroundMatch) {
      const fullMatch = aroundMatch[0];
      const num = aroundMatch[1];
      const beforeNum = fullMatch.indexOf(num);
      const afterNum = beforeNum + num.length;

      result += `<span class="dork-function">${escapeHtml(take(beforeNum))}</span>`;
      result += `<span class="dork-number">${escapeHtml(take(num.length))}</span>`;
      result += `<span class="dork-function">${escapeHtml(take(fullMatch.length - afterNum))}</span>`;
      continue;
    }

    // Boolean operators
    const booleanMatch = rest.match(/^\b(OR|AND)\b/);
    if (booleanMatch) {
      const boolOp = booleanMatch[1];
      const cls = boolOp === "OR" ? "dork-boolean dork-or" : "dork-boolean dork-and";
      result += `<span class="${cls}">${escapeHtml(take(booleanMatch[0].length))}</span>`;
      continue;
    }

    // Exclusion operator
    const exclusionMatch = rest.match(/^(\s)?-(?=\S)/);
    if (exclusionMatch) {
      if (exclusionMatch[1]) {
        result += escapeHtml(take(1));
      }
      result += `<span class="dork-exclusion">${escapeHtml(take(1))}</span>`;

      const termStart = text.slice(i);
      let term = "";
      if (termStart.startsWith('"')) {
        const quoted = termStart.match(/^"[^"]*"/);
        if (quoted) term = quoted[0];
      } else {
        // Check if it's an excluded operator
        const opMatch = termStart.match(operatorValueRegex);
        if (opMatch) {
          // Recursively highlight the excluded operator
          const fullOp = termStart.match(/^[^\s)]+/);
          if (fullOp) {
            result += `<span class="dork-exclusion-term">${highlightDorkText(fullOp[0])}</span>`;
            take(fullOp[0].length);
            continue;
          }
        }
        const token = termStart.match(/^[^\s)]+/);
        if (token) term = token[0];
      }
      if (term) {
        result += `<span class="dork-exclusion-term">${escapeHtml(take(term.length))}</span>`;
      }
      continue;
    }

    // Hashtags and mentions (social-style)
    const tagMatch = rest.match(/^(\s)?([#@][\w-]+)/);
    if (tagMatch) {
      if (tagMatch[1]) {
        result += escapeHtml(take(1));
      }
      result += `<span class="dork-tag">${escapeHtml(take(tagMatch[2].length))}</span>`;
      continue;
    }

    // Wildcards
    const wildcardMatch = rest.match(/^\*/);
    if (wildcardMatch) {
      result += `<span class="dork-wildcard">${escapeHtml(take(1))}</span>`;
      continue;
    }

    // Parentheses
    const parenMatch = rest.match(/^[()]/);
    if (parenMatch) {
      result += `<span class="dork-paren">${escapeHtml(take(1))}</span>`;
      continue;
    }

    // Pipe separator (used in some synonym blocks)
    if (rest[0] === "|") {
      result += `<span class="dork-pipe">${escapeHtml(take(1))}</span>`;
      continue;
    }

    result += escapeHtml(take(1));
  }

  return result;
}

export function highlightDorkWithLint(text: string, issues: DorkLintIssue[]): string {
  if (!issues.length) return highlightDorkText(text);

  const sorted = [...issues].map((issue) => ({ ...issue })).sort((a, b) => a.start - b.start);

  let result = "";
  let cursor = 0;

  sorted.forEach((issue) => {
    if (issue.start < cursor) return;

    const before = text.slice(cursor, issue.start);
    const flagged = text.slice(issue.start, issue.end);

    result += highlightDorkText(before);
    result += `<span class="dork-error" data-message="${escapeHtml(issue.message)}">${highlightDorkText(flagged)}</span>`;

    cursor = issue.end;
  });

  result += highlightDorkText(text.slice(cursor));

  return result;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
