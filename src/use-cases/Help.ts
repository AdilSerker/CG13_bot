import { TelegrafContext } from 'telegraf/typings/context';

import { SubscriberRepository } from './../infrastructure/repositories/SubscriberRepository';
import { reply } from './../components/telegram-bot/TelegramBot';
import { BaseUseCase } from './BaseUseCase';

export class HelpCase extends BaseUseCase {
    protected subscriberRepository: SubscriberRepository;

    constructor(ctx: TelegrafContext) {
        super(ctx);
        this.subscriberRepository = new SubscriberRepository();
    }
    
    public async execute(): Promise<void> {

        if (this.checkPermission()) {
            await this.runLogic();
        } else {
            await reply(
                this.ctx,
                '/rn - Случайное число от 0 - 9\n\n' +
                '/rs - RandStation - Случайная работа из трендов арт-станции\n\n' +
                '/ab - Анекдот уровня /Б\n\n' +
                '/yn - Да или Нет?\n\n'
            );
        }
        
    }

    protected checkPermission(): boolean {
        return this.chat.type === 'private'
    }

    protected async runLogic() {
        const sub = await this.subscriberRepository.getByUserId(this.user.id.toString());
        await reply(
            this.ctx,
            `/devlog - ${sub && sub.dev_log ? 'Отписаться от devlog' : 'Подписаться на devlog'}\n\n` +
            '/lastbuild - Последний актуальный билд\n\n' +
            '/getbuild - Получать последний актуальный билд\n\n'
        );
    }
    
}
