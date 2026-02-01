import { defineConfig } from "vitepress";
import markdownItGitHubAlerts from "markdown-it-github-alerts";
import { fileURLToPath, URL } from "node:url";

const toolsPublicDir = fileURLToPath(new URL("../../tools", import.meta.url));

export default defineConfig({
  title: "Harm Reduction Google Dork Guide",
  description: "Advanced search operators, workflows, and dork packs for harm reduction work.",
  cleanUrls: true,
  lastUpdated: true,
  appearance: false,
  head: [
    // PWA
    ["link", { rel: "manifest", href: "/manifest.json" }],
    ["meta", { name: "theme-color", content: "#10b981" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    ["meta", { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" }],
    ["meta", { name: "apple-mobile-web-app-title", content: "Dork Guide" }],
    ["link", { rel: "apple-touch-icon", href: "/icons/icon-192.png" }],
    // SEO
    ["meta", { name: "author", content: "Harm Reduction Community" }],
    [
      "meta",
      {
        name: "keywords",
        content: "harm reduction, google dorks, advanced search, AOD, drug policy, peer support",
      },
    ],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:title", content: "Harm Reduction Google Dork Guide" }],
    [
      "meta",
      {
        property: "og:description",
        content: "700+ pre-built search queries for harm reduction professionals",
      },
    ],
    ["meta", { property: "og:locale", content: "en_AU" }],
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    // Service Worker Registration
    ["script", { src: "/sw-register.js", defer: "" }],
  ],
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
          text: "Interactive Apps",
          collapsed: false,
          items: [
            { text: "Dork Explorer", link: "/explorer" },
            { text: "Dork Builder", link: "/builder" },
            { text: "Settings", link: "/settings" },
          ],
        },
        {
          text: "Getting Started",
          collapsed: false,
          items: [
            { text: "Introduction", link: "/README" },
            { text: "Quick Start", link: "/01-quick-start" },
            { text: "Core Operators", link: "/02-core-operators" },
            { text: "Advanced Operators", link: "/03-advanced-operators" },
            { text: "Domain Map", link: "/04-domain-map" },
            { text: "Synonym Blocks", link: "/05-synonym-blocks" },
          ],
        },
        {
          text: "Dork Packs",
          collapsed: true,
          items: [
            { text: "Browse All Packs", link: "/dork-packs/README" },
            { text: "Drug Alerts", link: "/dork-packs/drug-alerts" },
            { text: "Novel Substances", link: "/dork-packs/novel-substances" },
            { text: "Coroners & Deaths", link: "/dork-packs/coroners-deaths" },
            { text: "Community Forums", link: "/dork-packs/forum-community" },
            { text: "User Domains", link: "/dork-packs/user-hosted-domains" },
            { text: "Peer Knowledge", link: "/dork-packs/peer-knowledge" },
            // Add other key packs here if needed, or rely on the index
          ],
        },
        {
          text: "Workflows",
          collapsed: true,
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
          collapsed: true,
          items: [
            { text: "Tools Overview", link: "/tools/README" },
            { text: "Browser Extensions", link: "/tools/browser-extensions" },
            { text: "Google Alerts", link: "/tools/google-alerts" },
            { text: "OSINT Tools", link: "/tools/osint" },
            { text: "Cheat Sheet", link: "/resources/cheat-sheet" },
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
