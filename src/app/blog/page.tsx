

export const dynamic = 'force-static'; // Ensures static generation

import Link from 'next/link';
import Layout from '@/components/layout';
import { getAllPosts, BlogPost } from '@/lib/posts';

export default function BlogPage() {
    const posts: BlogPost[] = getAllPosts();
    return (
        <Layout title="Blog Posts">
            <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
            <ul className="space-y-4">
                {posts.map(post => (
                    <li key={post.slug}>
                        <Link href={`/blog/${post.slug}`} className="text-xl text-blue-600 hover:underline">
                            {post.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </Layout>
        // <h1>blog</h1>
    );
}