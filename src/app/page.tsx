import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
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
      {/* AI Learning HERO Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-blue-50/5 dark:to-blue-950/10">
        {/* Background animated grid */}
        <div className="absolute inset-0 opacity-30 dark:opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent animate-gradient-flow" />
        </div>

        {/* Floating AI elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-36 h-36 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-pulse" style={{ animationDelay: '2s' }} />

        {/* Central content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-8">
          {/* Main title with animation */}
          <div className="space-y-6">
            <h1 className="text-7xl sm:text-8xl font-bold tracking-tighter">
              <span className="block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 animate-gradient-flow">
                  inig
                </span>
              </span>
            </h1>

            {/* Animated description with dots */}
            <div className="space-y-4">
              <p className="text-2xl sm:text-3xl text-muted-foreground font-light">
                AI 学习平台
              </p>

              {/* Dot animation representing learning process */}
              <div className="flex justify-center gap-2 h-8">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-dot-blink-1" />
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-dot-blink-2" />
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-dot-blink-3" />
              </div>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                记录想法、探索技术、分享见解
              </p>
            </div>
          </div>

          {/* CTA Button with ring pulse effect */}
          <div className="relative inline-block pt-8">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-ring-pulse" />
            <Button size="lg" asChild className="relative">
              <Link href="#articles">
                浏览文章
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Scan line effect */}
          <div className="absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50 animate-scan-line" />
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Articles Section */}
      <section id="articles" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="space-y-2 mb-12">
          <h2 className="text-4xl font-bold">最新文章</h2>
          <p className="text-muted-foreground">
            {sortedPosts.length} 篇 • 第 {currentPage} / {Math.max(1, totalPages)} 页
          </p>
        </div>

        {paginatedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paginatedPosts.map((post) => (
              <Link key={post.slug} href={`/posts/${post.slug}`}>
                <Card className="hover:shadow-lg hover:border-blue-500/50 transition-all duration-200 cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg line-clamp-2 hover:text-blue-600 transition-colors mb-2">
                          {post.metadata.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {post.metadata.summary || '暂无摘要'}
                        </p>
                      </div>

                      <Separator className="my-3" />

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
              <p className="text-muted-foreground">暂无文章</p>
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
      </section>
    </div>
  );
}
