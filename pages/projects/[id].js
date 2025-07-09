import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import projectsData from '../../data/projects.json'

export default function ProjectDetail() {
  const router = useRouter()
  const { id } = router.query
  
  // 查找当前项目
  const project = projectsData.find(p => p.id === id)
  
  // 如果项目不存在，显示404
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
            margin-bottom: 2rem;
            color: var(--text-secondary);
          }
        `}</style>
      </div>
    )
  }

  // 获取下一个项目（用于导航）
  const currentIndex = projectsData.findIndex(p => p.id === id)
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length]

  return (
    <>
      <Head>
        <title>{project.title} - 梅炎栋</title>
        <meta name="description" content={project.description} />
      </Head>

      <div className="container">
        {/* 返回按钮 */}
        <nav className="breadcrumb">
          <Link href="/projects" className="back-link">
            ← 返回项目列表
          </Link>
        </nav>

        {/* 项目头部 */}
        <section className="project-hero">
          <div className="project-image-large">
            <img src={project.cover} alt={project.title} />
          </div>
          <div className="project-intro">
            <div className="project-meta-header">
              <span className="project-year">{project.year}</span>
              <span className="project-category">{project.category}</span>
            </div>
            <h1>{project.title}</h1>
            <p className="project-lead">{project.description}</p>
            <div className="project-tags-large">
              {project.tags.map((tag, index) => (
                <span key={index} className="tag-large">{tag}</span>
              ))}
            </div>
            <div className="project-links">
              {project.links.github && (
                <a 
                  href={project.links.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  GitHub 源码
                </a>
              )}
              {project.links.demo && (
                <a 
                  href={project.links.demo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn"
                >
                  访问网站
                </a>
              )}
            </div>
          </div>
        </section>

        {/* 项目故事 */}
        <section className="project-story">
          <h2>项目故事</h2>
          <div className="story-sections">
            <div className="story-section">
              <h3>🤔 遇到的问题</h3>
              <p>{project.story.problem}</p>
            </div>
            <div className="story-section">
              <h3>🛠️ 解决过程</h3>
              <p>{project.story.process}</p>
            </div>
            <div className="story-section">
              <h3>✨ 最终结果</h3>
              <p>{project.story.result}</p>
            </div>
          </div>
        </section>

        {/* 下一个项目 */}
        <section className="next-project">
          <h3>下一个项目</h3>
          <Link href={`/projects/${nextProject.id}`} className="next-project-card card">
            <div className="next-project-image">
              <img src={nextProject.cover} alt={nextProject.title} />
            </div>
            <div className="next-project-info">
              <h4>{nextProject.title}</h4>
              <p>{nextProject.description}</p>
              <span className="next-arrow">查看详情 →</span>
            </div>
          </Link>
        </section>
      </div>

      <style jsx>{`
        .breadcrumb {
          padding: 1rem 0;
        }

        .back-link {
          color: var(--text-secondary);
          font-size: 0.875rem;
          transition: color 0.2s ease;
        }

        .back-link:hover {
          color: var(--accent-purple);
        }

        .project-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
          margin-bottom: 4rem;
        }

        .project-image-large {
          width: 100%;
          height: 400px;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid var(--border-color);
        }

        .project-image-large img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .project-meta-header {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .project-year, .project-category {
          font-size: 0.75rem;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          border: 1px solid var(--border-color);
          background: var(--bg-card);
          color: var(--text-secondary);
        }

        .project-intro h1 {
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, var(--text-primary), var(--accent-purple));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .project-lead {
          font-size: 1.125rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 2rem;
        }

        .project-tags-large {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }

        .tag-large {
          font-size: 0.875rem;
          color: var(--accent-purple);
          background: rgba(179, 157, 219, 0.1);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          border: 1px solid rgba(179, 157, 219, 0.2);
        }

        .project-links {
          display: flex;
          gap: 1rem;
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

        .project-story {
          margin-bottom: 4rem;
        }

        .project-story h2 {
          text-align: center;
          margin-bottom: 3rem;
          color: var(--text-primary);
        }

        .story-sections {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .story-section {
          background: var(--bg-card);
          padding: 2rem;
          border-radius: 12px;
          border: 1px solid var(--border-color);
        }

        .story-section h3 {
          margin-bottom: 1rem;
          color: var(--text-primary);
          font-size: 1.125rem;
        }

        .story-section p {
          color: var(--text-secondary);
          line-height: 1.7;
          white-space: pre-line;
        }

        .next-project {
          margin-bottom: 2rem;
        }

        .next-project h3 {
          margin-bottom: 1.5rem;
          color: var(--text-primary);
        }

        .next-project-card {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 1.5rem;
          padding: 1.5rem;
          text-decoration: none;
          color: inherit;
          transition: transform 0.2s ease;
        }

        .next-project-card:hover {
          transform: translateY(-2px);
        }

        .next-project-image {
          width: 100%;
          height: 120px;
          border-radius: 8px;
          overflow: hidden;
        }

        .next-project-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .next-project-info h4 {
          margin-bottom: 0.5rem;
          transition: color 0.2s ease;
        }

        .next-project-card:hover .next-project-info h4 {
          color: var(--accent-purple);
        }

        .next-project-info p {
          color: var(--text-secondary);
          font-size: 0.875rem;
          line-height: 1.5;
          margin-bottom: 1rem;
        }

        .next-arrow {
          color: var(--accent-purple);
          font-size: 0.875rem;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .project-hero {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .project-image-large {
            height: 250px;
          }

          .project-links {
            flex-direction: column;
          }

          .story-sections {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .next-project-card {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .next-project-image {
            height: 150px;
          }
        }
      `}</style>
    </>
  )
} 