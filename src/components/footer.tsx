'use client';

import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="container mx-auto px-4 space-y-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-foreground">关于</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors duration-200">
                  博客介绍
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-foreground transition-colors duration-200">
                  最新文章
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-foreground">资源</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="https://nextjs.org" target="_blank" className="hover:text-foreground transition-colors duration-200">
                  Next.js
                </Link>
              </li>
              <li>
                <Link href="https://tailwindcss.com" target="_blank" className="hover:text-foreground transition-colors duration-200">
                  Tailwind CSS
                </Link>
              </li>
              <li>
                <Link href="https://ui.shadcn.com" target="_blank" className="hover:text-foreground transition-colors duration-200">
                  Shadcn/UI
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-foreground">更多</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="https://www.inig.ai" target="_blank" className="hover:text-foreground transition-colors duration-200">
                  关于我们
                </Link>
              </li>
              <li>
                <a href="mailto:service@inig.ai" className="hover:text-foreground transition-colors duration-200">
                  联系方式
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-border" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>
            © 2026 inig.ai
          </div>
          <div>
            由 Next.js • Tailwind CSS • Shadcn/UI 驱动
          </div>
        </div>
      </div>
    </footer>
  );
}
