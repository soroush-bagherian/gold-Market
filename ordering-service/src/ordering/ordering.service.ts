import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrderingService {

    private pricingService;

    constructor(
        @Inject('PRICING_PACKAGE') private client: ClientGrpc
    ) { }

    async getCalculatedPrice(volume: number) {
        this.pricingService = this.client.getService('Pricing');
        return await lastValueFrom(this.pricingService.Calculate({volume}));
    }

}
