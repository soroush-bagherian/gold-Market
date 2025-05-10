import { OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { CacheManagerService } from 'src/redis/cache-manager/cache-manager.service';
import { RedisPubSubService } from 'src/redis/redis-pubsub/redis-pubsub.service';
export declare class CalculatorService implements OnModuleInit {
    private readonly pubSub;
    private readonly cache;
    private client;
    private marketService;
    private publisher;
    private subscriber;
    constructor(pubSub: RedisPubSubService, cache: CacheManagerService, client: ClientGrpc);
    onModuleInit(): void;
    getMarketData(): Promise<unknown>;
    calculate(): Promise<void>;
    setPrice(): Promise<void>;
}
