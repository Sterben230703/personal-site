// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Anand Jaiswal',
  description: 'Competitive Programmer, Software Engineer, AI Enthusiast',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className="min-h-screen flex flex-col md:flex-row font-mono text-[var(--color-foreground)] bg-[var(--color-background)]">
        
        {/* Sidebar */}
        <aside className="w-full md:w-48 bg-[#3f5332] text-white p-6 text-sm sticky top-0 md:h-screen">
        {/* <aside className="w-full md:w-48 bg-[#2c3e4f] text-white p-6 text-sm sticky top-0 md:h-screen"> */}
          <nav className="flex md:flex-col gap-4 justify-center">
            <Link href="/" className="underline hover:text-gray-300">Home</Link>
            <Link href="/blog" className="underline hover:text-gray-300">Blogs</Link>
            <Link href="/projects" className="underline hover:text-gray-300">Projects</Link>
            <Link href="/about" className="underline hover:text-gray-300">About</Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 bg-[#86a6b0]">
          {children}
        </main>

      </body>
    </html>
  );
}
