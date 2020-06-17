import { UpdateType, MessageSubTypes } from "telegraf/typings/telegram-types";
import { Middleware } from "telegraf";
import { TelegrafContext } from "telegraf/typings/context";
import { OnListener } from "../../types";

class Listners {
    static async onMessage(ctx: TelegrafContext) {
        await ctx.reply('This Message');
    }
}

export const onListeners: OnListener[] = [
    {
        updateType: "message",
        middleware: Listners.onMessage
    },

]