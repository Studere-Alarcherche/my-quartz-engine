import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import EssaysNav from "./quartz/components/EssaysNav" // <--- 引入维米尔群青随笔块
import ProjectMeta from "./quartz/components/ProjectMeta" // <--- 补上！引入博物馆铭牌展台

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

// 目录树配置：过滤隐藏后台文件夹，并强制 Essays 置顶
const explorerFilter = Component.Explorer({
  title: "探索",
  filterFn: (node) => {
    // 终极黑名单：只要文件夹名字在这里面，前端就会彻底隐身
    const excludeFolders = [
      "Bricks", 
      "Seeds", 
      "99_Archive", 
      "Active_Projects", 
      "System", 
      "Asserts", 
      "00_System"
    ]
    return !excludeFolders.includes(node.name)
  },
  sortFn: (a, b) => {
    // 强制把 Essays 文件夹提到了绝对的最上面
    if (a.name === "Essays") return -1
    if (b.name === "Essays") return 1
    return a.displayName.localeCompare(b.displayName)
  },
})

// 笔记详情页布局 (长文页)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    ProjectMeta(), // <--- 帮你挂载好了！你的 YAML 属性博物馆铭牌会在这里优雅呈现
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
    EssaysNav(),     // <--- 柔软的随笔块悬浮在此处
    explorerFilter,  // <--- 安静的目录树跟随其后
  ],
  right: [
    // 1. 目录：保留你的偏好，不加 DesktopOnly 限制
    Component.TableOfContents(), 
    // 2. 关系图谱
    Component.Graph(), 
    // 3. 行进中的星座
    Component.RecentNotes({
      title: "✦ CONSTELLATIONS",
      limit: 4,
      filter: (f) => f.frontmatter?.status === "active",
      sort: (f1, f2) => (f2.dates?.modified.getTime() ?? 0) - (f1.dates?.modified.getTime() ?? 0),
    }),
    // 4. 反向链接
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

// 列表页布局 (首页或文件夹预览)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(), 
    Component.ArticleTitle(), 
    ProjectMeta(), // <--- 列表页也同步挂载铭牌
    Component.ContentMeta()
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        { Component: Component.Search(), grow: true },
        { Component: Component.Darkmode() }, 
      ],
    }),
    EssaysNav(),     // <--- 列表页同步保持“群青随笔块”
    explorerFilter,
  ],
  right: [
    // 列表页保持克制，只显示最重要的“星座”
    Component.RecentNotes({
      title: "✦ CONSTELLATIONS",
      limit: 4,
      filter: (f) => f.frontmatter?.status === "active",
      sort: (f1, f2) => (f2.dates?.modified.getTime() ?? 0) - (f1.dates?.modified.getTime() ?? 0),
    }),
  ],
}