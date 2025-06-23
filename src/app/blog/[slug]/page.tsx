'use client';
import { getPostBySlug } from '@/lib/posts';
import Layout from '@/components/layout';
import { notFound, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { marked } from 'marked';
import type { BlogPost } from '@/lib/posts';

export default function PostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost & { html?: string } | null>(null);

  useEffect(() => {
    try {
      const post = getPostBySlug(slug as string);
      const html = marked.parse(post.content);
      setPost({ ...post, html });
    } catch {
      notFound();
    }
  }, [slug]);

  if (!post) return null;

  return (
    <Layout title={post.title}>
      <article>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html ?? '' }} />
      </article>
    </Layout>
  );
}