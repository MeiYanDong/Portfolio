import Head from 'next/head'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ArrowUpRight, Grid2X2, List } from 'lucide-react'
import projectsData from '../../data/projects.json'
import {
  getProjectTrack,
  getTrackProjects,
  projectTrackOrder,
  projectTracks
} from '../../lib/projectTracks'

const tierLabels = {
  featured: '精选项目',
  selected: '入选项目',
  archive: '早期作品'
}

const categoryLabels = {
  'On-chain Automation': '链上自动化',
  'Product Workbenches': '产品工作台',
  'AI Agent Systems': '智能体系统',
  'Personal Knowledge Tools': '个人知识工具',
  'Creative Applications': '创意应用'
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
    project.track,
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
      <em>
        {project.year} / {categoryLabel(project.category)}
      </em>
    </Link>
  )
}

function FeaturedProject({ project, index }) {
  return (
    <Link href={`/projects/${project.id}`} className="featured-project">
      <div className={`featured-project-visual${project.cover ? ' has-cover' : ''}`}>
        {project.cover ? (
          <img src={project.cover} alt={`${project.title} 项目封面`} />
        ) : (
          <div className="featured-project-question">
            <span>问题 {String(index + 1).padStart(2, '0')}</span>
            <p>{project.story?.problem || project.description}</p>
            <small>{categoryLabel(project.category)}</small>
          </div>
        )}
      </div>
      <div className="featured-project-copy">
        <ProjectMeta project={project} />
        <h2>{project.title}</h2>
        <p>{project.impact || project.resumeLine || project.description}</p>
        <strong className="featured-project-link">
          阅读完整项目
          <ArrowUpRight size={16} />
        </strong>
      </div>
    </Link>
  )
}

export function ProjectDirectory({ track = 'web2' }) {
  const [activeTheme, setActiveTheme] = useState('all')
  const [query, setQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid')

  const activeTrack = getProjectTrack(track)
  const trackProjects = useMemo(
    () => getTrackProjects(projectsData, activeTrack.id),
    [activeTrack.id]
  )
  const featuredProjects = useMemo(
    () => trackProjects.filter((project) => project.tier === 'featured').slice(0, 3),
    [trackProjects]
  )
  const themes = useMemo(() => getCategories(trackProjects), [trackProjects])
  const trackCounts = useMemo(
    () =>
      Object.fromEntries(
        projectTrackOrder.map((trackId) => [
          trackId,
          getTrackProjects(projectsData, trackId).length
        ])
      ),
    []
  )
  const normalizedQuery = query.trim().toLowerCase()

  const filteredProjects = useMemo(() => {
    return trackProjects.filter((project) => {
      const themeMatch = activeTheme === 'all' || project.category === activeTheme
      const searchMatch =
        !normalizedQuery || textPool(project).toLowerCase().includes(normalizedQuery)
      return themeMatch && searchMatch
    })
  }, [activeTheme, normalizedQuery, trackProjects])
  const directoryProjects =
    activeTheme === 'all' && !normalizedQuery
      ? filteredProjects.filter((project) => project.tier !== 'featured')
      : filteredProjects

  const categoryStats = useMemo(
    () =>
      themes
        .map((category) => ({
          category,
          count: trackProjects.filter((project) => project.category === category).length
        }))
        .filter((item) => item.count > 0),
    [themes, trackProjects]
  )
  const maxCategory = Math.max(1, ...categoryStats.map((item) => item.count))

  return (
    <>
      <Head>
        <title>{`${activeTrack.label} 项目 - 梅炎栋`}</title>
        <meta name="description" content={activeTrack.metaDescription} />
      </Head>

      <main className="projects-ledger-shell">
        <section className="projects-ledger-hero">
          <div className="projects-hero-copy">
            <p className="projects-kicker">{`项目 / ${activeTrack.label}`}</p>
            <h1>把遇到的问题，做成可以运行的东西。</h1>
            <p>{activeTrack.description}</p>
          </div>
        </section>

        <nav className="projects-track-switch" aria-label="经验路线切换">
          {projectTrackOrder.map((trackId, index) => {
            const item = projectTracks[trackId]
            const isActive = trackId === activeTrack.id

            return (
              <Link
                href={item.href}
                className={isActive ? 'active' : ''}
                aria-current={isActive ? 'page' : undefined}
                key={trackId}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <strong>{item.label}</strong>
                  <small>{item.title}</small>
                </div>
                <em>{trackCounts[trackId]} 项</em>
              </Link>
            )
          })}
        </nav>

        <section className="projects-featured" aria-labelledby="projects-featured-title">
          <div className="projects-section-heading">
            <div>
              <span>从这里开始</span>
              <h2 id="projects-featured-title">{activeTrack.label} 代表项目</h2>
            </div>
            <p>
              第一次浏览不必从完整列表开始。这三项代表作分别展示当前路线中最重要的问题、判断和实现结果。
            </p>
          </div>
          <div className="projects-featured-grid">
            {featuredProjects.map((project, index) => (
              <FeaturedProject key={project.id} project={project} index={index} />
            ))}
          </div>
        </section>

        <section className="projects-library-heading" aria-labelledby="projects-library-title">
          <div>
            <span>更多项目</span>
            <h2 id="projects-library-title">继续浏览其他 {activeTrack.label} 项目</h2>
          </div>
          <p>
            代表作已经在上方呈现；这里继续收纳入选项目和早期作品。使用主题或搜索时，全部匹配项目都会回到结果中。
          </p>
        </section>

        <section
          className="projects-category-bars"
          aria-label={`${activeTrack.label} 项目主题分布`}
        >
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
            <small>{directoryProjects.length} 个项目</small>
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
            <label htmlFor="project-search" className="projects-search-label">
              内容搜索
            </label>
            <input
              id="project-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索项目、角色、技术栈、结果..."
            />
          </div>
        </section>

        {directoryProjects.length === 0 ? (
          <p className="projects-empty">没有匹配项目，换一个主题或关键词。</p>
        ) : viewMode === 'grid' ? (
          <section className="projects-grid">
            {directoryProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </section>
        ) : (
          <section className="projects-list">
            {directoryProjects.map((project, index) => (
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

        .projects-track-switch {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          border-bottom: 1px solid var(--border-color);
        }

        .projects-track-switch a {
          position: relative;
          display: grid;
          grid-template-columns: 34px minmax(0, 1fr) auto;
          gap: 0.85rem;
          align-items: center;
          min-width: 0;
          padding: 1.15rem 1rem;
          border-right: 1px solid var(--border-color);
          color: var(--text-secondary);
          transition:
            color 0.2s ease,
            background 0.2s ease;
        }

        .projects-track-switch a:last-child {
          border-right: 0;
        }

        .projects-track-switch a::after {
          content: '';
          position: absolute;
          right: 0;
          bottom: -1px;
          left: 0;
          height: 2px;
          background: transparent;
        }

        .projects-track-switch a:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.025);
        }

        .projects-track-switch a.active {
          color: var(--text-primary);
          background: rgba(179, 157, 219, 0.045);
        }

        .projects-track-switch a.active::after {
          background: var(--accent-purple);
        }

        .projects-track-switch a > span,
        .projects-track-switch a > em {
          color: var(--accent-purple);
          font-size: 0.72rem;
          font-style: normal;
          font-weight: 800;
        }

        .projects-track-switch a > div {
          display: grid;
          min-width: 0;
          gap: 0.15rem;
        }

        .projects-track-switch strong {
          font-size: 1rem;
        }

        .projects-track-switch small {
          overflow: hidden;
          color: var(--text-secondary);
          font-size: 0.74rem;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .projects-featured {
          padding: 4.5rem 0;
          border-bottom: 1px solid var(--border-color);
        }

        .projects-section-heading,
        .projects-library-heading {
          display: grid;
          grid-template-columns: minmax(260px, 0.72fr) minmax(0, 1.28fr);
          gap: 3rem;
          align-items: end;
        }

        .projects-section-heading {
          margin-bottom: 1.5rem;
        }

        .projects-section-heading span,
        .projects-library-heading span {
          color: var(--accent-purple);
          font-size: 0.72rem;
          font-weight: 800;
        }

        .projects-section-heading h2,
        .projects-library-heading h2 {
          margin-top: 0.4rem;
          font-size: 2rem;
        }

        .projects-section-heading p,
        .projects-library-heading p {
          max-width: 760px;
          margin: 0;
          color: var(--text-secondary);
          line-height: 1.8;
        }

        .projects-featured-grid {
          display: grid;
          grid-template-columns: 1.16fr repeat(2, minmax(0, 1fr));
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
        }

        .featured-project {
          display: flex;
          min-width: 0;
          flex-direction: column;
          border-right: 1px solid var(--border-color);
          color: inherit;
          transition: background 0.25s ease;
        }

        .featured-project:last-child {
          border-right: 0;
        }

        .featured-project:hover {
          background: rgba(179, 157, 219, 0.045);
        }

        .featured-project-visual {
          display: grid;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          border-bottom: 1px solid var(--border-color);
          background: #171717;
        }

        .featured-project-visual img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          filter: saturate(0.78) contrast(1.03);
          transition:
            transform 0.4s ease,
            filter 0.25s ease;
        }

        .featured-project:hover .featured-project-visual img {
          transform: scale(1.02);
          filter: saturate(0.95) contrast(1.03);
        }

        .featured-project-question {
          display: grid;
          align-content: space-between;
          min-height: 100%;
          padding: 1rem;
        }

        .featured-project-question span,
        .featured-project-question small {
          color: var(--accent-purple);
          font-size: 0.72rem;
          font-weight: 800;
        }

        .featured-project-question p {
          display: -webkit-box;
          max-width: 30ch;
          overflow: hidden;
          margin: 1rem 0;
          color: var(--text-primary);
          font-size: 1rem;
          font-weight: 700;
          line-height: 1.55;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        }

        .featured-project-question small {
          color: var(--text-secondary);
        }

        .featured-project-copy {
          display: flex;
          min-height: 285px;
          flex: 1;
          flex-direction: column;
          padding: 1.15rem;
        }

        .featured-project-copy h2 {
          margin-bottom: 0.7rem;
          font-size: 1.45rem;
        }

        .featured-project-copy > p {
          max-width: none;
          margin-bottom: 1.5rem;
          color: var(--text-secondary);
          font-size: 0.82rem;
          line-height: 1.75;
        }

        .featured-project-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          width: fit-content;
          margin-top: auto;
          color: var(--accent-purple);
          font-size: 0.78rem;
        }

        .projects-library-heading {
          padding-top: 4rem;
          padding-bottom: 1.5rem;
        }

        .projects-category-bars {
          display: grid;
          gap: 0.65rem;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 1rem;
          margin: 0;
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
          transition:
            transform 0.25s ease,
            border-color 0.25s ease,
            background 0.25s ease;
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
          transition:
            transform 0.25s ease,
            border-color 0.25s ease,
            background 0.25s ease;
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
          .projects-section-heading,
          .projects-library-heading,
          .projects-filterbar {
            grid-template-columns: 1fr;
          }

          .projects-featured-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
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

          .projects-featured {
            padding: 3.5rem 0;
          }

          .projects-section-heading h2,
          .projects-library-heading h2 {
            font-size: 1.65rem;
          }

          .projects-featured-grid {
            grid-template-columns: 1fr;
          }

          .featured-project {
            border-right: 0;
            border-bottom: 1px solid var(--border-color);
          }

          .featured-project:last-child {
            border-bottom: 0;
          }

          .featured-project-copy {
            min-height: 250px;
          }

          .projects-category-bars div,
          .project-row {
            grid-template-columns: 1fr;
            gap: 0.5rem;
          }

          .projects-track-switch a {
            grid-template-columns: 24px minmax(0, 1fr);
            gap: 0.55rem;
            padding: 0.9rem 0.7rem;
          }

          .projects-track-switch a > em {
            display: none;
          }

          .projects-track-switch small {
            white-space: normal;
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

export default function Projects() {
  return <ProjectDirectory track="web2" />
}
