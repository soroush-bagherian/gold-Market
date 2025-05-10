import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { lastValueFrom, Observable } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';
import { CacheManagerService } from 'src/redis/cache-manager/cache-manager.service';
import { RedisPubSubService } from 'src/redis/redis-pubsub/redis-pubsub.service';
import Redlock from 'redlock';



@Injectable()
export class CalculatorService implements OnModuleInit {

  private marketService: any;

  private publisher: Redis;
  private subscriber: Redis;

  constructor(
    private readonly pubSub: RedisPubSubService,
    private readonly cache: CacheManagerService,
    @Inject('MARKET_PACKAGE') private client: ClientGrpc,
    @Inject('REDLOCK') private readonly redlock: Redlock,
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
  ) { }

  onModuleInit() {
    this.publisher = new Redis();
    this.subscriber = new Redis();
    this.marketService = this.client.getService('MarketData');

    this.subscriber.subscribe('gold-price-channel');
    this.subscriber.on('message', (channel, message) => {
      console.log(`📨 [${channel}]`, message);
      if (message === 'NEW_PRICE_FETCHED') {
        //fetch price with rpc request
      }
    });

  }

  async setGoldVolumeWithLock(value: number) {
    const resource = 'locks:gold-volume';
    const ttl = 100;

    try {
      const lock = await this.redlock.acquire([resource], ttl);

      await this.redisClient.set('gold-volume', value);

      await lock.release();

      return 'Gold volume set successfully';
    } catch (err) {
      console.error('Failed to acquire lock:', err);
      throw new Error('Could not set gold volume safely');
    }
  }

  async getMarketData() {
    try {
      const result = await lastValueFrom(this.marketService.GetLatestPrice({}));
      console.log("Market price:", result);
      return result;
    } catch (error) {
      throw new Error('Error in fetching gold price.')
    }

  }

  async calculate(volume: number) {
    const price = await this.getMarketData();
    //await this.setGoldVolumeWithLock(1000);
    let goldVolume = await this.cache.get('gold-volume');

    const volumePrice = volume / 31.1035;

    //TODO: calculate price according to business logic

    return volumePrice.toFixed(4);;

  }

}
