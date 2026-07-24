import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Github,
  RadioTower
} from 'lucide-react'

const sectionLinks = [
  { id: 'opportunity', label: '机会发现' },
  { id: 'timing', label: '19 / 20 秒' },
  { id: 'evolution', label: '程序迭代' },
  { id: 'system', label: '系统机制' },
  { id: 'playbook', label: '市场策略' },
  { id: 'evidence', label: '真实证据' },
  { id: 'lessons', label: '复盘' }
]

function SectionHeading({ index, label, title, lead }) {
  return (
    <div className="deep-section-heading">
      <div className="deep-section-index">{index}</div>
      <div>
        <span>{label}</span>
        <h2>{title}</h2>
        {lead && <p>{lead}</p>}
      </div>
    </div>
  )
}

export default function ProjectCaseStudy({ project, caseStudy, nextProject }) {
  return (
    <main className="deep-project-case">
      <div className="deep-case-shell">
        <Link href="/projects" className="deep-back-link">
          <ArrowLeft size={17} />
          返回项目
        </Link>

        <section className="deep-hero">
          <img src={project.cover} alt="" aria-hidden="true" />
          <div className="deep-hero-content">
            <div className="deep-hero-meta">
              <span>{caseStudy.label}</span>
              <span>{caseStudy.period}</span>
              <span>{caseStudy.status}</span>
            </div>
            <h1>{project.title}</h1>
            <p>{caseStudy.headline}</p>
            <div className="deep-hero-actions">
              <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                <Github size={17} />
                GitHub 源码
                <ArrowUpRight size={15} />
              </a>
              <a
                href="https://docs.42.space/getting-started/protocol-mechanics-101/42-markets"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BookOpen size={17} />
                42 官方机制
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
          <div className="deep-hero-window" aria-label="核心策略窗口">
            <span>核心窗口</span>
            <strong>T+19 / T+20</strong>
            <small>排名优先 / 成本优先</small>
          </div>
        </section>

        <section className="deep-metrics" aria-label="项目结果">
          {caseStudy.metrics.map((metric) => (
            <div key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
              <small>{metric.note}</small>
            </div>
          ))}
        </section>

        <div className="deep-case-layout">
          <aside className="deep-case-nav" aria-label="页面目录">
            <span>案例目录</span>
            <nav>
              {sectionLinks.map((item, index) => (
                <a href={`#${item.id}`} key={item.id}>
                  <em>{String(index + 1).padStart(2, '0')}</em>
                  {item.label}
                </a>
              ))}
            </nav>
          </aside>

          <div className="deep-case-main">
            <section className="deep-opening">
              <p>{caseStudy.summary}</p>
              <div>
                <span>我的角色</span>
                <strong>{project.role}</strong>
              </div>
            </section>

            <section className="deep-section" id="opportunity">
              <SectionHeading
                index="01"
                label="项目背景与机会发现"
                title={caseStudy.platform.title}
                lead={caseStudy.platform.lead}
              />
              <div className="deep-opportunity-grid">
                {caseStudy.platform.items.map((item) => (
                  <article key={item.label}>
                    <span>{item.label}</span>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                    <a href={item.link.url} target="_blank" rel="noopener noreferrer">
                      {item.link.label}
                      <ArrowUpRight size={15} />
                    </a>
                  </article>
                ))}
              </div>
              <p className="deep-note">{caseStudy.platform.note}</p>
            </section>

            <section className="deep-section" id="timing">
              <SectionHeading
                index="02"
                label="策略故事"
                title={caseStudy.timing.title}
                lead={caseStudy.timing.lead}
              />
              <div className="deep-timing-track" aria-label="开盘后 19 秒与 20 秒策略窗口">
                <div>
                  <strong>T+0</strong>
                  <span>市场开盘</span>
                </div>
                <div>
                  <strong>T+19</strong>
                  <span>承担部分溢价</span>
                </div>
                <div>
                  <strong>T+20</strong>
                  <span>避开反狙击溢价</span>
                </div>
              </div>
              <div className="deep-route-list">
                {caseStudy.timing.routes.map((route) => (
                  <article key={route.time}>
                    <div className="deep-route-time">{route.time}</div>
                    <div>
                      <span>{route.label}</span>
                      <h3>{route.title}</h3>
                      <p>{route.body}</p>
                      <small>{route.tradeoff}</small>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="deep-section" id="evolution">
              <SectionHeading
                index="03"
                label="程序迭代"
                title="每一次失败，都改变下一版执行路径"
                lead="项目没有从一开始就拥有完整架构。时间、传播、Builder 和多钱包隔离，都是在真实交易中逐步补上的。"
              />
              <div className="deep-evolution-list">
                {caseStudy.evolution.map((item) => (
                  <article key={item.index}>
                    <div className="deep-evolution-index">{item.index}</div>
                    <div className="deep-evolution-title">
                      <span>{item.stage}</span>
                      <h3>{item.title}</h3>
                    </div>
                    <div className="deep-evolution-detail">
                      <p><strong>问题</strong>{item.problem}</p>
                      <p><strong>改进</strong>{item.decision}</p>
                      <p><strong>结果</strong>{item.result}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="deep-section" id="system">
              <SectionHeading
                index="04"
                label="通用技术与策略"
                title={caseStudy.system.title}
                lead={caseStudy.system.lead}
              />
              <div className="deep-system-flow" aria-label="系统执行流程">
                {caseStudy.system.flow.map((item, index) => (
                  <div key={item.title}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <strong>{item.title}</strong>
                    <small>{item.detail}</small>
                    {index < caseStudy.system.flow.length - 1 && <ArrowRight size={16} />}
                  </div>
                ))}
              </div>
              <div className="deep-mechanism-list">
                {caseStudy.system.mechanisms.map((item, index) => (
                  <article key={item.title}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="deep-section" id="playbook">
              <SectionHeading
                index="05"
                label="交易原则与市场适应"
                title="不同市场，不套用同一套买卖规则"
                lead="执行速度只是能力之一。真正的策略来自市场结构、持有周期和退出条件之间的匹配。"
              />
              <div className="deep-playbook">
                <div className="deep-playbook-head" aria-hidden="true">
                  <span>市场</span>
                  <span>信号</span>
                  <span>买入原则</span>
                  <span>退出原则</span>
                  <span>核心思想</span>
                </div>
                {caseStudy.playbook.map((item) => (
                  <article key={item.market}>
                    <h3>{item.market}</h3>
                    <p data-label="信号">{item.signal}</p>
                    <p data-label="买入原则">{item.buy}</p>
                    <p data-label="退出原则">{item.sell}</p>
                    <strong data-label="核心思想">{item.principle}</strong>
                  </article>
                ))}
              </div>
              <div className="deep-principles">
                <div>
                  <span>自动买入原则</span>
                  <ol>
                    {caseStudy.principles.buy.map((item) => <li key={item}>{item}</li>)}
                  </ol>
                </div>
                <div>
                  <span>自动卖出原则</span>
                  <ol>
                    {caseStudy.principles.sell.map((item) => <li key={item}>{item}</li>)}
                  </ol>
                </div>
              </div>
            </section>

            <section className="deep-section" id="evidence">
              <SectionHeading
                index="06"
                label="真实数据与链上证据"
                title="不以“已发送”代替“已成交”"
                lead="项目结果同时使用看板快照和链上交易回执。单次案例说明执行能力，累计数据说明历史结果，两种口径分开呈现。"
              />
              <div className="deep-evidence-list">
                {caseStudy.evidence.map((item) => (
                  <article
                    className={item.featured ? 'deep-evidence-featured' : ''}
                    key={`${item.date}-${item.title}`}
                  >
                    <div className="deep-evidence-date">{item.date}</div>
                    <div className="deep-evidence-copy">
                      <span>{item.metric}</span>
                      <h3>{item.title}</h3>
                      <p>{item.summary}</p>
                      <div className="deep-evidence-facts">
                        {item.facts.map((fact) => <em key={fact}>{fact}</em>)}
                      </div>
                      {item.botResults && (
                        <div className="deep-bot-results" aria-label={`${item.title}收益对比`}>
                          {item.botResults.map((result) => (
                            <div className="deep-bot-result" key={result.bot}>
                              <div className="deep-bot-result-head">
                                <strong>{result.bot}</strong>
                                <span>{result.route}</span>
                              </div>
                              <div className="deep-bot-result-net">
                                <strong>{result.net}</strong>
                                <span>净收益 / {result.roi}</span>
                              </div>
                              <dl>
                                <div>
                                  <dt>投入</dt>
                                  <dd>{result.invested}</dd>
                                </div>
                                <div>
                                  <dt>卖出</dt>
                                  <dd>{result.returned}</dd>
                                </div>
                                <div>
                                  <dt>Gas</dt>
                                  <dd>{result.gas}</dd>
                                </div>
                              </dl>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="deep-evidence-links">
                      {item.links.map((link) => (
                        <a href={link.url} target="_blank" rel="noopener noreferrer" key={link.url}>
                          {link.label}
                          <ArrowUpRight size={14} />
                        </a>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
              <figure className="deep-dashboard-proof">
                <div>
                  <span>项目看板</span>
                  <a href={caseStudy.dashboard.image} target="_blank" rel="noopener noreferrer">
                    查看原图
                    <ArrowUpRight size={15} />
                  </a>
                </div>
                <img src={caseStudy.dashboard.image} alt={caseStudy.dashboard.alt} />
                <figcaption>{caseStudy.dashboard.caption}</figcaption>
              </figure>
            </section>

            <section className="deep-section" id="lessons">
              <SectionHeading
                index="07"
                label="复盘"
                title="真正沉淀下来的不是某个参数，而是边界"
                lead="系统后来变复杂，不是为了堆技术，而是为了把已经发生过的失败变成不能再次跨越的执行边界。"
              />
              <div className="deep-lessons">
                {caseStudy.lessons.map((item) => (
                  <article key={item.index}>
                    <span>{item.index}</span>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </article>
                ))}
              </div>
              <p className="deep-disclosure">{caseStudy.disclosure}</p>
            </section>

            <section className="deep-sources">
              <div>
                <RadioTower size={18} />
                <span>资料与源码</span>
              </div>
              <nav>
                {caseStudy.sources.map((source) => (
                  <a href={source.url} target="_blank" rel="noopener noreferrer" key={source.url}>
                    {source.label}
                    <ArrowUpRight size={14} />
                  </a>
                ))}
              </nav>
            </section>

            <section className="deep-next-project">
              <span>下一个项目</span>
              <Link href={`/projects/${nextProject.id}`}>
                <strong>{nextProject.title}</strong>
                <p>{nextProject.resumeLine || nextProject.description}</p>
                <ArrowRight size={20} />
              </Link>
            </section>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .deep-project-case {
          width: 100%;
          color: var(--text-primary);
        }

        .deep-case-shell {
          width: 100%;
          max-width: 1460px;
          margin: 0 auto;
          padding: 0 1.5rem 5rem;
        }

        .deep-back-link {
          display: inline-flex;
          gap: 0.45rem;
          align-items: center;
          margin: 0.4rem 0 1.25rem;
          color: var(--text-secondary);
          font-size: 0.82rem;
        }

        .deep-hero {
          position: relative;
          display: flex;
          min-height: 560px;
          align-items: flex-end;
          overflow: hidden;
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
          padding: 4rem 3.5rem 3.5rem;
          isolation: isolate;
        }

        .deep-hero > img {
          position: absolute;
          inset: 0;
          z-index: -2;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 28%;
          filter: brightness(0.27) saturate(0.75);
          transform: scale(1.015);
        }

        .deep-hero::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: -1;
          background: rgba(8, 8, 8, 0.22);
        }

        .deep-hero-content {
          max-width: 930px;
          animation: deep-case-enter 0.7s ease both;
        }

        .deep-hero-meta,
        .deep-hero-actions,
        .deep-evidence-facts,
        .deep-sources nav {
          display: flex;
          flex-wrap: wrap;
          gap: 0.65rem;
          align-items: center;
        }

        .deep-hero-meta {
          margin-bottom: 1rem;
          color: var(--accent-purple);
          font-size: 0.76rem;
          font-weight: 800;
        }

        .deep-hero-meta span:not(:last-child)::after {
          content: '/';
          margin-left: 0.65rem;
          color: var(--text-secondary);
        }

        .deep-hero h1 {
          max-width: 900px;
          margin-bottom: 1rem;
          font-size: 4.2rem;
          line-height: 1;
          letter-spacing: 0;
        }

        .deep-hero-content > p {
          max-width: 790px;
          margin-bottom: 1.5rem;
          color: #d0d0d0;
          font-size: 1.08rem;
          line-height: 1.8;
        }

        .deep-hero-actions a {
          display: inline-flex;
          gap: 0.45rem;
          align-items: center;
          min-height: 42px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 6px;
          padding: 0.65rem 0.85rem;
          color: #eeeeee;
          background: rgba(8, 8, 8, 0.64);
          font-size: 0.8rem;
          font-weight: 700;
        }

        .deep-hero-actions a:hover {
          border-color: var(--accent-purple);
          color: var(--accent-purple);
        }

        .deep-hero-window {
          position: absolute;
          right: 3rem;
          top: 3rem;
          display: grid;
          min-width: 220px;
          border-top: 1px solid rgba(255, 255, 255, 0.45);
          padding-top: 0.7rem;
          text-align: right;
          animation: deep-case-enter 0.7s 0.12s ease both;
        }

        .deep-hero-window span,
        .deep-hero-window small {
          color: #bbbbbb;
          font-size: 0.72rem;
        }

        .deep-hero-window strong {
          margin: 0.15rem 0;
          color: #ffffff;
          font-size: 1.65rem;
        }

        .deep-metrics {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          border-bottom: 1px solid var(--border-color);
        }

        .deep-metrics > div {
          display: grid;
          min-width: 0;
          border-right: 1px solid var(--border-color);
          padding: 1.4rem 1.25rem;
        }

        .deep-metrics > div:last-child {
          border-right: 0;
        }

        .deep-metrics strong {
          font-size: 1.85rem;
          line-height: 1.1;
        }

        .deep-metrics > div:nth-child(2) strong,
        .deep-metrics > div:nth-child(4) strong {
          color: #61c77a;
        }

        .deep-metrics > div:nth-child(3) strong {
          color: #f05a87;
        }

        .deep-metrics span {
          margin-top: 0.35rem;
          font-size: 0.82rem;
          font-weight: 700;
        }

        .deep-metrics small {
          color: var(--text-secondary);
          font-size: 0.72rem;
        }

        .deep-case-layout {
          display: grid;
          grid-template-columns: 180px minmax(0, 1fr);
          gap: 4.5rem;
          align-items: start;
          padding-top: 3.5rem;
        }

        .deep-case-nav {
          position: sticky;
          top: 96px;
          display: grid;
          gap: 1rem;
          border-left: 1px solid var(--border-color);
          padding-left: 1rem;
        }

        .deep-case-nav > span {
          color: var(--accent-purple);
          font-size: 0.72rem;
          font-weight: 800;
        }

        .deep-case-nav nav {
          display: grid;
        }

        .deep-case-nav a {
          display: grid;
          grid-template-columns: 28px minmax(0, 1fr);
          gap: 0.4rem;
          padding: 0.48rem 0;
          color: var(--text-secondary);
          font-size: 0.78rem;
        }

        .deep-case-nav a:hover {
          color: var(--text-primary);
        }

        .deep-case-nav em {
          color: #666666;
          font-size: 0.68rem;
          font-style: normal;
        }

        .deep-case-main {
          min-width: 0;
        }

        .deep-opening {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 280px;
          gap: 3rem;
          padding: 0 0 4rem;
          border-bottom: 1px solid var(--border-color);
        }

        .deep-opening > p {
          max-width: 850px;
          margin: 0;
          font-size: 1.35rem;
          line-height: 1.7;
        }

        .deep-opening > div {
          display: grid;
          align-content: start;
          gap: 0.45rem;
          border-top: 1px solid var(--border-color);
          padding-top: 0.8rem;
        }

        .deep-opening span,
        .deep-opportunity-grid article > span,
        .deep-route-list article span,
        .deep-principles > div > span,
        .deep-dashboard-proof > div > span,
        .deep-next-project > span {
          color: var(--accent-purple);
          font-size: 0.72rem;
          font-weight: 800;
        }

        .deep-opening strong {
          font-size: 0.86rem;
          line-height: 1.65;
        }

        .deep-section {
          scroll-margin-top: 90px;
          padding: 4.5rem 0;
          border-bottom: 1px solid var(--border-color);
        }

        .deep-section-heading {
          display: grid;
          grid-template-columns: 56px minmax(0, 1fr);
          gap: 1.25rem;
          margin-bottom: 2.5rem;
        }

        .deep-section-index {
          color: #666666;
          font-size: 0.76rem;
          font-weight: 800;
        }

        .deep-section-heading span {
          color: var(--accent-purple);
          font-size: 0.72rem;
          font-weight: 800;
        }

        .deep-section-heading h2 {
          max-width: 860px;
          margin: 0.45rem 0 0;
          font-size: 2.45rem;
          line-height: 1.15;
        }

        .deep-section-heading p {
          max-width: 830px;
          margin: 1rem 0 0;
          color: var(--text-secondary);
          line-height: 1.85;
        }

        .deep-opportunity-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 2.5rem;
          margin-left: 76px;
        }

        .deep-opportunity-grid article {
          border-top: 1px solid var(--border-color);
          padding-top: 1.15rem;
        }

        .deep-opportunity-grid h3 {
          max-width: 420px;
          margin: 0.8rem 0;
          font-size: 1.25rem;
        }

        .deep-opportunity-grid p {
          max-width: 560px;
          color: var(--text-secondary);
          line-height: 1.85;
        }

        .deep-opportunity-grid a,
        .deep-dashboard-proof a,
        .deep-evidence-links a,
        .deep-sources a {
          display: inline-flex;
          gap: 0.35rem;
          align-items: center;
          font-size: 0.78rem;
          font-weight: 700;
        }

        .deep-note,
        .deep-disclosure {
          max-width: none;
          margin: 2rem 0 0 76px;
          border-left: 2px solid var(--accent-purple);
          padding: 0.85rem 1rem;
          color: var(--text-secondary);
          background: rgba(179, 157, 219, 0.055);
          font-size: 0.84rem;
          line-height: 1.75;
        }

        .deep-timing-track {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 0.8fr 0.8fr;
          margin: 0 0 2.5rem 76px;
          border-top: 2px solid #5c516e;
        }

        .deep-timing-track::before {
          content: '';
          position: absolute;
          left: 0;
          top: -6px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--accent-purple);
          animation: deep-timing-pulse 2.2s ease-in-out infinite;
        }

        .deep-timing-track > div {
          display: grid;
          gap: 0.2rem;
          border-right: 1px solid var(--border-color);
          padding: 1rem 1rem 0 0;
        }

        .deep-timing-track > div:last-child {
          border-right: 0;
          padding-left: 1rem;
        }

        .deep-timing-track strong {
          font-size: 1.35rem;
        }

        .deep-timing-track span {
          color: var(--text-secondary);
          font-size: 0.76rem;
        }

        .deep-route-list {
          margin-left: 76px;
        }

        .deep-route-list article {
          display: grid;
          grid-template-columns: 150px minmax(0, 1fr);
          gap: 2rem;
          padding: 1.6rem 0;
          border-top: 1px solid var(--border-color);
        }

        .deep-route-time {
          color: var(--accent-purple);
          font-size: 2.8rem;
          font-weight: 800;
          line-height: 1;
        }

        .deep-route-list h3 {
          margin: 0.45rem 0 0.7rem;
          font-size: 1.3rem;
        }

        .deep-route-list p {
          max-width: 760px;
          color: var(--text-secondary);
          line-height: 1.8;
        }

        .deep-route-list small {
          display: block;
          color: #c8c8c8;
          font-size: 0.8rem;
        }

        .deep-evolution-list,
        .deep-mechanism-list,
        .deep-evidence-list,
        .deep-lessons {
          margin-left: 76px;
        }

        .deep-evolution-list article {
          display: grid;
          grid-template-columns: 58px 250px minmax(0, 1fr);
          gap: 1.5rem;
          padding: 1.5rem 0;
          border-top: 1px solid var(--border-color);
        }

        .deep-evolution-index {
          color: var(--accent-purple);
          font-weight: 800;
        }

        .deep-evolution-title span {
          color: var(--text-secondary);
          font-size: 0.72rem;
        }

        .deep-evolution-title h3 {
          margin: 0.4rem 0 0;
          font-size: 1rem;
        }

        .deep-evolution-detail {
          display: grid;
          gap: 0.55rem;
        }

        .deep-evolution-detail p {
          display: grid;
          grid-template-columns: 48px minmax(0, 1fr);
          gap: 0.75rem;
          max-width: none;
          margin: 0;
          color: var(--text-secondary);
          font-size: 0.82rem;
          line-height: 1.65;
        }

        .deep-evolution-detail p strong {
          color: var(--text-primary);
          font-size: 0.76rem;
        }

        .deep-system-flow {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          margin-left: 76px;
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
        }

        .deep-system-flow > div {
          position: relative;
          display: grid;
          min-width: 0;
          gap: 0.3rem;
          border-right: 1px solid var(--border-color);
          padding: 1.2rem 0.9rem;
        }

        .deep-system-flow > div:last-child {
          border-right: 0;
        }

        .deep-system-flow span {
          color: #666666;
          font-size: 0.66rem;
        }

        .deep-system-flow strong {
          font-size: 0.92rem;
        }

        .deep-system-flow small {
          color: var(--text-secondary);
          font-size: 0.68rem;
          line-height: 1.45;
        }

        .deep-system-flow svg {
          position: absolute;
          right: -8px;
          top: 50%;
          z-index: 2;
          color: var(--accent-purple);
          background: var(--bg-primary);
          transform: translateY(-50%);
        }

        .deep-mechanism-list {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          margin-top: 2rem;
        }

        .deep-mechanism-list article {
          display: grid;
          grid-template-columns: 42px minmax(0, 1fr);
          gap: 0.2rem 0.8rem;
          border-top: 1px solid var(--border-color);
          padding: 1.25rem 1.5rem 1.25rem 0;
        }

        .deep-mechanism-list article:nth-child(odd) {
          border-right: 1px solid var(--border-color);
        }

        .deep-mechanism-list article:nth-child(even) {
          padding-left: 1.5rem;
        }

        .deep-mechanism-list span {
          grid-row: 1 / 3;
          color: var(--accent-purple);
          font-size: 0.75rem;
          font-weight: 800;
        }

        .deep-mechanism-list h3,
        .deep-mechanism-list p {
          margin: 0;
        }

        .deep-mechanism-list h3 {
          font-size: 1rem;
        }

        .deep-mechanism-list p {
          max-width: none;
          margin-top: 0.45rem;
          color: var(--text-secondary);
          font-size: 0.82rem;
          line-height: 1.7;
        }

        .deep-playbook {
          margin-left: 76px;
          border-bottom: 1px solid var(--border-color);
        }

        .deep-playbook-head,
        .deep-playbook article {
          display: grid;
          grid-template-columns: 1.05fr 1.15fr 1.35fr 1.25fr 1fr;
          gap: 1rem;
          align-items: start;
        }

        .deep-playbook-head {
          padding: 0 0 0.75rem;
          color: var(--text-secondary);
          font-size: 0.7rem;
          font-weight: 800;
        }

        .deep-playbook article {
          padding: 1.15rem 0;
          border-top: 1px solid var(--border-color);
        }

        .deep-playbook h3,
        .deep-playbook p,
        .deep-playbook strong {
          min-width: 0;
          margin: 0;
          font-size: 0.78rem;
          line-height: 1.65;
        }

        .deep-playbook h3 {
          font-size: 0.9rem;
        }

        .deep-playbook p {
          color: var(--text-secondary);
        }

        .deep-playbook strong {
          color: var(--accent-purple);
        }

        .deep-principles {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 3rem;
          margin: 3rem 0 0 76px;
        }

        .deep-principles > div {
          border-top: 1px solid var(--border-color);
          padding-top: 1rem;
        }

        .deep-principles ol {
          display: grid;
          gap: 0.8rem;
          margin: 1rem 0 0 1.15rem;
          color: var(--text-secondary);
          font-size: 0.82rem;
          line-height: 1.7;
        }

        .deep-evidence-list article {
          display: grid;
          grid-template-columns: 110px minmax(0, 1fr) 140px;
          gap: 1.5rem;
          padding: 1.5rem 0;
          border-top: 1px solid var(--border-color);
        }

        .deep-evidence-date {
          color: var(--text-secondary);
          font-size: 0.75rem;
          font-weight: 700;
        }

        .deep-evidence-copy > span {
          color: #61c77a;
          font-size: 0.78rem;
          font-weight: 800;
        }

        .deep-evidence-copy h3 {
          margin: 0.35rem 0 0.65rem;
          font-size: 1.1rem;
        }

        .deep-evidence-copy p {
          max-width: 720px;
          color: var(--text-secondary);
          font-size: 0.84rem;
          line-height: 1.75;
        }

        .deep-evidence-featured {
          padding: 2rem 0 !important;
        }

        .deep-evidence-featured .deep-evidence-copy h3 {
          font-size: 1.35rem;
        }

        .deep-evidence-facts em {
          border: 1px solid var(--border-color);
          border-radius: 999px;
          padding: 0.22rem 0.5rem;
          color: var(--text-secondary);
          font-size: 0.68rem;
          font-style: normal;
        }

        .deep-bot-results {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          margin-top: 1.4rem;
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
        }

        .deep-bot-result {
          padding: 1rem 1.25rem 1.1rem 0;
        }

        .deep-bot-result + .deep-bot-result {
          border-left: 1px solid var(--border-color);
          padding-right: 0;
          padding-left: 1.25rem;
        }

        .deep-bot-result-head {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          align-items: baseline;
        }

        .deep-bot-result-head strong {
          font-size: 1rem;
        }

        .deep-bot-result-head span {
          color: var(--accent-purple);
          font-size: 0.68rem;
          font-weight: 800;
        }

        .deep-bot-result-net {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          align-items: baseline;
          margin-top: 0.8rem;
        }

        .deep-bot-result-net strong {
          color: #61c77a;
          font-size: 1.45rem;
        }

        .deep-bot-result-net span {
          color: var(--text-secondary);
          font-size: 0.68rem;
        }

        .deep-bot-result dl {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.75rem;
          margin: 0.9rem 0 0;
        }

        .deep-bot-result dt {
          color: #666666;
          font-size: 0.62rem;
        }

        .deep-bot-result dd {
          margin: 0.2rem 0 0;
          color: var(--text-secondary);
          font-size: 0.72rem;
        }

        .deep-evidence-links {
          display: grid;
          align-content: start;
          gap: 0.6rem;
        }

        .deep-dashboard-proof {
          overflow: hidden;
          margin: 3rem 0 0 76px;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          background: #111111;
        }

        .deep-dashboard-proof > div {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          padding: 0.85rem 1rem;
          border-bottom: 1px solid var(--border-color);
        }

        .deep-dashboard-proof img {
          display: block;
          width: 100%;
          height: auto;
        }

        .deep-dashboard-proof figcaption {
          padding: 0.9rem 1rem 1rem;
          border-top: 1px solid var(--border-color);
          color: var(--text-secondary);
          font-size: 0.78rem;
          line-height: 1.65;
        }

        .deep-lessons article {
          display: grid;
          grid-template-columns: 48px 240px minmax(0, 1fr);
          gap: 1.25rem;
          padding: 1.35rem 0;
          border-top: 1px solid var(--border-color);
        }

        .deep-lessons span {
          color: var(--accent-purple);
          font-size: 0.75rem;
          font-weight: 800;
        }

        .deep-lessons h3,
        .deep-lessons p {
          margin: 0;
        }

        .deep-lessons h3 {
          font-size: 1rem;
        }

        .deep-lessons p {
          max-width: 760px;
          color: var(--text-secondary);
          font-size: 0.84rem;
          line-height: 1.75;
        }

        .deep-disclosure {
          margin-top: 2.25rem;
        }

        .deep-sources {
          display: flex;
          justify-content: space-between;
          gap: 2rem;
          padding: 2rem 0;
          border-bottom: 1px solid var(--border-color);
        }

        .deep-sources > div {
          display: flex;
          gap: 0.55rem;
          align-items: center;
          font-size: 0.82rem;
          font-weight: 800;
        }

        .deep-next-project {
          padding: 4rem 0 1rem;
        }

        .deep-next-project > span {
          display: block;
          margin-bottom: 0.8rem;
        }

        .deep-next-project > a {
          display: grid;
          grid-template-columns: 240px minmax(0, 1fr) auto;
          gap: 1.5rem;
          align-items: center;
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
          padding: 1.4rem 0;
          color: inherit;
        }

        .deep-next-project strong {
          font-size: 1.15rem;
        }

        .deep-next-project p {
          max-width: none;
          margin: 0;
          color: var(--text-secondary);
          font-size: 0.82rem;
        }

        .deep-next-project > a:hover strong,
        .deep-next-project > a:hover svg {
          color: var(--accent-purple);
        }

        @keyframes deep-case-enter {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes deep-timing-pulse {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(179, 157, 219, 0.35);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(179, 157, 219, 0);
          }
        }

        @media (max-width: 1100px) {
          .deep-case-layout {
            grid-template-columns: 1fr;
            gap: 0;
          }

          .deep-case-nav {
            position: static;
            display: flex;
            overflow-x: auto;
            gap: 1.25rem;
            border-left: 0;
            border-bottom: 1px solid var(--border-color);
            padding: 0 0 1rem;
            scrollbar-width: none;
          }

          .deep-case-nav::-webkit-scrollbar {
            display: none;
          }

          .deep-case-nav > span {
            flex: 0 0 auto;
            align-self: center;
          }

          .deep-case-nav nav {
            display: flex;
            flex: 0 0 auto;
            gap: 1rem;
          }

          .deep-case-nav a {
            grid-template-columns: auto auto;
            white-space: nowrap;
          }

          .deep-case-main {
            padding-top: 3rem;
          }

          .deep-hero-window {
            right: 2rem;
          }
        }

        @media (max-width: 820px) {
          .deep-hero {
            min-height: 560px;
            padding: 2.5rem 1.5rem 2rem;
          }

          .deep-hero h1 {
            font-size: 3rem;
          }

          .deep-hero-window {
            right: 1.5rem;
            top: 1.5rem;
          }

          .deep-metrics {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .deep-metrics > div:nth-child(2) {
            border-right: 0;
          }

          .deep-metrics > div:nth-child(-n + 2) {
            border-bottom: 1px solid var(--border-color);
          }

          .deep-opening {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .deep-opportunity-grid,
          .deep-mechanism-list,
          .deep-principles {
            grid-template-columns: 1fr;
          }

          .deep-mechanism-list article:nth-child(odd) {
            border-right: 0;
          }

          .deep-mechanism-list article:nth-child(even) {
            padding-left: 0;
          }

          .deep-system-flow {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

          .deep-system-flow > div:nth-child(3) {
            border-right: 0;
          }

          .deep-system-flow > div:nth-child(-n + 3) {
            border-bottom: 1px solid var(--border-color);
          }

          .deep-system-flow > div:nth-child(3) svg {
            display: none;
          }

          .deep-playbook-head {
            display: none;
          }

          .deep-playbook article {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .deep-playbook h3 {
            grid-column: 1 / -1;
            font-size: 1rem;
          }

          .deep-playbook p::before,
          .deep-playbook strong::before {
            content: attr(data-label);
            display: block;
            margin-bottom: 0.25rem;
            color: #666666;
            font-size: 0.65rem;
            font-weight: 800;
          }

          .deep-evolution-list article,
          .deep-evidence-list article,
          .deep-lessons article {
            grid-template-columns: 48px minmax(0, 1fr);
          }

          .deep-evolution-detail,
          .deep-evidence-links,
          .deep-lessons p {
            grid-column: 2;
          }

          .deep-sources {
            align-items: flex-start;
            flex-direction: column;
          }

          .deep-next-project > a {
            grid-template-columns: minmax(0, 1fr) auto;
          }

          .deep-next-project p {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 600px) {
          .deep-case-shell {
            padding: 0 1rem 4rem;
          }

          .deep-hero {
            min-height: 520px;
            padding: 2rem 1.15rem 1.5rem;
          }

          .deep-hero-window {
            right: 1.15rem;
            top: 1.15rem;
            min-width: 0;
          }

          .deep-hero-window strong {
            font-size: 1.2rem;
          }

          .deep-hero h1 {
            font-size: 2.35rem;
          }

          .deep-hero-content > p {
            font-size: 0.94rem;
            line-height: 1.7;
          }

          .deep-hero-actions {
            align-items: stretch;
            flex-direction: column;
          }

          .deep-hero-actions a {
            justify-content: center;
          }

          .deep-metrics strong {
            font-size: 1.35rem;
          }

          .deep-case-main {
            padding-top: 2rem;
          }

          .deep-opening > p {
            font-size: 1.08rem;
          }

          .deep-section {
            padding: 3.5rem 0;
          }

          .deep-section-heading {
            grid-template-columns: 34px minmax(0, 1fr);
            gap: 0.75rem;
          }

          .deep-section-heading h2 {
            font-size: 1.8rem;
          }

          .deep-opportunity-grid,
          .deep-note,
          .deep-timing-track,
          .deep-route-list,
          .deep-evolution-list,
          .deep-system-flow,
          .deep-mechanism-list,
          .deep-playbook,
          .deep-principles,
          .deep-evidence-list,
          .deep-dashboard-proof,
          .deep-lessons,
          .deep-disclosure {
            margin-left: 0;
          }

          .deep-opportunity-grid {
            gap: 1.75rem;
          }

          .deep-timing-track {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

          .deep-timing-track > div {
            padding-right: 0.5rem;
          }

          .deep-timing-track strong {
            font-size: 1.05rem;
          }

          .deep-timing-track span {
            font-size: 0.65rem;
          }

          .deep-route-list article {
            grid-template-columns: 88px minmax(0, 1fr);
            gap: 1rem;
          }

          .deep-route-time {
            font-size: 1.9rem;
          }

          .deep-evolution-list article,
          .deep-lessons article {
            grid-template-columns: 34px minmax(0, 1fr);
            gap: 0.75rem;
          }

          .deep-evidence-list article {
            grid-template-columns: 1fr;
            gap: 0.75rem;
          }

          .deep-evidence-links {
            grid-column: 1;
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .deep-bot-results {
            grid-template-columns: 1fr;
          }

          .deep-bot-result {
            padding-right: 0;
          }

          .deep-bot-result + .deep-bot-result {
            border-top: 1px solid var(--border-color);
            border-left: 0;
            padding-left: 0;
          }

          .deep-evolution-detail p {
            grid-template-columns: 42px minmax(0, 1fr);
          }

          .deep-system-flow {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .deep-system-flow > div:nth-child(2),
          .deep-system-flow > div:nth-child(4) {
            border-right: 0;
          }

          .deep-system-flow > div:nth-child(3) {
            border-right: 1px solid var(--border-color);
          }

          .deep-system-flow > div:nth-child(-n + 4) {
            border-bottom: 1px solid var(--border-color);
          }

          .deep-system-flow > div:nth-child(even) svg {
            display: none;
          }

          .deep-playbook article {
            grid-template-columns: 1fr;
          }

          .deep-playbook h3 {
            grid-column: auto;
          }

          .deep-principles {
            gap: 2rem;
          }

          .deep-dashboard-proof {
            border-radius: 6px;
          }

          .deep-dashboard-proof > div {
            align-items: center;
          }

          .deep-next-project > a {
            grid-template-columns: minmax(0, 1fr) auto;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .deep-hero-content,
          .deep-hero-window,
          .deep-timing-track::before {
            animation: none;
          }
        }
      `}</style>
    </main>
  )
}
