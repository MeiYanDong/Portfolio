import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { Grid2X2, List } from 'lucide-react'
import projectsData from '../../../data/projects.json'
import { projectLayoutMethods } from '../../../data/lab/projectLayoutMethods'

const readyMethods = projectLayoutMethods.map((method) => method.id)

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

const capabilityDefinitions = [
  {
    label: 'On-chain Automation',
    brief: '链上扫描、资金判断、执行和状态读回。',
    test: (project) =>
      project.category?.includes('On-chain') ||
      textPool(project).includes('链上') ||
      textPool(project).includes('交易')
  },
  {
    label: 'AI Agent Systems',
    brief: '把 AI 能力接进持续工作流，而不是做一次性对话。',
    test: (project) => project.category?.includes('AI') || textPool(project).includes('Agent')
  },
  {
    label: 'Product Workbenches',
    brief: '把复杂任务做成可操作、可复查的工作台。',
    test: (project) => project.category?.includes('Workbench') || textPool(project).includes('工作台')
  },
  {
    label: 'Personal Knowledge Tools',
    brief: '围绕个人输入、复习、发布和记忆构建工具。',
    test: (project) => project.category?.includes('Knowledge') || textPool(project).includes('知识')
  },
  {
    label: 'Content Automation',
    brief: '把长内容转成可发布、可分发、可复用的素材。',
    test: (project) => textPool(project).includes('内容') || textPool(project).includes('小红书')
  },
  {
    label: 'Browser / Game / Utility',
    brief: '早期工具、插件和游戏作品作为历史能力证据。',
    test: (project) =>
      ['工具', '应用', '游戏'].includes(project.category) ||
      textPool(project).includes('扩展') ||
      textPool(project).includes('游戏')
  }
]

function stack(project) {
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

function hasText(value) {
  return typeof value === 'string' && value.trim().length > 0
}

function storyText(project, key, fallback) {
  const body = project.story?.[key]
  return hasText(body) ? body : fallback
}

function realProjects() {
  return {
    featured: projectsData.filter((project) => project.tier === 'featured'),
    selected: projectsData.filter((project) => project.tier === 'selected'),
    archive: projectsData.filter((project) => project.tier === 'archive'),
    all: projectsData
  }
}

function methodNumber(method) {
  const index = projectLayoutMethods.findIndex((item) => item.id === method.id)
  return String(index + 1).padStart(2, '0')
}

function getCategories(projects = projectsData) {
  return Array.from(new Set(projects.map((project) => project.category))).filter(Boolean)
}

function categoryLabel(category) {
  return categoryLabels[category] || category
}

function getStackCatalog(projects = projectsData) {
  const counts = new Map()
  projects.forEach((project) => {
    stack(project).forEach((item) => counts.set(item, (counts.get(item) || 0) + 1))
  })
  return Array.from(counts.entries())
    .map(([name, count]) => ({
      name,
      count,
      projects: projects.filter((project) => stack(project).includes(name))
    }))
    .sort((a, b) => b.count - a.count || (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
}

function groupBy(items, getKey) {
  return items.reduce((groups, item) => {
    const key = getKey(item) || 'Other'
    if (!groups[key]) groups[key] = []
    groups[key].push(item)
    return groups
  }, {})
}

function firstRole(project) {
  return (project.role || '个人项目').split('/')[0].trim()
}

function externalLinks(project) {
  return Object.entries(project.links || {}).filter(([, url]) => hasText(url))
}

function Meta({ project }) {
  return (
    <div className="lab-meta">
      <span>{project.year}</span>
      <span>{project.category}</span>
      <span>{tierLabels[project.tier] || project.tier}</span>
    </div>
  )
}

function Stack({ project, limit = 6 }) {
  return (
    <div className="lab-stack">
      {stack(project)
        .slice(0, limit)
        .map((item) => (
          <span key={item}>{item}</span>
        ))}
    </div>
  )
}

function TopNav({ method }) {
  return (
    <nav className="prototype-nav">
      <Link href="/projects/lab/">返回 LAB</Link>
      <span>{methodNumber(method)} / {method.title}</span>
    </nav>
  )
}

function Shell({ method, eyebrow, title, body, className = '', aside, children }) {
  return (
    <main className={`prototype ${className}`}>
      <TopNav method={method} />
      <header className="proto-header">
        <div>
          <p className="prototype-kicker">
            {methodNumber(method)} / {eyebrow || method.family}
          </p>
          <h1>{title}</h1>
          <p>{body}</p>
        </div>
        <aside className="proto-aside">
          {aside || (
            <>
              <strong>{projectsData.length}</strong>
              <span>真实项目数据</span>
              <strong>{getCategories().length}</strong>
              <span>项目领域</span>
            </>
          )}
        </aside>
      </header>
      {children}
    </main>
  )
}

function ProjectAction({ project, label = '进入项目详情' }) {
  return (
    <Link href={`/projects/${project.id}`} className="text-action">
      {label}
    </Link>
  )
}

function ProjectMini({ project, index }) {
  return (
    <Link href={`/projects/${project.id}`} className="mini-card">
      <span>{String(index + 1).padStart(2, '0')}</span>
      <div>
        <Meta project={project} />
        <h3>{project.title}</h3>
        <p>{project.resumeLine || project.description}</p>
      </div>
    </Link>
  )
}

function CaseStudyFirst({ method }) {
  const { featured, selected, archive } = realProjects()
  const lead = featured[0]
  const supporting = [...featured.slice(1), ...selected]

  return (
    <Shell
      method={method}
      eyebrow="CASE STUDY FIRST"
      title="先讲最强案例，再让所有项目成为证据链。"
      body="这套方案把作品页当成简历 case study：首屏只押一个最强系统项目，下面按问题、过程、结果展开真实项目。"
      className="prototype-case"
      aside={
        <>
          <strong>{featured.length}</strong>
          <span>主案例</span>
          <strong>{archive.length}</strong>
          <span>历史作品保留</span>
        </>
      }
    >
      <section className="lead-case">
        <div className="lead-copy">
          <Meta project={lead} />
          <h2>{lead.title}</h2>
          <p className="role">{lead.role}</p>
          <p className="resume">{lead.resumeLine}</p>
          <p>{lead.impact}</p>
          <Stack project={lead} />
          <ProjectAction project={lead} />
        </div>
        <div className="case-board">
          <div>
            <span>Problem</span>
            <p>{lead.story.problem}</p>
          </div>
          <div>
            <span>Process</span>
            <p>{lead.story.process}</p>
          </div>
          <div>
            <span>Result</span>
            <p>{lead.story.result}</p>
          </div>
        </div>
      </section>

      <section className="case-rail">
        {supporting.map((project, index) => (
          <Link href={`/projects/${project.id}`} key={project.id} className="case-slab">
            <span>{String(index + 2).padStart(2, '0')}</span>
            <div>
              <Meta project={project} />
              <h3>{project.title}</h3>
              <p className="resume">{project.resumeLine || project.description}</p>
            </div>
            <p>{project.impact || project.story?.result || project.description}</p>
          </Link>
        ))}
      </section>

      <section className="archive-band">
        <div>
          <p className="prototype-kicker">Archive kept</p>
          <h2>旧作品不删除，只进入历史证据层。</h2>
        </div>
        <div className="archive-pills">
          {archive.map((project) => (
            <Link href={`/projects/${project.id}`} key={project.id}>
              {project.title}
            </Link>
          ))}
        </div>
      </section>
    </Shell>
  )
}

function MissionIndex({ method }) {
  const { featured, selected, archive, all } = realProjects()
  const [activeId, setActiveId] = useState(featured[0].id)
  const active = all.find((project) => project.id === activeId) || all[0]

  return (
    <Shell
      method={method}
      eyebrow="MISSION INDEX"
      title="把项目页做成任务控制台。"
      body="每个项目都是一条任务档案：点左侧索引，右侧实时切换完整任务简报、技术栈、约束和结果。"
      className="prototype-mission"
      aside={
        <>
          <span>ACTIVE FILE</span>
          <strong>{active.title}</strong>
          <small>{featured.length + selected.length} core / {archive.length} archive</small>
        </>
      }
    >
      <section className="mission-grid">
        <aside className="mission-list">
          {all.map((project, index) => (
            <button
              type="button"
              key={project.id}
              className={project.id === active.id ? 'active' : ''}
              onClick={() => setActiveId(project.id)}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{project.title}</strong>
              <em>{project.category}</em>
            </button>
          ))}
        </aside>

        <article className="mission-file">
          <div className="mission-file-head">
            <Meta project={active} />
            <h2>{active.title}</h2>
            <p>{active.resumeLine || active.description}</p>
          </div>
          <div className="mission-file-grid">
            <div>
              <span>Role</span>
              <p>{active.role || '个人项目'}</p>
            </div>
            <div>
              <span>Impact</span>
              <p>{active.impact || active.story?.result || active.description}</p>
            </div>
            <div>
              <span>Stack</span>
              <Stack project={active} limit={8} />
            </div>
            <div>
              <span>Constraints</span>
              <p>{storyText(active, 'problem', '早期作品归档，保留作为历史项目记录。')}</p>
            </div>
          </div>
          {active.highlights?.length > 0 && (
            <div className="mission-highlights">
              {active.highlights.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          )}
          <div className="action-row">
            <ProjectAction project={active} />
            {externalLinks(active).map(([label, url]) => (
              <a href={url} target="_blank" rel="noopener noreferrer" key={label}>
                {label}
              </a>
            ))}
          </div>
        </article>
      </section>
    </Shell>
  )
}

function BentoProofGrid({ method }) {
  const { featured, selected, archive } = realProjects()
  const allProof = [...featured, ...selected]
  const stackCatalog = getStackCatalog(allProof).slice(0, 14)

  return (
    <Shell
      method={method}
      eyebrow="BENTO PROOF GRID"
      title="把结果、能力、技术和归档压成一张证据网格。"
      body="这套方案不按线性阅读组织，而是让招聘方在一个密集界面里快速看到项目规模和能力覆盖。"
      className="prototype-bento"
    >
      <section className="bento-grid">
        <div className="bento-cell hero-cell">
          <span>Primary Proof</span>
          <h2>{featured[0].title}</h2>
          <p>{featured[0].impact}</p>
          <ProjectAction project={featured[0]} label="打开主案例" />
        </div>
        <div className="bento-cell metric-cell">
          <strong>{featured.length}</strong>
          <span>精选系统</span>
        </div>
        <div className="bento-cell metric-cell">
          <strong>{selected.length}</strong>
          <span>入选项目</span>
        </div>
        {featured.slice(1, 4).map((project) => (
          <Link href={`/projects/${project.id}`} className="bento-cell project-cell" key={project.id}>
            <Meta project={project} />
            <h3>{project.title}</h3>
            <p>{project.resumeLine}</p>
          </Link>
        ))}
        <div className="bento-cell stack-cell">
          <span>Stack Coverage</span>
          <div>
            {stackCatalog.map((item) => (
              <p key={item.name}>
                <strong>{item.name}</strong>
                <em>{item.count}</em>
              </p>
            ))}
          </div>
        </div>
        <div className="bento-cell selected-cell">
          <span>Selected Workflows</span>
          {selected.map((project) => (
            <Link href={`/projects/${project.id}`} key={project.id}>
              <strong>{project.title}</strong>
              <small>{project.category}</small>
            </Link>
          ))}
        </div>
        <div className="bento-cell archive-cell">
          <span>Archive still visible</span>
          <p>{archive.map((project) => project.title).join(' / ')}</p>
        </div>
        {featured.slice(4).map((project) => (
          <Link href={`/projects/${project.id}`} className="bento-cell project-cell wide" key={project.id}>
            <Meta project={project} />
            <h3>{project.title}</h3>
            <p>{project.impact}</p>
          </Link>
        ))}
      </section>
    </Shell>
  )
}

function EditorialLedger({ method }) {
  const { featured, selected, archive, all } = realProjects()
  const lead = featured[1] || featured[0]
  const categories = getCategories()

  return (
    <Shell
      method={method}
      eyebrow="EDITORIAL LEDGER"
      title="像杂志目录一样组织项目，让文字证据成为视觉主角。"
      body="适合项目截图不统一的阶段。它把标题、年份、身份、简历表达和结果放在一张严肃目录里，读者先理解项目，而不是先判断图片。"
      className="prototype-editorial"
      aside={
        <>
          <strong>{featured.length}</strong>
          <span>封面级项目</span>
          <strong>{categories.length}</strong>
          <span>编辑分栏</span>
        </>
      }
    >
      <section className="editorial-cover">
        <article>
          <Meta project={lead} />
          <h2>{lead.title}</h2>
          <p>{lead.resumeLine}</p>
          <ProjectAction project={lead} />
        </article>
        <aside>
          {categories.map((category) => (
            <div key={category}>
              <span>{category}</span>
              <strong>{all.filter((project) => project.category === category).length}</strong>
            </div>
          ))}
        </aside>
      </section>
      <section className="editorial-ledger">
        {[...featured, ...selected, ...archive].map((project, index) => (
          <Link href={`/projects/${project.id}`} key={project.id} className="editorial-row">
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{project.title}</strong>
            <p>{project.resumeLine || project.description}</p>
            <em>{project.year}</em>
          </Link>
        ))}
      </section>
    </Shell>
  )
}

function ImpactTable({ method }) {
  const { featured, selected, archive } = realProjects()
  const rows = [...featured, ...selected, ...archive]

  return (
    <Shell
      method={method}
      eyebrow="IMPACT TABLE"
      title="用固定字段把项目压成招聘方能快速扫描的表格。"
      body="每一行回答同一组问题：项目是什么、你负责什么、结果是什么、用了什么技术、证据在哪里。"
      className="prototype-table"
    >
      <section className="impact-table-wrap">
        <table className="impact-table">
          <thead>
            <tr>
              <th>Project</th>
              <th>Role</th>
              <th>Impact</th>
              <th>Stack</th>
              <th>Links</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((project) => (
              <tr key={project.id}>
                <td>
                  <Link href={`/projects/${project.id}`}>{project.title}</Link>
                  <span>{project.year} / {tierLabels[project.tier]}</span>
                </td>
                <td>{project.role || project.category}</td>
                <td>{project.impact || project.story?.result || project.description}</td>
                <td>{stack(project).slice(0, 5).join(' / ')}</td>
                <td>
                  <ProjectAction project={project} label="详情" />
                  {externalLinks(project).slice(0, 2).map(([label, url]) => (
                    <a href={url} target="_blank" rel="noopener noreferrer" key={label}>
                      {label}
                    </a>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </Shell>
  )
}

function TimelineArc({ method }) {
  const { all } = realProjects()
  const years = Object.entries(groupBy(all, (project) => project.year)).sort((a, b) => b[0].localeCompare(a[0]))

  return (
    <Shell
      method={method}
      eyebrow="TIMELINE ARC"
      title="按年份和阶段展示能力从工具到系统的升级。"
      body="这套方案把项目看成一条成长曲线：早期作品证明动手能力，当前精选项目证明系统化工程能力。"
      className="prototype-timeline"
    >
      <section className="timeline">
        {years.map(([year, projects], yearIndex) => (
          <div className="timeline-year" key={year}>
            <div className="timeline-marker">
              <span>{year}</span>
              <em>{projects.length} projects</em>
            </div>
            <div className="timeline-projects">
              {projects.map((project, index) => (
                <Link href={`/projects/${project.id}`} key={project.id} className="timeline-card">
                  <span>{String(yearIndex + 1)}.{String(index + 1)}</span>
                  <h3>{project.title}</h3>
                  <p>{project.resumeLine || project.description}</p>
                  <Stack project={project} limit={4} />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </Shell>
  )
}

function CapabilityMatrix({ method }) {
  const { featured, selected, archive } = realProjects()
  const core = [...featured, ...selected]

  return (
    <Shell
      method={method}
      eyebrow="CAPABILITY MATRIX"
      title="不按项目平铺，而是回答我能解决哪些问题。"
      body="横向是核心项目，纵向是能力维度。每个交叉点只在真实项目覆盖该能力时点亮，避免空泛技能列表。"
      className="prototype-matrix"
    >
      <section className="capability-matrix">
        <div className="matrix-row matrix-head" style={{ gridTemplateColumns: `220px repeat(${core.length}, minmax(136px, 1fr))` }}>
          <strong>Capability</strong>
          {core.map((project) => (
            <span key={project.id}>{project.title}</span>
          ))}
        </div>
        {capabilityDefinitions.slice(0, 5).map((capability) => (
          <div
            className="matrix-row"
            key={capability.label}
            style={{ gridTemplateColumns: `220px repeat(${core.length}, minmax(136px, 1fr))` }}
          >
            <div>
              <strong>{capability.label}</strong>
              <p>{capability.brief}</p>
            </div>
            {core.map((project) => (
              <Link
                href={`/projects/${project.id}`}
                key={project.id}
                className={capability.test(project) ? 'matrix-hit' : 'matrix-miss'}
              >
                {capability.test(project) ? 'applied' : 'not core'}
              </Link>
            ))}
          </div>
        ))}
      </section>
      <section className="archive-band">
        <div>
          <p className="prototype-kicker">Archive evidence</p>
          <h2>早期作品作为补充能力，不挤占核心矩阵。</h2>
        </div>
        <div className="archive-pills">
          {archive.map((project) => (
            <Link href={`/projects/${project.id}`} key={project.id}>
              {project.title}
            </Link>
          ))}
        </div>
      </section>
    </Shell>
  )
}

function SystemsMap({ method }) {
  const { all } = realProjects()
  const flows = [
    {
      label: '链上信号流',
      brief: '市场、钱包、快照和资金数据进入可执行判断。',
      projects: all.filter((project) => capabilityDefinitions[0].test(project))
    },
    {
      label: 'AI 信息流',
      brief: '外部内容进入摘要、记忆、发布和追踪系统。',
      projects: all.filter((project) => capabilityDefinitions[1].test(project) || capabilityDefinitions[4].test(project))
    },
    {
      label: '产品工作台',
      brief: '复杂业务被整理成可操作界面和状态模型。',
      projects: all.filter((project) => capabilityDefinitions[2].test(project))
    },
    {
      label: '个人工具流',
      brief: '知识、插件、习惯和游戏作品保留为工具化能力。',
      projects: all.filter((project) => capabilityDefinitions[3].test(project) || capabilityDefinitions[5].test(project))
    }
  ]

  return (
    <Shell
      method={method}
      eyebrow="SYSTEMS MAP"
      title="把项目看成系统节点，而不是孤立作品。"
      body="这套方案突出项目之间共享的流：数据流、自动化流、AI 流和个人工具流。读者看到的是系统能力网络。"
      className="prototype-map"
    >
      <section className="systems-map">
        {flows.map((flow, index) => (
          <article className="flow-lane" key={flow.label}>
            <div className="flow-copy">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h2>{flow.label}</h2>
              <p>{flow.brief}</p>
            </div>
            <div className="flow-nodes">
              {flow.projects.map((project) => (
                <Link href={`/projects/${project.id}`} key={project.id} className="flow-node">
                  <strong>{project.title}</strong>
                  <small>{project.category}</small>
                </Link>
              ))}
            </div>
          </article>
        ))}
      </section>
    </Shell>
  )
}

function ProjectDossier({ method }) {
  const { featured, selected, archive, all } = realProjects()
  const [activeId, setActiveId] = useState(featured[0].id)
  const active = all.find((project) => project.id === activeId) || all[0]

  return (
    <Shell
      method={method}
      eyebrow="PROJECT DOSSIER"
      title="把每个项目整理成一份可审阅的工程档案。"
      body="档案页强调背景、职责、约束、证据和链接。它适合需要可信交付感的工程项目。"
      className="prototype-dossier"
      aside={
        <>
          <span>OPEN DOSSIER</span>
          <strong>{active.title}</strong>
          <small>{featured.length + selected.length} active files / {archive.length} archived</small>
        </>
      }
    >
      <section className="dossier-layout">
        <aside className="dossier-tabs">
          {all.map((project, index) => (
            <button
              type="button"
              key={project.id}
              onClick={() => setActiveId(project.id)}
              className={active.id === project.id ? 'active' : ''}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              {project.title}
            </button>
          ))}
        </aside>
        <article className="dossier-sheet">
          <Meta project={active} />
          <h2>{active.title}</h2>
          <p>{active.resumeLine || active.description}</p>
          <div className="dossier-grid">
            <div>
              <span>Background</span>
              <p>{storyText(active, 'problem', active.description)}</p>
            </div>
            <div>
              <span>Role</span>
              <p>{active.role || '个人项目'}</p>
            </div>
            <div>
              <span>Evidence</span>
              <p>{active.impact || storyText(active, 'result', active.description)}</p>
            </div>
            <div>
              <span>Stack</span>
              <Stack project={active} limit={8} />
            </div>
          </div>
          <div className="action-row">
            <ProjectAction project={active} />
            {externalLinks(active).map(([label, url]) => (
              <a href={url} target="_blank" rel="noopener noreferrer" key={label}>
                {label}
              </a>
            ))}
          </div>
        </article>
      </section>
    </Shell>
  )
}

function OperatingSystem({ method }) {
  const { all } = realProjects()
  const categories = getCategories()
  const [tier, setTier] = useState('all')
  const [category, setCategory] = useState('all')
  const filtered = all.filter((project) => {
    const tierMatch = tier === 'all' || project.tier === tier
    const categoryMatch = category === 'all' || project.category === category
    return tierMatch && categoryMatch
  })

  return (
    <Shell
      method={method}
      eyebrow="OPERATING SYSTEM"
      title="让项目页像一个可操作的个人作品系统。"
      body="筛选、索引、状态和详情都在同一屏里完成。这个方法本身也在展示系统设计能力。"
      className="prototype-os"
      aside={
        <>
          <strong>{filtered.length}</strong>
          <span>当前结果</span>
          <small>{tier} / {category}</small>
        </>
      }
    >
      <section className="os-panel">
        <div className="os-controls">
          <div>
            <span>Tier</span>
            {['all', 'featured', 'selected', 'archive'].map((item) => (
              <button type="button" key={item} onClick={() => setTier(item)} className={tier === item ? 'active' : ''}>
                {item === 'all' ? '全部' : tierLabels[item]}
              </button>
            ))}
          </div>
          <div>
            <span>Category</span>
            {['all', ...categories].map((item) => (
              <button type="button" key={item} onClick={() => setCategory(item)} className={category === item ? 'active' : ''}>
                {item === 'all' ? '全部领域' : item}
              </button>
            ))}
          </div>
        </div>
        <div className="os-results">
          {filtered.map((project, index) => (
            <ProjectMini project={project} index={index} key={project.id} />
          ))}
        </div>
      </section>
    </Shell>
  )
}

function HeroThenLedger({ method }) {
  const { featured, selected, archive } = realProjects()
  const lead = featured[0]
  const ledger = [...featured.slice(1), ...selected, ...archive]

  return (
    <Shell
      method={method}
      eyebrow="HERO THEN LEDGER"
      title="首屏只讲一个最强项目，随后立刻进入紧凑账本。"
      body="这套混合结构适合个人定位已经明确的作品集：主打项目建立信任，其余项目用账本补充覆盖面。"
      className="prototype-hero-ledger"
    >
      <section className="hero-ledger">
        <article className="hero-ledger-main">
          <Meta project={lead} />
          <h2>{lead.title}</h2>
          <p>{lead.impact}</p>
          <Stack project={lead} />
          <ProjectAction project={lead} label="查看主项目" />
        </article>
        <div className="hero-ledger-list">
          {ledger.map((project, index) => (
            <Link href={`/projects/${project.id}`} key={project.id}>
              <span>{String(index + 2).padStart(2, '0')}</span>
              <strong>{project.title}</strong>
              <em>{project.year}</em>
            </Link>
          ))}
        </div>
      </section>
    </Shell>
  )
}

function RecruiterScan({ method }) {
  const { featured, selected, archive } = realProjects()
  const rows = [...featured, ...selected, ...archive]

  return (
    <Shell
      method={method}
      eyebrow="RECRUITER SCAN"
      title="让招聘方用同一眼速读取问题、动作、结果和技术。"
      body="这不是普通表格。它把每个项目压成一条可面试追问的证据链：真实问题、我做了什么、结果如何、技术是什么。"
      className="prototype-recruiter"
    >
      <section className="scan-list">
        {rows.map((project, index) => (
          <article className="scan-row" key={project.id}>
            <Link href={`/projects/${project.id}`} className="scan-title">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{project.title}</strong>
              <em>{project.category}</em>
            </Link>
            <p>{storyText(project, 'problem', project.description)}</p>
            <p>{storyText(project, 'process', project.role || project.description)}</p>
            <p>{storyText(project, 'result', project.impact || project.description)}</p>
            <p>{stack(project).slice(0, 4).join(' / ')}</p>
          </article>
        ))}
      </section>
    </Shell>
  )
}

function ProofStack({ method }) {
  const { featured, selected, archive } = realProjects()
  const core = [...featured, ...selected]

  return (
    <Shell
      method={method}
      eyebrow="PROOF STACK"
      title="先给证据，再给解释。"
      body="每个项目以结果、外部链接、技术栈和故事递进。读者先确认项目不是 demo，再进入细节。"
      className="prototype-proof"
    >
      <section className="proof-stack">
        {core.map((project, index) => (
          <article className="proof-card" key={project.id}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h2>{project.title}</h2>
            <div>
              <strong>Evidence</strong>
              <p>{project.impact}</p>
            </div>
            <div>
              <strong>Links</strong>
              <p>{externalLinks(project).map(([label]) => label).join(' / ') || '详情页证据'}</p>
            </div>
            <div>
              <strong>Stack</strong>
              <Stack project={project} limit={5} />
            </div>
            <div>
              <strong>Story</strong>
              <p>{storyText(project, 'problem', project.description)}</p>
            </div>
            <ProjectAction project={project} />
          </article>
        ))}
      </section>
      <section className="archive-band">
        <div>
          <p className="prototype-kicker">Archive layer</p>
          <h2>旧作品只作为补充证据，不抢主叙事。</h2>
        </div>
        <div className="archive-pills">
          {archive.map((project) => (
            <Link href={`/projects/${project.id}`} key={project.id}>
              {project.title}
            </Link>
          ))}
        </div>
      </section>
    </Shell>
  )
}

function SplitFeature({ method }) {
  const { featured, selected } = realProjects()
  const projects = [...featured, ...selected]
  const [activeId, setActiveId] = useState(projects[0].id)
  const active = projects.find((project) => project.id === activeId) || projects[0]

  return (
    <Shell
      method={method}
      eyebrow="SPLIT FEATURE"
      title="左右分屏，同时展示叙事和工程证据。"
      body="左侧讲项目为什么重要，右侧展示技术、亮点和链接。底部胶片条可以快速切换不同真实案例。"
      className="prototype-split"
    >
      <section className="split-feature">
        <article>
          <Meta project={active} />
          <h2>{active.title}</h2>
          <p>{active.resumeLine || active.description}</p>
          <p>{active.impact || active.story?.result}</p>
          <ProjectAction project={active} />
        </article>
        <aside>
          <div>
            <span>Role</span>
            <p>{active.role}</p>
          </div>
          <div>
            <span>Highlights</span>
            {(active.highlights || [active.description]).slice(0, 3).map((highlight) => (
              <p key={highlight}>{highlight}</p>
            ))}
          </div>
          <Stack project={active} limit={8} />
        </aside>
      </section>
      <section className="filmstrip">
        {projects.map((project) => (
          <button
            type="button"
            key={project.id}
            onClick={() => setActiveId(project.id)}
            className={project.id === active.id ? 'active' : ''}
          >
            {project.title}
          </button>
        ))}
      </section>
    </Shell>
  )
}

function DenseCommandCenter({ method }) {
  const { featured, selected, archive, all } = realProjects()
  const categories = getCategories()
  const logItems = all.flatMap((project) =>
    (project.highlights || [project.impact || project.description]).slice(0, 1).map((item) => ({
      project,
      item
    }))
  )

  return (
    <Shell
      method={method}
      eyebrow="DENSE COMMAND CENTER"
      title="用运营后台的密度展示项目状态和系统能力。"
      body="适合链上、监控、自动化和情报系统。它让读者像看控制台一样看到项目分层、能力分布和最近证据。"
      className="prototype-command"
      aside={
        <>
          <strong>{featured.length}/{selected.length}/{archive.length}</strong>
          <span>featured / selected / archive</span>
          <strong>{categories.length}</strong>
          <span>domains monitored</span>
        </>
      }
    >
      <section className="command-grid">
        <div className="command-metrics">
          <div><strong>{projectsData.length}</strong><span>projects</span></div>
          <div><strong>{getStackCatalog().length}</strong><span>stack signals</span></div>
          <div><strong>{all.filter((project) => externalLinks(project).length > 0).length}</strong><span>linked files</span></div>
        </div>
        <div className="command-table">
          {all.map((project) => (
            <Link href={`/projects/${project.id}`} key={project.id}>
              <span>{project.tier}</span>
              <strong>{project.title}</strong>
              <em>{project.category}</em>
            </Link>
          ))}
        </div>
        <div className="command-log">
          <span>Evidence log</span>
          {logItems.map(({ project, item }) => (
            <p key={`${project.id}-${item}`}>
              <strong>{project.title}</strong> {item}
            </p>
          ))}
        </div>
      </section>
    </Shell>
  )
}

function ArchiveLedger({ method }) {
  const { featured, selected, archive } = realProjects()

  return (
    <Shell
      method={method}
      eyebrow="ARCHIVE LEDGER"
      title="旧作品保留为紧凑归档，不稀释核心项目。"
      body="这套方法明确区分当前主线和历史作品。旧项目继续可访问，但权重、尺寸和阅读路径都被收敛。"
      className="prototype-archive"
    >
      <section className="archive-layout">
        <div className="archive-core">
          {[...featured, ...selected].map((project, index) => (
            <ProjectMini project={project} index={index} key={project.id} />
          ))}
        </div>
        <aside className="archive-ledger-list">
          <span>ARCHIVE</span>
          {archive.map((project) => (
            <Link href={`/projects/${project.id}`} key={project.id}>
              <strong>{project.title}</strong>
              <em>{project.year} / {project.category}</em>
            </Link>
          ))}
        </aside>
      </section>
    </Shell>
  )
}

function SkillsRadar({ method }) {
  const catalog = getStackCatalog().slice(0, 14)
  const max = catalog[0]?.count || 1

  return (
    <Shell
      method={method}
      eyebrow="SKILLS RADAR"
      title="每个技能点都必须落回真实项目。"
      body="不写孤立技能清单。技术栈按照出现次数和项目证据展示，点击每个项目可以进入详情。"
      className="prototype-skills"
    >
      <section className="skills-radar">
        {catalog.map((item) => (
          <article className="skill-line" key={item.name}>
            <div>
              <strong>{item.name}</strong>
              <span>{item.count} projects</span>
            </div>
            <div className="skill-bar">
              <i style={{ width: `${Math.max(18, (item.count / max) * 100)}%` }} />
            </div>
            <div className="skill-projects">
              {item.projects.map((project) => (
                <Link href={`/projects/${project.id}`} key={project.id}>
                  {project.title}
                </Link>
              ))}
            </div>
          </article>
        ))}
      </section>
    </Shell>
  )
}

function DecisionTrail({ method }) {
  const { featured, selected } = realProjects()
  const rows = [...featured, ...selected]

  return (
    <Shell
      method={method}
      eyebrow="DECISION TRAIL"
      title="展示项目背后的判断质量，而不是只展示产物。"
      body="每个项目按照背景、取舍、实现、结果组织。适合让面试官看到你如何处理复杂度。"
      className="prototype-decision"
    >
      <section className="decision-trail">
        {rows.map((project, index) => (
          <article key={project.id} className="decision-card">
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h2>{project.title}</h2>
            <div>
              <strong>背景</strong>
              <p>{storyText(project, 'problem', project.description)}</p>
            </div>
            <div>
              <strong>取舍</strong>
              <p>{project.role || '围绕真实使用路径做功能取舍。'}</p>
            </div>
            <div>
              <strong>实现</strong>
              <p>{storyText(project, 'process', project.resumeLine || project.description)}</p>
            </div>
            <div>
              <strong>结果</strong>
              <p>{storyText(project, 'result', project.impact || project.description)}</p>
            </div>
            <ProjectAction project={project} />
          </article>
        ))}
      </section>
    </Shell>
  )
}

function ConstraintCards({ method }) {
  const { featured, selected, archive } = realProjects()
  const rows = [...featured, ...selected, ...archive]

  return (
    <Shell
      method={method}
      eyebrow="CONSTRAINT CARDS"
      title="让真实约束和工程边界变成项目价值。"
      body="这套方案不避开问题，而是把隐私边界、生产风险、数据缺口、人工成本等约束直接写进卡片。"
      className="prototype-constraints"
    >
      <section className="constraint-grid">
        {rows.map((project) => (
          <article key={project.id} className="constraint-card">
            <Meta project={project} />
            <h2>{project.title}</h2>
            <div>
              <span>Constraint</span>
              <p>{storyText(project, 'problem', project.description)}</p>
            </div>
            <div>
              <span>Boundary</span>
              <p>{project.role || project.category}</p>
            </div>
            <div>
              <span>Outcome</span>
              <p>{project.impact || storyText(project, 'result', project.description)}</p>
            </div>
            <ProjectAction project={project} label="查看边界细节" />
          </article>
        ))}
      </section>
    </Shell>
  )
}

function StackCatalog({ method }) {
  const catalog = getStackCatalog()
  const [activeStack, setActiveStack] = useState(catalog[0]?.name || '')
  const active = catalog.find((item) => item.name === activeStack) || catalog[0]

  return (
    <Shell
      method={method}
      eyebrow="STACK CATALOG"
      title="读者先按技术栈筛选，再进入对应项目。"
      body="这套方案适合技术面试或合作评估。每个技术栈都是入口，右侧只展示真正用到它的项目。"
      className="prototype-stack-catalog"
      aside={
        <>
          <strong>{catalog.length}</strong>
          <span>技术入口</span>
          <small>{active?.name}</small>
        </>
      }
    >
      <section className="stack-catalog-layout">
        <aside className="stack-sidebar">
          {catalog.map((item) => (
            <button
              type="button"
              key={item.name}
              onClick={() => setActiveStack(item.name)}
              className={item.name === active?.name ? 'active' : ''}
            >
              <span>{item.name}</span>
              <em>{item.count}</em>
            </button>
          ))}
        </aside>
        <div className="stack-catalog-results">
          {active?.projects.map((project, index) => (
            <ProjectMini project={project} index={index} key={project.id} />
          ))}
        </div>
      </section>
    </Shell>
  )
}

function FeaturedTriptych({ method }) {
  const { all, archive } = realProjects()
  const columns = [
    {
      title: '链上自动化',
      brief: '交易、钱包、快照、监控和执行。',
      projects: all.filter((project) => capabilityDefinitions[0].test(project)).slice(0, 4)
    },
    {
      title: 'AI Agent',
      brief: '信息、内容、情报和业务工作流。',
      projects: all.filter((project) => capabilityDefinitions[1].test(project) || capabilityDefinitions[4].test(project)).slice(0, 4)
    },
    {
      title: '产品工作台',
      brief: '把复杂任务产品化为可操作界面。',
      projects: all.filter((project) => capabilityDefinitions[2].test(project) || capabilityDefinitions[3].test(project)).slice(0, 4)
    }
  ]

  return (
    <Shell
      method={method}
      eyebrow="FEATURED TRIPTYCH"
      title="用三列建立个人定位：链上自动化、AI Agent、产品工作台。"
      body="三联画不是平均展示所有项目，而是先让读者记住你的三条主能力线。"
      className="prototype-triptych"
    >
      <section className="triptych">
        {columns.map((column) => (
          <article key={column.title}>
            <span>{column.title}</span>
            <h2>{column.brief}</h2>
            {column.projects.map((project, index) => (
              <ProjectMini project={project} index={index} key={project.id} />
            ))}
          </article>
        ))}
      </section>
      <section className="archive-band">
        <div>
          <p className="prototype-kicker">Archive</p>
          <h2>不属于三条主线的旧作品进入补充层。</h2>
        </div>
        <div className="archive-pills">
          {archive.map((project) => (
            <Link href={`/projects/${project.id}`} key={project.id}>
              {project.title}
            </Link>
          ))}
        </div>
      </section>
    </Shell>
  )
}

function CaseStrip({ method }) {
  const { all } = realProjects()

  return (
    <Shell
      method={method}
      eyebrow="CASE STRIP"
      title="每个项目都是一条横向 case strip。"
      body="比卡片更严肃，比表格更有人味。左侧编号和元信息，右侧给出简历表达、结果和技术。"
      className="prototype-strip"
    >
      <section className="case-strip-list">
        {all.map((project, index) => (
          <Link href={`/projects/${project.id}`} key={project.id} className="case-strip">
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div>
              <Meta project={project} />
              <h2>{project.title}</h2>
            </div>
            <p>{project.resumeLine || project.description}</p>
            <p>{project.impact || storyText(project, 'result', project.description)}</p>
          </Link>
        ))}
      </section>
    </Shell>
  )
}

function LinkLight({ method }) {
  const groups = groupBy(projectsData, (project) => tierLabels[project.tier] || project.tier)

  return (
    <Shell
      method={method}
      eyebrow="LINK LIGHT"
      title="极简链接索引，让文字和跳转成为主角。"
      body="当项目视觉素材不统一时，强行配图会拉低质感。这套方案用最少界面元素保留最高信息密度。"
      className="prototype-link-light"
    >
      <section className="link-light-list">
        {Object.entries(groups).map(([group, projects]) => (
          <div key={group}>
            <h2>{group}</h2>
            {projects.map((project) => (
              <div className="link-light-row" key={project.id}>
                <Link href={`/projects/${project.id}`}>{project.title}</Link>
                <p>{project.resumeLine || project.description}</p>
                <span>{project.year} / {project.category}</span>
                <div>
                  {externalLinks(project).map(([label, url]) => (
                    <a href={url} target="_blank" rel="noopener noreferrer" key={label}>
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </section>
    </Shell>
  )
}

function ProjectOsTabs({ method }) {
  const { featured, selected, archive } = realProjects()
  const [tab, setTab] = useState('featured')
  const tabs = {
    featured,
    selected,
    archive,
    capability: capabilityDefinitions.map((capability) => ({
      id: capability.label,
      title: capability.label,
      description: capability.brief,
      projects: projectsData.filter((project) => capability.test(project))
    }))
  }

  return (
    <Shell
      method={method}
      eyebrow="PROJECT OS TABS"
      title="不同读者用不同 tab 进入同一批项目数据。"
      body="招聘方看精选，合作方看领域，怀旧或完整性需求看归档，技术面试看能力聚合。"
      className="prototype-tabs"
    >
      <section className="tabs-layout">
        <div className="tab-buttons">
          {[
            ['featured', '精选'],
            ['selected', '入选'],
            ['archive', '归档'],
            ['capability', '能力']
          ].map(([id, label]) => (
            <button type="button" key={id} onClick={() => setTab(id)} className={tab === id ? 'active' : ''}>
              {label}
            </button>
          ))}
        </div>
        <div className="tab-content">
          {tab !== 'capability' &&
            tabs[tab].map((project, index) => <ProjectMini project={project} index={index} key={project.id} />)}
          {tab === 'capability' &&
            tabs.capability.map((capability) => (
              <article className="capability-tab-card" key={capability.id}>
                <h2>{capability.title}</h2>
                <p>{capability.description}</p>
                <div>
                  {capability.projects.map((project) => (
                    <Link href={`/projects/${project.id}`} key={project.id}>
                      {project.title}
                    </Link>
                  ))}
                </div>
              </article>
            ))}
        </div>
      </section>
    </Shell>
  )
}

function Scoreboard({ method }) {
  const { featured, selected, archive, all } = realProjects()
  const categories = getCategories().map((category) => ({
    category,
    count: all.filter((project) => project.category === category).length
  }))
  const max = Math.max(...categories.map((item) => item.count))

  return (
    <Shell
      method={method}
      eyebrow="SCOREBOARD"
      title="先给整体规模感，再进入项目细节。"
      body="这套方案适合让读者快速知道：项目总量、精选规模、领域分布、公开链接覆盖，再决定看哪个案例。"
      className="prototype-scoreboard"
    >
      <section className="score-grid">
        <div><strong>{all.length}</strong><span>项目总数</span></div>
        <div><strong>{featured.length}</strong><span>精选项目</span></div>
        <div><strong>{selected.length}</strong><span>入选项目</span></div>
        <div><strong>{archive.length}</strong><span>早期作品</span></div>
      </section>
      <section className="category-bars">
        {categories.map((item) => (
          <div key={item.category}>
            <span>{item.category}</span>
            <i style={{ width: `${Math.max(12, (item.count / max) * 100)}%` }} />
            <em>{item.count}</em>
          </div>
        ))}
      </section>
      <section className="scoreboard-list">
        {all.map((project, index) => (
          <ProjectMini project={project} index={index} key={project.id} />
        ))}
      </section>
    </Shell>
  )
}

function ScoreboardLedger({ method }) {
  const { all } = realProjects()
  const [activeTheme, setActiveTheme] = useState('all')
  const [query, setQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid')
  const themes = getCategories(all)
  const normalizedQuery = query.trim().toLowerCase()
  const filtered = all.filter((project) => {
    const themeMatch = activeTheme === 'all' || project.category === activeTheme
    const searchMatch = !normalizedQuery || textPool(project).toLowerCase().includes(normalizedQuery)
    return themeMatch && searchMatch
  })
  const categoryStats = themes
    .map((category) => ({
      category,
      count: all.filter((project) => project.category === category).length
    }))
    .filter((item) => item.count > 0)
  const maxCategory = Math.max(1, ...categoryStats.map((item) => item.count))

  return (
    <Shell
      method={method}
      eyebrow="SCOREBOARD LEDGER"
      title="统计进度条、网格概览和动态列表融合成一个可检索版本。"
      body="进度条固定展示全部项目的主题分布，下面通过视图切换在网格展示和列表展示之间切换。主题筛选和内容搜索只影响当前项目视图。"
      className="prototype-score-ledger"
      aside={
        <>
          <strong>{filtered.length}</strong>
          <span>当前结果</span>
          <small>{activeTheme === 'all' ? '全部主题' : categoryLabel(activeTheme)}</small>
        </>
      }
    >
      <section className="category-bars score-ledger-bars">
        {categoryStats.map((item) => (
          <div key={item.category}>
            <span>{categoryLabel(item.category)}</span>
            <i style={{ width: `${Math.max(12, (item.count / maxCategory) * 100)}%` }} />
            <em>{item.count}</em>
          </div>
        ))}
      </section>

      <section className="score-ledger-project-tools">
        <div className="score-ledger-theme-heading">
          <span>主题</span>
          <strong>{activeTheme === 'all' ? '全部主题' : categoryLabel(activeTheme)}</strong>
          <small>{filtered.length} 个项目</small>
        </div>
        <div className="score-ledger-viewbar" aria-label="展示方式切换">
          <div className="score-ledger-switch" aria-label="展示方式切换">
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
        </div>
      </section>

      <section className="score-ledger-filterbar">
        <div className="score-ledger-themes" aria-label="主题筛选">
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
        <div className="score-ledger-search">
          <label htmlFor="project-search" className="score-ledger-search-label">内容搜索</label>
          <input
            id="project-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索项目、角色、技术栈、结果..."
          />
        </div>
      </section>

      {filtered.length === 0 ? (
        <p className="score-ledger-empty score-ledger-empty-state">没有匹配项目，换一个主题或关键词。</p>
      ) : viewMode === 'grid' ? (
        <section className="score-ledger-grid">
          {filtered.map((project, index) => (
            <Link href={`/projects/${project.id}`} className="score-ledger-card" key={project.id}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <div className="lab-meta">
                  <span>{project.year}</span>
                  <span>{categoryLabel(project.category)}</span>
                  <span>{tierLabels[project.tier] || project.tier}</span>
                </div>
                <h2>{project.title}</h2>
                <p>{project.resumeLine || project.description}</p>
              </div>
              <Stack project={project} limit={4} />
            </Link>
          ))}
        </section>
      ) : (
        <section className="score-ledger-list">
          {filtered.map((project, index) => (
            <Link href={`/projects/${project.id}`} key={project.id} className="editorial-row score-ledger-row">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{project.title}</strong>
              <p>{project.impact || project.resumeLine || project.description}</p>
              <em>{project.year} / {categoryLabel(project.category)}</em>
            </Link>
          ))}
        </section>
      )}
    </Shell>
  )
}

function CaseStudyCards({ method }) {
  const { featured, selected, archive } = realProjects()
  const rows = [...featured, ...selected]

  return (
    <Shell
      method={method}
      eyebrow="CASE STUDY CARDS"
      title="保留卡片节奏，但每张卡都必须是小型 case study。"
      body="卡片不再只是封面和标题，而是固定包含问题、过程、结果和技术栈。移动端也能保留完整阅读。"
      className="prototype-case-cards"
    >
      <section className="case-card-grid">
        {rows.map((project) => (
          <article className="case-study-card" key={project.id}>
            <Meta project={project} />
            <h2>{project.title}</h2>
            <div>
              <span>Problem</span>
              <p>{storyText(project, 'problem', project.description)}</p>
            </div>
            <div>
              <span>Process</span>
              <p>{storyText(project, 'process', project.role || project.description)}</p>
            </div>
            <div>
              <span>Result</span>
              <p>{storyText(project, 'result', project.impact || project.description)}</p>
            </div>
            <Stack project={project} limit={4} />
            <ProjectAction project={project} />
          </article>
        ))}
      </section>
      <section className="archive-band">
        <div>
          <p className="prototype-kicker">Archive Cards</p>
          <h2>早期作品进入轻量链接组。</h2>
        </div>
        <div className="archive-pills">
          {archive.map((project) => (
            <Link href={`/projects/${project.id}`} key={project.id}>
              {project.title}
            </Link>
          ))}
        </div>
      </section>
    </Shell>
  )
}

function RoleLedIndex({ method }) {
  const groups = groupBy(projectsData, firstRole)

  return (
    <Shell
      method={method}
      eyebrow="ROLE-LED INDEX"
      title="按本人角色组织项目，统一不同领域的个人贡献。"
      body="项目来自 Web3、AI、内容和个人工具，但读者真正要判断的是：你在里面做了什么。"
      className="prototype-role"
    >
      <section className="role-groups">
        {Object.entries(groups).map(([role, projects]) => (
          <article key={role}>
            <h2>{role}</h2>
            {projects.map((project, index) => (
              <ProjectMini project={project} index={index} key={project.id} />
            ))}
          </article>
        ))}
      </section>
    </Shell>
  )
}

function ProductSystemShelf({ method }) {
  const groups = groupBy(projectsData, (project) => project.category)

  return (
    <Shell
      method={method}
      eyebrow="PRODUCT SYSTEM SHELF"
      title="项目像系统货架：每层一个领域，每个项目是一个产品单元。"
      body="这套方法强调多领域项目并不是散的，而是可以被放进清晰货架：链上、AI、工作台、知识工具和早期应用。"
      className="prototype-shelf"
    >
      <section className="shelf">
        {Object.entries(groups).map(([category, projects]) => (
          <article className="shelf-row" key={category}>
            <div>
              <span>{projects.length} units</span>
              <h2>{category}</h2>
            </div>
            <div className="shelf-items">
              {projects.map((project) => (
                <Link href={`/projects/${project.id}`} key={project.id}>
                  <strong>{project.title}</strong>
                  <small>{project.year} / {tierLabels[project.tier]}</small>
                </Link>
              ))}
            </div>
          </article>
        ))}
      </section>
    </Shell>
  )
}

function OneLineIndex({ method }) {
  const { all } = realProjects()
  const [activeId, setActiveId] = useState(all[0].id)
  const active = all.find((project) => project.id === activeId) || all[0]

  return (
    <Shell
      method={method}
      eyebrow="ONE-LINE INDEX"
      title="项目数量增加后，把每个项目压缩成一行。"
      body="一行展示年份、项目、领域、简历表达和技术。点击任意行，右侧固定区域展开完整说明。"
      className="prototype-one-line"
      aside={
        <>
          <span>SELECTED</span>
          <strong>{active.title}</strong>
          <small>{active.category}</small>
        </>
      }
    >
      <section className="one-line-layout">
        <div className="one-line-table">
          {all.map((project, index) => (
            <button
              type="button"
              key={project.id}
              onClick={() => setActiveId(project.id)}
              className={project.id === active.id ? 'active' : ''}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{project.title}</strong>
              <em>{project.year}</em>
              <small>{project.category}</small>
              <p>{project.resumeLine || project.description}</p>
            </button>
          ))}
        </div>
        <aside className="one-line-detail">
          <Meta project={active} />
          <h2>{active.title}</h2>
          <p>{active.impact || active.description}</p>
          <Stack project={active} />
          <ProjectAction project={active} />
        </aside>
      </section>
    </Shell>
  )
}

function LabGallery({ method }) {
  const sampleProjects = projectsData.slice(0, 9)
  const families = groupBy(projectLayoutMethods, (item) => item.family)

  return (
    <Shell
      method={method}
      eyebrow="LAB GALLERY"
      title="同一批真实数据，用多种布局同时打样比较。"
      body="这是设计系统视角的总览页：不是最终作品页，而是把方法、真实项目和信息结构放在一起对照。"
      className="prototype-gallery"
      aside={
        <>
          <strong>{projectLayoutMethods.length}</strong>
          <span>方法总数</span>
          <strong>{sampleProjects.length}</strong>
          <span>样本项目</span>
        </>
      }
    >
      <section className="gallery-families">
        {Object.entries(families).map(([family, methods]) => (
          <article key={family}>
            <h2>{family}</h2>
            <div>
              {methods.map((item, index) => {
                const project = sampleProjects[(index + family.length) % sampleProjects.length]
                return (
                  <Link href={`/projects/lab/${item.id}`} key={item.id}>
                    <span>{item.title}</span>
                    <strong>{project.title}</strong>
                    <p>{project.resumeLine || project.description}</p>
                  </Link>
                )
              })}
            </div>
          </article>
        ))}
      </section>
    </Shell>
  )
}

const prototypeComponents = {
  'case-study-first': CaseStudyFirst,
  'mission-index': MissionIndex,
  'bento-proof-grid': BentoProofGrid,
  'editorial-ledger': EditorialLedger,
  'impact-table': ImpactTable,
  'timeline-arc': TimelineArc,
  'capability-matrix': CapabilityMatrix,
  'systems-map': SystemsMap,
  'project-dossier': ProjectDossier,
  'operating-system': OperatingSystem,
  'hero-then-ledger': HeroThenLedger,
  'recruiter-scan': RecruiterScan,
  'proof-stack': ProofStack,
  'split-feature': SplitFeature,
  'dense-command-center': DenseCommandCenter,
  'archive-ledger': ArchiveLedger,
  'skills-radar': SkillsRadar,
  'decision-trail': DecisionTrail,
  'constraint-cards': ConstraintCards,
  'stack-catalog': StackCatalog,
  'featured-triptych': FeaturedTriptych,
  'case-strip': CaseStrip,
  'link-light': LinkLight,
  'project-os-tabs': ProjectOsTabs,
  scoreboard: Scoreboard,
  'scoreboard-ledger': ScoreboardLedger,
  'case-study-cards': CaseStudyCards,
  'role-led-index': RoleLedIndex,
  'product-system-shelf': ProductSystemShelf,
  'one-line-index': OneLineIndex,
  'lab-gallery': LabGallery
}

export default function MethodPrototype({ method }) {
  const Prototype = prototypeComponents[method.id] || LabGallery

  return (
    <>
      <PrototypeHead method={method} />
      <Prototype method={method} />
      <style jsx global>{`
        .prototype {
          min-height: 100vh;
          background: #050505;
          color: var(--text-primary);
          padding: 1.5rem;
        }

        .prototype-nav {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          max-width: 1480px;
          margin: 0 auto;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid #262626;
          color: var(--text-secondary);
          font-size: 0.78rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .prototype-nav a {
          color: var(--accent-purple);
        }

        .prototype-kicker {
          margin-bottom: 0.75rem;
          color: var(--accent-purple);
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .proto-header {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 270px;
          gap: 3rem;
          align-items: end;
          max-width: 1480px;
          margin: 0 auto;
          padding: 4rem 0 3rem;
        }

        .proto-header h1 {
          max-width: 1080px;
          margin-bottom: 1.25rem;
          font-size: 4.1rem;
          line-height: 0.98;
        }

        .proto-header p {
          max-width: 820px;
          color: var(--text-secondary);
          font-size: 1.05rem;
          line-height: 1.85;
        }

        .proto-aside {
          position: relative;
          overflow: hidden;
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.45rem;
          border: 1px solid #343434;
          border-radius: 8px;
          padding: 1rem;
          background: #101010;
        }

        .proto-aside::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(179, 157, 219, 0.13), transparent);
          transform: translateX(-100%);
          animation: scan 3.2s linear infinite;
        }

        .proto-aside strong,
        .proto-aside span,
        .proto-aside small {
          position: relative;
          z-index: 1;
        }

        .proto-aside strong {
          margin-top: 0.35rem;
          color: var(--text-primary);
          font-size: 2.15rem;
          line-height: 1.08;
        }

        .proto-aside span,
        .proto-aside small {
          color: var(--text-secondary);
          font-size: 0.78rem;
        }

        @keyframes scan {
          to {
            transform: translateX(100%);
          }
        }

        .lab-meta,
        .lab-stack,
        .action-row,
        .archive-pills,
        .filmstrip,
        .tab-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
        }

        .lab-meta {
          margin-bottom: 1rem;
        }

        .lab-meta span,
        .lab-stack span {
          border: 1px solid #343434;
          border-radius: 4px;
          padding: 0.26rem 0.48rem;
          color: var(--text-secondary);
          font-size: 0.72rem;
        }

        .text-action,
        .action-row a,
        .archive-pills a {
          display: inline-flex;
          width: fit-content;
          border: 1px solid var(--accent-purple);
          border-radius: 6px;
          padding: 0.6rem 0.85rem;
          color: var(--accent-purple);
          font-size: 0.84rem;
          font-weight: 700;
        }

        .action-row {
          margin-top: 1.25rem;
        }

        .lead-case,
        .case-rail,
        .archive-band,
        .mission-grid,
        .bento-grid,
        .editorial-cover,
        .editorial-ledger,
        .impact-table-wrap,
        .timeline,
        .capability-matrix,
        .systems-map,
        .dossier-layout,
        .os-panel,
        .hero-ledger,
        .scan-list,
        .proof-stack,
        .split-feature,
        .filmstrip,
        .command-grid,
        .archive-layout,
        .skills-radar,
        .decision-trail,
        .constraint-grid,
        .stack-catalog-layout,
        .triptych,
        .case-strip-list,
        .link-light-list,
        .tabs-layout,
        .score-grid,
        .score-ledger-project-tools,
        .score-ledger-filterbar,
        .score-ledger-viewbar,
        .score-ledger-grid,
        .score-ledger-list,
        .category-bars,
        .scoreboard-list,
        .case-card-grid,
        .role-groups,
        .shelf,
        .one-line-layout,
        .gallery-families {
          max-width: 1480px;
          margin: 0 auto;
        }

        .lead-case {
          display: grid;
          grid-template-columns: 0.82fr 1.18fr;
          border: 1px solid #303030;
          border-radius: 10px;
          overflow: hidden;
          background: #101010;
        }

        .lead-copy {
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 660px;
          padding: 2rem;
        }

        .lead-copy h2,
        .mission-file-head h2,
        .hero-ledger-main h2,
        .split-feature h2,
        .one-line-detail h2 {
          margin-bottom: 1rem;
          font-size: 3rem;
        }

        .lead-copy p,
        .case-board p,
        .case-slab p,
        .mission-file p,
        .bento-cell p,
        .mini-card p,
        .timeline-card p,
        .dossier-sheet p,
        .proof-card p,
        .decision-card p,
        .constraint-card p,
        .case-study-card p {
          max-width: none;
          color: var(--text-secondary);
          line-height: 1.75;
        }

        .lead-copy .role,
        .lead-copy .resume,
        .case-slab .resume {
          color: var(--text-primary);
        }

        .lead-copy .role {
          color: var(--accent-purple);
        }

        .case-board {
          display: grid;
          grid-template-rows: repeat(3, 1fr);
          background: #070707;
        }

        .case-board div {
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 210px;
          padding: 2rem;
          border-left: 1px solid #303030;
          border-top: 1px solid #303030;
        }

        .case-board div:first-child {
          border-top: 0;
        }

        .case-board span,
        .mission-file-grid span,
        .bento-cell > span,
        .flow-copy span,
        .dossier-grid span,
        .split-feature aside span,
        .constraint-card span,
        .case-study-card span,
        .triptych > article > span,
        .shelf-row span {
          display: block;
          margin-bottom: 0.65rem;
          color: var(--accent-purple);
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .case-rail {
          display: grid;
          gap: 0.75rem;
          padding: 1rem 0 4rem;
        }

        .case-slab,
        .case-strip,
        .editorial-row,
        .scan-row,
        .mini-card {
          color: inherit;
          text-decoration: none;
          transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease;
        }

        .case-slab {
          display: grid;
          grid-template-columns: 64px minmax(0, 1fr) minmax(280px, 0.8fr);
          gap: 1.5rem;
          border: 1px solid #303030;
          border-radius: 8px;
          padding: 1.25rem;
          background: #101010;
        }

        .case-slab:hover,
        .mini-card:hover,
        .timeline-card:hover,
        .bento-cell:hover,
        .editorial-row:hover,
        .case-strip:hover {
          transform: translateY(-3px);
          border-color: var(--accent-purple);
        }

        .case-slab > span,
        .mini-card > span,
        .timeline-card > span,
        .proof-card > span,
        .decision-card > span {
          color: var(--accent-purple);
          font-size: 1.15rem;
          font-weight: 800;
        }

        .archive-band {
          display: grid;
          grid-template-columns: minmax(0, 0.7fr) minmax(0, 1.3fr);
          gap: 2rem;
          align-items: start;
          border-top: 1px solid #303030;
          padding: 3rem 0 5rem;
        }

        .archive-pills a {
          border-color: #343434;
          color: var(--text-secondary);
        }

        .mission-grid,
        .dossier-layout,
        .stack-catalog-layout,
        .one-line-layout {
          display: grid;
          grid-template-columns: 380px minmax(0, 1fr);
          gap: 1rem;
          padding-bottom: 5rem;
        }

        .mission-list,
        .dossier-tabs,
        .stack-sidebar,
        .one-line-detail {
          position: sticky;
          top: 1rem;
          align-self: start;
          max-height: calc(100vh - 2rem);
          overflow: auto;
          border: 1px solid #343434;
          border-radius: 8px;
          background: #101010;
        }

        .mission-list button,
        .dossier-tabs button,
        .stack-sidebar button,
        .one-line-table button,
        .filmstrip button,
        .tab-buttons button,
        .os-controls button {
          border: 0;
          background: transparent;
          color: inherit;
          font: inherit;
          cursor: pointer;
        }

        .mission-list button,
        .dossier-tabs button,
        .stack-sidebar button {
          width: 100%;
          display: grid;
          grid-template-columns: 42px minmax(0, 1fr);
          gap: 0.75rem;
          padding: 1rem;
          border-top: 1px solid #2c2c2c;
          text-align: left;
        }

        .mission-list button:first-child,
        .dossier-tabs button:first-child,
        .stack-sidebar button:first-child {
          border-top: 0;
        }

        .mission-list button.active,
        .dossier-tabs button.active,
        .stack-sidebar button.active,
        .one-line-table button.active,
        .filmstrip button.active,
        .tab-buttons button.active,
        .os-controls button.active {
          background: rgba(179, 157, 219, 0.1);
          color: var(--accent-purple);
        }

        .mission-list button em,
        .mission-list button span,
        .dossier-tabs button span,
        .stack-sidebar em,
        .stack-sidebar span {
          font-style: normal;
        }

        .mission-list button span,
        .dossier-tabs button span,
        .stack-sidebar em {
          color: var(--accent-purple);
          font-weight: 800;
        }

        .mission-list button strong {
          display: block;
          margin-bottom: 0.35rem;
        }

        .mission-list button em {
          color: var(--text-secondary);
          font-size: 0.75rem;
        }

        .mission-file,
        .dossier-sheet {
          min-height: 720px;
          border: 1px solid #343434;
          border-radius: 8px;
          padding: 1.5rem;
          background: #101010;
        }

        .mission-file-head {
          border-bottom: 1px solid #303030;
          padding-bottom: 1.5rem;
          margin-bottom: 1rem;
        }

        .mission-file-grid,
        .dossier-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1rem;
        }

        .mission-file-grid > div,
        .dossier-grid > div {
          min-height: 170px;
          border: 1px solid #303030;
          border-radius: 6px;
          padding: 1rem;
          background: #080808;
        }

        .mission-highlights {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1rem;
          margin-top: 1rem;
        }

        .mission-highlights p {
          border-left: 2px solid var(--accent-purple);
          padding-left: 0.85rem;
        }

        .bento-grid {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          grid-auto-rows: minmax(178px, auto);
          gap: 0.85rem;
          padding-bottom: 5rem;
        }

        .bento-cell {
          position: relative;
          overflow: hidden;
          border: 1px solid #303030;
          border-radius: 10px;
          padding: 1rem;
          background: #101010;
          color: inherit;
          text-decoration: none;
          transition: transform 0.25s ease, border-color 0.25s ease;
        }

        .hero-cell {
          grid-column: span 4;
          grid-row: span 2;
          display: flex;
          flex-direction: column;
          justify-content: end;
          background: linear-gradient(135deg, rgba(179, 157, 219, 0.16), transparent 42%), #101010;
        }

        .hero-cell h2 {
          max-width: 760px;
          font-size: 3.5rem;
        }

        .metric-cell {
          grid-column: span 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .metric-cell strong {
          font-size: 4rem;
          line-height: 1;
        }

        .project-cell {
          grid-column: span 2;
        }

        .project-cell.wide {
          grid-column: span 3;
        }

        .stack-cell {
          grid-column: span 3;
          grid-row: span 2;
        }

        .stack-cell div {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.55rem;
        }

        .stack-cell p,
        .selected-cell a,
        .hero-ledger-list a,
        .command-table a,
        .archive-ledger-list a {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          border-top: 1px solid #292929;
          padding: 0.8rem 0;
          color: inherit;
        }

        .stack-cell p {
          border-top: 0;
          border-bottom: 1px solid #292929;
          padding-top: 0;
        }

        .stack-cell em,
        .selected-cell small {
          color: var(--accent-purple);
          font-style: normal;
        }

        .selected-cell {
          grid-column: span 3;
        }

        .archive-cell {
          grid-column: span 6;
        }

        .editorial-cover {
          display: grid;
          grid-template-columns: minmax(0, 1.3fr) minmax(300px, 0.7fr);
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .editorial-cover article,
        .editorial-cover aside,
        .mini-card,
        .timeline-card,
        .proof-card,
        .decision-card,
        .constraint-card,
        .case-study-card,
        .capability-tab-card,
        .role-groups article,
        .shelf-row,
        .gallery-families article,
        .flow-lane,
        .skill-line {
          border: 1px solid #303030;
          border-radius: 8px;
          background: #101010;
        }

        .editorial-cover article {
          min-height: 420px;
          display: flex;
          flex-direction: column;
          justify-content: end;
          padding: 2rem;
        }

        .editorial-cover article h2 {
          font-size: 3.2rem;
        }

        .editorial-cover aside {
          display: grid;
          gap: 0;
          padding: 1rem;
        }

        .editorial-cover aside div {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          border-bottom: 1px solid #292929;
          padding: 0.75rem 0;
        }

        .editorial-row {
          display: grid;
          grid-template-columns: 58px minmax(180px, 0.35fr) minmax(0, 1fr) 64px;
          gap: 1rem;
          align-items: start;
          border-top: 1px solid #303030;
          padding: 1.2rem 0;
        }

        .editorial-row span,
        .editorial-row em {
          color: var(--accent-purple);
          font-style: normal;
          font-weight: 800;
        }

        .editorial-row p {
          max-width: none;
          color: var(--text-secondary);
        }

        .impact-table-wrap {
          overflow: auto;
          border: 1px solid #303030;
          border-radius: 8px;
          background: #101010;
          margin-bottom: 5rem;
        }

        .impact-table {
          width: 100%;
          min-width: 1180px;
          border-collapse: collapse;
        }

        .impact-table th,
        .impact-table td {
          border-bottom: 1px solid #2d2d2d;
          padding: 1rem;
          text-align: left;
          vertical-align: top;
        }

        .impact-table th {
          color: var(--accent-purple);
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .impact-table td {
          color: var(--text-secondary);
          font-size: 0.88rem;
        }

        .impact-table td:first-child a {
          display: block;
          margin-bottom: 0.45rem;
          color: var(--text-primary);
          font-weight: 800;
        }

        .impact-table td:first-child span,
        .impact-table td a {
          display: block;
          color: var(--accent-purple);
          font-size: 0.78rem;
        }

        .timeline {
          position: relative;
          padding-bottom: 5rem;
        }

        .timeline::before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 5rem;
          left: 148px;
          width: 1px;
          background: #303030;
        }

        .timeline-year {
          display: grid;
          grid-template-columns: 220px minmax(0, 1fr);
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .timeline-marker {
          position: sticky;
          top: 1rem;
          align-self: start;
          border: 1px solid #303030;
          border-radius: 8px;
          padding: 1rem;
          background: #101010;
        }

        .timeline-marker span {
          display: block;
          font-size: 2.4rem;
          font-weight: 800;
        }

        .timeline-marker em {
          color: var(--text-secondary);
          font-style: normal;
        }

        .timeline-projects {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 0.85rem;
        }

        .timeline-card,
        .mini-card {
          display: grid;
          gap: 0.75rem;
          padding: 1rem;
        }

        .capability-matrix {
          overflow: auto;
          padding-bottom: 5rem;
        }

        .matrix-row {
          min-width: 1220px;
          display: grid;
          border-top: 1px solid #303030;
        }

        .matrix-row > * {
          min-height: 96px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-left: 1px solid #262626;
          padding: 0.85rem;
        }

        .matrix-row > *:first-child {
          border-left: 0;
        }

        .matrix-head {
          border-top: 0;
          color: var(--accent-purple);
          font-size: 0.78rem;
          letter-spacing: 0.06em;
        }

        .matrix-row p {
          max-width: none;
          margin: 0;
          color: var(--text-secondary);
          font-size: 0.78rem;
        }

        .matrix-hit,
        .matrix-miss {
          color: inherit;
          font-size: 0.78rem;
          text-transform: uppercase;
        }

        .matrix-hit {
          background: rgba(179, 157, 219, 0.08);
          color: var(--accent-purple);
        }

        .matrix-miss {
          color: #555;
        }

        .systems-map,
        .decision-trail,
        .constraint-grid,
        .proof-stack,
        .case-card-grid,
        .role-groups,
        .gallery-families {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1rem;
          padding-bottom: 5rem;
        }

        .flow-lane {
          display: grid;
          grid-template-rows: auto 1fr;
          min-height: 520px;
          overflow: hidden;
        }

        .flow-copy {
          padding: 1rem;
          border-bottom: 1px solid #303030;
        }

        .flow-nodes {
          display: grid;
          align-content: start;
          gap: 0.65rem;
          padding: 1rem;
          background:
            linear-gradient(#161616 1px, transparent 1px),
            linear-gradient(90deg, #161616 1px, transparent 1px),
            #080808;
          background-size: 28px 28px;
        }

        .flow-node {
          display: grid;
          gap: 0.2rem;
          border: 1px solid #343434;
          border-radius: 6px;
          padding: 0.75rem;
          background: #101010;
        }

        .flow-node small {
          color: var(--text-secondary);
        }

        .os-panel {
          display: grid;
          grid-template-columns: 330px minmax(0, 1fr);
          gap: 1rem;
          padding-bottom: 5rem;
        }

        .os-controls {
          display: grid;
          align-content: start;
          gap: 1rem;
          border: 1px solid #303030;
          border-radius: 8px;
          padding: 1rem;
          background: #101010;
        }

        .os-controls > div {
          display: grid;
          gap: 0.45rem;
        }

        .os-controls span,
        .command-log > span,
        .archive-ledger-list > span {
          color: var(--accent-purple);
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .os-controls button,
        .filmstrip button,
        .tab-buttons button {
          border: 1px solid #343434;
          border-radius: 6px;
          padding: 0.6rem 0.75rem;
          color: var(--text-secondary);
          text-align: left;
        }

        .os-results,
        .stack-catalog-results,
        .scoreboard-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 0.85rem;
        }

        .hero-ledger,
        .archive-layout {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(360px, 0.95fr);
          gap: 1rem;
          padding-bottom: 5rem;
        }

        .hero-ledger-main {
          min-height: 620px;
          display: flex;
          flex-direction: column;
          justify-content: end;
          border: 1px solid #303030;
          border-radius: 8px;
          padding: 2rem;
          background: linear-gradient(135deg, rgba(179, 157, 219, 0.12), transparent 44%), #101010;
        }

        .hero-ledger-list,
        .archive-ledger-list {
          border: 1px solid #303030;
          border-radius: 8px;
          padding: 1rem;
          background: #101010;
        }

        .scan-list {
          padding-bottom: 5rem;
        }

        .scan-row {
          display: grid;
          grid-template-columns: minmax(220px, 0.9fr) repeat(4, minmax(180px, 1fr));
          gap: 1rem;
          border-top: 1px solid #303030;
          padding: 1rem 0;
        }

        .scan-row p {
          max-width: none;
          color: var(--text-secondary);
          font-size: 0.86rem;
        }

        .scan-title {
          display: grid;
          gap: 0.25rem;
        }

        .scan-title span {
          color: var(--accent-purple);
          font-weight: 800;
        }

        .scan-title em {
          color: var(--text-secondary);
          font-style: normal;
          font-size: 0.78rem;
        }

        .proof-card,
        .decision-card,
        .constraint-card,
        .case-study-card {
          display: grid;
          align-content: start;
          gap: 1rem;
          padding: 1rem;
        }

        .proof-card h2,
        .decision-card h2,
        .constraint-card h2,
        .case-study-card h2 {
          font-size: 1.55rem;
        }

        .proof-card strong,
        .decision-card strong {
          display: block;
          margin-bottom: 0.45rem;
          color: var(--accent-purple);
          font-size: 0.74rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .split-feature {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(360px, 0.82fr);
          gap: 1rem;
        }

        .split-feature article,
        .split-feature aside {
          min-height: 560px;
          border: 1px solid #303030;
          border-radius: 8px;
          padding: 2rem;
          background: #101010;
        }

        .split-feature article {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .split-feature aside {
          display: grid;
          gap: 1rem;
          align-content: center;
        }

        .filmstrip {
          padding: 1rem 0 5rem;
        }

        .command-grid {
          display: grid;
          grid-template-columns: minmax(260px, 0.6fr) minmax(360px, 0.9fr) minmax(0, 1fr);
          gap: 1rem;
          padding-bottom: 5rem;
        }

        .command-metrics {
          display: grid;
          gap: 1rem;
        }

        .command-metrics div,
        .command-log,
        .command-table {
          border: 1px solid #303030;
          border-radius: 8px;
          padding: 1rem;
          background: #101010;
        }

        .command-metrics strong,
        .score-grid strong {
          display: block;
          font-size: 3rem;
          line-height: 1;
        }

        .command-metrics span,
        .score-grid span {
          color: var(--text-secondary);
        }

        .command-log p {
          max-width: none;
          border-top: 1px solid #292929;
          padding-top: 0.75rem;
          color: var(--text-secondary);
          font-size: 0.86rem;
        }

        .archive-core {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 0.85rem;
        }

        .skills-radar {
          display: grid;
          gap: 0.75rem;
          padding-bottom: 5rem;
        }

        .skill-line {
          display: grid;
          grid-template-columns: 220px minmax(160px, 0.8fr) minmax(0, 1fr);
          gap: 1rem;
          align-items: center;
          padding: 1rem;
        }

        .skill-line span {
          display: block;
          color: var(--text-secondary);
          font-size: 0.78rem;
        }

        .skill-bar {
          height: 8px;
          overflow: hidden;
          border-radius: 999px;
          background: #242424;
        }

        .skill-bar i {
          display: block;
          height: 100%;
          border-radius: inherit;
          background: var(--accent-purple);
        }

        .skill-projects {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
        }

        .skill-projects a,
        .capability-tab-card a,
        .gallery-families a {
          border: 1px solid #343434;
          border-radius: 6px;
          padding: 0.45rem 0.6rem;
          color: var(--text-secondary);
          font-size: 0.78rem;
        }

        .constraint-grid {
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        }

        .stack-sidebar button {
          grid-template-columns: minmax(0, 1fr) 42px;
        }

        .triptych {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1rem;
          padding-bottom: 2rem;
        }

        .triptych > article {
          display: grid;
          align-content: start;
          gap: 0.75rem;
          border: 1px solid #303030;
          border-radius: 8px;
          padding: 1rem;
          background: #101010;
        }

        .case-strip-list {
          display: grid;
          gap: 0.65rem;
          padding-bottom: 5rem;
        }

        .case-strip {
          display: grid;
          grid-template-columns: 56px minmax(180px, 0.42fr) minmax(0, 0.85fr) minmax(0, 1fr);
          gap: 1rem;
          border: 1px solid #303030;
          border-radius: 8px;
          padding: 1rem;
          background: #101010;
        }

        .case-strip p {
          max-width: none;
          color: var(--text-secondary);
        }

        .link-light-list {
          display: grid;
          gap: 3rem;
          padding-bottom: 5rem;
        }

        .link-light-list h2 {
          border-bottom: 1px solid #303030;
          padding-bottom: 0.75rem;
          font-size: 1.1rem;
          color: var(--accent-purple);
        }

        .link-light-row {
          display: grid;
          grid-template-columns: minmax(190px, 0.35fr) minmax(0, 1fr) minmax(170px, 0.25fr) minmax(120px, 0.2fr);
          gap: 1rem;
          border-bottom: 1px solid #252525;
          padding: 0.85rem 0;
          align-items: start;
        }

        .link-light-row p {
          max-width: none;
          color: var(--text-secondary);
        }

        .link-light-row span {
          color: var(--text-secondary);
          font-size: 0.82rem;
        }

        .link-light-row div {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
        }

        .tabs-layout {
          display: grid;
          gap: 1rem;
          padding-bottom: 5rem;
        }

        .tab-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 0.85rem;
        }

        .capability-tab-card {
          padding: 1rem;
        }

        .capability-tab-card div {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
        }

        .score-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .score-grid div {
          border: 1px solid #303030;
          border-radius: 8px;
          padding: 1rem;
          background: #101010;
        }

        .category-bars {
          display: grid;
          gap: 0.65rem;
          margin-bottom: 1rem;
        }

        .category-bars div {
          display: grid;
          grid-template-columns: 240px minmax(0, 1fr) 42px;
          gap: 1rem;
          align-items: center;
        }

        .category-bars i {
          display: block;
          height: 9px;
          border-radius: 999px;
          background: var(--accent-purple);
        }

        .category-bars span,
        .category-bars em {
          color: var(--text-secondary);
          font-style: normal;
        }

        .score-ledger-search {
          display: block;
          justify-self: end;
          width: min(100%, 360px);
        }

        .score-ledger-search-label {
          position: absolute;
          width: 1px;
          height: 1px;
          overflow: hidden;
          clip: rect(0 0 0 0);
          white-space: nowrap;
        }

        .score-ledger-search input {
          width: 100%;
          border: 1px solid #343434;
          border-radius: 6px;
          padding: 0.85rem 0.9rem;
          background: #080808;
          color: var(--text-primary);
          font: inherit;
          outline: none;
        }

        .score-ledger-search input:focus {
          border-color: var(--accent-purple);
        }

        .score-ledger-filterbar {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(260px, 360px);
          gap: 1rem;
          align-items: start;
          margin-bottom: 0.85rem;
        }

        .score-ledger-themes {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          align-content: start;
        }

        .score-ledger-themes button {
          border: 1px solid #343434;
          border-radius: 999px;
          padding: 0.55rem 0.75rem;
          background: transparent;
          color: var(--text-secondary);
          font: inherit;
          font-size: 0.82rem;
          cursor: pointer;
        }

        .score-ledger-themes button.active {
          border-color: var(--accent-purple);
          background: rgba(179, 157, 219, 0.1);
          color: var(--accent-purple);
        }

        .score-ledger-bars {
          border: 1px solid #303030;
          border-radius: 8px;
          padding: 1rem;
          background: #101010;
        }

        .score-ledger-project-tools {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-top: 1.5rem;
          margin-bottom: 0.7rem;
        }

        .score-ledger-theme-heading {
          min-width: 0;
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 0.55rem;
        }

        .score-ledger-theme-heading span {
          color: var(--accent-purple);
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0;
        }

        .score-ledger-theme-heading strong {
          color: var(--text-primary);
          font-size: 1.12rem;
          line-height: 1.2;
        }

        .score-ledger-theme-heading small {
          color: var(--text-secondary);
          font-size: 0.78rem;
        }

        .score-ledger-viewbar {
          display: inline-flex;
          width: fit-content;
          max-width: 100%;
          justify-content: flex-end;
          align-items: center;
          border: 1px solid #303030;
          border-radius: 999px;
          padding: 0.18rem;
          margin: 0;
          background: #101010;
        }

        .score-ledger-switch {
          display: inline-flex;
          gap: 0.18rem;
        }

        .score-ledger-switch button {
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

        .score-ledger-switch button svg {
          display: block;
        }

        .score-ledger-switch button.active {
          background: rgba(179, 157, 219, 0.13);
          color: var(--accent-purple);
        }

        .score-ledger-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 0.85rem;
          padding-bottom: 5rem;
        }

        .score-ledger-card {
          min-height: 260px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 1rem;
          border: 1px solid #303030;
          border-radius: 8px;
          padding: 1rem;
          background: #101010;
          color: inherit;
          text-decoration: none;
          transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease;
        }

        .score-ledger-card:hover {
          transform: translateY(-4px);
          border-color: var(--accent-purple);
          background: #141414;
        }

        .score-ledger-card > span {
          color: var(--accent-purple);
          font-size: 1.15rem;
          font-weight: 800;
        }

        .score-ledger-card h2 {
          font-size: 1.5rem;
        }

        .score-ledger-card p,
        .score-ledger-empty {
          max-width: none;
          color: var(--text-secondary);
        }

        .score-ledger-empty-state {
          max-width: 1480px;
          border: 1px solid #303030;
          border-radius: 8px;
          padding: 1.2rem;
          margin: 0 auto 5rem;
          background: #101010;
        }

        .score-ledger-list {
          padding-bottom: 5rem;
        }

        .score-ledger-row {
          grid-template-columns: 58px minmax(190px, 0.38fr) minmax(0, 1fr) minmax(180px, 0.36fr);
        }

        .score-ledger-row:hover {
          transform: translateX(8px);
          background: rgba(179, 157, 219, 0.05);
        }

        .case-card-grid {
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
        }

        .role-groups article {
          display: grid;
          gap: 0.75rem;
          padding: 1rem;
        }

        .shelf {
          display: grid;
          gap: 1rem;
          padding-bottom: 5rem;
        }

        .shelf-row {
          display: grid;
          grid-template-columns: 260px minmax(0, 1fr);
          gap: 1rem;
          padding: 1rem;
        }

        .shelf-items {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 0.75rem;
        }

        .shelf-items a {
          min-height: 120px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border: 1px solid #303030;
          border-radius: 6px;
          padding: 0.85rem;
          background: #080808;
          color: inherit;
        }

        .shelf-items small {
          color: var(--text-secondary);
        }

        .one-line-table {
          display: grid;
          gap: 0.35rem;
        }

        .one-line-table button {
          display: grid;
          grid-template-columns: 44px minmax(180px, 0.35fr) 70px minmax(140px, 0.25fr) minmax(0, 1fr);
          gap: 0.75rem;
          align-items: start;
          border: 1px solid #303030;
          border-radius: 6px;
          padding: 0.7rem;
          background: #101010;
          text-align: left;
        }

        .one-line-table span,
        .one-line-table em,
        .one-line-table small {
          color: var(--accent-purple);
          font-style: normal;
        }

        .one-line-table p {
          max-width: none;
          margin: 0;
          color: var(--text-secondary);
          font-size: 0.82rem;
        }

        .one-line-detail {
          padding: 1rem;
        }

        .gallery-families article {
          padding: 1rem;
        }

        .gallery-families article > div {
          display: grid;
          gap: 0.65rem;
        }

        .gallery-families a {
          display: block;
          padding: 0.8rem;
        }

        .gallery-families span {
          display: block;
          margin-bottom: 0.35rem;
          color: var(--accent-purple);
          font-weight: 800;
        }

        .gallery-families p {
          max-width: none;
          color: var(--text-secondary);
          font-size: 0.82rem;
        }

        @media (max-width: 1080px) {
          .proto-header,
          .lead-case,
          .archive-band,
          .mission-grid,
          .dossier-layout,
          .stack-catalog-layout,
          .one-line-layout,
          .editorial-cover,
          .os-panel,
          .hero-ledger,
          .archive-layout,
          .split-feature,
          .command-grid,
          .shelf-row,
          .score-ledger-filterbar {
            grid-template-columns: 1fr;
          }

          .score-ledger-project-tools {
            flex-wrap: wrap;
          }

          .score-ledger-viewbar {
            margin-left: auto;
          }

          .score-ledger-search {
            justify-self: stretch;
            width: 100%;
          }

          .mission-list,
          .dossier-tabs,
          .stack-sidebar,
          .one-line-detail,
          .timeline-marker {
            position: static;
            max-height: none;
          }

          .bento-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .hero-cell,
          .metric-cell,
          .project-cell,
          .project-cell.wide,
          .stack-cell,
          .selected-cell,
          .archive-cell {
            grid-column: span 2;
          }

          .timeline::before {
            display: none;
          }

          .timeline-year,
          .triptych,
          .score-grid,
          .skill-line,
          .case-strip,
          .link-light-row,
          .score-ledger-row,
          .one-line-table button,
          .scan-row {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 720px) {
          .prototype {
            padding: 1rem;
          }

          .proto-header h1,
          .lead-copy h2,
          .mission-file-head h2,
          .hero-cell h2,
          .hero-ledger-main h2,
          .split-feature h2,
          .one-line-detail h2 {
            font-size: 2.25rem;
          }

          .lead-copy,
          .hero-ledger-main,
          .split-feature article,
          .split-feature aside {
            min-height: auto;
          }

          .case-slab,
          .mission-file-grid,
          .dossier-grid,
          .mission-highlights,
          .bento-grid,
          .stack-cell div,
          .category-bars div {
            grid-template-columns: 1fr;
          }

          .hero-cell,
          .metric-cell,
          .project-cell,
          .project-cell.wide,
          .stack-cell,
          .selected-cell,
          .archive-cell {
            grid-column: span 1;
          }
        }
      `}</style>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: readyMethods.map((methodId) => ({ params: { methodId } })),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const method = projectLayoutMethods.find((item) => item.id === params.methodId)

  if (!method || !readyMethods.includes(method.id)) {
    return { notFound: true }
  }

  return {
    props: { method }
  }
}

function PrototypeHead({ method }) {
  return (
    <Head>
      <title>{`${method.title} - Project Layout LAB`}</title>
      <meta name="description" content={`${method.title} 项目展示方法完整原型`} />
    </Head>
  )
}
