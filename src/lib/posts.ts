import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface PostMetadata {
  title: string;
  date: string;
  tags: string[];
  summary: string;
  slug?: string;
}

export interface Post {
  slug: string;
  content: string;
  metadata: PostMetadata;
}

const postsDirectory = path.join(process.cwd(), 'content/posts');

export function getPosts(): Post[] {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return [];
    }

    const files = fs.readdirSync(postsDirectory);
    const posts = files
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => {
        const slug = file.replace(/\.mdx?$/, '');
        const filePath = path.join(postsDirectory, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data, content } = matter(fileContent);

        return {
          slug,
          content,
          metadata: {
            title: data.title || slug,
            date: data.date || new Date().toISOString().split('T')[0],
            tags: data.tags || [],
            summary: data.summary || '',
          },
        };
      })
      .sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime());

    return posts;
  } catch (error) {
    console.error('Error reading posts:', error);
    return [];
  }
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const posts = getPosts();
    return posts.find((post) => post.slug === slug) || null;
  } catch (error) {
    console.error('Error getting post:', error);
    return null;
  }
}

export function getSlugs(): string[] {
  try {
    const posts = getPosts();
    return posts.map((post) => post.slug);
  } catch (error) {
    console.error('Error getting slugs:', error);
    return [];
  }
}
