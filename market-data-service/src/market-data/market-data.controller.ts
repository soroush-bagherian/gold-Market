import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { MarketDataService } from './market-data.service';

@Controller('market-data')
export class MarketDataController {

    constructor(private readonly marketDataService: MarketDataService) {}

    @GrpcMethod('MarketData', 'GetLatestPrice')
    async getLatestPrice(_:any, metadata: any){
        const goldInfo = await this.marketDataService.fetchGoldPrice();
        return { price: goldInfo.rates.USDXAU };
    }
}
