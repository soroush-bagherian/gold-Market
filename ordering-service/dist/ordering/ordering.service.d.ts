import { ClientGrpc } from '@nestjs/microservices';
export declare class OrderingService {
    private client;
    private pricingService;
    constructor(client: ClientGrpc);
    getCalculatedPrice(volume: number): Promise<unknown>;
}
