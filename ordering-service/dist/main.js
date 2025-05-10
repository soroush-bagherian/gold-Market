"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(3001);
    console.log('🚀 App is running on http://localhost:3001');
    console.log('📡 gRPC server is running on 127.0.0.1:5001');
}
bootstrap();
//# sourceMappingURL=main.js.map