import { messageRepository } from './../../infrastructure/repositories/MessageRepository';
import { chatRepository } from './../../infrastructure/repositories/ChatRepository';
import { userRepository } from './../../infrastructure/repositories/UserRepository';

import { TelegrafContext } from "telegraf/typings/context";
import { OnListener } from "../../types";

class Listners {
    static async onMessage(ctx: TelegrafContext) {

        const user = ctx.update.message.from;
        const chat = ctx.update.message.chat;

        const messageWithContext = ctx.update.message;

        await userRepository.save(user);
        await chatRepository.save(chat);

        await messageRepository.save({
            id: messageWithContext.message_id,
            chat_id: chat.id,
            user_id: user.id,
            date: messageWithContext.date,
            sticker: !!messageWithContext.sticker,
            voice: !!messageWithContext.voice
        });
    }

    static async onSticker(ctx: TelegrafContext) {
        
    }

    static async onVoice(ctx: TelegrafContext) {
        
    }
}

export const onListeners: OnListener[] = [
    {
        updateType: "message",
        middleware: Listners.onMessage
    },
    {
        updateType: "sticker",
        middleware: Listners.onSticker
    },
    {
        updateType: "voice",
        middleware: Listners.onVoice
    }

]