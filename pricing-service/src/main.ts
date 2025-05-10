import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {

  const app = await NestFactory.create(AppModule); // HTTP app

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'pricing',
      protoPath: join(__dirname, './pricing/proto/pricing.proto'),
      url: '127.0.0.1:5001'
    },
  })

  await app.startAllMicroservices(); // start gRPC service
  await app.listen(3000);            // start HTTP server
  console.log('🚀 App is running on http://localhost:3000');
  console.log('📡 gRPC server is running on 127.0.0.1:5001');

}
bootstrap();
