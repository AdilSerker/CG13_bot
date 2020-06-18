import { plainToClass } from 'class-transformer';
import { getRepository } from 'typeorm';
import { ChatModel } from '../models/ChatModel';
import { Chat } from 'telegraf/typings/telegram-types';

class ChatRepository {
    public async get(id: number): Promise<ChatModel> {
        let chat;
        if (id) {
            chat = await getRepository(ChatModel).findOne(id);
        } else {
            throw new Error(`chat not found`);
        }

        return chat;
    }

    public async save({ id, ...data }: Chat): Promise<void> {
        let chat = await getRepository(ChatModel).findOne(id.toString());
        
        chat ? await getRepository(ChatModel).update(id.toString(), { id: id.toString(), ...data }) :
            await getRepository(ChatModel).save({ id: id.toString(), ...data });
        
    }

    public async delete(id: number): Promise<void> {
        await getRepository(ChatModel).delete(id);
    }

}

export const chatRepository = new ChatRepository();
