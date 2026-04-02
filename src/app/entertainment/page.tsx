import Link from 'next/link';
import { getGames } from '@/lib/games';
import { Gamepad2, Zap, Star, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'H5 游戏 | AI Blog',
  description: '优秀的 H5 网页游戏合集',
};

export default function EntertainmentPage() {
  const games = getGames();

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
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* 页面标题 */}
        <div className="mb-12 lg:mb-16 space-y-3 lg:space-y-4">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-2 lg:mb-3">H5 游戏</h1>
            <p className="text-xs lg:text-sm text-muted-foreground font-medium">创意来自 TAL/好未来 龙虾大赛</p>
          </div>
          <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
            优秀的网页游戏收集和创意游戏展示
          </p>
          <div className="h-1 w-12 lg:w-16 bg-gradient-to-r from-purple-500 to-transparent rounded-full mt-3 lg:mt-4" />
        </div>

        {/* 游戏网格 */}
        {games.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
            {games.map((game) => (
              <Link key={game.id} href={`/entertainment/${game.id}`}>
                <div className="group relative h-full">
                  {/* 背景卡片 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* 内容容器 */}
                  <div className="relative border border-border rounded-lg lg:rounded-xl overflow-hidden hover:border-purple-500/50 hover:shadow-lg transition-all duration-300 cursor-pointer bg-background/50 backdrop-blur-sm flex flex-col h-full">
                    {/* 游戏缩略图 */}
                    {game.thumbnail && (
                      <div className="relative w-full h-40 lg:h-48 bg-muted flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
                        <img
                          src={game.thumbnail}
                          alt={game.title}
                          className="w-full h-full object-cover"
                        />
                        {/* 覆盖层 */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                      </div>
                    )}

                    {/* 游戏信息 */}
                    <div className="p-4 lg:p-6 flex-1 flex flex-col gap-3 lg:gap-4">
                      {/* 标题和难度 */}
                      <div className="flex items-start justify-between gap-2 lg:gap-3">
                        <h3 className="text-lg lg:text-xl font-bold text-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200 line-clamp-2 flex-1">
                          {game.title}
                        </h3>
                        {game.difficulty && (
                          <Badge variant="secondary" className="flex-shrink-0 whitespace-nowrap text-xs lg:text-sm">
                            <Zap className="h-3 w-3 mr-1" />
                            {difficultyLabel(game.difficulty)}
                          </Badge>
                        )}
                      </div>

                      {/* 描述 */}
                      <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {game.description}
                      </p>

                      {/* 游戏统计 */}
                      <div className="flex items-center gap-3 lg:gap-4 text-xs lg:text-sm text-muted-foreground pt-1 lg:pt-2 flex-wrap">
                        {game.plays !== undefined && (
                          <div className="flex items-center gap-1 lg:gap-1.5">
                            <TrendingUp className="h-3 w-3 lg:h-4 lg:w-4 text-purple-500/60" />
                            <span className="font-medium">{game.plays} 次</span>
                          </div>
                        )}
                        {game.rating !== undefined && (
                          <div className="flex items-center gap-1 lg:gap-1.5">
                            <Star className="h-3 w-3 lg:h-4 lg:w-4 text-purple-500/60 fill-purple-500/60" />
                            <span className="font-medium">{game.rating}</span>
                          </div>
                        )}
                      </div>

                      {/* 标签 */}
                      {game.tags.length > 0 && (
                        <div className="flex gap-2 flex-wrap pt-1 lg:pt-2 border-t border-border/50 lg:border-border mt-2 lg:mt-0">
                          {game.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs bg-purple-500/10 border-purple-500/30 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20 transition-colors"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* 右下角指示 */}
                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Gamepad2 className="h-5 w-5 text-purple-500 animate-pulse" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="mb-4 text-5xl">🎮</div>
            <p className="text-lg text-muted-foreground">暂无游戏，敬请期待</p>
            <p className="text-sm text-muted-foreground mt-2">我们正在收集最有趣的 H5 网页游戏</p>
          </div>
        )}
      </div>
    </main>
  );
}
