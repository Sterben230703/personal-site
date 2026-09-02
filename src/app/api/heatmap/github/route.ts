import { NextResponse } from 'next/server';
import { getCached } from '@/lib/apiCache';

const QUERY = `
query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        weeks {
          contributionDays {
            date
            contributionCount
          }
        }
      }
    }
  }
}
`;

async function fetchGithub(): Promise<Record<string, number>> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error('GITHUB_TOKEN not set');

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: QUERY, variables: { login: 'Dev-an01' } }),
  });

  const json = await res.json();
  const weeks = json.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? [];

  const result: Record<string, number> = {};
  for (const week of weeks) {
    for (const day of week.contributionDays) {
      result[day.date] = day.contributionCount;
    }
  }
  return result;
}

export async function GET() {
  const data = await getCached('heatmap:github', fetchGithub);
  return NextResponse.json(data, {
    headers: { 'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400' },
  });
}
