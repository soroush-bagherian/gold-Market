import { Module } from '@nestjs/common';
import { OrderingController } from './ordering.controller';
import { RedisModule } from 'src/redis/redis.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { OrderingService } from './ordering.service';

@Module({
  controllers: [OrderingController],
  imports: [
    ClientsModule.register([
      {
        name: 'PRICING_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'pricing',
          protoPath: join(__dirname, './proto/pricing.proto'),
          url: '127.0.0.1:5001',
        },
      }
    ]),
    RedisModule],
  providers: [OrderingService]
})
export class OrderingModule { }
