import { userRepository } from './../../infrastructure/repositories/UserRepository';

import { TelegrafContext } from "telegraf/typings/context";
import { OnListener } from "../../types";

class Listners {
    static async onMessage(ctx: TelegrafContext) {

        const user_from = ctx.update.message.from;

        const user = await userRepository.get(user_from.id);

        if (!user) {
            await userRepository.save(user_from);
        }
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