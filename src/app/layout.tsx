import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { MainSidebar } from '@/components/main-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

export const metadata: Metadata = {
  title: 'AI Mentor Hub',
  description: 'Your personal AI learning companion. 🤖',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.css" integrity="sha384-wcIxkf4k558go7rPO2vs95IddGlB3ATqG8A5YpSKeBE4JMYSJpvHWC5DNuOFtlSr" crossOrigin="anonymous" />
      </head>
      <body className="font-body antialiased">
        <SidebarProvider>
          <MainSidebar />
          <SidebarInset>
            <main className="p-4 sm:p-6 lg:p-8">
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
