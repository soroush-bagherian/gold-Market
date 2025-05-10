import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { RedisPubSubService } from './redis/redis-pubsub/redis-pubsub.service';
import { RedisModule } from './redis/redis.module';
import { PricingModule } from './pricing/pricing.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    RedisModule,
    PricingModule,
  ],
  controllers: [],
  providers: [RedisPubSubService],
  exports: [RedisPubSubService]
})
export class AppModule {}
