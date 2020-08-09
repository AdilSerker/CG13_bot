import { TelegrafContext } from "telegraf/typings/context";

import { OnListener } from "../../types";
import { messageRepository } from './../../infrastructure/repositories/MessageRepository';
import { randomInteger } from "../../components/utils/randomize";
import { bot } from "../../components/telegram-bot/TelegramBot";


class Listners {
    
    static async onMessage(ctx: TelegrafContext) {

        const messageWithContext = ctx.update.message;

        await messageRepository.saveMessage(messageWithContext);

        if (ctx.update.message.text) {
            await Listners.replayConcrete(ctx);
        }

        if (ctx.update.message.from.id === 341554801) {
            const indexSubstr = ctx.message.text ? 
                ctx.message.text.search(/http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/i) :
                -1;

            if (ctx.update.message.video || indexSubstr != -1) {

                ctx.deleteMessage(ctx.message.message_id);

                if (randomInteger(0, 100) > 70) {
                    ctx.reply('эй тиктокер, клуб любителей зумерских мемов двумя этажами выше');
                }
            }
        }

    }

    private static async replayConcrete(ctx: TelegrafContext) {
        let punctuationless = ctx.update.message.text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ' ');
        let finalString = punctuationless.replace(/\s{2,}/g, ' ');
        let concreteWord = finalString.split(' ');
        if (concreteWord.length === 1 && randomInteger(0, 100) > 90) {
            await ctx.reply(Listners.concrete(concreteWord[0].toLowerCase()));
        }
    }

    static async onEditMessage(ctx: TelegrafContext) {

        const messageWithContext = ctx.update.edited_message;

        await messageRepository.saveMessage(messageWithContext, true);


        if (ctx.update.edited_message.from.id === 341554801) {
            const indexSubstr = ctx.update.edited_message.text ? 
                ctx.update.edited_message.text.search(/http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/i) :
                -1;

            if (ctx.update.edited_message.video || indexSubstr != -1) {

                ctx.deleteMessage(ctx.update.edited_message.message_id);

                if (randomInteger(0, 100) > 70) {
                    ctx.reply('эй тиктокер, клуб любителей зумерских мемов двумя этажами выше');
                }
            }
        }
    }

    private static concrete(text: string): string {
  
        for (let i = 0; i < text.length; ++i) {
            if (text[i] === 'а' || text[i] === 'я') {
                return 'Xyя' + '' + text.slice(i+1) + '!1';
            }
            if (text[i] === 'э' || text[i] === 'е') {
                return 'Xyе' + '' + text.slice(i+1) + '!!1';
            }
            if (text[i] === 'у' || text[i] === 'ю') {
                return 'Xyю' + '' + text.slice(i+1) + '!!1';
            }
            if (text[i] === 'о' || text[i] === 'е') {
                return 'Xyё' + '' + text.slice(i+1) + '!11';
            }
            if (text[i] === 'ы' || text[i] === 'и') {
                return 'Xyи' + '' + text.slice(i+1) + '!11';
            }
        }
        return 'Xyй1';
    }

}

export const onListeners: OnListener[] = [
    {
        updateType: ["sticker", "voice", "video", "photo", "text"],
        middleware: Listners.onMessage
    },
    {
        updateType: "edited_message",
        middleware: Listners.onEditMessage
    },
    {
        updateType: "message",
        middleware: Listners.onMessage
    }
]