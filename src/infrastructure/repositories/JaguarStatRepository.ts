import { plainToClass } from 'class-transformer';
import { getRepository } from 'typeorm';
import { JaguarStatModel } from '../models/JaguarStatModel';

class JaguarStatRepository {
    public async get(): Promise<JaguarStatModel[]> {

        return getRepository(JaguarStatModel).find();
    }

    public async save(stat: JaguarStatModel): Promise<void> {
        await getRepository(JaguarStatModel).save(stat);
        
    }

    public async delete(id: number): Promise<void> {
        await getRepository(JaguarStatModel).delete(id);
    }

}

export const jaguarStatRepository = new JaguarStatRepository();
