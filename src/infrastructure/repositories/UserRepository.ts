import { plainToClass } from 'class-transformer';
import { getRepository } from 'typeorm';
import { UserModel } from '../models/UserModel';
import { User } from 'telegraf/typings/telegram-types';

class UserRepository {
    public async get(id: number): Promise<User> {
        let user;
        if (id) {
            user = await getRepository(UserModel).findOne(id);
        } else {
            throw new Error(`user not found`);
        }

        return user;
    }

    public async save(user: User): Promise<User> {
        const userModel = await getRepository(UserModel).save(user);
        
        return userModel;
    }

    public async delete(id: number): Promise<void> {
        await getRepository(UserModel).delete(id);
    }

}

export const userRepository = new UserRepository();
