import { TelegrafContext } from "telegraf/typings/context";
import { Middleware } from "telegraf";
import { TextListener } from "../../types";

export const textListeners: TextListener[] = [
    {
        match: 'Проверка',
        middleware: async (ctx: TelegrafContext) => {
            // await ctx.reply('Welcome');

        }
    }
];