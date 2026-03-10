import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';
const COOKIE_NAME = 'dev_token';

export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  const expectedUsername = process.env.DEV_USERNAME;
  const expectedPassword = process.env.DEV_PASSWORD;

  if (!expectedUsername || !expectedPassword) return false;

  return username === expectedUsername && password === expectedPassword;
}

export function signToken(): string {
  return jwt.sign({ role: 'dev' }, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): boolean {
  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

export async function getAuthFromCookies(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifyToken(token);
}
