"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisPubSubService = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = require("ioredis");
let RedisPubSubService = class RedisPubSubService {
    onModuleInit() {
        this.publisher = new ioredis_1.default();
        this.subscriber = new ioredis_1.default();
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
    (0, common_1.Injectable)()
], RedisPubSubService);
//# sourceMappingURL=redis-pubsub.service.js.map