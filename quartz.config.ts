import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Alarcherche",
    enableSPA: true,
    enablePopovers: true,
    analytics: { provider: "plausible" },
    locale: "zh-CN",
    baseUrl: "studere-alarcherche.github.io/Proustian",
    ignorePatterns: ["private", "templates", ".obsidian", "00_System", "04_Journal", "99_Archive"],
    defaultDateType: "created",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "EB Garamond",
        body: "Inter",
        code: "JetBrains Mono",
      },
      colors: {
        lightMode: {
          light: "#FCFAF2",
          lightgray: "#E5E5E5",
          gray: "#B8B8B8",
          darkgray: "#4E4E4E",
          dark: "#1A1A1A",
          secondary: "#D97736",
          tertiary: "#84A59D",
          highlight: "rgba(217, 119, 54, 0.15)",
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#121213",
          lightgray: "#282828",
          gray: "#555555",
          darkgray: "#CFCFCF",
          dark: "#F4F4F5",
          secondary: "#E9C46A",
          tertiary: "#2A9D8F",
          highlight: "rgba(233, 196, 106, 0.15)",
          textHighlight: "#b3aa0288",
        },
      },
    },
  }, //
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
Plugin.NotFoundPage(),
    // Comment out CustomOgImages to speed up build time
    // Plugin.CustomOgImages(),
  ],
  },
}

export default config
