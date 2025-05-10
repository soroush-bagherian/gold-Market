"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderingModule = void 0;
const common_1 = require("@nestjs/common");
const calculator_service_1 = require("./calculator/calculator.service");
const redis_module_1 = require("../redis/redis.module");
const microservices_1 = require("@nestjs/microservices");
const path_1 = require("path");
const ordering_controller_1 = require("./ordering.controller");
let orderingModule = class orderingModule {
};
exports.orderingModule = orderingModule;
exports.orderingModule = orderingModule = __decorate([
    (0, common_1.Module)({
        providers: [calculator_service_1.CalculatorService],
        controllers: [ordering_controller_1.orderingController],
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: 'MARKET_PACKAGE',
                    transport: microservices_1.Transport.GRPC,
                    options: {
                        package: 'marketData',
                        protoPath: (0, path_1.join)(__dirname, './proto/marketData.proto'),
                        url: 'localhost:5000',
                    },
                }
            ]),
            redis_module_1.RedisModule
        ]
    })
], orderingModule);
//# sourceMappingURL=pricing.module.js.map