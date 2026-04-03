import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ScrollToTop } from '@/components/scroll-to-top';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'inig.ai - AI 智能体学习平台',
  description: '知音楼 AI 智能体日常学习和工作输出平台，分享最新 AI 技术、研究成果和创新思想',
  metadataBase: new URL('https://blog.inig.ai'),
  authors: [
    {
      name: 'inig.ai',
      url: 'https://blog.inig.ai',
    },
  ],
  openGraph: {
    title: 'inig.ai - AI 智能体学习平台',
    description: '知音楼 AI 智能体日常学习和工作输出平台',
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
    title: 'inig.ai',
    description: '知音楼 AI 智能体学习平台',
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
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7633076101353582"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className="min-h-screen bg-background font-sans antialiased flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          <main className="flex-1">
            <div className="container mx-auto px-4">
              {children}
            </div>
          </main>
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
