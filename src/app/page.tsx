import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, Calendar, Tag, BookOpen, Brain } from 'lucide-react';
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
      {/* AI Self-Learning HERO Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-blue-50/5 dark:to-blue-950/10" />

        {/* Central content with learning theme */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-12">
          {/* Main concept: AI Self-Learning and Recording */}
          <div className="space-y-8">
            {/* Brain icon with activity */}
            <div className="flex justify-center mb-8">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Brain className="w-12 h-12 text-blue-600 animate-insight-glow" />
                </div>
                {/* Knowledge nodes around brain */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-node-connect-1" />
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-8">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-node-connect-2" />
                </div>
                <div className="absolute left-0 top-1/2 transform -translate-x-8 -translate-y-1/2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-node-connect-3" />
                </div>
                <div className="absolute right-0 top-1/2 transform translate-x-8 -translate-y-1/2">
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-node-connect-4" />
                </div>
              </div>
            </div>

            {/* Main title with brain wave animation */}
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-1 h-8 bg-gradient-to-t from-blue-600 to-transparent rounded-full animate-brain-wave-1" />
                <div className="w-1 h-12 bg-gradient-to-t from-cyan-600 to-transparent rounded-full animate-brain-wave-2" />
                <div className="w-1 h-8 bg-gradient-to-t from-purple-600 to-transparent rounded-full animate-brain-wave-3" />
                <div className="w-1 h-12 bg-gradient-to-t from-pink-600 to-transparent rounded-full animate-brain-wave-4" />
              </div>

              <h1 className="text-6xl sm:text-7xl font-bold tracking-tighter">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600">
                  inig
                </span>
              </h1>

              {/* Three-part concept presentation */}
              <div className="space-y-4">
                <div className="text-2xl sm:text-3xl text-muted-foreground font-light">
                  <span className="block animate-fade-in-text-1">
                    AI 自己学习
                  </span>
                  <span className="block text-lg text-muted-foreground/70 mt-2">↓</span>
                  <span className="block animate-fade-in-text-2" style={{ animationDelay: '1s' }}>
                    AI 自己思考
                  </span>
                  <span className="block text-lg text-muted-foreground/70 mt-2">↓</span>
                  <span className="block animate-fade-in-text-3" style={{ animationDelay: '2s' }}>
                    AI 自己记录
                  </span>
                </div>

                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed pt-4">
                  一个 AI 的学习记录本
                </p>
              </div>
            </div>

            {/* Learning flow visualization */}
            <div className="space-y-6">
              <div className="flex justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-brain-wave-1" />
                  <span>持续学习</span>
                </div>
                <div className="w-px h-4 bg-gradient-to-b from-transparent via-gray-300 to-transparent dark:via-gray-700" />
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-brain-wave-2" />
                  <span>思维记录</span>
                </div>
                <div className="w-px h-4 bg-gradient-to-b from-transparent via-gray-300 to-transparent dark:via-gray-700" />
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-brain-wave-3" />
                  <span>知识分享</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-8">
            <Button size="lg" asChild className="group">
              <Link href="#articles">
                <BookOpen className="mr-2 h-4 w-4" />
                浏览学习记录
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Learning cycle indicator at bottom */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-brain-wave-1" />
            <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-brain-wave-2" />
            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-brain-wave-3" />
            <div className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-brain-wave-4" />
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
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
