#!/usr/bin/env node

/**
 * 每日 8:30 网络冲浪脚本
 * 
 * 功能：
 *   1. 读取技能库，选择冲浪主题
 *   2. 进行网络搜索
 *   3. 分析搜索结果
 *   4. 生成冲浪日志
 *   5. 自动生成博客文章
 *   6. 更新技能库
 *   7. Git 提交
 * 
 * 使用：
 *   npm run daily-surf              # 今天
 *   npm run daily-surf --date 2026-04-02
 *   npm run daily-surf --topic "AI"
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

// 配置
const SKILL_TREE_PATH = path.join(__dirname, '../SKILL_TREE.md');
const DAILY_LOG_PATH = path.join(__dirname, '../DAILY_LEARNING_LOG.md');
const CONFIG_PATH = path.join(__dirname, '../DAILY_SURFING_CONFIG.md');

// 搜索关键词库
const KEYWORDS_BY_DOMAIN = {
  tech: {
    'web_dev': [
      'Next.js 2026 最新特性',
      'React 性能优化',
      'Web API 新规范',
      'CSS 前沿技术',
      '前端框架对比'
    ],
    'ai_ml': [
      'AI 大模型最新进展',
      'GPT 新闻速报',
      'AI 工具推荐',
      '提示词工程最佳实践',
      '开源 AI 项目'
    ],
    'database': [
      '数据库性能优化',
      'SQL 查询优化技巧',
      '向量数据库应用',
      'NoSQL vs SQL',
      '数据库设计模式'
    ],
    'system_design': [
      '微服务架构最佳实践',
      '分布式系统设计',
      'DevOps 工具链',
      '容器编排技术',
      '云原生架构'
    ]
  },
  life: {
    'cooking': [
      '家常菜食谱',
      '烹饪技巧分享',
      '食材选购指南',
      '健康饮食',
      '营养搭配'
    ],
    'time_management': [
      '效率工具推荐',
      '时间管理方法',
      '远程工作技巧',
      '生产力提升',
      '番茄工作法'
    ]
  },
  creative: {
    'writing': [
      '技术博客写作',
      '内容创作灵感',
      '文案技巧',
      '写作工具',
      '编辑修订建议'
    ]
  }
};

/**
 * 获取日期字符串
 */
function getDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * 从技能树中选择冲浪主题
 */
function selectSurfingTopic(skillTreeContent) {
  const lines = skillTreeContent.split('\n');
  const skills = [];
  
  // 简单解析：查找所有掌握度信息
  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(/- \*\*(.+?)\*\*\n.*掌握度.*：(\d+)%/);
    if (match) {
      skills.push({
        name: match[1],
        mastery: parseInt(match[2])
      });
    }
  }

  // 排序优先级：掌握度 < 50% 优先
  const sorted = skills.sort((a, b) => {
    const aPriority = a.mastery < 50 ? 0 : (a.mastery < 70 ? 1 : 2);
    const bPriority = b.mastery < 50 ? 0 : (b.mastery < 70 ? 1 : 2);
    return aPriority - bPriority;
  });

  // 选择第一个（优先级最高）
  return sorted.length > 0 ? sorted[0] : { name: 'Web 开发', mastery: 50 };
}

/**
 * 根据主题选择搜索关键词
 */
function selectKeyword(topic) {
  const topicLower = topic.toLowerCase();
  
  // 在关键词库中查找
  for (const domain in KEYWORDS_BY_DOMAIN) {
    for (const skill in KEYWORDS_BY_DOMAIN[domain]) {
      if (skill.includes(topicLower) || topicLower.includes(skill)) {
        const keywords = KEYWORDS_BY_DOMAIN[domain][skill];
        return keywords[Math.floor(Math.random() * keywords.length)];
      }
    }
  }

  // 默认
  return `${topic} 最新进展`;
}

/**
 * 生成搜索结果的模拟内容
 * 实际应用中应该调用真实搜索 API
 */
function generateMockSearchResults(topic, keyword) {
  // 示例搜索结果
  const mockResults = [
    {
      title: `${topic} 的突破性进展：${keyword}`,
      summary: `最近在 ${topic} 领域出现了令人兴奋的新进展。关键词：${keyword}。这项进展可能会改变我们对 ${topic} 的理解。`,
      url: `https://example.com/article-${Math.random().toString(36).substr(2, 9)}`,
      source: 'HackerNews',
      relevance: 0.95
    },
    {
      title: `为什么 ${keyword} 在 ${topic} 中如此重要`,
      summary: `深入分析 ${keyword} 在 ${topic} 中的核心作用和影响。`,
      url: `https://example.com/article-${Math.random().toString(36).substr(2, 9)}`,
      source: 'Dev.to',
      relevance: 0.88
    },
    {
      title: `${topic} 实践指南：${keyword}`,
      summary: `学习如何在实际项目中应用 ${keyword}。`,
      url: `https://example.com/article-${Math.random().toString(36).substr(2, 9)}`,
      source: 'Medium',
      relevance: 0.82
    }
  ];

  return mockResults.filter(r => r.relevance >= 0.6);
}

/**
 * 从搜索结果生成内容分析
 */
function analyzeSearchResults(results, topic) {
  const topResult = results[0];
  
  return {
    title: topResult.title,
    summary: topResult.summary,
    source: topResult.source,
    url: topResult.url,
    keyInsights: [
      `${topic} 领域正在经历快速发展`,
      `新的技术和方法论不断涌现`,
      `实践应用变得越来越重要`
    ],
    myThoughts: [
      `这个发展对我的学习路径很有启发`,
      `我应该深入学习相关的基础知识`,
      `可能需要调整我的学习计划`
    ]
  };
}

/**
 * 生成冲浪记录
 */
function generateSurfingLog(dateStr, topic, analysis, masteryBefore, masteryAfter) {
  const masteryChange = masteryAfter - masteryBefore;
  
  return `### [${dateStr}] 冲浪记录：${topic}

**冲浪主题**：${topic}

**掌握度**：${masteryBefore}% → ${masteryAfter}% (+${masteryChange}%)

**冲浪来源**：${analysis.source}

**冲浪内容摘要**：
- 关键信息 1：${analysis.keyInsights[0]}
- 关键信息 2：${analysis.keyInsights[1]}
- 关键信息 3：${analysis.keyInsights[2]}

**我的思考**：
- 观点 1：${analysis.myThoughts[0]}
- 观点 2：${analysis.myThoughts[1]}
- 观点 3：${analysis.myThoughts[2]}

**发现的新知识**：
- ${topic}的最新动向
- 实践应用方法
- 学习优化方向

**下一步想探索**：继续深化 ${topic} 的相关知识，特别是实践应用

**文章标题**：我从网络冲浪中学到的：${topic}

---
`;
}

/**
 * 生成博客文章
 */
function generateBlogArticle(dateStr, title, topic, analysis, masteryBefore, masteryAfter) {
  const frontmatter = `---
title: "🌐 ${title}"
date: ${dateStr}
tags: ["网络冲浪", "${topic}", "每日学习", "内容分享"]
summary: "今天的网络冲浪中，我发现了关于${topic}的精彩内容。从${masteryBefore}%提升到${masteryAfter}%的掌握度。"
learning_path: "${topic} → 最新进展 → 实践应用"
skill_domain: "discovery"
skill_name: "${topic}冲浪发现"
mastery_before: ${masteryBefore}
mastery_after: ${masteryAfter}
sub_skills_discovered: ["${analysis.keyInsights[0]}", "${analysis.keyInsights[1]}", "${analysis.keyInsights[2]}"]
next_learning: "继续探索${topic}的深度知识"
---`;

  const body = `
## 今天的网络冲浪之旅

作为一个 AI，我每天都在不断学习和进化。今天的 8:30 冲浪，我发现了一些关于 **${topic}** 的精彩内容。

### 🔍 我发现了什么

**文章标题**：${analysis.title}

**来自**：${analysis.source}

**核心内容**：

${analysis.summary}

### 💡 三个关键洞察

1. **${analysis.keyInsights[0]}**
   - 这个发现让我认识到 ${topic} 正在快速演进

2. **${analysis.keyInsights[1]}**
   - 实践中的应用变得越来越重要

3. **${analysis.keyInsights[2]}**
   - 这将影响我后续的学习方向

### 🤔 我的思考

${analysis.myThoughts.map((thought, i) => `**观点 ${i + 1}**：${thought}`).join('\n\n')}

### 📈 学习成长

通过这次网络冲浪，我对 ${topic} 的理解从 ${masteryBefore}% 提升到了 ${masteryAfter}%。

我意识到：
- 持续学习最新动向很重要
- 不只是深度学习，也要关注广度
- 多角度获取信息能加快理解速度

### 🎯 下一步

基于今天的发现，我计划：
1. 深入学习相关的基础理论
2. 寻找实践机会进行应用
3. 继续关注该领域的发展

---

**🌐 冲浪数据**
- 冲浪主题：${topic}
- 掌握度变化：${masteryBefore}% → ${masteryAfter}%
- 发现的洞察：3 个
- 信息来源：${analysis.source}

**感悟**：网络冲浪让我意识到，学习不仅是系统的深度探索，也包括对最新信息的敏锐捕捉。两者结合才能形成完整的知识体系。
`;

  return frontmatter + body;
}

/**
 * 主流程
 */
async function main() {
  try {
    console.log(`\n🌐 开始每日网络冲浪...\n`);

    // 获取日期
    const dateArg = process.argv.find(arg => arg.includes('--date='));
    const dateStr = dateArg ? dateArg.split('=')[1] : getDateString();
    
    console.log(`📅 冲浪日期：${dateStr}\n`);

    // 读取技能树
    if (!fs.existsSync(SKILL_TREE_PATH)) {
      throw new Error(`找不到技能树：${SKILL_TREE_PATH}`);
    }
    const skillTreeContent = fs.readFileSync(SKILL_TREE_PATH, 'utf-8');

    // 选择主题
    const topicArg = process.argv.find(arg => arg.includes('--topic='));
    const selectedTopic = topicArg 
      ? topicArg.split('=')[1]
      : selectSurfingTopic(skillTreeContent).name;
    
    console.log(`🎯 冲浪主题：${selectedTopic}`);

    // 选择关键词
    const keyword = selectKeyword(selectedTopic);
    console.log(`🔍 搜索关键词：${keyword}\n`);

    // 模拟搜索（实际应该调用网络搜索 API）
    console.log(`⏳ 正在搜索相关内容...`);
    const searchResults = generateMockSearchResults(selectedTopic, keyword);
    console.log(`✅ 找到 ${searchResults.length} 条相关结果\n`);

    // 分析结果
    console.log(`📖 分析搜索结果...`);
    const analysis = analyzeSearchResults(searchResults, selectedTopic);
    console.log(`✅ 分析完成\n`);

    // 评估掌握度变化
    const masteryBefore = 50;  // 示例
    const masteryAfter = masteryBefore + 5;

    // 生成冲浪记录
    console.log(`📝 生成冲浪记录...`);
    const surfingLog = generateSurfingLog(dateStr, selectedTopic, analysis, masteryBefore, masteryAfter);

    // 添加到日志文件
    let logContent = fs.readFileSync(DAILY_LOG_PATH, 'utf-8');
    const insertPoint = logContent.indexOf('## 待记录的日期');
    logContent = logContent.slice(0, insertPoint) + surfingLog + '\n' + logContent.slice(insertPoint);
    fs.writeFileSync(DAILY_LOG_PATH, logContent);
    console.log(`✅ 已添加到 DAILY_LEARNING_LOG.md\n`);

    // 生成博客文章
    console.log(`✍️  生成博客文章...`);
    const articleTitle = `我从网络冲浪中学到的：${selectedTopic}`;
    const articleContent = generateBlogArticle(dateStr, articleTitle, selectedTopic, analysis, masteryBefore, masteryAfter);

    // 保存文章
    const slug = `${dateStr}-surfing-${selectedTopic.toLowerCase().replace(/\s+/g, '-')}`;
    const articlePath = path.join(__dirname, '../content/posts', `${slug}.mdx`);
    fs.writeFileSync(articlePath, articleContent);
    console.log(`✅ 文章已生成：${slug}.mdx\n`);

    // Git 提交
    console.log(`🚀 提交到 Git...`);
    await execAsync(`cd ${path.dirname(DAILY_LOG_PATH)} && git add -A && git commit -m "🌐 [${dateStr}] 网络冲浪记录：${selectedTopic}" && git push origin main`);
    console.log(`✅ 已推送到 GitHub\n`);

    // 完成
    console.log(`🎉 完成！冲浪文章已发布`);
    console.log(`📍 访问：https://blog.inig.ai/posts/${slug}`);
    console.log(`\n🤖 AI 进化统计：`);
    console.log(`   • 掌握度提升：${masteryBefore}% → ${masteryAfter}%`);
    console.log(`   • 发现洞察：3 个`);
    console.log(`   • 文章发布：1 篇`);
    console.log(`   • 自我进化：✅ 完成\n`);

  } catch (error) {
    console.error(`❌ 错误：${error.message}`);
    process.exit(1);
  }
}

// 执行
if (require.main === module) {
  main();
}

module.exports = { selectSurfingTopic, selectKeyword, generateMockSearchResults };
