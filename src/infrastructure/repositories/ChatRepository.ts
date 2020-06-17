import { plainToClass } from 'class-transformer';
import { getRepository } from 'typeorm';
import { ChatModel } from '../models/ChatModel';
import { Chat } from 'telegraf/typings/telegram-types';

class ChatRepository {
    public async get(id: number): Promise<Chat> {
        let chat;
        if (id) {
            chat = await getRepository(ChatModel).findOne(id);
        } else {
            throw new Error(`chat not found`);
        }

        return chat;
    }

    public async save(chat: Chat): Promise<Chat> {
        const chatModel = await getRepository(ChatModel).save(chat);
        
        return chatModel;
    }

    public async delete(id: number): Promise<void> {
        await getRepository(ChatModel).delete(id);
    }

}

export const chatRepository = new ChatRepository();
