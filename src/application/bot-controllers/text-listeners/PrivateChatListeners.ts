
import { TelegrafContext } from "telegraf/typings/context";
import { TextListener } from "../../../types";

export const privateChatListeners: TextListener[] = [
    {
        match: [/@devlog/i],
        middleware: async (ctx: TelegrafContext) => { console.log(ctx.message); } 
    },
    {
        match: [/ban/i, /забан/i, /баним/i],
        middleware: async (ctx: TelegrafContext) => {  } 
    },

];