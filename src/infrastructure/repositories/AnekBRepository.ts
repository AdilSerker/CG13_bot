import { getRepository } from 'typeorm';
import { AnekBModel } from '../models/AnekBModel';

class AnekBRepository {

    public async getList(): Promise<AnekBModel[]> {
        return getRepository(AnekBModel).find({ where: { is_showed: true } });
    }

    public async save(anek_id: number): Promise<void> {

        await getRepository(AnekBModel).save({ anek_id, is_showed: true });
    }

}

export const anekBRepository = new AnekBRepository();
