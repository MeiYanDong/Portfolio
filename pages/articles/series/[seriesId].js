import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Layers } from 'lucide-react'
import { getAllSeries, getArticlesBySeries, getSeriesById } from '../../../lib/articles'

function formatDate(date) {
  return date ? date.replaceAll('-', '.') : ''
}

function cleanArticle(article) {
  const { content, searchText, ...meta } = article
  return meta
}

export default function ArticleSeries({ series, articles }) {
  return (
    <>
      <Head>
        <title>{`${series.title} - 文章系列 - 梅炎栋`}</title>
        <meta name="description" content={series.summary} />
      </Head>

      <div className="container">
        <Link href="/articles" className="back-link">
          <ArrowLeft size={18} />
          返回文章
        </Link>

        <section className="series-hero">
          <div className="series-icon">
            <Layers size={26} />
          </div>
          <span>{series.status}</span>
          <h1>{series.title}</h1>
          <p>{series.summary}</p>

          <div className="series-topics">
            {series.topics.map((topic) => (
              <Link key={topic} href={`/articles?topic=${encodeURIComponent(topic)}`}>
                {topic}
              </Link>
            ))}
          </div>
        </section>

        <section className="series-content">
          <div className="series-summary">
            <span>阅读顺序</span>
            <h2>{articles.length} 篇文章</h2>
            <p>系列内按主题推进顺序排列；文章页和总入口仍默认按发布时间排序。</p>
          </div>

          <div className="series-timeline">
            {articles.map((article) => (
              <Link key={article.slug} href={`/articles/${article.slug}`} className="timeline-item">
                <div className="timeline-index">{article.seriesOrder || '-'}</div>
                <div className="timeline-content">
                  <div className="timeline-meta">
                    <span>{formatDate(article.date)}</span>
                    <span>{article.readingTime} 分钟</span>
                  </div>
                  <h2>{article.title}</h2>
                  <p>{article.summary}</p>
                  <div className="read-link">
                    阅读文章
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <style jsx>{`
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
        }

        .back-link:hover {
          color: var(--accent-purple);
        }

        .series-hero {
          padding: 2rem 0 2.5rem;
          border-bottom: 1px solid var(--border-color);
        }

        .series-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          margin-bottom: 1rem;
          color: var(--bg-primary);
          background: var(--accent-purple);
          border-radius: 8px;
        }

        .series-hero > span,
        .series-summary span {
          color: var(--accent-purple);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .series-hero h1 {
          max-width: 860px;
          margin: 0.35rem 0 1rem;
          font-size: clamp(2rem, 5vw, 4rem);
          letter-spacing: 0;
        }

        .series-hero p,
        .series-summary p,
        .timeline-content p {
          color: var(--text-secondary);
          line-height: 1.75;
        }

        .series-hero p {
          max-width: 760px;
          font-size: 1.05rem;
        }

        .series-topics {
          display: flex;
          flex-wrap: wrap;
          gap: 0.55rem;
          margin-top: 1rem;
        }

        .series-topics a {
          color: var(--accent-purple);
          background: rgba(179, 157, 219, 0.1);
          border: 1px solid rgba(179, 157, 219, 0.22);
          border-radius: 999px;
          padding: 0.25rem 0.75rem;
          font-size: 0.78rem;
        }

        .series-content {
          display: grid;
          grid-template-columns: 280px minmax(0, 1fr);
          gap: 3rem;
          padding-top: 2.5rem;
        }

        .series-summary {
          position: sticky;
          top: 96px;
          align-self: start;
        }

        .series-summary h2 {
          margin: 0.25rem 0 0.75rem;
          font-size: 1.4rem;
        }

        .series-timeline {
          display: grid;
          gap: 1rem;
        }

        .timeline-item {
          display: grid;
          grid-template-columns: 56px minmax(0, 1fr);
          gap: 1rem;
          color: inherit;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 1rem;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }

        .timeline-item:hover {
          border-color: var(--accent-purple);
          transform: translateY(-2px);
        }

        .timeline-index {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          color: var(--bg-primary);
          background: var(--accent-purple);
          border-radius: 8px;
          font-weight: 700;
        }

        .timeline-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          color: var(--text-secondary);
          font-size: 0.78rem;
          margin-bottom: 0.55rem;
        }

        .timeline-content h2 {
          margin: 0 0 0.5rem;
          color: var(--text-primary);
          font-size: 1.12rem;
          line-height: 1.35;
        }

        .timeline-content p {
          max-width: 720px;
          margin-bottom: 0.8rem;
          font-size: 0.92rem;
        }

        .read-link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          color: var(--accent-purple);
          font-size: 0.85rem;
          font-weight: 600;
        }

        @media (max-width: 860px) {
          .series-content {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .series-summary {
            position: static;
          }
        }

        @media (max-width: 620px) {
          .timeline-item {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: getAllSeries().map((series) => ({
      params: { seriesId: series.id }
    })),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const series = getSeriesById(params.seriesId)

  if (!series) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      series,
      articles: getArticlesBySeries(params.seriesId).map(cleanArticle)
    }
  }
}
