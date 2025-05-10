import { OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { ClientGrpc } from '@nestjs/microservices';
import { CacheManagerService } from 'src/redis/cache-manager/cache-manager.service';
import { RedisPubSubService } from 'src/redis/redis-pubsub/redis-pubsub.service';
import Redlock from 'redlock';
export declare class CalculatorService implements OnModuleInit {
    private readonly pubSub;
    private readonly cache;
    private client;
    private readonly redlock;
    private readonly redisClient;
    private marketService;
    private publisher;
    private subscriber;
    constructor(pubSub: RedisPubSubService, cache: CacheManagerService, client: ClientGrpc, redlock: Redlock, redisClient: Redis);
    onModuleInit(): void;
    setGoldVolumeWithLock(value: number): Promise<string>;
    getMarketData(): Promise<unknown>;
    calculate(volume: number): Promise<string>;
}
