import { UpdateType, MessageSubTypes } from "telegraf/typings/telegram-types";
import { Middleware } from "telegraf";
import { TelegrafContext } from "telegraf/typings/context";
import { OnListener } from "../../types";

class Listners {
    static async onMessage(ctx: TelegrafContext) {
        await ctx.reply('check console');

        const { from, chat, text } = ctx.update.message;

        const getChat = await ctx.getChat();

        const chatMemebet = await ctx.getChatMember(from.id);

        console.log('FROM', from);
        console.log('chat', chat);
        console.log('getChat', getChat);

        console.log('textMessage', text);

        console.log('sender chat member', chatMemebet)
    }
}

export const onListeners: OnListener[] = [
    {
        updateType: "message",
        middleware: Listners.onMessage
    },

]