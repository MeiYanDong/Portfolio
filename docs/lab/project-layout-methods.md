# Project Layout LAB

## 调研结论

这次项目页不走“作品墙”路线。调研的共同结论是：高质量个人项目展示应该减少浅层图片网格，优先展示清晰选择、项目上下文、个人贡献、决策过程和结果证据。

参考来源：

- Awwwards Portfolio：作品集是展示内容的核心媒介，重点在有效呈现作品内容。
- Figma Portfolio Guide：作品集需要个性化、持续更新，并反映个人品牌。
- Portfolio Studio：强开发者作品集通常强调清晰叙事、少量精选项目、速度和克制设计。
- Site Builder Report UX Portfolios：优秀 UX 作品集要干净、易用，并让作品本身被看见。
- Webflow Portfolio Examples：作品集不应该只是简单画廊，而应帮助访客理解并转化。
- UXfolio UX Portfolio Guide：招聘方看重清晰推理、个人 ownership、可衡量影响和结构化 case study。
- Creative Bloq Portfolio Examples：克制、清晰、动效、角色透明和经济的上下文说明都能构成高质量展示。

## LAB 路线

LAB 不进主导航。它是个人设计系统里的打样场，作用是：

1. 把调研抽象成可复用布局方法。
2. 用真实项目数据测试每种方法是否成立。
3. 让主站项目页只采用通过 LAB 验证后的结构。

隐藏预览路由：

- `/projects/lab/`：31 个方法目录。
- `/projects/lab/{method-id}/`：每个方法对应一个完整落地原型。

当前 31 个方法已经全部接入动态路由。目录页只做方法入口，真正判断方案是否成立，要进入每个 method 页面查看它如何使用真实项目数据、归档层和详情页链接。

## 完整落地标准

完整落地不是在目录页放一个缩略预览，而是：

1. 使用真实 `projects.json` 数据。
2. 至少覆盖精选项目、入选项目和旧作品归档。
3. 页面结构必须完整表达该方法的核心逻辑。
4. 如果方法强调交互或动效，需要在页面中实现对应交互或动效。
5. 每个项目条目必须能进入真实项目详情页。

## 已采纳方案：Scoreboard Ledger

定稿时间：2026-07-09

当前主站 `/projects/` 已采用这个方案，LAB 原型保留在 `/projects/lab/scoreboard-ledger/` 作为设计系统参考。这个方案融合了 `Scoreboard` 的进度条统计、网格概览的可浏览性，以及 `Editorial Ledger` 的列表扫描质感。

核心结构固定为两层工具区：

1. 第一行左侧展示主题标题、当前主题和项目数，右侧放网格/列表两个 icon，用于切换展示方式。
2. 第二行左侧直接展示主题标签，右侧放内容搜索输入框。不要再把主题标签包进卡片容器，也不要让搜索标题单独形成第三层。

展示规则：

- 主题进度条使用全部项目数据，不随筛选和搜索变化。
- 主题筛选和内容搜索只影响下方项目结果。
- 结果视图只显示一种：网格或列表，通过右侧 icon 切换，不同时并列展示。
- 网格视图用于快速浏览项目密度，列表视图用于更严肃的简历扫描。
- 主题标签直接贴近项目展示区，避免像独立筛选模块一样打断阅读。
- 无匹配结果时，在项目结果区展示空状态，不影响上方全局主题进度条。

这个方案是当前个人网站项目页的实际采用方案，不再把 `Mission Index`、`Case Strip`、`Project OS Tabs` 等方法拼成主线组合；它们保留为 LAB 备选方法。

## 31 个布局方法

1. Case Study First：少量精选项目优先，卡片直接给出上下文、职责和结果。
2. Mission Index：左侧项目索引，右侧展示当前项目任务简报。
3. Bento Proof Grid：用不等宽模块组织结果、能力、技术栈和链接。
4. Editorial Ledger：杂志目录式排版，突出标题和说明。
5. Impact Table：用固定字段表格展示项目、角色、结果、技术栈。
6. Timeline Arc：按年份和阶段展示项目演进。
7. Capability Matrix：用能力维度组织项目。
8. Systems Map：把项目看成系统节点，突出数据流和自动化流。
9. Project Dossier：每个项目像档案卡，强调背景、职责、约束、证据。
10. Operating System：项目页本身像工作台。
11. Hero Then Ledger：首屏讲一个最强项目，下面紧凑列出其他项目。
12. Recruiter Scan：用问题、动作、结果、技术四列服务招聘阅读。
13. Proof Stack：先给证据，再给解释。
14. Split Feature：左右分屏展示项目叙事和技术证据。
15. Dense Command Center：高密度运营后台式布局。
16. Archive Ledger：旧作品保留为紧凑归档。
17. Skills Radar：按技术能力聚合项目。
18. Decision Trail：按背景、取舍、实现、结果展示项目。
19. Constraint Cards：突出真实约束和工程边界。
20. Stack Catalog：按技术栈组织项目。
21. Featured Triptych：用三列展示三类主能力。
22. Case Strip：每个项目是一条横向 case strip。
23. Link Light：降低视觉，突出链接和文字。
24. Project OS Tabs：用 tabs 在精选、入选、归档、能力之间切换。
25. Scoreboard：先展示项目规模和能力统计。
26. Scoreboard Ledger：融合统计进度条、网格概览、动态列表、主题筛选和内容搜索。
27. Case Study Cards：卡片保留，但必须包含 case study 信息。
28. Role-led Index：按个人角色组织项目。
29. Product System Shelf：项目像系统货架，每层一个领域。
30. One-line Index：每个项目压缩为一行。
31. LAB Gallery：同一批真实数据多布局同时打样。

## 主站采用方案

当前优先采用：

- Scoreboard Ledger：已落地到 `/projects/`，作为项目页主结构，负责全局主题分布、主题筛选、内容搜索、网格/列表切换和真实项目链接。

它比普通作品网格更适合当前项目，因为当前数据的核心资产是工程系统、真实流程和结果证据，而不是统一视觉截图。主站落地时应优先复用这个方案的信息层级，再根据首页和详情页节奏做视觉收敛。
