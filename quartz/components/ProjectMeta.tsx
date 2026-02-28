import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const ProjectMeta: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const { investment, status, description, url } = fileData.frontmatter ?? {}

  if (!investment && !status && !description && !url) return null

  // 1. 状态映射：将冰冷的英文转换为带有艺术感的中文
  const statusMap: Record<string, string> = {
    "active": "✦ 疾行中 (Active)",
    "evergreen": "✧ 常青之书 (Evergreen)",
    "draft": "✎ 预想阶段 (Draft)"
  }
  const displayStatus = status ? (statusMap[status.toString().toLowerCase()] ?? status) : null

  return (
    <div class={classNames(displayClass, "project-meta-dashboard")}>
      {description && <div class="meta-desc">“{description}”</div>}
      
      <div class="meta-badges">
        {/* 渲染标准化状态 */}
        {displayStatus && (
          <span class={`badge status-${status.toString().toLowerCase()}`}>
            <span class="dot"></span> {displayStatus}
          </span>
        )}
        
        {/* 2. 统一字段：为 investment 增加称谓，即使是 0 也要优雅呈现 */}
        {(investment !== undefined) && (
          <span class="badge investment">⚡ 心智投入: {investment} H</span>
        )}
        
        {/* 3. 溯源链接 */}
        {url && <span class="badge url">🏛️ 溯源: {url}</span>}
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
  content: "";
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 2px;
  background: rgba(155, 50, 38, 0.4);
  border-radius: 2px;
}
.project-meta-dashboard::before { top: 12px; }
.project-meta-dashboard::after { bottom: 12px; }

.meta-desc {
  font-family: var(--headerFont);
  color: #1B3B86; /* 维米尔群青 */
  font-size: 1.15rem;
  font-style: italic;
  line-height: 1.6;
  margin-bottom: 1.8rem;
  letter-spacing: 0.12em;
}

.meta-badges {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
  border-top: 1px dashed rgba(155, 50, 38, 0.2);
  padding-top: 1.5rem;
}

.badge {
  display: inline-flex;
  align-items: center;
  font-family: var(--headerFont);
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--gray);
}

.badge.status-active { color: #9B3226; font-weight: 600; }
.badge.status-evergreen { color: #1B3B86; font-weight: 600; }
.badge.investment { color: var(--darkgray); font-weight: 500; }
.badge.url { color: var(--darkgray); border-bottom: 1px solid rgba(0,0,0,0.15); transition: all 0.3s; }

.dot {
  display: inline-block;
  width: 5px; height: 5px;
  border-radius: 50%;
  background: currentColor;
  margin-right: 8px;
  opacity: 0.9;
}
`
export default (() => ProjectMeta) satisfies QuartzComponentConstructor