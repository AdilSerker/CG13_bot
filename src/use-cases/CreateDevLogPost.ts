import { SubscriberRepository } from '../infrastructure/repositories/SubscriberRepository';

import { DevLogRepository } from '../infrastructure/repositories/DevLogRepository';

import { CreateDevLogPostParams, DevLogPost, FileType } from '../domain/dev-log-post/DevLogPost';
import { DevLogFactory } from '../infrastructure/factories/DevLogPostFactory';
import { bot } from '../components/telegram-bot/TelegramBot';

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
        
        const subscribers = await (await this.subscriberRepository.getList())
            .filter(item => item.user_id !== '93517612');

        await Promise.all(subscribers.map(sub => this.sendPost(sub.user_id, post)));
    }

    protected async sendPost(userId: string, post: DevLogPost): Promise<void> {
        const { telegram: tg } = bot;
        const caption: string = post.getFormatedPost();
        try {
            switch (post.fileType) {
                case FileType.Photo:
                    tg.sendPhoto(userId, post.fileId, { caption });
                    break;
                case FileType.Animation:
                    tg.sendAnimation(userId, post.fileId, { caption });
                    break;
                case FileType.Video:
                    tg.sendVideo(userId, post.fileId, { caption });
                    break;
                default:
                    tg.sendMessage(userId, caption);
                    break;
            }
        } catch (error) {
            console.error(error);
        }
    }
}
