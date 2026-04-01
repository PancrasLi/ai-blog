# 🚀 AI Blog - 现代无服务博客系统

一个极简、高性能、可定制的无服务博客系统。由 **Next.js**、**Tailwind CSS** 和 **Shadcn/UI** 驱动。

## ✨ 特性

- ⚡ **超快性能** - Next.js 14+ 静态生成
- 🎨 **现代设计** - Shadcn/UI + Tailwind CSS
- 🌓 **深色模式** - 完美适配
- 📱 **响应式** - 移动端友好
- 🚀 **无服务器** - 零配置部署
- 📝 **MDX 支持** - 丰富的内容表达
- 🔍 **SEO 优化** - 开箱即用
- ⚙️ **易于定制** - 灵活的组件系统

## 🛠 技术栈

| 技术 | 用途 |
|------|------|
| [Next.js 15](https://nextjs.org/) | 应用框架 |
| [React 18](https://react.dev/) | UI 库 |
| [TypeScript](https://www.typescriptlang.org/) | 类型安全 |
| [Tailwind CSS 3](https://tailwindcss.com/) | 样式框架 |
| [Shadcn/UI](https://ui.shadcn.com/) | 组件库 |
| [Velite](https://velite.js.org/) | 内容管理 |
| [next-themes](https://github.com/pacocoursey/next-themes) | 主题管理 |

## 🚀 快速开始

### 前置要求

- Node.js 18+
- npm 或 yarn 或 pnpm

### 安装

```bash
# 克隆仓库
git clone https://github.com/yourusername/ai-blog.git
cd ai-blog

# 安装依赖
npm install

# 开发模式
npm run dev

# 访问 http://localhost:3000
```

### 生产构建

```bash
npm run build
npm start
```

## 📝 写文章

在 `content/posts/` 目录下创建 `.mdx` 文件：

```mdx
---
title: 我的第一篇文章
description: 这是一个描述
date: 2024-04-01
published: true
authors: ['Your Name']
tags: ['Next.js', 'Web']
---

# 标题

你的内容...
```

## 📁 项目结构

```
ai-blog/
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/          # React 组件
│   │   ├── ui/             # Shadcn 组件
│   │   ├── navbar.tsx
│   │   ├── footer.tsx
│   │   └── ...
│   ├── lib/                 # 工具函数
│   └── styles/              # 全局样式
├── content/
│   ├── posts/              # 博客文章
│   └── pages/              # 页面
├── public/                 # 静态资源
├── velite.config.ts        # Velite 配置
├── next.config.mjs         # Next.js 配置
├── tailwind.config.ts      # Tailwind 配置
└── tsconfig.json           # TypeScript 配置
```

## 🎨 主题定制

编辑 `tailwind.config.ts` 自定义颜色：

```ts
theme: {
  extend: {
    colors: {
      primary: 'hsl(var(--primary))',
      // ...
    }
  }
}
```

在 `src/styles/globals.css` 中修改 CSS 变量：

```css
:root {
  --primary: 217.2 91.2% 59.8%;
  --primary-foreground: 222.2 47.4% 11.2%;
  /* ... */
}
```

## 🌐 部署

### Vercel（推荐）

```bash
npm install -g vercel
vercel
```

### Netlify

1. 连接 GitHub 仓库
2. 构建命令: `npm run build`
3. 发布目录: `.next`

### 其他平台

支持任何支持 Node.js 的平台：AWS、Heroku、Railway、Render 等。

## 📦 页面和路由

| 路由 | 文件 | 说明 |
|------|------|------|
| `/` | `src/app/page.tsx` | 首页 |
| `/blog` | `src/app/blog/page.tsx` | 文章列表 |
| `/blog/[slug]` | `src/app/blog/[slug]/page.tsx` | 文章详情 |
| `/about` | `src/app/about/page.tsx` | 关于页面 |

## 🔧 常见定制

### 添加新页面

在 `src/app/` 下创建新目录和 `page.tsx`。

### 添加新组件

在 `src/components/` 下创建 `.tsx` 文件。

### 修改导航栏

编辑 `src/components/navbar.tsx`。

### 添加新文章

在 `content/posts/` 下创建 `.mdx` 文件。

## 📊 性能指标

- 🟢 **Core Web Vitals** - 优秀
- 📄 **首字节时间 (FCP)** - < 1s
- ⚡ **LCP** - < 2.5s
- 🚀 **CLS** - < 0.1

## 🤝 贡献

欢迎提交 Pull Request 和 Issue！

## 📄 许可

MIT License - 详见 [LICENSE](LICENSE)

## 🙏 致谢

- [Next.js 团队](https://nextjs.org/)
- [Shadcn/UI](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Velite 社区](https://velite.js.org/)

---

**开始构建你的博客吧！** 🎉

有问题？[提交 Issue](https://github.com/yourusername/ai-blog/issues)
