import { TelegrafContext } from "telegraf/typings/context";
import { Middleware } from "telegraf";
import { TextListener } from "../../types";

export const textListeners: TextListener[] = [
    {
        match: 'бан',
        middleware: async (ctx: TelegrafContext) => {
            // await ctx.reply('Welcome');
            console.log('кого банить собрался');
        }
    }
];