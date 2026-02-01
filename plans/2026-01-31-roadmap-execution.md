# Implementation Plan: Roadmap & Tech Debt Fixes

**Date:** 2026-01-31 **Goal:** Address key UI/UX items from ROADMAP.md and fix high-priority
technical debt.

## 1. Theme Switcher Relocation (Roadmap Item 5)

**Objective:** Move the theme/color switcher to the sidebar on desktop for better accessibility,
keeping it in the navbar for mobile.

- **File:** `docs/.vitepress/theme/Layout.vue`
- **Changes:**
  - Inject `NavThemeSwitcher` into the `sidebar-nav-after` slot (for sidebar).
  - Keep `NavThemeSwitcher` in `nav-bar-content-after` slot (for navbar).
  - Add scoped styles (or modify `NavThemeSwitcher.vue` styles) to handle visibility:
    - **Desktop (>960px):** Hide Navbar instance, Show Sidebar instance.
    - **Mobile (<960px):** Show Navbar instance, Hide Sidebar instance.

## 2. Basic DorkScript Validation (Roadmap Item 4 - Phase 1)

**Objective:** Provide immediate visual feedback in the Dork Builder when inputs are invalid.

- **File:** `docs/.vitepress/theme/components/builder/BlockEditor.vue`
- **Changes:**
  - Add a `validationError` computed property or state.
  - Implement `validateBlock(block)` logic:
    - `site`, `ext`, `filetype`: Required fields.
    - `intitle`, `inurl`, `intext`: Warn if less than 3 chars (soft validation).
  - Update template:
    - Add `.has-error` class to inputs if invalid.
    - Display a small error message below the input if validation fails.

## 3. Technical Debt Cleanup

**Objective:** Fix brittle hardcoded paths and orphaned scripts.

- **Task A: Dynamic Base Path**
  - **File:** `docs/.vitepress/theme/components/explorer/DorkExplorer.vue`
  - **Change:** Import `useData` from VitePress. Use `withBase('/dork-explorer/dork-data.js')`
    instead of the hardcoded string. This ensures it works regardless of deployment path.

- **Task B: Build Script Integration**
  - **File:** `package.json`
  - **Change:** Add `node scripts/remove-run-links.js` to the `build` script chain. Likely before
    `docs:build` to ensure the "Instant Dork" buttons (which replace these links) are the primary
    interaction method.

## 4. Verification

- **Visual Check:** Verify Theme Switcher appears in sidebar on wide screen, moves to nav on small
  screen.
- **Functional Check:** Try to create an empty "Site" block in Builder -> should see error.
- **Build Check:** Run `npm run build` -> verify `remove-run-links.js` executes.
