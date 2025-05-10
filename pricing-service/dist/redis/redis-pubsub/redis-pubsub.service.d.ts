import { OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import Redlock from 'redlock';
export declare class RedisPubSubService implements OnModuleInit {
    private readonly redlock;
    private readonly redis;
    constructor(redlock: Redlock, redis: Redis);
    private publisher;
    private subscriber;
    onModuleInit(): void;
    publish(channel: string, message: string): Promise<number>;
}
