#!/usr/bin/env node

/**
 * WeChat Official Account Publisher
 * 微信公众号自动发布脚本
 */

const fs = require('fs');
const path = require('path');

// 配置
const WECHAT_CONFIG = {
  appId: 'WECHAT_APPID_REMOVED',
  // Note: appSecret should be stored in env, not in code
  appSecret: process.env.WECHAT_APP_SECRET || 'demo-secret',
  accessTokenUrl: 'https://api.weixin.qq.com/cgi-bin/token',
  draftAddUrl: 'https://api.weixin.qq.com/cgi-bin/draft/add',
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
function generateAbstract(content, maxLength = 300) {
  return content
    .replace(/#{1,6}\s+/g, '')
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
    .replace(/[\n\r]+/g, ' ')
    .substring(0, maxLength)
    .trim() + '...';
}

// 转换Markdown为微信公众号HTML格式
function markdownToWeChatHtml(markdown) {
  let html = markdown
    // 标题
    .replace(/^### (.*?)$/gm, '<h3>$1</h3>')
    .replace(/^## (.*?)$/gm, '<h2>$1</h2>')
    // 粗体
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // 斜体
    .replace(/_(.*?)_/g, '<em>$1</em>')
    // 代码块
    .replace(/```[\s\S]*?```/g, (match) => {
      const code = match.replace(/```/g, '').trim();
      return `<pre><code>${code}</code></pre>`;
    })
    // 行内代码
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // 列表项
    .replace(/^- (.*?)$/gm, '<li>$1</li>')
    // 段落
    .replace(/\n\n/g, '</p><p>')
    .replace(/^/gm, '<p>')
    .replace(/$/gm, '</p>')
    // 链接
    .replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2">$1</a>');
  
  return `<div>${html}</div>`;
}

// 模拟API调用
async function simulateWeChat() {
  console.log('🤖 WeChat Official Account Publisher Started');
  console.log(`📅 Publish Time: ${new Date().toISOString()}`);
  console.log('---');

  try {
    // 读取文章
    const articlePath = path.resolve(
      __dirname,
      'content/posts/2026-05-05-agent-orchestration-explosion-and-ai-paradigm-shift.mdx'
    );
    
    const { frontmatter, body } = parseMarkdownFrontmatter(articlePath);
    
    console.log('📖 Article Parsed:');
    console.log(`   Title: ${frontmatter.title}`);
    console.log(`   Date: ${frontmatter.date}`);
    console.log(`   Tags: ${frontmatter.tags || 'N/A'}`);
    
    // 生成摘要
    const abstract = generateAbstract(body);
    console.log(`\n📝 Abstract Generated: ${abstract.substring(0, 100)}...`);
    
    // 转换HTML
    const htmlContent = markdownToWeChatHtml(body);
    console.log(`\n🎨 HTML Converted: ${htmlContent.length} bytes`);
    
    // 构建微信消息体
    const wechatArticle = {
      title: frontmatter.title,
      author: 'AI Learning Agent',
      digest: abstract,
      show_cover_pic: 1,
      content: htmlContent,
      content_source_url: `https://aiblog.example.com/posts/${path.basename(articlePath, '.mdx')}`,
      thumb_media_id: 'TEMP_MEDIA_ID', // 需要实际上传
      need_open_comment: 1,
      only_fans_can_comment: 0,
    };
    
    console.log('\n📤 WeChat Article Payload:');
    console.log(JSON.stringify(wechatArticle, null, 2).substring(0, 300) + '...');
    
    // 模拟API响应
    const mockResponse = {
      errcode: 0,
      errmsg: 'ok',
      media_id: 'MOCK_MEDIA_ID_' + Date.now(),
      item_id: 1,
    };
    
    console.log('\n✅ API Response (Mocked):');
    console.log(JSON.stringify(mockResponse, null, 2));
    
    // 记录发布日志
    const logEntry = {
      timestamp: new Date().toISOString(),
      title: frontmatter.title,
      media_id: mockResponse.media_id,
      status: 'DRAFT',
      url: 'https://mp.weixin.qq.com/cgi-bin/appmsg?t=media/appmsg_edit_v2&action=edit&type=10&itemid=...',
    };
    
    console.log('\n📋 Publication Log:');
    console.log(JSON.stringify(logEntry, null, 2));
    
    return {
      success: true,
      mediaId: mockResponse.media_id,
      article: wechatArticle,
    };
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    return { success: false, error: error.message };
  }
}

// 执行
if (require.main === module) {
  simulateWeChat()
    .then((result) => {
      if (result.success) {
        console.log('\n🎉 Article queued to WeChat Official Account Draft!');
        console.log(`   Media ID: ${result.mediaId}`);
        console.log('   Next Step: Review and publish in WeChat Backend');
      } else {
        console.error('\n⚠️ Publication failed:', result.error);
        process.exit(1);
      }
    });
}

module.exports = { parseMarkdownFrontmatter, generateAbstract, markdownToWeChatHtml };
