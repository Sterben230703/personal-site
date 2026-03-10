import './globals.css';
import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import ThemeProvider from '@/components/ThemeProvider';
import AuthProvider from '@/components/AuthProvider';
import Sidebar from '@/components/Sidebar';
import DevButton from '@/components/DevButton';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
});

export const metadata: Metadata = {
  title: 'Anand Jaiswal',
  description: 'Competitive Programmer, Software Engineer, AI Enthusiast',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="classic" className={jetbrainsMono.variable}>
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
      </head>
      <body className="h-screen overflow-hidden flex flex-col md:flex-row">
        <ThemeProvider>
          <AuthProvider>
            <Sidebar />
            <main className="flex-1 p-8 overflow-y-auto" style={{ backgroundColor: 'var(--main-bg)', color: 'var(--text-color)' }}>
              {children}
            </main>
            <DevButton />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
