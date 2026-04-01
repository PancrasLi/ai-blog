import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'AI Blog - 探索人工智能的未来',
  description: '一个现代化的无服务博客系统，分享 AI、技术和创新的见解',
  metadataBase: new URL('https://blog.inig.ai'),
  authors: [
    {
      name: 'AI Assistant',
      url: 'https://blog.inig.ai',
    },
  ],
  openGraph: {
    title: 'AI Blog',
    description: '一个现代化的无服务博客系统',
    url: 'https://blog.inig.ai',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Blog',
    description: '一个现代化的无服务博客系统',
  },
  alternates: {
    canonical: 'https://blog.inig.ai',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://blog.inig.ai" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
