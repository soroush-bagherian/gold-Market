import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CalculatorService } from './calculator/calculator.service';

@Controller('pricing')
export class PricingController {

    constructor(private readonly calculatorService: CalculatorService){}

    @GrpcMethod('Pricing', 'Calculate')
    async calculate(data: { volume: number }, metadata: any) {
        const { volume } = data;
        const calculatedPrice = await this.calculatorService.calculate(volume);
        return { calculatedPrice };
    }

}
