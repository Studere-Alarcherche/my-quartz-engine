import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { resolveRelative } from "../util/path"

const EssaysNav: QuartzComponent = ({ fileData, allFiles, displayClass }: QuartzComponentProps) => {
  // 1. 终极穿甲弹：全站扫描，抓取 Essays 文件夹或 type: essay 的文章
  const essays = allFiles
    .filter((f) => {
      const isEssayFolder = f.slug?.startsWith("Essays/");
      const isEssayType = f.frontmatter?.type === "essay";
      const isNotIndex = !f.slug?.endsWith("index");
      return (isEssayFolder || isEssayType) && isNotIndex;
    })
    .sort((a, b) => (b.dates?.modified?.getTime() ?? 0) - (a.dates?.modified?.getTime() ?? 0))
    .slice(0, 3) 

  if (essays.length === 0) return null

  return (
    <div class={classNames(displayClass, "essays-nav")}>
      <div class="essays-nav-label">RECENT ESSAYS</div>
      {essays.map((essay) => (
        <a href={resolveRelative(fileData.slug!, essay.slug!)} class="essay-block">
          <div class="essay-tag"></div>
          <div class="essay-content">
            <div class="essay-title">{essay.frontmatter?.title ?? essay.slug?.split("/").pop()}</div>
            {/* 核心修正：字段标准化，优先抓取你的硬核情念形式字段 */}
            <div class="essay-desc">
              {essay.frontmatter?.pathosformel ?? essay.frontmatter?.description ?? "阅读全文..."}
            </div>
          </div>
        </a>
      ))}
    </div>
  )
}

EssaysNav.css = `
.essays-nav {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 2.5rem;
}

.essays-nav-label {
  font-size: 0.65em;
  color: #9B3226; /* 庞贝红 */
  letter-spacing: 0.2em;
  opacity: 0.5;
  margin-bottom: 0.5rem;
  padding-left: 0.5rem;
}

.essay-block {
  display: flex;
  align-items: flex-start;
  background: rgba(27, 59, 134, 0.02); /* 维米尔群青透底 */
  border-radius: 12px;
  padding: 1rem;
  text-decoration: none;
  border: 1px solid rgba(27, 59, 134, 0.05);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.essay-block:hover {
  background: rgba(27, 59, 134, 0.06);
  transform: translateX(5px);
  border-color: rgba(155, 50, 38, 0.3);
}

.essay-tag {
  width: 4px;
  height: 20px;
  background: #9B3226; /* 庞贝红锚点 */
  border-radius: 2px;
  margin-right: 12px;
  flex-shrink: 0;
  opacity: 0.7;
}

.essay-title {
  color: #1B3B86; /* 维米尔群青 */
  font-family: var(--headerFont);
  font-weight: 600;
  font-size: 1em;
  line-height: 1.3;
}

.essay-desc {
  color: var(--gray);
  font-size: 0.75em;
  margin-top: 0.3rem;
  line-height: 1.4;
  opacity: 0.8;
}
`

export default (() => EssaysNav) satisfies QuartzComponentConstructor