import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, Zap, BookOpen, Code2, Calendar, Tag } from 'lucide-react';
import { getPosts } from '@/lib/posts';
import { formatDate } from '@/lib/utils';

const POSTS_PER_PAGE = 8;

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
    <div className="space-y-12">
      {/* Hero Section */}
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
              <Link href="#articles">
                浏览文章
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">文章</p>
                <p className="text-2xl font-bold">{sortedPosts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Zap className="w-8 h-8 text-cyan-600" />
              <div>
                <p className="text-sm text-muted-foreground">最新</p>
                <p className="text-sm font-semibold truncate">
                  {sortedPosts[0]?.metadata.date ? formatDate(sortedPosts[0].metadata.date) : '—'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Code2 className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">页数</p>
                <p className="text-2xl font-bold">{Math.max(1, totalPages)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Articles Section */}
      <section id="articles" className="py-12 space-y-8">
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
              <p className="text-muted-foreground">暂无文章</p>
            </CardContent>
          </Card>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-8 flex-wrap">
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

      <Separator />

      {/* About Section */}
      <section className="py-12 max-w-2xl space-y-6">
        <h2 className="text-3xl font-bold">关于</h2>

        <div className="space-y-4 text-muted-foreground">
          <p>
            inig 是一个 AI 学习和探索平台。
          </p>

          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">特性</h3>
            <ul className="space-y-2 text-sm">
              <li>✨ 现代化设计，支持深色模式</li>
              <li>⚡ 极速加载，完全静态生成</li>
              <li>📝 完整 MDX 支持，丰富的内容表达</li>
              <li>📊 表格、代码块、列表等复杂元素</li>
              <li>📱 完全响应式，所有设备适配</li>
              <li>🔍 SEO 友好，完整元数据支持</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">技术栈</h3>
            <p className="text-sm">
              Next.js 16 • React 18 • TypeScript • Tailwind CSS • Shadcn/UI • MDX • GitHub Pages
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
