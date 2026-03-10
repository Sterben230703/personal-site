/**
 * Seed script to migrate existing Introduction.md blog post to MongoDB.
 *
 * Usage: npx tsx scripts/seed.ts
 *
 * Requires MONGODB_URI in .env.local
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const BlogSchema = new mongoose.Schema({
  title: String,
  slug: { type: String, unique: true },
  date: { type: Date, default: Date.now },
  category: String,
  tags: [String],
  summary: String,
  content: String,
  published: { type: Boolean, default: false },
});

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI not set in .env.local');
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log('Connected to MongoDB');

  const content = `# Welcome to My Blog (About Me)!

This is my very first post using **Markdown with Next.js** — and I'm super excited to begin this journey!

---

## About Me
Hi, I'm **Anand Jaiswal**, a curious learner in the field of **Computer Science**.
I've explored many fundamental areas of CS but haven't fully settled on a single path yet.

Currently, I'm deeply interested in:
- **Firmware & Linux Kernel Development**
- **Artificial Intelligence & Large Language Models (LLMs)**
- **Competitive Programming**

I enjoy the blend of **low-level systems work** and **cutting-edge AI research**, and I'm constantly exploring ways to connect both worlds.

---

## Why This Blog?
I created this blog to:
- Share my learnings and experiences
- Build a personal knowledge base (a place I can **revise and refer** back to)
- Escape the noise of social media and focus on **deep work & reflection**

---

## Beyond Tech
When I'm not coding or studying, you'll probably find me:
- I have interest in Solo Trips, would love to wander across nations.
- Working on **personal projects**
- Contributing to **open-source initiatives**
- Engaging with communities that value **collaboration and innovation**

---

Thanks for stopping by and reading my first post!
I'm excited to share more of my journey with you all.

_Stay tuned for upcoming posts!_`;

  const existing = await Blog.findOne({ slug: 'introduction' });
  if (existing) {
    console.log('Introduction post already exists, skipping...');
  } else {
    await Blog.create({
      title: 'Welcome to My Blog (About Me)!',
      slug: 'introduction',
      date: new Date('2025-01-01'),
      category: 'Backend',
      tags: ['introduction', 'personal'],
      summary: 'My very first blog post — an introduction about me, my interests in CS, and why I started this blog.',
      content,
      published: true,
    });
    console.log('Seeded Introduction blog post');
  }

  await mongoose.disconnect();
  console.log('Done!');
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
