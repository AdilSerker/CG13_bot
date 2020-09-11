import { reply, bot } from './../../components/telegram-bot/TelegramBot';
import { concreting } from './../../components/concrete/index';
import { TelegrafContext } from "telegraf/typings/context";

import { OnListener } from "../../types";
import { messageRepository } from './../../infrastructure/repositories/MessageRepository';

class Listners {
    
    static async onMessage(ctx: TelegrafContext) {

        const messageWithContext = ctx.update.message;

        await messageRepository.saveMessageSource(messageWithContext);

    }

    static async onEditMessage(ctx: TelegrafContext) {

        const messageWithContext = ctx.update.edited_message;

        await messageRepository.saveMessageSource(messageWithContext, true);
    }
}

export const onListeners: OnListener[] = [
    {
        updateType: ["sticker", "voice", "video", "photo", "text"],
        middleware: Listners.onMessage
    },
    {
        updateType: "edited_message",
        middleware: Listners.onEditMessage
    },
    {
        updateType: "message",
        middleware: Listners.onMessage
    }
]