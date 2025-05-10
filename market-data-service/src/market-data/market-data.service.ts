import { Inject, Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { RedisPubSubService } from 'src/redis/redis-pubsub/redis-pubsub.service';
import { CacheManagerService } from 'src/redis/cache-manager/cache-manager.service';
import channelMessages from './configs/channel-messages';
import { Cron, CronExpression } from '@nestjs/schedule';


@Injectable()
export class MarketDataService {

    private readonly logger = new Logger(MarketDataService.name);

    constructor(
        private readonly pubSub: RedisPubSubService,
        private readonly cache: CacheManagerService
    ) { }


    @Cron(CronExpression.EVERY_10_SECONDS)
    async fetchGoldPrice() {
        try {

            const cachedGoldPrice = await this.cache.get('goldPrice')
                .catch(err => this.logger.log(`Error in getting goldPrice from cache. ${err}`));


            if (cachedGoldPrice) {
                this.logger.log(`Gold price fetched from cache: ${cachedGoldPrice}`);
                return JSON.parse(cachedGoldPrice);
            }

            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'https://api.metalpriceapi.com/v1/latest?api_key=a97934ab358098521f15c798f711d30e&base=USD&currencies=EUR,XAU,XAG',
                headers: {}
            };

            const response = await axios.request(config);

            const data = response.data;

            this.cache.set('goldPrice', JSON.stringify(data))
                .then(res => this.logger.log(`Gold price has stored in cache.`));

            this.logger.log(`Gold Price: $${data.rates.USDXAU}`);

            await this.pubSub.publish('gold-price-channel', channelMessages.NEW_PRICE_FETCHED);

            return data;

        } catch (error) {
            this.logger.error('Failed to fetch gold price', error.message);
            //Error must be handled
        }
    }

}
