import { CalculatorService } from './calculator/calculator.service';
export declare class PricingController {
    private readonly calculatorService;
    constructor(calculatorService: CalculatorService);
    calculate(data: {
        volume: number;
    }, metadata: any): Promise<{
        calculatedPrice: string;
    }>;
}
