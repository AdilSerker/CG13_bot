export type CreateDevLogPostParams = {
    id?: number;
    title: string;
    text: string;
    tags: string[];
    fileId: string;
}

export class DevLogPost {
    public readonly id?: number;
    public readonly title: string;
    public readonly text: string;
    public readonly tags: string[];
    public readonly fileId: string;

    constructor(params: CreateDevLogPostParams) {
        const { id, title, text, tags, fileId } = params;

        this.id = id;
        this.title = title;
        this.text = text;
        this.tags = tags;
        this.fileId = fileId;
    }
}