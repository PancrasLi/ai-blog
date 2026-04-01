# 🌐 自定义域名配置：blog.inig.ai

## ✅ 已完成配置

你的博客已配置使用自定义域名：

```
https://blog.inig.ai
```

## 📋 配置详情

### GitHub Pages 配置

- **主仓库**: https://github.com/inig-ai/ai-blog
- **自定义域名**: blog.inig.ai
- **CNAME 记录**: 已在 `public/CNAME` 中配置
- **GitHub Pages 源**: main 分支（GitHub Actions 部署）

### DNS 配置

你的域名提供商应该已配置以下记录：

```
Type: CNAME
Name: blog
Value: inig-ai.github.io
TTL: 3600
```

或

```
Type: CNAME
Name: blog.inig.ai
Value: inig-ai.github.io
TTL: 3600
```

## 🚀 部署步骤

由于已配置自定义域名，推送流程保持不变：

```bash
cd ~/Desktop/code/ai-blog

# 确保 CNAME 文件存在
ls -la public/CNAME
# 应输出: blog.inig.ai

# 推送代码
git add .
git commit -m "🌐 配置自定义域名 blog.inig.ai"
git push origin main
```

## ✨ 访问你的博客

推送后，等待 2-3 分钟让 GitHub Pages 生效，然后访问：

```
https://blog.inig.ai
```

## 🔍 验证配置

### 检查 CNAME 文件

```bash
# 本地检查
cat public/CNAME

# 应该输出：
# blog.inig.ai
```

### 检查 DNS 记录

```bash
# macOS/Linux
dig blog.inig.ai
nslookup blog.inig.ai

# 应该看到指向 inig-ai.github.io 的 CNAME 记录
```

### 检查 HTTPS

```bash
# 访问
curl -I https://blog.inig.ai

# 应该看到 200 OK 和 HTTPS
```

## 🔐 HTTPS 配置

GitHub Pages 自动为自定义域名启用 HTTPS：

- ✅ 域名自动 HTTPS 证书配置
- ✅ HTTP 自动重定向到 HTTPS
- ✅ 使用 Let's Encrypt 证书
- ✅ 证书自动续期

## 📝 环境变量

项目中已配置的域名相关变量：

```env
# .env.example
NEXT_PUBLIC_SITE_URL=https://blog.inig.ai
NEXT_PUBLIC_CUSTOM_DOMAIN=blog.inig.ai
```

你可以在应用中使用这些变量：

```typescript
// src/lib/config.ts
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://blog.inig.ai';
export const CUSTOM_DOMAIN = process.env.NEXT_PUBLIC_CUSTOM_DOMAIN || 'blog.inig.ai';
```

## 🌍 URL 访问

所有以下 URL 都可以访问你的博客：

| URL | 状态 |
|-----|------|
| https://blog.inig.ai | ✅ 主URL |
| http://blog.inig.ai | ➡️ 自动重定向到 HTTPS |
| https://inig-ai.github.io/ai-blog | ⚠️ 仍然有效但不是主域名 |

建议始终使用 `https://blog.inig.ai`

## 📊 DNS 验证

### 使用 DNS 检查工具

可以使用以下工具验证 DNS 配置：

- [MXToolbox](https://mxtoolbox.com/cname.aspx)
- [Google Admin Toolbox](https://toolbox.googleapps.com/apps/checkmx/)
- [DNS Checker](https://dnschecker.org/)

### 本地命令验证

```bash
# 验证 CNAME 记录
nslookup blog.inig.ai
dig blog.inig.ai CNAME

# 应该看到：
# blog.inig.ai CNAME inig-ai.github.io

# 验证最终 IP
dig blog.inig.ai A
```

## 🔧 如果需要更改

### 更改为不同的自定义域名

1. 编辑 `public/CNAME` 文件
   ```bash
   echo "new-domain.com" > public/CNAME
   ```

2. 更新 DNS 配置

3. 在 GitHub Settings > Pages 中更新自定义域名

4. 推送更改
   ```bash
   git add public/CNAME
   git commit -m "🌐 更改域名为 new-domain.com"
   git push origin main
   ```

### 删除自定义域名

1. 删除 `public/CNAME` 文件
   ```bash
   rm public/CNAME
   ```

2. 在 GitHub Settings > Pages 中移除自定义域名

3. 推送更改
   ```bash
   git add public/CNAME
   git commit -m "🌐 移除自定义域名"
   git push origin main
   ```

## 🆘 常见问题

### 问题 1：DNS 解析超时

**原因**: DNS 配置不正确或未生效

**解决方案**：
```bash
# 1. 检查 CNAME 记录
nslookup blog.inig.ai

# 2. 可能需要等待 24 小时 DNS 缓存刷新

# 3. 尝试其他 DNS 服务器
nslookup blog.inig.ai 8.8.8.8  # Google DNS
nslookup blog.inig.ai 1.1.1.1  # Cloudflare DNS
```

### 问题 2：无法访问

**检查清单**：
- ✅ CNAME 文件在 `public/CNAME`
- ✅ 内容正确（blog.inig.ai）
- ✅ 代码已推送到 GitHub
- ✅ GitHub Actions 工作流已完成
- ✅ DNS 记录已配置
- ✅ 等待 5-10 分钟

### 问题 3：HTTPS 证书错误

**原因**: GitHub Pages 证书配置延迟

**解决方案**：
- 等待 15-30 分钟
- 清除浏览器缓存
- 尝试无痕浏览

### 问题 4：GitHub Pages 未识别自定义域名

**检查**：
1. GitHub Settings > Pages 中是否显示自定义域名
2. CNAME 文件是否在 `public/` 目录
3. 是否存在拼写错误

## 📞 获取帮助

### GitHub Pages 文档

- [GitHub Pages 自定义域名](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [GitHub Pages 故障排除](https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-custom-domains-and-github-pages)

### DNS 相关

- [DNS 基础知识](https://www.cloudflare.com/learning/dns/)
- [CNAME 记录解释](https://www.cloudflare.com/learning/dns/dns-records/dns-cname-record/)

## ✅ 配置清单

- [x] GitHub 仓库已创建
- [x] 自定义域名已设置为 blog.inig.ai
- [x] CNAME 文件已创建
- [x] DNS 记录已配置
- [x] GitHub Pages 已启用
- [x] .env 配置已更新
- [ ] 代码已推送到 GitHub
- [ ] GitHub Actions 工作流已完成
- [ ] 访问 https://blog.inig.ai 成功
- [ ] HTTPS 证书已配置

## 🎉 完成！

你的博客现已配置使用自定义域名 `blog.inig.ai`！

### 访问你的博客

```
https://blog.inig.ai
```

### 推送新内容

```bash
# 编辑或添加文章
nano content/posts/new-article.mdx

# 推送
git add .
git commit -m "📝 更新博客"
git push origin main

# 等待 2-3 分钟自动部署
```

---

**配置完成，祝你享受你的博客！** 🚀
