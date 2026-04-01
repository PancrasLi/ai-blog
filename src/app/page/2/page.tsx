import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, BookOpen, Code2, Sparkles, ChevronLeft, ChevronRight, Calendar, Tag } from 'lucide-react';
import { getPosts } from '@/lib/posts';
import { formatDate } from '@/lib/utils';

const POSTS_PER_PAGE = 5;

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
      <section className="py-20">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="inline-flex">
              <Badge variant="outline" className="text-sm">
                <Sparkles className="mr-2 h-3 w-3" />
                现代化博客系统
              </Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              inig.ai
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                知音楼 AI 学习平台
              </span>
            </h1>
          </div>

          <div className="flex flex-wrap gap-3 pt-4">
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
          <h2 className="text-3xl font-bold">最新文章</h2>
          <p className="text-muted-foreground">
            共 {sortedPosts.length} 篇文章 • 第 {currentPage} / {Math.max(1, totalPages)} 页
          </p>
        </div>

        {paginatedPosts.length > 0 ? (
          <div className="space-y-4">
            {paginatedPosts.map((post) => (
              <Link key={post.slug} href={`/posts/${post.slug}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="line-clamp-2 hover:text-blue-600 transition-colors">
                          {post.metadata.title}
                        </CardTitle>
                        <CardDescription className="mt-2 line-clamp-2">
                          {post.metadata.summary || '暂无摘要'}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <time dateTime={post.metadata.date}>
                          {formatDate(post.metadata.date)}
                        </time>
                      </div>

                      {post.metadata.tags.length > 0 && (
                        <div className="flex items-center gap-2">
                          <Tag className="h-4 w-4" />
                          <span>{post.metadata.tags.length} 标签</span>
                        </div>
                      )}
                    </div>

                    {post.metadata.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {post.metadata.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
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

        {totalPages > 1 && (
          <div className="flex items-center justify-between gap-2 pt-8 flex-wrap">
            <Button variant="outline" size="sm" asChild>
              <Link href="/">
                <ChevronLeft className="h-4 w-4 mr-2" />
                上一页
              </Link>
            </Button>

            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" asChild>
                <Link href="/">1</Link>
              </Button>
              <Button variant="default" size="sm">
                2
              </Button>
              {totalPages > 2 && (
                <>
                  <span className="px-2 text-muted-foreground">...</span>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/page/3`}>3</Link>
                  </Button>
                </>
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
            >
              <span className="opacity-50">
                下一页
                <ChevronRight className="h-4 w-4 ml-2" />
              </span>
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
