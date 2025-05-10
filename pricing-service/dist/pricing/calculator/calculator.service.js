"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculatorService = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = require("ioredis");
const rxjs_1 = require("rxjs");
const cache_manager_service_1 = require("../../redis/cache-manager/cache-manager.service");
const redis_pubsub_service_1 = require("../../redis/redis-pubsub/redis-pubsub.service");
const redlock_1 = require("redlock");
let CalculatorService = class CalculatorService {
    constructor(pubSub, cache, client, redlock, redisClient) {
        this.pubSub = pubSub;
        this.cache = cache;
        this.client = client;
        this.redlock = redlock;
        this.redisClient = redisClient;
    }
    onModuleInit() {
        this.publisher = new ioredis_1.default();
        this.subscriber = new ioredis_1.default();
        this.marketService = this.client.getService('MarketData');
        this.subscriber.subscribe('gold-price-channel');
        this.subscriber.on('message', (channel, message) => {
            console.log(`📨 [${channel}]`, message);
            if (message === 'NEW_PRICE_FETCHED') {
            }
        });
    }
    async setGoldVolumeWithLock(value) {
        const resource = 'locks:gold-volume';
        const ttl = 100;
        try {
            const lock = await this.redlock.acquire([resource], ttl);
            await this.redisClient.set('gold-volume', value);
            await lock.release();
            return 'Gold volume set successfully';
        }
        catch (err) {
            console.error('Failed to acquire lock:', err);
            throw new Error('Could not set gold volume safely');
        }
    }
    async getMarketData() {
        try {
            const result = await (0, rxjs_1.lastValueFrom)(this.marketService.GetLatestPrice({}));
            console.log("Market price:", result);
            return result;
        }
        catch (error) {
            throw new Error('Error in fetching gold price.');
        }
    }
    async calculate(volume) {
        const price = await this.getMarketData();
        let goldVolume = await this.cache.get('gold-volume');
        const volumePrice = volume / 31.1035;
        return volumePrice.toFixed(4);
        ;
    }
};
exports.CalculatorService = CalculatorService;
exports.CalculatorService = CalculatorService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)('MARKET_PACKAGE')),
    __param(3, (0, common_1.Inject)('REDLOCK')),
    __param(4, (0, common_1.Inject)('REDIS_CLIENT')),
    __metadata("design:paramtypes", [redis_pubsub_service_1.RedisPubSubService,
        cache_manager_service_1.CacheManagerService, Object, redlock_1.default,
        ioredis_1.default])
], CalculatorService);
//# sourceMappingURL=calculator.service.js.map