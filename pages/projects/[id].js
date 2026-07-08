import Head from 'next/head'
import Link from 'next/link'
import projectsData from '../../data/projects.json'

const tierLabels = {
  featured: '精选项目',
  selected: '入选项目',
  archive: '早期作品'
}

function hasText(value) {
  return typeof value === 'string' && value.trim().length > 0
}

export default function ProjectDetail({ project, nextProject }) {
  if (!project) {
    return (
      <div className="container">
        <div className="not-found">
          <h1>项目未找到</h1>
          <p>抱歉，您访问的项目不存在。</p>
          <Link href="/projects" className="btn">
            返回项目列表
          </Link>
        </div>
        <style jsx>{`
          .not-found {
            text-align: center;
            padding: 4rem 0;
          }

          .not-found h1 {
            margin-bottom: 1rem;
            color: var(--text-secondary);
          }

          .not-found p {
            margin: 0 auto 2rem;
            color: var(--text-secondary);
          }
        `}</style>
      </div>
    )
  }

  const stack = project.stack || project.tags || []
  const highlights = project.highlights || []
  const storySections = [
    { title: '问题', body: project.story?.problem },
    { title: '过程', body: project.story?.process },
    { title: '结果', body: project.story?.result }
  ].filter((section) => hasText(section.body))

  return (
    <>
      <Head>
        <title>{project.title} - 梅炎栋</title>
        <meta name="description" content={project.description} />
      </Head>

      <div className="container">
        <nav className="breadcrumb">
          <Link href="/projects" className="back-link">
            返回项目列表
          </Link>
        </nav>

        <section className="project-hero">
          <div className="project-visual">
            <img src={project.cover} alt={project.title} />
          </div>
          <div className="project-intro">
            <div className="project-meta-header">
              <span>{tierLabels[project.tier] || '项目'}</span>
              <span>{project.year}</span>
              <span>{project.category}</span>
            </div>
            <h1>{project.title}</h1>
            <p className="project-lead">{project.description}</p>
            {project.role && <p className="project-role">{project.role}</p>}
            {project.resumeLine && (
              <div className="resume-block">
                <span>简历表达</span>
                <p>{project.resumeLine}</p>
              </div>
            )}
            <div className="project-links">
              {project.links?.github && (
                <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                  GitHub 源码
                </a>
              )}
              {project.links?.demo && (
                <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="btn">
                  访问网站
                </a>
              )}
            </div>
          </div>
        </section>

        <section className="project-overview">
          {project.impact && (
            <div className="overview-panel">
              <h2>结果与价值</h2>
              <p>{project.impact}</p>
            </div>
          )}
          {stack.length > 0 && (
            <div className="overview-panel">
              <h2>技术栈</h2>
              <div className="stack-list">
                {stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          )}
        </section>

        {highlights.length > 0 && (
          <section className="project-section">
            <div className="section-label">CAPABILITIES</div>
            <h2>关键能力</h2>
            <div className="highlight-list">
              {highlights.map((highlight) => (
                <p key={highlight}>{highlight}</p>
              ))}
            </div>
          </section>
        )}

        {storySections.length > 0 && (
          <section className="project-section">
            <div className="section-label">CASE STUDY</div>
            <h2>项目故事</h2>
            <div className="story-grid">
              {storySections.map((section) => (
                <div key={section.title} className="story-section">
                  <h3>{section.title}</h3>
                  <p>{section.body}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="next-project">
          <h2>下一个项目</h2>
          <Link href={`/projects/${nextProject.id}`} className="next-project-card card">
            <div className="next-project-image">
              <img src={nextProject.cover} alt={nextProject.title} />
            </div>
            <div className="next-project-info">
              <span>{tierLabels[nextProject.tier] || nextProject.category}</span>
              <h3>{nextProject.title}</h3>
              <p>{nextProject.resumeLine || nextProject.description}</p>
            </div>
          </Link>
        </section>
      </div>

      <style jsx>{`
        .breadcrumb {
          padding: 1.25rem 0;
        }

        .back-link {
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        .back-link:hover {
          color: var(--accent-purple);
        }

        .project-hero {
          display: grid;
          grid-template-columns: minmax(280px, 0.82fr) minmax(0, 1.18fr);
          gap: 3rem;
          align-items: stretch;
          padding: 2rem 0 3rem;
          border-bottom: 1px solid var(--border-color);
        }

        .project-visual {
          min-height: 360px;
          overflow: hidden;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          background: var(--bg-card);
        }

        .project-visual img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: saturate(0.8);
        }

        .project-intro {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .project-meta-header {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
        }

        .project-meta-header span {
          border: 1px solid var(--border-color);
          border-radius: 4px;
          padding: 0.35rem 0.6rem;
          color: var(--text-secondary);
          font-size: 0.75rem;
        }

        .project-intro h1 {
          max-width: 780px;
          margin-bottom: 1rem;
        }

        .project-lead {
          max-width: 760px;
          color: var(--text-secondary);
          font-size: 1.08rem;
          line-height: 1.8;
        }

        .project-role {
          max-width: 760px;
          color: var(--accent-purple);
          font-size: 0.95rem;
        }

        .resume-block {
          margin: 1.25rem 0 1.5rem;
          padding: 1rem;
          border-left: 3px solid var(--accent-purple);
          background: var(--bg-card);
        }

        .resume-block span,
        .section-label {
          display: block;
          margin-bottom: 0.5rem;
          color: var(--accent-purple);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.12em;
        }

        .resume-block p {
          max-width: none;
          margin-bottom: 0;
          color: var(--text-primary);
          line-height: 1.75;
        }

        .project-links {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .btn-outline {
          background: transparent;
          border: 1px solid var(--accent-purple);
          color: var(--accent-purple);
        }

        .btn-outline:hover {
          background: var(--accent-purple);
          color: var(--bg-primary);
        }

        .project-overview {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1rem;
          padding: 2rem 0;
          border-bottom: 1px solid var(--border-color);
        }

        .overview-panel {
          padding: 1.25rem;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          background: var(--bg-card);
        }

        .overview-panel h2 {
          margin-bottom: 0.75rem;
          font-size: 1.1rem;
        }

        .overview-panel p {
          max-width: none;
          margin-bottom: 0;
          color: var(--text-secondary);
          line-height: 1.75;
        }

        .stack-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .stack-list span {
          border: 1px solid var(--border-color);
          border-radius: 4px;
          padding: 0.3rem 0.55rem;
          color: var(--text-secondary);
          font-size: 0.78rem;
        }

        .project-section {
          padding: 3rem 0;
          border-bottom: 1px solid var(--border-color);
        }

        .project-section h2 {
          margin-bottom: 1.25rem;
        }

        .highlight-list {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1rem;
        }

        .highlight-list p {
          max-width: none;
          min-height: 100%;
          margin-bottom: 0;
          padding: 1rem;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          color: var(--text-secondary);
          background: var(--bg-card);
          line-height: 1.7;
        }

        .story-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1rem;
        }

        .story-section {
          padding: 1.25rem;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          background: var(--bg-card);
        }

        .story-section h3 {
          margin-bottom: 0.75rem;
          font-size: 1rem;
        }

        .story-section p {
          max-width: none;
          margin-bottom: 0;
          color: var(--text-secondary);
          line-height: 1.75;
          white-space: pre-line;
        }

        .next-project {
          padding: 3rem 0 4rem;
        }

        .next-project h2 {
          margin-bottom: 1rem;
          font-size: 1.2rem;
        }

        .next-project-card {
          display: grid;
          grid-template-columns: 160px minmax(0, 1fr);
          gap: 1.25rem;
          padding: 1rem;
          color: inherit;
          text-decoration: none;
        }

        .next-project-image {
          height: 110px;
          overflow: hidden;
          border: 1px solid var(--border-color);
          border-radius: 6px;
        }

        .next-project-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .next-project-info span {
          display: block;
          margin-bottom: 0.4rem;
          color: var(--text-secondary);
          font-size: 0.75rem;
        }

        .next-project-info h3 {
          margin-bottom: 0.5rem;
        }

        .next-project-info p {
          max-width: none;
          margin-bottom: 0;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        @media (max-width: 900px) {
          .project-hero,
          .project-overview,
          .highlight-list,
          .story-grid {
            grid-template-columns: 1fr;
          }

          .project-visual {
            min-height: 260px;
          }
        }

        @media (max-width: 560px) {
          .project-hero {
            gap: 1.5rem;
          }

          .project-links {
            flex-direction: column;
          }

          .project-links :global(a) {
            justify-content: center;
          }

          .next-project-card {
            grid-template-columns: 84px minmax(0, 1fr);
          }

          .next-project-image {
            height: 84px;
          }
        }
      `}</style>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: projectsData.map((project) => ({
      params: { id: project.id }
    })),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const currentIndex = projectsData.findIndex((project) => project.id === params.id)

  if (currentIndex === -1) {
    return { notFound: true }
  }

  return {
    props: {
      project: projectsData[currentIndex],
      nextProject: projectsData[(currentIndex + 1) % projectsData.length]
    }
  }
}
