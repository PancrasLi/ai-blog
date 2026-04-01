# GitHub Pages 部署指南

本指南详细说明如何将 AI Blog 部署到 GitHub Pages。

## 📋 前置要求

- GitHub 账户
- Git 已安装
- 项目已本地初始化

## 🚀 部署步骤

### 1️⃣ 创建 GitHub 仓库

在 GitHub 创建一个**公开**仓库，命名为：
```
ai-blog
```

**重要**: 确保仓库名称为 `ai-blog`（不要用 `inig-ai.github.io`）

### 2️⃣ 配置 Git 用户信息

```bash
git config --global user.email "your-email@github.com"
git config --global user.name "Your Name"
```

### 3️⃣ 添加远程仓库

```bash
cd ~/Desktop/code/ai-blog

# 添加远程仓库
git remote add origin https://github.com/YOUR_USERNAME/ai-blog.git

# 验证
git remote -v
```

### 4️⃣ 推送到 GitHub

```bash
# 重命名分支为 main（如需要）
git branch -M main

# 首次推送
git push -u origin main

# 之后只需
git push
```

### 5️⃣ 配置 GitHub Pages

1. 进入仓库 **Settings** 标签页
2. 找到 **Pages** 部分（侧边栏）
3. 在 **Source** 下选择：
   - **Deploy from a branch**
4. 选择分支：
   - Branch: `main`
   - Folder: `/ (root)`
5. 点击 **Save**

### 6️⃣ 配置 GitHub Actions

GitHub Actions 会自动部署，但需要权限：

1. 进入 **Settings > Actions > General**
2. 在 **Workflow permissions** 中选择：
   - **Read and write permissions**
3. 勾选 **Allow GitHub Actions to create and approve pull requests**
4. 点击 **Save**

## 🔄 部署流程

### 方式 1: 自动部署（推荐）

每次推送到 `main` 分支时，GitHub Actions 会自动：
1. 检出代码
2. 构建项目
3. 生成静态文件
4. 部署到 GitHub Pages

只需正常提交和推送：

```bash
git add .
git commit -m "Update blog content"
git push
```

### 方式 2: 手动部署脚本

使用提供的部署脚本：

```bash
# 赋予执行权限
chmod +x deploy.sh

# 运行脚本
./deploy.sh
```

脚本会自动：
- ✅ 验证 Git 配置
- ✅ 清理旧的构建文件
- ✅ 安装依赖
- ✅ 构建项目
- ✅ 提交和推送更改

### 方式 3: 手动构建和推送

```bash
# 安装依赖
npm install

# 构建和导出
npm run export

# 查看输出
ls -la out/

# 提交
git add .
git commit -m "Deploy blog"

# 推送
git push origin main
```

## 🌐 访问你的博客

部署完成后（通常需要 1-2 分钟），访问：

```
https://YOUR_USERNAME.github.io/ai-blog/
```

例如：
```
https://inig-ai.github.io/ai-blog/
```

### 检查部署状态

1. 进入仓库主页
2. 点击 **Environments** 或 **Actions**
3. 查看部署状态

## 📝 编辑内容后重新部署

### 添加新文章

```bash
# 1. 在 content/posts/ 创建新的 .mdx 文件
cat > content/posts/my-article.mdx << 'EOF'
---
title: 我的文章
description: 文章描述
date: 2024-04-01
published: true
tags: ['标签']
---

# 文章内容

这是我的第一篇文章...
EOF

# 2. 提交
git add content/posts/my-article.mdx
git commit -m "📝 添加新文章: 我的文章"

# 3. 推送
git push origin main
```

### 编辑现有文章

```bash
# 编辑文件
nano content/posts/welcome.mdx

# 提交
git add content/posts/welcome.mdx
git commit -m "📝 更新文章: 欢迎"

# 推送
git push origin main
```

## 🔗 自定义域名（可选）

如果你想使用自己的域名代替 GitHub Pages 默认域名：

### 步骤

1. **GitHub 配置**
   - 进入 Settings > Pages
   - 在 **Custom domain** 中输入你的域名
   - 点击 **Save**

2. **DNS 配置**
   - 登录你的域名提供商
   - 添加 CNAME 记录：
     ```
     Name: ai-blog
     Value: YOUR_USERNAME.github.io
     ```

3. **等待生效**
   - DNS 传播通常需要 24 小时

### 你的域名将指向

```
https://yourdomain.com/ → GitHub Pages 的 main 分支
```

## 🆘 常见问题

### Q: 推送后页面仍未更新

**A**: 这通常需要 1-2 分钟。检查：
```bash
# 检查 Actions 状态
# 1. 进入 GitHub 仓库
# 2. 点击 Actions 标签
# 3. 查看最新的工作流程
```

### Q: 404 错误

**A**: 确保：
- ✅ Pages 已启用
- ✅ 分支设置为 `main`
- ✅ Folder 设置为 `/ (root)`
- ✅ `.nojekyll` 文件存在

### Q: 构建失败

**A**: 检查日志：
```bash
# 本地测试构建
npm run export

# 检查输出
ls -la out/
```

如果本地构建成功，尝试：
1. 清除 GitHub Pages 缓存
2. 等待 1-2 分钟
3. 重新推送

### Q: 样式丢失

**A**: 这是 basePath 问题。检查：
```typescript
// next.config.mjs
basePath: '' // 确保为空
```

### Q: 图片无法加载

**A**: 在 `src/` 目录中添加图片：
```
src/
├── images/
│   └── my-image.png
```

在 MDX 中使用：
```mdx
![描述](../images/my-image.png)
```

## 📊 部署检查清单

- [ ] GitHub 仓库已创建
- [ ] 远程仓库已配置
- [ ] 代码已推送到 main 分支
- [ ] GitHub Pages 已启用
- [ ] Pages 配置为 `main` 分支
- [ ] GitHub Actions 权限已配置
- [ ] `.nojekyll` 文件存在
- [ ] `next.config.mjs` 已更新
- [ ] 首次部署完成（等待 1-2 分钟）
- [ ] 访问 GitHub Pages 链接能打开

## 🎯 验证部署

```bash
# 1. 检查 .nojekyll 存在
ls -la .nojekyll

# 2. 本地测试构建
npm run export

# 3. 检查输出目录
ls -la out/
du -sh out/

# 4. 验证 git 配置
git remote -v
git branch -a

# 5. 推送到 GitHub
git push origin main

# 6. 检查 Actions 状态
# 访问: https://github.com/YOUR_USERNAME/ai-blog/actions
```

## 📞 获取帮助

- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [Next.js 静态导出](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)

---

**部署完成！** 🎉

你的博客现已通过 GitHub Pages 提供服务，可通过以下地址访问：

```
https://YOUR_USERNAME.github.io/ai-blog/
```

每次推送到 `main` 分支时，GitHub Actions 会自动重新部署。
