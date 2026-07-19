import Head from 'next/head'
import Link from 'next/link'
import { ArrowUpRight, BriefcaseBusiness, Download } from 'lucide-react'
import profilesData from '../data/profiles.json'
import casesData from '../data/cases.json'
import projectsData from '../data/projects.json'

export default function Home() {
  const profile = profilesData[0]
  const featuredCase = casesData[0]
  const featuredProjects = profile.projectIds
    .slice(0, 4)
    .map((projectId) => projectsData.find((project) => project.id === projectId))
    .filter(Boolean)

  return (
    <>
      <Head>
        <title>梅炎栋 - AI 内容运营与 Vibe Coding</title>
        <meta
          name="description"
          content="梅炎栋的个人网站：AI 内容运营、Vibe Coding 项目、内容自动化流程与真实运营案例。"
        />
      </Head>

      <main className="home-shell">
        <section className="home-hero">
          <div className="home-hero-copy">
            <p className="home-kicker">AI 内容运营 / Vibe Coding</p>
            <h1>梅炎栋</h1>
            <strong>把 AI 工具内容、运营实践和自动化能力，沉淀为可传播内容与可运行系统。</strong>
            <p>
              南通大学应用统计学专业 2027 届本科生。独立完成内容选题、研究、制作、发布和复盘，并使用 Claude Code、Codex 将重复流程做成 Skill 与自动化脚本。
            </p>
            <div className="home-actions">
              <Link href="/profiles/ai-content-operations" className="home-primary-action">
                <BriefcaseBusiness size={17} />
                查看岗位档案
              </Link>
              <Link href={`/cases/${featuredCase.id}`} className="home-secondary-action">
                阅读代表案例
                <ArrowUpRight size={17} />
              </Link>
              <a
                href={profile.resume.file}
                target="_blank"
                rel="noopener noreferrer"
                className="home-secondary-action"
              >
                <Download size={17} />
                简历
              </a>
            </div>
          </div>
          <div className="home-availability">
            <span>目前状态</span>
            <strong>{profile.availability}</strong>
            <small>{profile.education}</small>
          </div>
        </section>

        <section className="home-metrics" aria-label="关键结果">
          {profile.metrics.map((metric) => (
            <div key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
              <small>{metric.note}</small>
            </div>
          ))}
        </section>

        <section className="home-section home-case-section">
          <div className="home-section-heading">
            <span>代表案例</span>
            <h2>内容不只获得播放，也要回答是否带来真实结果</h2>
            <p>{featuredCase.headline}</p>
          </div>
          <Link href={`/cases/${featuredCase.id}`} className="home-case-link">
            <div className="home-case-image">
              <img src={featuredCase.cover} alt={featuredCase.coverAlt} />
            </div>
            <div className="home-case-copy">
              <div>
                <span>{featuredCase.category}</span>
                <span>{featuredCase.period}</span>
              </div>
              <h3>{featuredCase.title}</h3>
              <p>{featuredCase.description}</p>
              <dl>
                {featuredCase.metrics.slice(0, 3).map((metric) => (
                  <div key={metric.label}>
                    <dt>{metric.value}</dt>
                    <dd>{metric.label}</dd>
                  </div>
                ))}
              </dl>
              <strong>
                查看目标、过程和原始证据
                <ArrowUpRight size={17} />
              </strong>
            </div>
          </Link>
        </section>

        <section className="home-section home-projects-section">
          <div className="home-section-heading">
            <span>相关项目</span>
            <h2>用真实项目证明产品与自动化能力</h2>
            <p>从内容发布到信息整理和链上雷达，项目记录我如何把个人需求做成可以运行的系统。</p>
          </div>
          <div className="home-project-list">
            {featuredProjects.map((project, index) => (
              <Link href={`/projects/${project.id}`} key={project.id}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <strong>{project.title}</strong>
                  <small>{project.year} / {project.tags.slice(0, 3).join(' / ')}</small>
                </div>
                <p>{project.resumeLine || project.description}</p>
                <ArrowUpRight size={17} />
              </Link>
            ))}
          </div>
          <Link href="/projects" className="home-inline-link">
            浏览全部项目
            <ArrowUpRight size={16} />
          </Link>
        </section>

        <section className="home-routes" aria-label="网站内容结构">
          <Link href="/projects">
            <span>项目</span>
            <strong>做出了什么</strong>
            <p>产品、工具、自动化流程与可运行系统。</p>
            <ArrowUpRight size={17} />
          </Link>
          <Link href="/cases">
            <span>案例</span>
            <strong>如何产生结果</strong>
            <p>目标、职责、过程、结果和原始证据。</p>
            <ArrowUpRight size={17} />
          </Link>
          <Link href="/articles">
            <span>文章</span>
            <strong>如何理解问题</strong>
            <p>围绕具体主题沉淀可检索的实践笔记。</p>
            <ArrowUpRight size={17} />
          </Link>
        </section>
      </main>

      <style jsx global>{`
        .home-shell {
          width: 100%;
          max-width: 1480px;
          margin: 0 auto;
          padding: 0 1.5rem 5rem;
        }

        .home-hero {
          position: relative;
          display: grid;
          grid-template-columns: minmax(0, 1fr) 300px;
          gap: 4rem;
          align-items: end;
          min-height: 560px;
          overflow: hidden;
          padding: 4rem 3rem 3rem;
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
          isolation: isolate;
        }

        .home-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: -2;
          background: url('/avatar.jpg') 78% 42% / cover no-repeat;
          filter: grayscale(0.18) saturate(0.66) contrast(1.04);
          transform: scale(1.025);
        }

        .home-hero::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: -1;
          background:
            linear-gradient(90deg, rgba(7, 7, 7, 0.99) 0%, rgba(7, 7, 7, 0.92) 48%, rgba(7, 7, 7, 0.28) 100%),
            linear-gradient(0deg, rgba(7, 7, 7, 0.9), transparent 70%);
        }

        .home-hero-copy {
          max-width: 900px;
        }

        .home-kicker,
        .home-section-heading > span,
        .home-routes > a > span,
        .home-availability > span {
          color: var(--accent-purple);
          font-size: 0.74rem;
          font-weight: 800;
        }

        .home-hero h1 {
          margin: 0.45rem 0 0.85rem;
          font-size: 5.75rem;
          line-height: 0.94;
        }

        .home-hero-copy > strong {
          display: block;
          max-width: 820px;
          font-size: 1.58rem;
          line-height: 1.45;
        }

        .home-hero-copy > p:not(.home-kicker) {
          max-width: 760px;
          margin-top: 1rem;
          color: #c6c6c6;
          line-height: 1.8;
        }

        .home-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-top: 1.75rem;
        }

        .home-primary-action,
        .home-secondary-action {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          min-height: 44px;
          border-radius: 6px;
          padding: 0.7rem 1rem;
          font-size: 0.82rem;
          font-weight: 800;
        }

        .home-primary-action {
          border: 1px solid var(--accent-purple);
          color: var(--bg-primary);
          background: var(--accent-purple);
        }

        .home-secondary-action {
          border: 1px solid rgba(255, 255, 255, 0.28);
          color: var(--text-primary);
          background: rgba(10, 10, 10, 0.58);
        }

        .home-primary-action:hover,
        .home-secondary-action:hover {
          transform: translateY(-2px);
        }

        .home-availability {
          display: grid;
          min-width: 0;
          border-top: 1px solid rgba(255, 255, 255, 0.24);
          padding-top: 1rem;
        }

        .home-availability strong {
          margin-top: 0.35rem;
          font-size: 1rem;
        }

        .home-availability small {
          margin-top: 0.2rem;
          color: #b0b0b0;
          font-size: 0.76rem;
        }

        .home-metrics {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          border-bottom: 1px solid var(--border-color);
        }

        .home-metrics > div {
          display: grid;
          min-width: 0;
          padding: 1.35rem 1.25rem;
          border-right: 1px solid var(--border-color);
        }

        .home-metrics > div:last-child {
          border-right: 0;
        }

        .home-metrics strong {
          font-size: 2rem;
          line-height: 1;
        }

        .home-metrics span {
          margin-top: 0.45rem;
          font-size: 0.82rem;
          font-weight: 700;
        }

        .home-metrics small {
          color: var(--text-secondary);
          font-size: 0.72rem;
        }

        .home-section {
          display: grid;
          grid-template-columns: minmax(260px, 0.7fr) minmax(0, 1.3fr);
          gap: 4rem;
          padding: 5rem 0;
          border-bottom: 1px solid var(--border-color);
        }

        .home-section-heading h2 {
          max-width: 500px;
          margin-top: 0.5rem;
          font-size: 2.6rem;
        }

        .home-section-heading p {
          color: var(--text-secondary);
          line-height: 1.8;
        }

        .home-case-link {
          display: grid;
          grid-template-columns: minmax(240px, 0.8fr) minmax(0, 1.2fr);
          min-width: 0;
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
          color: inherit;
        }

        .home-case-image {
          min-height: 430px;
          overflow: hidden;
          border-right: 1px solid var(--border-color);
        }

        .home-case-image img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 28%;
          filter: saturate(0.72) contrast(1.05);
          transition: transform 0.45s ease, filter 0.3s ease;
        }

        .home-case-link:hover .home-case-image img {
          transform: scale(1.025);
          filter: saturate(0.92) contrast(1.05);
        }

        .home-case-copy {
          display: flex;
          flex-direction: column;
          min-width: 0;
          padding: 1.6rem;
        }

        .home-case-copy > div:first-child {
          display: flex;
          flex-wrap: wrap;
          gap: 0.7rem;
          color: var(--text-secondary);
          font-size: 0.76rem;
        }

        .home-case-copy h3 {
          margin-top: 1.15rem;
          font-size: 1.7rem;
        }

        .home-case-copy > p {
          color: var(--text-secondary);
          line-height: 1.75;
        }

        .home-case-copy dl {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          margin-top: auto;
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
        }

        .home-case-copy dl > div {
          display: grid;
          padding: 0.8rem;
          border-right: 1px solid var(--border-color);
        }

        .home-case-copy dl > div:last-child {
          border-right: 0;
        }

        .home-case-copy dt {
          font-size: 1.1rem;
          font-weight: 800;
        }

        .home-case-copy dd {
          color: var(--text-secondary);
          font-size: 0.7rem;
        }

        .home-case-copy > strong,
        .home-inline-link {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          width: fit-content;
          margin-top: 1.15rem;
          color: var(--accent-purple);
          font-size: 0.82rem;
        }

        .home-project-list {
          border-bottom: 1px solid var(--border-color);
        }

        .home-project-list > a {
          display: grid;
          grid-template-columns: 46px 210px minmax(0, 1fr) auto;
          gap: 1rem;
          align-items: center;
          min-width: 0;
          padding: 1.05rem 0;
          border-top: 1px solid var(--border-color);
          color: inherit;
        }

        .home-project-list > a > span {
          color: var(--accent-purple);
          font-size: 0.78rem;
          font-weight: 800;
        }

        .home-project-list > a > div {
          display: grid;
          min-width: 0;
        }

        .home-project-list > a:hover strong {
          color: var(--accent-purple);
        }

        .home-project-list small,
        .home-project-list p {
          color: var(--text-secondary);
          font-size: 0.76rem;
        }

        .home-project-list p {
          max-width: none;
          margin: 0;
          line-height: 1.6;
        }

        .home-routes {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          border-bottom: 1px solid var(--border-color);
        }

        .home-routes > a {
          display: grid;
          min-width: 0;
          min-height: 205px;
          padding: 1.5rem;
          border-right: 1px solid var(--border-color);
          color: inherit;
        }

        .home-routes > a:last-child {
          border-right: 0;
        }

        .home-routes strong {
          margin-top: 1rem;
          font-size: 1.2rem;
        }

        .home-routes p {
          color: var(--text-secondary);
          font-size: 0.82rem;
        }

        .home-routes svg {
          align-self: end;
          color: var(--accent-purple);
        }

        .home-routes > a:hover strong {
          color: var(--accent-purple);
        }

        @media (max-width: 980px) {
          .home-hero {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .home-section {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }

          .home-section-heading {
            max-width: 760px;
          }
        }

        @media (max-width: 720px) {
          .home-shell {
            padding: 0 1rem 4rem;
          }

          .home-hero {
            min-height: 620px;
            padding: 2rem 1.25rem;
          }

          .home-hero::before {
            background-position: 62% 34%;
          }

          .home-hero::after {
            background: linear-gradient(0deg, rgba(7, 7, 7, 0.99) 0%, rgba(7, 7, 7, 0.86) 72%, rgba(7, 7, 7, 0.48) 100%);
          }

          .home-hero h1 {
            font-size: 3.7rem;
          }

          .home-hero-copy > strong {
            font-size: 1.18rem;
          }

          .home-metrics {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .home-metrics > div:nth-child(2) {
            border-right: 0;
          }

          .home-metrics > div:nth-child(-n + 2) {
            border-bottom: 1px solid var(--border-color);
          }

          .home-section {
            padding: 3.5rem 0;
          }

          .home-section-heading h2 {
            font-size: 1.9rem;
          }

          .home-case-link {
            grid-template-columns: 1fr;
          }

          .home-case-image {
            min-height: 320px;
            border-right: 0;
            border-bottom: 1px solid var(--border-color);
          }

          .home-case-copy {
            min-height: 430px;
            padding: 1.25rem;
          }

          .home-project-list > a {
            grid-template-columns: 34px minmax(0, 1fr) auto;
            gap: 0.75rem;
          }

          .home-project-list p {
            grid-column: 2 / -1;
          }

          .home-routes {
            grid-template-columns: 1fr;
          }

          .home-routes > a {
            min-height: 180px;
            border-right: 0;
            border-bottom: 1px solid var(--border-color);
          }

          .home-routes > a:last-child {
            border-bottom: 0;
          }
        }
      `}</style>
    </>
  )
}
