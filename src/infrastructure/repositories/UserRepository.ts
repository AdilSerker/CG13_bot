import { plainToClass } from 'class-transformer';
import { getRepository } from 'typeorm';
import { UserModel } from '../models/UserModel';
import { User } from 'telegraf/typings/telegram-types';

class UserRepository {
    public async get(id: number): Promise<UserModel> {
        let user;
        if (id) {
            user = await getRepository(UserModel).findOne(id);
        } else {
            throw new Error(`user not found`);
        }

        return user;
    }

    public async save({ id, ...data }: User): Promise<void> {

        const userModel = await getRepository(UserModel).save({ id: id.toString(), ...data });

    }

    public async delete(id: number): Promise<void> {
        await getRepository(UserModel).delete(id);
    }

}

export const userRepository = new UserRepository();
