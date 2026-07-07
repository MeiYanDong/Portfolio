import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { BookOpen, Grid2X2, Layers, List, Search } from 'lucide-react'
import { getAllArticles, getAllSeries, getAllTopics } from '../../lib/articles'

function formatDate(date) {
  return date ? date.replaceAll('-', '.') : ''
}

function ArticleCard({ article, viewMode }) {
  return (
    <Link href={`/articles/${article.slug}`} className={`article-card ${viewMode}`}>
      {article.cover && (
        <div className="article-cover">
          <img src={article.cover} alt={article.title} />
        </div>
      )}

      <div className="article-card-content">
        <div className="article-meta">
          <span>{formatDate(article.date)}</span>
          <span>{article.readingTime} 分钟</span>
          {article.seriesTitle && <span>{article.seriesTitle}</span>}
        </div>

        <h2>{article.title}</h2>
        <p>{article.summary}</p>

        <div className="topic-tags">
          {article.topics.map((topic) => (
            <span key={topic}>{topic}</span>
          ))}
        </div>
      </div>
    </Link>
  )
}

export default function Articles({ articles, topics, series }) {
  const router = useRouter()
  const [selectedTopic, setSelectedTopic] = useState('全部')
  const [query, setQuery] = useState('')
  const [viewMode, setViewMode] = useState('list')

  const normalizedQuery = query.trim().toLowerCase()
  const allTopics = useMemo(() => ['全部', ...topics], [topics])

  useEffect(() => {
    const topic = typeof router.query.topic === 'string' ? router.query.topic : ''
    if (topic && allTopics.includes(topic) && topic !== selectedTopic) {
      setSelectedTopic(topic)
    }
  }, [allTopics, router.query.topic, selectedTopic])

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const topicMatched = selectedTopic === '全部' || article.topics.includes(selectedTopic)
      const queryMatched = !normalizedQuery || article.searchText.includes(normalizedQuery)
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

  return (
    <>
      <Head>
        <title>文章 - 梅炎栋</title>
        <meta name="description" content="梅炎栋的文章系统，支持主题筛选、全文搜索、列表和网格展示。" />
      </Head>

      <div className="container">
        <section className="articles-hero">
          <span className="eyebrow">Writing System</span>
          <h1>文章</h1>
          <p>把零散思考、工具方法和长期系列放在一个可检索、可筛选、可持续扩展的内容系统里。</p>

          <div className="article-stats">
            <div>
              <strong>{articles.length}</strong>
              <span>篇文章</span>
            </div>
            <div>
              <strong>{series.length}</strong>
              <span>个系列</span>
            </div>
            <div>
              <strong>{topics.length}</strong>
              <span>个主题</span>
            </div>
          </div>
        </section>

        <section className="article-controls" aria-label="文章筛选和搜索">
          <div className="search-box">
            <Search size={18} />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索标题、摘要、主题、标签或正文"
            />
          </div>

          <div className="view-toggle" aria-label="切换展示方式">
            <button
              type="button"
              className={viewMode === 'list' ? 'active' : ''}
              onClick={() => setViewMode('list')}
              aria-label="列表展示"
              title="列表展示"
            >
              <List size={18} />
            </button>
            <button
              type="button"
              className={viewMode === 'grid' ? 'active' : ''}
              onClick={() => setViewMode('grid')}
              aria-label="网格展示"
              title="网格展示"
            >
              <Grid2X2 size={18} />
            </button>
          </div>
        </section>

        <section className="topic-filter" aria-label="主题筛选">
          {allTopics.map((topic) => (
            <button
              type="button"
              key={topic}
              className={selectedTopic === topic ? 'active' : ''}
              onClick={() => setSelectedTopic(topic)}
            >
              {topic}
            </button>
          ))}
        </section>

        <div className="articles-layout">
          <section className="article-results">
            <div className="result-heading">
              <div>
                <span>按时间排序</span>
                <h2>{filteredArticles.length} 篇文章</h2>
              </div>
              <BookOpen size={22} />
            </div>

            {filteredArticles.length > 0 ? (
              <div className={viewMode === 'grid' ? 'article-grid' : 'article-list'}>
                {filteredArticles.map((article) => (
                  <ArticleCard key={article.slug} article={article} viewMode={viewMode} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <h3>没有匹配的文章</h3>
                <p>换一个关键词，或者切回全部主题。</p>
              </div>
            )}
          </section>

          <aside className="series-panel">
            <div className="panel-title">
              <Layers size={20} />
              <div>
                <span>阅读路径</span>
                <h2>系列</h2>
              </div>
            </div>

            <div className="series-list">
              {visibleSeries.length > 0 ? (
                visibleSeries.map((seriesItem) => (
                  <Link key={seriesItem.id} href={`/articles/series/${seriesItem.id}`} className="series-card">
                    <div className="series-card-top">
                      <span>{seriesItem.status}</span>
                      <span>{seriesItem.articleCount} 篇</span>
                    </div>
                    <h3>{seriesItem.title}</h3>
                    <p>{seriesItem.summary}</p>
                    <div className="series-meta">更新于 {formatDate(seriesItem.lastUpdated)}</div>
                  </Link>
                ))
              ) : (
                <div className="empty-series">当前筛选下没有系列。</div>
              )}
            </div>
          </aside>
        </div>
      </div>

      <style jsx>{`
        .articles-hero {
          padding: 2rem 0 2.5rem;
          border-bottom: 1px solid var(--border-color);
        }

        .eyebrow,
        .result-heading span,
        .panel-title span {
          color: var(--accent-purple);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .articles-hero h1 {
          margin: 0.4rem 0 1rem;
          font-size: clamp(2.25rem, 5vw, 4.5rem);
          letter-spacing: 0;
        }

        .articles-hero p {
          color: var(--text-secondary);
          font-size: 1.05rem;
          max-width: 720px;
        }

        .article-stats {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 140px));
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .article-stats div {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 0.8rem 1rem;
        }

        .article-stats strong {
          display: block;
          color: var(--text-primary);
          font-size: 1.45rem;
          line-height: 1;
        }

        .article-stats span {
          color: var(--text-secondary);
          font-size: 0.8rem;
        }

        .article-controls {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 1rem;
          margin: 2rem 0 1rem;
        }

        .search-box {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          min-height: 48px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 0 1rem;
          color: var(--text-secondary);
        }

        .search-box:focus-within {
          border-color: var(--accent-purple);
        }

        .search-box input {
          width: 100%;
          background: transparent;
          border: 0;
          outline: 0;
          color: var(--text-primary);
          font: inherit;
        }

        .search-box input::placeholder {
          color: var(--text-secondary);
        }

        .view-toggle {
          display: grid;
          grid-template-columns: repeat(2, 44px);
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          overflow: hidden;
        }

        .view-toggle button,
        .topic-filter button {
          border: 0;
          color: var(--text-secondary);
          background: transparent;
          cursor: pointer;
          font: inherit;
          transition: color 0.2s ease, background 0.2s ease;
        }

        .view-toggle button {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .view-toggle button.active,
        .view-toggle button:hover {
          color: var(--bg-primary);
          background: var(--accent-purple);
        }

        .topic-filter {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 2.5rem;
        }

        .topic-filter button {
          min-height: 36px;
          border: 1px solid var(--border-color);
          border-radius: 999px;
          padding: 0 1rem;
          background: var(--bg-card);
        }

        .topic-filter button.active,
        .topic-filter button:hover {
          border-color: var(--accent-purple);
          color: var(--bg-primary);
          background: var(--accent-purple);
        }

        .articles-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 320px;
          gap: 2rem;
          align-items: start;
        }

        .result-heading,
        .panel-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .result-heading h2,
        .panel-title h2 {
          margin: 0.1rem 0 0;
          font-size: 1.4rem;
        }

        .article-list,
        .article-grid,
        .series-list {
          display: grid;
          gap: 1rem;
        }

        .article-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        :global(.article-card) {
          display: grid;
          color: inherit;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          overflow: hidden;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }

        :global(.article-card:hover) {
          border-color: var(--accent-purple);
          transform: translateY(-2px);
        }

        :global(.article-card.list) {
          grid-template-columns: 176px minmax(0, 1fr);
          min-height: 156px;
        }

        :global(.article-card.grid) {
          grid-template-rows: 140px minmax(0, 1fr);
        }

        :global(.article-cover) {
          background: #111;
          overflow: hidden;
        }

        :global(.article-cover img) {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        :global(.article-card-content) {
          padding: 1.1rem;
        }

        :global(.article-meta) {
          display: flex;
          flex-wrap: wrap;
          gap: 0.55rem;
          color: var(--text-secondary);
          font-size: 0.78rem;
          margin-bottom: 0.65rem;
        }

        :global(.article-meta span:not(:last-child)::after) {
          content: '/';
          margin-left: 0.55rem;
          color: var(--border-color);
        }

        :global(.article-card h2) {
          margin: 0 0 0.55rem;
          color: var(--text-primary);
          font-size: 1.1rem;
          line-height: 1.35;
        }

        :global(.article-card p) {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.65;
          margin-bottom: 0.9rem;
          max-width: none;
        }

        :global(.topic-tags) {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
        }

        :global(.topic-tags span) {
          color: var(--accent-purple);
          background: rgba(179, 157, 219, 0.1);
          border: 1px solid rgba(179, 157, 219, 0.2);
          border-radius: 999px;
          padding: 0.15rem 0.6rem;
          font-size: 0.72rem;
        }

        .series-panel {
          position: sticky;
          top: 96px;
        }

        .series-card {
          display: block;
          color: inherit;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 1rem;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }

        .series-card:hover {
          border-color: var(--accent-purple);
          transform: translateY(-2px);
        }

        .series-card-top {
          display: flex;
          justify-content: space-between;
          color: var(--accent-purple);
          font-size: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .series-card h3 {
          margin: 0 0 0.55rem;
          color: var(--text-primary);
        }

        .series-card p,
        .empty-state p {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.65;
          margin-bottom: 0.75rem;
        }

        .series-meta,
        .empty-series {
          color: var(--text-secondary);
          font-size: 0.78rem;
        }

        .empty-state,
        .empty-series {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 1.25rem;
        }

        .empty-state h3 {
          margin-bottom: 0.4rem;
        }

        @media (max-width: 960px) {
          .articles-layout {
            grid-template-columns: 1fr;
          }

          .series-panel {
            position: static;
          }
        }

        @media (max-width: 720px) {
          .article-stats {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

          .article-controls {
            grid-template-columns: 1fr;
          }

          .view-toggle {
            width: 100%;
            grid-template-columns: repeat(2, 1fr);
            min-height: 44px;
          }

          .article-grid {
            grid-template-columns: 1fr;
          }

          :global(.article-card.list) {
            grid-template-columns: 1fr;
          }

          :global(.article-card.list .article-cover) {
            height: 140px;
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
