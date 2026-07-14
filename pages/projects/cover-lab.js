import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, Check, Copy, Maximize2 } from 'lucide-react'

const storageKey = 'portfolio-cover-candidate-selections'

const projects = [
  {
    id: 'matchmaking-studio',
    title: 'Matchmaking Studio',
    brief: '录音转写、结构化客户档案、补问建议与匹配跟进。'
  },
  {
    id: 'intelos',
    title: 'IntelOS',
    brief: '独立 Agent 指令、记忆和数据源驱动的持续情报系统。'
  },
  {
    id: 'daily-ai-digest',
    title: 'Daily AI Digest',
    brief: '多源采集、聚类摘要、去重保存与运行证据回写。'
  },
  {
    id: 'echo-notes',
    title: 'Echo Notes',
    brief: '把 flomo 笔记转成可随机漫游的中英文声音记忆。'
  },
  {
    id: 'xhs-publish-skill',
    title: '小红书图文发布流程',
    brief: '长内容拆解、卡片生成、发布文案、素材整理与人工确认。'
  },
  {
    id: 'personal-asset-tracker',
    title: '个人加密资产追踪',
    brief: '本地优先的多钱包、多链资产聚合与快照工作台。'
  },
  {
    id: 'AI-Coding',
    title: '习惯飞轮',
    brief: '用绑定习惯和能量门槛验证欲望，再决定兑现或放弃。'
  }
]

const directions = [
  {
    id: 'A',
    filename: 'a-product-ui.png',
    title: '真实产品界面',
    description: '直接呈现产品形态与关键操作，能力证据最明确。'
  },
  {
    id: 'B',
    filename: 'b-system-architecture.png',
    title: '系统架构叙事',
    description: '突出数据流、模块边界和工程复杂度。'
  },
  {
    id: 'C',
    filename: 'c-brand-metaphor.png',
    title: '抽象品牌视觉',
    description: '用核心机制的视觉隐喻建立辨识度。'
  }
]

function imagePath(projectId, filename) {
  return `/projects/cover-candidates/${projectId}/${filename}`
}

export default function CoverLab() {
  const [selections, setSelections] = useState({})
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey)
      if (saved) setSelections(JSON.parse(saved))
    } catch {
      setSelections({})
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(selections))
  }, [selections])

  const selectedCount = Object.keys(selections).length
  const summary = useMemo(
    () =>
      projects
        .filter((project) => selections[project.id])
        .map((project) => `${project.title}: ${selections[project.id]}`)
        .join('\n'),
    [selections]
  )

  async function copySummary() {
    if (!summary) return
    await navigator.clipboard.writeText(summary)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <>
      <Head>
        <title>项目封面候选 - 梅炎栋</title>
        <meta name="robots" content="noindex" />
      </Head>

      <main className="cover-lab-shell">
        <header className="cover-lab-toolbar">
          <div className="cover-lab-heading">
            <Link href="/projects" aria-label="返回项目页" title="返回项目页">
              <ArrowLeft size={18} />
            </Link>
            <div>
              <span>封面评审</span>
              <h1>7 个项目 / 21 张候选</h1>
            </div>
          </div>

          <div className="cover-lab-actions">
            <span>{selectedCount} / {projects.length} 已选择</span>
            <button type="button" onClick={copySummary} disabled={!summary}>
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? '已复制' : '复制选择结果'}
            </button>
          </div>
        </header>

        <div className="direction-legend" aria-label="候选方向说明">
          {directions.map((direction) => (
            <div key={direction.id}>
              <strong>{direction.id}</strong>
              <span>{direction.title}</span>
              <small>{direction.description}</small>
            </div>
          ))}
        </div>

        <div className="cover-project-list">
          {projects.map((project, projectIndex) => (
            <section className="cover-project" key={project.id}>
              <header>
                <span>{String(projectIndex + 1).padStart(2, '0')}</span>
                <div>
                  <h2>{project.title}</h2>
                  <p>{project.brief}</p>
                </div>
                <em>{selections[project.id] ? `已选 ${selections[project.id]}` : '待选择'}</em>
              </header>

              <div className="candidate-grid">
                {directions.map((direction) => {
                  const src = imagePath(project.id, direction.filename)
                  const selected = selections[project.id] === direction.id

                  return (
                    <article
                      className={`candidate${selected ? ' selected' : ''}`}
                      key={direction.id}
                      onClick={() => setSelections((current) => ({ ...current, [project.id]: direction.id }))}
                    >
                      <span className="candidate-image">
                        <img src={src} alt={`${project.title} ${direction.id}：${direction.title}`} />
                        <a
                          href={src}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`放大查看 ${project.title} ${direction.id}`}
                          title="放大查看"
                          onClick={(event) => event.stopPropagation()}
                        >
                          <Maximize2 size={16} />
                        </a>
                        {selected && (
                          <span className="selected-mark" aria-hidden="true">
                            <Check size={16} />
                          </span>
                        )}
                      </span>
                      <button className="candidate-meta" type="button" aria-pressed={selected}>
                        <strong>{direction.id}</strong>
                        <span>{direction.title}</span>
                      </button>
                    </article>
                  )
                })}
              </div>
            </section>
          ))}
        </div>
      </main>

      <style jsx>{`
        .cover-lab-shell {
          max-width: 1640px;
          margin: 0 auto;
          padding: 1.25rem 1.5rem 5rem;
        }

        .cover-lab-toolbar {
          position: sticky;
          top: 0;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          min-height: 72px;
          border-bottom: 1px solid var(--border-color);
          background: rgba(8, 8, 8, 0.92);
          backdrop-filter: blur(16px);
        }

        .cover-lab-heading,
        .cover-lab-actions,
        .cover-lab-heading :global(a),
        .candidate-meta {
          display: flex;
          align-items: center;
        }

        .cover-lab-heading {
          gap: 0.8rem;
        }

        .cover-lab-heading :global(a) {
          justify-content: center;
          width: 38px;
          height: 38px;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          color: var(--text-secondary);
        }

        .cover-lab-heading span {
          color: var(--accent-purple);
          font-size: 0.72rem;
          font-weight: 800;
        }

        .cover-lab-heading h1 {
          margin: 0.15rem 0 0;
          font-size: 1.05rem;
          line-height: 1.2;
        }

        .cover-lab-actions {
          gap: 0.75rem;
        }

        .cover-lab-actions > span {
          color: var(--text-secondary);
          font-size: 0.8rem;
        }

        .cover-lab-actions button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          min-height: 38px;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          padding: 0 0.8rem;
          background: var(--bg-card);
          color: var(--text-primary);
          cursor: pointer;
        }

        .cover-lab-actions button:disabled {
          cursor: not-allowed;
          opacity: 0.45;
        }

        .direction-legend {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1px;
          margin: 1.25rem 0 2rem;
          border: 1px solid var(--border-color);
          background: var(--border-color);
        }

        .direction-legend div {
          display: grid;
          grid-template-columns: 32px auto;
          gap: 0.2rem 0.65rem;
          padding: 0.85rem;
          background: #0c0c0c;
        }

        .direction-legend strong {
          grid-row: 1 / 3;
          color: var(--accent-purple);
          font-size: 1.25rem;
        }

        .direction-legend span {
          color: var(--text-primary);
          font-size: 0.84rem;
          font-weight: 700;
        }

        .direction-legend small {
          color: var(--text-secondary);
          font-size: 0.72rem;
          line-height: 1.45;
        }

        .cover-project-list {
          display: grid;
          gap: 2.5rem;
        }

        .cover-project {
          border-top: 1px solid var(--border-color);
          padding-top: 1rem;
        }

        .cover-project > header {
          display: grid;
          grid-template-columns: 42px minmax(0, 1fr) auto;
          gap: 0.8rem;
          align-items: start;
          margin-bottom: 0.85rem;
        }

        .cover-project > header > span {
          color: var(--accent-purple);
          font-size: 0.78rem;
          font-weight: 800;
        }

        .cover-project h2 {
          margin: 0 0 0.28rem;
          font-size: 1.35rem;
        }

        .cover-project p {
          max-width: none;
          margin: 0;
          color: var(--text-secondary);
          font-size: 0.82rem;
        }

        .cover-project em {
          color: var(--text-secondary);
          font-size: 0.75rem;
          font-style: normal;
        }

        .candidate-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.9rem;
        }

        .candidate {
          display: grid;
          gap: 0;
          min-width: 0;
          overflow: hidden;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          padding: 0;
          background: #0d0d0d;
          color: inherit;
          text-align: left;
          cursor: pointer;
          transition: border-color 160ms ease, transform 160ms ease, background 160ms ease;
        }

        .candidate:hover {
          border-color: rgba(179, 157, 219, 0.72);
          transform: translateY(-2px);
        }

        .candidate.selected {
          border-color: var(--accent-purple);
          background: rgba(179, 157, 219, 0.08);
          box-shadow: 0 0 0 1px var(--accent-purple);
        }

        .candidate-image {
          position: relative;
          display: block;
          width: 100%;
          aspect-ratio: 3 / 2;
          overflow: hidden;
          background: #050505;
        }

        .candidate-image img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .candidate-image :global(a),
        .selected-mark {
          position: absolute;
          top: 0.65rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border: 1px solid rgba(255, 255, 255, 0.24);
          border-radius: 5px;
          color: #fff;
          backdrop-filter: blur(8px);
        }

        .candidate-image :global(a) {
          right: 0.65rem;
          background: rgba(0, 0, 0, 0.66);
        }

        .selected-mark {
          left: 0.65rem;
          border-color: var(--accent-purple);
          background: var(--accent-purple);
          color: #090909;
        }

        .candidate-meta {
          gap: 0.6rem;
          width: 100%;
          min-height: 48px;
          border-top: 1px solid var(--border-color);
          border-right: 0;
          border-bottom: 0;
          border-left: 0;
          padding: 0 0.8rem;
          background: transparent;
          color: inherit;
          text-align: left;
          cursor: pointer;
        }

        .candidate-meta strong {
          color: var(--accent-purple);
          font-size: 0.85rem;
        }

        .candidate-meta span {
          color: var(--text-secondary);
          font-size: 0.78rem;
        }

        @media (max-width: 960px) {
          .candidate-grid,
          .direction-legend {
            grid-template-columns: 1fr;
          }

          .cover-lab-toolbar {
            position: static;
            align-items: flex-start;
          }

          .cover-lab-actions {
            align-items: flex-end;
            flex-direction: column;
          }
        }

        @media (max-width: 600px) {
          .cover-lab-shell {
            padding: 0.75rem 0.85rem 3rem;
          }

          .cover-lab-toolbar {
            flex-direction: column;
            padding-bottom: 0.85rem;
          }

          .cover-lab-actions {
            width: 100%;
            align-items: center;
            flex-direction: row;
            justify-content: space-between;
          }

          .cover-project > header {
            grid-template-columns: 30px minmax(0, 1fr);
          }

          .cover-project em {
            grid-column: 2;
          }
        }
      `}</style>
    </>
  )
}
