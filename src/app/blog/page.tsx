'use client';
import { getPostsGroupedByYear } from '@/lib/posts';
import Layout from '@/components/layout';
import Link from 'next/link';

export default function BlogPage() {
  const groups = getPostsGroupedByYear();

  return (
    <Layout title="Blog">
      <h1>Blog Posts by Year</h1>
      {groups.map(([year, posts]) => (
        <section key={year}>
          <h2>{year}</h2>
          <ul>
            {posts.map(post => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </Layout>
  );
}
