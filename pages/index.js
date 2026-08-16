import Head from 'next/head'
import Link from 'next/link'
import { ArrowUpRight, BriefcaseBusiness } from 'lucide-react'
import TokenProofPreview from '../components/TokenProofPreview'
import profilesData from '../data/profiles.json'
import casesData from '../data/cases.json'
import projectsData from '../data/projects.json'
import { getAllArticles } from '../lib/articles'
import { getTrackProjects, projectTrackOrder, projectTracks } from '../lib/projectTracks'

const showcaseProjectIds = [
  'daily-ai-digest',
  'xhs-publish-skill',
  '42-market-sniper',
  'virtuals-whale-radar'
]

function formatDate(date) {
  return String(date || '').replace(/-/g, '.')
}

export default function Home({ latestArticles }) {
  const profile = profilesData[0]
  const featuredCase = casesData[0]
  const featuredProjects = showcaseProjectIds
    .map((projectId) => projectsData.find((project) => project.id === projectId))
    .filter(Boolean)
  const trackCounts = Object.fromEntries(
    projectTrackOrder.map((trackId) => [trackId, getTrackProjects(projectsData, trackId).length])
  )

  return (
    <>
      <Head>
        <title>梅炎栋 - AI 内容、独立产品与自动化实践</title>
        <meta
          name="description"
          content="梅炎栋的个人网站：记录 AI 内容实践、独立产品、自动化系统、真实案例与长期文章。"
        />
      </Head>

      <main className="home-shell">
        <section className="home-hero">
          <div className="home-hero-copy">
            <p className="home-kicker">AI 内容 / 独立产品 / 自动化实践</p>
            <h1>梅炎栋</h1>
            <strong>我用 AI 做内容，也把反复出现的问题做成产品和自动化系统。</strong>
            <p>
              这里记录我做过的产品、产生过真实结果的实践，以及在解决具体问题时写下的文章。你不必按顺序阅读，可以从任何感兴趣的入口开始。
            </p>
            <div className="home-actions">
              <Link href="/projects" className="home-primary-action">
                浏览代表项目
                <ArrowUpRight size={17} />
              </Link>
              <Link href="/cases" className="home-secondary-action">
                查看实践案例
                <ArrowUpRight size={17} />
              </Link>
              <Link href="/about" className="home-secondary-action">
                关于我
              </Link>
            </div>
          </div>
          <div className="home-availability">
            <span>当前关注</span>
            <strong>AI 内容、个人工具与可运行系统</strong>
            <small>持续公开项目、实践过程与阶段性判断</small>
            <Link href="/profiles/ai-content-operations" className="home-profile-link">
              <BriefcaseBusiness size={15} />
              专业档案
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </section>

        <section className="home-metrics" aria-label="关键结果">
          {profile.metrics.map((metric) => {
            const isTokenMetric = metric.label === 'Token 累计使用'

            return (
              <div
                key={metric.label}
                className={`home-metric${isTokenMetric ? ' home-metric--token' : ''}`}
              >
                <div className="home-metric-copy">
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                  <small>{metric.note}</small>
                </div>
                {isTokenMetric && <TokenProofPreview />}
              </div>
            )
          })}
        </section>

        <section className="home-start" aria-labelledby="home-start-title">
          <div className="home-start-heading">
            <span>从这里开始</span>
            <h2 id="home-start-title">第一次来，可以从三条路径认识我</h2>
            <p>看做出来的东西、看事情如何被做成，或者直接进入一篇具体文章。</p>
          </div>
          <nav className="home-routes" aria-label="网站内容入口">
            <Link href="/projects">
              <span>项目</span>
              <strong>我做出了什么</strong>
              <p>产品、工具、内容工作流与链上自动化系统。</p>
              <ArrowUpRight size={17} />
            </Link>
            <Link href="/cases">
              <span>实践案例</span>
              <strong>我如何把事情做成</strong>
              <p>目标、职责、推进过程、真实结果与原始证据。</p>
              <ArrowUpRight size={17} />
            </Link>
            <Link href="/articles">
              <span>文章</span>
              <strong>我如何理解问题</strong>
              <p>从具体问题出发，记录方法、判断与完整操作路径。</p>
              <ArrowUpRight size={17} />
            </Link>
          </nav>
        </section>

        <section className="home-section home-case-section">
          <div className="home-section-heading">
            <span>实践案例</span>
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
            <span>代表项目</span>
            <h2>把反复出现的问题，做成能运行的工具和系统</h2>
            <p>
              项目横跨内容工作流、个人工具和链上策略。这里先给出四个起点，完整项目仍可按 Web2 与
              Web3 路线浏览。
            </p>
          </div>
          <div className="home-project-directory">
            <div className="home-project-list">
              {featuredProjects.map((project, index) => (
                <Link href={`/projects/${project.id}`} key={project.id}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <strong>{project.title}</strong>
                    <small>
                      {project.year} / {project.tags.slice(0, 3).join(' / ')}
                    </small>
                  </div>
                  <p>{project.resumeLine || project.description}</p>
                  <ArrowUpRight size={17} />
                </Link>
              ))}
            </div>
            <nav className="home-track-routes" aria-label="项目经验路线">
              {projectTrackOrder.map((trackId) => {
                const track = projectTracks[trackId]

                return (
                  <Link href={track.href} key={track.id}>
                    <div>
                      <span>{track.label} 路线</span>
                      <em>{trackCounts[trackId]} 个项目</em>
                    </div>
                    <strong>{track.title}</strong>
                    <p>{track.description}</p>
                    <ArrowUpRight size={17} />
                  </Link>
                )
              })}
            </nav>
          </div>
        </section>

        <section className="home-section home-articles-section">
          <div className="home-section-heading">
            <span>最近文章</span>
            <h2>从一个具体问题开始，保留完整的理解过程</h2>
            <p>
              文章不是项目说明的附录，而是另一条认识路径：这里会留下方法、选择依据和可以复用的操作过程。
            </p>
          </div>
          <div className="home-article-list">
            {latestArticles.map((article, index) => (
              <Link href={`/articles/${article.slug}`} key={article.slug}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <small>{article.topics[0] || '文章'}</small>
                  <strong>{article.title}</strong>
                  <p>{article.summary}</p>
                </div>
                <em>
                  {formatDate(article.date)} / {article.readingTime} 分钟
                </em>
                <ArrowUpRight size={17} />
              </Link>
            ))}
            <Link href="/articles" className="home-all-articles">
              浏览全部文章
              <ArrowUpRight size={16} />
            </Link>
          </div>
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
            linear-gradient(
              90deg,
              rgba(7, 7, 7, 0.99) 0%,
              rgba(7, 7, 7, 0.92) 48%,
              rgba(7, 7, 7, 0.28) 100%
            ),
            linear-gradient(0deg, rgba(7, 7, 7, 0.9), transparent 70%);
        }

        .home-hero-copy {
          max-width: 900px;
        }

        .home-kicker,
        .home-start-heading > span,
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

        .home-profile-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          width: fit-content;
          margin-top: 1rem;
          color: #d2d2d2;
          font-size: 0.76rem;
          font-weight: 700;
        }

        .home-profile-link:hover {
          color: var(--accent-purple);
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

        .home-metric-copy {
          display: grid;
          min-width: 0;
        }

        .home-metric--token {
          grid-template-columns: minmax(0, 1fr) 128px;
          align-items: center;
          gap: 0.75rem;
        }

        .home-token-proof {
          position: relative;
          display: block;
          width: 128px;
          height: 78px;
          overflow: hidden;
          justify-self: end;
          border: 0;
          border-radius: 5px;
          padding: 0;
          background: #fff;
          line-height: 0;
          cursor: zoom-in;
        }

        .home-token-proof > img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: transform 220ms ease;
        }

        .home-token-proof-indicator {
          position: absolute;
          right: 6px;
          bottom: 6px;
          display: grid;
          width: 24px;
          height: 24px;
          margin: 0 !important;
          place-items: center;
          border: 1px solid rgba(255, 255, 255, 0.36);
          border-radius: 50%;
          background: rgba(8, 8, 8, 0.76);
          color: #fff;
          opacity: 0;
          transform: translateY(3px);
          transition:
            opacity 180ms ease,
            transform 180ms ease;
        }

        .home-token-proof:hover > img {
          transform: scale(1.025);
        }

        .home-token-proof:hover .home-token-proof-indicator,
        .home-token-proof:focus-visible .home-token-proof-indicator {
          opacity: 1;
          transform: translateY(0);
        }

        .home-token-proof:focus-visible {
          outline: 2px solid var(--accent-purple);
          outline-offset: 3px;
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

        .home-start {
          display: grid;
          grid-template-columns: minmax(260px, 0.7fr) minmax(0, 1.3fr);
          gap: 4rem;
          padding: 4.5rem 0;
          border-bottom: 1px solid var(--border-color);
        }

        .home-start-heading h2 {
          max-width: 520px;
          margin-top: 0.5rem;
          font-size: 2.35rem;
        }

        .home-start-heading p {
          max-width: 520px;
          color: var(--text-secondary);
          line-height: 1.8;
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
          grid-template-columns: repeat(2, minmax(0, 1fr));
          min-width: 0;
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
          color: inherit;
        }

        .home-case-image {
          display: grid;
          min-height: 430px;
          overflow: hidden;
          border-right: 1px solid var(--border-color);
          background: #11131d;
        }

        .home-case-image img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          filter: saturate(0.72) contrast(1.05);
          transition: filter 0.3s ease;
        }

        .home-case-link:hover .home-case-image img {
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

        .home-case-copy > strong {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          width: fit-content;
          margin-top: 1.15rem;
          color: var(--accent-purple);
          font-size: 0.82rem;
        }

        .home-project-directory {
          min-width: 0;
        }

        .home-track-routes {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          border-bottom: 1px solid var(--border-color);
        }

        .home-track-routes > a {
          position: relative;
          display: grid;
          min-width: 0;
          min-height: 160px;
          align-content: start;
          padding: 1.2rem;
          border-right: 1px solid var(--border-color);
          color: inherit;
          transition: background 0.2s ease;
        }

        .home-track-routes > a:last-child {
          border-right: 0;
        }

        .home-track-routes > a:hover {
          background: rgba(179, 157, 219, 0.045);
        }

        .home-track-routes > a > div {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          align-items: center;
        }

        .home-track-routes span,
        .home-track-routes em {
          color: var(--accent-purple);
          font-size: 0.72rem;
          font-style: normal;
          font-weight: 800;
        }

        .home-track-routes strong {
          margin-top: 0.75rem;
          font-size: 1.08rem;
        }

        .home-track-routes p {
          max-width: none;
          margin: 0.4rem 0 0;
          color: var(--text-secondary);
          font-size: 0.76rem;
          line-height: 1.7;
        }

        .home-track-routes svg {
          align-self: end;
          margin-top: 0.7rem;
          color: var(--accent-purple);
        }

        .home-track-routes > a:hover strong {
          color: var(--accent-purple);
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
          border-top: 1px solid var(--border-color);
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

        .home-article-list {
          min-width: 0;
          border-bottom: 1px solid var(--border-color);
        }

        .home-article-list > a:not(.home-all-articles) {
          display: grid;
          grid-template-columns: 42px minmax(0, 1fr) auto auto;
          gap: 1rem;
          align-items: start;
          min-width: 0;
          border-top: 1px solid var(--border-color);
          padding: 1.25rem 0;
          color: inherit;
        }

        .home-article-list > a > span,
        .home-article-list small,
        .home-article-list em {
          color: var(--accent-purple);
          font-size: 0.74rem;
          font-style: normal;
          font-weight: 800;
        }

        .home-article-list > a > div {
          display: grid;
          min-width: 0;
          gap: 0.35rem;
        }

        .home-article-list strong {
          font-size: 1.08rem;
        }

        .home-article-list p {
          max-width: 720px;
          margin: 0;
          color: var(--text-secondary);
          font-size: 0.78rem;
          line-height: 1.7;
        }

        .home-article-list em {
          color: var(--text-secondary);
          white-space: nowrap;
        }

        .home-article-list > a:hover strong {
          color: var(--accent-purple);
        }

        .home-all-articles {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 1rem 0;
          color: var(--accent-purple) !important;
          font-size: 0.8rem;
          font-weight: 800;
        }

        @media (max-width: 980px) {
          .home-hero {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .home-start,
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
            background: linear-gradient(
              0deg,
              rgba(7, 7, 7, 0.99) 0%,
              rgba(7, 7, 7, 0.86) 72%,
              rgba(7, 7, 7, 0.48) 100%
            );
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

          .home-metric--token {
            position: relative;
            grid-template-columns: minmax(0, 1fr);
            gap: 0;
          }

          .home-token-proof {
            position: absolute;
            top: 1.35rem;
            right: 1.25rem;
            width: 56px;
            height: 34px;
          }

          .home-token-proof-indicator {
            display: none;
          }

          .home-section {
            padding: 3.5rem 0;
          }

          .home-start {
            padding: 3.5rem 0;
          }

          .home-start-heading h2,
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

          .home-track-routes {
            grid-template-columns: 1fr;
          }

          .home-track-routes > a {
            min-height: 180px;
            border-right: 0;
            border-bottom: 1px solid var(--border-color);
          }

          .home-track-routes > a:last-child {
            border-bottom: 0;
          }

          .home-project-list p {
            grid-column: 2 / -1;
          }

          .home-article-list > a:not(.home-all-articles) {
            grid-template-columns: 32px minmax(0, 1fr) auto;
            gap: 0.75rem;
          }

          .home-article-list em {
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

export async function getStaticProps() {
  const latestArticles = getAllArticles()
    .slice(0, 3)
    .map(({ slug, title, summary, date, topics, readingTime }) => ({
      slug,
      title,
      summary,
      date,
      topics,
      readingTime
    }))

  return {
    props: {
      latestArticles
    }
  }
}
