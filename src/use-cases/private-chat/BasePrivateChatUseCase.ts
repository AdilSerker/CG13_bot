import { TelegrafContext } from 'telegraf/typings/context';
import { MessageRepository, messageRepository } from '../../infrastructure/repositories/MessageRepository';
import { BaseUseCase } from "../BaseUseCase";

export abstract class BasePrivateChatUseCase extends BaseUseCase {
    protected messageRepository: MessageRepository;

    public constructor(ctx: TelegrafContext) {
        super(ctx);
        this.messageRepository = new MessageRepository();
    }

    public async execute(): Promise<void> {
        try {
            if (this.checkIsPrivateChat()) {
                await this.messageRepository.saveMessageSource(this.message);
                await this.runLogic();
            }
        } catch (error) {
            console.error(error);
        }
    }

    protected checkIsPrivateChat(): boolean {
        return this.chat.type !== 'group' && this.chat.type !== 'supergroup';
    }

    protected abstract async runLogic(): Promise<void>;

}