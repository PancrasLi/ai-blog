import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-4">AI Blog</h3>
            <p className="text-muted-foreground">
              一个现代化的无服务博客系统，由 Next.js 和 Shadcn/UI 驱动。
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">导航</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  首页
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-foreground transition-colors">
                  博客
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  关于
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">社交</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; 2024 AI Blog. 保留所有权利。</p>
          <p>构建于 Next.js • Tailwind CSS • Shadcn/UI</p>
        </div>
      </div>
    </footer>
  );
}
