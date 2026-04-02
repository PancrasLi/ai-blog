import Link from 'next/link';
import { getEducationPosts } from '@/lib/education';
import { Calendar, Tag, Folder } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: '教育资讯 | AI Blog',
  description: '教育行业前沿信息和资讯',
};

export default function EducationPage() {
  const posts = getEducationPosts();

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* 页面标题 */}
        <div className="mb-16 space-y-4">
          <div>
            <h1 className="text-5xl font-bold text-foreground mb-3">教育资讯</h1>
            <p className="text-sm text-muted-foreground font-medium">创意来自 TAL/好未来 龙虾大赛</p>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            记录教育行业的前沿信息、发展趋势和创新案例
          </p>
          <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-transparent rounded-full mt-4" />
        </div>

        {/* 文章列表 */}
        {posts.length > 0 ? (
          <div className="space-y-8">
            {posts.map((post, index) => (
              <Link key={post.slug} href={`/education/${post.slug}`}>
                <article className="group relative">
                  {/* 背景卡片 */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* 内容容器 */}
                  <div className="relative border border-border rounded-xl px-8 py-8 hover:border-blue-500/50 hover:shadow-lg transition-all duration-300 cursor-pointer bg-background/50 backdrop-blur-sm">
                    <div className="flex flex-col gap-4">
                      {/* 标题和分类 */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h2 className="text-2xl font-bold text-foreground mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-2">
                            {post.metadata.title}
                          </h2>
                        </div>
                        {post.metadata.category && (
                          <Badge variant="secondary" className="flex-shrink-0 whitespace-nowrap">
                            <Folder className="h-3 w-3 mr-1" />
                            {post.metadata.category}
                          </Badge>
                        )}
                      </div>

                      {/* 摘要 */}
                      <p className="text-base text-muted-foreground leading-relaxed line-clamp-2">
                        {post.metadata.summary}
                      </p>

                      {/* 元数据 */}
                      <div className="flex items-center gap-6 text-sm text-muted-foreground pt-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-blue-500/60" />
                          <time className="font-medium">{post.metadata.date}</time>
                        </div>
                        {post.metadata.tags.length > 0 && (
                          <div className="flex items-center gap-2">
                            <Tag className="h-4 w-4 text-blue-500/60" />
                            <span className="font-medium">{post.metadata.tags.length} 标签</span>
                          </div>
                        )}
                      </div>

                      {/* 标签 */}
                      {post.metadata.tags.length > 0 && (
                        <div className="flex gap-2 flex-wrap pt-2">
                          {post.metadata.tags.map((tag) => (
                            <Badge 
                              key={tag} 
                              variant="outline"
                              className="text-xs bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 transition-colors"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* 右上角指示 */}
                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="mb-4 text-5xl">📚</div>
            <p className="text-lg text-muted-foreground">暂无教育资讯，敬请期待</p>
            <p className="text-sm text-muted-foreground mt-2">我们正在收集最新的教育行业信息</p>
          </div>
        )}
      </div>
    </main>
  );
}
