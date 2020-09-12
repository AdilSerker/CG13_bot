import { TelegrafContext } from 'telegraf/typings/context';
import { MessageRepository, messageRepository } from '../../infrastructure/repositories/MessageRepository';
import { BaseUseCase } from "../BaseUseCase";

export abstract class BaseGroupChatUseCase extends BaseUseCase {

    protected checkPermission(): boolean {
        return this.chat.type === 'group' || this.chat.type === 'supergroup';
    }


}