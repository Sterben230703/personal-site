'use client';

import Link from 'next/link';

interface BlogCardProps {
  title: string;
  slug: string;
  date: string;
  category: string;
  tags: string[];
  summary: string;
  published: boolean;
  isDevMode: boolean;
  index?: number;
}

function isoDate(dateStr: string): string {
  return new Date(dateStr).toISOString().split('T')[0];
}

export default function BlogCard({ title, slug, date, published, isDevMode }: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="blog-entry">
      <span className="blog-entry-date">{isoDate(date)}</span>
      <span className="blog-entry-title">
        {title}
        {isDevMode && !published && <span className="blog-card-draft">DRAFT</span>}
      </span>
    </Link>
  );
}
