import { ShitPost } from './../../../use-cases/admin-chat/ShitPost';
import { TelegrafContext } from 'telegraf/typings/context';

import { CommandListener } from '../../../types';


export const privilegeCommands: CommandListener[] = [
    {
        command: "/shitpost",
        middleware: async (ctx: TelegrafContext) => { await (new ShitPost(ctx)).execute() }
    }
];
