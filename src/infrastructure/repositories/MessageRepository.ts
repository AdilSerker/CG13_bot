
import { getRepository } from 'typeorm';
import { MessageModel } from '../models/MessageModel';

class MessageRepository {

    public async save(message: MessageModel): Promise<void> {
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
