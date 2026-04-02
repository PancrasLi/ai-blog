import { getGameById, getGameIds } from '@/lib/games';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    gameId: string;
  };
}

export async function generateStaticParams() {
  const gameIds = getGameIds();
  return gameIds.map((gameId) => ({
    gameId,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps) {
  const game = getGameById(params.gameId);

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

export default function GamePage({ params }: PageProps) {
  const game = getGameById(params.gameId);

  if (!game) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* 返回链接 */}
        <Link
          href="/entertainment"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 mb-8 inline-block"
        >
          ← 返回游戏列表
        </Link>

        {/* 游戏标题 */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            {game.title}
          </h1>
          <p className="text-base text-muted-foreground">
            {game.description}
          </p>
        </header>

        {/* 游戏播放区域 */}
        <div className="border border-border rounded-lg overflow-hidden mb-8 bg-black">
          <div className="aspect-video w-full flex items-center justify-center">
            <iframe
              src={`/games/${game.file}`}
              title={game.title}
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-same-origin"
              allowFullScreen
            />
          </div>
        </div>

        {/* 游戏信息 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* 游戏统计 */}
          <div className="border border-border rounded-lg p-6">
            <h3 className="font-semibold text-foreground mb-4">游戏信息</h3>
            <div className="space-y-3 text-sm">
              {game.difficulty && (
                <div>
                  <span className="text-muted-foreground">难度:</span>
                  <span className="ml-2 text-foreground">
                    {game.difficulty === 'easy'
                      ? '简单'
                      : game.difficulty === 'medium'
                      ? '中等'
                      : '困难'}
                  </span>
                </div>
              )}
              {game.category && (
                <div>
                  <span className="text-muted-foreground">分类:</span>
                  <span className="ml-2 text-foreground">{game.category}</span>
                </div>
              )}
              {game.plays !== undefined && (
                <div>
                  <span className="text-muted-foreground">播放:</span>
                  <span className="ml-2 text-foreground">{game.plays}</span>
                </div>
              )}
              {game.rating !== undefined && (
                <div>
                  <span className="text-muted-foreground">评分:</span>
                  <span className="ml-2 text-foreground">
                    {game.rating} ⭐
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* 游戏标签 */}
          {game.tags.length > 0 && (
            <div className="border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4">标签</h3>
              <div className="flex flex-wrap gap-2">
                {game.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 border border-border rounded-full text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 控制说明 */}
          <div className="border border-border rounded-lg p-6">
            <h3 className="font-semibold text-foreground mb-4">提示</h3>
            <p className="text-sm text-muted-foreground">
              使用键盘和鼠标操作游戏。每个游戏的控制方式可能不同。
            </p>
          </div>
        </div>

        {/* 分隔线 */}
        <div className="border-t border-border my-8" />

        {/* 返回按钮 */}
        <div className="flex justify-center">
          <Link
            href="/entertainment"
            className="px-6 py-2 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors duration-200 rounded-lg"
          >
            返回游戏列表
          </Link>
        </div>
      </div>
    </main>
  );
}
