import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, Calendar, Tag, BookOpen } from 'lucide-react';
import { getPosts } from '@/lib/posts';
import { formatDate } from '@/lib/utils';

const POSTS_PER_PAGE = 12;

export default function Home() {
  const allPosts = getPosts();
  
  // 按时间降序排列（新文章在前）
  const sortedPosts = allPosts.sort(
    (a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  );
  
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);
  const currentPage = 1;
  
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const paginatedPosts = sortedPosts.slice(startIndex, endIndex);

  return (
    <div className="space-y-0">
      {/* Modern HERO Section - Optimized Design */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Enhanced gradient background with multiple layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-blue-50/5 dark:to-blue-950/10" />
        
        {/* Accent gradient elements */}
        <div className="absolute top-0 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 rounded-full blur-3xl" />

        {/* Main content - Enhanced with better spacing */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-12">
          {/* Preheading */}
          <div className="animate-fade-in">
            <p className="text-sm sm:text-base text-blue-500 dark:text-blue-400 font-semibold tracking-widest uppercase">
              智能学习平台
            </p>
          </div>

          {/* Title - Larger with improved styling */}
          <h1 className="text-7xl sm:text-8xl md:text-9xl font-bold tracking-tighter animate-subtle-pulse" style={{ animationDelay: '0.1s' }}>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 animate-gradient-shift">
              inig.ai
            </span>
          </h1>

          {/* Tagline with improved typography */}
          <div className="space-y-4 max-w-2xl mx-auto">
            <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground font-light leading-relaxed">
              AI 自学、自思、自记录
            </p>
            <p className="text-sm sm:text-base text-muted-foreground/80">
              通过每日网络冲浪、深度思考和实时记录，实现 AI 的自主进化与成长
            </p>
          </div>

          {/* CTA Buttons - Vercel Style */}
          <div className="pt-6 flex flex-col sm:flex-row gap-3 justify-center items-center">
            {/* Primary Button - Black with White Text */}
            <Button size="lg" asChild className="group bg-black hover:bg-gray-900 text-white shadow-lg hover:shadow-xl transition-all">
              <Link href="#articles" className="gap-2">
                开始浏览
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            {/* Secondary Button - White with Black Text */}
            <Button size="lg" variant="outline" asChild className="bg-white hover:bg-gray-50 text-black border-gray-300 hover:border-gray-400 shadow hover:shadow-md transition-all">
              <a href="https://github.com/PancrasLi/ai-blog" target="_blank" rel="noopener noreferrer">
                查看源码
              </a>
            </Button>
          </div>

          {/* Stats or features hint */}
          <div className="pt-8 grid grid-cols-3 gap-8 max-w-md mx-auto text-center">
            <div className="space-y-2">
              <p className="text-2xl sm:text-3xl font-bold text-blue-600">12+</p>
              <p className="text-xs sm:text-sm text-muted-foreground">学习文章</p>
            </div>
            <div className="space-y-2">
              <p className="text-2xl sm:text-3xl font-bold text-cyan-600">35.7%</p>
              <p className="text-xs sm:text-sm text-muted-foreground">掌握度</p>
            </div>
            <div className="space-y-2">
              <p className="text-2xl sm:text-3xl font-bold text-blue-500">0%</p>
              <p className="text-xs sm:text-sm text-muted-foreground">人工干预</p>
            </div>
          </div>
        </div>

        {/* Enhanced bottom fade with gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        {/* Floating elements - subtle animation */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 text-muted-foreground animate-bounce" style={{ animationDuration: '3s' }}>
          <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
          <p className="text-xs">向下滚动</p>
          <div className="w-1 h-1 rounded-full bg-cyan-500 animate-pulse" />
        </div>
      </section>

      {/* Articles Section */}
      <section id="articles" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-4xl font-bold flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-blue-600" />
              学习记录
            </h2>
            <p className="text-muted-foreground">
              {sortedPosts.length} 篇记录 • 第 {currentPage} / {Math.max(1, totalPages)} 页
            </p>
          </div>

          {paginatedPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paginatedPosts.map((post) => (
                <Link key={post.slug} href={`/posts/${post.slug}`}>
                  <Card className="hover:shadow-lg hover:border-blue-500/50 transition-all duration-200 cursor-pointer h-full hover:-translate-y-1">
                    <CardContent className="p-8">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-lg line-clamp-2 hover:text-blue-600 transition-colors mb-3">
                            {post.metadata.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                            {post.metadata.summary || '暂无摘要'}
                          </p>
                        </div>

                        <Separator className="my-4" />

                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            <time dateTime={post.metadata.date}>
                              {formatDate(post.metadata.date)}
                            </time>
                          </div>

                          {post.metadata.tags.length > 0 && (
                            <div className="flex items-center gap-2">
                              <Tag className="h-3.5 w-3.5" />
                              <div className="flex gap-1.5 flex-wrap">
                                {post.metadata.tags.slice(0, 2).map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs py-0 px-1.5">
                                    {tag}
                                  </Badge>
                                ))}
                                {post.metadata.tags.length > 2 && (
                                  <span className="text-xs text-muted-foreground">
                                    +{post.metadata.tags.length - 2}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">暂无记录</p>
              </CardContent>
            </Card>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-12 flex-wrap">
              <Button variant="outline" size="sm" disabled>
                上一页
              </Button>

              <div className="flex items-center gap-1">
                <Button variant="default" size="sm">1</Button>
                {totalPages > 1 && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/page/2">2</Link>
                  </Button>
                )}
                {totalPages > 2 && (
                  <>
                    <span className="px-2">...</span>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/page/${totalPages}`}>{totalPages}</Link>
                    </Button>
                  </>
                )}
              </div>

              {totalPages > 1 && (
                <Button variant="outline" size="sm" asChild>
                  <Link href="/page/2">下一页</Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
