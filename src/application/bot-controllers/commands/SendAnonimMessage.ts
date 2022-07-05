import { senderRecipientMap } from './../../../components/utils/inMemoryMap';
import { bot, reply } from './../../../components/telegram-bot/TelegramBot';

import { TelegrafContext } from "telegraf/typings/context";
import { chatRepository } from '../../../infrastructure/repositories/ChatRepository';


export enum ContentType {
    PHOTO,
    VIDEO,
    STICKER,
    VOICE,
    TEXT
}

export class SendAnonimMessage {
    private ctx: TelegrafContext;

    public constructor(ctx: TelegrafContext) {
        this.ctx = ctx;
    }

    public async exec() {
        try {
            const title = this.ctx.message.text;

            const chat = await chatRepository.getByTitle(title);

            if (chat) {
                senderRecipientMap.set(this.ctx.from.username, chat.title);

                await reply(this.ctx, 'Чем будем срать?');

                return;

            } else if (this.ctx.from.username === 'virtualparticle' && this.ctx.chat.type === 'private' &&
            senderRecipientMap.get(this.ctx.from.username)) {
                const chatRecipient = await chatRepository.getByTitle(senderRecipientMap.get(this.ctx.from.username))

                if (chatRecipient) {
                    //console.log('TEST BOT', this.ctx.message);
                    try {
                        await this.proxySendMessage(chatRecipient.id, this.checkContent());
                        senderRecipientMap.set(this.ctx.from.username, null);
                        await reply(this.ctx, 'Насрано!');
                    } catch (error) {
                        await reply(this.ctx, 'Что-то пошло не так блядь');
                        console.log(error);
                    }
                } else {
                    await reply(this.ctx, `К сожалению ${senderRecipientMap.get(chat)} не доступен(а) для отправки говна`);
                }

            }
        } catch (error) {
            console.error(error);
        }


    }

    private async proxySendMessage(recipientId: string, type: ContentType) {
        const message = this.ctx.message;
        switch (type) {
            case ContentType.TEXT:
                await bot.telegram.sendMessage(
                    recipientId,
                    `${message.text}`
                );
                break;
            case ContentType.STICKER:
                await bot.telegram.sendSticker(
                    recipientId,
                    message.sticker.file_id
                );
                break;
            case ContentType.PHOTO:
                await bot.telegram.sendPhoto(recipientId, message.photo[0].file_id, {
                    caption: message.caption
                });
                break;
            case ContentType.VIDEO:
                await bot.telegram.sendVideo(recipientId, message.video.file_id, {
                    caption: message.caption
                });
                break;
            case ContentType.VOICE:
                await bot.telegram.sendVoice(recipientId, message.voice.file_id);
                break;
            default:
                break;
        }
    }

    private checkContent(): ContentType {
        if (!!this.ctx.message.text) {
            return ContentType.TEXT;
        }
        if (!!this.ctx.message.sticker) {
            return ContentType.STICKER;
        }
        if (!!this.ctx.message.voice) {
            return ContentType.VOICE;
        }
        if (!!this.ctx.message.photo) {
            return ContentType.PHOTO;
        }
        if (!!this.ctx.message.video) {
            return ContentType.VIDEO;
        }
    }

}