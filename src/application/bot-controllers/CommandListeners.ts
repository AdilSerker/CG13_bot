import { HttpClient } from './../../components/http/httpClient';
import { TelegrafContext } from "telegraf/typings/context";

import { artStationService } from './../../infrastructure/services/ArtStationService';
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

    static async onArtStationRandom(ctx: TelegrafContext) {
        const work = await artStationService.getRandomWork();

        await ctx.replyWithPhoto({
            url: work.cover.small_square_url,
            filename: 'preview'
        }, {
            caption: work.title + '\n' + work.permalink
        });
    }

    static async onRandomAnekB(ctx: TelegrafContext) {
        const http = new HttpClient({ url: 'https://baneks.ru'});
        try {
            const response = await http.get(`https://baneks.ru/${randomInteger(0, 1000)}`);
            const anekText = (response.data as string).split('<p>')[1].split('</p>')[0].replace(/<br \/>/g, '');            
            await ctx.reply(anekText);
            
        } catch (error) {
            
        }

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
    },
    {
        command: "/randstation",
        middleware: Listners.onArtStationRandom
    },
    {
        command: "/anekb",
        middleware: Listners.onRandomAnekB
    }

]