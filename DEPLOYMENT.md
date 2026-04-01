# 🚀 部署指南

本指南提供了将 AI Blog 部署到各个平台的完整步骤。

## 📋 前置要求

- Git 账户
- 要部署的平台账户（Vercel、Netlify 等）
- Node.js 18+ 本地环境（用于测试）

---

## 1. Vercel 部署（推荐）

Vercel 是 Next.js 的官方推荐部署平台，提供零配置部署。

### 步骤

1. **推送到 GitHub**

```bash
git remote add origin https://github.com/yourusername/ai-blog.git
git push -u origin master
```

2. **访问 Vercel**

前往 [vercel.com](https://vercel.com)，使用 GitHub 账户登录。

3. **导入项目**

- 点击 "New Project"
- 选择 GitHub 账户
- 选择 `ai-blog` 仓库
- 点击 "Import"

4. **配置**

- **Framework**: 自动检测为 Next.js ✓
- **Root Directory**: `./`
- **Build Command**: `npm run build`
- **Output Directory**: `.next`

5. **环境变量**（可选）

```
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

6. **部署**

点击 "Deploy" 按钮，等待部署完成。

### 自定义域名

1. 在 Vercel 项目设置中点击 "Domains"
2. 输入你的域名
3. 按照提示修改 DNS 记录

---

## 2. Netlify 部署

### 步骤

1. **推送到 GitHub**

```bash
git push origin master
```

2. **访问 Netlify**

前往 [netlify.com](https://netlify.com)，使用 GitHub 登录。

3. **新建站点**

- 点击 "Add new site"
- 选择 "Import an existing project"
- 选择 GitHub 账户和 `ai-blog` 仓库

4. **构建设置**

| 设置 | 值 |
|------|-----|
| Build command | `npm run build` |
| Publish directory | `.next` |
| Node version | 18+ |

5. **环境变量**

在 Netlify 设置中添加：

```
NEXT_PUBLIC_SITE_URL=https://yourdomain.netlify.app
```

6. **部署**

配置完成后自动部署。推送到 GitHub 主分支时自动重新部署。

---

## 3. 自部署（VPS / 服务器）

如果你有自己的服务器或 VPS。

### 前置要求

- SSH 访问
- Node.js 18+
- PM2 或 systemd（进程管理）

### 步骤

1. **SSH 连接到服务器**

```bash
ssh user@your-server.com
```

2. **克隆仓库**

```bash
cd /var/www
git clone https://github.com/yourusername/ai-blog.git
cd ai-blog
```

3. **安装依赖**

```bash
npm install
# 或
yarn install
```

4. **构建项目**

```bash
npm run build
```

5. **启动服务**

使用 PM2：

```bash
npm install -g pm2
pm2 start npm --name "ai-blog" -- start
pm2 save
pm2 startup
```

或使用 systemd，创建 `/etc/systemd/system/ai-blog.service`：

```ini
[Unit]
Description=AI Blog
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/ai-blog
ExecStart=/usr/bin/npm start
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

启动服务：

```bash
sudo systemctl enable ai-blog
sudo systemctl start ai-blog
```

6. **配置反向代理（Nginx）**

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

7. **SSL 证书（Let's Encrypt）**

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

---

## 4. Docker 部署

### Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY .next ./. next
COPY public ./public

EXPOSE 3000

CMD ["npm", "start"]
```

### 构建和运行

```bash
# 构建镜像
docker build -t ai-blog:latest .

# 运行容器
docker run -p 3000:3000 ai-blog:latest
```

### Docker Compose

```yaml
version: '3'
services:
  blog:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: always
```

启动：

```bash
docker-compose up -d
```

---

## 5. 环境变量

创建 `.env.local` 文件（生产环境）：

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_NAME=AI Blog
NEXT_PUBLIC_AUTHOR=Your Name
```

---

## 📊 性能优化建议

### CDN 配置

使用 CloudFlare 加速静态资源：

1. 添加你的域名到 CloudFlare
2. 更改 DNS 指向 CloudFlare
3. 在 CloudFlare 启用：
   - 自动缩小化 (CSS/JS)
   - Brotli 压缩
   - 缓存所有内容

### 缓存头

在 `next.config.mjs` 中配置：

```js
headers: {
  source: '/api/:path*',
  headers: [
    {
      key: 'Cache-Control',
      value: 'public, max-age=3600',
    },
  ],
}
```

### 监控

- Vercel: 内置分析和监控
- 自部署: 使用 Sentry 进行错误监控

---

## 🔄 持续集成/部署 (CI/CD)

### GitHub Actions

创建 `.github/workflows/deploy.yml`：

```yaml
name: Build and Deploy

on:
  push:
    branches: [master]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy
        run: npm run deploy
```

---

## 🆘 故障排除

### 构建失败

```bash
# 清理缓存
rm -rf .next node_modules
npm install
npm run build
```

### 内存不足

增加 Node 堆大小：

```bash
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

### 端口占用

```bash
# 查找占用 3000 端口的进程
lsof -i :3000
# 杀死进程
kill -9 <PID>
```

---

## 📞 支持

- [Next.js 文档](https://nextjs.org/docs)
- [Vercel 支持](https://vercel.com/support)
- [Netlify 文档](https://docs.netlify.com/)

---

**祝你部署顺利！** 🎉
