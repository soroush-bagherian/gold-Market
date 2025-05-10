"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisModule = void 0;
const common_1 = require("@nestjs/common");
const redis_pubsub_service_1 = require("./redis-pubsub/redis-pubsub.service");
const cache_manager_service_1 = require("./cache-manager/cache-manager.service");
const redlock_1 = require("redlock");
const ioredis_1 = require("ioredis");
const redisClient = new ioredis_1.default();
const redlock = new redlock_1.default([redisClient], {
    retryCount: 5,
    retryDelay: 200
});
let RedisModule = class RedisModule {
};
exports.RedisModule = RedisModule;
exports.RedisModule = RedisModule = __decorate([
    (0, common_1.Module)({
        providers: [
            {
                provide: 'REDIS_CLIENT',
                useValue: redisClient,
            },
            {
                provide: 'REDLOCK',
                useValue: redlock,
            },
            redis_pubsub_service_1.RedisPubSubService,
            cache_manager_service_1.CacheManagerService
        ],
        exports: [redis_pubsub_service_1.RedisPubSubService, cache_manager_service_1.CacheManagerService, 'REDIS_CLIENT', 'REDLOCK']
    })
], RedisModule);
//# sourceMappingURL=redis.module.js.map