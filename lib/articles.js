import fs from 'fs'
import path from 'path'
import seriesData from '../data/articleSeries.json'

const articlesDirectory = path.join(process.cwd(), 'content/articles')

function parseList(value = '') {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

function parseFrontmatter(fileContent) {
  const match = fileContent.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!match) {
    return { data: {}, content: fileContent }
  }

  const data = {}
  match[1].split('\n').forEach((line) => {
    const separatorIndex = line.indexOf(':')
    if (separatorIndex === -1) return
    const key = line.slice(0, separatorIndex).trim()
    const value = line.slice(separatorIndex + 1).trim()
    data[key] = value
  })

  return {
    data,
    content: match[2].trim()
  }
}

function stripMarkdown(markdown) {
  return markdown
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[`*_>#-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function calculateReadingTime(markdown) {
  const text = stripMarkdown(markdown)
  const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length
  const words = text.replace(/[\u4e00-\u9fa5]/g, '').split(/\s+/).filter(Boolean).length
  const units = chineseChars + words
  return Math.max(1, Math.ceil(units / 500))
}

function getSeriesMap() {
  return seriesData.reduce((map, series) => {
    map[series.id] = series
    return map
  }, {})
}

function getArticleFromFile(fileName) {
  const slug = fileName.replace(/\.md$/, '')
  const fullPath = path.join(articlesDirectory, fileName)
  const fileContent = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = parseFrontmatter(fileContent)
  const seriesMap = getSeriesMap()
  const series = data.series ? seriesMap[data.series] : null
  const topics = parseList(data.topics)
  const tags = parseList(data.tags)
  const plainText = stripMarkdown(content)

  return {
    slug,
    title: data.title || slug,
    summary: data.summary || '',
    date: data.date || '',
    topics,
    tags,
    seriesId: data.series || null,
    seriesTitle: series?.title || null,
    seriesOrder: data.seriesOrder ? Number(data.seriesOrder) : null,
    cover: data.cover || null,
    readingTime: calculateReadingTime(content),
    content,
    searchText: [
      data.title,
      data.summary,
      data.date,
      topics.join(' '),
      tags.join(' '),
      series?.title,
      plainText
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
  }
}

export function getAllArticles() {
  if (!fs.existsSync(articlesDirectory)) return []
  return fs
    .readdirSync(articlesDirectory)
    .filter((fileName) => fileName.endsWith('.md'))
    .map(getArticleFromFile)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

export function getAllTopics() {
  const topics = new Set(['科学上网'])
  getAllArticles().forEach((article) => {
    article.topics.forEach((topic) => topics.add(topic))
  })
  seriesData.forEach((series) => {
    series.topics.forEach((topic) => topics.add(topic))
  })
  return Array.from(topics)
}

export function getAllSeries() {
  const articles = getAllArticles()
  return seriesData
    .map((series) => {
      const seriesArticles = articles
        .filter((article) => article.seriesId === series.id)
        .sort((a, b) => (a.seriesOrder || 0) - (b.seriesOrder || 0))
      const latestArticle = [...seriesArticles].sort((a, b) => new Date(b.date) - new Date(a.date))[0]
      return {
        ...series,
        articleCount: seriesArticles.length,
        lastUpdated: latestArticle?.date || '',
        articleTitles: seriesArticles.map((article) => article.title),
        searchText: [
          series.title,
          series.summary,
          series.status,
          series.topics.join(' '),
          seriesArticles.map((article) => article.title).join(' ')
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
      }
    })
    .sort((a, b) => {
      const dateDiff = new Date(b.lastUpdated || 0) - new Date(a.lastUpdated || 0)
      if (dateDiff) return dateDiff
      return (a.order || 0) - (b.order || 0)
    })
}

export function getArticleBySlug(slug) {
  return getAllArticles().find((article) => article.slug === slug) || null
}

export function getSeriesById(seriesId) {
  return getAllSeries().find((series) => series.id === seriesId) || null
}

export function getArticlesBySeries(seriesId) {
  return getAllArticles()
    .filter((article) => article.seriesId === seriesId)
    .sort((a, b) => (a.seriesOrder || 0) - (b.seriesOrder || 0))
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function normalizeAssetPath(src, slug) {
  if (src.startsWith('http') || src.startsWith('/')) return src
  return `/articles/${slug}/${src}`
}

function isGeneratedImageAlt(alt) {
  return /^Image \d+: image\.[a-z0-9]+$/i.test(alt.trim())
}

function inlineMarkdown(value, slug) {
  let html = escapeHtml(value)
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>')
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label, href) => {
    const safeHref = escapeHtml(normalizeAssetPath(href, slug))
    return `<a href="${safeHref}">${label}</a>`
  })
  return html
}

function flushParagraph(paragraphLines, html, slug) {
  if (!paragraphLines.length) return
  html.push(`<p>${inlineMarkdown(paragraphLines.join(' '), slug)}</p>`)
  paragraphLines.length = 0
}

function flushList(listItems, listType, html, slug) {
  if (!listItems.length || !listType.current) return
  html.push(
    `<${listType.current}>${listItems
      .map((item) => `<li>${inlineMarkdown(item, slug)}</li>`)
      .join('')}</${listType.current}>`
  )
  listItems.length = 0
  listType.current = null
}

export function markdownToHtml(markdown, slug) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n')
  const html = []
  const paragraphLines = []
  const listItems = []
  const listType = { current: null }
  let codeFence = false
  let codeLines = []

  lines.forEach((rawLine) => {
    const line = rawLine.trim()

    if (line.startsWith('```')) {
      if (codeFence) {
        html.push(`<pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`)
        codeLines = []
        codeFence = false
      } else {
        flushParagraph(paragraphLines, html, slug)
        flushList(listItems, listType, html, slug)
        codeFence = true
      }
      return
    }

    if (codeFence) {
      codeLines.push(rawLine)
      return
    }

    if (!line) {
      flushParagraph(paragraphLines, html, slug)
      flushList(listItems, listType, html, slug)
      return
    }

    const image = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/)
    if (image) {
      flushParagraph(paragraphLines, html, slug)
      flushList(listItems, listType, html, slug)
      const alt = escapeHtml(image[1])
      const src = escapeHtml(normalizeAssetPath(image[2], slug))
      const caption = image[1] && !isGeneratedImageAlt(image[1]) ? `<figcaption>${alt}</figcaption>` : ''
      html.push(`<figure><img src="${src}" alt="${alt}" />${caption}</figure>`)
      return
    }

    const heading = line.match(/^(#{1,3})\s+(.+)$/)
    if (heading) {
      flushParagraph(paragraphLines, html, slug)
      flushList(listItems, listType, html, slug)
      const level = heading[1].length
      html.push(`<h${level}>${inlineMarkdown(heading[2], slug)}</h${level}>`)
      return
    }

    if (line.startsWith('> ')) {
      flushParagraph(paragraphLines, html, slug)
      flushList(listItems, listType, html, slug)
      html.push(`<blockquote>${inlineMarkdown(line.slice(2), slug)}</blockquote>`)
      return
    }

    const unordered = line.match(/^[-*]\s+(.+)$/)
    const ordered = line.match(/^\d+\.\s+(.+)$/)
    if (unordered || ordered) {
      flushParagraph(paragraphLines, html, slug)
      const nextType = unordered ? 'ul' : 'ol'
      if (listType.current && listType.current !== nextType) {
        flushList(listItems, listType, html, slug)
      }
      listType.current = nextType
      listItems.push(unordered ? unordered[1] : ordered[1])
      return
    }

    paragraphLines.push(line)
  })

  flushParagraph(paragraphLines, html, slug)
  flushList(listItems, listType, html, slug)
  return html.join('\n')
}
