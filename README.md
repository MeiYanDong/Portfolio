# MeiYanDong Portfolio

梅炎栋的个人网站，展示 Web2 / Web3 项目、实践案例、系列文章与个人档案。项目使用 Next.js 14 静态导出，生产站点为 [myandong.xyz](https://myandong.xyz)。

## 本地开发

环境要求：Node.js 20.9 或更高版本。

```bash
npm ci
npm run dev
```

常用命令：

```bash
npm run format        # 格式化当前分支发生变化的文本文件
npm run lint          # ESLint，警告也会阻断
npm run typecheck:critical
npm run test:contracts
npm run build         # 静态导出到 out/，并写入 build-meta.json
npm run test:e2e      # 对 out/ 启动静态服务并运行桌面/移动端浏览器测试
npm run verify        # 合并前完整质量门禁
npm run smoke:prod    # 检查生产关键路由和内容
```

## 内容结构

- `data/projects.json`：项目目录及 Web2 / Web3 路线。
- `data/projectCaseStudies.json`：重点项目的详细叙事与证据。
- `data/cases.json`：实践案例。
- `content/articles/`：本地 Markdown 文章。
- `public/`：文章图片、项目封面、案例证据和简历。
- `docs/project-content-standards.md`：项目内容与图片标准。

数据之间的 ID、系列顺序和本地素材路径由 `tests/contracts/content-contracts.test.mjs` 验证。

## 交付链路

1. Pull Request 运行 GitHub Actions 的 `quality` 检查。
2. `main` 由 Netlify 按 `netlify.toml` 构建并发布 `out/`。
3. 构建生成 `/build-meta.json`，记录本次提交 SHA。
4. 合并后的 Runtime Smoke 等待生产 SHA 一致，再验证关键路由和页面内容。

详细说明见 [质量门禁](docs/engineering/quality-gates.md) 与 [部署 ADR](docs/adr/0001-netlify-canonical-deployment.md)。
