import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface EducationPostMetadata {
  title: string;
  date: string;
  category: string;
  tags: string[];
  summary: string;
  slug?: string;
}

export interface EducationPost {
  slug: string;
  content: string;
  metadata: EducationPostMetadata;
}

// 教育文章目录
const educationDirectory = path.join(process.cwd(), 'content', 'education');

export function getEducationPosts(): EducationPost[] {
  try {
    console.log('[getEducationPosts] Reading from:', educationDirectory);
    
    if (!fs.existsSync(educationDirectory)) {
      console.log('[getEducationPosts] Directory does not exist, creating it');
      fs.mkdirSync(educationDirectory, { recursive: true });
      return [];
    }

    const files = fs.readdirSync(educationDirectory);
    console.log('[getEducationPosts] Found files:', files);

    const posts = files
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => {
        try {
          const slug = file.replace(/\.mdx?$/, '');
          const filePath = path.join(educationDirectory, file);
          console.log('[getEducationPosts] Processing:', slug);

          const fileContent = fs.readFileSync(filePath, 'utf-8');
          const { data, content } = matter(fileContent);

          return {
            slug,
            content,
            metadata: {
              title: data.title || slug,
              date: data.date || new Date().toISOString().split('T')[0],
              category: data.category || '未分类',
              tags: data.tags || [],
              summary: data.summary || '',
            },
          };
        } catch (err) {
          console.error('[getEducationPosts] Error processing file:', file, err);
          return null;
        }
      })
      .filter((post): post is EducationPost => post !== null)
      .sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime());

    console.log('[getEducationPosts] Loaded', posts.length, 'posts');
    return posts;
  } catch (error) {
    console.error('[getEducationPosts] Error reading posts:', error);
    return [];
  }
}

export function getEducationPostBySlug(slug: string): EducationPost | null {
  try {
    console.log('[getEducationPostBySlug] Looking for slug:', slug);
    
    const posts = getEducationPosts();
    const post = posts.find((post) => post.slug === slug);
    
    console.log('[getEducationPostBySlug] Found:', post ? 'yes' : 'no');
    return post || null;
  } catch (error) {
    console.error('[getEducationPostBySlug] Error:', error);
    return null;
  }
}

export function getEducationSlugs(): string[] {
  try {
    const posts = getEducationPosts();
    const slugs = posts.map((post) => post.slug);
    console.log('[getEducationSlugs] Returning slugs:', slugs);
    return slugs;
  } catch (error) {
    console.error('[getEducationSlugs] Error:', error);
    return [];
  }
}

export function getEducationCategories(): string[] {
  try {
    const posts = getEducationPosts();
    const categories = Array.from(new Set(posts.map(p => p.metadata.category)));
    return categories.sort();
  } catch (error) {
    console.error('[getEducationCategories] Error:', error);
    return [];
  }
}
