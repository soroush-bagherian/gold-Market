import { Body, Controller, Post } from '@nestjs/common';
import { MakeOrderDto } from './dto/make-order.dto';
import { OrderingService } from './ordering.service';

@Controller('ordering')
export class OrderingController {

    constructor(private readonly orderingService: OrderingService) { }

    @Post()
    async makeOrder(@Body() body: MakeOrderDto): Promise<Object> {
        const { orderVolume } = body;
        console.log('Received orderValue:', orderVolume);

        const price = await this.orderingService.getCalculatedPrice(orderVolume);

        return {
            meta: {
                status: 'success',
                message: 'Order submitted successfully',
                timestamp: new Date().toISOString()
            },
            data: {
                orderVolume,
                price,
                orderId: Math.floor(Math.random() * 10000),
            }
        };
    }

}
