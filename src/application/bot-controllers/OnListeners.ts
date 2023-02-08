import {StageProcessing} from './commands/StageProcessing';
import {TelegrafContext} from "telegraf/typings/context";

import {OnListener} from "../../types";

import {CreatePost} from '../../use-cases/admin-chat/CreatePost';
import {ChatGPT} from "./commands/ChatGPT";


class Listeners {

    static async onMessage(ctx: TelegrafContext) {
        await (new CreatePost(ctx)).execute();
        await (new StageProcessing(ctx).exec());

        try {
            if (ctx.update.message.reply_to_message &&
                ctx.update.message.reply_to_message.from.username === 'cg_13_bot') {

                await (new ChatGPT(ctx).exec(true))
            }
        } catch (e) {
            console.error(e);
        }

        /*console.log({
            chat: ctx.chat,
            from: {username: ctx.from.username, name: ctx.from.first_name},
            message: ctx.message.text,
            reply_to_message: ctx.update.message && ctx.update.message.reply_to_message
        });*/

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