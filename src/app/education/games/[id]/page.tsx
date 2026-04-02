import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getEducationGames, getEducationGameById } from '@/lib/education-games';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Zap, Star, TrendingUp, Lightbulb } from 'lucide-react';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  const games = getEducationGames();
  return games.map((game) => ({
    id: game.id,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const game = getEducationGameById(id);

  if (!game) {
    return {
      title: '游戏未找到',
    };
  }

  return {
    title: `${game.title} - 教育游戏 | AI Blog`,
    description: game.description,
  };
}

export default async function EducationGamePage({ params }: PageProps) {
  const { id } = await params;
  const game = getEducationGameById(id);

  if (!game) {
    notFound();
  }

  const difficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return '简单';
      case 'medium':
        return '中等';
      case 'hard':
        return '困难';
      default:
        return difficulty;
    }
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* 顶部导航栏 */}
      <div className="border-b border-border bg-background/95 backdrop-blur px-4 py-3 sticky top-16 z-40">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">{game.title}</h1>
            <p className="text-sm text-muted-foreground">{game.description}</p>
          </div>
          <Link
            href="/education/games"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors ml-4"
          >
            ← 返回
          </Link>
        </div>
      </div>

      {/* 主游戏区域 */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4 overflow-hidden">
        {/* 游戏播放区域 */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 border border-border rounded-lg overflow-hidden bg-white flex items-center justify-center">
            <iframe
              src={`/games/${game.file}`}
              title={game.title}
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-same-origin"
              allowFullScreen
            />
          </div>
        </div>

        {/* 侧边栏信息 */}
        <div className="w-full lg:w-80 flex flex-col gap-4 overflow-y-auto pb-4 lg:pb-0">
          {/* 游戏信息 */}
          <div className="border border-border rounded-lg p-4 bg-muted/50 flex-shrink-0">
            <h3 className="font-semibold text-foreground mb-3 text-sm">游戏信息</h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">难度</span>
                <span className="text-foreground font-medium">{difficultyLabel(game.difficulty)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">分类</span>
                <span className="text-foreground font-medium capitalize">{game.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">评分</span>
                <span className="text-foreground font-medium">{game.rating} ⭐</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">热度</span>
                <span className="text-foreground font-medium">{game.plays} 次</span>
              </div>
            </div>
          </div>

          {/* 益处说明 */}
          <div className="border border-border rounded-lg p-4 bg-green-500/5 flex-shrink-0">
            <h3 className="font-semibold text-foreground mb-3 text-sm flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-green-600" />
              学习益处
            </h3>
            <p className="text-sm text-foreground leading-relaxed">
              {game.benefits}
            </p>
          </div>

          {/* 游戏标签 */}
          {game.tags.length > 0 && (
            <div className="border border-border rounded-lg p-4 bg-muted/50 flex-shrink-0">
              <h3 className="font-semibold text-foreground mb-3 text-sm">标签</h3>
              <div className="flex flex-wrap gap-2">
                {game.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-xs bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* 操作提示 */}
          <div className="border border-border rounded-lg p-4 bg-muted/50 flex-shrink-0">
            <h3 className="font-semibold text-foreground mb-3 text-sm">操作提示</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              使用键盘和鼠标操作游戏。每个游戏的控制方式可能不同，请按照游戏内提示操作。
            </p>
          </div>

          {/* 返回按钮 */}
          <div className="flex-shrink-0 lg:pt-2">
            <Link
              href="/education/games"
              className="w-full px-4 py-2 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors rounded-lg text-sm font-medium text-center block"
            >
              返回游戏列表
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
