import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { verifyToken } from '@/lib/auth';

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  await connectDB();
  const { slug } = await context.params;

  const token = request.cookies.get('dev_token')?.value;
  const isAuth = token ? verifyToken(token) : false;

  const filter: Record<string, unknown> = { slug };
  if (!isAuth) filter.published = true;

  const blog = await Blog.findOne(filter).lean();
  if (!blog) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(blog);
}

export async function PUT(request: NextRequest, context: RouteContext) {
  const token = request.cookies.get('dev_token')?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectDB();
  const { slug } = await context.params;
  const body = await request.json();

  const blog = await Blog.findOneAndUpdate({ slug }, body, { new: true }).lean();
  if (!blog) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(blog);
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const token = request.cookies.get('dev_token')?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectDB();
  const { slug } = await context.params;

  const blog = await Blog.findOneAndDelete({ slug });
  if (!blog) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
