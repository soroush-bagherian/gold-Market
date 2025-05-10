import { RedisPubSubService } from 'src/redis/redis-pubsub/redis-pubsub.service';
import { CacheManagerService } from 'src/redis/cache-manager/cache-manager.service';
export declare class MarketDataService {
    private readonly pubSub;
    private readonly cache;
    private readonly logger;
    constructor(pubSub: RedisPubSubService, cache: CacheManagerService);
    fetchGoldPrice(): Promise<any>;
}
