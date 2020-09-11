import { reply } from './../components/telegram-bot/TelegramBot';
import { BaseUseCase } from './BaseUseCase';

export class HelpCase extends BaseUseCase {
    public async execute(): Promise<void> {

        if (this.chat.type === 'group' || this.chat.type === 'supergroup') {
            await reply(
                this.ctx,
                '/rn - Случайное число от 0 - 9\n\n' +
                '/rs - RandStation - Случайная работа из трендов арт-станции\n\n' +
                '/ab - Анекдот уровня /Б\n\n' +
                '/yn - Да или Нет?\n\n'
            );
        } else {
            await reply(
                this.ctx,
                '/devlog - Подписаться на dev log\n\n' +
                '/lastbuild - Последний актуальный билд\n\n' +
                '/getbuild - Получать последний актуальный билд\n\n'
            );
        }
        
    }
}
