import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// 所有页面通用的组件
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
    },
  }),
}

// --- 核心修改：定义严格屏蔽的目录树 ---
const explorerFilter = Component.Explorer({
  title: "探索",
  filterFn: (node) => {
    // 强制屏蔽这些文件夹，保持目录树纯净
    const excludeFolders = ["99_Archive", "Seeds", "Active_Projects", "Bricks", "System", "Asserts", "00_System"]
    return !excludeFolders.includes(node.name)
  },
})

// --- 新增：炫酷的左侧控制台组件 ---
const systemConsole = Component.Html({
  html: `
  <div style="margin-top: 1.5rem; padding: 1rem; border: 1px solid var(--secondary); border-radius: 4px; background: rgba(var(--secondary-rgb), 0.03); border-left: 3px solid var(--secondary);">
    <div style="font-size: 0.7em; color: var(--gray); letter-spacing: 0.15em; margin-bottom: 0.8rem; text-transform: uppercase; font-weight: bold;">⚡ System Console</div>
    
    <a href="/Active_Projects/" style="display: flex; align-items: center; gap: 0.6rem; text-decoration: none; color: var(--secondary); font-weight: bold; font-size: 0.9em; margin-bottom: 0.6rem; transition: transform 0.2s ease;" onmouseover="this.style.transform='translateX(4px)'" onmouseout="this.style.transform='translateX(0)'">
      <span style="font-size: 1.2em;">⌬</span> Active Projects
    </a>
    
    <a href="/99_Archive/" style="display: flex; align-items: center; gap: 0.6rem; text-decoration: none; color: var(--gray); font-size: 0.85em; transition: transform 0.2s ease;" onmouseover="this.style.transform='translateX(4px)'" onmouseout="this.style.transform='translateX(0)'">
      <span style="font-size: 1.2em;">☖</span> Historical Archive
    </a>
  </div>
  `
})

// 笔记详情页布局
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
    systemConsole,   // <--- 炫酷的控制台放在最上方
    explorerFilter,  // <--- 净化后的目录树跟在后面
  ],
  right: [
    Component.DesktopOnly(Component.TableOfContents()), 
    Component.Graph(), 
    Component.RecentNotes({
      title: "✦ Constellations",
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
        theme: 'preferred_color_scheme',
      }
    }),
  ],
}

// 列表页布局
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
    systemConsole,   // <--- 列表页同步保持一致性
    explorerFilter,
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