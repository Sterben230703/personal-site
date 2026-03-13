import { NextResponse } from 'next/server';
import { getCached } from '@/lib/apiCache';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';
import LearningLog from '@/models/LearningLog';

const FIVE_MINUTES = 5 * 60 * 1000;

async function fetchSiteActivity(): Promise<Record<string, number>> {
  await connectDB();
  const [blogs, logs] = await Promise.all([
    Blog.find({}, { date: 1 }).lean(),
    LearningLog.find({}, { date: 1 }).lean(),
  ]);

  const result: Record<string, number> = {};
  for (const entry of [...blogs, ...logs]) {
    const key = new Date(entry.date).toISOString().slice(0, 10);
    result[key] = (result[key] ?? 0) + 1;
  }
  return result;
}

export async function GET() {
  const data = await getCached('heatmap:site', fetchSiteActivity, FIVE_MINUTES);
  return NextResponse.json(data, {
    headers: { 'Cache-Control': 'public, max-age=300, stale-while-revalidate=600' },
  });
}
