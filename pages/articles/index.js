import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { Grid2X2, List } from 'lucide-react'
import { getAllArticles, getAllSeries, getAllTopics } from '../../lib/articles'

function formatDate(date) {
  return date ? date.replaceAll('-', '.') : ''
}

function textPool(article) {
  return [
    article.title,
    article.summary,
    article.date,
    article.seriesTitle,
    ...(article.topics || []),
    ...(article.tags || [])
  ]
    .filter(Boolean)
    .join(' ')
}

function ArticleMeta({ article }) {
  return (
    <div className="article-meta">
      <span>{formatDate(article.date)}</span>
      <span>{article.readingTime} 分钟</span>
      {article.seriesTitle && <span>{article.seriesTitle}</span>}
    </div>
  )
}

function TopicTags({ topics, limit = 4 }) {
  return (
    <div className="article-topic-tags">
      {topics.slice(0, limit).map((topic) => (
        <span key={topic}>{topic}</span>
      ))}
    </div>
  )
}

function ArticleCard({ article, index }) {
  return (
    <Link href={`/articles/${article.slug}`} className="article-card">
      <span className="article-index">{String(index + 1).padStart(2, '0')}</span>
      <div>
        <ArticleMeta article={article} />
        <h2>{article.title}</h2>
        <p>{article.summary}</p>
      </div>
      <TopicTags topics={article.topics} />
    </Link>
  )
}

function ArticleRow({ article, index }) {
  return (
    <Link href={`/articles/${article.slug}`} className="article-row">
      <span>{String(index + 1).padStart(2, '0')}</span>
      <strong>{article.title}</strong>
      <p>{article.summary}</p>
      <em>
        {formatDate(article.date)} / {article.seriesTitle || article.topics[0] || '文章'}
      </em>
    </Link>
  )
}

export default function Articles({ articles, topics, series }) {
  const router = useRouter()
  const [selectedTopic, setSelectedTopic] = useState('全部')
  const [query, setQuery] = useState('')
  const [viewMode, setViewMode] = useState('list')

  const allTopics = useMemo(() => ['全部', ...topics], [topics])
  const normalizedQuery = query.trim().toLowerCase()

  useEffect(() => {
    const topic = typeof router.query.topic === 'string' ? router.query.topic : ''
    if (topic && allTopics.includes(topic) && topic !== selectedTopic) {
      setSelectedTopic(topic)
    }
  }, [allTopics, router.query.topic, selectedTopic])

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const topicMatched = selectedTopic === '全部' || article.topics.includes(selectedTopic)
      const queryMatched =
        !normalizedQuery ||
        article.searchText.includes(normalizedQuery) ||
        textPool(article).toLowerCase().includes(normalizedQuery)
      return topicMatched && queryMatched
    })
  }, [articles, normalizedQuery, selectedTopic])

  const visibleSeries = useMemo(() => {
    return series.filter((seriesItem) => {
      const seriesArticles = articles.filter((article) => article.seriesId === seriesItem.id)
      const topicMatched =
        selectedTopic === '全部' ||
        seriesItem.topics.includes(selectedTopic) ||
        seriesArticles.some((article) => article.topics.includes(selectedTopic))
      const queryMatched =
        !normalizedQuery ||
        seriesItem.searchText.includes(normalizedQuery) ||
        seriesArticles.some((article) => article.searchText.includes(normalizedQuery))

      return topicMatched && queryMatched
    })
  }, [articles, normalizedQuery, selectedTopic, series])

  const topicStats = useMemo(
    () =>
      topics
        .map((topic) => ({
          topic,
          count: articles.filter((article) => article.topics.includes(topic)).length
        }))
        .filter((item) => item.count > 0),
    [articles, topics]
  )
  const maxTopic = Math.max(1, ...topicStats.map((item) => item.count))

  return (
    <>
      <Head>
        <title>文章 - 梅炎栋</title>
        <meta name="description" content="梅炎栋的文章系统，支持主题筛选、全文搜索、列表和网格展示。" />
      </Head>

      <main className="articles-ledger-shell">
        <section className="articles-ledger-hero">
          <div className="articles-hero-copy">
            <p className="articles-kicker">阅读路径</p>
            <h1>文章系统</h1>
            <p>这里收纳长期笔记、工具方法和系列文章。文章不是归档，每一篇都保留主题、时间和所属系列，方便从问题进入阅读。</p>
          </div>
          <aside className="articles-result-card">
            <strong>{filteredArticles.length}</strong>
            <span>当前结果</span>
            <small>{selectedTopic === '全部' ? '全部主题' : selectedTopic}</small>
          </aside>
        </section>

        <section className="articles-topic-bars" aria-label="全部文章主题分布">
          {topicStats.map((item) => (
            <div key={item.topic}>
              <span>{item.topic}</span>
              <i style={{ width: `${Math.max(12, (item.count / maxTopic) * 100)}%` }} />
              <em>{item.count}</em>
            </div>
          ))}
        </section>

        {series.length > 0 && (
          <section className="articles-series-strip" aria-label="文章系列">
            <div className="articles-section-title">
              <span>阅读路径</span>
              <strong>{visibleSeries.length} 个系列</strong>
            </div>
            <div className="articles-series-grid">
              {visibleSeries.length > 0 ? (
                visibleSeries.map((seriesItem) => (
                  <Link key={seriesItem.id} href={`/articles/series/${seriesItem.id}`} className="series-card">
                    <div className="series-card-top">
                      <span>{seriesItem.status}</span>
                      <span>{seriesItem.articleCount} 篇</span>
                    </div>
                    <h2>{seriesItem.title}</h2>
                    <p>{seriesItem.summary}</p>
                    <small>更新于 {formatDate(seriesItem.lastUpdated)}</small>
                  </Link>
                ))
              ) : (
                <p className="articles-empty">当前筛选下没有匹配系列。</p>
              )}
            </div>
          </section>
        )}

        <section className="articles-toolrow">
          <div className="articles-theme-title">
            <span>主题</span>
            <strong>{selectedTopic}</strong>
            <small>{filteredArticles.length} 篇文章</small>
          </div>
          <div className="articles-view-switch" aria-label="展示方式切换">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'active' : ''}
              aria-label="网格展示"
              title="网格展示"
            >
              <Grid2X2 size={17} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'active' : ''}
              aria-label="列表展示"
              title="列表展示"
            >
              <List size={17} />
            </button>
          </div>
        </section>

        <section className="articles-filterbar">
          <div className="articles-topic-tabs" aria-label="主题筛选">
            {allTopics.map((topic) => (
              <button
                type="button"
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={selectedTopic === topic ? 'active' : ''}
              >
                {topic === '全部' ? '全部主题' : topic}
              </button>
            ))}
          </div>
          <div className="articles-search">
            <label htmlFor="article-search" className="articles-search-label">内容搜索</label>
            <input
              id="article-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索标题、摘要、主题、正文..."
            />
          </div>
        </section>

        {filteredArticles.length === 0 ? (
          <p className="articles-empty">没有匹配文章，换一个主题或关键词。</p>
        ) : viewMode === 'grid' ? (
          <section className="articles-grid">
            {filteredArticles.map((article, index) => (
              <ArticleCard key={article.slug} article={article} index={index} />
            ))}
          </section>
        ) : (
          <section className="articles-list">
            {filteredArticles.map((article, index) => (
              <ArticleRow key={article.slug} article={article} index={index} />
            ))}
          </section>
        )}
      </main>

      <style jsx global>{`
        .articles-ledger-shell {
          width: 100%;
          max-width: 1480px;
          margin: 0 auto;
          padding: 0 1.5rem 5rem;
          overflow-x: clip;
        }

        .articles-ledger-hero {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 270px;
          gap: 3rem;
          align-items: end;
          padding: 4rem 0 3rem;
          border-bottom: 1px solid var(--border-color);
        }

        .articles-kicker {
          margin-bottom: 0.75rem;
          color: var(--accent-purple);
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0;
        }

        .articles-hero-copy h1 {
          max-width: 980px;
          margin-bottom: 1.25rem;
          font-size: 4.1rem;
          line-height: 0.98;
          overflow-wrap: anywhere;
          word-break: break-all;
        }

        .articles-hero-copy p:last-child {
          max-width: 820px;
          color: var(--text-secondary);
          font-size: 1.05rem;
          line-height: 1.85;
          overflow-wrap: anywhere;
          word-break: break-all;
        }

        .articles-result-card {
          display: grid;
          gap: 0.45rem;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 1rem;
          background: var(--bg-card);
        }

        .articles-result-card strong {
          color: var(--text-primary);
          font-size: 2.15rem;
          line-height: 1.08;
        }

        .articles-result-card span,
        .articles-result-card small {
          color: var(--text-secondary);
          font-size: 0.78rem;
        }

        .articles-topic-bars {
          display: grid;
          gap: 0.65rem;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 1rem;
          margin: 1rem 0 0;
          background: var(--bg-card);
        }

        .articles-topic-bars div {
          display: grid;
          grid-template-columns: 220px minmax(0, 1fr) 42px;
          gap: 1rem;
          align-items: center;
        }

        .articles-topic-bars i {
          display: block;
          height: 9px;
          border-radius: 999px;
          background: var(--accent-purple);
        }

        .articles-topic-bars span,
        .articles-topic-bars em {
          color: var(--text-secondary);
          font-style: normal;
        }

        .articles-series-strip {
          display: grid;
          gap: 0.75rem;
          margin-top: 1rem;
          padding-bottom: 0.25rem;
        }

        .articles-section-title,
        .articles-theme-title {
          min-width: 0;
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 0.55rem;
        }

        .articles-section-title span,
        .articles-theme-title span {
          color: var(--accent-purple);
          font-size: 0.72rem;
          font-weight: 800;
        }

        .articles-section-title strong,
        .articles-theme-title strong {
          color: var(--text-primary);
          font-size: 1.12rem;
          line-height: 1.2;
        }

        .articles-theme-title small {
          color: var(--text-secondary);
          font-size: 0.78rem;
        }

        .articles-series-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 0.85rem;
        }

        .series-card {
          min-height: 150px;
          display: grid;
          align-content: space-between;
          gap: 0.85rem;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 1rem;
          background: var(--bg-card);
          color: inherit;
          text-decoration: none;
          transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease;
        }

        .series-card:hover {
          transform: translateY(-3px);
          border-color: var(--accent-purple);
          background: #202020;
        }

        .series-card-top,
        .article-meta,
        .article-topic-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
        }

        .series-card-top span,
        .article-meta span,
        .article-topic-tags span {
          border: 1px solid var(--border-color);
          border-radius: 4px;
          padding: 0.26rem 0.48rem;
          color: var(--text-secondary);
          font-size: 0.72rem;
        }

        .series-card h2 {
          margin: 0;
          color: var(--text-primary);
          font-size: 1.35rem;
        }

        .series-card p,
        .series-card small {
          max-width: none;
          margin: 0;
          color: var(--text-secondary);
          overflow-wrap: anywhere;
        }

        .articles-toolrow {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-top: 1.5rem;
          margin-bottom: 0.7rem;
        }

        .articles-view-switch {
          display: inline-flex;
          width: fit-content;
          max-width: 100%;
          align-items: center;
          gap: 0.18rem;
          border: 1px solid var(--border-color);
          border-radius: 999px;
          padding: 0.18rem;
          background: var(--bg-card);
        }

        .articles-view-switch button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          border: 0;
          border-radius: 999px;
          padding: 0;
          background: transparent;
          color: var(--text-secondary);
          cursor: pointer;
        }

        .articles-view-switch button svg {
          display: block;
        }

        .articles-view-switch button.active {
          background: rgba(179, 157, 219, 0.13);
          color: var(--accent-purple);
        }

        .articles-filterbar {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(260px, 360px);
          gap: 1rem;
          align-items: start;
          margin-bottom: 0.85rem;
        }

        .articles-topic-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          align-content: start;
        }

        .articles-topic-tabs button {
          border: 1px solid var(--border-color);
          border-radius: 999px;
          padding: 0.55rem 0.75rem;
          background: transparent;
          color: var(--text-secondary);
          font: inherit;
          font-size: 0.82rem;
          cursor: pointer;
        }

        .articles-topic-tabs button.active {
          border-color: var(--accent-purple);
          background: rgba(179, 157, 219, 0.1);
          color: var(--accent-purple);
        }

        .articles-search {
          display: block;
          justify-self: end;
          width: min(100%, 360px);
        }

        .articles-search-label {
          position: absolute;
          width: 1px;
          height: 1px;
          overflow: hidden;
          clip: rect(0 0 0 0);
          white-space: nowrap;
        }

        .articles-search input {
          width: 100%;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          padding: 0.85rem 0.9rem;
          background: #080808;
          color: var(--text-primary);
          font: inherit;
          outline: none;
        }

        .articles-search input:focus {
          border-color: var(--accent-purple);
        }

        .articles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 0.85rem;
          padding-bottom: 5rem;
        }

        .article-card {
          min-height: 260px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 1rem;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 1rem;
          background: var(--bg-card);
          color: inherit;
          text-decoration: none;
          transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease;
        }

        .article-card:hover {
          transform: translateY(-4px);
          border-color: var(--accent-purple);
          background: #202020;
        }

        .article-index {
          color: var(--accent-purple);
          font-size: 1.1rem;
          font-weight: 800;
        }

        .article-meta {
          margin-bottom: 1rem;
        }

        .article-card h2 {
          margin-bottom: 0.75rem;
          font-size: 1.5rem;
        }

        .article-card p,
        .articles-empty,
        .article-row p {
          max-width: none;
          color: var(--text-secondary);
          line-height: 1.7;
          overflow-wrap: anywhere;
          word-break: break-all;
        }

        .articles-list {
          display: grid;
          gap: 0;
          padding-bottom: 5rem;
        }

        .article-row {
          display: grid;
          grid-template-columns: 58px minmax(210px, 0.4fr) minmax(0, 1fr) minmax(180px, 0.32fr);
          gap: 1rem;
          align-items: start;
          border-top: 1px solid var(--border-color);
          padding: 1.2rem 0;
          background: transparent;
          color: inherit;
          text-decoration: none;
          transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease;
        }

        .article-row:hover {
          transform: translateX(8px);
          border-color: var(--accent-purple);
          background: rgba(179, 157, 219, 0.05);
        }

        .article-row:hover strong {
          color: var(--accent-purple);
        }

        .article-row > span,
        .article-row em {
          color: var(--accent-purple);
          font-style: normal;
          font-weight: 800;
        }

        .article-row strong {
          color: var(--text-primary);
          transition: color 0.2s ease;
        }

        .article-row p {
          margin-bottom: 0;
        }

        .article-row em {
          font-size: 0.78rem;
        }

        .articles-empty {
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 1.2rem;
          margin-bottom: 1rem;
          background: var(--bg-card);
        }

        @media (max-width: 1080px) {
          .articles-ledger-hero,
          .articles-filterbar {
            grid-template-columns: 1fr;
          }

          .articles-toolrow {
            flex-wrap: wrap;
          }

          .articles-view-switch {
            margin-left: auto;
          }

          .articles-search {
            justify-self: stretch;
            width: 100%;
          }

          .article-row {
            grid-template-columns: 46px minmax(180px, 0.5fr) minmax(0, 1fr);
          }

          .article-row em {
            grid-column: 2 / -1;
          }
        }

        @media (max-width: 760px) {
          .articles-ledger-shell {
            padding: 0 1rem 4rem;
          }

          .articles-ledger-hero {
            padding-top: 3rem;
          }

          .articles-hero-copy h1 {
            font-size: 2.25rem;
            line-height: 1.08;
          }

          .articles-topic-bars div {
            grid-template-columns: 96px minmax(0, 1fr) 32px;
            gap: 0.75rem;
          }

          .articles-topic-bars i {
            max-width: 100%;
            justify-self: stretch;
          }

          .article-row {
            grid-template-columns: 38px minmax(0, 1fr);
            gap: 0.75rem;
          }

          .article-row p,
          .article-row em {
            grid-column: 2 / -1;
          }
        }
      `}</style>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      articles: getAllArticles(),
      topics: getAllTopics(),
      series: getAllSeries()
    }
  }
}
