import { config } from 'dotenv'
import Redis from 'ioredis'

config()

const redis = new Redis({
  password: process.env.REDIS_PASSWORD,
  keyPrefix: 'cache:',
})

redis.on('ready', () => {
  console.log('[Redis] Connected.')
})

export { redis }
