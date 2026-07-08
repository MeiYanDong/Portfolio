export const projectLayoutMethods = [
  {
    id: 'case-study-first',
    title: 'Case Study First',
    family: 'Narrative',
    principle: '少量精选项目优先，卡片直接给出上下文、职责和结果，而不是先展示图片。',
    useWhen: '项目数量不多，但每个项目都有复杂过程和可讲述的工程价值。',
    mapsTo: ['resumeLine', 'impact', 'story']
  },
  {
    id: 'mission-index',
    title: 'Mission Index',
    family: 'Index',
    principle: '左侧是项目索引，右侧展示当前项目任务简报，像任务控制台一样快速切换。',
    useWhen: '项目都是系统型工程，需要强调定位、状态、技术栈和执行边界。',
    mapsTo: ['title', 'role', 'category', 'stack']
  },
  {
    id: 'bento-proof-grid',
    title: 'Bento Proof Grid',
    family: 'Grid',
    principle: '把项目拆成不等宽模块，用结果、能力、技术栈和链接拼成证据墙。',
    useWhen: '需要在首屏同时展示多个强项目和能力密度。',
    mapsTo: ['impact', 'highlights', 'links']
  },
  {
    id: 'editorial-ledger',
    title: 'Editorial Ledger',
    family: 'Editorial',
    principle: '用杂志目录式排版，把项目当成严肃案例条目，降低装饰，突出标题和说明。',
    useWhen: '项目视觉素材不足，但文字证据强。',
    mapsTo: ['description', 'resumeLine', 'year']
  },
  {
    id: 'impact-table',
    title: 'Impact Table',
    family: 'Table',
    principle: '把项目用表格呈现，字段固定：项目、角色、结果、技术栈、链接。',
    useWhen: '面向招聘或合作方，需要最高扫描效率。',
    mapsTo: ['role', 'impact', 'stack', 'links']
  },
  {
    id: 'timeline-arc',
    title: 'Timeline Arc',
    family: 'Timeline',
    principle: '按年份和阶段展示项目演进，让读者看到能力从工具到系统的升级。',
    useWhen: '个人成长路线比单个项目更重要。',
    mapsTo: ['year', 'tier', 'category']
  },
  {
    id: 'capability-matrix',
    title: 'Capability Matrix',
    family: 'Matrix',
    principle: '用能力维度组织项目，而不是按项目平铺。',
    useWhen: '要回答“我能解决哪些类型的问题”。',
    mapsTo: ['category', 'tags', 'stack']
  },
  {
    id: 'systems-map',
    title: 'Systems Map',
    family: 'Map',
    principle: '把项目看成系统节点，突出数据流、自动化流和用户决策流。',
    useWhen: '项目之间存在共享能力，如 AI、链上、通知、知识库。',
    mapsTo: ['source', 'category', 'highlights']
  },
  {
    id: 'project-dossier',
    title: 'Project Dossier',
    family: 'Dossier',
    principle: '每个项目像档案卡：背景、职责、约束、证据、链接。',
    useWhen: '项目偏工程交付，需要可信而不是炫技。',
    mapsTo: ['story', 'role', 'links']
  },
  {
    id: 'operating-system',
    title: 'Operating System',
    family: 'System',
    principle: '把项目页做成工作台：筛选、索引、状态、详情都在同一屏。',
    useWhen: '个人网站本身要体现系统设计能力。',
    mapsTo: ['tier', 'category', 'stack']
  },
  {
    id: 'hero-then-ledger',
    title: 'Hero Then Ledger',
    family: 'Hybrid',
    principle: '首屏只讲一个最强项目，下面用紧凑账本列出其他项目。',
    useWhen: '有明确主打项目，其他项目作为能力补充。',
    mapsTo: ['tier', 'impact', 'year']
  },
  {
    id: 'recruiter-scan',
    title: 'Recruiter Scan',
    family: 'Hiring',
    principle: '每个项目只保留招聘方最关心的四列：问题、动作、结果、技术。',
    useWhen: '目标是简历和面试转化。',
    mapsTo: ['story.problem', 'story.process', 'story.result', 'stack']
  },
  {
    id: 'proof-stack',
    title: 'Proof Stack',
    family: 'Proof',
    principle: '先给证据，再给解释：运行结果、代码链接、技术栈、再进入故事。',
    useWhen: '需要让读者马上相信项目不是 demo。',
    mapsTo: ['impact', 'links', 'stack']
  },
  {
    id: 'split-feature',
    title: 'Split Feature',
    family: 'Feature',
    principle: '左右分屏：一侧是项目叙事，一侧是技术和证据。',
    useWhen: '首屏项目需要更强展示，但不能变成营销 hero。',
    mapsTo: ['description', 'highlights', 'stack']
  },
  {
    id: 'dense-command-center',
    title: 'Dense Command Center',
    family: 'Dashboard',
    principle: '使用高密度信息布局，像运营后台一样展示项目状态和能力。',
    useWhen: '项目本身偏自动化、监控、交易、情报系统。',
    mapsTo: ['category', 'role', 'impact']
  },
  {
    id: 'archive-ledger',
    title: 'Archive Ledger',
    family: 'Archive',
    principle: '旧作品不占首屏，用紧凑列表保留历史，不稀释核心项目。',
    useWhen: '既要保留旧项目，又要提升精选项目权重。',
    mapsTo: ['tier', 'title', 'links']
  },
  {
    id: 'skills-radar',
    title: 'Skills Radar',
    family: 'Capability',
    principle: '按技术能力聚合项目，让每个能力都有真实项目作为证据。',
    useWhen: '读者需要快速判断技能覆盖面。',
    mapsTo: ['stack', 'tags']
  },
  {
    id: 'decision-trail',
    title: 'Decision Trail',
    family: 'Narrative',
    principle: '把每个项目按“背景 -> 取舍 -> 实现 -> 结果”组织。',
    useWhen: '需要展示思考质量，而不是只展示产物。',
    mapsTo: ['story', 'highlights']
  },
  {
    id: 'constraint-cards',
    title: 'Constraint Cards',
    family: 'Engineering',
    principle: '每个项目强调约束条件和工程边界，让复杂度可见。',
    useWhen: '项目难点来自真实环境、生产风险或隐私边界。',
    mapsTo: ['story.problem', 'role', 'impact']
  },
  {
    id: 'stack-catalog',
    title: 'Stack Catalog',
    family: 'Catalog',
    principle: '按技术栈分组，点击技术栈看到对应项目。',
    useWhen: '目标读者先按技术筛选。',
    mapsTo: ['stack', 'category']
  },
  {
    id: 'featured-triptych',
    title: 'Featured Triptych',
    family: 'Composition',
    principle: '三列展示三类主能力：链上自动化、AI Agent、产品工作台。',
    useWhen: '需要建立清晰的个人定位。',
    mapsTo: ['category', 'tier']
  },
  {
    id: 'case-strip',
    title: 'Case Strip',
    family: 'List',
    principle: '每个项目是一条横向 case strip，左侧编号，右侧完整信息。',
    useWhen: '需要比网格更严肃、更像作品档案。',
    mapsTo: ['title', 'resumeLine', 'impact']
  },
  {
    id: 'link-light',
    title: 'Link Light',
    family: 'Minimal',
    principle: '把视觉降到最低，链接和文字成为主角。',
    useWhen: '项目视觉不统一，强行配图会降低质量。',
    mapsTo: ['links', 'description']
  },
  {
    id: 'project-os-tabs',
    title: 'Project OS Tabs',
    family: 'Interactive',
    principle: '用 tabs 在精选、入选、归档、能力之间切换。',
    useWhen: '项目多，且不同读者有不同入口。',
    mapsTo: ['tier', 'category']
  },
  {
    id: 'scoreboard',
    title: 'Scoreboard',
    family: 'Metrics',
    principle: '用统计面板先展示项目数量、能力分类、公开仓库和归档规模。',
    useWhen: '需要给读者一个整体规模感。',
    mapsTo: ['tier', 'category', 'links']
  },
  {
    id: 'scoreboard-ledger',
    title: 'Scoreboard Ledger',
    family: 'Hybrid',
    principle: '用固定主题进度条建立全局分布，再用主题筛选、内容搜索、网格/列表双视图承载项目浏览。',
    useWhen: '需要让个人项目页同时具备全局规模感、主题导航、快速搜索和简历级扫描效率。',
    mapsTo: ['category', 'title', 'resumeLine', 'impact', 'stack', 'tier']
  },
  {
    id: 'case-study-cards',
    title: 'Case Study Cards',
    family: 'Cards',
    principle: '卡片保留，但每张卡必须有明确的 case study 信息。',
    useWhen: '需要移动端友好，同时保留视觉节奏。',
    mapsTo: ['resumeLine', 'story', 'stack']
  },
  {
    id: 'role-led-index',
    title: 'Role-led Index',
    family: 'Role',
    principle: '按本人角色组织项目，突出你在每个项目里的真实贡献。',
    useWhen: '项目来自不同领域，需要统一成个人能力叙事。',
    mapsTo: ['role', 'category']
  },
  {
    id: 'product-system-shelf',
    title: 'Product System Shelf',
    family: 'Shelf',
    principle: '项目像系统货架：每层一个领域，每个项目是一个产品单元。',
    useWhen: '项目覆盖多个领域但都可产品化。',
    mapsTo: ['category', 'title']
  },
  {
    id: 'one-line-index',
    title: 'One-line Index',
    family: 'Index',
    principle: '每个项目压缩成一行，点击再进入详情。',
    useWhen: '项目总量增加后，需要极高信息密度。',
    mapsTo: ['title', 'resumeLine', 'year']
  },
  {
    id: 'lab-gallery',
    title: 'LAB Gallery',
    family: 'Lab',
    principle: '同一批真实数据用多种布局同时打样，用于比较和迭代。',
    useWhen: '设计系统需要先验证结构，再决定主站采用哪一种。',
    mapsTo: ['all']
  }
]
