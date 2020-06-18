import { TelegrafContext } from "telegraf/typings/context";
import { TextListener } from "../../types";
import { randomInteger } from "../../components/utils/randomize";

import { messageRepository } from './../../infrastructure/repositories/MessageRepository';

const AGGRESSIVE_REPLAY = [
    'анус себе забань пес',
    'скажи кого забанить и я его виебу',
    'CЛЫШЬ ТЕ ВЪЕБАТЬ?!'
];

class Listners {
    
    static async matchBan(ctx: TelegrafContext) {
        const lastIdx = AGGRESSIVE_REPLAY.length - 1;
            
        messageRepository.saveMessage(ctx.update.message);
        await ctx.reply(AGGRESSIVE_REPLAY[randomInteger(0, lastIdx)]);
    }

}

export const textListeners: TextListener[] = [
    {
        match: ['бан', 'Бан', ',fy'],
        middleware: Listners.matchBan
    }
];