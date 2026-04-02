import { getEducationPostBySlug, getEducationSlugs } from '@/lib/education';
import Link from 'next/link';
import { notFound } from 'next/navigation';

function formatContent(content: string): string {
  return content
    .split('\n')
    .map((line) => {
      if (line.startsWith('#')) {
        const level = Math.min((line.match(/^#+/)?.[0].length || 1) + 1, 6);
        const text = line.replace(/^#+\s/, '');
        return `<h${level} class="font-semibold mt-4 mb-2">${text}</h${level}>`;
      }
      if (line.trim()) {
        return `<p class="text-foreground leading-relaxed">${line}</p>`;
      }
      return '';
    })
    .join('');
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getEducationSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const post = getEducationPostBySlug(resolvedParams.slug);

  if (!post) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.',
    };
  }

  return {
    title: `${post.metadata.title} | 教育资讯`,
    description: post.metadata.summary,
  };
}

export default async function EducationPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const post = getEducationPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <article className="container mx-auto px-4 py-16 max-w-4xl">
        {/* 返回链接 */}
        <Link
          href="/education"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 mb-8 inline-block"
        >
          ← 返回教育资讯
        </Link>

        {/* 文章头部 */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {post.metadata.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <time>{post.metadata.date}</time>
            {post.metadata.category && (
              <span className="px-2 py-1 border border-border rounded text-foreground">
                {post.metadata.category}
              </span>
            )}
          </div>

          {post.metadata.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap">
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
        </header>

        {/* 文章摘要 */}
        {post.metadata.summary && (
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            {post.metadata.summary}
          </p>
        )}

        {/* 文章内容 */}
        <div className="prose prose-sm dark:prose-invert max-w-none mb-8">
          <div className="prose-container space-y-4" dangerouslySetInnerHTML={{__html: formatContent(post.content)}} />
        </div>

        {/* 分隔线 */}
        <div className="border-t border-border my-8" />

        {/* 文章底部导航 */}
        <div className="flex justify-center">
          <Link
            href="/education"
            className="px-6 py-2 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors duration-200 rounded-lg"
          >
            返回教育资讯
          </Link>
        </div>
      </article>
    </main>
  );
}
