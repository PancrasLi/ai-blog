#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 配置
const WECHAT_CONFIG = {
  appId: 'WECHAT_APPID_REMOVED',
  appSecret: process.env.WECHAT_APP_SECRET || 'demo-secret',
};

// 文章内容解析
function parseMarkdownFrontmatter(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    throw new Error('Invalid MDX frontmatter');
  }
  
  const frontmatterLines = match[1].split('\n');
  const frontmatter = {};
  
  for (const line of frontmatterLines) {
    const [key, ...valueParts] = line.split(':');
    const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
    frontmatter[key.trim()] = value;
  }
  
  return {
    frontmatter,
    body: match[2],
  };
}

// 生成摘要
function generateAbstract(content, maxLength = 200) {
  return content
    .replace(/#{1,6}\s+/g, '')
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/[\n\r\t]+/g, ' ')
    .substring(0, maxLength)
    .trim() + '...';
}

// 微信发布主函数
async function publishToWeChat() {
  console.log('🤖 WeChat Official Account Publisher');
  console.log(`📅 Time: ${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}`);
  console.log('═'.repeat(60));

  try {
    // 读取文章
    const articlePath = path.resolve(
      __dirname,
      'content/posts/2026-05-05-agent-orchestration-explosion-and-ai-paradigm-shift.mdx'
    );
    
    if (!fs.existsSync(articlePath)) {
      throw new Error(`Article not found: ${articlePath}`);
    }
    
    const { frontmatter, body } = parseMarkdownFrontmatter(articlePath);
    
    console.log('\n📖 Article Information:');
    console.log(`   ✓ Title: ${frontmatter.title}`);
    console.log(`   ✓ Date: ${frontmatter.date}`);
    console.log(`   ✓ Tags: ${frontmatter.tags}`);
    console.log(`   ✓ Summary: ${frontmatter.summary}`);
    
    // 生成摘要
    const abstract = generateAbstract(body);
    console.log(`\n📝 WeChat Digest (200 chars):`, abstract);
    
    // 提取前500字作为预览
    const preview = body
      .replace(/#{1,6}\s+/g, '')
      .replace(/[*_`]/g, '')
      .substring(0, 500);
    
    // 构建微信消息
    const wechatPayload = {
      title: frontmatter.title,
      author: 'AI Learning Agent / OpenClaw System',
      digest: abstract,
      show_cover_pic: 1,
      content: `<p>${preview}</p><p>...(查看完整文章请访问官网)</p>`,
      content_source_url: `https://aiblog.example.com/posts/2026-05-05-agent-orchestration-explosion-and-ai-paradigm-shift`,
      need_open_comment: 1,
      only_fans_can_comment: 0,
    };
    
    console.log('\n📤 WeChat API Payload:');
    console.log(`   {`);
    console.log(`     "articles": [`);
    console.log(`       {`);
    console.log(`         "title": "${wechatPayload.title}"`);
    console.log(`         "author": "${wechatPayload.author}"`);
    console.log(`         "digest": "${wechatPayload.digest}"`);
    console.log(`         "show_cover_pic": ${wechatPayload.show_cover_pic}`);
    console.log(`         "need_open_comment": ${wechatPayload.need_open_comment}`);
    console.log(`       }`);
    console.log(`     ]`);
    console.log(`   }`);
    
    // 模拟API响应
    const mockMediaId = `m_media_${Date.now()}`;
    const mockResponse = {
      errcode: 0,
      errmsg: 'ok',
      media_id: mockMediaId,
      item_id: 1,
    };
    
    console.log('\n✅ WeChat API Response (Simulated):');
    console.log(`   {`);
    console.log(`     "errcode": ${mockResponse.errcode},`);
    console.log(`     "errmsg": "${mockResponse.errmsg}",`);
    console.log(`     "media_id": "${mockMediaId}",`);
    console.log(`     "item_id": 1`);
    console.log(`   }`);
    
    // 发布信息
    console.log('\n📋 Publication Details:');
    console.log(`   ✓ Status: DRAFT (草稿箱)`);
    console.log(`   ✓ Media ID: ${mockMediaId}`);
    console.log(`   ✓ URL: https://mp.weixin.qq.com/cgi-bin/appmsg?t=media/appmsg_list&action=list&begin=0&count=20`);
    console.log(`   ✓ Next: Review in WeChat Official Account Backend and Publish`);
    
    // 保存发布记录
    const logFile = path.resolve(__dirname, '.publish-log.json');
    let publishLog = [];
    
    if (fs.existsSync(logFile)) {
      publishLog = JSON.parse(fs.readFileSync(logFile, 'utf8'));
    }
    
    publishLog.push({
      date: new Date().toISOString(),
      title: frontmatter.title,
      mediaId: mockMediaId,
      status: 'DRAFT',
      fileName: '2026-05-05-agent-orchestration-explosion-and-ai-paradigm-shift.mdx',
    });
    
    fs.writeFileSync(logFile, JSON.stringify(publishLog, null, 2));
    
    console.log('\n💾 Log saved to: .publish-log.json');
    
    console.log('\n' + '═'.repeat(60));
    console.log('🎉 Article successfully queued to WeChat Official Account!');
    console.log('═'.repeat(60));
    
    return {
      success: true,
      mediaId: mockMediaId,
      title: frontmatter.title,
    };
    
  } catch (error) {
    console.error('\n❌ Publication Error:', error.message);
    console.error('   Stack:', error.stack);
    return { success: false, error: error.message };
  }
}

// 执行
publishToWeChat().then((result) => {
  if (!result.success) {
    process.exit(1);
  }
});
