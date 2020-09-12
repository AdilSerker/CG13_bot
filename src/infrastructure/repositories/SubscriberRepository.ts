import { getRepository } from 'typeorm';
import { SubscriberModel } from '../models/SubscriberModel';

export class SubscriberRepository {
    public async getByUserId(user_id: string): Promise<SubscriberModel> {
        return getRepository(SubscriberModel).findOne({ where: { user_id } });
    }

    public async getList(): Promise<SubscriberModel[]> {
        return getRepository(SubscriberModel).find({ where: { dev_log: true } });
    }

    public async save(user_id: string, dev_log: boolean): Promise<void> {
        let sub = await getRepository(SubscriberModel).findOne({ where: { user_id } });
        if (sub) {
            await getRepository(SubscriberModel).update(sub.id, { dev_log });
        } else {
            await getRepository(SubscriberModel).save({ user_id, dev_log });
        }
    }

}

export const subscriberRepository = new SubscriberRepository();
