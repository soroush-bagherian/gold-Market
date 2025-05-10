import { Module } from '@nestjs/common';
import { CalculatorService } from './calculator/calculator.service';
import { RedisModule } from 'src/redis/redis.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { PricingController } from './pricing.controller';

@Module({
  providers: [CalculatorService],
  controllers: [PricingController],
  imports: [
    ClientsModule.register([
      {
        name: 'MARKET_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'marketData',
          protoPath: join(__dirname, './proto/marketData.proto'),
          url: 'localhost:5000',
        },
      }
    ]),
    RedisModule]
})
export class PricingModule { }
