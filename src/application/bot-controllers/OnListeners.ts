import { Message } from 'telegraf/typings/telegram-types';
import { messageRepository } from './../../infrastructure/repositories/MessageRepository';
import { chatRepository } from './../../infrastructure/repositories/ChatRepository';
import { userRepository } from './../../infrastructure/repositories/UserRepository';

import { TelegrafContext } from "telegraf/typings/context";
import { OnListener } from "../../types";

class Listners {
    
    static async onMessage(ctx: TelegrafContext) {

        const messageWithContext = ctx.update.message;

        await Listners.saveMessage(messageWithContext);
    }

    static async onEditMessage(ctx: TelegrafContext) {

        const messageWithContext = ctx.update.edited_message;

        await Listners.saveMessage(messageWithContext, true);
    }


    private static async saveMessage(messageWithContext: Message, edit: boolean = false) {
        const user = messageWithContext.from;
        const chat = messageWithContext.chat;
        await userRepository.save(user);
        await chatRepository.save(chat);

        const message = {
            id: messageWithContext.message_id.toString(),
            chat_id: chat.id.toString(),
            user_id: user.id.toString(),
            reply_to_message: messageWithContext.reply_to_message &&
                messageWithContext.reply_to_message.message_id.toString(),
            date: messageWithContext.date,
            sticker: !!messageWithContext.sticker,
            voice: !!messageWithContext.voice,
            photo: !!messageWithContext.photo,
            video: !!messageWithContext.video,
            edit
        }

        await messageRepository.save(message);

        console.log('MESSAGE');
        console.log({ ...message, text: messageWithContext.text });
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