import connectDB from './mongodb';
import CacheEntry from '@/models/CacheEntry';

const ONE_HOUR = 60 * 60 * 1000;

/**
 * Lazy-refresh cache backed by MongoDB.
 * - Returns stored data immediately if fresher than `ttlMs`.
 * - Otherwise calls `fetcher`, persists the result, and returns it.
 * - If `fetcher` throws and stale data exists, returns the stale data
 *   rather than failing (graceful degradation).
 */
export async function getCached<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlMs: number = ONE_HOUR,
): Promise<T> {
  await connectDB();

  const entry = await CacheEntry.findOne({ key }).lean<{ data: unknown; fetchedAt: Date }>();

  if (entry && Date.now() - new Date(entry.fetchedAt).getTime() < ttlMs) {
    return entry.data as T;
  }

  try {
    const data = await fetcher();
    await CacheEntry.findOneAndUpdate(
      { key },
      { data, fetchedAt: new Date() },
      { upsert: true, new: true },
    );
    return data;
  } catch (err) {
    // External API failed — serve stale data if available
    if (entry) {
      console.warn(`[cache] fetch failed for "${key}", serving stale data:`, err);
      return entry.data as T;
    }
    throw err;
  }
}
