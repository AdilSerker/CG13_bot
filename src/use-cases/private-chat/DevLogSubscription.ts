import { TelegrafContext } from 'telegraf/typings/context';

import { sendPost, reply } from './../../components/telegram-bot/TelegramBot';

import { DevLogPost, FileType } from './../../domain/dev-log-post/DevLogPost';
import { DevLogRepository } from './../../infrastructure/repositories/DevLogRepository';
import { SubscriberRepository } from './../../infrastructure/repositories/SubscriberRepository';

import { BasePrivateChatUseCase } from "./BasePrivateChatUseCase";

export class DevLogSubscription extends BasePrivateChatUseCase {
    protected subscriberRepository: SubscriberRepository;
    protected devLogRepository: DevLogRepository;

    constructor(ctx: TelegrafContext) {
        super(ctx);
        this.subscriberRepository = new SubscriberRepository();
        this.devLogRepository = new DevLogRepository();
    }

    protected async runLogic() {
        let subscriber = await this.subscriberRepository.getByUserId(this.user.id.toString());

        if (subscriber && subscriber.dev_log) {
            await this.subscriberRepository.save(this.user.id.toString(), false);
            await reply(this.ctx, 'Вы отписались от обновлений в блоге по разработке Ягура\n' +
                'Для возобновления подписки /devlog'
            );
        } else {
            const firstSubscribe = !subscriber;
            await this.subscriberRepository.save(this.user.id.toString(), true);
            await reply(this.ctx, 'Вы подписались на девлог по разработке Ягура. Спасибо!\n');

            if (firstSubscribe) {
                const allPosts = await this.devLogRepository.get();

                for (const post of allPosts) {
                    await sendPost(this.user.id.toString(), post);
                }
            }
        }
    }
}
