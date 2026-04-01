# 🚀 推送到 GitHub - 完整步骤

本指南详细说明如何将 AI Blog 项目推送到 GitHub 并配置 GitHub Pages。

## ⚡ 快速开始（3 步）

### 第 1 步: 在 GitHub 创建仓库

1. 访问 [github.com/new](https://github.com/new)
2. 填写表单：
   - **Repository name**: `ai-blog`
   - **Description**: `现代无服务博客系统`
   - **Visibility**: `Public` ✅
   - **Add a README file**: 不勾选（我们已有）
   - **Add .gitignore**: 不勾选（我们已有）
3. 点击 **Create repository**

### 第 2 步: 配置本地 Git

```bash
cd ~/Desktop/code/ai-blog

# 配置 Git 用户（如未配置）
git config --global user.email "your-email@github.com"
git config --global user.name "Your GitHub Username"

# 添加远程仓库（替换 YOUR_USERNAME）
git remote add origin https://github.com/YOUR_USERNAME/ai-blog.git

# 验证远程配置
git remote -v
```

**输出应该是：**
```
origin  https://github.com/YOUR_USERNAME/ai-blog.git (fetch)
origin  https://github.com/YOUR_USERNAME/ai-blog.git (push)
```

### 第 3 步: 推送代码

```bash
# 首次推送（推送 main 分支并设置为默认跟踪分支）
git push -u origin main

# 验证
git branch -vv
```

**预期输出：**
```
* main 358e28e [origin/main] 📚 添加详细的部署指南
```

✅ **完成！** 代码已推送到 GitHub。

---

## 🌐 配置 GitHub Pages

### 步骤 1: 启用 GitHub Pages

1. 进入你的 GitHub 仓库主页
2. 点击 **Settings** 标签
3. 从左侧菜单选择 **Pages**

### 步骤 2: 配置 Source

在 **Build and deployment** 部分：

1. **Source** 选择：`GitHub Actions`
2. 不需要手动选择分支，Actions 会自动处理

### 步骤 3: 检查 Actions 权限

1. 继续在 Settings 中
2. 找到 **Actions** > **General**
3. 在 **Workflow permissions** 部分选择：
   - ✅ `Read and write permissions`
   - ✅ `Allow GitHub Actions to create and approve pull requests`
4. 点击 **Save**

### 步骤 4: 等待部署

1. 回到仓库主页
2. 点击 **Actions** 标签
3. 等待 "Build and Deploy to GitHub Pages" 工作流完成（通常 2-3 分钟）

✅ **完成！** 部署成功后，你的博客将在以下地址可访问：

```
https://YOUR_USERNAME.github.io/ai-blog/
```

---

## 🔍 验证部署状态

### 方法 1: GitHub 界面

1. 进入仓库 **Settings > Pages**
2. 查看部署状态和链接

### 方法 2: 命令行

```bash
# 检查最近的提交
git log --oneline -5

# 查看远程分支
git branch -r

# 验证推送状态
git status
```

### 方法 3: 浏览器

1. 访问 `https://YOUR_USERNAME.github.io/ai-blog/`
2. 应该看到博客首页

---

## 📝 更新博客

### 添加新文章

```bash
cd ~/Desktop/code/ai-blog

# 创建新文章
cat > content/posts/my-post.mdx << 'EOF'
---
title: 我的新文章
description: 这是描述
date: 2024-04-01
published: true
tags: ['AI', 'Blog']
---

# 标题

内容...
EOF

# 提交
git add content/posts/my-post.mdx
git commit -m "📝 新增文章: 我的新文章"

# 推送（自动触发部署）
git push origin main
```

### 编辑文章

```bash
# 编辑文件
nano content/posts/welcome.mdx

# 提交
git add content/posts/welcome.mdx
git commit -m "✏️ 更新文章: 欢迎"

# 推送
git push origin main
```

### 修改样式

```bash
# 编辑 Tailwind 配置
nano tailwind.config.ts

# 提交
git add tailwind.config.ts
git commit -m "🎨 更新样式配置"

# 推送
git push origin main
```

---

## 🛠️ 故障排除

### 问题 1: 推送被拒绝

```
error: failed to push some refs to 'origin'
```

**解决方案：**
```bash
# 检查远程配置
git remote -v

# 如果没有 origin，添加它
git remote add origin https://github.com/YOUR_USERNAME/ai-blog.git

# 再次推送
git push -u origin main
```

### 问题 2: 认证失败

```
fatal: Authentication failed
```

**解决方案：**
- 使用 HTTPS 时，需要创建 Personal Access Token：
  1. GitHub Settings > Developer settings > Personal access tokens
  2. 创建 token（勾选 `repo` 权限）
  3. 使用 token 代替密码
  
- 或使用 SSH：
  ```bash
  git remote set-url origin git@github.com:YOUR_USERNAME/ai-blog.git
  ```

### 问题 3: 构建失败

**检查日志：**
1. 进入仓库 **Actions** 标签
2. 点击最近的工作流
3. 查看错误信息

**本地测试：**
```bash
npm install
npm run export
ls -la out/
```

### 问题 4: Pages 未激活

**确保：**
- ✅ 仓库是 Public
- ✅ Pages 已在 Settings 中启用
- ✅ 选择了 "GitHub Actions" 作为 source
- ✅ `.nojekyll` 文件存在

### 问题 5: 样式丢失或 404 错误

**检查：**
```bash
# 检查 next.config.mjs
grep -A 5 "basePath" next.config.mjs

# 应该看到：
# basePath: ''
```

如果 basePath 不为空，编辑并重新推送：
```bash
# 编辑 next.config.mjs
nano next.config.mjs

# 确保 basePath 为 ''
# 提交
git add next.config.mjs
git commit -m "🔧 修复 basePath 配置"
git push origin main
```

---

## 📊 项目统计

```bash
# 查看项目信息
cd ~/Desktop/code/ai-blog

echo "📁 项目大小："
du -sh .

echo ""
echo "📝 文件计数："
echo "  TypeScript 文件: $(find . -name '*.tsx' -o -name '*.ts' | grep -v node_modules | wc -l)"
echo "  样式文件: $(find . -name '*.css' | grep -v node_modules | wc -l)"
echo "  内容文件: $(find content -name '*.mdx' | wc -l)"

echo ""
echo "🔗 Git 统计："
echo "  提交数: $(git log --oneline | wc -l)"
echo "  分支数: $(git branch -a | wc -l)"
```

---

## ✅ 部署检查清单

- [ ] GitHub 账户已登录
- [ ] 在 GitHub 创建了 `ai-blog` 仓库
- [ ] 本地 Git 已配置 user.name 和 user.email
- [ ] 添加了远程仓库 (`git remote add origin ...`)
- [ ] 代码已推送到 `main` 分支 (`git push -u origin main`)
- [ ] GitHub Pages 已启用（Settings > Pages）
- [ ] GitHub Actions 权限已配置
- [ ] Actions 工作流已完成
- [ ] 博客可访问 (`https://YOUR_USERNAME.github.io/ai-blog/`)
- [ ] 测试添加了新内容和推送

---

## 🎉 祝贺！

你的博客现已上线！

- **访问地址**: `https://YOUR_USERNAME.github.io/ai-blog/`
- **仓库地址**: `https://github.com/YOUR_USERNAME/ai-blog`
- **自动部署**: 每次推送到 `main` 时自动部署

---

## 📚 常见命令

```bash
# 查看状态
git status

# 查看日志
git log --oneline

# 查看分支
git branch -a

# 拉取最新变更
git pull origin main

# 创建新分支
git checkout -b feature/your-feature

# 合并分支
git merge feature/your-feature

# 删除分支
git branch -d feature/your-feature

# 回退提交
git reset --soft HEAD~1
```

---

## 🔐 安全提示

- ✅ 不要提交 `.env.local`（已在 .gitignore 中）
- ✅ 不要提交 `node_modules`（已在 .gitignore 中）
- ✅ 使用 Personal Access Token 而非密码
- ✅ 定期更新依赖 (`npm update`)
- ✅ 启用 Branch Protection 保护 main 分支

---

**开始享受你的博客吧！** 🚀
