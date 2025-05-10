"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const microservices_1 = require("@nestjs/microservices");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.GRPC,
        options: {
            package: 'marketData',
            protoPath: (0, path_1.join)(__dirname, './market-data/proto/market-data.proto'),
            url: 'localhost:5000'
        },
    });
    await app.listen();
}
bootstrap();
//# sourceMappingURL=main.js.map