import Head from 'next/head'
import Link from 'next/link'
import { ArrowUpRight, BriefcaseBusiness } from 'lucide-react'
import casesData from '../../data/cases.json'

export default function Cases() {
  return (
    <>
      <Head>
        <title>案例 - 梅炎栋</title>
        <meta
          name="description"
          content="梅炎栋的内容运营、增长转化与 AI 协作案例，呈现目标、过程、职责、结果和原始证据。"
        />
      </Head>

      <main className="cases-shell">
        <section className="cases-hero">
          <div>
            <p className="cases-kicker">案例</p>
            <h1>把工作过程，变成结果证据。</h1>
            <p>
              项目回答“做出了什么”，案例回答“为什么做、如何推进、产生了什么结果”。这里记录内容运营、增长转化和 AI 协作的完整闭环。
            </p>
          </div>
          <Link href="/profiles/ai-content-operations" className="profile-entry">
            <BriefcaseBusiness size={18} />
            <span>
              查看岗位档案
              <small>AI 内容运营实习生</small>
            </span>
            <ArrowUpRight size={17} />
          </Link>
        </section>

        <section className="case-principles" aria-label="案例结构">
          <div>
            <span>01</span>
            <strong>目标与问题</strong>
            <p>说明要解决的用户问题与业务目标。</p>
          </div>
          <div>
            <span>02</span>
            <strong>职责与过程</strong>
            <p>明确个人贡献、AI 协作方式和关键判断。</p>
          </div>
          <div>
            <span>03</span>
            <strong>结果与证据</strong>
            <p>用内容链接、后台截图和数据口径支撑结论。</p>
          </div>
        </section>

        <section className="cases-list" aria-label="案例列表">
          <div className="section-heading">
            <span>精选案例</span>
            <strong>{casesData.length} 个完整案例</strong>
          </div>

          {casesData.map((caseItem, index) => (
            <Link href={`/cases/${caseItem.id}`} className="case-row" key={caseItem.id}>
              <div className="case-index">{String(index + 1).padStart(2, '0')}</div>
              <div className="case-image">
                <img src={caseItem.cover} alt={caseItem.coverAlt} />
              </div>
              <div className="case-copy">
                <div className="case-row-meta">
                  <span>{caseItem.category}</span>
                  <span>{caseItem.period}</span>
                  <span>{caseItem.role}</span>
                </div>
                <h2>{caseItem.title}</h2>
                <p>{caseItem.headline}</p>
                <div className="case-tags">
                  {caseItem.skills.slice(0, 5).map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </div>
              <div className="case-results">
                {caseItem.metrics.slice(0, 3).map((metric) => (
                  <span key={metric.label}>
                    <strong>{metric.value}</strong>
                    <small>{metric.label}</small>
                  </span>
                ))}
                <ArrowUpRight size={18} />
              </div>
            </Link>
          ))}
        </section>
      </main>

      <style jsx global>{`
        .cases-shell {
          width: 100%;
          max-width: 1480px;
          margin: 0 auto;
          padding: 0 1.5rem 5rem;
        }

        .cases-hero {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 310px;
          gap: 3rem;
          align-items: end;
          padding: 4rem 0 3rem;
          border-bottom: 1px solid var(--border-color);
        }

        .cases-kicker,
        .section-heading span {
          color: var(--accent-purple);
          font-size: 0.74rem;
          font-weight: 800;
        }

        .cases-kicker {
          margin-bottom: 0.8rem;
        }

        .cases-hero h1 {
          max-width: 900px;
          margin-bottom: 1.25rem;
          font-size: 4rem;
          line-height: 1;
        }

        .cases-hero > div > p:last-child {
          max-width: 780px;
          color: var(--text-secondary);
          font-size: 1.04rem;
          line-height: 1.85;
        }

        .profile-entry {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 0.75rem;
          align-items: center;
          min-width: 0;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 1rem;
          color: var(--text-primary);
          background: rgba(26, 26, 26, 0.78);
        }

        .profile-entry:hover {
          border-color: var(--accent-purple);
        }

        .profile-entry span {
          display: grid;
          min-width: 0;
          font-weight: 700;
        }

        .profile-entry small {
          margin-top: 0.15rem;
          color: var(--text-secondary);
          font-size: 0.76rem;
          font-weight: 500;
        }

        .case-principles {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          border-bottom: 1px solid var(--border-color);
        }

        .case-principles > div {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 0.35rem 0.85rem;
          padding: 1.35rem 1.25rem;
          border-right: 1px solid var(--border-color);
        }

        .case-principles > div:last-child {
          border-right: 0;
        }

        .case-principles span {
          grid-row: 1 / span 2;
          color: var(--accent-purple);
          font-weight: 800;
        }

        .case-principles strong {
          font-size: 0.95rem;
        }

        .case-principles p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 0.8rem;
        }

        .cases-list {
          padding-top: 3rem;
        }

        .section-heading {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 1.2rem;
        }

        .section-heading strong {
          font-size: 0.85rem;
        }

        .case-row {
          display: grid;
          grid-template-columns: 52px minmax(240px, 0.72fr) minmax(0, 1.28fr) 190px;
          gap: 1.5rem;
          align-items: stretch;
          min-width: 0;
          padding: 1.25rem 0;
          border-top: 1px solid var(--border-color);
          color: inherit;
        }

        .case-row:last-child {
          border-bottom: 1px solid var(--border-color);
        }

        .case-row:hover h2,
        .case-row:hover .case-index {
          color: var(--accent-purple);
        }

        .case-index {
          padding-top: 0.25rem;
          color: var(--text-secondary);
          font-weight: 800;
          transition: color 0.2s ease;
        }

        .case-image {
          min-height: 240px;
          overflow: hidden;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          background: var(--bg-card);
        }

        .case-image img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 32%;
          filter: saturate(0.76) contrast(1.04);
          transition: transform 0.45s ease, filter 0.3s ease;
        }

        .case-row:hover .case-image img {
          transform: scale(1.025);
          filter: saturate(0.94) contrast(1.04);
        }

        .case-copy {
          min-width: 0;
          padding: 0.1rem 0;
        }

        .case-row-meta,
        .case-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
        }

        .case-row-meta {
          margin-bottom: 1rem;
          color: var(--text-secondary);
          font-size: 0.76rem;
        }

        .case-row-meta span:not(:last-child)::after {
          content: '/';
          margin-left: 0.45rem;
          color: var(--border-color);
        }

        .case-copy h2 {
          margin-bottom: 0.8rem;
          font-size: 1.8rem;
          transition: color 0.2s ease;
        }

        .case-copy > p {
          color: var(--text-secondary);
          line-height: 1.75;
        }

        .case-tags span {
          border: 1px solid var(--border-color);
          border-radius: 999px;
          padding: 0.18rem 0.58rem;
          color: var(--text-secondary);
          font-size: 0.72rem;
        }

        .case-results {
          display: grid;
          align-content: start;
          gap: 0.9rem;
          min-width: 0;
          padding-left: 1rem;
          border-left: 1px solid var(--border-color);
        }

        .case-results > span {
          display: grid;
        }

        .case-results strong {
          color: var(--text-primary);
          font-size: 1.25rem;
        }

        .case-results small {
          color: var(--text-secondary);
          font-size: 0.72rem;
        }

        .case-results > svg {
          margin-top: auto;
          color: var(--accent-purple);
        }

        @media (max-width: 1000px) {
          .case-row {
            grid-template-columns: 42px minmax(210px, 0.8fr) minmax(0, 1.2fr);
          }

          .case-results {
            grid-column: 2 / -1;
            grid-template-columns: repeat(3, 1fr) auto;
            align-items: center;
            padding: 1rem 0 0;
            border-top: 1px solid var(--border-color);
            border-left: 0;
          }
        }

        @media (max-width: 760px) {
          .cases-shell {
            padding: 0 1rem 4rem;
          }

          .cases-hero {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            padding: 2.5rem 0 2rem;
          }

          .cases-hero h1 {
            font-size: 2.65rem;
          }

          .case-principles {
            grid-template-columns: 1fr;
          }

          .case-principles > div {
            border-right: 0;
            border-bottom: 1px solid var(--border-color);
          }

          .case-principles > div:last-child {
            border-bottom: 0;
          }

          .case-row {
            grid-template-columns: 34px minmax(0, 1fr);
            gap: 1rem;
          }

          .case-image,
          .case-copy,
          .case-results {
            grid-column: 2;
          }

          .case-image {
            min-height: 220px;
          }

          .case-copy h2 {
            font-size: 1.45rem;
          }

          .case-results {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .case-results > svg {
            display: none;
          }
        }
      `}</style>
    </>
  )
}
