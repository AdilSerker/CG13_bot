import { SendAnonimMessage } from './commands/SendAnonimMessage';
import { TelegrafContext } from "telegraf/typings/context";

import { OnListener } from "../../types";
import { messageRepository } from '../../infrastructure/repositories/MessageRepository';

import { CreatePost } from '../../use-cases/admin-chat/CreatePost';
import {ChatGPT} from "./commands/ChatGPT";


class Listeners {

    static async onMessage(ctx: TelegrafContext) {
        //await messageRepository.saveMessageSource(ctx.update.message);

        await (new CreatePost(ctx)).execute();

        await (new SendAnonimMessage(ctx).exec());

        await (new ChatGPT(ctx).exec());

        /*console.log({
            chat: ctx.chat.title,
            from: { username: ctx.from.username, name: ctx.from.first_name },
            message: ctx.message.text
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