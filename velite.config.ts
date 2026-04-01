import { defineConfig, s } from 'velite';
import rehypeSlug from 'rehype-slug';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

export default defineConfig({
  collections: {
    posts: {
      name: 'Post',
      pattern: 'content/posts/**/*.mdx',
      schema: s
        .object({
          id: s.slug('content/posts', ['mdx']),
          title: s.string().max(99),
          description: s.string().max(999).optional(),
          date: s.isodate(),
          published: s.boolean().default(true),
          image: s.string().url().optional(),
          authors: s.array(s.string()).optional(),
          tags: s.array(s.string()).optional(),
          content: s.mdx(),
        })
        .transform((data) => ({
          ...data,
          permalink: `/blog/${data.id}`,
        })),
    },
    pages: {
      name: 'Page',
      pattern: 'content/pages/**/*.mdx',
      schema: s.object({
        id: s.slug('content/pages', ['mdx']),
        title: s.string().max(99),
        description: s.string().max(999).optional(),
        content: s.mdx(),
      }),
    },
  },
});
