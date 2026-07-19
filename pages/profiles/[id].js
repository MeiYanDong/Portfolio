import Head from 'next/head'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowUpRight,
  BriefcaseBusiness,
  Download,
  GraduationCap,
  Mail,
  MapPin,
  Phone
} from 'lucide-react'
import profilesData from '../../data/profiles.json'
import casesData from '../../data/cases.json'
import projectsData from '../../data/projects.json'

export default function ProfileDetail({ profile, featuredCases, featuredProjects }) {
  return (
    <>
      <Head>
        <title>{`${profile.role} - ${profile.name}`}</title>
        <meta name="description" content={profile.headline} />
      </Head>

      <main className="profile-shell">
        <Link href="/" className="profile-back">
          <ArrowLeft size={17} />
          返回首页
        </Link>

        <section className="profile-hero">
          <div className="profile-hero-copy">
            <p className="profile-kicker">岗位档案 / {profile.role}</p>
            <h1>{profile.name}</h1>
            <strong>{profile.headline}</strong>
            <p>{profile.summary}</p>
            <div className="profile-actions">
              <a href="#featured-case" className="profile-primary-action">
                查看真实案例
                <ArrowUpRight size={17} />
              </a>
              <a
                href={profile.resume.file}
                target="_blank"
                rel="noopener noreferrer"
                className="profile-secondary-action"
              >
                <Download size={17} />
                查看简历
              </a>
              <a href={profile.contact.emailHref} className="profile-secondary-action">
                <Mail size={17} />
                邮件联系
              </a>
            </div>
          </div>
          <div className="profile-hero-facts" aria-label="基本信息">
            <span>
              <GraduationCap size={17} />
              {profile.education}
            </span>
            <span>
              <BriefcaseBusiness size={17} />
              {profile.availability}
            </span>
            <span>
              <MapPin size={17} />
              {profile.location}
            </span>
          </div>
        </section>

        <section className="profile-metrics" aria-label="关键结果">
          {profile.metrics.map((metric) => (
            <div key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
              <small>{metric.note}</small>
            </div>
          ))}
        </section>

        <section className="profile-section profile-capabilities">
          <div className="profile-section-heading">
            <span>能力结构</span>
            <h2>能独立完成内容，也能把方法变成系统</h2>
            <p>从选题到复盘负责最终判断，再用 AI 和代码压缩重复工作。</p>
          </div>
          <div className="capability-list">
            {profile.capabilities.map((capability) => (
              <div key={capability.index}>
                <span>{capability.index}</span>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="profile-section collaboration-section">
          <div className="profile-section-heading">
            <span>协作方式</span>
            <h2>本人负责结果，AI 负责放大执行效率</h2>
          </div>
          <div className="collaboration-ledger">
            <div>
              <span>本人</span>
              <strong>目标、判断与责任</strong>
              <p>{profile.workingModel.human}</p>
            </div>
            <div>
              <span>AI</span>
              <strong>研究、探索与执行加速</strong>
              <p>{profile.workingModel.ai}</p>
            </div>
            <div>
              <span>结果</span>
              <strong>可复用的单人工作流</strong>
              <p>{profile.workingModel.result}</p>
            </div>
          </div>
        </section>

        {featuredCases.map((caseItem) => (
          <section className="profile-section featured-case" id="featured-case" key={caseItem.id}>
            <div className="profile-section-heading">
              <span>代表案例</span>
              <h2>{caseItem.title}</h2>
              <p>{caseItem.headline}</p>
            </div>
            <Link href={`/cases/${caseItem.id}`} className="case-feature-link">
              <div className="case-feature-image">
                <img src={caseItem.cover} alt={caseItem.coverAlt} />
              </div>
              <div className="case-feature-copy">
                <div>
                  <span>{caseItem.period}</span>
                  <span>{caseItem.role}</span>
                </div>
                <h3>从用户问题到内容传播，再到销售转化</h3>
                <p>{caseItem.description}</p>
                <dl>
                  {caseItem.metrics.slice(0, 3).map((metric) => (
                    <div key={metric.label}>
                      <dt>{metric.value}</dt>
                      <dd>{metric.label}</dd>
                    </div>
                  ))}
                </dl>
                <strong className="case-feature-action">
                  阅读完整案例
                  <ArrowUpRight size={17} />
                </strong>
              </div>
            </Link>
          </section>
        ))}

        <section className="profile-section selected-projects">
          <div className="profile-section-heading">
            <span>相关项目</span>
            <h2>内容运营之外，我也在搭建真实工具</h2>
            <p>这些项目展示了我将需求、内容经验和 AI 协作转化为可运行产品的能力。</p>
          </div>
          <div className="profile-project-list">
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
          <Link href="/projects" className="profile-inline-link">
            浏览全部项目
            <ArrowUpRight size={16} />
          </Link>
        </section>

        <section className="profile-section resume-section">
          <div className="resume-preview">
            <a href={profile.resume.file} target="_blank" rel="noopener noreferrer">
              <img src={profile.resume.preview} alt={`${profile.resume.label}简历预览`} />
            </a>
          </div>
          <div className="resume-copy">
            <span>完整简历</span>
            <h2>{profile.resume.label}</h2>
            <p>
              简历包含教育背景、AI 工具能力、内容运营结果、自动化实践与相关产品项目。页面中的案例与项目可作为简历信息的展开证据。
            </p>
            <a
              href={profile.resume.file}
              target="_blank"
              rel="noopener noreferrer"
              className="profile-primary-action"
            >
              <Download size={17} />
              打开 PDF 简历
            </a>
          </div>
        </section>

        <section className="profile-contact">
          <div>
            <span>联系与到岗</span>
            <h2>可暑期全职，开学后兼职</h2>
            <p>期待 AI 内容运营、AI 产品内容与内容自动化相关的实习机会。</p>
          </div>
          <div className="profile-contact-list">
            <a href={profile.contact.emailHref}>
              <Mail size={17} />
              <span>邮箱</span>
              <strong>{profile.contact.email}</strong>
            </a>
            <a href={profile.contact.phoneHref}>
              <Phone size={17} />
              <span>电话</span>
              <strong>{profile.contact.phone}</strong>
            </a>
            <a href={profile.contact.githubHref} target="_blank" rel="noopener noreferrer">
              <ArrowUpRight size={17} />
              <span>GitHub</span>
              <strong>{profile.contact.github}</strong>
            </a>
            <a href={profile.contact.twitterHref} target="_blank" rel="noopener noreferrer">
              <ArrowUpRight size={17} />
              <span>推特</span>
              <strong>{profile.contact.twitter}</strong>
            </a>
            <div>
              <span aria-hidden="true">#</span>
              <span>微信</span>
              <strong>{profile.contact.wechat}</strong>
            </div>
          </div>
        </section>
      </main>

      <style jsx global>{`
        .profile-shell {
          width: 100%;
          max-width: 1380px;
          margin: 0 auto;
          padding: 0 1.5rem 5rem;
        }

        .profile-back {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          margin: 0.5rem 0 1.25rem;
          color: var(--text-secondary);
          font-size: 0.84rem;
        }

        .profile-hero {
          position: relative;
          display: grid;
          grid-template-columns: minmax(0, 1fr) 330px;
          gap: 4rem;
          align-items: end;
          min-height: 560px;
          overflow: hidden;
          padding: 4rem 3rem 3rem;
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
          isolation: isolate;
        }

        .profile-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: -2;
          background: url('/avatar.jpg') 78% 42% / cover no-repeat;
          filter: grayscale(0.18) saturate(0.66) contrast(1.04);
          transform: scale(1.025);
        }

        .profile-hero::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: -1;
          background:
            linear-gradient(90deg, rgba(7, 7, 7, 0.99) 0%, rgba(7, 7, 7, 0.92) 48%, rgba(7, 7, 7, 0.28) 100%),
            linear-gradient(0deg, rgba(7, 7, 7, 0.9), transparent 70%);
        }

        .profile-hero-copy {
          max-width: 850px;
        }

        .profile-kicker,
        .profile-section-heading > span,
        .resume-copy > span,
        .profile-contact > div:first-child > span {
          color: var(--accent-purple);
          font-size: 0.74rem;
          font-weight: 800;
        }

        .profile-hero h1 {
          margin: 0.45rem 0 0.8rem;
          font-size: 5.5rem;
          line-height: 0.95;
        }

        .profile-hero-copy > strong {
          display: block;
          max-width: 780px;
          font-size: 1.55rem;
          line-height: 1.45;
        }

        .profile-hero-copy > p:not(.profile-kicker) {
          max-width: 760px;
          margin-top: 1rem;
          color: #c6c6c6;
          line-height: 1.8;
        }

        .profile-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-top: 1.75rem;
        }

        .profile-primary-action,
        .profile-secondary-action {
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

        .profile-primary-action {
          border: 1px solid var(--accent-purple);
          color: var(--bg-primary);
          background: var(--accent-purple);
        }

        .profile-secondary-action {
          border: 1px solid rgba(255, 255, 255, 0.28);
          color: var(--text-primary);
          background: rgba(10, 10, 10, 0.58);
        }

        .profile-primary-action:hover,
        .profile-secondary-action:hover {
          transform: translateY(-2px);
        }

        .profile-hero-facts {
          display: grid;
          align-content: end;
          gap: 0.85rem;
          min-width: 0;
        }

        .profile-hero-facts span {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 0.65rem;
          align-items: center;
          border-top: 1px solid rgba(255, 255, 255, 0.24);
          padding-top: 0.85rem;
          color: #d0d0d0;
          font-size: 0.82rem;
        }

        .profile-metrics {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          border-bottom: 1px solid var(--border-color);
        }

        .profile-metrics > div {
          display: grid;
          min-width: 0;
          padding: 1.4rem 1.25rem;
          border-right: 1px solid var(--border-color);
        }

        .profile-metrics > div:last-child {
          border-right: 0;
        }

        .profile-metrics strong {
          font-size: 2rem;
          line-height: 1;
        }

        .profile-metrics span {
          margin-top: 0.45rem;
          font-size: 0.82rem;
          font-weight: 700;
        }

        .profile-metrics small {
          color: var(--text-secondary);
          font-size: 0.72rem;
        }

        .profile-section {
          display: grid;
          grid-template-columns: minmax(260px, 0.72fr) minmax(0, 1.28fr);
          gap: 4rem;
          padding: 5rem 0;
          border-bottom: 1px solid var(--border-color);
          scroll-margin-top: 100px;
        }

        .profile-section-heading h2,
        .resume-copy h2,
        .profile-contact h2 {
          margin-top: 0.5rem;
          font-size: 2.5rem;
        }

        .profile-section-heading p,
        .resume-copy p,
        .profile-contact p {
          color: var(--text-secondary);
          line-height: 1.8;
        }

        .capability-list {
          border-bottom: 1px solid var(--border-color);
        }

        .capability-list > div {
          display: grid;
          grid-template-columns: 48px 200px minmax(0, 1fr);
          gap: 1rem;
          align-items: baseline;
          padding: 1.25rem 0;
          border-top: 1px solid var(--border-color);
          transition: padding-left 0.25s ease;
        }

        .capability-list > div:hover {
          padding-left: 0.5rem;
        }

        .capability-list > div > span,
        .collaboration-ledger > div > span,
        .profile-project-list > a > span {
          color: var(--accent-purple);
          font-size: 0.78rem;
          font-weight: 800;
        }

        .capability-list h3,
        .capability-list p {
          margin: 0;
        }

        .capability-list h3 {
          font-size: 1rem;
        }

        .capability-list p,
        .collaboration-ledger p {
          color: var(--text-secondary);
          font-size: 0.88rem;
          line-height: 1.75;
        }

        .collaboration-ledger {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
        }

        .collaboration-ledger > div {
          min-width: 0;
          padding: 1.4rem 1.25rem;
          border-right: 1px solid var(--border-color);
        }

        .collaboration-ledger > div:last-child {
          border-right: 0;
        }

        .collaboration-ledger strong {
          display: block;
          margin: 0.7rem 0 0.65rem;
          font-size: 0.95rem;
        }

        .case-feature-link {
          display: grid;
          grid-template-columns: minmax(260px, 0.82fr) minmax(0, 1.18fr);
          min-width: 0;
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
          color: inherit;
        }

        .case-feature-image {
          min-height: 430px;
          overflow: hidden;
          border-right: 1px solid var(--border-color);
        }

        .case-feature-image img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 28%;
          filter: saturate(0.72) contrast(1.05);
          transition: transform 0.45s ease, filter 0.3s ease;
        }

        .case-feature-link:hover .case-feature-image img {
          transform: scale(1.025);
          filter: saturate(0.92) contrast(1.05);
        }

        .case-feature-copy {
          display: flex;
          flex-direction: column;
          min-width: 0;
          padding: 1.75rem;
        }

        .case-feature-copy > div:first-child {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          color: var(--text-secondary);
          font-size: 0.76rem;
        }

        .case-feature-copy h3 {
          margin-top: 1.2rem;
          font-size: 1.65rem;
        }

        .case-feature-copy > p {
          color: var(--text-secondary);
          line-height: 1.75;
        }

        .case-feature-copy dl {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          margin-top: auto;
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
        }

        .case-feature-copy dl > div {
          display: grid;
          padding: 0.85rem;
          border-right: 1px solid var(--border-color);
        }

        .case-feature-copy dl > div:last-child {
          border-right: 0;
        }

        .case-feature-copy dt {
          font-size: 1.15rem;
          font-weight: 800;
        }

        .case-feature-copy dd {
          color: var(--text-secondary);
          font-size: 0.7rem;
        }

        .case-feature-action,
        .profile-inline-link {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          width: fit-content;
          margin-top: 1.2rem;
          color: var(--accent-purple);
          font-size: 0.82rem;
        }

        .profile-project-list {
          border-bottom: 1px solid var(--border-color);
        }

        .profile-project-list > a {
          display: grid;
          grid-template-columns: 46px 220px minmax(0, 1fr) auto;
          gap: 1rem;
          align-items: center;
          min-width: 0;
          padding: 1.05rem 0;
          border-top: 1px solid var(--border-color);
          color: inherit;
        }

        .profile-project-list > a:hover strong {
          color: var(--accent-purple);
        }

        .profile-project-list > a > div {
          display: grid;
          min-width: 0;
        }

        .profile-project-list small,
        .profile-project-list p {
          color: var(--text-secondary);
          font-size: 0.76rem;
        }

        .profile-project-list p {
          max-width: none;
          margin: 0;
          line-height: 1.6;
        }

        .resume-section {
          grid-template-columns: minmax(300px, 0.88fr) minmax(0, 1.12fr);
          align-items: center;
        }

        .resume-preview {
          max-height: 760px;
          overflow: hidden;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          background: #fff;
        }

        .resume-preview img {
          display: block;
          width: 100%;
          height: auto;
        }

        .resume-copy .profile-primary-action {
          margin-top: 1rem;
        }

        .profile-contact {
          display: grid;
          grid-template-columns: minmax(280px, 0.72fr) minmax(0, 1.28fr);
          gap: 4rem;
          padding: 5rem 0 1rem;
        }

        .profile-contact-list {
          border-bottom: 1px solid var(--border-color);
        }

        .profile-contact-list > * {
          display: grid;
          grid-template-columns: 24px 90px minmax(0, 1fr);
          gap: 0.75rem;
          align-items: center;
          min-width: 0;
          padding: 0.95rem 0;
          border-top: 1px solid var(--border-color);
          color: inherit;
          font-size: 0.82rem;
        }

        .profile-contact-list span {
          color: var(--text-secondary);
        }

        .profile-contact-list strong {
          min-width: 0;
          overflow-wrap: anywhere;
        }

        .profile-contact-list a:hover strong {
          color: var(--accent-purple);
        }

        @media (max-width: 980px) {
          .profile-hero {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .profile-hero-facts {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

          .profile-section,
          .profile-contact {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }

          .profile-section-heading {
            max-width: 720px;
          }
        }

        @media (max-width: 720px) {
          .profile-shell {
            padding: 0 1rem 4rem;
          }

          .profile-hero {
            min-height: 620px;
            padding: 2rem 1.25rem;
          }

          .profile-hero::before {
            background-position: 62% 34%;
          }

          .profile-hero::after {
            background: linear-gradient(0deg, rgba(7, 7, 7, 0.99) 0%, rgba(7, 7, 7, 0.86) 72%, rgba(7, 7, 7, 0.48) 100%);
          }

          .profile-hero h1 {
            font-size: 3.6rem;
          }

          .profile-hero-copy > strong {
            font-size: 1.2rem;
          }

          .profile-hero-facts,
          .profile-metrics,
          .collaboration-ledger {
            grid-template-columns: 1fr 1fr;
          }

          .profile-hero-facts span:last-child,
          .collaboration-ledger > div:last-child {
            grid-column: 1 / -1;
          }

          .profile-metrics > div:nth-child(2),
          .collaboration-ledger > div:nth-child(2) {
            border-right: 0;
          }

          .profile-metrics > div:nth-child(-n + 2),
          .collaboration-ledger > div:nth-child(-n + 2) {
            border-bottom: 1px solid var(--border-color);
          }

          .profile-section,
          .profile-contact {
            padding: 3.5rem 0;
          }

          .profile-section-heading h2,
          .resume-copy h2,
          .profile-contact h2 {
            font-size: 1.9rem;
          }

          .capability-list > div {
            grid-template-columns: 38px minmax(0, 1fr);
          }

          .capability-list p {
            grid-column: 2;
          }

          .case-feature-link {
            grid-template-columns: 1fr;
          }

          .case-feature-image {
            min-height: 320px;
            border-right: 0;
            border-bottom: 1px solid var(--border-color);
          }

          .case-feature-copy {
            min-height: 430px;
            padding: 1.25rem;
          }

          .profile-project-list > a {
            grid-template-columns: 34px minmax(0, 1fr) auto;
            gap: 0.75rem;
          }

          .profile-project-list p {
            grid-column: 2 / -1;
          }

          .profile-contact-list > * {
            grid-template-columns: 22px 62px minmax(0, 1fr);
          }
        }
      `}</style>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: profilesData.map((profile) => ({ params: { id: profile.id } })),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const profile = profilesData.find((item) => item.id === params.id)

  if (!profile) return { notFound: true }

  const featuredCases = profile.caseIds
    .map((caseId) => casesData.find((caseItem) => caseItem.id === caseId))
    .filter(Boolean)
  const featuredProjects = profile.projectIds
    .map((projectId) => projectsData.find((project) => project.id === projectId))
    .filter(Boolean)

  return {
    props: {
      profile,
      featuredCases,
      featuredProjects
    }
  }
}
