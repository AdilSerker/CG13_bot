import { TelegrafContext } from "telegraf/typings/context";

import { CommandListener } from './../../types';

class Listners {
    static async onStats(ctx: TelegrafContext) {
        await ctx.reply('стата уже собирается, но пока нельзя смотреть');
    }

    static async onBakaRollDigits(ctx: TelegrafContext) {
        let min = 0, max = 10;

        let rand = min - 0.5 + Math.random() * (max - min + 1);

        await ctx.reply('Держи ' + rand);
    }

    static async onBakaRollYesOrNo(ctx: TelegrafContext) {
        let min = 0, max = 1;

        let rand = min - 0.5 + Math.random() * (max - min + 1);

        await ctx.reply('Держи ' + (rand > 0 ? 'Да': 'Нет'));
    }
}

export const commands: CommandListener[] = [
    {
        command: "/stats",
        middleware: Listners.onStats
    },
    {
        command: "/baka_roll_digits",
        middleware: Listners.onBakaRollDigits
    }

]