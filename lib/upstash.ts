import {Ratelimit} from "@upstash/ratelimit";
import {Redis} from "@upstash/redis";
 
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

export const rateLimit = new Ratelimit({
    redis: Redis.fromEnv(),
    // Allow 3 requests per 2 months on prod
    limiter: Ratelimit.fixedWindow(3, "30 d"),
    analytics: true,
    prefix: "logocreator",
})