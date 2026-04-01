# 定时冲浪任务设置指南

## 概述

本指南说明如何设置定时任务，让 AI 每天 8:30 自动进行网络冲浪。

---

## 选项 1：使用 OpenClaw Cron 系统（推荐）

### 优势
- 集成度高（在 OpenClaw 内运行）
- 可靠性强（专为分布式系统设计）
- 易于管理和监控
- 支持多种运行模式

### 设置步骤

#### 步骤 1：创建 cron 配置文件

创建 `CRON_JOBS.yaml`：

```yaml
jobs:
  daily_surf_8_30:
    name: "每日 8:30 网络冲浪"
    schedule:
      kind: "cron"
      expr: "30 8 * * *"  # 每天 8:30
      tz: "Asia/Shanghai"
    payload:
      kind: "agentTurn"
      message: "执行每日网络冲浪：npm run daily-surf"
    delivery:
      mode: "announce"
      channel: "main"
    sessionTarget: "current"
    enabled: true
```

#### 步骤 2：在 OpenClaw 中注册 cron

```bash
# 使用 OpenClaw gateway 命令添加任务
openclaw cron add --config CRON_JOBS.yaml
```

或者通过 API：

```javascript
// 调用 cron 工具添加任务
cron({
  action: "add",
  job: {
    name: "每日 8:30 网络冲浪",
    schedule: {
      kind: "cron",
      expr: "30 8 * * *",
      tz: "Asia/Shanghai"
    },
    payload: {
      kind: "agentTurn",
      message: "执行每日网络冲浪：npm run daily-surf"
    },
    delivery: {
      mode: "announce",
      channel: "main"
    },
    sessionTarget: "current"
  }
})
```

#### 步骤 3：验证 cron 任务

```bash
# 列出所有 cron 任务
openclaw cron list

# 查看特定任务状态
openclaw cron status --job-id=daily_surf_8_30
```

#### 步骤 4：手动测试

```bash
# 手动运行一次来测试
openclaw cron run --job-id=daily_surf_8_30

# 或直接运行脚本
npm run daily-surf
```

---

## 选项 2：使用系统 Cron（Linux/macOS）

### 优势
- 轻量级
- 系统原生支持
- 无依赖

### 设置步骤

#### 步骤 1：编辑 crontab

```bash
crontab -e
```

#### 步骤 2：添加冲浪任务

```cron
# 每天 8:30 执行网络冲浪
30 8 * * * cd /home/v0014776/Desktop/code/ai-blog && npm run daily-surf >> /tmp/daily-surf.log 2>&1
```

**说明**：
- `30 8` = 每天 8 点 30 分
- `* * *` = 每天每周每月
- `cd` = 切换到项目目录
- `>> /tmp/daily-surf.log` = 输出到日志文件

#### 步骤 3：验证任务

```bash
# 查看 crontab 任务列表
crontab -l | grep daily-surf

# 查看日志
tail -f /tmp/daily-surf.log
```

---

## 选项 3：使用 GitHub Actions（云端方案）

### 优势
- 无需本地运行
- 自动化程度最高
- 免费配额充足

### 设置步骤

#### 步骤 1：创建 workflow 文件

创建 `.github/workflows/daily-surf.yml`：

```yaml
name: Daily Surf at 8:30

on:
  schedule:
    # 8:30 (UTC+8 北京时间) = 0:30 UTC
    - cron: '30 0 * * *'
  workflow_dispatch:

jobs:
  daily-surf:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
      
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Run daily surf
        run: npm run daily-surf
      
      - name: Commit and push
        run: |
          git config user.name "inig-ai[bot]"
          git config user.email "inig-ai@bot.local"
          git add -A
          git commit -m "🌐 Auto surf: $(date)" || true
          git push
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

#### 步骤 2：推送 workflow

```bash
git add .github/workflows/daily-surf.yml
git commit -m "⚙️ 添加每日冲浪 GitHub Action"
git push origin main
```

#### 步骤 3：验证 workflow

在 GitHub 仓库中查看 Actions 标签，确认 workflow 已启用。

---

## 选项 4：使用 Node.js 守护进程

### 优势
- 跨平台兼容
- 可以与应用集成
- 易于调试

### 设置步骤

#### 步骤 1：安装 node-cron

```bash
npm install node-cron
```

#### 步骤 2：创建守护脚本

创建 `scripts/cron-daemon.js`：

```javascript
const cron = require('node-cron');
const { execSync } = require('child_process');

console.log('🤖 AI 冲浪守护进程启动...\n');

// 每天 8:30 执行冲浪
cron.schedule('30 8 * * *', () => {
  console.log(`[${new Date().toISOString()}] 🌐 执行每日网络冲浪...`);
  try {
    execSync('npm run daily-surf', { cwd: __dirname + '/..', stdio: 'inherit' });
  } catch (error) {
    console.error(`❌ 冲浪失败：${error.message}`);
  }
});

// 保持进程运行
console.log('✅ 冲浪守护进程已启动，监听 8:30 触发');
```

#### 步骤 3：启动守护进程

```bash
node scripts/cron-daemon.js
```

或在 package.json 中添加：

```json
{
  "scripts": {
    "cron-daemon": "node scripts/cron-daemon.js"
  }
}
```

---

## 时区配置

### 检查当前时区

```bash
date +%Z
# 或
timedatectl
```

### 设置时区（如需要）

```bash
# Linux
sudo timedatectl set-timezone Asia/Shanghai

# macOS
sudo systemsetup -settimezone Asia/Shanghai
```

### Cron 表达式时区说明

- **系统 Cron**：使用系统时区
- **GitHub Actions**：使用 UTC，需要转换
  - 8:30 CST (中国标准时间, UTC+8) = 0:30 UTC
- **OpenClaw Cron**：支持 `tz` 参数指定时区

---

## 监控和调试

### 查看冲浪日志

```bash
# 最近的冲浪记录
tail -20 /tmp/daily-surf.log

# 查看全部冲浪日志
grep "🌐" /tmp/daily-surf.log | tail -50

# 实时监控
tail -f /tmp/daily-surf.log
```

### 查看生成的文章

```bash
# 查看所有冲浪文章
ls -lh content/posts/ | grep surfing

# 查看最新的冲浪文章
ls -lht content/posts/*surfing* | head -1
```

### 手动触发测试

```bash
# 直接运行冲浪脚本
npm run daily-surf

# 指定日期运行
npm run daily-surf --date=2026-04-02

# 指定主题运行
npm run daily-surf --topic="AI"
```

---

## 故障排除

### 问题 1：Cron 任务没有执行

**检查列表**：
- [ ] 确认 crontab 已添加：`crontab -l`
- [ ] 确认时间设置正确
- [ ] 查看系统日志：`tail -f /var/log/syslog` (Linux)
- [ ] 确认工作目录正确

**解决方案**：
```bash
# 使用完整路径
30 8 * * * /usr/bin/npm run daily-surf --prefix /home/user/ai-blog >> /tmp/daily-surf.log 2>&1
```

### 问题 2：Cron 找不到 npm

**原因**：系统 Cron 没有 PATH 环境变量

**解决方案**：
```bash
# 在 crontab 中指定 npm 完整路径
30 8 * * * /usr/local/bin/npm run daily-surf >> /tmp/daily-surf.log 2>&1

# 或使用 node 直接执行
30 8 * * * /usr/local/bin/node /path/to/ai-blog/scripts/daily-surf.js >> /tmp/daily-surf.log 2>&1
```

### 问题 3：GitHub Actions 时区不对

**原因**：Actions 默认使用 UTC

**解决方案**：
```yaml
- name: Set timezone
  run: |
    sudo timedatectl set-timezone Asia/Shanghai
  # 或
  env:
    TZ: Asia/Shanghai
```

---

## 最佳实践

### 1. 测试先行

在正式部署前，手动测试脚本：

```bash
npm run daily-surf
```

### 2. 日志记录

确保有充分的日志输出用于调试：

```bash
# 保存日志
npm run daily-surf >> logs/daily-surf.log 2>&1

# 轮转日志（防止文件过大）
# 每周一清理 30 天前的日志
0 0 * * 1 find /tmp -name "daily-surf.log" -mtime +30 -delete
```

### 3. 错误通知

设置 cron 错误通知：

```bash
# 添加 MAILTO 用于错误邮件通知
MAILTO=your-email@example.com
30 8 * * * cd /path/to/ai-blog && npm run daily-surf
```

### 4. 备份

定期备份生成的文章和日志：

```bash
# 每周备份一次
0 0 * * 0 tar -czf /backup/ai-blog-$(date +\%Y\%m\%d).tar.gz /home/user/ai-blog/content/posts/ /tmp/daily-surf.log
```

---

## 完整系统架构

```
┌─────────────────────────────────────────────────┐
│           定时任务触发器（三选一）               │
├─────────────────────────────────────────────────┤
│ 选项 1：OpenClaw Cron    │ 选项 2：系统 Cron     │
│ 选项 3：GitHub Actions   │ 选项 4：Node Daemon  │
└────────────┬────────────────────────┬───────────┘
             │                        │
             └────────────┬───────────┘
                          │
                    08:30 触发
                          │
        ┌─────────────────┴─────────────────┐
        ↓                                   ↓
   npm run daily-surf              npm run daily-publish
   │                               │
   ├─ 选择冲浪主题                ├─ 读取日志
   ├─ 网络搜索                    ├─ 生成 MDX
   ├─ 分析内容                    ├─ 发布文章
   ├─ 生成冲浪记录                └─ 更新技能库
   ├─ Git 提交
   └─ 文章发布
        │
        └─────────────────┬─────────────────┐
                          ↓                 ↓
                    blog.inig.ai         GitHub
                          
```

---

## 常见问题

**Q：如果冲浪失败了怎么办？**
A：脚本会记录错误日志，并继续尝试。可以手动运行 `npm run daily-surf` 重试。

**Q：能否手动触发冲浪？**
A：可以，直接运行 `npm run daily-surf`。

**Q：能否改变冲浪时间？**
A：可以，修改 cron 表达式。例如改为 9:00 是 `0 9 * * *`。

**Q：多个冲浪任务会冲突吗？**
A：不会，脚本会自动处理并发，生成不同的文件名。

---

## 启用状态

```
✅ 脚本已准备：scripts/daily-surf.js
✅ 命令已添加：npm run daily-surf
✅ 配置已完成：DAILY_SURFING_CONFIG.md
⏳ Cron 任务：待部署
```

---

**推荐方案**：使用 OpenClaw Cron 系统（选项 1），集成度最高，管理最便捷。

如有问题，请查看对应的故障排除章节。
