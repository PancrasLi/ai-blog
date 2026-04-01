import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import type { Post } from '@/.velite';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group rounded-lg border bg-card p-6 transition-all hover:shadow-lg hover:border-primary/50">
      <Link href={post.permalink} className="block">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
      </Link>

      {post.description && (
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {post.description}
        </p>
      )}

      <div className="flex items-center justify-between mb-4">
        <time className="text-xs text-muted-foreground">
          {formatDate(new Date(post.date))}
        </time>
      </div>

      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      <Link
        href={post.permalink}
        className="inline-flex text-sm font-medium text-primary hover:underline"
      >
        阅读更多 →
      </Link>
    </article>
  );
}
