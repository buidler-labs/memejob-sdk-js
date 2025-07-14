import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [['link', { rel: 'icon', href: '/memejob-sdk-js/favicon.ico' }]],
  title: "memejob-sdk-js",
  description: "Official memejob development kit",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Get started", link: "/introduction" },
    ],

    sidebar: [
      {
        text: "Introduction",
        items: [
          { text: "About", link: "/introduction" },
          { text: "Getting started", link: "/getting-started" },
          { text: "Configuration", link: "/configuration" },
          { text: "Contract deployments", link: "/contract-deployments" },
        ],
      },
      {
        text: "Token metadata",
        items: [
          { text: "Interface", link: "/metadata" },
          { text: "Upload metadata", link: "/memo-builder" },
          { text: "IPFS services", link: "/ipfs-services" },
        ],
      },
      {
        text: "Guides",
        items: [
          { text: "Create a token", link: "/create-token" },
          { text: "Buy tokens", link: "/buy-tokens" },
          { text: "Sell tokens", link: "/sell-tokens" },
        ],
      },
      {
        text: "Mirror Node",
        items: [
          { text: "Client", link: "/mirror/client" },
          {
            text: "Actions",
            items: [
              { text: "get", link: "/mirror/get" },
              { text: "getPaginated", link: "/mirror/get-paginated" },
            ],
          },
        ],
      },
    ],

    search: {
      provider: "local",
    },
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/buidler-labs/memejob-sdk-js",
      },
      { icon: "x", link: "https://x.com/MemeJobFun" },
      {
        icon: "telegram",
        link: "https://t.me/memejobfun",
      },
    ],
    footer: {
      message:
        'Made with love ❤️ by <a href="https://buidlerlabs.com/" target="_blank">Buidler-labs Team</a>',
      copyright: `Copyright © ${new Date().getFullYear()}`,
    },
  },
  markdown: {
    theme: {
      light: "github-light",
      dark: "catppuccin-frappe",
    },
  },
  lastUpdated: true,
  ignoreDeadLinks: true,
  base: "/memejob-sdk-js/",
});
