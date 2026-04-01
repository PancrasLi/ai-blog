# ⚡ 快速推送到 GitHub Pages - 3 分钟完成

## 📋 前置条件

- ✅ GitHub 账户（如未登录，[注册在这里](https://github.com/signup)）
- ✅ 项目已在 `~/Desktop/code/ai-blog`
- ✅ Git 已安装

## 🚀 3 步部署

### ⏱️ 第 1 步：创建 GitHub 仓库（1 分钟）

1. 访问 https://github.com/new
2. 填写信息：
   ```
   Repository name: ai-blog
   Description: 现代无服务博客系统
   Visibility: Public ✅
   ```
3. 点击 "Create repository"

### ⏱️ 第 2 步：推送代码（1 分钟）

```bash
cd ~/Desktop/code/ai-blog

# 配置 Git（如未配置）
git config --global user.email "your-email@github.com"
git config --global user.name "inig-ai"

# 添加远程仓库
git remote add origin https://github.com/inig-ai/ai-blog.git

# 推送代码
git push -u origin main
```

### ⏱️ 第 3 步：启用 GitHub Pages（1 分钟）

1. 进入 GitHub 仓库页面
2. 点击 **Settings** → **Pages**
3. **Source** 选择 **GitHub Actions**
4. 点击 **Settings** → **Actions** → **General**
5. **Workflow permissions** 选择 **Read and write permissions** ✅
6. 等待 2-3 分钟，Actions 完成

## ✨ 完成！

你的博客现已发布：

```
https://blog.inig.ai
或
https://inig-ai.github.io/ai-blog/
```

## 📝 更新博客

```bash
cd ~/Desktop/code/ai-blog

# 编辑或添加文件
# 例如：nano content/posts/new-article.mdx

# 提交
git add .
git commit -m "📝 更新博客"

# 推送（自动部署）
git push origin main
```

## 🌐 自定义域名（可选）

如果你有自己的域名：

1. GitHub Settings > Pages
2. 输入你的域名
3. 在域名 DNS 设置中添加 CNAME 记录指向 `YOUR_USERNAME.github.io`

## 🔍 检查部署状态

- **GitHub Actions**: https://github.com/YOUR_USERNAME/ai-blog/actions
- **Pages 设置**: https://github.com/YOUR_USERNAME/ai-blog/settings/pages
- **你的博客**: https://YOUR_USERNAME.github.io/ai-blog/

## 💡 提示

- 每次推送到 `main` 分支自动部署
- 首次部署需要 2-3 分钟
- 更新后刷新浏览器查看最新内容
- GitHub Pages 域名 `YOUR_USERNAME.github.io` 不可更改

---

**就这么简单！** 🎉

有问题？查看详细指南：
- `PUSH_TO_GITHUB.md` - 完整推送指南
- `GITHUB_PAGES_SETUP.md` - 详细配置说明
- `DEPLOYMENT.md` - 其他部署选项
