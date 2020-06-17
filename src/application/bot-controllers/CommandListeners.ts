import { CommandListener } from './../../types';
import { UpdateType, MessageSubTypes } from "telegraf/typings/telegram-types";
import { Middleware } from "telegraf";
import { TelegrafContext } from "telegraf/typings/context";

class Listners {
    static async onStats(ctx: TelegrafContext) {
        await ctx.reply('This Message');
    }
}

export const commands: CommandListener[] = [
    {
        command: "/stats",
        middleware: Listners.onStats
    },

]