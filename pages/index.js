import Head from 'next/head'
import Link from 'next/link'
import projectsData from '../data/projects.json'

export default function Home() {
  // 获取最新的6个项目
  const latestProjects = projectsData.slice(0, 6)

  return (
    <>
      <Head>
        <title>梅炎栋 - 终身学习者与创作者</title>
        <meta name="description" content="AIGC创作者，定投理财实践者，运动健身爱好者" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        {/* Hero 区域 */}
        <section className="hero">
          <div className="hero-content">
            <div className="avatar">
              <img src="/avatar.jpg" alt="梅炎栋" />
            </div>
            <div className="intro">
              <h1>你好，我是梅炎栋</h1>
              <p>
              05年21岁 | AI x Web3
              <br />普通不甘平庸 专注个人成长
              <br />终生学习者、践行者
              </p>
              <Link href="/projects" className="btn hero-btn">
                浏览我的项目
              </Link>
            </div>
          </div>
        </section>

        {/* 项目预览 */}
        <section className="projects-preview">
          <h2>最新项目</h2>
          <div className="projects-grid">
            {latestProjects.map((project) => (
              <Link 
                key={project.id} 
                href={`/projects/${project.id}`} 
                className="project-card card"
              >
                <div className="project-image">
                  <img src={project.cover} alt={project.title} />
                </div>
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-meta">
                    <span className="year">{project.year}</span>
                    <span className="divider">|</span>
                    <span className="tech">{project.tags.join(', ')}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="view-all">
            <Link href="/projects" className="btn">
              查看全部项目
            </Link>
          </div>
        </section>
      </div>

      <style jsx>{`
        .hero {
          padding: 4rem 0 6rem;
          text-align: center;
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          max-width: 800px;
          margin: 0 auto;
        }

        .avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid var(--accent-purple);
          transition: transform 0.2s ease;
        }

        .avatar:hover {
          transform: scale(1.05);
        }

        .avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .intro h1 {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, var(--text-primary), var(--accent-purple));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .intro p {
          font-size: 1.125rem;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto 2rem;
          line-height: 1.8;
        }

        .hero-btn {
          font-size: 1rem;
          padding: 1rem 2rem;
        }

        .projects-preview {
          margin-top: 6rem;
        }

        .projects-preview h2 {
          text-align: center;
          margin-bottom: 3rem;
          color: var(--text-primary);
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .project-card {
          padding: 0;
          overflow: hidden;
          cursor: pointer;
          text-decoration: none;
          color: inherit;
        }

        .project-card:hover .project-info h3 {
          color: var(--accent-purple);
        }

        .project-image {
          width: 100%;
          height: 200px;
          background: var(--bg-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        .project-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .project-info {
          padding: 1.5rem;
        }

        .project-info h3 {
          margin-bottom: 0.75rem;
          transition: color 0.2s ease;
        }

        .project-description {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 1rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .project-meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .divider {
          opacity: 0.5;
        }

        .view-all {
          text-align: center;
          margin-top: 3rem;
        }

        @media (max-width: 768px) {
          .hero {
            padding: 2rem 0 4rem;
          }

          .hero-content {
            gap: 1.5rem;
          }

          .intro h1 {
            font-size: 2rem;
          }

          .intro p {
            font-size: 1rem;
          }

          .projects-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        @media (min-width: 1200px) {
          .projects-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </>
  )
} 