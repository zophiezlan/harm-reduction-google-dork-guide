export type DorkLintSeverity = "error" | "warning";

export interface DorkLintIssue {
  message: string;
  start: number;
  end: number;
  severity: DorkLintSeverity;
}

export const DORK_OPERATORS = [
  "site",
  "filetype",
  "ext",
  "imagesize",
  "intitle",
  "allintitle",
  "inurl",
  "allinurl",
  "intext",
  "allintext",
  "after",
  "before",
  "daterange",
  "cache",
  "related",
  "info",
  "link",
  "inanchor",
  "allinanchor",
  "define",
  "source",
  "weather",
  "stocks",
  "map",
];

const OPERATOR_SET = new Set(DORK_OPERATORS);
const operatorRegex = new RegExp(`\\b(${DORK_OPERATORS.join("|")}):`, "gi");
const operatorTestRegex = new RegExp(`\\b(${DORK_OPERATORS.join("|")}):`, "i");

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

  // Unknown operators
  const anyOperatorRegex = /\b([a-zA-Z][\w-]*):/g;
  let match: RegExpExecArray | null;
  while ((match = anyOperatorRegex.exec(text))) {
    const operator = match[1].toLowerCase();
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

  return issues;
}

export function highlightDorkText(text: string): string {
  let html = escapeHtml(text);

  // Strings first
  html = html.replace(/"([^"]*?)"/g, '<span class="dork-string">"$1"</span>');

  // Operators
  html = html.replace(operatorRegex, '<span class="dork-operator">$1:</span>');

  // AROUND(n) proximity
  html = html.replace(/\bAROUND\(\d+\)\b/gi, '<span class="dork-function">$&</span>');

  // Boolean operators
  html = html.replace(/\b(OR|AND)\b/g, '<span class="dork-boolean">$1</span>');

  // Exclusion operator
  html = html.replace(/(^|\s)-(?=\S)/g, '$1<span class="dork-exclusion">-</span>');

  // Social tags / platform handles
  html = html.replace(/(^|\s)([#@][\w-]+)/g, '$1<span class="dork-tag">$2</span>');

  // Wildcards
  html = html.replace(/\*/g, '<span class="dork-wildcard">*</span>');

  // Parentheses
  html = html.replace(/[()]/g, '<span class="dork-paren">$&</span>');

  return html;
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
