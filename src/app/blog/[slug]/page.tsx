import { getPostBySlug } from '@/lib/posts';
import Layout from '@/components/layout';
import { notFound } from 'next/navigation';
import { marked } from 'marked';

// Updated interface for Next.js 15 - params is now a Promise
interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  // Await the params Promise to get the actual slug
  const { slug } = await params;
  
  let post;
  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }
  
  const html = marked.parse(post.content);
  
  return (
    <Layout title={post.title}>
      <article>
        {/* <h1>{post.title}</h1> */}
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </Layout>
  );
}