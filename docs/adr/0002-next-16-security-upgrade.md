# ADR 0002：升级 Next.js 16 安全基线

- 状态：Accepted
- 日期：2026-08-16

## 背景

项目原先使用 Next.js 14。生产依赖审计报告包含 Next.js、PostCSS 和 nanoid 的 high 级漏洞；直接执行 `npm audit fix --force` 会跨越框架主版本并绕过兼容验证。

## 决策

1. 将 Next.js 固定为 16.3.1，并同步升级至 React / React DOM 19.2.8。
2. 保留 Pages Router、`output: 'export'` 和无优化图片配置，不在安全升级中迁移路由架构或重构页面。
3. 接受 Next.js 16 默认的 Turbopack 构建路径；只有出现可复现的不兼容时才回退到 webpack。
4. 将 ESLint 固定在兼容 Node.js 20.9 的 9.x，并把 legacy `.eslintrc` 迁移为 flat config。
5. 在合并门禁中执行生产依赖审计，并继续运行静态构建、内容契约和桌面/移动端浏览器测试。

## 验收标准

- Node.js 20 环境下 `npm ci` 和 `npm run verify` 通过。
- 静态导出的全部页面构建成功，关键桌面/移动端交互通过真实浏览器测试。
- `npm audit --omit=dev` 不包含已知漏洞，完整 `npm audit` 的残余问题被明确记录。
- 合并后 Netlify 发布的 `/build-meta.json` 与合并提交 SHA 一致，生产关键路由冒烟通过。

## 结果

- Node.js 20.20.2 下从锁文件执行 `npm ci && npm run verify` 通过：3 条业务契约、65 个静态页面和 12 条桌面/移动端浏览器用例均通过。
- `npm audit --omit=dev` 与完整 `npm audit` 均为 0 个已知漏洞。
- React 19 lint 规则暴露的既有状态同步已收敛：文章主题由 URL 直接派生；封面评审页仅对保持 SSR 一致所需的浏览器存储恢复做局部豁免。
- Pull Request CI 和合并后的生产回读仍作为外部交付回执，不能由本地结果替代。
