import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { DateTime } from 'luxon';

const postsDirectory = path.join(process.cwd(), 'src/posts');

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  tags?: string[];
  content: string;
  year: string;
};

export function getAllPosts(): BlogPost[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map(file => {
    const fullPath = path.join(postsDirectory, file);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    return {
      slug: file.replace(/\.md$/, ''),
      ...data,
      content,
      year: DateTime.fromISO(data.date).toFormat('yyyy'),
    } as BlogPost;
  });
}

export function getPostsGroupedByYear(): [string, BlogPost[]][] {
  const posts = getAllPosts();
  const grouped: Record<string, BlogPost[]> = {};

  posts.forEach(post => {
    if (!grouped[post.year]) grouped[post.year] = [];
    grouped[post.year].push(post);
  });

  return Object.entries(grouped).sort((a, b) => b[0].localeCompare(a[0]));
}

export function getPostBySlug(slug: string): BlogPost {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  return {
    slug,
    ...data,
    content,
    year: DateTime.fromISO(data.date).toFormat('yyyy'),
  } as BlogPost;
}
