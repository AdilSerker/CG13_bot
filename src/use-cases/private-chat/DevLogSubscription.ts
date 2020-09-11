import { reply } from './../../components/telegram-bot/TelegramBot';
import { SubscriberRepository } from './../../infrastructure/repositories/SubscriberRepository';
import { TelegrafContext } from 'telegraf/typings/context';

import { BasePrivateChatUseCase } from "./BasePrivateChatUseCase";

export class DevLogSubscription extends BasePrivateChatUseCase {
    protected subscriberRepository: SubscriberRepository;

    constructor(ctx: TelegrafContext) {
        super(ctx);
        this.subscriberRepository = new SubscriberRepository();
    }

    protected async runLogic() {
        let subscriber = await this.subscriberRepository.getByUserId(this.user.id.toString());

        if (subscriber && subscriber.dev_log) {
            await this.subscriberRepository.save(this.user.id.toString(), false);
            reply(this.ctx, 'Вы отписались от обновлений в блоге по разработке Ягура\n' +
                'Для возобновления подписки /devlog'
            );
        } else {
            await this.subscriberRepository.save(this.user.id.toString(), true);
            reply(this.ctx, 'Вы подписались на девлог по разработе Ягура. Спасибо!\n');
        }


    }
}