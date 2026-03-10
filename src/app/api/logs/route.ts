import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import LearningLog from '@/models/LearningLog';
import { verifyToken } from '@/lib/auth';

function requireAuth(request: NextRequest): boolean {
  const token = request.cookies.get('dev_token')?.value;
  return !!token && verifyToken(token);
}

export async function GET(request: NextRequest) {
  if (!requireAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectDB();
  const logs = await LearningLog.find().sort({ date: -1 }).lean();
  return NextResponse.json(logs);
}

export async function POST(request: NextRequest) {
  if (!requireAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectDB();
  const body = await request.json();
  const log = await LearningLog.create(body);
  return NextResponse.json(log, { status: 201 });
}
