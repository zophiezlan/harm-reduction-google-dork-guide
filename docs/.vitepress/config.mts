import { defineConfig } from "vitepress";
import markdownItGitHubAlerts from "markdown-it-github-alerts";
import { fileURLToPath, URL } from "node:url";

const toolsPublicDir = fileURLToPath(new URL("../../tools", import.meta.url));

export default defineConfig({
  title: "Harm Reduction Google Dork Guide",
  description: "Advanced search operators, workflows, and dork packs for harm reduction work.",
  base: "/harm-reduction-google-dork-guide/",
  cleanUrls: true,
  lastUpdated: true,
  srcExclude: [
    "_sidebar.md",
    "_navbar.md",
    "_assets/**",
    "index.html",
    ".nojekyll",
    "dork-explorer.md",
  ],
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/README" },
      { text: "Explorer", link: "/explorer" },
      { text: "Builder", link: "/builder" },
    ],
    sidebar: {
      "/": [
        {
          text: "Getting Started",
          items: [
            { text: "Quick Start", link: "/01-quick-start" },
            { text: "Core Operators", link: "/02-core-operators" },
            { text: "Advanced Operators", link: "/03-advanced-operators" },
            { text: "Domain Map", link: "/04-domain-map" },
            { text: "Synonym Blocks", link: "/05-synonym-blocks" },
          ],
        },
        {
          text: "Dork Packs",
          items: [{ text: "All Dork Packs", link: "/dork-packs/README" }],
        },
        {
          text: "Workflows",
          items: [
            { text: "Overview", link: "/workflows/README" },
            { text: "Research Workflow", link: "/workflows/research-workflow" },
            { text: "Monitoring", link: "/workflows/monitoring" },
            { text: "Peer-Centered", link: "/workflows/peer-centered" },
            { text: "Verification", link: "/workflows/verification" },
          ],
        },
        {
          text: "Tools & Resources",
          items: [
            { text: "Tools Overview", link: "/tools/README" },
            { text: "Browser Extensions", link: "/tools/browser-extensions" },
            { text: "Google Alerts", link: "/tools/google-alerts" },
            { text: "OSINT", link: "/tools/osint" },
            { text: "Cheat Sheet", link: "/resources/cheat-sheet" },
          ],
        },
        {
          text: "Interactive",
          items: [
            { text: "Dork Explorer", link: "/explorer" },
            { text: "Dork Builder", link: "/builder" },
            { text: "Settings", link: "/settings" },
          ],
        },
      ],
    },
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/zophiezlan/harm-reduction-google-dork-guide",
      },
    ],
    search: {
      provider: "local",
    },
    outline: [2, 3],
  },
  markdown: {
    config: (md) => {
      md.use(markdownItGitHubAlerts);
    },
  },
  vite: {
    publicDir: toolsPublicDir,
  },
});
