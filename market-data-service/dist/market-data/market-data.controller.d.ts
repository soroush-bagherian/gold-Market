import { MarketDataService } from './market-data.service';
export declare class MarketDataController {
    private readonly marketDataService;
    constructor(marketDataService: MarketDataService);
    getLatestPrice(_: any, metadata: any): Promise<{
        price: any;
    }>;
}
