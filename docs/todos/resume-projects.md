# 简历级项目展示初稿 Todo

## 阶段一：计划与任务文档

- [x] 创建 `docs/plan.md` 作为 Plan 纲领。
- [x] 创建 `docs/todo.md` 作为 Todo 纲领。
- [x] 创建详细子 plan：`docs/plans/resume-projects.md`。
- [x] 创建详细子 todo：`docs/todos/resume-projects.md`。

## 阶段二：项目数据

- [x] 更新 `data/projects.json`，新增本次选定的 9 个简历级项目。
- [x] 保留原有旧作品，并标记为 `archive` 归档项目。
- [x] 为 6 个第一梯队项目补齐 `tier`、`role`、`resumeLine`、`impact`、`stack`、`highlights`、`story`。
- [x] 为 3 个第二梯队项目补齐 `tier`、`role`、`resumeLine`、`impact`、`stack`、`highlights`、`story`。
- [x] 检查所有 `links` 字段，不编造不存在的公开链接。

## 阶段三：项目列表页

- [x] 更新 `pages/projects/index.js`，支持新项目数据结构。
- [x] 将列表页改成“精选项目 + 入选项目 + 早期作品归档”的信息结构。
- [x] 保留并调整分类筛选逻辑。
- [x] 项目卡片展示角色、简历表达、影响结果和技术栈。
- [x] 移除以图片为主的作品墙视觉权重。

## 阶段四：项目详情页

- [x] 更新 `pages/projects/[id].js`，支持新字段。
- [x] 详情页展示项目定位、角色、技术栈、关键能力、影响结果。
- [x] 详情页展示问题、过程、结果。
- [x] 外部链接仅在字段存在时展示。
- [x] 保留下一个项目导航。

## 阶段五：验证与收尾

- [x] 运行 `npm run build`。
- [x] 验证 `/projects/` 可访问。
- [x] 验证第一梯队详情页可访问。
- [x] 验证第二梯队详情页可访问。
- [x] 检查 `git status`，确认改动范围。
- [x] 将本 todo 中已完成任务全部勾选。
