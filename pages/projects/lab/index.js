import Head from 'next/head'
import Link from 'next/link'
import projectsData from '../../../data/projects.json'
import { projectLayoutMethods } from '../../../data/lab/projectLayoutMethods'

const readyMethods = new Set(projectLayoutMethods.map((method) => method.id))

function pickProject(index) {
  return projectsData[index % projectsData.length]
}

function MethodPreview({ method, index }) {
  const primary = pickProject(index)
  const secondary = pickProject(index + 3)
  const tertiary = pickProject(index + 7)
  const compactSet = [primary, secondary, tertiary]
  const isReady = readyMethods.has(method.id)

  return (
    <article className="method-card">
      <div className="method-head">
        <span>{String(index + 1).padStart(2, '0')}</span>
        <div>
          <p>{method.family}</p>
          <h2>{method.title}</h2>
        </div>
      </div>
      <p className="principle">{method.principle}</p>
      <div className={`preview preview-${index % 6}`}>
        {index % 6 === 0 && (
          <>
            <div className="preview-hero">
              <span>{primary.category}</span>
              <strong>{primary.title}</strong>
              <p>{primary.resumeLine || primary.description}</p>
            </div>
            <div className="preview-proof">
              {(primary.stack || primary.tags || []).slice(0, 4).map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </>
        )}

        {index % 6 === 1 && (
          <>
            <div className="preview-index">
              {compactSet.map((project) => (
                <span key={project.id}>{project.title}</span>
              ))}
            </div>
            <div className="preview-detail">
              <strong>{primary.role || primary.category}</strong>
              <p>{primary.impact || primary.description}</p>
            </div>
          </>
        )}

        {index % 6 === 2 && (
          <div className="preview-grid">
            {compactSet.map((project) => (
              <div key={project.id}>
                <span>{project.year}</span>
                <strong>{project.title}</strong>
              </div>
            ))}
          </div>
        )}

        {index % 6 === 3 && (
          <div className="preview-ledger">
            {compactSet.map((project) => (
              <div key={project.id}>
                <span>{project.category}</span>
                <strong>{project.title}</strong>
                <p>{project.resumeLine || project.description}</p>
              </div>
            ))}
          </div>
        )}

        {index % 6 === 4 && (
          <div className="preview-matrix">
            <div>
              <span>Role</span>
              <strong>{primary.role || '个人项目'}</strong>
            </div>
            <div>
              <span>Impact</span>
              <strong>{primary.impact || primary.description}</strong>
            </div>
            <div>
              <span>Stack</span>
              <strong>{(primary.stack || primary.tags || []).slice(0, 3).join(' / ')}</strong>
            </div>
          </div>
        )}

        {index % 6 === 5 && (
          <div className="preview-strip">
            <span>{primary.tier}</span>
            <strong>{primary.title}</strong>
            <p>{primary.story?.result || primary.description}</p>
          </div>
        )}
      </div>
      <div className="method-foot">
        <span>{method.useWhen}</span>
        <small>{method.mapsTo.join(' / ')}</small>
        {isReady ? (
          <Link href={`/projects/lab/${method.id}`} className="prototype-link">
            打开完整原型
          </Link>
        ) : (
          <em>待完整落地</em>
        )}
      </div>
    </article>
  )
}

export default function ProjectLayoutLab() {
  return (
    <>
      <Head>
        <title>Project Layout LAB - 梅炎栋</title>
        <meta
          name="description"
          content={`项目展示布局 LAB，用真实项目数据预览 ${projectLayoutMethods.length} 种展示方法`}
        />
      </Head>

      <main className="lab-shell">
        <nav className="lab-nav">
          <Link href="/projects">返回项目页</Link>
          <span>Internal LAB</span>
        </nav>

        <header className="lab-header">
          <p>PROJECT LAYOUT LAB</p>
          <h1>{projectLayoutMethods.length} 种项目展示方法，全部用真实数据打样。</h1>
          <div className="lab-stats">
            <span>{projectLayoutMethods.length} methods</span>
            <span>{projectsData.length} projects</span>
            <span>hidden route</span>
          </div>
        </header>

        <section className="method-grid">
          {projectLayoutMethods.map((method, index) => (
            <MethodPreview key={method.id} method={method} index={index} />
          ))}
        </section>
      </main>

      <style jsx global>{`
        .lab-shell {
          min-height: 100vh;
          padding: 1.5rem;
          background: #050505;
          color: var(--text-primary);
        }

        .lab-nav {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          max-width: 1440px;
          margin: 0 auto;
          padding-bottom: 1.5rem;
          color: var(--text-secondary);
          font-size: 0.78rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .lab-header {
          max-width: 1440px;
          margin: 0 auto 2rem;
          padding: 3rem 0 2rem;
          border-top: 1px solid #2b2b2b;
          border-bottom: 1px solid #2b2b2b;
        }

        .lab-header p {
          margin-bottom: 0.75rem;
          color: var(--accent-purple);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.14em;
        }

        .lab-header h1 {
          max-width: 900px;
          margin-bottom: 1.5rem;
          font-size: 3rem;
          line-height: 1.05;
        }

        .lab-stats {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .lab-stats span {
          border: 1px solid #333;
          border-radius: 4px;
          padding: 0.4rem 0.65rem;
          color: var(--text-secondary);
          font-size: 0.78rem;
        }

        .method-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
          gap: 1rem;
          max-width: 1440px;
          margin: 0 auto;
        }

        .method-card {
          min-height: 520px;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          border: 1px solid #2b2b2b;
          border-radius: 8px;
          padding: 1rem;
          background: #101010;
        }

        .method-head {
          display: grid;
          grid-template-columns: 44px minmax(0, 1fr);
          gap: 0.85rem;
          align-items: start;
        }

        .method-head > span {
          color: var(--accent-purple);
          font-size: 1.35rem;
          font-weight: 700;
          line-height: 1;
        }

        .method-head p {
          margin-bottom: 0.35rem;
          color: var(--text-secondary);
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }

        .method-head h2 {
          margin-bottom: 0;
          font-size: 1.2rem;
        }

        .principle {
          max-width: none;
          min-height: 54px;
          margin-bottom: 0;
          color: var(--text-secondary);
          font-size: 0.88rem;
          line-height: 1.7;
        }

        .preview {
          min-height: 260px;
          display: flex;
          flex: 1;
          flex-direction: column;
          justify-content: space-between;
          border: 1px solid #282828;
          border-radius: 6px;
          padding: 1rem;
          background: #070707;
        }

        .preview-hero span,
        .preview-index span,
        .preview-ledger span,
        .preview-matrix span,
        .preview-strip span {
          display: block;
          margin-bottom: 0.35rem;
          color: var(--text-secondary);
          font-size: 0.72rem;
        }

        .preview strong {
          display: block;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
          line-height: 1.35;
        }

        .preview p {
          max-width: none;
          margin-bottom: 0;
          color: var(--text-secondary);
          font-size: 0.82rem;
          line-height: 1.6;
        }

        .preview-proof,
        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
        }

        .preview-proof span {
          border: 1px solid #333;
          border-radius: 4px;
          padding: 0.25rem 0.45rem;
          color: var(--text-secondary);
          font-size: 0.7rem;
        }

        .preview-index {
          display: grid;
          gap: 0.5rem;
        }

        .preview-index span {
          border-bottom: 1px solid #252525;
          padding-bottom: 0.5rem;
        }

        .preview-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          grid-auto-rows: 1fr;
          gap: 0.6rem;
          height: 100%;
        }

        .preview-grid div,
        .preview-ledger div,
        .preview-matrix div {
          border: 1px solid #292929;
          border-radius: 4px;
          padding: 0.75rem;
        }

        .preview-grid div:first-child {
          grid-row: span 2;
        }

        .preview-ledger,
        .preview-matrix {
          display: grid;
          gap: 0.6rem;
        }

        .preview-strip {
          margin: auto 0;
          border-left: 3px solid var(--accent-purple);
          padding-left: 1rem;
        }

        .method-foot {
          display: grid;
          gap: 0.5rem;
          color: var(--text-secondary);
          font-size: 0.76rem;
          line-height: 1.5;
        }

        .method-foot small {
          color: #777;
        }

        .method-foot em {
          color: #666;
          font-style: normal;
        }

        .prototype-link {
          display: inline-flex;
          width: fit-content;
          border: 1px solid var(--accent-purple);
          border-radius: 6px;
          padding: 0.45rem 0.7rem;
          color: var(--accent-purple);
          font-weight: 700;
        }

        @media (max-width: 620px) {
          .lab-shell {
            padding: 1rem;
          }

          .lab-header h1 {
            font-size: 2rem;
          }

          .method-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  )
}
