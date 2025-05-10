import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MarketDataModule } from './market-data/market-data.module';
import { RedisPubSubService } from './redis/redis-pubsub/redis-pubsub.service';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MarketDataModule,
    RedisModule,
  ],
  controllers: [],
  providers: [RedisPubSubService],
  exports: [RedisPubSubService]
})
export class AppModule {}
