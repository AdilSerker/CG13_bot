import { CreateDevLogPostParams, DevLogPost } from "../../domain/dev-log-post/DevLogPost";
import { DevLogModel } from "../models/DevLogModel";

export class DevLogFactory {
    public static create(params: CreateDevLogPostParams): DevLogPost {
        return new DevLogPost(params);
    }

    public static createFromModel(model: DevLogModel): DevLogPost {
        const { id, title, text } = model;

        const tags = model.tags.split(',');
        const fileId = model.file_id;

        return new DevLogPost({ id, title, text, tags, fileId });
    }
}