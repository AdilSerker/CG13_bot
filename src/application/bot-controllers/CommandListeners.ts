import { TelegrafContext } from "telegraf/typings/context";

import { CommandListener } from './../../types';
import { randomInteger } from "../../components/utils/randomize";

const BAD_WORDS = [
    'ебать',
    'нахуй',
    'бля',
    'блядь',
    'сука',
    'ебанарот',
    'епта',
    'хуле'
];

class Listners {
    static async onStats(ctx: TelegrafContext) {
        // await ctx.reply('стата уже собирается, но пока нельзя смотреть');

        console.log('STATS');
    }

    static async onBakaRollDigits(ctx: TelegrafContext) {

        let rand = randomInteger(0, 10);

        await ctx.reply('Держи ' + rand);
    }

    static async onBakaRollYesOrNo(ctx: TelegrafContext) {

        let rand = randomInteger(0, 1);

        await ctx.reply((rand > 0 ? 'Да': 'Нет') + ' ' + BAD_WORDS[randomInteger(0, BAD_WORDS.length - 1)]);
    }
}

export const commands: CommandListener[] = [
    {
        command: "/stats",
        middleware: Listners.onStats
    },
    {
        command: "/random_number",
        middleware: Listners.onBakaRollDigits
    },
    {
        command: "/yes_or_no",
        middleware: Listners.onBakaRollYesOrNo
    }

]