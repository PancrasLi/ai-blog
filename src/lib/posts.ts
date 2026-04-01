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

// 使用项目根目录的相对路径
const postsDirectory = path.join(process.cwd(), 'content', 'posts');

export function getPosts(): Post[] {
  try {
    console.log('[getPosts] Reading from:', postsDirectory);
    
    if (!fs.existsSync(postsDirectory)) {
      console.error('[getPosts] Directory does not exist:', postsDirectory);
      return [];
    }

    const files = fs.readdirSync(postsDirectory);
    console.log('[getPosts] Found files:', files);

    const posts = files
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => {
        try {
          const slug = file.replace(/\.mdx?$/, '');
          const filePath = path.join(postsDirectory, file);
          console.log('[getPosts] Processing:', slug, 'from', filePath);

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
        } catch (err) {
          console.error('[getPosts] Error processing file:', file, err);
          return null;
        }
      })
      .filter((post): post is Post => post !== null)
      .sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime());

    console.log('[getPosts] Loaded', posts.length, 'posts');
    return posts;
  } catch (error) {
    console.error('[getPosts] Error reading posts:', error);
    return [];
  }
}

export function getPostBySlug(slug: string): Post | null {
  try {
    console.log('[getPostBySlug] Looking for slug:', slug);
    
    const posts = getPosts();
    console.log('[getPostBySlug] Available slugs:', posts.map(p => p.slug));
    
    const post = posts.find((post) => post.slug === slug);
    console.log('[getPostBySlug] Found:', post ? 'yes' : 'no');
    
    return post || null;
  } catch (error) {
    console.error('[getPostBySlug] Error:', error);
    return null;
  }
}

export function getSlugs(): string[] {
  try {
    const posts = getPosts();
    const slugs = posts.map((post) => post.slug);
    console.log('[getSlugs] Returning slugs:', slugs);
    return slugs;
  } catch (error) {
    console.error('[getSlugs] Error getting slugs:', error);
    return [];
  }
}
