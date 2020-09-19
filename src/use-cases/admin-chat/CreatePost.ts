import { TelegrafContext } from 'telegraf/typings/context';

import { BasePrivateChatUseCase } from "../private-chat/BasePrivateChatUseCase";
import { bot } from '../../components/telegram-bot/TelegramBot';
import { FileType } from '../../domain/dev-log-post/DevLogPost';
import { CreateDevLogPost } from '../CreateDevLogPost';

export class CreatePost extends BasePrivateChatUseCase {

    constructor(ctx: TelegrafContext) {
        super(ctx);
    }

    protected async runLogic() {
        if (this.isDevLog()) {

            let { fileId, fileType } = this.getFileData()
            let [title, text, tags] = this.getPostData(fileType);

            const postPublisher = new CreateDevLogPost({
                title,
                text,
                tags: tags.split(' '),
                fileId,
                fileType,
            });

            await postPublisher.execute();
        }

    }

    protected checkPermission(): boolean {
        return this.chat.type === 'private' && this.chat.username === 'virtualparticle';
    }

    protected isDevLog() {
        return (this.ctx.message.text && this.ctx.message.text.indexOf('@devlog') === 0) ||
            (this.ctx.message.caption && this.ctx.message.caption.indexOf('@devlog') === 0);
    }

    protected getFileType(): FileType {
        if (this.ctx.message.photo) {
            return FileType.Photo;
        }
        if (this.ctx.message.animation) {
            return FileType.Animation;
        }
        if (this.ctx.message.video) {
            return FileType.Video;
        }
        if (this.ctx.message.document) {
            return FileType.Document;
        }

        return undefined;
    }

    protected getPostData(fileType: FileType): string[] {
        return !fileType ? 
            this.ctx.message.text.split('\n\n').slice(1).filter(item => item) :
            this.ctx.message.caption.split('\n\n').slice(1).filter(item => item);
    }

    protected getFileData(): { fileId: string, fileType: FileType } {
        const fileType = this.getFileType();
        let fileId;
        switch (fileType) {
            case FileType.Photo:
                fileId = this.ctx.message.photo[1].file_id;
                break;
            case FileType.Animation:
                fileId = this.ctx.message.animation.file_id;
                break;
            case FileType.Video:
                fileId = this.ctx.message.video.file_id;
                break;
            case FileType.Document:
                fileId = this.ctx.message.document.file_id;
                break;
            default:
                break;
        }
        return { fileId, fileType };
    }

}