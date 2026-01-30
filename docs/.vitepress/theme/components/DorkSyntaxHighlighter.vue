<!-- docs/.vitepress/theme/components/DorkSyntaxHighlighter.vue -->
<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

// DorkScript syntax patterns
const PATTERNS = [
  // Operators with colons - match operator: and capture the value
  {
    regex:
      /\b(site|filetype|ext|intitle|allintitle|inurl|allinurl|intext|allintext|after|before|daterange|cache|related|info|link|inanchor|allinanchor|define|weather|stocks|map):/gi,
    class: "dork-operator",
  },
  // Boolean operators
  { regex: /\b(OR|AND)\b/g, class: "dork-boolean" },
  // Exclusion operator (must be at start of word)
  { regex: /(?<=^|\s)-(?=\S)/g, class: "dork-exclusion" },
  // Wildcards
  { regex: /\*/g, class: "dork-wildcard" },
  // Quoted strings - must be done carefully to not break HTML
  { regex: /"([^"]*?)"/g, class: "dork-string", replace: '<span class="dork-string">"$1"</span>' },
  // Parentheses
  { regex: /[()]/g, class: "dork-paren" },
];

// Check if code looks like a dork query
function isDorkQuery(text: string): boolean {
  const indicators = [
    "site:",
    "filetype:",
    "intitle:",
    "inurl:",
    "intext:",
    "after:",
    "before:",
    "cache:",
    "related:",
    "ext:",
    " OR ",
  ];
  return indicators.some((ind) => text.includes(ind));
}

// Highlight dork syntax in a code element
function highlightDork(codeEl: HTMLElement) {
  const text = codeEl.textContent || "";

  if (!isDorkQuery(text)) return;

  // Mark the parent as a dork block for CSS
  const parent = codeEl.closest('div[class*="language-"]');
  if (parent) {
    parent.classList.add("language-dork");
  }

  let html = escapeHtml(text);

  // Apply highlighting patterns
  // Strings first (special handling)
  html = html.replace(/"([^"]*?)"/g, '<span class="dork-string">"$1"</span>');

  // Operators
  html = html.replace(
    /\b(site|filetype|ext|intitle|allintitle|inurl|allinurl|intext|allintext|after|before|daterange|cache|related|info|link|inanchor|allinanchor|define|weather|stocks|map):/gi,
    '<span class="dork-operator">$1:</span>'
  );

  // Boolean operators
  html = html.replace(/\b(OR|AND)\b/g, '<span class="dork-boolean">$1</span>');

  // Exclusion (negative) operator
  html = html.replace(/(^|\s)-(?=\S)/g, '$1<span class="dork-exclusion">-</span>');

  // Wildcards
  html = html.replace(/\*/g, '<span class="dork-wildcard">*</span>');

  // Parentheses
  html = html.replace(/\(/g, '<span class="dork-paren">(</span>');
  html = html.replace(/\)/g, '<span class="dork-paren">)</span>');

  codeEl.innerHTML = html;
}

function escapeHtml(text: string): string {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function highlightAllDorks() {
  // Find all txt/text code blocks
  const codeBlocks = document.querySelectorAll(
    'div[class*="language-txt"] code, div[class*="language-text"] code'
  );

  codeBlocks.forEach((code) => {
    // Skip if already highlighted
    if (code.querySelector(".dork-operator")) return;
    highlightDork(code as HTMLElement);
  });
}

let observer: MutationObserver | null = null;

onMounted(() => {
  // Initial highlighting
  setTimeout(highlightAllDorks, 100);

  // Re-highlight on DOM changes (SPA navigation)
  observer = new MutationObserver(() => {
    setTimeout(highlightAllDorks, 100);
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>

<template>
  <div style="display: none"></div>
</template>

<style>
/* DorkScript Syntax Highlighting */
.language-dork code,
div[class*="language-txt"].language-dork code {
  color: var(--text-primary);
}

/* Operators (site:, filetype:, etc.) */
.dork-operator {
  color: #14b8a6;
  font-weight: 600;
}

/* Boolean operators (OR, AND) */
.dork-boolean {
  color: #ef4444;
  font-weight: 700;
}

/* Exclusion operator (-) */
.dork-exclusion {
  color: #ef4444;
  font-weight: 700;
}

/* Quoted strings */
.dork-string {
  color: #84cc16;
}

/* Wildcards (*) */
.dork-wildcard {
  color: #f43f5e;
  font-weight: 700;
}

/* Parentheses */
.dork-paren {
  color: #a78bfa;
  font-weight: 600;
}

/* Add a subtle indicator that this is a dork query */
.language-dork::before {
  content: "dork" !important;
  color: var(--accent) !important;
}
</style>
