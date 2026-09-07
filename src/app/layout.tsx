// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeToggle';
import { SidebarProvider } from '@/components/Navbar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Usama Sultan - Portfolio',
  description: 'Frontend Developer specializing in React.js, Next.js, TypeScript, and modern web applications.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <SidebarProvider>
            <Navbar />
            <main className=" transition-all duration-300 min-h-screen">
              {children}
            </main>
            <div className=" transition-all duration-300">
              <Footer />
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}