import { reply } from "../../components/telegram-bot/TelegramBot";
import { chatRepository } from '../../infrastructure/repositories/ChatRepository';
import { TelegrafContext } from 'telegraf/typings/context';

import { BasePrivateChatUseCase } from "../private-chat/BasePrivateChatUseCase";
import { Markup } from 'telegraf';
import {Stage} from "../../infrastructure/models/UserModel";

export class SavePrePromptForChat extends BasePrivateChatUseCase {

    constructor(ctx: TelegrafContext) {
        super(ctx);
    }

    protected async runLogic() {
        const chats = await chatRepository.getList({ types: ['supergroup', 'group'] });

        const chatNames = chats.map(item => item.title);
        await reply(this.ctx, 'Выбери чат для сохранения промпта', {
            reply_markup: Markup.keyboard(this.createColumn(chatNames)).oneTime().resize()
        });

        const user = await this.userRepository.get(this.ctx.from.id);
        user.stage = Stage.SetPrePrompt;
        const { id, ...userData } = user;
        await this.userRepository.save({id: Number(user.id), ...userData});
    }

    protected checkPermission(): boolean {
        return this.chat.type === 'private' && this.chat.username === 'virtualparticle';
    }

    private createColumn(buttons: string[]): string[][] {
        let result: string[][] = [];
        
        let tempResult: string[] = []
        for (let i = 0; i < buttons.length; i++) {
            tempResult.push(buttons[i])
            if (tempResult.length > 1 || i == buttons.length - 1) {
                result.push([...tempResult]);
                tempResult = [];
            }
        }

        return result;
    }

}