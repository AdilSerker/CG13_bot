import { replyWithPhoto } from '../../components/telegram-bot/TelegramBot';
import { SubscriberRepository } from '../../infrastructure/repositories/SubscriberRepository';
import { TelegrafContext } from 'telegraf/typings/context';

import { BasePrivateChatUseCase } from "./BasePrivateChatUseCase";

export class StartChatBot extends BasePrivateChatUseCase {

    protected async runLogic() {
        await replyWithPhoto(
            this.ctx,
            'AgACAgIAAxkBAAIhMV9l8ZscvfScO059OsQCKvUqMrELAAL6rjEbryThStO6h13bmmHxFgPZli4AAwEAAwIAA3gAA7ksAQABGwQ',
            {
                caption: 'Добро пожаловать.\n\n' +
                'В этом ботоблоге я буду публиковать всякое разное что мне кажется может быть интересным для тех кто хочет следить за развитием проекта\n\n' +
                'Больше инфы тут /help'
            }
        );
    }
}