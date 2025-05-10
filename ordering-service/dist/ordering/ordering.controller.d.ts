import { MakeOrderDto } from './dto/make-order.dto';
import { OrderingService } from './ordering.service';
export declare class OrderingController {
    private readonly orderingService;
    constructor(orderingService: OrderingService);
    makeOrder(body: MakeOrderDto): Promise<Object>;
}
