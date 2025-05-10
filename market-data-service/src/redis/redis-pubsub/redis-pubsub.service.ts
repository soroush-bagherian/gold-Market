import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisPubSubService implements OnModuleInit {
  private publisher: Redis;
  private subscriber: Redis;

  onModuleInit() {
    this.publisher = new Redis();    // default: 127.0.0.1:6379
    this.subscriber = new Redis();

    this.subscriber.subscribe('gold-price-channel');
    this.subscriber.on('message', (channel, message) => {
      console.log(`📨 [${channel}]`, message);
    });
  }

  async publish(channel: string, message: string) {
    return this.publisher.publish(channel, message);
  }
}
