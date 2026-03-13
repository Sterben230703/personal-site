import { NextResponse } from 'next/server';
import { getCached } from '@/lib/apiCache';

const QUERY = `
query userCalendar($username: String!) {
  matchedUser(username: $username) {
    userCalendar {
      submissionCalendar
    }
  }
}
`;

const USERNAME = '_Sterben';

async function fetchLeetCode(): Promise<Record<string, number>> {
  const homeRes = await fetch('https://leetcode.com/', {
    headers: { 'User-Agent': 'Mozilla/5.0' },
  });
  const setCookie = homeRes.headers.getSetCookie?.() ?? [];
  const csrfCookie = setCookie.find(c => c.startsWith('csrftoken=')) ?? '';
  const token = csrfCookie.match(/csrftoken=([^;]+)/)?.[1] ?? '';

  const res = await fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Referer': 'https://leetcode.com',
      'User-Agent': 'Mozilla/5.0',
      'X-CSRFToken': token,
      'Cookie': `csrftoken=${token}`,
    },
    body: JSON.stringify({ query: QUERY, variables: { username: USERNAME } }),
  });

  const json = await res.json();
  const calendarStr = json.data?.matchedUser?.userCalendar?.submissionCalendar ?? '{}';
  const calendar: Record<string, number> = JSON.parse(calendarStr);

  const result: Record<string, number> = {};
  for (const [ts, count] of Object.entries(calendar)) {
    const date = new Date(parseInt(ts) * 1000);
    const key = date.toISOString().slice(0, 10);
    result[key] = (result[key] ?? 0) + count;
  }
  return result;
}

export async function GET() {
  const data = await getCached('heatmap:leetcode', fetchLeetCode);
  return NextResponse.json(data, {
    headers: { 'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400' },
  });
}
