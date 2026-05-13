# Skills 聚合站指南

## 概述

Skills 聚合站是 inig.ai 的新增功能模块，用于收集、整理和展示高质量的 AI Skills。

**路径**: `/skills`
**源目录**: `/content/skills/`
**组件**: `src/components/SkillCard.tsx`
**数据文件**: `content/skills/index.json`

---

## 项目结构

```
/content/skills/
├── index.json              # Skills 总索引 (JSON 格式)
├── xlsx.mdx               # 单个 Skill 详情页
├── pdf.mdx                # 单个 Skill 详情页
└── [slug].mdx             # 其他 Skill 详情页

/src/app/skills/
├── page.tsx               # Skills 列表页
├── [slug]/
│   └── page.tsx          # Skill 详情页
└── layout.tsx            # 布局

/src/lib/
├── iconUtils.ts          # SVG 图标工具

/src/components/
└── SkillCard.tsx         # Skill 卡片组件
```

---

## 数据结构

### index.json 结构

```json
{
  "version": "1.0.0",
  "lastUpdated": "ISO-8601 时间戳",
  "totalSkills": 8,
  "skills": [
    {
      "id": "unique-id",
      "slug": "skill-slug",
      "title": "Skill 标题",
      "category": "分类",
      "description": "简短描述",
      "tags": ["tag1", "tag2"],
      "icon": "icon-name",
      "rating": 4.8,
      "downloads": 1250,
      "sourceUrl": "来源链接",
      "source": "clawhub.ai",
      "lastUpdated": "2026-05-13",
      "featured": true
    }
  ]
}
```

### MDX 文件结构

```markdown
---
title: "Skill 标题"
slug: "skill-slug"
category: "分类"
description: "简短描述"
tags: ["tag1", "tag2"]
icon: "icon-name"
rating: 4.8
downloads: 1250
sourceUrl: "来源链接"
source: "clawhub.ai"
lastUpdated: "2026-05-13"
featured: true
---

## 介绍
Skill 简介和核心功能...

## 使用场景
- 场景 1
- 场景 2

## 使用方式

### 在 Claude Code 中引入
代码示例和步骤...

### 在 Cursor 中引入
代码示例和步骤...

### 在 OpenClaw 中引入
代码示例和步骤...

## 常见问题

**Q: 问题1？**
A: 答案1

## 相关链接

- 文档链接
- GitHub 链接
```

---

## 图标支持

当前支持的 SVG 图标：

- `table` - 表格/电子表格
- `file` - 文件/PDF
- `search` - 搜索/网络
- `book` - 书籍/阅读
- `file-text` - 文本文件
- `presentation` - 演示文稿
- `star` - 星标/评分
- `settings` - 设置/系统
- `database` - 数据库
- `network` - 网络
- `code` - 代码
- `cloud` - 云服务

添加新图标请编辑 `src/lib/iconUtils.ts`。

---

## 分类管理

当前支持的分类：

1. **文档处理** - 处理 Word、Excel、PDF、PPT 等文档
2. **网络工具** - 网页搜索、内容提取等
3. **AI工具** - AI 相关的工具和框架
4. **系统工具** - 系统配置、环境设置等

---

## 每日更新流程

### 配置自动更新任务

在 Gateway Cron 配置中添加任务：

```json
{
  "name": "每日 Skills 聚合更新",
  "schedule": {
    "kind": "cron",
    "expr": "0 9 * * *",
    "tz": "Asia/Shanghai"
  },
  "sessionTarget": "isolated",
  "payload": {
    "kind": "agentTurn",
    "message": "执行 Skills 聚合流程：\n\n1. 【搜索排名靠前的 Skills】\n   - 从 ClawHub.ai 官方目录搜索\n   - 从 GitHub Trending 检查\n   - 从 Product Hunt 收集\n   - 搜索关键词：'skill', 'agent', 'tool', 'automation'\n\n2. 【提取 Skill 信息】\n   - Skill 名称和描述\n   - 功能和用途\n   - 评分和下载数\n   - 来源链接\n\n3. 【去重检查】\n   - 比对现有的 Skills\n   - 基于名称和功能描述进行模糊匹配\n   - 移除重复的 Skills\n\n4. 【生成详情页面】\n   - 使用模板创建 MDX 文件\n   - 包含完整的使用说明\n   - 三种集成方式：Claude Code、Cursor、OpenClaw\n\n5. 【更新索引】\n   - 更新 content/skills/index.json\n   - 更新 totalSkills 统计\n   - 更新 lastUpdated 时间戳\n\n6. 【发布更新】\n   - npm run build 验证编译\n   - git add . && git commit -m \"feat: Daily skills aggregation update\"\n   - git push origin main\n\n7. 【推送报告】\n   - 报告新增 Skills 数量\n   - 报告去重处理情况\n   - 发送给用户(work_code:V0014776)",
    "timeoutSeconds": 600,
    "thinking": "extended"
  },
  "delivery": {
    "mode": "announce",
    "channel": "yach",
    "to": "work_code:V0014776"
  }
}
```

---

## 去重策略

### 去重规则

1. **精确匹配** - 完全相同的名称
2. **模糊匹配** - 名称相似度 > 80%（使用 Levenshtein 距离）
3. **功能匹配** - 功能描述相同，但名称不同
4. **来源判断** - 来自同一来源的相同 Skill

### 实现步骤

```typescript
function deduplicateSkills(newSkills: Skill[], existingSkills: Skill[]): Skill[] {
  const deduplicated: Skill[] = [];
  const existingNames = new Set(existingSkills.map(s => s.title.toLowerCase()));
  
  for (const skill of newSkills) {
    // 精确匹配
    if (!existingNames.has(skill.title.toLowerCase())) {
      // 模糊匹配检查
      const isSimilar = existingSkills.some(existing =>
        levenshteinDistance(skill.title, existing.title) < skill.title.length * 0.2
      );
      
      if (!isSimilar) {
        deduplicated.push(skill);
      }
    }
  }
  
  return deduplicated;
}
```

---

## 质量标准

### Skill 入选标准

- [ ] 功能清晰，有明确的使用场景
- [ ] 文档完整，包含示例代码
- [ ] 三种集成方式都有说明
- [ ] 评分 >= 4.0（如果有评分）
- [ ] 活跃维护（最后更新时间 < 6 个月）

---

## 手动添加 Skill

### 步骤

1. **编辑 index.json**

```bash
nano content/skills/index.json
```

添加新 Skill 到 `skills` 数组：

```json
{
  "id": "new-skill-id",
  "slug": "new-skill-slug",
  "title": "New Skill Title",
  "category": "分类",
  "description": "描述",
  "tags": ["tag1", "tag2"],
  "icon": "icon-name",
  "rating": 4.5,
  "downloads": 500,
  "sourceUrl": "https://...",
  "source": "clawhub.ai",
  "lastUpdated": "2026-05-13",
  "featured": false
}
```

2. **创建 MDX 详情页**

```bash
cp content/skills/xlsx.mdx content/skills/[new-slug].mdx
```

编辑新创建的文件，更新内容。

3. **更新统计**

```bash
# 修改 index.json 中的 totalSkills 和 lastUpdated
```

4. **测试和部署**

```bash
npm run build
git add .
git commit -m "feat: Add new skill [skill-name]"
git push origin main
```

---

## 常见问题

**Q: 如何处理某个 Skill 已过时？**
A: 将 `featured` 设为 `false` 或移除该 Skill，然后提交更新。

**Q: 去重算法是否会误删不同的 Skill？**
A: 去重使用多级匹配，包含名称、功能、来源等维度，误删概率很低。

**Q: 是否支持手动标记 Skill 质量？**
A: 支持。通过调整 `rating` 和 `featured` 字段来标记高质量 Skills。

**Q: 如何添加新的图标？**
A: 编辑 `src/lib/iconUtils.ts`，在 `icons` 对象中添加新的 SVG 图标。

---

## 部署清单

- [ ] 所有 Skills 已添加到 index.json
- [ ] 每个 Skill 都有对应的 .mdx 文件
- [ ] 所有图标都在 iconUtils.ts 中定义
- [ ] 导航菜单已更新（Skills 链接）
- [ ] 本地测试通过 (`npm run dev`)
- [ ] 生产构建通过 (`npm run build`)
- [ ] Git 提交已推送
- [ ] 网站正常访问 (https://blog.inig.ai/skills)

---

更新时间: 2026-05-13 10:08 UTC+8
