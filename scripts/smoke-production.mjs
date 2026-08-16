const baseUrl = (process.env.BASE_URL || 'https://myandong.xyz').replace(/\/$/, '')
const expectedRevision = process.env.EXPECTED_REVISION || ''
const revisionTimeoutMs = Number(process.env.REVISION_TIMEOUT_MS || 12 * 60 * 1000)
const revisionPollMs = Number(process.env.REVISION_POLL_MS || 15 * 1000)

const routes = [
  { path: '/', expected: ['梅炎栋', '40B+', '把反复出现的问题做成产品和自动化系统'] },
  { path: '/projects/', expected: ['Web2 项目 - 梅炎栋', '内容搜索'] },
  { path: '/articles/', expected: ['文章系统', '科学上网入门：购买 VPN 与配置 Clash Verge'] },
  { path: '/projects/42-market-sniper/', expected: ['42Space 预测市场', '+1536 U'] }
]

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

async function fetchText(path) {
  const response = await fetch(`${baseUrl}${path}`, {
    cache: 'no-store',
    signal: AbortSignal.timeout(20_000)
  })
  const text = await response.text()
  if (!response.ok) {
    throw new Error(`${path} returned HTTP ${response.status}`)
  }
  return { response, text }
}

async function waitForRevision() {
  if (!expectedRevision) {
    const { text } = await fetchText(`/build-meta.json?revision=${Date.now()}`)
    return JSON.parse(text)
  }

  const deadline = Date.now() + revisionTimeoutMs
  let latest = null
  let latestError = null

  while (Date.now() < deadline) {
    try {
      const { text } = await fetchText(`/build-meta.json?revision=${Date.now()}`)
      latest = JSON.parse(text)
      if (latest.revision === expectedRevision) return latest
      latestError = `received ${latest.revision || 'missing revision'}`
    } catch (error) {
      latestError = error.message
    }
    await sleep(revisionPollMs)
  }

  throw new Error(
    `Production revision did not reach ${expectedRevision} within ${revisionTimeoutMs}ms; ${latestError}`
  )
}

const startedAt = new Date().toISOString()
const metadata = await waitForRevision()
const checks = []

for (const route of routes) {
  const { response, text } = await fetchText(route.path)
  const missing = route.expected.filter((value) => !text.includes(value))
  if (missing.length > 0) {
    throw new Error(`${route.path} is missing expected content: ${missing.join(', ')}`)
  }
  checks.push({ path: route.path, status: response.status, expected: route.expected })
}

console.log(
  JSON.stringify(
    {
      status: 'passed',
      baseUrl,
      expectedRevision: expectedRevision || null,
      observedRevision: metadata?.revision || null,
      startedAt,
      completedAt: new Date().toISOString(),
      checks
    },
    null,
    2
  )
)
