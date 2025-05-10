"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderingModule = void 0;
const common_1 = require("@nestjs/common");
const ordering_controller_1 = require("./ordering.controller");
const redis_module_1 = require("../redis/redis.module");
const microservices_1 = require("@nestjs/microservices");
const path_1 = require("path");
const ordering_service_1 = require("./ordering.service");
let OrderingModule = class OrderingModule {
};
exports.OrderingModule = OrderingModule;
exports.OrderingModule = OrderingModule = __decorate([
    (0, common_1.Module)({
        controllers: [ordering_controller_1.OrderingController],
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: 'PRICING_PACKAGE',
                    transport: microservices_1.Transport.GRPC,
                    options: {
                        package: 'pricing',
                        protoPath: (0, path_1.join)(__dirname, './proto/pricing.proto'),
                        url: '127.0.0.1:5001',
                    },
                }
            ]),
            redis_module_1.RedisModule
        ],
        providers: [ordering_service_1.OrderingService]
    })
], OrderingModule);
//# sourceMappingURL=ordering.module.js.map