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
exports.orderingController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const calculator_service_1 = require("./calculator/calculator.service");
let orderingController = class orderingController {
    constructor(calculatorService) {
        this.calculatorService = calculatorService;
    }
    async calculate(_, metadata) {
        const calculatedPrice = this.calculatorService.calculate();
        return { price: calculatedPrice };
    }
};
exports.orderingController = orderingController;
__decorate([
    (0, microservices_1.GrpcMethod)('ordering', 'Calculate'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], orderingController.prototype, "calculate", null);
exports.orderingController = orderingController = __decorate([
    (0, common_1.Controller)('ordering'),
    __metadata("design:paramtypes", [calculator_service_1.CalculatorService])
], orderingController);
//# sourceMappingURL=pricing.controller.js.map