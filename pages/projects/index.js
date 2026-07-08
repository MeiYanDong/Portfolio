import Head from 'next/head'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Grid2X2, List } from 'lucide-react'
import projectsData from '../../data/projects.json'

const tierLabels = {
  featured: '精选项目',
  selected: '入选项目',
  archive: '早期作品'
}

const categoryLabels = {
  'On-chain Automation': '链上自动化',
  'Product Workbenches': '产品工作台',
  'AI Agent Systems': '智能体系统',
  'Personal Knowledge Tools': '个人知识工具'
}

function categoryLabel(category) {
  return categoryLabels[category] || category
}

function getStack(project) {
  return project.stack || project.tags || []
}

function textPool(project) {
  return [
    project.title,
    project.category,
    project.role,
    project.description,
    project.resumeLine,
    project.impact,
    project.story?.problem,
    project.story?.process,
    project.story?.result,
    ...(project.tags || []),
    ...(project.stack || [])
  ]
    .filter(Boolean)
    .join(' ')
}

function getCategories(projects) {
  return [...new Set(projects.map((project) => project.category).filter(Boolean))]
}

function StackList({ project, limit = 4 }) {
  return (
    <div className="project-stack">
      {getStack(project)
        .slice(0, limit)
        .map((item) => (
          <span key={item}>{item}</span>
        ))}
    </div>
  )
}

function ProjectMeta({ project }) {
  return (
    <div className="project-meta">
      <span>{project.year}</span>
      <span>{categoryLabel(project.category)}</span>
      <span>{tierLabels[project.tier] || project.tier}</span>
    </div>
  )
}

function ProjectCard({ project, index }) {
  return (
    <Link href={`/projects/${project.id}`} className="project-card">
      <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
      <div>
        <ProjectMeta project={project} />
        <h2>{project.title}</h2>
        <p>{project.resumeLine || project.description}</p>
      </div>
      <StackList project={project} />
    </Link>
  )
}

function ProjectRow({ project, index }) {
  return (
    <Link href={`/projects/${project.id}`} className="project-row">
      <span>{String(index + 1).padStart(2, '0')}</span>
      <strong>{project.title}</strong>
      <p>{project.impact || project.resumeLine || project.description}</p>
      <em>{project.year} / {categoryLabel(project.category)}</em>
    </Link>
  )
}

export default function Projects() {
  const [activeTheme, setActiveTheme] = useState('all')
  const [query, setQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid')

  const themes = useMemo(() => getCategories(projectsData), [])
  const normalizedQuery = query.trim().toLowerCase()

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      const themeMatch = activeTheme === 'all' || project.category === activeTheme
      const searchMatch = !normalizedQuery || textPool(project).toLowerCase().includes(normalizedQuery)
      return themeMatch && searchMatch
    })
  }, [activeTheme, normalizedQuery])

  const categoryStats = useMemo(
    () =>
      themes
        .map((category) => ({
          category,
          count: projectsData.filter((project) => project.category === category).length
        }))
        .filter((item) => item.count > 0),
    [themes]
  )
  const maxCategory = Math.max(1, ...categoryStats.map((item) => item.count))

  return (
    <>
      <Head>
        <title>项目作品 - 梅炎栋</title>
        <meta name="description" content="梅炎栋的精选系统项目、AI Agent、链上自动化和个人工具案例" />
      </Head>

      <main className="projects-ledger-shell">
        <section className="projects-ledger-hero">
          <div className="projects-hero-copy">
            <p className="projects-kicker">PROJECTS</p>
            <h1>项目不是作品墙，是能力证据。</h1>
            <p>
              这里按主题、搜索和视图切换组织真实项目。每个条目都可以进入详情页，重点呈现系统复杂度、个人贡献和结果证据。
            </p>
          </div>
          <aside className="projects-result-card">
            <strong>{filteredProjects.length}</strong>
            <span>当前结果</span>
            <small>{activeTheme === 'all' ? '全部主题' : categoryLabel(activeTheme)}</small>
          </aside>
        </section>

        <section className="projects-category-bars" aria-label="全部项目主题分布">
          {categoryStats.map((item) => (
            <div key={item.category}>
              <span>{categoryLabel(item.category)}</span>
              <i style={{ width: `${Math.max(12, (item.count / maxCategory) * 100)}%` }} />
              <em>{item.count}</em>
            </div>
          ))}
        </section>

        <section className="projects-toolrow">
          <div className="projects-theme-title">
            <span>主题</span>
            <strong>{activeTheme === 'all' ? '全部主题' : categoryLabel(activeTheme)}</strong>
            <small>{filteredProjects.length} 个项目</small>
          </div>
          <div className="projects-view-switch" aria-label="展示方式切换">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'active' : ''}
              aria-label="网格展示"
              title="网格展示"
            >
              <Grid2X2 size={17} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'active' : ''}
              aria-label="列表展示"
              title="列表展示"
            >
              <List size={17} />
            </button>
          </div>
        </section>

        <section className="projects-filterbar">
          <div className="projects-theme-tabs" aria-label="主题筛选">
            <button
              type="button"
              onClick={() => setActiveTheme('all')}
              className={activeTheme === 'all' ? 'active' : ''}
            >
              全部主题
            </button>
            {themes.map((theme) => (
              <button
                type="button"
                key={theme}
                onClick={() => setActiveTheme(theme)}
                className={activeTheme === theme ? 'active' : ''}
              >
                {categoryLabel(theme)}
              </button>
            ))}
          </div>
          <div className="projects-search">
            <label htmlFor="project-search" className="projects-search-label">内容搜索</label>
            <input
              id="project-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索项目、角色、技术栈、结果..."
            />
          </div>
        </section>

        {filteredProjects.length === 0 ? (
          <p className="projects-empty">没有匹配项目，换一个主题或关键词。</p>
        ) : viewMode === 'grid' ? (
          <section className="projects-grid">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </section>
        ) : (
          <section className="projects-list">
            {filteredProjects.map((project, index) => (
              <ProjectRow key={project.id} project={project} index={index} />
            ))}
          </section>
        )}
      </main>

      <style jsx global>{`
        .projects-ledger-shell {
          max-width: 1480px;
          margin: 0 auto;
          padding: 0 1.5rem 5rem;
        }

        .projects-ledger-hero {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 270px;
          gap: 3rem;
          align-items: end;
          padding: 4rem 0 3rem;
          border-bottom: 1px solid var(--border-color);
        }

        .projects-kicker {
          margin-bottom: 0.75rem;
          color: var(--accent-purple);
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .projects-hero-copy h1 {
          max-width: 980px;
          margin-bottom: 1.25rem;
          font-size: 4.1rem;
          line-height: 0.98;
        }

        .projects-hero-copy p:last-child {
          max-width: 820px;
          color: var(--text-secondary);
          font-size: 1.05rem;
          line-height: 1.85;
        }

        .projects-result-card {
          position: relative;
          display: grid;
          gap: 0.45rem;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 1rem;
          background: var(--bg-card);
        }

        .projects-result-card strong,
        .projects-result-card span,
        .projects-result-card small {
          position: relative;
          z-index: 1;
        }

        .projects-result-card strong {
          color: var(--text-primary);
          font-size: 2.15rem;
          line-height: 1.08;
        }

        .projects-result-card span,
        .projects-result-card small {
          color: var(--text-secondary);
          font-size: 0.78rem;
        }

        .projects-category-bars {
          display: grid;
          gap: 0.65rem;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 1rem;
          margin: 1rem 0 0;
          background: var(--bg-card);
        }

        .projects-category-bars div {
          display: grid;
          grid-template-columns: 220px minmax(0, 1fr) 42px;
          gap: 1rem;
          align-items: center;
        }

        .projects-category-bars i {
          display: block;
          height: 9px;
          border-radius: 999px;
          background: var(--accent-purple);
        }

        .projects-category-bars span,
        .projects-category-bars em {
          color: var(--text-secondary);
          font-style: normal;
        }

        .projects-toolrow {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-top: 1.5rem;
          margin-bottom: 0.7rem;
        }

        .projects-theme-title {
          min-width: 0;
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 0.55rem;
        }

        .projects-theme-title span {
          color: var(--accent-purple);
          font-size: 0.72rem;
          font-weight: 800;
        }

        .projects-theme-title strong {
          color: var(--text-primary);
          font-size: 1.12rem;
          line-height: 1.2;
        }

        .projects-theme-title small {
          color: var(--text-secondary);
          font-size: 0.78rem;
        }

        .projects-view-switch {
          display: inline-flex;
          width: fit-content;
          max-width: 100%;
          align-items: center;
          gap: 0.18rem;
          border: 1px solid var(--border-color);
          border-radius: 999px;
          padding: 0.18rem;
          background: var(--bg-card);
        }

        .projects-view-switch button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          border: 0;
          border-radius: 999px;
          padding: 0;
          background: transparent;
          color: var(--text-secondary);
          cursor: pointer;
        }

        .projects-view-switch button svg {
          display: block;
        }

        .projects-view-switch button.active {
          background: rgba(179, 157, 219, 0.13);
          color: var(--accent-purple);
        }

        .projects-filterbar {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(260px, 360px);
          gap: 1rem;
          align-items: start;
          margin-bottom: 0.85rem;
        }

        .projects-theme-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          align-content: start;
        }

        .projects-theme-tabs button {
          border: 1px solid var(--border-color);
          border-radius: 999px;
          padding: 0.55rem 0.75rem;
          background: transparent;
          color: var(--text-secondary);
          font: inherit;
          font-size: 0.82rem;
          cursor: pointer;
        }

        .projects-theme-tabs button.active {
          border-color: var(--accent-purple);
          background: rgba(179, 157, 219, 0.1);
          color: var(--accent-purple);
        }

        .projects-search {
          display: block;
          justify-self: end;
          width: min(100%, 360px);
        }

        .projects-search-label {
          position: absolute;
          width: 1px;
          height: 1px;
          overflow: hidden;
          clip: rect(0 0 0 0);
          white-space: nowrap;
        }

        .projects-search input {
          width: 100%;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          padding: 0.85rem 0.9rem;
          background: #080808;
          color: var(--text-primary);
          font: inherit;
          outline: none;
        }

        .projects-search input:focus {
          border-color: var(--accent-purple);
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 0.85rem;
          padding-bottom: 5rem;
        }

        .project-card {
          min-height: 260px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 1rem;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 1rem;
          background: var(--bg-card);
          color: inherit;
          text-decoration: none;
          transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease;
        }

        .project-card:hover {
          transform: translateY(-4px);
          border-color: var(--accent-purple);
          background: #202020;
        }

        .project-index {
          color: var(--accent-purple);
          font-size: 1.1rem;
          font-weight: 800;
        }

        .project-meta,
        .project-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
        }

        .project-meta {
          margin-bottom: 1rem;
        }

        .project-meta span,
        .project-stack span {
          border: 1px solid var(--border-color);
          border-radius: 4px;
          padding: 0.26rem 0.48rem;
          color: var(--text-secondary);
          font-size: 0.72rem;
        }

        .project-card h2 {
          margin-bottom: 0.75rem;
          font-size: 1.5rem;
        }

        .project-card p,
        .projects-empty,
        .project-row p {
          max-width: none;
          color: var(--text-secondary);
          line-height: 1.7;
        }

        .projects-list {
          display: grid;
          gap: 0;
          padding-bottom: 5rem;
        }

        .project-row {
          display: grid;
          grid-template-columns: 58px minmax(190px, 0.38fr) minmax(0, 1fr) minmax(180px, 0.36fr);
          gap: 1rem;
          align-items: start;
          border-top: 1px solid var(--border-color);
          padding: 1.2rem 0;
          background: transparent;
          color: inherit;
          text-decoration: none;
          transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease;
        }

        .project-row:hover {
          transform: translateX(8px);
          border-color: var(--accent-purple);
          background: rgba(179, 157, 219, 0.05);
        }

        .project-row:hover strong {
          color: var(--accent-purple);
        }

        .project-row > span,
        .project-row em {
          color: var(--accent-purple);
          font-style: normal;
          font-weight: 800;
        }

        .project-row strong {
          color: var(--text-primary);
          transition: color 0.2s ease;
        }

        .project-row p {
          margin-bottom: 0;
        }

        .project-row em {
          font-size: 0.78rem;
        }

        .projects-empty {
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 1.2rem;
          margin-bottom: 5rem;
          background: var(--bg-card);
        }

        @media (max-width: 1080px) {
          .projects-ledger-hero,
          .projects-filterbar {
            grid-template-columns: 1fr;
          }

          .projects-toolrow {
            flex-wrap: wrap;
          }

          .projects-view-switch {
            margin-left: auto;
          }

          .projects-search {
            justify-self: stretch;
            width: 100%;
          }

          .project-row {
            grid-template-columns: 46px minmax(180px, 0.5fr) minmax(0, 1fr);
          }

          .project-row em {
            grid-column: 2 / -1;
          }
        }

        @media (max-width: 760px) {
          .projects-ledger-shell {
            padding: 0 1rem 4rem;
          }

          .projects-ledger-hero {
            padding: 3rem 0 2rem;
          }

          .projects-hero-copy h1 {
            font-size: 2.35rem;
          }

          .projects-category-bars div,
          .project-row {
            grid-template-columns: 1fr;
            gap: 0.5rem;
          }

          .projects-category-bars i {
            width: 100% !important;
          }

          .projects-view-switch {
            margin-left: 0;
          }

          .project-row:hover {
            transform: translateY(-3px);
          }

          .project-row em {
            grid-column: auto;
          }
        }
      `}</style>
    </>
  )
}
