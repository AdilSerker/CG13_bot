import { getRepository } from 'typeorm';
import { AnekBModel } from '../models/AnekBModel';

class AnekBRepository {

    public async getList(chat_id: string): Promise<AnekBModel[]> {
        return getRepository(AnekBModel).find({ where: { chat_id, is_showed: true } });
    }

    public async save(anek_id: number, chat_id: string): Promise<void> {

        await getRepository(AnekBModel).save({ anek_id, chat_id, is_showed: true });
    }

    public async deleteAll(chat_id: string): Promise<void> {
        await getRepository(AnekBModel).delete({ chat_id });
    }

}

export const anekBRepository = new AnekBRepository();
