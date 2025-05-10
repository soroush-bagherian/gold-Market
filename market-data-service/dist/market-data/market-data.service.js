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
var MarketDataService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketDataService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const redis_pubsub_service_1 = require("../redis/redis-pubsub/redis-pubsub.service");
const cache_manager_service_1 = require("../redis/cache-manager/cache-manager.service");
const channel_messages_1 = require("./configs/channel-messages");
const schedule_1 = require("@nestjs/schedule");
let MarketDataService = MarketDataService_1 = class MarketDataService {
    constructor(pubSub, cache) {
        this.pubSub = pubSub;
        this.cache = cache;
        this.logger = new common_1.Logger(MarketDataService_1.name);
    }
    async fetchGoldPrice() {
        try {
            const cachedGoldPrice = await this.cache.get('goldPrice')
                .catch(err => this.logger.log(`Error in getting goldPrice from cache. ${err}`));
            if (cachedGoldPrice) {
                this.logger.log(`Gold price fetched from cache: ${cachedGoldPrice}`);
                return JSON.parse(cachedGoldPrice);
            }
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'https://api.metalpriceapi.com/v1/latest?api_key=a97934ab358098521f15c798f711d30e&base=USD&currencies=EUR,XAU,XAG',
                headers: {}
            };
            const response = await axios_1.default.request(config);
            const data = response.data;
            this.cache.set('goldPrice', JSON.stringify(data))
                .then(res => this.logger.log(`Gold price has stored in cache.`));
            this.logger.log(`Gold Price: $${data.rates.USDXAU}`);
            await this.pubSub.publish('gold-price-channel', channel_messages_1.default.NEW_PRICE_FETCHED);
            return data;
        }
        catch (error) {
            this.logger.error('Failed to fetch gold price', error.message);
        }
    }
};
exports.MarketDataService = MarketDataService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_10_SECONDS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MarketDataService.prototype, "fetchGoldPrice", null);
exports.MarketDataService = MarketDataService = MarketDataService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_pubsub_service_1.RedisPubSubService,
        cache_manager_service_1.CacheManagerService])
], MarketDataService);
//# sourceMappingURL=market-data.service.js.map