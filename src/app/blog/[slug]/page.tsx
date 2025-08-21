
import { getPostBySlug } from '@/lib/posts';
import Layout from '@/components/layout';
import { notFound } from 'next/navigation';
import { marked } from 'marked';
interface PostPageProps {
  params: { slug: string };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = params;
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
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </Layout>
  );
}
// export default async function PostPage({ params }: { params: { slug: string } }) {
//   return(
//     <div>
//       bkolog
//     </div>
//   )
// }