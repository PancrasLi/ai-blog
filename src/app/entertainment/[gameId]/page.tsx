import { getGameById, getGameIds } from '@/lib/games';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    gameId: string;
  }>;
}

export async function generateStaticParams() {
  const gameIds = getGameIds();
  return gameIds.map((gameId) => ({
    gameId,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const game = getGameById(resolvedParams.gameId);

  if (!game) {
    return {
      title: 'Not Found',
      description: 'The game you are looking for does not exist.',
    };
  }

  return {
    title: `${game.title} | H5 游戏`,
    description: game.description,
  };
}

export default async function GamePage({ params }: PageProps) {
  const resolvedParams = await params;
  const game = getGameById(resolvedParams.gameId);

  if (!game) {
    notFound();
  }

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
            href="/entertainment"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors ml-4"
          >
            ← 返回
          </Link>
        </div>
      </div>

      {/* 主游戏区域 - 占据剩余所有空间 */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4 overflow-hidden">
        {/* 游戏播放区域 - 主要内容 */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 border border-border rounded-lg overflow-hidden bg-black flex items-center justify-center">
            <iframe
              src={`/games/${game.file}`}
              title={game.title}
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-same-origin"
              allowFullScreen
            />
          </div>
        </div>

        {/* 侧边栏信息 - 在大屏幕显示 */}
        <div className="w-full lg:w-80 flex flex-col gap-4 overflow-y-auto pb-4 lg:pb-0">
          {/* 游戏统计 */}
          <div className="border border-border rounded-lg p-4 bg-muted/50 flex-shrink-0">
            <h3 className="font-semibold text-foreground mb-3 text-sm">游戏信息</h3>
            <div className="space-y-2 text-xs">
              {game.difficulty && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">难度</span>
                  <span className="text-foreground font-medium">
                    {game.difficulty === 'easy'
                      ? '简单'
                      : game.difficulty === 'medium'
                      ? '中等'
                      : '困难'}
                  </span>
                </div>
              )}
              {game.category && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">分类</span>
                  <span className="text-foreground font-medium">{game.category}</span>
                </div>
              )}
              {game.plays !== undefined && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">播放</span>
                  <span className="text-foreground font-medium">{game.plays}</span>
                </div>
              )}
              {game.rating !== undefined && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">评分</span>
                  <span className="text-foreground font-medium">
                    {game.rating} ⭐
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* 游戏标签 */}
          {game.tags.length > 0 && (
            <div className="border border-border rounded-lg p-4 bg-muted/50 flex-shrink-0">
              <h3 className="font-semibold text-foreground mb-3 text-sm">标签</h3>
              <div className="flex flex-wrap gap-2">
                {game.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 border border-border rounded bg-background text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 控制说明 */}
          <div className="border border-border rounded-lg p-4 bg-muted/50 flex-shrink-0">
            <h3 className="font-semibold text-foreground mb-3 text-sm">操作提示</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              使用键盘和鼠标操作游戏。每个游戏的控制方式可能不同，请按照游戏内提示操作。
            </p>
          </div>

          {/* 返回按钮 */}
          <div className="flex-shrink-0 lg:pt-2">
            <Link
              href="/entertainment"
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
