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
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const post = getPostBySlug(params.slug);

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

export default function PostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);

  if (!post) {
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
      <article className="prose prose-invert max-w-none dark:prose-invert">
        <div className="space-y-6">
          <MDXRemote source={post.content} />
        </div>
      </article>

      <Separator />

      {/* Footer Navigation */}
      <div className="flex justify-between items-center py-4">
        <Button variant="outline" asChild>
          <Link href="/">← 返回所有文章</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="#" target="_blank">
            在 GitHub 上编辑
          </Link>
        </Button>
      </div>
    </div>
  );
}
