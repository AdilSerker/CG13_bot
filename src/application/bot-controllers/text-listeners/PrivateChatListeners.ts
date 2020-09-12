import { TelegrafContext } from "telegraf/typings/context";

import { TextListener } from "../../../types";
import { CreatePost } from '../../../use-cases/admin-chat/CreatePost';

export const privateChatListeners: TextListener[] = [
    {
        match: [/@devlog/i],
        middleware: async (ctx: TelegrafContext) => { await (new CreatePost(ctx)).execute(); } 
    },
    {
        match: [/ban/i, /забан/i, /баним/i],
        middleware: async (ctx: TelegrafContext) => {  } 
    },

];