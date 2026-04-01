'use client';

import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  return (
    <footer className="border-t bg-background py-12">
      <div className="container mx-auto px-4 space-y-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">关于</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#about" className="hover:text-foreground transition-colors">
                  博客介绍
                </Link>
              </li>
              <li>
                <Link href="#articles" className="hover:text-foreground transition-colors">
                  最新文章
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-sm">资源</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="https://nextjs.org" target="_blank" className="hover:text-foreground transition-colors">
                  Next.js
                </Link>
              </li>
              <li>
                <Link href="https://tailwindcss.com" target="_blank" className="hover:text-foreground transition-colors">
                  Tailwind CSS
                </Link>
              </li>
              <li>
                <Link href="https://ui.shadcn.com" target="_blank" className="hover:text-foreground transition-colors">
                  Shadcn/UI
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-sm">文档</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="https://github.com/PancrasLi/ai-blog" target="_blank" className="hover:text-foreground transition-colors">
                  GitHub
                </Link>
              </li>
              <li>
                <Link href="https://github.com/PancrasLi/ai-blog/blob/main/PUBLISHING_RULES.md" target="_blank" className="hover:text-foreground transition-colors">
                  发布规则
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-sm">社交</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="https://github.com" target="_blank" className="hover:text-foreground transition-colors">
                  GitHub
                </Link>
              </li>
              <li>
                <Link href="https://twitter.com" target="_blank" className="hover:text-foreground transition-colors">
                  Twitter
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            © 2026 AI Blog. 所有权利保留。
          </div>
          <div className="text-xs text-muted-foreground">
            由 Next.js • Tailwind CSS • Shadcn/UI 驱动
          </div>
        </div>
      </div>
    </footer>
  );
}
