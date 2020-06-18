
import { getRepository } from 'typeorm';
import { MessageModel } from '../models/MessageModel';
import { userRepository } from './UserRepository';
import { chatRepository } from './ChatRepository';
import { Message } from 'telegraf/typings/telegram-types';

class MessageRepository {

    public async saveMessage(messageWithContext: Message, edit: boolean = false) {
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

    private async save(message: MessageModel): Promise<void> {
        const mess = await getRepository(MessageModel).findOne(message.id);

        if (mess) {
            await getRepository(MessageModel).update(message.id, message);
        } else {
            await getRepository(MessageModel).save(message);
        }
;
    }

}

export const messageRepository = new MessageRepository();
