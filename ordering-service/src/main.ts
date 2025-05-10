import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {

  const app = await NestFactory.create(AppModule); // HTTP app
  app.useGlobalPipes(new ValidationPipe());

  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.GRPC,
  //   options: {
  //     package: 'ordering',
  //     protoPath: join(__dirname, './ordering/proto/ordering.proto'),
  //     url: '127.0.0.1:5002'
  //   },
  // })

  // await app.startAllMicroservices(); // start gRPC service
  await app.listen(3001);            // start HTTP server
  console.log('🚀 App is running on http://localhost:3001');
  console.log('📡 gRPC server is running on 127.0.0.1:5001');

}
bootstrap();
