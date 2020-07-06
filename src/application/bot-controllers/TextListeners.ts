import { TelegrafContext } from "telegraf/typings/context";
import { TextListener } from "../../types";
import { randomInteger } from "../../components/utils/randomize";

import { messageRepository } from './../../infrastructure/repositories/MessageRepository';

const AGGRESSIVE_REPLAY = [
    'анус себе забань пес',
    'CЛЫШЬ ТЕ ВЪЕБАТЬ?!',
    'зачем ты меня расстраиваешь сука',
    'правильно, он вроде еще и блендераст',
    'еще обоссать потом',
    'можно еще пару максеров захватить',
    'осуждаю',
    'одобряю эту идею',
    'давай лучше отпиздим',
    'Я тебе щас баном по губам повожу'
];

const WEED_REPLAY = [
    'есть че?',
    'когда легалайз?',
    'псс, пыхнуть хотите?',
    '4:20',
    'уже приколотил в штакет'
];

const ANSWERS_3DSOFT = [
    'а как какать?',
    'есть один курс, могу ссылочку с персии продать, за символические 70$'
];

const TUTOR_REPLAY = [
    'А срать ты тоже по туторам училс?',
    'Быть тупым кожаным мешком твое призвание',
    'Биологическая форма жизни обречена на провал',
    'Я бы посоветовал не останавливаться в накапливании всевозможных туториалов. Чем больше туториалов тем лучше.\nОдин купленный тутор сразу +10 к iq. \nНе останавливайся на достигнутом мешок'
];

const BLENDER_REPLAY = [
    'Я тебе щас колено прострелю!'
];

const DISCORD_REPLAY = [
    'Будешь показывать болт?'
];

const AUE_REPLAY = [
    'ЖИЗНЬ ПЛЮСАМ, СМЕРТЬ ШАРПАМ'
];

class Listners {
    static async matchBan(ctx: TelegrafContext) {
        messageRepository.saveMessage(ctx.update.message);

        const randomInt = randomInteger(0, 100);

        if (randomInt > 50) {
            const lastIdx = AGGRESSIVE_REPLAY.length - 1;
            await ctx.reply(AGGRESSIVE_REPLAY[randomInteger(0, lastIdx)]);
        }
    }

    static async matchLough(ctx: TelegrafContext) {
        messageRepository.saveMessage(ctx.update.message);

        const randomInt = randomInteger(0, 100);

        if (randomInt > 70) {
            await ctx.reply('ПХАХАХАХАХАХП');
        }
    }

    static async matchSecret(ctx: TelegrafContext) {
        await ctx.reply('н҉̢̖͕͙͙̳͕͕̲͙̱̰͔͕͈е̵̨̜͓̦͖̙̖̜͎̱͍ с҉̢̭̝͍̱̥̮͕̯̲̩ͅт̶̡̜͕͔̗̟͖̩͕о̶̦͚̣̫͍͍̮̭͖̳͍̠͢и̴̳̬͕͙̘̖͉̭̥͓̳͉͔̫̭͢ͅт҈͔̮̦͎̗̳̬̤̳͓̭̜͎̖̟͢' + ' ' + 'в҈͙̯͉̮̯͐̀̋̋̿͊̐̌̃с҈̞̬͉̩̱͙̜̱̿̓͐͋̚ͅк҈̣̦̤͎̠͕̠͔̭̠̪̀́̐̂͑͌͂͂р̵̠̖̞̘͈̟̙̗̃̅̆̒̿̀̇̍̚ы̶̤̝͕͇̞͓͛͐̂̓̉̔в̴̯̘̱̟̞̮͉̦͙͑́̅́̂̋͛̽а̷͈̝̗̬͍̒̋̄͌̓̽͌ͅͅͅт҉͖̟̳̭̝̠̣̎̎͂͊͆̓ь̷̗̮̬̮̓͑̂́̈́̆̈́ͅ');
    }

    static async matchQuestion(ctx: TelegrafContext) {
        if (randomInteger(0, 100) > 50) {
            await ctx.reply(ANSWERS_3DSOFT[randomInteger(0, ANSWERS_3DSOFT.length - 1)]);
        }
    }

    static async matchBake(ctx: TelegrafContext) {
        if (randomInteger(0, 100) > 50) {
            await ctx.reply('Анус себе запеки!');
        }
    }

    static async matchWeed(ctx: TelegrafContext) {
        if (randomInteger(0, 100) > 90 || randomInteger(0, 100) > 50 && ctx.update.message.from.id === 230392366) {
            await ctx.reply(WEED_REPLAY[randomInteger(0, WEED_REPLAY.length - 1)]);
        }
    }

    static async matchTutor(ctx: TelegrafContext) {
        if (randomInteger(0, 100) > 70 || randomInteger(0, 100) > 50 && ctx.update.message.from.id === 341554801) {
            await ctx.reply(TUTOR_REPLAY[randomInteger(0, TUTOR_REPLAY.length - 1)]);
        }
    }

    static async matchBlender(ctx: TelegrafContext) {
        if (randomInteger(0, 100) > 70) {
            await ctx.reply(BLENDER_REPLAY[randomInteger(0, BLENDER_REPLAY.length - 1)]);
        }
    }

    static async matchDiscord(ctx: TelegrafContext) {
        if (randomInteger(0, 100) > 90) {
            await ctx.reply(DISCORD_REPLAY[randomInteger(0, DISCORD_REPLAY.length - 1)]);
        }
    }

    static async matchAye(ctx: TelegrafContext) {
        if (randomInteger(0, 100) > 70) {
            await ctx.reply(AUE_REPLAY[randomInteger(0, AUE_REPLAY.length - 1)]);
        }
    }

    static async matchYes(ctx: TelegrafContext) {
        if (randomInteger(0, 100) > 98) {
            await ctx.reply('хуй НА!!');
        }
    }

    static async matchNo(ctx: TelegrafContext) {
        if (randomInteger(0, 100) > 98) {
            await ctx.reply('Пидора ответ! 😎');
        }
    }

    static async matchWhat(ctx: TelegrafContext) {
        if (randomInteger(0, 100) > 98) {
            await ctx.reply('хуй в');
            await ctx.reply('О');
            await ctx.reply('Ч');
            await ctx.reply('О');
        }
    }
}

export const textListeners: TextListener[] = [
    {
        match: ['бан', 'Бан', ',fy'],
        middleware: Listners.matchBan
    },
    {
        match: [/ban/i, /забан/i, /баним/i],
        middleware: Listners.matchBan
    },
    {
        match: [/(как.*запечь)/i, /запек/i, /бейк/i],
        middleware: Listners.matchBake
    },
    {
        match: [/тутор/i, /урок/i, /курс/i],
        middleware: Listners.matchTutor
    },
    {
        match: [/ахаха/i],
        middleware: Listners.matchLough
    },
    {
        match: [/в праг/i,/чехи/i,/Прага/i,],
        middleware: Listners.matchWeed
    },
    {
        match: [/(как.*делать)/i, /(как.*сделать)/i, /(как.*замоделить)/i, /(как.*в майе)/i, /(как.*в зебре)/i],
        middleware: Listners.matchQuestion
    },
    {
        match: [/blender/i, /блендер/i],
        middleware: Listners.matchBlender
    },
    {
        match: [/(пойдем.в диск*)/i, /(го.в диск*)/i, /(в диск.?)/i],
        middleware: Listners.matchDiscord
    },
    {
        match: [/( ауе)/i, /(ауе )/i],
        middleware: Listners.matchAye
    },
    {
        match: ['ауе', 'Ауе', 'АУЕ'],
        middleware: Listners.matchAye
    },
    {
        match: ['да', 'Да', 'ДА'],
        middleware: Listners.matchYes
    },
    {
        match: ['нет', 'Нет', 'НЕТ'],
        middleware: Listners.matchNo
    },
    {
        match: ['че', 'Че', 'ЧЕ', 'чо', 'Чо', 'ЧО',],
        middleware: Listners.matchWhat
    }
];