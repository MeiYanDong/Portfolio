import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, BriefcaseBusiness, Download } from 'lucide-react'
import casesData from '../../data/cases.json'
import projectsData from '../../data/projects.json'

export default function CaseDetail({ caseItem, relatedProjects }) {
  return (
    <>
      <Head>
        <title>{`${caseItem.title} - 梅炎栋`}</title>
        <meta name="description" content={caseItem.headline} />
      </Head>

      <main className="case-shell">
        <Link href="/cases" className="back-link">
          <ArrowLeft size={17} />
          返回案例
        </Link>

        <section
          className="case-hero"
          style={{ '--case-cover': `url("${caseItem.cover}")` }}
        >
          <div className="case-hero-content">
            <div className="case-detail-meta">
              <span>{caseItem.category}</span>
              <span>{caseItem.period}</span>
              <span>{caseItem.status}</span>
            </div>
            <h1>{caseItem.title}</h1>
            <p>{caseItem.headline}</p>
            <div className="case-role">
              <strong>{caseItem.role}</strong>
              <span>{caseItem.channels.join(' / ')}</span>
            </div>
          </div>
        </section>

        <section className="metrics-band" aria-label="案例结果">
          {caseItem.metrics.map((metric) => (
            <div key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
              <small>{metric.note}</small>
            </div>
          ))}
        </section>

        <div className="case-content-layout">
          <div className="case-main">
            <section className="case-section case-intro">
              <div className="section-heading">
                <span>任务</span>
                <h2>让工具信息真正帮助用户做选择</h2>
              </div>
              <div className="intro-grid">
                <div>
                  <h3>目标</h3>
                  <p>{caseItem.goal}</p>
                </div>
                <div>
                  <h3>目标用户</h3>
                  <p>{caseItem.audience}</p>
                </div>
              </div>
            </section>

            <section className="case-section">
              <div className="section-heading">
                <span>职责</span>
                <h2>独立负责，并与 AI 协作完成</h2>
              </div>
              <div className="responsibility-list">
                {caseItem.responsibilities.map((item, index) => (
                  <div key={item}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="case-section">
              <div className="section-heading">
                <span>策略</span>
                <h2>从用户问题出发组织内容矩阵</h2>
              </div>
              <div className="strategy-list">
                {caseItem.strategy.map((item) => (
                  <div key={item.index}>
                    <span>{item.index}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="case-section">
              <div className="section-heading">
                <span>内容样本</span>
                <h2>从价格比较到工具教育</h2>
              </div>
              <div className="sample-list">
                {caseItem.samples.map((sample, index) => {
                  const content = (
                    <>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <strong>{sample.title}</strong>
                      <p>{sample.result}</p>
                      <em>{sample.platform} / {sample.status}</em>
                      {sample.url && <ArrowUpRight size={17} />}
                    </>
                  )

                  return sample.url ? (
                    <a
                      key={`${sample.platform}-${sample.title}`}
                      href={sample.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={`${sample.platform}-${sample.title}`}>{content}</div>
                  )
                })}
              </div>
            </section>

            <section className="case-section evidence-section">
              <div className="section-heading">
                <span>结果证据</span>
                <h2>传播与转化使用原始截图说明</h2>
              </div>
              <div className="evidence-list">
                {caseItem.evidence.map((evidence) => (
                  <figure key={evidence.title}>
                    <div>
                      <span>{evidence.title}</span>
                      <a href={evidence.image} target="_blank" rel="noopener noreferrer">
                        查看原图
                        <ArrowUpRight size={15} />
                      </a>
                    </div>
                    <img src={evidence.image} alt={evidence.alt} />
                    <figcaption>{evidence.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </section>

            <section className="case-section result-section">
              <div className="section-heading">
                <span>结论</span>
                <h2>结果与数据口径</h2>
              </div>
              <p className="result-lead">{caseItem.resultSummary}</p>
              <p className="metric-note">{caseItem.metricNote}</p>
            </section>

            {relatedProjects.length > 0 && (
              <section className="case-section">
                <div className="section-heading">
                  <span>关联项目</span>
                  <h2>把内容经验沉淀成可复用系统</h2>
                </div>
                <div className="related-list">
                  {relatedProjects.map((project, index) => (
                    <Link href={`/projects/${project.id}`} key={project.id}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <strong>{project.title}</strong>
                      <p>{project.resumeLine || project.description}</p>
                      <ArrowUpRight size={17} />
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="case-aside">
            <div>
              <span>工作流程</span>
              <ol>
                {caseItem.workflow.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
            <div>
              <span>能力标签</span>
              <div className="skill-list">
                {caseItem.skills.map((skill) => (
                  <em key={skill}>{skill}</em>
                ))}
              </div>
            </div>
            <Link href="/profiles/ai-content-operations" className="aside-link">
              <BriefcaseBusiness size={17} />
              AI 内容运营岗位档案
              <ArrowUpRight size={16} />
            </Link>
            <a
              href="/resume/mei-yandong-ai-content-operations-intern.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="aside-link"
            >
              <Download size={17} />
              查看完整简历
              <ArrowUpRight size={16} />
            </a>
          </aside>
        </div>
      </main>

      <style jsx global>{`
        .case-shell {
          width: 100%;
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 1.5rem 5rem;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          margin: 0.5rem 0 1.25rem;
          color: var(--text-secondary);
          font-size: 0.84rem;
        }

        .case-hero {
          position: relative;
          min-height: 500px;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
          padding: 4rem 3rem 3rem;
          isolation: isolate;
        }

        .case-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: -2;
          background-image: var(--case-cover);
          background-position: center 28%;
          background-size: cover;
          filter: grayscale(0.2) saturate(0.7);
          transform: scale(1.02);
        }

        .case-hero::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: -1;
          background:
            linear-gradient(90deg, rgba(8, 8, 8, 0.98) 0%, rgba(8, 8, 8, 0.88) 48%, rgba(8, 8, 8, 0.44) 100%),
            linear-gradient(0deg, rgba(8, 8, 8, 0.96), transparent 70%);
        }

        .case-hero-content {
          max-width: 850px;
        }

        .case-detail-meta,
        .case-role {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }

        .case-detail-meta {
          margin-bottom: 1rem;
          color: var(--accent-purple);
          font-size: 0.76rem;
          font-weight: 700;
        }

        .case-detail-meta span:not(:last-child)::after {
          content: '/';
          margin-left: 0.6rem;
          color: var(--text-secondary);
        }

        .case-hero h1 {
          max-width: 820px;
          margin-bottom: 1.1rem;
          font-size: 4.35rem;
          line-height: 0.98;
        }

        .case-hero-content > p {
          max-width: 760px;
          color: #c7c7c7;
          font-size: 1.08rem;
          line-height: 1.8;
        }

        .case-role {
          align-items: center;
          margin-top: 1.5rem;
        }

        .case-role strong {
          font-size: 0.9rem;
        }

        .case-role span {
          color: var(--text-secondary);
          font-size: 0.84rem;
        }

        .metrics-band {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          border-bottom: 1px solid var(--border-color);
        }

        .metrics-band > div {
          display: grid;
          min-width: 0;
          padding: 1.35rem 1.25rem;
          border-right: 1px solid var(--border-color);
        }

        .metrics-band > div:last-child {
          border-right: 0;
        }

        .metrics-band strong {
          font-size: 1.85rem;
          line-height: 1.15;
        }

        .metrics-band span {
          margin-top: 0.35rem;
          color: var(--text-primary);
          font-size: 0.82rem;
          font-weight: 700;
        }

        .metrics-band small {
          margin-top: 0.1rem;
          color: var(--text-secondary);
          font-size: 0.72rem;
        }

        .case-content-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 280px;
          gap: 4rem;
          align-items: start;
          padding-top: 3rem;
        }

        .case-main,
        .case-content-layout > * {
          min-width: 0;
        }

        .case-section {
          padding: 1rem 0 3.5rem;
          border-bottom: 1px solid var(--border-color);
        }

        .case-section + .case-section {
          padding-top: 3.5rem;
        }

        .section-heading span,
        .case-aside > div > span {
          color: var(--accent-purple);
          font-size: 0.72rem;
          font-weight: 800;
        }

        .section-heading h2 {
          max-width: 720px;
          margin-top: 0.45rem;
          font-size: 2.25rem;
        }

        .intro-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .intro-grid > div {
          padding-top: 1rem;
          border-top: 1px solid var(--border-color);
        }

        .intro-grid h3 {
          font-size: 0.9rem;
        }

        .intro-grid p,
        .responsibility-list p,
        .strategy-list p,
        .result-lead,
        .metric-note {
          color: var(--text-secondary);
          line-height: 1.85;
        }

        .responsibility-list {
          margin-top: 1.5rem;
        }

        .responsibility-list > div {
          display: grid;
          grid-template-columns: 50px minmax(0, 1fr);
          gap: 1rem;
          padding: 1rem 0;
          border-top: 1px solid var(--border-color);
        }

        .responsibility-list span,
        .strategy-list > div > span,
        .sample-list > * > span,
        .related-list a > span {
          color: var(--accent-purple);
          font-weight: 800;
        }

        .responsibility-list p {
          max-width: 760px;
          margin: 0;
        }

        .strategy-list {
          margin-top: 1.5rem;
        }

        .strategy-list > div {
          display: grid;
          grid-template-columns: 50px 170px minmax(0, 1fr);
          gap: 1rem;
          align-items: baseline;
          padding: 1.15rem 0;
          border-top: 1px solid var(--border-color);
          transition: padding-left 0.25s ease;
        }

        .strategy-list > div:hover {
          padding-left: 0.5rem;
        }

        .strategy-list h3,
        .strategy-list p {
          margin: 0;
        }

        .strategy-list h3 {
          font-size: 1rem;
        }

        .sample-list,
        .related-list {
          margin-top: 1.5rem;
          border-bottom: 1px solid var(--border-color);
        }

        .sample-list > *,
        .related-list a {
          display: grid;
          grid-template-columns: 50px minmax(220px, 1.05fr) minmax(150px, 0.75fr) 160px auto;
          gap: 1rem;
          align-items: center;
          min-width: 0;
          padding: 1rem 0;
          border-top: 1px solid var(--border-color);
          color: inherit;
        }

        .sample-list strong,
        .related-list strong {
          min-width: 0;
        }

        .sample-list p,
        .related-list p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 0.84rem;
        }

        .sample-list em {
          color: var(--text-secondary);
          font-size: 0.76rem;
          font-style: normal;
          text-align: right;
        }

        .sample-list a:hover strong,
        .related-list a:hover strong {
          color: var(--accent-purple);
        }

        .evidence-list {
          display: grid;
          gap: 2.5rem;
          margin-top: 2rem;
        }

        .evidence-list figure {
          overflow: hidden;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          background: var(--bg-card);
        }

        .evidence-list figure > div {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          padding: 0.85rem 1rem;
          border-bottom: 1px solid var(--border-color);
          font-size: 0.8rem;
          font-weight: 700;
        }

        .evidence-list figure a {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.76rem;
        }

        .evidence-list img {
          display: block;
          width: 100%;
          height: auto;
          background: #fff;
        }

        .evidence-list figcaption {
          padding: 0.9rem 1rem 1rem;
          border-top: 1px solid var(--border-color);
          color: var(--text-secondary);
          font-size: 0.8rem;
          line-height: 1.65;
        }

        .result-lead {
          max-width: 780px;
          margin-top: 1.5rem;
          font-size: 1.08rem;
        }

        .metric-note {
          max-width: 780px;
          border-left: 2px solid var(--accent-purple);
          padding: 0.8rem 1rem;
          background: rgba(179, 157, 219, 0.06);
          font-size: 0.86rem;
        }

        .related-list a {
          grid-template-columns: 50px 190px minmax(0, 1fr) auto;
        }

        .case-aside {
          position: sticky;
          top: 96px;
          display: grid;
          gap: 1.75rem;
          border-left: 1px solid var(--border-color);
          padding-left: 1.25rem;
        }

        .case-aside ol {
          display: grid;
          gap: 0.7rem;
          margin: 0.85rem 0 0 1.1rem;
          color: var(--text-secondary);
          font-size: 0.8rem;
          line-height: 1.6;
        }

        .skill-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
          margin-top: 0.85rem;
        }

        .skill-list em {
          border: 1px solid var(--border-color);
          border-radius: 999px;
          padding: 0.2rem 0.55rem;
          color: var(--text-secondary);
          font-size: 0.72rem;
          font-style: normal;
        }

        .aside-link {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 0.55rem;
          align-items: center;
          border-top: 1px solid var(--border-color);
          padding-top: 1rem;
          color: var(--text-primary);
          font-size: 0.8rem;
          font-weight: 700;
        }

        @media (max-width: 980px) {
          .case-content-layout {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }

          .case-aside {
            position: static;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            border-top: 1px solid var(--border-color);
            border-left: 0;
            padding: 2rem 0 0;
          }
        }

        @media (max-width: 720px) {
          .case-shell {
            padding: 0 1rem 4rem;
          }

          .case-hero {
            min-height: 500px;
            padding: 2.5rem 1.25rem 2rem;
          }

          .case-hero::after {
            background:
              linear-gradient(0deg, rgba(8, 8, 8, 0.98) 0%, rgba(8, 8, 8, 0.82) 70%, rgba(8, 8, 8, 0.48) 100%);
          }

          .case-hero h1 {
            font-size: 2.75rem;
          }

          .metrics-band {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .metrics-band > div:nth-child(2) {
            border-right: 0;
          }

          .metrics-band > div:nth-child(-n + 2) {
            border-bottom: 1px solid var(--border-color);
          }

          .metrics-band strong {
            font-size: 1.45rem;
          }

          .case-content-layout {
            padding-top: 2rem;
          }

          .section-heading h2 {
            font-size: 1.75rem;
          }

          .intro-grid,
          .case-aside {
            grid-template-columns: 1fr;
          }

          .strategy-list > div {
            grid-template-columns: 38px minmax(0, 1fr);
          }

          .strategy-list p {
            grid-column: 2;
          }

          .sample-list > *,
          .related-list a {
            grid-template-columns: 34px minmax(0, 1fr) auto;
            gap: 0.75rem;
          }

          .sample-list p,
          .related-list p {
            grid-column: 2 / -1;
          }

          .sample-list em {
            grid-column: 2;
            text-align: left;
          }

          .sample-list svg {
            grid-column: 3;
            grid-row: 1;
          }
        }
      `}</style>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: casesData.map((caseItem) => ({ params: { id: caseItem.id } })),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const caseItem = casesData.find((item) => item.id === params.id)

  if (!caseItem) return { notFound: true }

  const relatedProjects = caseItem.relatedProjects
    .map((projectId) => projectsData.find((project) => project.id === projectId))
    .filter(Boolean)

  return {
    props: {
      caseItem,
      relatedProjects
    }
  }
}
