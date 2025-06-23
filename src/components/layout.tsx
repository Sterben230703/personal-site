'use client';

import React, { ReactNode } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import '../styles/globals.css';


type LayoutProps = {
  title?: string;
  children: ReactNode;
};

export default function Layout({ title = 'My Portfolio', children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>{`[x-cloak] { display: none; }`}</style>
      </Head>

      <div className="layout">
        <nav>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/blog">Posts</Link></li>
            <li><Link href="/about">About</Link></li>
          </ul>
        </nav>

        <main>{children}</main>
      </div>
    </>
  );
}
