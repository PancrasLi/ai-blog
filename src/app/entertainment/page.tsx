import Link from 'next/link';
import { getGames } from '@/lib/games';

export const metadata = {
  title: 'H5 游戏 | AI Blog',
  description: '优秀的 H5 网页游戏合集',
};

export default function EntertainmentPage() {
  const games = getGames();

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* 页面标题 */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">H5 游戏</h1>
          <p className="text-sm text-muted-foreground">创意来自 TAL/好未来 龙虾大赛</p>
          <p className="text-base text-muted-foreground mt-4">
            优秀的网页游戏收集和创意游戏展示
          </p>
        </div>

        {/* 游戏网格 */}
        {games.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <Link key={game.id} href={`/entertainment/${game.id}`}>
                <div className="border border-border rounded-lg overflow-hidden hover:bg-muted transition-colors duration-200 cursor-pointer h-full flex flex-col">
                  {/* 游戏缩略图 */}
                  {game.thumbnail && (
                    <div className="w-full h-40 bg-muted flex items-center justify-center overflow-hidden">
                      <img
                        src={game.thumbnail}
                        alt={game.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* 游戏信息 */}
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-lg font-semibold text-foreground mb-2 hover:underline">
                      {game.title}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-3 flex-1">
                      {game.description}
                    </p>

                    {/* 游戏统计 */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      {game.difficulty && (
                        <span className="px-2 py-1 border border-border rounded">
                          {game.difficulty === 'easy'
                            ? '简单'
                            : game.difficulty === 'medium'
                            ? '中等'
                            : '困难'}
                        </span>
                      )}
                      {game.plays !== undefined && (
                        <span>播放: {game.plays}</span>
                      )}
                      {game.rating !== undefined && (
                        <span>评分: {game.rating} ⭐</span>
                      )}
                    </div>

                    {/* 标签 */}
                    {game.tags.length > 0 && (
                      <div className="flex gap-2 flex-wrap">
                        {game.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 border border-border rounded text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">暂无游戏，敬请期待</p>
          </div>
        )}
      </div>
    </main>
  );
}
