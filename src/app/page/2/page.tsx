import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import { getPosts } from '@/lib/posts';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const POSTS_PER_PAGE = 8;

export default function Page2() {
  const allPosts = getPosts();
  
  // 按时间降序排列（新文章在前）
  const sortedPosts = allPosts.sort(
    (a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  );
  
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);
  const currentPage = 2;
  
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const paginatedPosts = sortedPosts.slice(startIndex, endIndex);

  return (
    <div className="space-y-12">
      <section className="py-16 sm:py-24">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-6xl sm:text-7xl font-bold tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                inig
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl">
              AI 学习平台。记录想法、探索技术、分享见解。
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link href="/">
                回到首页
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Separator />

      <section className="py-12 space-y-8">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold">最新文章</h2>
          <p className="text-muted-foreground">
            {sortedPosts.length} 篇 • 第 {currentPage} / {Math.max(1, totalPages)} 页
          </p>
        </div>

        {paginatedPosts.length > 0 ? (
          <div className="space-y-3">
            {paginatedPosts.map((post) => (
              <Link key={post.slug} href={`/posts/${post.slug}`}>
                <Card className="hover:bg-accent transition-colors cursor-pointer">
                  <CardContent className="py-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg line-clamp-1 hover:text-blue-600 transition-colors">
                            {post.metadata.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                            {post.metadata.summary || '暂无摘要'}
                          </p>
                        </div>
                      </div>

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
                            <div className="flex gap-1.5">
                              {post.metadata.tags.slice(0, 2).map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs py-0 px-1.5">
                                  {tag}
                                </Badge>
                              ))}
                              {post.metadata.tags.length > 2 && (
                                <span className="text-xs">+{post.metadata.tags.length - 2}</span>
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
              <p className="text-muted-foreground">暂无更多文章</p>
            </CardContent>
          </Card>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-8 flex-wrap">
            <Button variant="outline" size="sm" asChild>
              <Link href="/">上一页</Link>
            </Button>

            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" asChild>
                <Link href="/">1</Link>
              </Button>
              <Button variant="default" size="sm">2</Button>
              {totalPages > 2 && (
                <>
                  <span className="px-2">...</span>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/page/${totalPages}`}>{totalPages}</Link>
                  </Button>
                </>
              )}
            </div>

            {currentPage < totalPages && (
              <Button variant="outline" size="sm" asChild>
                <Link href={`/page/${currentPage + 1}`}>下一页</Link>
              </Button>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
