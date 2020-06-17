
import { getRepository } from 'typeorm';
import { MessageModel } from '../models/MessageModel';

class MessageRepository {

    public async save(message: MessageModel): Promise<MessageModel> {
        const messageModel = await getRepository(MessageModel).save(message);
        
        return messageModel;
    }

}

export const messageRepository = new MessageRepository();
