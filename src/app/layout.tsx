import './globals.css';
import type { Metadata } from 'next';
import ThemeProvider from '@/components/ThemeProvider';
import AuthProvider from '@/components/AuthProvider';
import Topbar from '@/components/Topbar';
import DevButton from '@/components/DevButton';

export const metadata: Metadata = {
  title: 'Anand Jaiswal',
  description: 'Software engineer building backend systems, applied AI products, and developer tools.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="classic">
      <body className="flex min-h-screen flex-col">
        <ThemeProvider>
          <AuthProvider>
            <Topbar />
            <main className="site-main">
              {children}
            </main>
            <DevButton />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
