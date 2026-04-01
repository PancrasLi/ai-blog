import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          欢迎来到 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">AI Blog</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          探索人工智能、技术前沿和创新思想。这是一个现代化的无服务博客系统，由 Next.js、Tailwind CSS 和 Shadcn/UI 驱动。
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link href="#posts">查看文章</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/about">了解更多</Link>
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-y">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600">∞</div>
          <p className="text-muted-foreground">篇文章</p>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-600">∞</div>
          <p className="text-muted-foreground">个标签</p>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-pink-600">∞</div>
          <p className="text-muted-foreground">无服务器</p>
        </div>
      </section>

      {/* Content Section */}
      <section id="posts" className="py-12">
        <h2 className="text-3xl font-bold mb-8">最新内容</h2>
        <div className="bg-card rounded-lg border p-8 text-center">
          <p className="text-muted-foreground">文章将在此显示</p>
        </div>
      </section>
    </div>
  );
}
