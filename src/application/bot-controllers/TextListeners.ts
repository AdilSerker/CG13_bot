import { TelegrafContext } from "telegraf/typings/context";
import { TextListener } from "../../types";
import { randomInteger } from "../../components/utils/randomize";

import { messageRepository } from './../../infrastructure/repositories/MessageRepository';

const AGGRESSIVE_REPLAY = [
    'анус себе забань пес',
    'скажи кого забанить и я его виебу',
    'CЛЫШЬ ТЕ ВЪЕБАТЬ?!',
    'зачем ты меня расстраиваешь сука',
    'правильно, он вроде еще и блендераст',
    'еще обоссать потом',
    'можно еще пару максеров захватить',
    'осуждаю',
    'одобряю эту идею',
    'давай лучше отпиздим'
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
            await ctx.reply('АХААХАХАХА');
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
        match: [/ахаха/i],
        middleware: Listners.matchLough
    }
];