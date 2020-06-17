import { TelegrafContext } from "telegraf/typings/context";

import { CommandListener } from './../../types';

class Listners {
    static async onStats(ctx: TelegrafContext) {
        await ctx.reply('STATS, check console');
        console.log('onStats', JSON.stringify(ctx.getChat()));
    }
}

export const commands: CommandListener[] = [
    {
        command: "/stats",
        middleware: Listners.onStats
    },

]