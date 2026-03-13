import { NextResponse } from 'next/server';
import { getCached } from '@/lib/apiCache';

async function fetchCodeforces(): Promise<Record<string, number>> {
  const res = await fetch(
    'https://codeforces.com/api/user.status?handle=-Sterben-&from=1&count=10000',
  );
  const json = await res.json();

  const result: Record<string, number> = {};
  if (json.status === 'OK') {
    for (const sub of json.result) {
      const date = new Date(sub.creationTimeSeconds * 1000);
      const key = date.toISOString().slice(0, 10);
      result[key] = (result[key] ?? 0) + 1;
    }
  }
  return result;
}

export async function GET() {
  const data = await getCached('heatmap:codeforces', fetchCodeforces);
  return NextResponse.json(data, {
    headers: { 'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400' },
  });
}
