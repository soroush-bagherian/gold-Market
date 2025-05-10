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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketDataController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const market_data_service_1 = require("./market-data.service");
let MarketDataController = class MarketDataController {
    constructor(marketDataService) {
        this.marketDataService = marketDataService;
    }
    async getLatestPrice(_, metadata) {
        const goldInfo = await this.marketDataService.fetchGoldPrice();
        return { price: goldInfo.rates.USDXAU };
    }
};
exports.MarketDataController = MarketDataController;
__decorate([
    (0, microservices_1.GrpcMethod)('MarketData', 'GetLatestPrice'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MarketDataController.prototype, "getLatestPrice", null);
exports.MarketDataController = MarketDataController = __decorate([
    (0, common_1.Controller)('market-data'),
    __metadata("design:paramtypes", [market_data_service_1.MarketDataService])
], MarketDataController);
//# sourceMappingURL=market-data.controller.js.map