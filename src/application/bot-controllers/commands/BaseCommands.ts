import { TelegrafContext } from 'telegraf/typings/context';

import { StartChatBot } from '../../../use-cases/private-chat/StartChatBot';
import { HelpCase } from '../../../use-cases/Help';
import { CommandListener } from './../../../types';

export const baseCommands: CommandListener[] = [
    {
        command: "/start",
        middleware: async (ctx: TelegrafContext) => { await (new StartChatBot(ctx)).execute(); }
    },
    {
        command: "/help",
        middleware: async (ctx: TelegrafContext) => { await (new HelpCase(ctx)).execute(); }
    }
];
