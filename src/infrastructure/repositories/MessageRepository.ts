
import { getRepository } from 'typeorm';
import { MessageModel } from '../models/MessageModel';
import { userRepository } from './UserRepository';
import { chatRepository } from './ChatRepository';
import { Message } from 'telegraf/typings/telegram-types';

export class MessageRepository {

    public async saveMessageSource(messageWithContext: Message) {
        try {
            const user = messageWithContext.from;
            const chat = messageWithContext.chat;
            await userRepository.save(user);
            await chatRepository.save(chat);
            
        } catch (error) {
            console.error(error);   
        }
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
