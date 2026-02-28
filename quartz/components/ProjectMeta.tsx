import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { resolveRelative } from "../util/path"

const ProjectMeta: QuartzComponent = ({ fileData, allFiles, displayClass }: QuartzComponentProps) => {
  const { investment, status, description, url } = fileData.frontmatter ?? {}

  // 如果没有任何核心字段，则不渲染展台
  if (!investment && !status && !description && !url) return null

  // 状态艺术化映射
  const statusMap: Record<string, string> = {
    "active": "✦ 疾行中 (Active)",
    "evergreen": "✧ 常青构件 (Evergreen)",
    "draft": "✎ 初稿阶段 (Draft)"
  }
  const displayStatus = status ? (statusMap[status.toString().toLowerCase()] ?? status) : null

  // --- 核心修复：真·内链解析逻辑 ---
  let internalLink: string | null = null
  let linkText: string = url?.toString() ?? ""

  if (url) {
    // 尝试在全站文件中寻找匹配 url 字段的笔记
    const targetFile = allFiles.find(f => 
      f.frontmatter?.title === url || 
      f.slug === url || 
      f.slug?.endsWith(`/${url}`)
    )
    
    if (targetFile) {
      // 如果找到了，计算相对路径生成真链接
      internalLink = resolveRelative(fileData.slug!, targetFile.slug!)
    }
  }

  return (
    <div class={classNames(displayClass, "project-meta-dashboard")}>
      {description && <div class="meta-desc">“{description}”</div>}
      
      <div class="meta-badges">
        {displayStatus && (
          <span class={`badge status-${status.toString().toLowerCase()}`}>
            <span class="dot"></span> {displayStatus}
          </span>
        )}
        
        {/* 字段标准化：0 不再孤立存在 */}
        {(investment !== undefined) && (
          <span class="badge investment">⚡ 心智投入: {investment} H</span>
        )}
        
        {/* 溯源：如果是真链接则渲染为 <a>，否则为文本 */}
        {url && (
          <span class="badge url">
            🏛️ 溯源: {internalLink ? (
              <a href={internalLink} class="internal-nav-link">{linkText}</a>
            ) : (
              <span>{linkText}</span>
            )}
          </span>
        )}
      </div>
    </div>
  )
}

ProjectMeta.css = `
.project-meta-dashboard {
  margin: 2.5rem 0;
  padding: 2.5rem 2rem 2rem 2rem;
  background: rgba(155, 50, 38, 0.015);
  border: 1px solid rgba(155, 50, 38, 0.1);
  border-radius: 4px;
  text-align: center;
  position: relative;
  box-shadow: inset 0 0 20px rgba(0,0,0,0.01), 0 4px 15px rgba(0,0,0,0.02);
}

.project-meta-dashboard::before,
.project-meta-dashboard::after {
  content: ""; position: absolute; left: 50%; transform: translateX(-50%);
  width: 40px; height: 2px; background: rgba(155, 50, 38, 0.4); border-radius: 2px;
}
.project-meta-dashboard::before { top: 12px; }
.project-meta-dashboard::after { bottom: 12px; }

.meta-desc {
  font-family: var(--headerFont);
  color: #1B3B86;
  font-size: 1.15rem;
  font-style: italic;
  line-height: 1.6;
  margin-bottom: 1.8rem;
  letter-spacing: 0.12em;
}

.meta-badges {
  display: flex; justify-content: center; align-items: center;
  gap: 2rem; flex-wrap: wrap;
  border-top: 1px dashed rgba(155, 50, 38, 0.2);
  padding-top: 1.5rem;
}

.badge {
  display: inline-flex; align-items: center;
  font-family: var(--headerFont);
  font-size: 0.75rem; letter-spacing: 0.15em;
  text-transform: uppercase; color: var(--gray);
}

.badge.status-active { color: #9B3226; font-weight: 600; }
.badge.status-evergreen { color: #1B3B86; font-weight: 600; }

.internal-nav-link {
  color: inherit;
  text-decoration: none;
  border-bottom: 1px solid rgba(155, 50, 38, 0.3);
  transition: all 0.3s ease;
}

.internal-nav-link:hover {
  color: #9B3226;
  border-bottom-color: #9B3226;
  background: rgba(155, 50, 38, 0.05);
}

.dot {
  display: inline-block; width: 5px; height: 5px; border-radius: 50%;
  background: currentColor; margin-right: 8px; opacity: 0.9;
}
`
export default (() => ProjectMeta) satisfies QuartzComponentConstructor