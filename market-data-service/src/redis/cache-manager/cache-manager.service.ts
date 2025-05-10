import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { reduce } from 'rxjs';


@Injectable()
export class CacheManagerService {

    private client: Redis;

    onModuleInit() {
        this.client = new Redis();
    }

    async set(key: string, value: string, ttlSeconds = 3600) {
        if (ttlSeconds) {
            await this.client.set(key, value, 'EX', ttlSeconds);
        } else {
            await this.client.set(key, value);
        }
    }

    async get(key: string): Promise<string | null> {
        return this.client.get(key);
    }

    async del(key: string) {
        return this.client.del(key);
    }

}
