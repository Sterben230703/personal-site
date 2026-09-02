import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const sort = searchParams.get('sort') || 'date';
    const order = searchParams.get('order') === 'asc' ? 1 : -1;

    const token = request.cookies.get('dev_token')?.value;
    const isAuth = token ? verifyToken(token) : false;

    const filter: Record<string, unknown> = {};
    if (!isAuth) filter.published = true;
    if (category) filter.category = category;
    if (tag) filter.tags = tag;

    const blogs = await Blog.find(filter)
      .select('title slug date category tags summary published')
      .sort({ [sort]: order })
      .lean();
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    return NextResponse.json({ error: 'Blog service unavailable' }, { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  const token = request.cookies.get('dev_token')?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectDB();
  const body = await request.json();

  // Generate slug from title if not provided
  if (!body.slug && body.title) {
    body.slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  const blog = await Blog.create(body);
  return NextResponse.json(blog, { status: 201 });
}
