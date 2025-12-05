import Redis from 'ioredis';

const getRedisClient = () => {
  const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
  
  // In production, always create a new client
  if (process.env.NODE_ENV === 'production') {
    return new Redis(redisUrl);
  }

  // In development, reuse the existing client to prevent connection leaks
  // during hot reloading
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!(global as any).redis) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global as any).redis = new Redis(redisUrl, {
      // Don't crash the app if Redis is unavailable in dev
      retryStrategy: (times) => {
        if (times > 3) {
            console.warn("Redis connection failed, disabling Redis for this session.");
            return null;
        }
        return Math.min(times * 50, 2000);
      },
      lazyConnect: true 
    });
  }
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (global as any).redis;
};

export const redis = getRedisClient();

/**
 * Retrieves data from the cache or fetches it from the source if not cached.
 * 
 * @param key The unique key for the cache entry.
 * @param fetcher A function that fetches the data if it's not in the cache.
 * @param ttl Time-to-live in seconds (default: 300s / 5 minutes).
 * @returns The data (typed).
 */
export async function getOrSetCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number = 300
): Promise<T> {
  // If Redis is not available or connection fails, fallback to fetcher
  if (!redis || redis.status !== 'ready') {
      try {
          // Attempt to connect if lazy (and not already connecting/ready)
          if (redis && redis.status === 'wait') {
              await redis.connect();
          }
      } catch {
          console.warn(`Redis connection failed for key ${key}, skipping cache.`);
          return fetcher();
      }
      
      // If still not ready, skip
      if (!redis || redis.status !== 'ready') {
          return fetcher();
      }
  }

  try {
    const cachedData = await redis.get(key);
    if (cachedData) {
      return JSON.parse(cachedData) as T;
    }
  } catch (error) {
    console.error(`Error reading from Redis for key ${key}:`, error);
  }

  const data = await fetcher();

  try {
    if (data) {
      await redis.set(key, JSON.stringify(data), 'EX', ttl);
    }
  } catch (error) {
    console.error(`Error writing to Redis for key ${key}:`, error);
  }

  return data;
}
