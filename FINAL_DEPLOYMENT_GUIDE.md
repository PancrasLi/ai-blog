# 🚀 最终部署指南 - AI Blog

## 📋 配置完成信息

项目已完全准备就绪，所有配置已更新为：

| 项 | 值 |
|----|-----|
| **GitHub 用户名** | inig-ai |
| **仓库名** | ai-blog |
| **仓库地址** | https://github.com/inig-ai/ai-blog |
| **自定义域名** | blog.inig.ai |
| **博客访问地址** | https://blog.inig.ai |
| **GitHub Pages 备用** | https://inig-ai.github.io/ai-blog |

## ✅ 已配置项目

- ✅ 现代技术栈（Next.js 15 + React 18 + TypeScript）
- ✅ 美观 UI（Shadcn/UI + Tailwind CSS）
- ✅ 内容管理（Velite + MDX）
- ✅ 自动部署（GitHub Actions）
- ✅ 自定义域名（blog.inig.ai）
- ✅ HTTPS 支持
- ✅ SEO 优化
- ✅ 深色模式
- ✅ 响应式设计

## 🎯 推送步骤（5 步）

### 第 1 步：创建 GitHub 仓库

1. 访问 https://github.com/new
2. 填写信息：
   ```
   Repository name: ai-blog
   Description: 现代无服务博客系统
   Visibility: Public ✅
   ```
3. **不要**选择"Add a README"或其他文件
4. 点击 **Create repository**

### 第 2 步：验证本地 Git 配置

```bash
cd ~/Desktop/code/ai-blog

# 验证 Git 配置
git config user.name
git config user.email

# 应该输出：
# inig-ai
# inig-ai@inig.ai

# 验证远程
git remote -v
# 应该显示 origin 指向 https://github.com/inig-ai/ai-blog.git
```

### 第 3 步：推送代码到 GitHub

```bash
cd ~/Desktop/code/ai-blog

# 首次推送到 main 分支
git push -u origin main

# 可能需要输入 GitHub 凭证
# 如果提示输入密码，使用 Personal Access Token：
# 1. https://github.com/settings/tokens
# 2. 创建 token，勾选 repo 权限
# 3. 使用 token 作为密码
```

### 第 4 步：配置 GitHub Pages

1. 进入仓库设置
   ```
   https://github.com/inig-ai/ai-blog/settings
   ```

2. 左侧菜单找到 **Pages**

3. 在 **Build and deployment** 部分：
   - **Source**: 选择 `GitHub Actions`

4. 进入 **Settings > Actions > General**：
   - **Workflow permissions**: 选择 `Read and write permissions`
   - 勾选 `Allow GitHub Actions to create and approve pull requests`
   - 点击 **Save**

### 第 5 步：等待部署完成

1. 访问 Actions 页面
   ```
   https://github.com/inig-ai/ai-blog/actions
   ```

2. 等待 "Build and Deploy to GitHub Pages" 工作流完成（通常 2-3 分钟）

3. 完成后访问你的博客
   ```
   https://blog.inig.ai
   ```

## 🌐 访问你的博客

部署完成后，你可以通过以下地址访问：

- **主地址（推荐）**: https://blog.inig.ai
- **GitHub Pages 备用**: https://inig-ai.github.io/ai-blog

## 📝 添加文章

### 快速添加

```bash
# 进入项目目录
cd ~/Desktop/code/ai-blog

# 创建新文章
cat > content/posts/my-article.mdx << 'EOF'
---
title: 我的第一篇文章
description: 这是文章描述
date: 2024-04-01
published: true
authors: ['inig-ai']
tags: ['AI', 'Blog', '技术']
---

# 文章标题

这是你的文章内容...

## 子标题

更多内容...
EOF

# 提交
git add content/posts/my-article.mdx
git commit -m "📝 新增文章: 我的第一篇文章"

# 推送（自动部署）
git push origin main
```

### 编辑文章

```bash
# 编辑现有文章
nano content/posts/my-article.mdx

# 提交和推送
git add .
git commit -m "✏️ 编辑文章"
git push origin main
```

## 📊 项目统计

```bash
cd ~/Desktop/code/ai-blog

# 查看提交数
git log --oneline | wc -l

# 查看最近提交
git log --oneline -10
```

## 🔍 验证清单

在推送前，确保：

- [ ] GitHub 仓库 `ai-blog` 已创建
- [ ] 仓库设为 **Public**
- [ ] 本地 Git 用户名为 `inig-ai`
- [ ] 本地 Git 邮箱为 `inig-ai@inig.ai`
- [ ] 远程 origin 指向 `https://github.com/inig-ai/ai-blog.git`
- [ ] 分支名称为 `main`（已自动重命名）
- [ ] CNAME 文件存在于 `public/CNAME`
- [ ] CNAME 内容为 `blog.inig.ai`

## 🆘 常见问题

### Q1: 推送被拒绝 "Repository not found"

**原因**: 仓库不存在或 URL 错误

**解决方案**:
1. 确保在 GitHub 创建了 `ai-blog` 仓库
2. 验证 URL: `https://github.com/inig-ai/ai-blog.git`
3. 检查大小写（GitHub 用户名大小写敏感）

```bash
git remote -v
# 应该看到正确的 URL
```

### Q2: 认证失败

**原因**: GitHub 凭证不正确

**解决方案**:

使用 HTTPS：
```bash
# GitHub 已停止使用密码认证
# 使用 Personal Access Token
# 1. 访问 https://github.com/settings/tokens
# 2. 创建 token，勾选 'repo' 权限
# 3. 使用 token 作为密码
```

或使用 SSH：
```bash
# 设置 SSH 密钥
ssh-keygen -t ed25519 -C "inig-ai@github.com"
# 添加到 GitHub 账户设置

# 更新远程 URL
git remote set-url origin git@github.com:inig-ai/ai-blog.git

# 再次推送
git push -u origin main
```

### Q3: "src refspec main does not match any"

**原因**: 分支名称不是 main

**解决方案**:
```bash
# 检查当前分支
git branch -a

# 如果是 master，重命名为 main
git branch -M main

# 再次推送
git push -u origin main
```

### Q4: GitHub Pages 不工作

**检查清单**:
- ✅ Pages 已在 Settings 中启用
- ✅ Source 选择了 "GitHub Actions"
- ✅ Actions 权限已配置
- ✅ .nojekyll 文件存在
- ✅ 等待 5-10 分钟

### Q5: 自定义域名不工作

**检查**:
- ✅ CNAME 文件存在于 `public/CNAME`
- ✅ CNAME 内容为 `blog.inig.ai`
- ✅ DNS CNAME 记录已配置
- ✅ 等待 DNS 生效（可能需要 24 小时）

```bash
# 验证 DNS
nslookup blog.inig.ai
dig blog.inig.ai CNAME
```

## 📞 获取帮助

- GitHub Pages 文档: https://docs.github.com/en/pages
- GitHub Actions 文档: https://docs.github.com/en/actions
- Next.js 部署: https://nextjs.org/docs/deployment/static-exports

## 📚 相关文档

项目中包含的详细文档：

1. **QUICK_START.md** - 快速 3 分钟指南
2. **CUSTOM_DOMAIN_SETUP.md** - 自定义域名说明
3. **GITHUB_PAGES_SETUP.md** - 完整配置指南
4. **GITHUB_DOMAIN_INFO.md** - 域名信息说明
5. **PUSH_TO_GITHUB.md** - 详细推送指南
6. **DEPLOYMENT.md** - 其他部署选项

## 🎯 完成后的流程

一旦部署完成，后续工作流程为：

```
编辑/添加文件
    ↓
git add .
git commit -m "描述"
    ↓
git push origin main
    ↓
GitHub Actions 自动触发
    ↓
项目构建和部署
    ↓
网站自动更新（2-3 分钟后）
```

## ✨ 最后确认

项目现已完全配置：

- ✅ GitHub 用户名: **inig-ai**
- ✅ 仓库名: **ai-blog**
- ✅ 自定义域名: **blog.inig.ai**
- ✅ 自动部署: **启用**
- ✅ 所有文档: **已更新**

---

## 🚀 现在就开始推送吧！

```bash
# 进入项目
cd ~/Desktop/code/ai-blog

# 第一步：在 GitHub 创建 ai-blog 仓库 (Public)
# https://github.com/new

# 第二步：推送代码
git push -u origin main

# 第三步：配置 GitHub Pages
# https://github.com/inig-ai/ai-blog/settings/pages

# 第四步：等待部署完成（2-3 分钟）

# 第五步：访问你的博客
# https://blog.inig.ai
```

---

**祝贺！你的博客系统已完全就绪！** 🎉
