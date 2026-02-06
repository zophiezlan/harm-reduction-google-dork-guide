import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: "happy-dom",
    globals: true,
    include: ["**/*.{test,spec}.{js,ts,vue}"],
    exclude: ["node_modules", "dist", ".vitepress/cache", "archive"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/**",
        "dist/**",
        "**/*.d.ts",
        "**/*.test.ts",
        "**/*.spec.ts",
        "**/*.vue",
        "vitest.config.ts",
        "docs/.vitepress/theme/index.ts",
        "docs/.vitepress/theme/data/synonyms.ts",
      ],
      thresholds: {
        lines: 60,
        functions: 60,
        branches: 50,
        statements: 60,
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./docs/.vitepress/theme", import.meta.url)),
    },
  },
});
