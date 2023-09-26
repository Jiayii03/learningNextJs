import { Redis } from '@upstash/redis'

// configuration for the Redis database
export const db = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
})