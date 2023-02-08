import { ShitPost } from '../../../use-cases/admin-chat/ShitPost';
import { TelegrafContext } from 'telegraf/typings/context';

import { CommandListener } from '../../../types';
import {SavePrePromptForChat} from "../../../use-cases/admin-chat/SavePrePromptForChat";


export const privilegeCommands: CommandListener[] = [
    {
        command: "/shitpost",
        middleware: async (ctx: TelegrafContext) => { await (new ShitPost(ctx)).execute() }
    },
    {
        command: "/setpreprompt",
        middleware: async (ctx: TelegrafContext) => { await (new SavePrePromptForChat(ctx)).execute() }
    }
];
