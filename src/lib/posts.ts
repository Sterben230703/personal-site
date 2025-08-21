import fs from 'fs';
import path from 'path';

export type BlogPost = {
	slug: string;
	title: string;
	content: string;
};

const postsDirectory = path.join(process.cwd(), 'src/posts');

export function getAllPosts(): BlogPost[] {
	const files = fs.readdirSync(postsDirectory).filter(f => f.endsWith('.md'));
	return files.map(filename => {
		const slug = filename.replace(/\.md$/, '');
		const filePath = path.join(postsDirectory, filename);
		const content = fs.readFileSync(filePath, 'utf-8');
		const titleMatch = content.match(/^#\s+(.*)/m);
		const title = titleMatch ? titleMatch[1] : slug;
		return { slug, title, content };
	});
}

export function getPostBySlug(slug: string): BlogPost {
	const filePath = path.join(postsDirectory, `${slug}.md`);
	if (!fs.existsSync(filePath)) throw new Error('Post not found');
	const content = fs.readFileSync(filePath, 'utf-8');
	const titleMatch = content.match(/^#\s+(.*)/m);
	const title = titleMatch ? titleMatch[1] : slug;
	return { slug, title, content };
}
