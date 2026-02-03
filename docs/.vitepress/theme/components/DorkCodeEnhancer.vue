<!-- docs/.vitepress/theme/components/DorkCodeEnhancer.vue -->
<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { isDorkQuery } from "../utils/dorkscript";

function runDork(code: string) {
  const query = code.trim();
  const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

function enhanceCodeBlocks() {
  // Find all txt/text code blocks (dork queries)
  const codeBlocks = document.querySelectorAll(
    'div[class*="language-txt"], div[class*="language-text"], div[class*="language-dork"]'
  );

  codeBlocks.forEach((block) => {
    // Skip if already enhanced
    if (block.querySelector(".run-dork-btn")) return;

    const codeElement = block.querySelector("code");
    if (!codeElement) return;

    const code = codeElement.textContent || "";

    // Only enhance if it looks like a dork (contains operators)
    if (!isDorkQuery(code)) return;

    // Find the copy button container or create button area
    let copyBtnContainer = block.querySelector(".copy");

    // Create run button
    const runBtn = document.createElement("button");
    runBtn.className = "run-dork-btn";
    runBtn.title = "Instant Dork";
    runBtn.setAttribute("aria-label", "Instant Dork");
    runBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>`;

    runBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      runDork(code);
    });

    // Insert before copy button if it exists, otherwise add to block
    if (copyBtnContainer) {
      copyBtnContainer.parentElement?.insertBefore(runBtn, copyBtnContainer);
    } else {
      // Add to the block's button area
      const buttonArea = document.createElement("div");
      buttonArea.className = "dork-button-area";
      buttonArea.appendChild(runBtn);
      block.appendChild(buttonArea);
    }
  });
}

// Watch for route changes and re-enhance
let observer: MutationObserver | null = null;
let enhanceTimer: ReturnType<typeof setTimeout> | null = null;

onMounted(() => {
  // Initial enhancement
  setTimeout(enhanceCodeBlocks, 100);

  // Re-enhance on DOM changes (for SPA navigation)
  observer = new MutationObserver(() => {
    if (enhanceTimer) {
      clearTimeout(enhanceTimer);
    }
    enhanceTimer = setTimeout(enhanceCodeBlocks, 100);
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
});

onUnmounted(() => {
  observer?.disconnect();
  if (enhanceTimer) {
    clearTimeout(enhanceTimer);
  }
});
</script>

<template>
  <!-- This component has no visible template, it just enhances code blocks -->
  <div style="display: none"></div>
</template>

<style>
/* Run Dork Button Styles */
.run-dork-btn {
  position: absolute;
  top: 12px;
  right: 52px;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 4px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  cursor: pointer;
  opacity: 0;
  transition: all 0.2s ease;
  color: var(--vp-c-text-2);
}

div[class*="language-"]:hover .run-dork-btn {
  opacity: 1;
}

.run-dork-btn:hover {
  background: var(--accent-subtle, rgba(139, 92, 246, 0.15));
  border-color: var(--accent, #8b5cf6);
  color: var(--accent, #8b5cf6);
}

.run-dork-btn:active {
  transform: scale(0.95);
}

.run-dork-btn svg {
  width: 16px;
  height: 16px;
}

/* Adjust copy button position when run button exists */
div[class*="language-"] .copy {
  right: 12px !important;
}
</style>
