import { bashOrgService } from './../../../infrastructure/services/BashOrgService';
import { anekService } from '../../../infrastructure/services/AnekBService';
import { TelegrafContext } from "telegraf/typings/context";
import { reply, replyWithPhoto } from './../../../components/telegram-bot/TelegramBot';
import { artStationService } from '../../../infrastructure/services/ArtStationService';
import { CommandListener } from '../../../types';
import { randomInteger } from "../../../components/utils/randomize";

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
    static async onRollDigits(ctx: TelegrafContext) {

        let rand = randomInteger(0, 10);

        await reply(ctx, 'Держи ' + rand);
    }

    static async onRollYesOrNo(ctx: TelegrafContext) {

        let rand = randomInteger(0, 1);

        await reply(ctx, (rand > 0 ? 'Да': 'Нет') + ' ' + BAD_WORDS[randomInteger(0, BAD_WORDS.length - 1)]);
    }

    static async onArtStationRandom(ctx: TelegrafContext) {
        const work = await artStationService.getRandomWork();

        await replyWithPhoto(ctx, {
            url: work.cover.small_square_url,
            filename: 'preview'
        }, {
            caption: work.title + '\n' + work.permalink
        });
    }

    static async onRandomAnekB(ctx: TelegrafContext) {
        try {
            const anekText = await anekService.getRandomAnek(`${ctx.chat.id}`);
            await reply(ctx, anekText);
        } catch (error) {
            
        }
    }

    static async onRandomBashOrg(ctx: TelegrafContext) {
        try {
            const text = await bashOrgService.getRandomBashOrg();
            await reply(ctx, text);
        } catch (error) {
            
        }
    }

    static async onIdeas(ctx: TelegrafContext) {
        await reply(ctx, 'https://docs.google.com/spreadsheets/d/13NG5aS4Tdcrqqmbm4z-cK8O-P7AlNDNHfG6Y7F0wm6Q/edit?usp=sharing');
    }
}

export const chatCommands: CommandListener[] = [
    {
        command: "/rn",
        middleware: Listners.onRollDigits
    },
    {
        command: "/yn",
        middleware: Listners.onRollYesOrNo
    },
    {
        command: "/rs",
        middleware: Listners.onArtStationRandom
    },
    {
        command: "/ab",
        middleware: Listners.onRandomAnekB
    },
    {
        command: "/bo",
        middleware: Listners.onRandomBashOrg
    },
    {
        command: "/ideas",
        middleware: Listners.onIdeas
    }
]