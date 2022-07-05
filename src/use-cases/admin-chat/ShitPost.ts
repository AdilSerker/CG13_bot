import { reply } from './../../components/telegram-bot/TelegramBot';
import { chatRepository } from './../../infrastructure/repositories/ChatRepository';
import { TelegrafContext } from 'telegraf/typings/context';

import { BasePrivateChatUseCase } from "../private-chat/BasePrivateChatUseCase";
import { Markup } from 'telegraf';

export class ShitPost extends BasePrivateChatUseCase {

    constructor(ctx: TelegrafContext) {
        super(ctx);
    }

    protected async runLogic() {
        const chats = await chatRepository.getList({ type: 'supergroup' });

        const chatNames = chats.map(item => item.title)
        await reply(this.ctx, 'Куда будем срать', {
            reply_markup: Markup.keyboard(this.createColumn(chatNames)).oneTime().resize()
        });
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