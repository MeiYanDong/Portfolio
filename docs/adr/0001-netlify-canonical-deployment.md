# ADR 0001：Netlify 作为唯一生产发布链路

- 状态：Accepted
- 日期：2026-08-16

## 背景

`myandong.xyz` 当前由 Netlify 提供服务，但仓库仍保留 GitHub Pages 的旧式 `main` / root 配置。该 Pages 地址返回 404，且仓库内没有可审查的 Netlify 构建配置。仅凭 Next.js 构建成功，也无法证明自定义域名已经发布了同一提交。

## 决策

1. `myandong.xyz` 是唯一规范生产域名，Netlify 是唯一生产发布方。
2. 在仓库维护 `netlify.toml`，固定 Node.js 20、`npm run build` 和 `out/` 发布目录。
3. 每次构建生成包含提交 SHA 的 `/build-meta.json`。
4. `main` push 后由 Runtime Smoke 等待线上 SHA 一致，再验证关键路由。
5. 关闭遗留 GitHub Pages，避免出现两个相互漂移的发布入口。

## 结果

构建、部署和运行时验证拥有独立证据。Netlify 配置变更可随代码评审；生产冒烟失败不会被描述为“已发布成功”。代价是 Netlify 项目仍需保持与 GitHub 仓库连接，部署供应商切换时需要新增 ADR。
