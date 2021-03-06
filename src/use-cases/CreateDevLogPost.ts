import { SubscriberRepository } from '../infrastructure/repositories/SubscriberRepository';

import { DevLogRepository } from '../infrastructure/repositories/DevLogRepository';

import { CreateDevLogPostParams, DevLogPost, FileType } from '../domain/dev-log-post/DevLogPost';
import { DevLogFactory } from '../infrastructure/factories/DevLogPostFactory';
import { sendPost } from './../components/telegram-bot/TelegramBot';

export class CreateDevLogPost {
    private devLogRepository: DevLogRepository;
    private createPostParams: CreateDevLogPostParams;
    private subscriberRepository: SubscriberRepository;

    public constructor(params: CreateDevLogPostParams) {
        this.devLogRepository = new DevLogRepository();
        this.subscriberRepository = new SubscriberRepository();

        this.createPostParams = params;
    }

    public async execute(): Promise<void> {
        let post = await this.devLogRepository.save(DevLogFactory.create(this.createPostParams));
        
        const subscribers = await (await this.subscriberRepository.getList());

        await Promise.all(subscribers.map(sub => sendPost(sub.user_id, post)));
    }

}
