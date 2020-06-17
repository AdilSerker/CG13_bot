import { chatRepository } from './../../infrastructure/repositories/ChatRepository';
import { userRepository } from './../../infrastructure/repositories/UserRepository';

import { TelegrafContext } from "telegraf/typings/context";
import { OnListener } from "../../types";

class Listners {
    static async onMessage(ctx: TelegrafContext) {

        const user = ctx.update.message.from;
        const chat = ctx.update.message.chat;

        await userRepository.save(user);
        await chatRepository.save(chat);
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