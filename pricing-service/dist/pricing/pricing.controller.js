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
exports.PricingController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const calculator_service_1 = require("./calculator/calculator.service");
let PricingController = class PricingController {
    constructor(calculatorService) {
        this.calculatorService = calculatorService;
    }
    async calculate(data, metadata) {
        const { volume } = data;
        const calculatedPrice = await this.calculatorService.calculate(volume);
        return { calculatedPrice };
    }
};
exports.PricingController = PricingController;
__decorate([
    (0, microservices_1.GrpcMethod)('Pricing', 'Calculate'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PricingController.prototype, "calculate", null);
exports.PricingController = PricingController = __decorate([
    (0, common_1.Controller)('pricing'),
    __metadata("design:paramtypes", [calculator_service_1.CalculatorService])
], PricingController);
//# sourceMappingURL=pricing.controller.js.map