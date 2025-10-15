import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { MainSidebar } from '@/components/main-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

export const metadata: Metadata = {
  title: 'Zenith Flow',
  description: 'Navigate Complexity, Achieve Clarity.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Satoshi:wght@700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.css" integrity="sha384-wcIxkf4k558go7rPO2vs95IddGlB3ATqG8A5YpSKeBE4JMYSJpvHWC5DNuOFtlSr" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className="font-body antialiased">
        <div className="fixed inset-0 -z-10 h-full w-full bg-background">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
            <div className="fixed inset-0 h-full w-full bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-50 animate-aurora"></div>
        </div>
        <SidebarProvider>
          <MainSidebar />
          <SidebarInset>
            <main className="p-0 sm:p-0 lg:p-0">
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}

// Add this to your tailwind.config.js
//
// @keyframes aurora {
//   from {
//     background-position: 50% 50%, 50% 50%;
//   }
//   to {
//     background-position: 350% 50%, 350% 50%;
//   }
// }
//
// animation: {
//   aurora: 'aurora 60s linear infinite',
// }
