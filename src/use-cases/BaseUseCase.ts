import { MessageRepository } from './../infrastructure/repositories/MessageRepository';
import { Chat, User, Message } from 'telegraf/typings/telegram-types';
import { UserRepository } from './../infrastructure/repositories/UserRepository';
import { TelegrafContext } from 'telegraf/typings/context';


export abstract class BaseUseCase {
    protected userRepository: UserRepository;
    protected messageRepository: MessageRepository;
    
    protected ctx: TelegrafContext;
    protected user: User;
    protected chat: Chat;
    protected message: Message;

    constructor(ctx: TelegrafContext) {
        this.userRepository = new UserRepository();
        this.messageRepository = new MessageRepository();
        this.ctx = ctx;
        this.user = ctx.from;
        this.chat = ctx.chat;
        this.message = ctx.message;
    }

    public async execute(): Promise<void> {
        try {
            if (this.checkPermission()) {
                await this.messageRepository.saveMessageSource(this.message);
                await this.runLogic();
            }
        } catch (error) {
            console.error(error);
        }
    }

    protected abstract checkPermission(): boolean;
    protected abstract async runLogic(): Promise<void>;
}
