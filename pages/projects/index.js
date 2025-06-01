import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import projectsData from '../../data/projects.json'

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('全部')
  
  // 获取所有分类
  const categories = ['全部', ...new Set(projectsData.map(project => project.category))]
  
  // 根据选择的分类过滤项目
  const filteredProjects = selectedCategory === '全部' 
    ? projectsData 
    : projectsData.filter(project => project.category === selectedCategory)

  return (
    <>
      <Head>
        <title>项目作品 - 梅炎栋</title>
        <meta name="description" content="查看梅炎栋的所有项目作品和技术实践" />
      </Head>

      <div className="container">
        <section className="projects-header">
          <h1>我的项目</h1>
          <p>探索技术与生活的完美结合，每个项目都是成长路上的印记。</p>
        </section>

        {/* 分类过滤 */}
        <section className="filter-section">
          <div className="filter-chips">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-chip ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* 项目网格 */}
        <section className="projects-grid-section">
          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <Link 
                key={project.id} 
                href={`/projects/${project.id}`} 
                className="project-card card"
              >
                <div className="project-image">
                  <img src={project.cover} alt={project.title} />
                  <div className="project-overlay">
                    <span className="view-project">查看详情</span>
                  </div>
                </div>
                <div className="project-info">
                  <div className="project-header">
                    <h3>{project.title}</h3>
                    <span className="project-year">{project.year}</span>
                  </div>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <style jsx>{`
        .projects-header {
          text-align: center;
          padding: 2rem 0 3rem;
        }

        .projects-header h1 {
          margin-bottom: 1rem;
          background: linear-gradient(135deg, var(--text-primary), var(--accent-purple));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .projects-header p {
          color: var(--text-secondary);
          font-size: 1.125rem;
          max-width: 600px;
          margin: 0 auto;
        }

        .filter-section {
          margin-bottom: 3rem;
        }

        .filter-chips {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .filter-chip {
          padding: 0.5rem 1.25rem;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 25px;
          color: var(--text-secondary);
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-chip:hover {
          border-color: var(--accent-purple);
          color: var(--accent-purple);
        }

        .filter-chip.active {
          background: var(--accent-purple);
          border-color: var(--accent-purple);
          color: var(--bg-primary);
        }

        .projects-grid-section {
          margin-bottom: 4rem;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2.5rem;
        }

        .project-card {
          padding: 0;
          overflow: hidden;
          cursor: pointer;
          text-decoration: none;
          color: inherit;
          position: relative;
        }

        .project-image {
          width: 100%;
          height: 220px;
          position: relative;
          overflow: hidden;
        }

        .project-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .project-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(179, 157, 219, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .view-project {
          color: var(--bg-primary);
          font-weight: 600;
          font-size: 0.875rem;
          letter-spacing: 0.5px;
        }

        .project-card:hover .project-overlay {
          opacity: 1;
        }

        .project-card:hover .project-image img {
          transform: scale(1.05);
        }

        .project-info {
          padding: 1.5rem;
        }

        .project-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.75rem;
        }

        .project-header h3 {
          margin: 0;
          transition: color 0.2s ease;
        }

        .project-year {
          font-size: 0.75rem;
          color: var(--text-secondary);
          background: var(--bg-primary);
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          border: 1px solid var(--border-color);
        }

        .project-card:hover .project-header h3 {
          color: var(--accent-purple);
        }

        .project-description {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tag {
          font-size: 0.75rem;
          color: var(--accent-purple);
          background: rgba(179, 157, 219, 0.1);
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          border: 1px solid rgba(179, 157, 219, 0.2);
        }

        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .filter-chips {
            gap: 0.75rem;
          }

          .filter-chip {
            font-size: 0.8rem;
            padding: 0.4rem 1rem;
          }

          .project-header {
            flex-direction: column;
            gap: 0.5rem;
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