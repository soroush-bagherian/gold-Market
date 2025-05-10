import { OnModuleInit } from '@nestjs/common';
export declare class RedisPubSubService implements OnModuleInit {
    private publisher;
    private subscriber;
    onModuleInit(): void;
    publish(channel: string, message: string): Promise<number>;
}
