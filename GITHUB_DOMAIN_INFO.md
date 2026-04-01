# 🌐 GitHub Pages 域名信息

## 重要说明

### GitHub Pages 默认域名

GitHub Pages 为每个账户分配的域名是：

```
https://YOUR_USERNAME.github.io
```

**此域名由 GitHub 自动分配，不可更改。**

### 你的博客访问地址

由于项目名称是 `ai-blog`，你的博客将通过以下地址访问：

```
https://YOUR_USERNAME.github.io/ai-blog/
```

### 域名结构

```
https://YOUR_USERNAME.github.io / ai-blog /
    │                            │   │
    │                            │   └─ 仓库名称
    │                            └────── GitHub Pages 基础域名（不可更改）
    └──────────────────────────────── 你的 GitHub 用户名
```

## 🔄 域名指向关系

GitHub Pages 域名指向的是你的 **GitHub 仓库的 main 分支**。

### 部署流程

```
你的本地代码
    ↓
git push → GitHub main 分支
    ↓
GitHub Actions 触发
    ↓
构建项目（npm run export）
    ↓
生成静态文件到 out/ 目录
    ↓
部署到 GitHub Pages
    ↓
通过 https://YOUR_USERNAME.github.io/ai-blog/ 访问
```

### 自动更新

每当你推送代码到 `main` 分支时：

1. GitHub Actions 自动触发
2. 项目自动构建
3. 静态文件自动部署
4. 网站自动更新（通常 1-3 分钟）

## 📝 使用自定义域名

### 前置要求

- ✅ 拥有自己的域名
- ✅ 能够访问域名的 DNS 设置

### 步骤

#### 1. GitHub 配置

```
进入仓库 Settings → Pages → Custom domain
输入你的域名，例如: blog.yourdomain.com
点击 Save
GitHub 会自动生成 CNAME 文件
```

#### 2. DNS 配置

在你的域名提供商的 DNS 管理中添加 CNAME 记录：

```
名称: blog （或你想要的子域名）
类型: CNAME
值: YOUR_USERNAME.github.io
TTL: 3600（或默认值）
```

#### 3. 等待生效

- DNS 变更通常需要 24 小时生效
- 可以通过以下命令验证：
  ```bash
  nslookup blog.yourdomain.com
  ```

### 完成后

```
https://blog.yourdomain.com/ → 你的博客
```

## 🔐 HTTPS 支持

GitHub Pages 自动为所有站点启用 HTTPS：

- ✅ `https://YOUR_USERNAME.github.io/ai-blog/` - 自动 HTTPS
- ✅ `https://yourdomain.com/` - 如果使用自定义域名，也自动 HTTPS

## ⚙️ GitHub Pages 限制

### 存储限制

- 每个仓库最大 1GB
- GitHub 账户最多 100 个 Pages 网站

### 构建限制

- 每天最多 10 个构建
- 每个构建最多 1 小时

### 流量限制

- 每月 100GB 带宽
- 对大多数个人博客足够

### 不允许的用途

GitHub Pages **不应该用于**：
- ❌ 商业服务（如电商平台）
- ❌ 大型文件分发
- ❌ 挖矿或计算密集型任务
- ❌ 大规模数据库应用

但非常适合：
- ✅ 个人博客
- ✅ 项目文档
- ✅ 作品集
- ✅ 技术分享

## 🔗 DNS 信息参考

### GitHub Pages IP 地址

GitHub Pages 使用以下 IP 地址：

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

### 查询你的域名

```bash
# macOS/Linux
dig YOUR_USERNAME.github.io
nslookup YOUR_USERNAME.github.io

# Windows
nslookup YOUR_USERNAME.github.io
```

## 📊 监控域名

### 检查 Pages 状态

```bash
# GitHub CLI
gh repo view --web

# 或直接访问
https://github.com/YOUR_USERNAME/ai-blog/settings/pages
```

### 检查部署日志

```
https://github.com/YOUR_USERNAME/ai-blog/actions
```

## 🆘 常见域名问题

### 问题 1: 无法访问

```
解决方案：
1. 检查仓库是否为 Public
2. 等待 2-3 分钟（首次部署需要时间）
3. 检查 GitHub Actions 是否成功
4. 清除浏览器缓存（Ctrl+Shift+Delete）
```

### 问题 2: 显示 404

```
原因：
- .nojekyll 文件可能丢失
- basePath 配置错误
- next.config.mjs 输出设置不对

解决方案：
1. 检查 .nojekyll 存在
2. 确保 basePath: '' 为空
3. 重新推送
```

### 问题 3: 样式加载不完全

```
原因：
- CSS 路径问题
- 缓存问题

解决方案：
1. 清除浏览器缓存
2. 等待几分钟
3. 重新加载页面
4. 尝试其他浏览器
```

### 问题 4: 图片无法加载

```
解决方案：
1. 确保图片在 public/ 目录
2. 在 MDX 中使用相对路径
3. 检查文件名大小写
```

## 📞 获取帮助

### GitHub Pages 文档

- [GitHub Pages 官方文档](https://docs.github.com/en/pages)
- [配置 GitHub Pages 自定义域名](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [GitHub Pages 故障排除](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages)

### 相关资源

- [Next.js 部署文档](https://nextjs.org/docs/deployment)
- [Tailwind CSS 文档](https://tailwindcss.com/)
- [Shadcn/UI 文档](https://ui.shadcn.com/)

---

## ✅ 快速参考

| 项目 | 值 |
|------|-----|
| 仓库名称 | `ai-blog` |
| GitHub Pages 域名 | `https://YOUR_USERNAME.github.io` |
| 你的博客 URL | `https://YOUR_USERNAME.github.io/ai-blog/` |
| 域名可更改 | ❌ 否（由 GitHub 自动分配） |
| 指向分支 | `main` |
| 自动更新 | ✅ 是（每次推送自动部署） |
| HTTPS | ✅ 自动启用 |
| 可自定义域名 | ✅ 是（可选，需要自己的域名） |

---

**记住：GitHub Pages 域名由 GitHub 分配，永久指向你的 main 分支！** 🎯
