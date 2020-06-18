import { messageRepository } from './../../infrastructure/repositories/MessageRepository';
import { chatRepository } from './../../infrastructure/repositories/ChatRepository';
import { userRepository } from './../../infrastructure/repositories/UserRepository';

import { TelegrafContext } from "telegraf/typings/context";
import { OnListener } from "../../types";

class Listners {
    
    static async onMessage(ctx: TelegrafContext) {

        console.log('ON MASSAGE', ctx.update.message);

        const user = ctx.update.message.from;
        const chat = ctx.update.message.chat;

        const messageWithContext = ctx.update.message;

        await userRepository.save(user);
        await chatRepository.save(chat);

        await messageRepository.save({
            id: messageWithContext.message_id.toString(),
            chat_id: chat.id,
            user_id: user.id,
            sticker: !!messageWithContext.sticker,
            voice: !!messageWithContext.voice,
            photo: !!messageWithContext.photo,
            video: !!messageWithContext.video,
            edit: false
        });
    }

    static async onEditMessage(ctx: TelegrafContext) {
        console.log('ON MASSAGE', ctx.update.edited_message);

        const user = ctx.update.edited_message.from;
        const chat = ctx.update.edited_message.chat;

        const messageWithContext = ctx.update.edited_message;

        await userRepository.save(user);
        await chatRepository.save(chat);

        await messageRepository.save({
            id: messageWithContext.message_id.toString(),
            chat_id: chat.id,
            user_id: user.id,
            date: messageWithContext.date,
            sticker: !!messageWithContext.sticker,
            voice: !!messageWithContext.voice,
            photo: !!messageWithContext.photo,
            video: !!messageWithContext.video,
            edit: true
        });
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