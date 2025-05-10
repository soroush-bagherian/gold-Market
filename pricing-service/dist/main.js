"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const microservices_1 = require("@nestjs/microservices");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.connectMicroservice({
        transport: microservices_1.Transport.GRPC,
        options: {
            package: 'pricing',
            protoPath: (0, path_1.join)(__dirname, './pricing/proto/pricing.proto'),
            url: '127.0.0.1:5001'
        },
    });
    await app.startAllMicroservices();
    await app.listen(3000);
    console.log('🚀 App is running on http://localhost:3000');
    console.log('📡 gRPC server is running on 127.0.0.1:5001');
}
bootstrap();
//# sourceMappingURL=main.js.map