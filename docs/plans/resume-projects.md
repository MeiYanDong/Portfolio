# 简历级项目展示初稿

## 目标

把个人网站的“项目”板块从普通作品列表升级为“简历级精选项目”展示。第一版先放入用户认可的第一梯队项目，并补充第二梯队中的 `回声笔记`、`xhs-publish-skill`、`个人资产追踪`。

旧作品不删除，保留为归档作品，视觉权重低于本次新增的简历级项目。

## 项目范围

第一梯队项目：

1. `42space`：42 Market Sniper
2. `virtuals-whale-radar`：Virtuals Whale Radar
3. `OKX-Boost 交易量计算`：OKX Boost 钱包工作台
4. `marry2`：Matchmaking Studio
5. `IntelOS`：IntelOS
6. `Readwise`：Daily AI Digest

第二梯队纳入本次初稿的项目：

1. `回声笔记`：Echo Notes
2. `xhs-publish-skill`：小红书图文发布流程
3. `个人资产追踪`：个人加密资产追踪工作台

## 信息结构

项目数据需要从旧的“图片 + 描述 + 标签 + 三段故事”扩展为简历可用的信息结构：

- `tier`：`featured` 或 `selected`，用于区分首页/项目页优先级。
- `category`：项目能力分类，而不是泛泛的工具/应用。
- `role`：本人承担的角色。
- `description`：项目一句话说明。
- `resumeLine`：适合放进简历的一句话。
- `impact`：可公开的结果、规模或使用场景。
- `stack`：技术栈。
- `highlights`：关键能力点。
- `story.problem`：为什么要做。
- `story.process`：怎么设计和实现。
- `story.result`：最终形成什么能力。
- `links`：GitHub、Demo 或 Case Study 链接。没有公开链接时留空，不编造。

## 展示原则

1. 项目列表页以“精选项目”为第一屏，突出第一梯队 6 个项目。
2. 第二梯队项目放在同一个项目页，但视觉权重低于精选项目。
3. 分类筛选保留，但分类名称改成能力导向：
   - On-chain Automation
   - AI Agent Systems
   - Product Workbenches
   - Personal Knowledge Tools
4. 列表卡片需要展示：
   - 项目标题
   - tier 标识
   - 角色/年份/分类
   - 一句话描述
   - 简历表达
   - 影响或结果
   - 核心技术标签
5. 详情页需要展示：
   - 项目定位
   - 角色与时间
   - 技术栈
   - 简历表达
   - 关键能力点
   - 问题 / 过程 / 结果
   - 外部链接

## 设计约束

1. 延续当前个人网站的极简黑色风格。
2. 不做大幅营销页，不新增 landing page。
3. 项目页要更像简历 Case Study，不像普通作品墙。
4. 不编造不可验证结果；结果表达以本地 README、仓库结构、已知运行方式和可公开事实为准。
5. 旧项目数据必须保留，作为归档作品继续展示；本次只新增和提升简历级项目。

## 实现方案

### 阶段一：数据重构

更新 `data/projects.json`，新增 9 个简历级项目，并保留原有旧作品作为 `archive` 归档项目。图片资源暂时复用已有公共图片，避免本阶段增加视觉素材工作。

### 阶段二：项目列表页

更新 `pages/projects/index.js`：

- 增加 tier 分区：精选项目、入选项目。
- 保留分类筛选。
- 卡片从图片主导改成信息主导。
- 展示 `resumeLine`、`impact`、`stack`。

### 阶段三：项目详情页

更新 `pages/projects/[id].js`：

- 兼容新的项目数据字段。
- 展示角色、分类、年份、技术栈、关键能力、影响结果。
- 保留外部链接。
- 移除空故事导致的空白展示。

### 阶段四：验证

验证要求：

- `npm run build` 通过。
- `/projects/` 返回正常。
- 至少抽查第一梯队和第二梯队各一个详情页返回正常。
- `docs/todos/resume-projects.md` 中已完成项必须与实际完成状态一致。
