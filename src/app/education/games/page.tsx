import Link from 'next/link';
import { getEducationGames } from '@/lib/education-games';
import { Zap, TrendingUp, Star, Lightbulb } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: '教育游戏 | AI Blog',
  description: '益智教育小游戏合集，提升脑力和学习能力',
};

export default function EducationGamesPage() {
  const games = getEducationGames();

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
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-2 lg:mb-3">教育游戏</h1>
            <p className="text-xs lg:text-sm text-muted-foreground font-medium">创意来自 TAL/好未来 龙虾大赛</p>
          </div>
          <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
            精选益智教育游戏，通过游戏方式提升脑力、记忆、计算、反应等多维度能力
          </p>
          <div className="h-1 w-12 lg:w-16 bg-gradient-to-r from-green-500 to-transparent rounded-full mt-3 lg:mt-4" />
        </div>

        {/* 游戏网格 */}
        {games.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
            {games.map((game) => (
              <Link key={game.id} href={`/education/games/${game.id}`}>
                <div className="group relative h-full">
                  {/* 背景卡片 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* 内容容器 */}
                  <div className="relative border border-border rounded-lg lg:rounded-xl px-4 lg:px-6 py-6 lg:py-8 hover:border-green-500/50 hover:shadow-lg transition-all duration-300 cursor-pointer bg-background/50 backdrop-blur-sm flex flex-col h-full">
                    {/* 标题和难度 */}
                    <div className="flex items-start justify-between gap-2 lg:gap-3 mb-3 lg:mb-4">
                      <h3 className="text-lg lg:text-xl font-bold text-foreground group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-200 line-clamp-2 flex-1">
                        {game.title}
                      </h3>
                      <Badge variant="secondary" className="flex-shrink-0 whitespace-nowrap text-xs lg:text-sm">
                        <Zap className="h-3 w-3 mr-1" />
                        {difficultyLabel(game.difficulty)}
                      </Badge>
                    </div>

                    {/* 描述 */}
                    <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-3 lg:mb-4">
                      {game.description}
                    </p>

                    {/* 益处 */}
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg px-3 py-2 mb-3 lg:mb-4 flex items-start gap-2">
                      <Lightbulb className="h-3 w-3 lg:h-4 lg:w-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                        {game.benefits}
                      </span>
                    </div>

                    {/* 游戏统计 */}
                    <div className="flex items-center gap-3 lg:gap-4 text-xs lg:text-sm text-muted-foreground pt-1 lg:pt-2 flex-wrap">
                      {game.plays !== undefined && (
                        <div className="flex items-center gap-1 lg:gap-1.5">
                          <TrendingUp className="h-3 w-3 lg:h-4 lg:w-4 text-green-500/60" />
                          <span className="font-medium">{game.plays} 次</span>
                        </div>
                      )}
                      {game.rating !== undefined && (
                        <div className="flex items-center gap-1 lg:gap-1.5">
                          <Star className="h-3 w-3 lg:h-4 lg:w-4 text-green-500/60 fill-green-500/60" />
                          <span className="font-medium">{game.rating}</span>
                        </div>
                      )}
                    </div>

                    {/* 标签 */}
                    {game.tags.length > 0 && (
                      <div className="flex gap-2 flex-wrap pt-2 lg:pt-4 mt-2 lg:mt-4 border-t border-border/50 lg:border-border">
                        {game.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400 hover:bg-green-500/20 transition-colors"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* 右下角指示 */}
                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <svg className="h-5 w-5 text-green-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="mb-4 text-5xl">🎮</div>
            <p className="text-lg text-muted-foreground">暂无教育游戏，敬请期待</p>
            <p className="text-sm text-muted-foreground mt-2">我们正在收集最有效的益智教育游戏</p>
          </div>
        )}
      </div>
    </main>
  );
}
