# 工程质量门禁

## 目标

门禁优先保护访问者真正会经过的路径：项目筛选和视图、文章顺序和正文、本地图片、首页 Token 证据图交互、静态动态路由，以及生产版本是否对应合并提交。

## 本地门禁

`npm run verify` 按顺序执行：

1. `format:check`：只检查当前分支相对基线发生变化的文本文件，避免一次性重排遗留代码。
2. `lint`：检查 `components`、`lib`、`pages`、`scripts` 和 `tests`，不允许 warning。
3. `typecheck:critical`：对共用 Token 动效纯函数执行严格 JavaScript 类型检查。它不是全仓 TypeScript 覆盖。
4. `test:contracts`：验证项目、案例、个人档案、文章系列和本地素材之间的业务引用。
5. `build`：执行 Next.js 静态导出，并生成 `out/build-meta.json`。
6. `test:e2e`：桌面 Chromium 和 Pixel 7 视口验证真实浏览器行为。

## 合并门禁

`.github/workflows/quality.yml` 在 Pull Request 和 `main` push 上运行同一套 `npm run verify`。仓库规则要求 Pull Request 和名为 `quality` 的状态检查通过后才能合并。

## 部署验证

Netlify 是唯一生产发布方。`scripts/smoke-production.mjs` 将构建成功与发布成功分开验证：

- push 到 `main` 时，先轮询 `/build-meta.json`，直到线上 `revision` 与合并提交 SHA 完全一致。
- 随后检查首页、项目、文章与 42Space 重点项目路由均返回 2xx，并包含预期业务内容。
- 定时任务每天执行一次无 SHA 约束的站点可用性检查。

## 已知边界

- 目前只有关键共用动效模块进入严格类型检查，旧页面仍是 JavaScript。
- 大型页面和自定义 Markdown 解析器仍有维护成本，后续按功能改动风险逐步拆分，不在本次基线中重构。
- 依赖安全升级独立处理；不得使用破坏性 `npm audit fix --force` 混入内容或 UI 变更。
