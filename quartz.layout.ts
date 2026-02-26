import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
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

// components for pages that display a single page (e.g. a single note)
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
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [
    // 1. 关系图谱：展示笔记之间的网状链接
    Component.Graph(), 

    // 2. 活跃星座（核心定制组件）：
    // 利用 RecentNotes 组件，配合自定义过滤器实现“项目卡片”效果
    Component.RecentNotes({
      title: "✦ 行进中的星座", // 侧边栏显示的标题
      limit: 4,              // 限制显示数量，避免侧边栏过长
      // 过滤器逻辑：只有 Frontmatter 中 status 属性为 "active" 的笔记才会被抓取
      filter: (f) => f.frontmatter?.status === "active", 
      // 排序逻辑：按照文件的最后修改时间（modified）降序排列，确保最活跃的项目在最上方
      sort: (f1, f2) => 
        (f2.dates?.modified.getTime() ?? 0) - (f1.dates?.modified.getTime() ?? 0),
    }),

    // 3. 目录：仅在桌面端显示，且放在项目卡片下方
    Component.DesktopOnly(Component.TableOfContents()),

    // 4. 反向链接：列出引用了当前页面的其他笔记
    Component.Backlinks(),
  ],

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [],
}
