import { NextResponse } from 'next/server';
import { getCached } from '@/lib/apiCache';

async function fetchRatings() {
  const [cf, lc] = await Promise.all([fetchCodeforces(), fetchLeetCode()]);
  return { codeforces: cf, leetcode: lc };
}

async function fetchCodeforces() {
  const res = await fetch('https://codeforces.com/api/user.info?handles=-Sterben-');
  const json = await res.json();
  const user = json.result?.[0];
  if (!user) return null;
  const rank = user.rank as string;
  const title = rank.charAt(0).toUpperCase() + rank.slice(1);
  return { rating: Math.round(user.rating), title };
}

async function fetchLeetCode() {
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
    body: JSON.stringify({
      query: `query { userContestRanking(username: "_Sterben") { rating badge { name } } }`,
    }),
  });

  const json = await res.json();
  const data = json.data?.userContestRanking;
  if (!data) return null;
  return { rating: Math.round(data.rating), title: data.badge?.name ?? '' };
}

export async function GET() {
  const data = await getCached('ratings', fetchRatings);
  return NextResponse.json(data, {
    headers: { 'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400' },
  });
}
