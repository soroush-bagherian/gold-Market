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
exports.RedisPubSubService = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = require("ioredis");
const redlock_1 = require("redlock");
let RedisPubSubService = class RedisPubSubService {
    constructor(redlock, redis) {
        this.redlock = redlock;
        this.redis = redis;
    }
    onModuleInit() {
        this.publisher = this.redis;
        this.subscriber = this.redis;
        this.subscriber.subscribe('gold-price-channel');
        this.subscriber.on('message', (channel, message) => {
            console.log(`📨 [${channel}]`, message);
        });
    }
    async publish(channel, message) {
        return this.publisher.publish(channel, message);
    }
};
exports.RedisPubSubService = RedisPubSubService;
exports.RedisPubSubService = RedisPubSubService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('REDLOCK')),
    __param(1, (0, common_1.Inject)('REDIS_CLIENT')),
    __metadata("design:paramtypes", [redlock_1.default,
        ioredis_1.default])
], RedisPubSubService);
//# sourceMappingURL=redis-pubsub.service.js.map