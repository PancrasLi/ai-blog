import { getEducationPostBySlug, getEducationSlugs } from '@/lib/education';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { formatDate } from '@/lib/utils';

// MDX 组件配置 - 与博客一致
const mdxComponents = {
  h1: ({ ...props }: any) => <h1 className="text-4xl font-bold mt-8 mb-6 text-foreground" {...props} />,
  h2: ({ ...props }: any) => <h2 className="text-3xl font-bold mt-8 mb-4 text-foreground border-b pb-3" {...props} />,
  h3: ({ ...props }: any) => <h3 className="text-2xl font-bold mt-6 mb-3 text-foreground" {...props} />,
  h4: ({ ...props }: any) => <h4 className="text-xl font-semibold mt-4 mb-2" {...props} />,
  h5: ({ ...props }: any) => <h5 className="text-lg font-semibold mt-3 mb-2" {...props} />,
  h6: ({ ...props }: any) => <h6 className="text-base font-semibold mt-3 mb-2" {...props} />,
  
  p: ({ ...props }: any) => <p className="text-base leading-8 mb-6 text-foreground" {...props} />,
  strong: ({ ...props }: any) => <strong className="font-bold text-foreground" {...props} />,
  em: ({ ...props }: any) => <em className="italic text-foreground" {...props} />,
  
  a: ({ ...props }: any) => (
    <a
      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  
  code: ({ inline, ...props }: any) => {
    if (inline) {
      return (
        <code
          className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded px-2 py-0.5 text-sm font-mono"
          {...props}
        />
      );
    }
    return <code {...props} />;
  },
  pre: ({ ...props }: any) => (
    <pre className="bg-gray-900 dark:bg-gray-800 text-gray-100 dark:text-gray-100 rounded-lg p-6 mb-8 mt-2 overflow-x-auto border border-gray-700" {...props} />
  ),
  
  ul: ({ ...props }: any) => <ul className="list-disc list-inside mb-6 space-y-3 text-foreground ml-4" {...props} />,
  ol: ({ ...props }: any) => <ol className="list-decimal list-inside mb-6 space-y-3 text-foreground ml-4" {...props} />,
  li: ({ ...props }: any) => <li className="text-foreground leading-8" {...props} />,
  
  blockquote: ({ ...props }: any) => (
    <blockquote className="border-l-4 border-blue-600 pl-4 italic my-4 text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 py-2 rounded" {...props} />
  ),
  
  table: ({ children, ...props }: any) => (
    <div className="overflow-x-auto mb-6 rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="w-full text-sm border-collapse" {...props}>
        {children}
      </table>
    </div>
  ),
  
  thead: ({ children, ...props }: any) => (
    <thead className="bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-600" {...props}>
      {children}
    </thead>
  ),
  
  tbody: ({ children, ...props }: any) => (
    <tbody className="divide-y divide-gray-200 dark:divide-gray-700" {...props}>
      {children}
    </tbody>
  ),
  
  tr: ({ children, ...props }: any) => (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors" {...props}>
      {children}
    </tr>
  ),
  
  th: ({ ...props }: any) => (
    <th
      className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-left font-semibold text-foreground"
      {...props}
    />
  ),
  
  td: ({ ...props }: any) => (
    <td
      className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-foreground"
      {...props}
    />
  ),
  
  hr: ({ ...props }: any) => <hr className="my-6 border-gray-300 dark:border-gray-700" {...props} />,
};

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
    <div className="space-y-8 py-8">
      {/* 返回按钮 */}
      <Button variant="ghost" asChild className="mb-4">
        <Link href="/education">
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回教育资讯
        </Link>
      </Button>

      {/* 文章头部 */}
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

          {post.metadata.category && (
            <Badge variant="secondary">
              {post.metadata.category}
            </Badge>
          )}

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

      {/* 标签 */}
      {post.metadata.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.metadata.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {/* 文章内容 */}
      <article className="max-w-3xl mx-auto space-y-6">
        <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
          />
        </div>
      </article>

      <Separator />

      {/* 底部导航 */}
      <div className="flex justify-start py-4">
        <Button variant="outline" asChild>
          <Link href="/education">← 返回教育资讯</Link>
        </Button>
      </div>
    </div>
  );
}
