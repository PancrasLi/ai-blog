import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug, getSlugs } from '@/lib/posts';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post not found',
    };
  }

  return {
    title: `${post.metadata.title} - inig.ai`,
    description: post.metadata.summary,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.summary,
      type: 'article',
      publishedTime: post.metadata.date,
      authors: ['inig.ai'],
      tags: post.metadata.tags,
    },
  };
}

// MDX 组件
const mdxComponents = {
  h1: ({ ...props }: any) => <h1 className="text-4xl font-bold mt-8 mb-4" {...props} />,
  h2: ({ ...props }: any) => <h2 className="text-3xl font-bold mt-6 mb-3" {...props} />,
  h3: ({ ...props }: any) => <h3 className="text-2xl font-bold mt-4 mb-2" {...props} />,
  p: ({ ...props }: any) => <p className="text-base leading-7 mb-4" {...props} />,
  a: ({ ...props }: any) => (
    <a
      className="text-blue-600 hover:text-blue-700 hover:underline"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  code: ({ ...props }: any) => (
    <code
      className="bg-gray-900 dark:bg-gray-100 text-gray-100 dark:text-gray-900 rounded px-2 py-1 text-sm"
      {...props}
    />
  ),
  pre: ({ ...props }: any) => (
    <pre className="bg-gray-900 dark:bg-gray-100 text-gray-100 dark:text-gray-900 rounded p-4 mb-4 overflow-x-auto" {...props} />
  ),
  ul: ({ ...props }: any) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
  ol: ({ ...props }: any) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
  li: ({ ...props }: any) => <li className="ml-4" {...props} />,
  blockquote: ({ ...props }: any) => (
    <blockquote className="border-l-4 border-blue-600 pl-4 italic my-4 text-gray-600 dark:text-gray-400" {...props} />
  ),
  table: ({ ...props }: any) => (
    <table className="w-full border-collapse mb-4 border border-gray-300 dark:border-gray-700" {...props} />
  ),
  th: ({ ...props }: any) => (
    <th className="border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 p-2 text-left" {...props} />
  ),
  td: ({ ...props }: any) => (
    <td className="border border-gray-300 dark:border-gray-700 p-2" {...props} />
  ),
};

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  console.log('[PostPage] Received slug:', slug);
  const post = getPostBySlug(slug);
  console.log('[PostPage] Got post:', post ? 'yes' : 'no');

  if (!post) {
    console.error('[PostPage] Post not found for slug:', slug);
    notFound();
  }

  return (
    <div className="space-y-8 py-8">
      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-4">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回首页
        </Link>
      </Button>

      {/* Article Header */}
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          {post.metadata.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
          <div className="flex items-center gap-2">
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

        {post.metadata.summary && (
          <p className="text-lg text-muted-foreground leading-relaxed">
            {post.metadata.summary}
          </p>
        )}
      </div>

      <Separator />

      {/* Tags */}
      {post.metadata.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.metadata.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Article Content */}
      <article className="max-w-none space-y-6">
        <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>
      </article>

      <Separator />

      {/* Footer Navigation */}
      <div className="flex justify-between items-center py-4">
        <Button variant="outline" asChild>
          <Link href="/">← 返回所有文章</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link
            href={`https://github.com/PancrasLi/ai-blog/edit/main/content/posts/${slug}.mdx`}
            target="_blank"
          >
            在 GitHub 上编辑
          </Link>
        </Button>
      </div>
    </div>
  );
}
