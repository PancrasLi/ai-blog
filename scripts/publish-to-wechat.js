#!/usr/bin/env node

/**
 * 微信公众号自动发布脚本
 * WeChat Official Account Auto-Publishing Script
 * 
 * 功能:
 * 1. 获取微信 access_token
 * 2. 上传封面图片
 * 3. 创建图文消息草稿
 * 4. 发布草稿到公众号
 */

import fs from 'fs';
import path from 'path';
import https from 'https';

const WECHAT_API = 'https://api.weixin.qq.com/cgi-bin';
const APPID = process.env.WECHAT_APPID || 'wxd5ac70de16cefeef';
const APPSECRET = process.env.WECHAT_APPSECRET;

// ====================== 核心方法 ======================

/**
 * 获取 access_token
 */
async function getAccessToken() {
  return new Promise((resolve, reject) => {
    if (!APPSECRET) {
      reject(new Error('❌ WECHAT_APPSECRET not set. Please configure in .env.wechat'));
      return;
    }

    const url = `${WECHAT_API}/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`;
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.errcode) {
            reject(new Error(`❌ WeChat API Error: ${json.errmsg}`));
          } else {
            resolve(json.access_token);
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

/**
 * 上传图片到微信
 */
async function uploadImage(accessToken, imagePath, type = 'news') {
  return new Promise((resolve, reject) => {
    const url = `${WECHAT_API}/media/upload?access_token=${accessToken}&type=${type}`;
    
    if (!fs.existsSync(imagePath)) {
      reject(new Error(`❌ Image not found: ${imagePath}`));
      return;
    }

    const fileStream = fs.createReadStream(imagePath);
    const boundary = `----FormBoundary${Date.now()}`;
    
    const options = new URL(url);
    const req = https.request({
      hostname: options.hostname,
      path: options.pathname + options.search,
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.media_id) {
            resolve(json.media_id);
          } else {
            reject(new Error(`❌ Upload failed: ${json.errmsg}`));
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);

    // Write multipart form data
    req.write(`--${boundary}\r\nContent-Disposition: form-data; name="media"; filename="${path.basename(imagePath)}"\r\nContent-Type: image/png\r\n\r\n`);
    
    fileStream.pipe(req);
    fileStream.on('end', () => {
      req.write(`\r\n--${boundary}--\r\n`);
      req.end();
    });
  });
}

/**
 * 创建微信草稿
 */
async function createDraft(accessToken, title, content, author, thumbMediaId) {
  return new Promise((resolve, reject) => {
    const url = `${WECHAT_API}/draft/add?access_token=${accessToken}`;

    const body = JSON.stringify({
      articles: [
        {
          title: title,
          author: author,
          digest: content.substring(0, 100) + '...',
          show_cover_pic: 1,
          content: content,
          content_source_url: '',
          thumb_media_id: thumbMediaId,
        }
      ]
    });

    const options = new URL(url);
    const req = https.request({
      hostname: options.hostname,
      path: options.pathname + options.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.media_id) {
            resolve(json.media_id);
          } else {
            reject(new Error(`❌ Draft creation failed: ${json.errmsg}`));
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);

    req.write(body);
    req.end();
  });
}

/**
 * 发布草稿
 */
async function publishDraft(accessToken, mediaId) {
  return new Promise((resolve, reject) => {
    const url = `${WECHAT_API}/draft/publish?access_token=${accessToken}`;

    const body = JSON.stringify({
      media_id: mediaId,
      index: 0,
      publish_state: 'show',
    });

    const options = new URL(url);
    const req = https.request({
      hostname: options.hostname,
      path: options.pathname + options.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.publish_id) {
            resolve(json.publish_id);
          } else {
            reject(new Error(`❌ Publish failed: ${json.errmsg}`));
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);

    req.write(body);
    req.end();
  });
}

/**
 * 读取 MDX 文件并提取内容
 */
function extractArticleContent(mdxFilePath) {
  const content = fs.readFileSync(mdxFilePath, 'utf-8');
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  
  if (!frontmatterMatch) {
    throw new Error('❌ No frontmatter found in MDX file');
  }

  const frontmatter = {};
  frontmatterMatch[1].split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      frontmatter[key.trim()] = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
    }
  });

  const articleContent = content.replace(/^---\n[\s\S]*?\n---\n/, '');
  
  return {
    title: frontmatter.title || 'Untitled',
    author: frontmatter.author || 'Claude AI',
    description: frontmatter.description || '',
    content: articleContent,
  };
}

// ====================== 主程序 ======================

async function main() {
  console.log('🚀 开始微信公众号发布流程 | Starting WeChat Publishing...\n');

  try {
    // 1. 获取最新发布的文章
    const articlesDir = path.join(process.cwd(), 'content/posts');
    const files = fs.readdirSync(articlesDir)
      .filter(f => f.endsWith('.mdx') && f.startsWith('202'))
      .sort((a, b) => b.localeCompare(a)); // 按日期倒序排列

    const latestFile = files[0];
    console.log(`📄 Latest article: ${latestFile}`);

    const articlePath = path.join(articlesDir, latestFile);
    const articleData = extractArticleContent(articlePath);

    console.log(`📝 Title: ${articleData.title}\n`);

    // 2. 检查配置
    if (!APPSECRET) {
      console.log('⚠️  微信 AppSecret 未配置 | WeChat AppSecret not configured');
      console.log('📋 配置说明 | Setup Instructions:');
      console.log('   1. 复制 .env.wechat 到 .env.wechat.local');
      console.log('   2. 填入你的 AppSecret: https://mp.weixin.qq.com/');
      console.log('   3. 运行此脚本\n');
      console.log(`✅ Draft created locally at: /tmp/wechat-draft-${Date.now()}.json\n`);
      
      // 保存为本地草稿
      const draftPath = `/tmp/wechat-draft-${Date.now()}.json`;
      fs.writeFileSync(draftPath, JSON.stringify({
        title: articleData.title,
        author: articleData.author,
        digest: articleData.description,
        content: articleData.content,
        timestamp: new Date().toISOString(),
        appid: APPID,
      }, null, 2));
      
      console.log(`📦 Draft saved to: ${draftPath}`);
      console.log('📤 Ready for manual upload or automated publishing once credentials are set.\n');
      return;
    }

    // 3. 获取 access_token
    console.log('🔑 Fetching access_token...');
    const accessToken = await getAccessToken();
    console.log('✅ access_token obtained\n');

    // 4. 上传默认封面
    console.log('📷 Uploading cover image...');
    const defaultCoverPath = path.join(process.cwd(), 'public/og-image.png');
    let thumbMediaId;
    
    if (fs.existsSync(defaultCoverPath)) {
      thumbMediaId = await uploadImage(accessToken, defaultCoverPath);
      console.log(`✅ Cover uploaded: ${thumbMediaId}\n`);
    } else {
      console.log('⚠️  Default cover not found, using title only\n');
      thumbMediaId = '';
    }

    // 5. 创建草稿
    console.log('📝 Creating draft in WeChat...');
    const mediaId = await createDraft(
      accessToken,
      articleData.title,
      articleData.content,
      articleData.author,
      thumbMediaId
    );
    console.log(`✅ Draft created: media_id = ${mediaId}\n`);

    // 6. 发布草稿（可选）
    // 默认不自动发布，允许手动审核
    console.log('📋 Draft Status:');
    console.log(`   Media ID: ${mediaId}`);
    console.log(`   Title: ${articleData.title}`);
    console.log(`   Author: ${articleData.author}`);
    console.log(`\n💡 Tip: You can publish this draft manually from WeChat Official Account backend\n`);

    // 7. 保存发布记录
    const record = {
      timestamp: new Date().toISOString(),
      article: latestFile,
      title: articleData.title,
      mediaId: mediaId,
      thumbMediaId: thumbMediaId,
      status: 'draft',
    };

    const recordFile = path.join(process.cwd(), 'scripts/wechat-publish-record.json');
    let records = [];
    if (fs.existsSync(recordFile)) {
      records = JSON.parse(fs.readFileSync(recordFile, 'utf-8'));
    }
    records.push(record);
    fs.writeFileSync(recordFile, JSON.stringify(records, null, 2));

    console.log('✅ 发布流程完成 | Publishing process completed!');
    console.log(`📊 Record saved to: ${recordFile}\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
