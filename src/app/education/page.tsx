import Link from 'next/link';
import { getEducationPosts } from '@/lib/education';

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
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">教育资讯</h1>
          <p className="text-sm text-muted-foreground">创意来自 TAL/好未来 龙虾大赛</p>
          <p className="text-base text-muted-foreground mt-4">
            记录教育行业的前沿信息、发展趋势和创新案例
          </p>
        </div>

        {/* 文章列表 */}
        {posts.length > 0 ? (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link key={post.slug} href={`/education/${post.slug}`}>
                <article className="border border-border rounded-lg p-6 hover:bg-muted transition-colors duration-200 cursor-pointer">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl font-semibold text-foreground mb-2 hover:underline">
                        {post.metadata.title}
                      </h2>
                      <p className="text-sm text-muted-foreground mb-3">
                        {post.metadata.summary}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <time>{post.metadata.date}</time>
                        {post.metadata.category && (
                          <span className="px-2 py-1 border border-border rounded text-foreground">
                            {post.metadata.category}
                          </span>
                        )}
                      </div>
                      {post.metadata.tags.length > 0 && (
                        <div className="flex gap-2 mt-3 flex-wrap">
                          {post.metadata.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-1 border border-border rounded text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">暂无教育资讯，敬请期待</p>
          </div>
        )}
      </div>
    </main>
  );
}
