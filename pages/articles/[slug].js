import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Clock, Layers } from 'lucide-react'
import {
  getAllArticles,
  getArticleBySlug,
  getArticlesBySeries,
  getSeriesById,
  markdownToHtml
} from '../../lib/articles'

function formatDate(date) {
  return date ? date.replaceAll('-', '.') : ''
}

function cleanArticle(article) {
  const { content, searchText, ...meta } = article
  return meta
}

export default function ArticleDetail({ article, html, series, seriesArticles, previousArticle, nextArticle }) {
  return (
    <>
      <Head>
        <title>{`${article.title} - 梅炎栋`}</title>
        <meta name="description" content={article.summary} />
      </Head>

      <div className="container">
        <Link href="/articles" className="back-link">
          <ArrowLeft size={18} />
          返回文章
        </Link>

        <article className="article-page">
          <header className="article-header">
            <div className="article-meta">
              <span>{formatDate(article.date)}</span>
              <span>
                <Clock size={15} />
                {article.readingTime} 分钟
              </span>
              {article.seriesTitle && <span>{article.seriesTitle}</span>}
            </div>

            <h1>{article.title}</h1>
            <p>{article.summary}</p>

            <div className="topic-tags">
              {article.topics.map((topic) => (
                <Link key={topic} href={`/articles?topic=${encodeURIComponent(topic)}`}>
                  {topic}
                </Link>
              ))}
            </div>
          </header>

          {article.cover && (
            <div className="article-cover">
              <img src={article.cover} alt={article.title} />
            </div>
          )}

          <div className="reader-layout">
            <div className="article-body" dangerouslySetInnerHTML={{ __html: html }} />

            {series && (
              <aside className="series-toc">
                <div className="toc-heading">
                  <Layers size={18} />
                  <div>
                    <span>系列</span>
                    <h2>{series.title}</h2>
                  </div>
                </div>

                <div className="toc-list">
                  {seriesArticles.map((seriesArticle) => (
                    <Link
                      key={seriesArticle.slug}
                      href={`/articles/${seriesArticle.slug}`}
                      className={seriesArticle.slug === article.slug ? 'active' : ''}
                    >
                      <span>第 {seriesArticle.seriesOrder} 篇</span>
                      {seriesArticle.title}
                    </Link>
                  ))}
                </div>
              </aside>
            )}
          </div>

          {(previousArticle || nextArticle) && (
            <nav className="series-nav" aria-label="系列文章导航">
              {previousArticle ? (
                <Link href={`/articles/${previousArticle.slug}`} className="series-nav-card">
                  <span>上一篇</span>
                  <strong>{previousArticle.title}</strong>
                </Link>
              ) : (
                <div />
              )}

              {nextArticle ? (
                <Link href={`/articles/${nextArticle.slug}`} className="series-nav-card next">
                  <span>下一篇</span>
                  <strong>{nextArticle.title}</strong>
                  <ArrowRight size={18} />
                </Link>
              ) : (
                <div />
              )}
            </nav>
          )}
        </article>
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

        .article-page {
          max-width: 1120px;
          margin: 0 auto;
        }

        .article-header {
          padding: 1rem 0 2rem;
          border-bottom: 1px solid var(--border-color);
        }

        .article-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          color: var(--text-secondary);
          font-size: 0.86rem;
          margin-bottom: 1rem;
        }

        .article-meta span {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }

        .article-header h1 {
          max-width: 860px;
          margin: 0 0 1rem;
          font-size: clamp(2rem, 5vw, 4rem);
          letter-spacing: 0;
        }

        .article-header p {
          color: var(--text-secondary);
          font-size: 1.05rem;
          max-width: 760px;
        }

        .topic-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.55rem;
          margin-top: 1rem;
        }

        .topic-tags a {
          color: var(--accent-purple);
          background: rgba(179, 157, 219, 0.1);
          border: 1px solid rgba(179, 157, 219, 0.22);
          border-radius: 999px;
          padding: 0.25rem 0.75rem;
          font-size: 0.78rem;
        }

        .article-cover {
          height: clamp(220px, 36vw, 420px);
          margin: 2rem 0;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          overflow: hidden;
          background: var(--bg-card);
        }

        .article-cover img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .reader-layout {
          display: grid;
          grid-template-columns: minmax(0, 760px) 280px;
          gap: 3rem;
          align-items: start;
        }

        .article-body {
          min-width: 0;
        }

        .series-toc {
          position: sticky;
          top: 96px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 1rem;
        }

        .toc-heading {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1rem;
          color: var(--accent-purple);
        }

        .toc-heading span {
          color: var(--accent-purple);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .toc-heading h2 {
          margin: 0.1rem 0 0;
          color: var(--text-primary);
          font-size: 1rem;
          line-height: 1.35;
        }

        .toc-list {
          display: grid;
          gap: 0.5rem;
        }

        .toc-list a {
          display: grid;
          gap: 0.15rem;
          color: var(--text-secondary);
          border: 1px solid transparent;
          border-radius: 6px;
          padding: 0.6rem;
          font-size: 0.88rem;
          line-height: 1.45;
        }

        .toc-list a span {
          color: var(--text-secondary);
          font-size: 0.72rem;
        }

        .toc-list a.active,
        .toc-list a:hover {
          color: var(--text-primary);
          border-color: var(--accent-purple);
          background: rgba(179, 157, 219, 0.08);
        }

        .series-nav {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1rem;
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid var(--border-color);
        }

        .series-nav-card {
          display: grid;
          gap: 0.35rem;
          color: inherit;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 1rem;
        }

        .series-nav-card:hover {
          border-color: var(--accent-purple);
        }

        .series-nav-card.next {
          justify-items: end;
          text-align: right;
        }

        .series-nav-card span {
          color: var(--text-secondary);
          font-size: 0.78rem;
        }

        .series-nav-card strong {
          color: var(--text-primary);
          font-size: 0.96rem;
          line-height: 1.45;
        }

        :global(.article-body h1),
        :global(.article-body h2),
        :global(.article-body h3) {
          margin: 2rem 0 0.85rem;
          color: var(--text-primary);
          line-height: 1.3;
        }

        :global(.article-body h1) {
          font-size: 2rem;
        }

        :global(.article-body h2) {
          font-size: 1.5rem;
        }

        :global(.article-body h3) {
          font-size: 1.15rem;
        }

        :global(.article-body p),
        :global(.article-body li),
        :global(.article-body blockquote) {
          color: var(--text-secondary);
          font-size: 1rem;
          line-height: 1.9;
        }

        :global(.article-body p) {
          max-width: 760px;
          margin-bottom: 1rem;
        }

        :global(.article-body a) {
          overflow-wrap: anywhere;
        }

        :global(.article-body ul),
        :global(.article-body ol) {
          margin: 0 0 1.2rem 1.35rem;
        }

        :global(.article-body li) {
          padding-left: 0.25rem;
          margin-bottom: 0.35rem;
        }

        :global(.article-body blockquote) {
          border-left: 3px solid var(--accent-purple);
          background: rgba(179, 157, 219, 0.08);
          margin: 1.5rem 0;
          padding: 0.85rem 1rem;
        }

        :global(.article-body figure) {
          margin: 2rem 0;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          overflow: hidden;
          background: var(--bg-card);
        }

        :global(.article-body figure img) {
          display: block;
          width: 100%;
          height: auto;
        }

        :global(.article-body figcaption) {
          color: var(--text-secondary);
          font-size: 0.82rem;
          padding: 0.7rem 0.9rem;
          border-top: 1px solid var(--border-color);
        }

        :global(.article-body code) {
          color: var(--accent-purple);
          background: rgba(179, 157, 219, 0.1);
          border: 1px solid rgba(179, 157, 219, 0.2);
          border-radius: 4px;
          padding: 0.1rem 0.3rem;
          font-size: 0.92em;
        }

        :global(.article-body pre) {
          overflow-x: auto;
          background: #111;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 1rem;
          margin: 1.5rem 0;
        }

        :global(.article-body pre code) {
          color: var(--text-primary);
          background: transparent;
          border: 0;
          padding: 0;
        }

        @media (max-width: 960px) {
          .reader-layout {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .series-toc {
            position: static;
          }
        }

        @media (max-width: 720px) {
          .series-nav {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: getAllArticles().map((article) => ({
      params: { slug: article.slug }
    })),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const article = getArticleBySlug(params.slug)

  if (!article) {
    return {
      notFound: true
    }
  }

  const series = article.seriesId ? getSeriesById(article.seriesId) : null
  const seriesArticles = article.seriesId ? getArticlesBySeries(article.seriesId) : []
  const currentIndex = seriesArticles.findIndex((seriesArticle) => seriesArticle.slug === article.slug)
  const previousArticle = currentIndex > 0 ? seriesArticles[currentIndex - 1] : null
  const nextArticle = currentIndex > -1 ? seriesArticles[currentIndex + 1] || null : null

  return {
    props: {
      article: cleanArticle(article),
      html: markdownToHtml(article.content, article.slug),
      series,
      seriesArticles: seriesArticles.map(cleanArticle),
      previousArticle: previousArticle ? cleanArticle(previousArticle) : null,
      nextArticle: nextArticle ? cleanArticle(nextArticle) : null
    }
  }
}
