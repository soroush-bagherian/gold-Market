import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import Redlock from 'redlock';

@Injectable()
export class RedisPubSubService implements OnModuleInit {


  constructor(
    @Inject('REDLOCK') private readonly redlock: Redlock,
    @Inject('REDIS_CLIENT') private readonly redis: Redis
  ){}

  private publisher: Redis;
  private subscriber: Redis;

  onModuleInit() {
    this.publisher = this.redis;
    this.subscriber = this.redis;

    this.subscriber.subscribe('gold-price-channel');
    this.subscriber.on('message', (channel, message) => {
      console.log(`📨 [${channel}]`, message);
    });
  }

  async publish(channel: string, message: string) {
    return this.publisher.publish(channel, message);
  }
}
