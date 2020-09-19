export enum FileType {
    Photo = 'photo',
    Animation = 'animation',
    Video = 'video',
    Document = 'document',
}

export type CreateDevLogPostParams = {
    id?: number;
    title: string;
    text: string;
    tags: string[];
    fileId?: string;
    fileType?: FileType;
}

export class DevLogPost {
    public readonly id?: number;
    public readonly title: string;
    public readonly text: string;
    public readonly tags: string[];
    public readonly fileId: string;
    public readonly fileType: FileType;

    public constructor(params: CreateDevLogPostParams) {
        const { id, title, text, tags, fileId, fileType } = params;

        this.id = id;
        this.title = title;
        this.text = text;
        this.tags = tags;
        this.fileId = fileId;
        this.fileType = fileType;
    }

    public getFormatedPost() {
        return `${this.title}\n\n${this.text}\n\n${this.tags.join(' ')}\n\n`;
    }
}