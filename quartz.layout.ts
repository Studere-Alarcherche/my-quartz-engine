import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// 所有页面通用的组件（页头、页脚等）
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

// --- 核心修改区：定义侧边栏过滤逻辑 ---
// 隐藏后台与零碎文件夹，只展示前台展厅 (如 01_Maps, Essays)
const explorerFilter = Component.Explorer({
  filterFn: (node) => {
    const excludeFolders = ["99_Archive", "Seeds", "Active_Projects", "Bricks", "System", "Asserts"]
    return !excludeFolders.includes(node.name)
  },
})

// 笔记详情页布局 (例如单篇 Proust 笔记)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        { Component: Component.Search(), grow: true },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    explorerFilter, // <--- 应用过滤后的导航栏
  ],
  right: [
    Component.DesktopOnly(Component.TableOfContents()), // 目录归位
    Component.Graph(), 
    Component.RecentNotes({
      title: "✦ Constellations", // 统一命名
      limit: 4,
      filter: (f) => f.frontmatter?.status === "active",
      sort: (f1, f2) => (f2.dates?.modified.getTime() ?? 0) - (f1.dates?.modified.getTime() ?? 0),
    }),
    Component.Backlinks(),
  ],
  afterBody: [
    Component.Comments({
      provider: 'giscus',
      options: {
        repo: 'Studere-Alarcherche/Proustian',
        repoId: 'R_kgDORYpwTA',
        category: 'General',
        categoryId: 'DIC_kwDORYpwTM4C3Q3J',
        mapping: 'pathname',
        strict: false,
        reactionsEnabled: true,
        inputPosition: 'bottom',
        theme: 'preferred_color_scheme', // 配合 CSS 实现羊皮纸色调同步
      }
    }),
  ],
}

// 列表页布局 (例如 Essays 文件夹预览、标签页)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        { Component: Component.Search(), grow: true },
        { Component: Component.Darkmode() },
      ],
    }),
    explorerFilter, // <--- 应用过滤后的导航栏
  ],
  right: [
    Component.RecentNotes({
      title: "✦ Constellations",
      limit: 4,
      filter: (f) => f.frontmatter?.status === "active",
      sort: (f1, f2) => (f2.dates?.modified.getTime() ?? 0) - (f1.dates?.modified.getTime() ?? 0),
    }),
  ],
}