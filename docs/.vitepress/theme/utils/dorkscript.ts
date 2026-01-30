export type DorkLintSeverity = "error" | "warning";

export interface DorkLintIssue {
  message: string;
  start: number;
  end: number;
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

      const stringMatch = rest.match(/^"[^"]*"/);
      if (stringMatch) {
        result += `<span class="dork-string">${escapeHtml(take(stringMatch[0].length))}</span>`;
        continue;
      }

      const operatorMatch = rest.match(operatorValueRegex);
      if (operatorMatch) {
        const op = operatorMatch[1];
        result += `<span class="dork-operator">${escapeHtml(take(op.length + 1))}</span>`;

        const valueStart = text.slice(i);
        let value = "";
        if (valueStart.startsWith('"')) {
          const quoted = valueStart.match(/^"[^"]*"/);
          if (quoted) value = quoted[0];
        } else if (valueStart.startsWith("(")) {
          const paren = valueStart.match(/^\([^\)]*\)/);
          if (paren) value = paren[0];
        } else {
          const token = valueStart.match(/^[^\s)]+/);
          if (token) value = token[0];
        }

        if (value) {
          const opLower = op.toLowerCase();
          let valueClass = "dork-value";
          if (opLower === "site" || opLower === "related" || opLower === "cache") {
            valueClass = "dork-domain";
          } else if (opLower === "filetype" || opLower === "ext") {
            valueClass = "dork-filetype";
          } else if (opLower === "after" || opLower === "before" || opLower === "daterange") {
            valueClass = "dork-date";
          } else if (opLower === "imagesize") {
            valueClass = "dork-number";
          }

          result += `<span class="${valueClass}">${escapeHtml(take(value.length))}</span>`;
        }

        continue;
      }

      const aroundMatch = rest.match(/^\bAROUND\(\d+\)\b/i);
      if (aroundMatch) {
        result += `<span class="dork-function">${escapeHtml(take(aroundMatch[0].length))}</span>`;
        continue;
      }

      const booleanMatch = rest.match(/^\b(OR|AND)\b/);
      if (booleanMatch) {
        result += `<span class="dork-boolean">${escapeHtml(take(booleanMatch[0].length))}</span>`;
        continue;
      }

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
          const token = termStart.match(/^[^\s)]+/);
          if (token) term = token[0];
        }
        if (term) {
          result += `<span class="dork-exclusion-term">${escapeHtml(take(term.length))}</span>`;
        }
        continue;
      }

      const tagMatch = rest.match(/^(\s)?([#@][\w-]+)/);
      if (tagMatch) {
        if (tagMatch[1]) {
          result += escapeHtml(take(1));
        }
        result += `<span class="dork-tag">${escapeHtml(take(tagMatch[2].length))}</span>`;
        continue;
      }

      const wildcardMatch = rest.match(/^\*/);
      if (wildcardMatch) {
        result += `<span class="dork-wildcard">${escapeHtml(take(1))}</span>`;
        continue;
      }

      const parenMatch = rest.match(/^[()]/);
      if (parenMatch) {
        result += `<span class="dork-paren">${escapeHtml(take(1))}</span>`;
        continue;
      }

      result += escapeHtml(take(1));
    }

    return result;
  }

  export function highlightDorkWithLint(text: string, issues: DorkLintIssue[]): string {
    if (!issues.length) return highlightDorkText(text);

    const sorted = [...issues]
      .map((issue) => ({ ...issue }))
      .sort((a, b) => a.start - b.start);

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
