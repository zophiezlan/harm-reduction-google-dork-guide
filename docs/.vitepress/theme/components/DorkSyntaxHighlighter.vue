<!-- docs/.vitepress/theme/components/DorkSyntaxHighlighter.vue -->
<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { highlightDorkText, isDorkQuery } from "../utils/dorkscript";

// Highlight dork syntax in a code element
function highlightDork(codeEl: HTMLElement) {
  const text = codeEl.textContent || "";

  if (!isDorkQuery(text)) return;

  // Mark the parent as a dork block for CSS
  const parent =
    codeEl.closest('div[class*="language-"]') || codeEl.closest("pre") || codeEl.parentElement;
  parent?.classList.add("language-dork");

  codeEl.innerHTML = highlightDorkText(text);
}

function highlightAllDorks() {
  // Find all code blocks inside docs
  const codeBlocks = document.querySelectorAll(".vp-doc pre code, pre code");

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
  color: #14b8a6 !important;
  font-weight: 600 !important;
}

/* Boolean operators (OR, AND) */
.dork-boolean {
  color: #ef4444 !important;
  font-weight: 700 !important;
}

/* Exclusion operator (-) */
.dork-exclusion {
  color: #ef4444 !important;
  font-weight: 700 !important;
}

/* Quoted strings */
.dork-string {
  color: #84cc16 !important;
}

/* Wildcards (*) */
.dork-wildcard {
  color: #f43f5e !important;
  font-weight: 700 !important;
}

/* Parentheses */
.dork-paren {
  color: #a78bfa !important;
  font-weight: 600 !important;
}

/* Proximity function (AROUND(n)) */
.dork-function {
  color: #38bdf8 !important;
  font-weight: 700 !important;
}

/* Social tags / handles */
.dork-tag {
  color: #f97316 !important;
  font-weight: 600 !important;
}

/* Add a subtle indicator that this is a dork query */
.language-dork::before {
  content: "dork" !important;
  color: var(--accent) !important;
}
</style>
