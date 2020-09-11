import { Chat, User, Message } from 'telegraf/typings/telegram-types';
import { UserRepository } from './../infrastructure/repositories/UserRepository';
import { TelegrafContext } from 'telegraf/typings/context';


export abstract class BaseUseCase {
    protected userRepository: UserRepository;

    protected ctx: TelegrafContext;
    protected user: User;
    protected chat: Chat;
    protected message: Message;

    constructor(ctx: TelegrafContext) {
        this.userRepository = new UserRepository();
        
        this.ctx = ctx;
        this.user = ctx.from;
        this.chat = ctx.chat;
        this.message = ctx.message;
    }

    public abstract async execute(): Promise<void>;
}
