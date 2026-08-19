import { expect, test } from '@playwright/test'

test('项目目录支持路线、主题、搜索与两种视图', async ({ page }) => {
  await page.goto('/projects/')

  await expect(page.getByRole('heading', { name: 'Web2 代表项目' })).toBeVisible()
  await expect(page.locator('.project-card')).toHaveCount(8)

  await page.getByRole('button', { name: '列表展示' }).click()
  await expect(page.locator('.project-row')).toHaveCount(8)
  await expect(page.locator('.project-card')).toHaveCount(0)

  await page.getByRole('button', { name: '智能体系统', exact: true }).click()
  await expect(page.locator('.project-row')).toHaveCount(4)

  await page.getByLabel('内容搜索').fill('提示词管理器')
  await expect(page.locator('.project-row')).toHaveCount(1)
  await expect(page.locator('.project-row strong')).toHaveText('提示词管理器')

  await page.getByRole('link', { name: /Web3/ }).click()
  await expect(page).toHaveURL(/\/projects\/web3\/$/)
  await expect(page.getByRole('heading', { name: 'Web3 代表项目' })).toBeVisible()
})

test('文章目录保持系列顺序，并支持搜索与视图切换', async ({ page }) => {
  await page.goto('/articles/')

  const rows = page.locator('.article-row')
  await expect(rows).toHaveCount(3)
  await expect(rows.nth(0).locator('strong')).toHaveText('用 AI 赚到一万多之后，我回头看了看这两年')
  await expect(rows.nth(1).locator('strong')).toHaveText(
    '科学上网入门：购买 VPN 与配置 Clash Verge'
  )
  await expect(rows.nth(2).locator('strong')).toHaveText(
    '科学上网进阶：静态住宅 与 AI 网络智能分流脚本'
  )

  await page.getByLabel('内容搜索').fill('Kookeey')
  await expect(rows).toHaveCount(1)
  await expect(rows.locator('strong')).toHaveText('科学上网进阶：静态住宅 与 AI 网络智能分流脚本')

  await page.getByLabel('内容搜索').fill('')
  await page.getByRole('button', { name: '科学上网', exact: true }).click()
  await expect(rows).toHaveCount(2)
  await expect(rows.nth(0).locator('strong')).toHaveText(
    '科学上网入门：购买 VPN 与配置 Clash Verge'
  )
  await expect(rows.nth(1).locator('strong')).toHaveText(
    '科学上网进阶：静态住宅 与 AI 网络智能分流脚本'
  )

  await page.getByRole('button', { name: '全部主题' }).click()
  await page.getByRole('button', { name: '网格展示' }).click()
  await expect(page.locator('.article-card')).toHaveCount(3)
  await expect(page.locator('.article-row')).toHaveCount(0)
})

test('独立文章保留完整正文、本地图片与无系列布局', async ({ page }) => {
  await page.goto('/articles/ai-earned-ten-thousand-reflection/')

  await expect(
    page.getByRole('heading', {
      level: 1,
      name: '用 AI 赚到一万多之后，我回头看了看这两年'
    })
  ).toBeVisible()
  await expect(page.locator('.reader-layout')).toHaveClass(/standalone/)
  await expect(page.locator('.series-toc')).toHaveCount(0)
  await expect(page.locator('.article-toc')).toBeVisible()
  await expect(page.locator('.article-toc a')).toHaveCount(9)
  await expect
    .poll(() => page.locator('.article-toc').evaluate((toc) => toc.getBoundingClientRect().width))
    .toBeGreaterThan(160)
  const tocBox = await page.locator('.article-toc').boundingBox()
  const bodyBox = await page.locator('.article-body').boundingBox()
  if (page.viewportSize().width > 960) {
    expect(tocBox.x).toBeLessThan(bodyBox.x)
  } else {
    expect(tocBox.y).toBeLessThan(bodyBox.y)
  }
  await expect(page.locator('.article-toc a').first()).toHaveAttribute('href', '#从一张图片开始')
  await expect(page.locator('[id="从一张图片开始"]')).toHaveText('从一张图片开始')

  const bodyImages = page.locator('.article-body img')
  await expect(bodyImages).toHaveCount(6)
  for (let index = 0; index < 6; index += 1) {
    await expect
      .poll(() => bodyImages.nth(index).evaluate((image) => image.naturalWidth))
      .toBeGreaterThan(0)
  }

  await expect(page.locator('.article-body')).toContainText(
    '她投资的是我在一次次没有结果之后，依然还有资格再试一次。'
  )
})

test('文章详情渲染正文链接、本地图片与系列导航', async ({ page }) => {
  await page.goto('/articles/scientific-networking-static-residential-ip/')

  await expect(
    page.getByRole('heading', {
      level: 1,
      name: '科学上网进阶：静态住宅 与 AI 网络智能分流脚本'
    })
  ).toBeVisible()
  await expect(page.getByRole('link', { name: 'Clash Verge增强脚本_分享版.js' })).toHaveAttribute(
    'href',
    'https://drive.google.com/file/d/1Cc21srqD1K0Xa88FnWWGzmlagsbGztSL/view?usp=sharing'
  )

  const bodyImages = page.locator('.article-body img')
  await expect(bodyImages).toHaveCount(5)
  for (let index = 0; index < 5; index += 1) {
    await expect
      .poll(() => bodyImages.nth(index).evaluate((image) => image.naturalWidth))
      .toBeGreaterThan(0)
  }

  await expect(page.locator('.series-toc a')).toHaveCount(2)
  await expect(page.locator('.series-toc a.active')).toContainText('第 2 篇')
})

test('首页 Token 证据图可放大、约束焦点并返回触发位置', async ({ page }) => {
  await page.goto('/')

  const trigger = page.getByRole('button', { name: '放大查看 Codex 个人使用数据卡片' })
  const triggerBox = await trigger.boundingBox()
  expect(triggerBox).not.toBeNull()

  await trigger.click()
  const dialog = page.getByRole('dialog', { name: 'Codex 个人使用数据卡片预览' })
  const closeButton = page.getByRole('button', { name: '关闭图片预览' })
  const previewImage = dialog.locator('.token-proof-lightbox-image')
  await expect(dialog).toBeVisible()
  await expect(closeButton).toBeFocused({ timeout: 2_000 })
  await expect(page.locator('body')).toHaveCSS('overflow', 'hidden')

  const previewBox = await previewImage.boundingBox()
  const viewport = page.viewportSize()
  expect(previewBox).not.toBeNull()
  expect(viewport).not.toBeNull()
  expect(previewBox.width).toBeGreaterThan(triggerBox.width * 1.5)
  expect(Math.abs(previewBox.x + previewBox.width / 2 - viewport.width / 2)).toBeLessThan(3)
  expect(Math.abs(previewBox.y + previewBox.height / 2 - viewport.height / 2)).toBeLessThan(3)

  await page.keyboard.press('Tab')
  await expect(closeButton).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(dialog).toHaveCount(0)
  await expect(trigger).toBeFocused()
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden')
})

test('减少动态效果偏好仍能完成 Token 图片预览', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')

  const trigger = page.getByRole('button', { name: '放大查看 Codex 个人使用数据卡片' })
  await trigger.click()
  const dialog = page.getByRole('dialog', { name: 'Codex 个人使用数据卡片预览' })
  await expect(dialog).toBeVisible()
  await expect(page.getByRole('button', { name: '关闭图片预览' })).toBeFocused({ timeout: 600 })

  await page.keyboard.press('Escape')
  await expect(dialog).toHaveCount(0, { timeout: 600 })
  await expect(trigger).toBeFocused()
})

test('核心静态路由可直接访问', async ({ page }) => {
  const routes = [
    ['/', '梅炎栋'],
    ['/projects/42-market-sniper/', '42Space 预测市场'],
    ['/cases/token-relay-content-operations/', 'Token 中转站内容运营'],
    ['/about/', '关于']
  ]

  for (const [route, expectedText] of routes) {
    const response = await page.goto(route)
    expect(response?.status()).toBe(200)
    await expect(page.locator('body')).toContainText(expectedText)
  }
})
