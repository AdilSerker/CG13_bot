import {SendAnonimMessage} from './commands/SendAnonimMessage';
import {TelegrafContext} from "telegraf/typings/context";

import {OnListener} from "../../types";

import {CreatePost} from '../../use-cases/admin-chat/CreatePost';
import {ChatGPT} from "./commands/ChatGPT";


class Listeners {

    static async onMessage(ctx: TelegrafContext) {
        //await messageRepository.saveMessageSource(ctx.update.message);

        await (new CreatePost(ctx)).execute();

        await (new SendAnonimMessage(ctx).exec());

        // console.log({
        //     chat: ctx.chat.title,
        //     from: {username: ctx.from.username, name: ctx.from.first_name},
        //     message: ctx.message.text
        // });
        try {
            if (ctx.update.message.reply_to_message.from.username === 'cg_13_bot') {
                await (new ChatGPT(ctx).exec(true))
            }
        } catch (e) {

        }

    }

    static async onEditMessage(ctx: TelegrafContext) {
        //await messageRepository.saveMessageSource(ctx.update.edited_message);
    }
}

export const onListeners: OnListener[] = [
    {
        updateType: ["sticker", "voice", "video", "photo", "text"],
        middleware: Listeners.onMessage
    },
    {
        updateType: "edited_message",
        middleware: Listeners.onEditMessage
    },
    {
        updateType: "message",
        middleware: Listeners.onMessage
    }
]