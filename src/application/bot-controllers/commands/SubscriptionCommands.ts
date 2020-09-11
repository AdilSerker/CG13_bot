import { TelegrafContext } from 'telegraf/typings/context';

import { CommandListener } from './../../../types';
import { DevLogSubscription } from './../../../use-cases/private-chat/DevLogSubscription';


export const subscriptionCommands: CommandListener[] = [
    {
        command: "/devlog",
        middleware: async (ctx: TelegrafContext) => { await (new DevLogSubscription(ctx)).execute() }
    },
    {
        command: "/getbuild",
        middleware: async (ctx: TelegrafContext) => { }
    }
];
