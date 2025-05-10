import { CalculatorService } from './calculator/calculator.service';
export declare class orderingController {
    private readonly calculatorService;
    constructor(calculatorService: CalculatorService);
    calculate(_: any, metadata: any): Promise<{
        price: Promise<void>;
    }>;
}
