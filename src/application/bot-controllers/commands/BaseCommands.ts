import { HelpCase } from './../../../use-cases/Help';
import { TelegrafContext } from 'telegraf/typings/context';
import { CommandListener } from './../../../types';

export const baseCommands: CommandListener[] = [
    {
        command: "/start",
        middleware: () => {}
    },
    {
        command: "/help",
        middleware: async (ctx: TelegrafContext) => { await (new HelpCase(ctx)).execute(); }
    }
];
