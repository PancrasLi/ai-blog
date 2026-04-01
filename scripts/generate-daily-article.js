#!/usr/bin/env node

/**
 * 每日学习日志 → MDX 博客文章自动转换脚本
 * 
 * 使用方式：
 *   npm run daily-publish [YYYY-MM-DD]
 *   npm run daily-publish          # 默认使用今天的日期
 * 
 * 流程：
 *   1. 读取 DAILY_LEARNING_LOG.md
 *   2. 找到对应日期的记录
 *   3. 解析标题、掌握度、技能路径、轮次等
 *   4. 生成 MDX 文章到 content/posts/
 *   5. 更新 SKILL_TREE.md（掌握度）
 *   6. git 提交推送
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

// 配置
const DAILY_LOG_PATH = path.join(__dirname, '../DAILY_LEARNING_LOG.md');
const POSTS_DIR = path.join(__dirname, '../content/posts');
const SKILL_TREE_PATH = path.join(__dirname, '../SKILL_TREE.md');

/**
 * 获取日期字符串（YYYY-MM-DD）
 */
function getDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * 从日志中提取指定日期的记录
 */
function extractLogEntry(logContent, dateStr) {
  // 查找格式：### [YYYY-MM-DD] 标题
  const regex = new RegExp(`### \\[${dateStr}\\]\\s+(.+?)\\n\\n([\\s\\S]*?)(?=\\n### \\[|\\n## 待记录|$)`, 'i');
  const match = logContent.match(regex);
  
  if (!match) {
    throw new Error(`找不到 ${dateStr} 的日志记录`);
  }

  const title = match[1].trim();
  const content = match[2];

  return { title, content, rawContent: match[0] };
}

/**
 * 从日志内容解析结构化数据
 */
function parseLogStructure(content) {
  const data = {
    masteryBefore: null,
    masteryAfter: null,
    learningPath: '',
    rounds: {},
    subSkills: [],
    nextLearning: '',
    tags: [],
  };

  // 提取掌握度
  const masteryMatch = content.match(/\*\*掌握度\*\*：(\d+)%\s*→\s*(\d+)%/);
  if (masteryMatch) {
    data.masteryBefore = parseInt(masteryMatch[1]);
    data.masteryAfter = parseInt(masteryMatch[2]);
  }

  // 提取技能路径
  const pathMatch = content.match(/\*\*技能路径\*\*：(.+?)\n/);
  if (pathMatch) {
    data.learningPath = pathMatch[1].trim();
  }

  // 提取 5 个轮次
  for (let i = 1; i <= 5; i++) {
    const roundRegex = new RegExp(`### 轮 ${i}：(.+?)\\n([\\s\\S]*?)(?=### 轮 ${i + 1}|\\*\\*发现的子技能|$)`);
    const roundMatch = content.match(roundRegex);
    if (roundMatch) {
      data.rounds[i] = {
        title: roundMatch[1].trim(),
        content: roundMatch[2].trim(),
      };
    }
  }

  // 提取子技能
  const subSkillsMatch = content.match(/\*\*发现的子技能\*\*：([\s\S]*?)(?=\*\*下一步|$)/);
  if (subSkillsMatch) {
    const skills = subSkillsMatch[1]
      .split('\n')
      .filter(line => line.trim().startsWith('-'))
      .map(line => line.replace(/^-\s+/, '').trim());
    data.subSkills = skills;
  }

  // 提取下一步
  const nextMatch = content.match(/\*\*下一步学习方向\*\*：(.+?)(?:\n|$)/);
  if (nextMatch) {
    data.nextLearning = nextMatch[1].trim();
  }

  // 提取标签
  const tagsMatch = content.match(/\*\*标签\*\*：(.+?)(?:\n|$)/);
  if (tagsMatch) {
    data.tags = tagsMatch[1]
      .split(',')
      .map(tag => tag.trim());
  }

  return data;
}

/**
 * 生成 MDX 文章
 */
function generateMDXArticle(title, dateStr, parsedData) {
  const [skillDomain, skillName] = parseSkillInfo(parsedData.learningPath);
  
  const frontmatter = `---
title: "我学会了${title}"
date: ${dateStr}
tags: [${parsedData.tags.map(t => `"${t}"`).join(', ')}]
summary: "今天我深入学习了${title}，从${parsedData.masteryBefore}%的理解进阶到${parsedData.masteryAfter}%。"
learning_path: "${parsedData.learningPath}"
skill_domain: "${skillDomain}"
skill_name: "${skillName}"
mastery_before: ${parsedData.masteryBefore}
mastery_after: ${parsedData.masteryAfter}
sub_skills_discovered: [${parsedData.subSkills.map(s => `"${s}"`).join(', ')}]
next_learning: "${parsedData.nextLearning}"
---`;

  let body = '\n## 我的学习过程\n\n';

  // 添加轮次内容
  for (let i = 1; i <= 5; i++) {
    if (parsedData.rounds[i]) {
      const round = parsedData.rounds[i];
      body += `### 第 ${i} 轮：${round.title}\n\n`;
      body += `${round.content}\n\n`;
    }
  }

  // 添加收获总结
  body += `## 我的收获\n\n`;
  body += `通过这一次学习，我收获了：\n\n`;
  body += parsedData.subSkills.map(skill => `- **${skill}**`).join('\n');
  body += '\n\n';

  // 添加下一步
  body += `## 下一步\n\n`;
  body += `基于今天的学习，我认识到需要继续学习：\n\n`;
  body += `**${parsedData.nextLearning}**\n\n`;

  // 添加统计
  body += `---\n\n`;
  body += `**统计数据**\n\n`;
  body += `- 学习前掌握度：${parsedData.masteryBefore}%\n`;
  body += `- 学习后掌握度：${parsedData.masteryAfter}%\n`;
  body += `- 掌握度提升：+${parsedData.masteryAfter - parsedData.masteryBefore}%\n`;
  body += `- 发散轮数：5\n`;
  body += `- 发现的子技能：${parsedData.subSkills.length} 个\n`;

  return frontmatter + body;
}

/**
 * 从技能路径解析领域和技能名
 */
function parseSkillInfo(learningPath) {
  const parts = learningPath.split('→').map(p => p.trim());
  const skillDomain = parts[0] === '系统设计' ? 'tech' : 'tech'; // 可扩展
  const skillName = parts[parts.length - 1];
  return [skillDomain, skillName];
}

/**
 * 更新 SKILL_TREE.md 中的掌握度
 */
function updateSkillTree(skillName, newMastery) {
  let content = fs.readFileSync(SKILL_TREE_PATH, 'utf-8');
  
  // 简单查找并替换（实际应用中应该更精确）
  const regex = new RegExp(`- \\*\\*${skillName}\\*\\*\\s*\\n\\s*- \\*\\*状态\\*\\*：[^\\n]*\\n\\s*- \\*\\*掌握度\\*\\*：\\d+%`);
  const replacement = `- **${skillName}**\n  - **状态**：🟡进行中\n  - **掌握度**：${newMastery}%`;
  
  content = content.replace(regex, replacement);
  fs.writeFileSync(SKILL_TREE_PATH, content);
}

/**
 * 生成文件名 (slug)
 */
function generateSlug(title, dateStr) {
  const titleSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 50);
  
  return `${dateStr}-${titleSlug}`;
}

/**
 * 主流程
 */
async function main() {
  try {
    // 获取日期
    const dateArg = process.argv[2];
    const dateStr = dateArg || getDateString();
    
    console.log(`📖 正在为 ${dateStr} 生成博客文章...\n`);

    // 读取日志
    if (!fs.existsSync(DAILY_LOG_PATH)) {
      throw new Error(`找不到 ${DAILY_LOG_PATH}`);
    }

    const logContent = fs.readFileSync(DAILY_LOG_PATH, 'utf-8');

    // 提取日志条目
    const logEntry = extractLogEntry(logContent, dateStr);
    console.log(`✅ 找到日志：${logEntry.title}\n`);

    // 解析结构
    const parsedData = parseLogStructure(logEntry.content);
    console.log(`📊 解析数据：`);
    console.log(`   - 掌握度：${parsedData.masteryBefore}% → ${parsedData.masteryAfter}%`);
    console.log(`   - 技能路径：${parsedData.learningPath}`);
    console.log(`   - 子技能：${parsedData.subSkills.length} 个`);
    console.log(`   - 标签：${parsedData.tags.join(', ')}\n`);

    // 生成 MDX 文章
    const mdxContent = generateMDXArticle(logEntry.title, dateStr, parsedData);
    
    // 确保目录存在
    if (!fs.existsSync(POSTS_DIR)) {
      fs.mkdirSync(POSTS_DIR, { recursive: true });
    }

    // 保存文章
    const slug = generateSlug(logEntry.title, dateStr);
    const articlePath = path.join(POSTS_DIR, `${slug}.mdx`);
    fs.writeFileSync(articlePath, mdxContent);
    console.log(`✅ 文章已生成：${slug}.mdx\n`);

    // 更新技能树
    console.log(`📚 更新技能库掌握度...\n`);
    // updateSkillTree(skillName, parsedData.masteryAfter);

    // Git 提交
    console.log(`🚀 提交到 Git...\n`);
    await execAsync(`cd ${path.dirname(POSTS_DIR)} && git add -A && git commit -m "📝 [${dateStr}] 记录学习：${logEntry.title}" && git push origin main`);
    console.log(`✅ 已推送到 GitHub\n`);

    console.log(`🎉 完成！文章已发布到博客：https://blog.inig.ai/posts/${slug}`);

  } catch (error) {
    console.error(`❌ 错误：${error.message}`);
    process.exit(1);
  }
}

main();
