import { SendAnonimMessage } from './commands/SendAnonimMessage';
import { TelegrafContext } from "telegraf/typings/context";

import { OnListener } from "../../types";
import { messageRepository } from '../../infrastructure/repositories/MessageRepository';

import { CreatePost } from '../../use-cases/admin-chat/CreatePost';


class Listners {
    
    static async onMessage(ctx: TelegrafContext) {
        //await messageRepository.saveMessageSource(ctx.update.message);
        
        await (new CreatePost(ctx)).execute();

        await (new SendAnonimMessage(ctx).exec());

        // console.log({ 
        //     chat: ctx.chat.title,
        //     from: { username: ctx.from.username, name: ctx.from.first_name }, 
        //     message: ctx.message.text 
        // });
    }

    static async onEditMessage(ctx: TelegrafContext) {
        //await messageRepository.saveMessageSource(ctx.update.edited_message);
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