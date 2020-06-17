import { UpdateType, MessageSubTypes } from "telegraf/typings/telegram-types";
import { Middleware } from "telegraf";
import { TelegrafContext } from "telegraf/typings/context";
import { OnListener } from "../../types";

class Listners {
    static async onMessage(ctx: TelegrafContext) {
        
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