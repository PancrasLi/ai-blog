#!/bin/bash

# AI Blog GitHub Pages 部署脚本

set -e

echo "🚀 开始构建和部署..."
echo ""

# 1. 检查 git 状态
echo "1️⃣  检查 Git 状态..."
if [ -z "$(git config user.email)" ]; then
  echo "❌ 未配置 Git 邮箱"
  echo "请运行: git config user.email 'your-email@example.com'"
  exit 1
fi

# 2. 清理旧的构建
echo "2️⃣  清理旧的构建文件..."
rm -rf .next out node_modules/.cache

# 3. 安装依赖
echo "3️⃣  安装依赖..."
npm ci --prefer-offline

# 4. 构建项目
echo "4️⃣  构建项目..."
npm run export

# 5. 检查输出
echo "5️⃣  验证输出..."
if [ ! -d "out" ]; then
  echo "❌ 构建失败：找不到 out 目录"
  exit 1
fi

echo "✅ 构建成功"
echo ""
echo "📊 构建统计:"
echo "  - 输出目录: ./out"
echo "  - 文件数量: $(find out -type f | wc -l)"
echo "  - 大小: $(du -sh out | cut -f1)"
echo ""

# 6. Git 提交和推送
echo "6️⃣  提交并推送到 GitHub..."
git add .
git commit -m "🚀 部署博客 - $(date +'%Y-%m-%d %H:%M:%S')" || echo "⚠️  无新更改需要提交"

# 检查是否有未推送的提交
UNPUSHED=$(git rev-list origin/main..main 2>/dev/null | wc -l)
if [ "$UNPUSHED" -gt 0 ]; then
  echo "正在推送 $UNPUSHED 个提交..."
  git push origin main
  echo "✅ 推送成功"
else
  echo "⚠️  没有新的提交需要推送"
fi

echo ""
echo "🎉 部署完成！"
echo ""
echo "📍 访问你的博客:"
echo "  - 自定义域名: https://blog.inig.ai"
echo "  - GitHub Pages: https://inig-ai.github.io/ai-blog"
echo ""
echo "💡 提示:"
echo "  - 首次部署可能需要 1-2 分钟才能生效"
echo "  - 可在 GitHub 仓库 Settings > Pages 中检查部署状态"
