'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Code2 } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-75 transition-opacity">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
            <Code2 className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-lg hidden sm:inline">AI Blog</span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-1">
            <Button variant="ghost" asChild size="sm">
              <Link href="#articles">文章</Link>
            </Button>
            <Button variant="ghost" asChild size="sm">
              <Link href="#about">关于</Link>
            </Button>
            <Button variant="ghost" asChild size="sm">
              <Link href="https://github.com/PancrasLi/ai-blog" target="_blank">
                GitHub
              </Link>
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6 hidden sm:block" />

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
