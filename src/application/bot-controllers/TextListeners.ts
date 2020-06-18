import { TelegrafContext } from "telegraf/typings/context";
import { TextListener } from "../../types";
import { randomInteger } from "../../components/utils/randomize";

const AGGRESSIVE_REPLAY = [
    'анус себе забань пес',
    'скажи кого забанить и я его виебу',
    'CЛЫШЬ ТЕ ВЪЕБАТЬ?!'
]

export const textListeners: TextListener[] = [
    {
        match: 'бан',
        middleware: async (ctx: TelegrafContext) => {
            // await ctx.reply('Welcome');
            const lastIdx = AGGRESSIVE_REPLAY.length - 1;
            
            console.log(AGGRESSIVE_REPLAY[randomInteger(0, lastIdx)]);
        }
    }
];