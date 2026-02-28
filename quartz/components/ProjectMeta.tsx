import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const ProjectMeta: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const { investment, status, description, url } = fileData.frontmatter ?? {}

  if (!investment && !status && !description && !url) return null

  return (
    <div class={classNames(displayClass, "project-meta-dashboard")}>
      {/* 渲染 description (一句话描述) */}
      {description && <div class="meta-desc">“{description}”</div>}
      
      <div class="meta-badges">
        {/* 渲染 status (状态) */}
        {status && (
          <span class={`badge status-${status.toString().toLowerCase()}`}>
            <span class="dot"></span> {status}
          </span>
        )}
        {/* 渲染 investment (心智投入) */}
        {investment && <span class="badge investment">⚡ 耗时: {investment}</span>}
        {/* 渲染 url (B端链接指向) */}
        {url && <span class="badge url">🏛️ 指向: {url}</span>}
      </div>
    </div>
  )
}

ProjectMeta.css = `
.project-meta-dashboard {
  margin: 2.5rem 0;
  padding: 2.5rem 2rem 2rem 2rem;
  /* 保留你要求的底色，但做成了极度高雅的微孔质感底色 */
  background: rgba(155, 50, 38, 0.015);
  border: 1px solid rgba(155, 50, 38, 0.1);
  border-radius: 4px;
  text-align: center;
  position: relative;
  /* 增加内阴影，营造出一块实体“铭牌”镶嵌在网页上的厚重感 */
  box-shadow: inset 0 0 20px rgba(0,0,0,0.01), 0 4px 15px rgba(0,0,0,0.02);
}

/* 铭牌细节：顶部和底部的黄铜色/庞贝红雕刻刻线 */
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
  color: #1B3B86; /* 箴言使用深邃的维米尔群青 */
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
  /* 铭牌细节：虚线分割区，将“引言”与“数据”完美隔开 */
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

/* 极简古典配色：去掉所有俗气的色块背景，让颜色归于文字和标点 */
.badge.status-active { color: #9B3226; font-weight: 600; } /* 庞贝红 */
.badge.status-evergreen { color: #1B3B86; font-weight: 600; } /* 群青 */
.badge.investment { color: var(--darkgray); }
.badge.url { color: var(--darkgray); border-bottom: 1px solid rgba(0,0,0,0.15); transition: all 0.3s; }
.badge.url:hover { color: #9B3226; border-color: #9B3226; }

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