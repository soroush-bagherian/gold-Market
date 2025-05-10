import { Module } from '@nestjs/common';
import { RedisPubSubService } from './redis-pubsub/redis-pubsub.service';
import { CacheManagerService } from './cache-manager/cache-manager.service';
import Redlock from 'redlock';
import Redis from 'ioredis';

const redisClient = new Redis();

const redlock = new Redlock([redisClient], {
  retryCount: 5,
  retryDelay: 200
});

@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useValue: redisClient,
    },
    {
      provide: 'REDLOCK',
      useValue: redlock,
    },
    RedisPubSubService,
    CacheManagerService
  ],
  exports: [RedisPubSubService, CacheManagerService, 'REDIS_CLIENT', 'REDLOCK']
})
export class RedisModule {}
