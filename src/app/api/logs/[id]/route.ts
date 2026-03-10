import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import LearningLog from '@/models/LearningLog';
import { verifyToken } from '@/lib/auth';

interface RouteContext {
  params: Promise<{ id: string }>;
}

function requireAuth(request: NextRequest): boolean {
  const token = request.cookies.get('dev_token')?.value;
  return !!token && verifyToken(token);
}

export async function PUT(request: NextRequest, context: RouteContext) {
  if (!requireAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectDB();
  const { id } = await context.params;
  const body = await request.json();

  const log = await LearningLog.findByIdAndUpdate(id, body, { new: true }).lean();
  if (!log) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(log);
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  if (!requireAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectDB();
  const { id } = await context.params;

  const log = await LearningLog.findByIdAndDelete(id);
  if (!log) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
