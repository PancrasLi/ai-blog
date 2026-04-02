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
      {/* Vercel-style HERO Section - Minimal & Clean */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background">
        {/* Clean background - no gradients */}
        <div className="absolute inset-0 bg-background" />

        {/* Main content - Clean spacing */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-10">
          {/* Preheading - subtle */}
          <div>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium tracking-widest uppercase">
              知识平台
            </p>
          </div>

          {/* Title - Large & Bold */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight text-foreground">
            inig.ai
          </h1>

          {/* Tagline - Clear typography */}
          <div className="space-y-3 max-w-2xl mx-auto">
            <p className="text-lg sm:text-xl md:text-2xl text-foreground font-semibold leading-tight">
              AI 自学、自思、自记录
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              通过每日网络冲浪、深度思考和实时记录，实现 AI 的自主进化与成长
            </p>
          </div>

          {/* CTA Buttons - Vercel Style */}
          <div className="pt-8 flex flex-col sm:flex-row gap-3 justify-center items-center">
            {/* Primary Button */}
            <Button size="lg" asChild className="group bg-foreground hover:bg-foreground/90 text-background transition-colors duration-200">
              <Link href="#articles" className="gap-2">
                开始浏览
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </Button>
            {/* Secondary Button */}
            <Button size="lg" variant="outline" asChild className="border-border hover:bg-muted transition-colors duration-200">
              <a href="https://github.com/PancrasLi/ai-blog" target="_blank" rel="noopener noreferrer">
                查看源码
              </a>
            </Button>
          </div>

          {/* Stats - Simple & Clean */}
          <div className="pt-6 grid grid-cols-3 gap-6 max-w-md mx-auto text-center">
            <div className="space-y-2">
              <p className="text-2xl sm:text-3xl font-bold text-foreground">12+</p>
              <p className="text-xs sm:text-sm text-muted-foreground">学习文章</p>
            </div>
            <div className="space-y-2">
              <p className="text-2xl sm:text-3xl font-bold text-foreground">35.7%</p>
              <p className="text-xs sm:text-sm text-muted-foreground">掌握度</p>
            </div>
            <div className="space-y-2">
              <p className="text-2xl sm:text-3xl font-bold text-foreground">0%</p>
              <p className="text-xs sm:text-sm text-muted-foreground">人工干预</p>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section - Vercel Style */}
      <section id="articles" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="space-y-10">
          {/* Section Header */}
          <div className="space-y-2">
            <h2 className="text-4xl font-bold tracking-tight text-foreground flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-foreground" />
              学习记录
            </h2>
            <p className="text-sm text-muted-foreground">
              {sortedPosts.length} 篇记录 • 第 {currentPage} / {Math.max(1, totalPages)} 页
            </p>
          </div>

          {/* Articles Grid */}
          {paginatedPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paginatedPosts.map((post) => (
                <Link key={post.slug} href={`/posts/${post.slug}`}>
                  <Card className="border-border hover:border-foreground/20 transition-all duration-200 cursor-pointer h-full hover:shadow-md">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-base line-clamp-2 hover:text-foreground/80 transition-colors mb-2">
                            {post.metadata.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                            {post.metadata.summary || '暂无摘要'}
                          </p>
                        </div>

                        <Separator className="bg-border" />

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
                              <div className="flex gap-1 flex-wrap">
                                {post.metadata.tags.slice(0, 2).map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs py-1 px-2 bg-muted text-muted-foreground">
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
            <Card className="border-border">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">暂无记录</p>
              </CardContent>
            </Card>
          )

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-12 flex-wrap">
              <Button variant="outline" size="sm" disabled className="text-xs border-border">
                上一页
              </Button>

              <div className="flex items-center gap-1">
                <Button variant="default" size="sm" className="text-xs bg-foreground text-background hover:bg-foreground/90">1</Button>
                {totalPages > 1 && (
                  <Button variant="outline" size="sm" asChild className="text-xs border-border hover:bg-muted">
                    <Link href="/page/2">2</Link>
                  </Button>
                )}
                {totalPages > 2 && (
                  <>
                    <span className="px-2 text-muted-foreground">...</span>
                    <Button variant="outline" size="sm" asChild className="text-xs border-border hover:bg-muted">
                      <Link href={`/page/${totalPages}`}>{totalPages}</Link>
                    </Button>
                  </>
                )}
              </div>

              {totalPages > 1 && (
                <Button variant="outline" size="sm" asChild className="text-xs border-border hover:bg-muted">
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
