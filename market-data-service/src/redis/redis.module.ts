import { Module } from '@nestjs/common';
import { RedisPubSubService } from './redis-pubsub/redis-pubsub.service';
import { CacheManagerService } from './cache-manager/cache-manager.service';
@Module({
  providers: [RedisPubSubService, CacheManagerService],
  exports: [RedisPubSubService, CacheManagerService]
})
export class RedisModule {}
