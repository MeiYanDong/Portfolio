import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { basename, join, resolve } from 'node:path'
import test from 'node:test'

const root = resolve(import.meta.dirname, '../..')
const publicDirectory = join(root, 'public')
const articleDirectory = join(root, 'content/articles')

function readJson(relativePath) {
  return JSON.parse(readFileSync(join(root, relativePath), 'utf8'))
}

function publicAssetExists(assetPath) {
  return typeof assetPath === 'string' && assetPath.startsWith('/')
    ? existsSync(join(publicDirectory, assetPath.slice(1)))
    : false
}

function assertUnique(values, label) {
  const duplicates = values.filter((value, index) => values.indexOf(value) !== index)
  assert.deepEqual([...new Set(duplicates)], [], `${label}存在重复值: ${duplicates.join(', ')}`)
}

function parseArticle(fileName) {
  const source = readFileSync(join(articleDirectory, fileName), 'utf8')
  const match = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  assert.ok(match, `${fileName} 缺少有效 frontmatter`)

  const data = Object.fromEntries(
    match[1].split('\n').flatMap((line) => {
      const separatorIndex = line.indexOf(':')
      if (separatorIndex < 0) return []
      return [[line.slice(0, separatorIndex).trim(), line.slice(separatorIndex + 1).trim()]]
    })
  )

  return {
    slug: basename(fileName, '.md'),
    data,
    content: match[2]
  }
}

function localMarkdownAssets(article) {
  return [...article.content.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)]
    .map((match) => match[1].trim())
    .filter((assetPath) => assetPath.startsWith('/'))
}

test('项目目录具有唯一身份、稳定分组和可展示素材', () => {
  const projects = readJson('data/projects.json')
  assert.ok(projects.length >= 1, '项目目录不能为空')
  assertUnique(
    projects.map((project) => project.id),
    '项目 id'
  )

  for (const project of projects) {
    assert.match(project.id, /^[A-Za-z0-9-]+$/, `${project.id} 不是稳定 URL id`)
    assert.ok(project.title, `${project.id} 缺少标题`)
    assert.ok(project.description, `${project.id} 缺少摘要`)
    assert.ok(project.resumeLine, `${project.id} 缺少简历描述`)
    assert.ok(project.impact, `${project.id} 缺少结果描述`)
    assert.ok(['web2', 'web3'].includes(project.track), `${project.id} 的 track 无效`)
    assert.ok(Number.isInteger(project.trackOrder), `${project.id} 缺少整数 trackOrder`)
    assert.ok(project.cover || project.visual, `${project.id} 必须提供封面或结构化视觉数据`)

    if (project.cover) {
      assert.ok(publicAssetExists(project.cover), `${project.id} 的封面不存在: ${project.cover}`)
      assert.ok(project.coverAlt, `${project.id} 使用封面时必须提供 coverAlt`)
    }
  }

  for (const track of ['web2', 'web3']) {
    const trackProjects = projects.filter((project) => project.track === track)
    assert.ok(trackProjects.length >= 1, `${track} 至少需要一个项目`)
    assertUnique(
      trackProjects.map((project) => project.trackOrder),
      `${track} trackOrder`
    )
  }
})

test('案例、个人档案和项目详情引用真实存在的项目与素材', () => {
  const projects = readJson('data/projects.json')
  const cases = readJson('data/cases.json')
  const profiles = readJson('data/profiles.json')
  const studies = readJson('data/projectCaseStudies.json')
  const projectIds = new Set(projects.map((project) => project.id))
  const caseIds = new Set(cases.map((caseItem) => caseItem.id))

  assertUnique([...caseIds], '案例 id')
  for (const caseItem of cases) {
    assert.ok(publicAssetExists(caseItem.cover), `${caseItem.id} 的案例封面不存在`)
    for (const evidence of caseItem.evidence || []) {
      assert.ok(
        publicAssetExists(evidence.image),
        `${caseItem.id} 的证据图片不存在: ${evidence.image}`
      )
      assert.ok(evidence.alt, `${caseItem.id} 的证据图片缺少替代文本`)
    }
    for (const projectId of caseItem.relatedProjects || []) {
      assert.ok(projectIds.has(projectId), `${caseItem.id} 引用了不存在的项目: ${projectId}`)
    }
  }

  for (const profile of profiles) {
    for (const caseId of profile.caseIds || []) {
      assert.ok(caseIds.has(caseId), `${profile.id} 引用了不存在的案例: ${caseId}`)
    }
    for (const projectId of profile.projectIds || []) {
      assert.ok(projectIds.has(projectId), `${profile.id} 引用了不存在的项目: ${projectId}`)
    }
    assert.ok(publicAssetExists(profile.resume.file), `${profile.id} 的简历文件不存在`)
    assert.ok(publicAssetExists(profile.resume.preview), `${profile.id} 的简历预览不存在`)
  }

  for (const [projectId, study] of Object.entries(studies)) {
    assert.ok(projectIds.has(projectId), `项目详情引用了不存在的项目: ${projectId}`)
    assert.ok(study.summary, `${projectId} 的项目详情缺少摘要`)
    if (study.dashboard?.image) {
      assert.ok(
        publicAssetExists(study.dashboard.image),
        `${projectId} 的详情图片不存在: ${study.dashboard.image}`
      )
    }
  }
})

test('文章系列顺序、主题和本地图片保持一致', () => {
  const series = readJson('data/articleSeries.json')
  const seriesIds = new Set(series.map((item) => item.id))
  const articles = readdirSync(articleDirectory)
    .filter((fileName) => fileName.endsWith('.md'))
    .map(parseArticle)

  assertUnique(
    articles.map((article) => article.slug),
    '文章 slug'
  )

  for (const article of articles) {
    const { data } = article
    assert.ok(data.title, `${article.slug} 缺少标题`)
    assert.ok(data.summary, `${article.slug} 缺少摘要`)
    assert.match(data.date, /^\d{4}-\d{2}-\d{2}$/, `${article.slug} 日期格式无效`)
    assert.ok(data.topics, `${article.slug} 缺少主题`)
    assert.ok(seriesIds.has(data.series), `${article.slug} 引用了不存在的系列: ${data.series}`)
    assert.ok(Number.isInteger(Number(data.seriesOrder)), `${article.slug} 缺少系列顺序`)
    assert.ok(publicAssetExists(data.cover), `${article.slug} 的文章封面不存在: ${data.cover}`)

    for (const assetPath of localMarkdownAssets(article)) {
      assert.ok(publicAssetExists(assetPath), `${article.slug} 的正文图片不存在: ${assetPath}`)
    }
  }

  for (const seriesItem of series) {
    const orderedArticles = articles
      .filter((article) => article.data.series === seriesItem.id)
      .sort((a, b) => Number(a.data.seriesOrder) - Number(b.data.seriesOrder))
    const orders = orderedArticles.map((article) => Number(article.data.seriesOrder))
    assertUnique(orders, `${seriesItem.id} seriesOrder`)
    assert.deepEqual(
      orders,
      Array.from({ length: orders.length }, (_, index) => index + 1),
      `${seriesItem.id} 的文章序号必须从 1 连续排列`
    )
  }

  const scientificNetworking = Object.fromEntries(
    articles
      .filter((article) => article.data.series === 'scientific-networking')
      .map((article) => [article.slug, Number(article.data.seriesOrder)])
  )
  assert.deepEqual(scientificNetworking, {
    'scientific-networking-static-residential-ip': 2,
    'scientific-networking-vpn-clash-verge': 1
  })
})
