'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Code2 } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200">
          <div className="w-8 h-8 rounded bg-foreground flex items-center justify-center">
            <Code2 className="h-5 w-5 text-background" />
          </div>
          <span className="font-semibold text-base hidden sm:inline tracking-tight">inig.ai</span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-1">
            <Button variant="ghost" asChild size="sm" className="text-sm font-medium">
              <Link href="/">博客</Link>
            </Button>
            <Button variant="ghost" asChild size="sm" className="text-sm font-medium">
              <Link href="/education">教育</Link>
            </Button>
            <Button variant="ghost" asChild size="sm" className="text-sm font-medium">
              <Link href="/education/games">教育游戏</Link>
            </Button>
            <Button variant="ghost" asChild size="sm" className="text-sm font-medium">
              <Link href="/entertainment">娱乐</Link>
            </Button>
            <Button variant="ghost" asChild size="sm" className="text-sm font-medium">
              <a href="https://www.inig.ai" target="_blank" rel="noopener noreferrer">关于</a>
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6 hidden sm:block bg-border" />

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
