import Head from 'next/head'
import Link from 'next/link'
import { ArrowUpRight, Download } from 'lucide-react'
import profilesData from '../data/profiles.json'

const timeline = [
  {
    year: '2024',
    title: '开始 AIGC 内容实践',
    description: '从 AI 绘画与视频进入生成式 AI，持续测试工具、内容形式和平台表达。'
  },
  {
    year: '2025',
    title: '把真实需求做成产品',
    description: '使用 AI Coding 独立完成习惯飞轮、提示词管理器、分享卡片和游戏作品集等产品。'
  },
  {
    year: '2026',
    title: '进入内容运营与自动化',
    description: '围绕 AI 工具完成内容选题、制作、发布和复盘，并把稳定流程沉淀为 Skill 与自动化脚本。'
  },
  {
    year: '现在',
    title: '寻找 AI 内容运营实践机会',
    description: '希望在真实团队中继续验证内容判断、平台运营、AI 协作和流程搭建能力。'
  }
]

export default function About() {
  const profile = profilesData[0]

  return (
    <>
      <Head>
        <title>关于 - 梅炎栋</title>
        <meta
          name="description"
          content="了解梅炎栋的学习背景、AI 内容运营能力、Vibe Coding 实践与人机协作方式。"
        />
      </Head>

      <main className="about-shell">
        <section className="about-hero">
          <div className="about-hero-copy">
            <p className="about-kicker">关于</p>
            <h1>梅炎栋</h1>
            <strong>{profile.role} / Vibe Coding 实践者</strong>
            <p>{profile.summary}</p>
            <div className="about-actions">
              <Link href="/profiles/ai-content-operations" className="about-primary-action">
                查看岗位档案
                <ArrowUpRight size={17} />
              </Link>
              <a
                href={profile.resume.file}
                target="_blank"
                rel="noopener noreferrer"
                className="about-secondary-action"
              >
                <Download size={17} />
                PDF 简历
              </a>
            </div>
          </div>
        </section>

        <section className="about-facts" aria-label="基本信息">
          <div>
            <span>教育</span>
            <strong>南通大学</strong>
            <small>应用统计学本科 / 2027 届</small>
          </div>
          <div>
            <span>方向</span>
            <strong>AI 内容运营</strong>
            <small>内容、产品与自动化</small>
          </div>
          <div>
            <span>到岗</span>
            <strong>暑期全职</strong>
            <small>开学后可兼职</small>
          </div>
          <div>
            <span>所在地</span>
            <strong>{profile.location}</strong>
            <small>可沟通实习安排</small>
          </div>
        </section>

        <section className="about-section about-intro">
          <div className="about-section-heading">
            <span>我在做什么</span>
            <h2>把内容判断、产品实践和 AI 协作连成一条工作链</h2>
          </div>
          <div className="about-prose">
            <p>
              我的起点不是“会使用多少 AI 工具”，而是遇到一个真实问题后，能否把它研究清楚、组织成别人能理解的内容，或者进一步做成可运行的产品。
            </p>
            <p>
              在内容工作中，我独立负责选题、事实核验、文案、素材、发布和复盘；在产品工作中，我使用 Claude Code 与 Codex 完成需求拆解、实现、测试和迭代。AI 参与执行，但目标、判断和最终责任始终由我承担。
            </p>
            <p>
              我希望个人网站不只陈列作品，所以把“项目”“案例”“文章”分开：项目说明做出了什么，案例说明如何产生结果，文章记录对具体问题的理解。
            </p>
          </div>
        </section>

        <section className="about-section">
          <div className="about-section-heading">
            <span>能力结构</span>
            <h2>四项可以进入真实工作的能力</h2>
          </div>
          <div className="about-capability-list">
            {profile.capabilities.map((capability) => (
              <div key={capability.index}>
                <span>{capability.index}</span>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="about-section">
          <div className="about-section-heading">
            <span>实践路径</span>
            <h2>从生成内容，到搭建产品和工作流</h2>
          </div>
          <div className="about-timeline">
            {timeline.map((item) => (
              <div key={item.year}>
                <span>{item.year}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="about-section about-working-model">
          <div className="about-section-heading">
            <span>人机协作</span>
            <h2>AI 是执行杠杆，不是责任替代</h2>
          </div>
          <div className="about-model-ledger">
            <div>
              <span>本人负责</span>
              <strong>目标、事实与最终判断</strong>
              <p>{profile.workingModel.human}</p>
            </div>
            <div>
              <span>AI 协作</span>
              <strong>研究、初稿与重复执行</strong>
              <p>{profile.workingModel.ai}</p>
            </div>
            <div>
              <span>沉淀结果</span>
              <strong>可以复用和验证的系统</strong>
              <p>{profile.workingModel.result}</p>
            </div>
          </div>
        </section>

        <section className="about-next">
          <div>
            <span>继续了解</span>
            <h2>从真实工作结果开始</h2>
            <p>查看 Token 中转站内容运营案例，或浏览我已经完成的产品和自动化项目。</p>
          </div>
          <div>
            <Link href="/cases/token-relay-content-operations">
              查看代表案例
              <ArrowUpRight size={17} />
            </Link>
            <Link href="/projects">
              浏览全部项目
              <ArrowUpRight size={17} />
            </Link>
            <Link href="/contact">
              联系我
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </section>
      </main>

      <style jsx global>{`
        .about-shell {
          width: 100%;
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 1.5rem 5rem;
        }

        .about-hero {
          position: relative;
          display: flex;
          align-items: flex-end;
          min-height: 510px;
          overflow: hidden;
          padding: 4rem 3rem 3rem;
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
          isolation: isolate;
        }

        .about-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: -2;
          background: url('/avatar.jpg') 76% 42% / cover no-repeat;
          filter: grayscale(0.18) saturate(0.66) contrast(1.04);
          transform: scale(1.025);
        }

        .about-hero::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: -1;
          background:
            linear-gradient(90deg, rgba(7, 7, 7, 0.99) 0%, rgba(7, 7, 7, 0.9) 52%, rgba(7, 7, 7, 0.24) 100%),
            linear-gradient(0deg, rgba(7, 7, 7, 0.9), transparent 70%);
        }

        .about-hero-copy {
          max-width: 820px;
        }

        .about-kicker,
        .about-section-heading > span,
        .about-next > div:first-child > span,
        .about-facts span {
          color: var(--accent-purple);
          font-size: 0.74rem;
          font-weight: 800;
        }

        .about-hero h1 {
          margin: 0.4rem 0 0.75rem;
          font-size: 5.25rem;
          line-height: 0.95;
        }

        .about-hero-copy > strong {
          display: block;
          font-size: 1.45rem;
        }

        .about-hero-copy > p:not(.about-kicker) {
          max-width: 720px;
          margin-top: 1rem;
          color: #c6c6c6;
          line-height: 1.8;
        }

        .about-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-top: 1.5rem;
        }

        .about-primary-action,
        .about-secondary-action {
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

        .about-primary-action {
          border: 1px solid var(--accent-purple);
          color: var(--bg-primary);
          background: var(--accent-purple);
        }

        .about-secondary-action {
          border: 1px solid rgba(255, 255, 255, 0.28);
          color: var(--text-primary);
          background: rgba(10, 10, 10, 0.58);
        }

        .about-facts {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          border-bottom: 1px solid var(--border-color);
        }

        .about-facts > div {
          display: grid;
          min-width: 0;
          padding: 1.25rem;
          border-right: 1px solid var(--border-color);
        }

        .about-facts > div:last-child {
          border-right: 0;
        }

        .about-facts strong {
          margin-top: 0.4rem;
          font-size: 1rem;
        }

        .about-facts small {
          color: var(--text-secondary);
          font-size: 0.72rem;
        }

        .about-section {
          display: grid;
          grid-template-columns: minmax(250px, 0.72fr) minmax(0, 1.28fr);
          gap: 4rem;
          padding: 5rem 0;
          border-bottom: 1px solid var(--border-color);
        }

        .about-section-heading h2,
        .about-next h2 {
          max-width: 520px;
          margin-top: 0.5rem;
          font-size: 2.5rem;
        }

        .about-prose p {
          max-width: 820px;
          color: var(--text-secondary);
          font-size: 1rem;
          line-height: 1.9;
        }

        .about-capability-list,
        .about-timeline {
          border-bottom: 1px solid var(--border-color);
        }

        .about-capability-list > div,
        .about-timeline > div {
          display: grid;
          grid-template-columns: 50px 210px minmax(0, 1fr);
          gap: 1rem;
          align-items: baseline;
          min-width: 0;
          padding: 1.2rem 0;
          border-top: 1px solid var(--border-color);
        }

        .about-timeline > div {
          grid-template-columns: 90px 230px minmax(0, 1fr);
        }

        .about-capability-list span,
        .about-timeline span,
        .about-model-ledger > div > span {
          color: var(--accent-purple);
          font-size: 0.76rem;
          font-weight: 800;
        }

        .about-capability-list h3,
        .about-capability-list p,
        .about-timeline h3,
        .about-timeline p {
          margin: 0;
        }

        .about-capability-list h3,
        .about-timeline h3 {
          font-size: 1rem;
        }

        .about-capability-list p,
        .about-timeline p,
        .about-model-ledger p {
          color: var(--text-secondary);
          font-size: 0.88rem;
          line-height: 1.75;
        }

        .about-model-ledger {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
        }

        .about-model-ledger > div {
          min-width: 0;
          padding: 1.4rem 1.25rem;
          border-right: 1px solid var(--border-color);
        }

        .about-model-ledger > div:last-child {
          border-right: 0;
        }

        .about-model-ledger strong {
          display: block;
          margin: 0.7rem 0 0.6rem;
          font-size: 0.95rem;
        }

        .about-next {
          display: grid;
          grid-template-columns: minmax(260px, 0.72fr) minmax(0, 1.28fr);
          gap: 4rem;
          padding: 5rem 0 1rem;
        }

        .about-next p {
          color: var(--text-secondary);
          line-height: 1.8;
        }

        .about-next > div:last-child {
          border-bottom: 1px solid var(--border-color);
        }

        .about-next a {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1rem 0;
          border-top: 1px solid var(--border-color);
          color: var(--text-primary);
          font-size: 0.88rem;
          font-weight: 700;
        }

        .about-next a:hover {
          color: var(--accent-purple);
        }

        @media (max-width: 900px) {
          .about-section,
          .about-next {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }

        @media (max-width: 720px) {
          .about-shell {
            padding: 0 1rem 4rem;
          }

          .about-hero {
            min-height: 600px;
            padding: 2rem 1.25rem;
          }

          .about-hero::before {
            background-position: 62% 34%;
          }

          .about-hero::after {
            background: linear-gradient(0deg, rgba(7, 7, 7, 0.99) 0%, rgba(7, 7, 7, 0.86) 72%, rgba(7, 7, 7, 0.48) 100%);
          }

          .about-hero h1 {
            font-size: 3.6rem;
          }

          .about-hero-copy > strong {
            font-size: 1.15rem;
          }

          .about-facts {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .about-facts > div:nth-child(2) {
            border-right: 0;
          }

          .about-facts > div:nth-child(-n + 2) {
            border-bottom: 1px solid var(--border-color);
          }

          .about-section,
          .about-next {
            padding: 3.5rem 0;
          }

          .about-section-heading h2,
          .about-next h2 {
            font-size: 1.9rem;
          }

          .about-capability-list > div,
          .about-timeline > div {
            grid-template-columns: 40px minmax(0, 1fr);
            gap: 0.75rem;
          }

          .about-timeline > div {
            grid-template-columns: 70px minmax(0, 1fr);
          }

          .about-capability-list p,
          .about-timeline p {
            grid-column: 2;
          }

          .about-model-ledger {
            grid-template-columns: 1fr;
          }

          .about-model-ledger > div {
            border-right: 0;
            border-bottom: 1px solid var(--border-color);
          }

          .about-model-ledger > div:last-child {
            border-bottom: 0;
          }
        }
      `}</style>
    </>
  )
}
