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
exports.OrderingController = void 0;
const common_1 = require("@nestjs/common");
const make_order_dto_1 = require("./dto/make-order.dto");
const ordering_service_1 = require("./ordering.service");
let OrderingController = class OrderingController {
    constructor(orderingService) {
        this.orderingService = orderingService;
    }
    async makeOrder(body) {
        try {
            const { orderVolume } = body;
            console.log('Received orderValue:', orderVolume);
            const price = await this.orderingService.getCalculatedPrice(orderVolume);
            return {
                meta: {
                    status: 'success',
                    message: 'Order submitted successfully',
                    timestamp: new Date().toISOString()
                },
                data: {
                    orderVolume,
                    price,
                    orderId: Math.floor(Math.random() * 10000),
                }
            };
        }
        catch (makeOrderError) {
            console.error(makeOrderError);
            throw new common_1.HttpException('خطایی در ثبت سفارش رخ داده است', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.OrderingController = OrderingController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [make_order_dto_1.MakeOrderDto]),
    __metadata("design:returntype", Promise)
], OrderingController.prototype, "makeOrder", null);
exports.OrderingController = OrderingController = __decorate([
    (0, common_1.Controller)('ordering'),
    __metadata("design:paramtypes", [ordering_service_1.OrderingService])
], OrderingController);
//# sourceMappingURL=ordering.controller.js.map