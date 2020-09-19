import { plainToClass } from 'class-transformer';
import { getRepository } from 'typeorm';

import { DevLogPost } from './../../domain/dev-log-post/DevLogPost';
import { DevLogFactory } from './../factories/DevLogPostFactory';
import { DevLogModel } from './../models/DevLogModel';

export type DevLogQueryParams = {
    id?: number,
    tags?: string[],
}

export class DevLogRepository {
    private get repository() {
        return getRepository(DevLogModel);
    }

    public async get(query: DevLogQueryParams = {}): Promise<DevLogPost[]> {
        const allposts = await this.repository.find();

        const filteredPosts = query.id || query.tags ? allposts.filter(post => {
            return post.id === query.id || (query.tags.reduce((match: boolean, item) => {
                return post.tags.includes(item) ? true : match;
            }, false));
        }) : allposts;

        return filteredPosts.map(item => DevLogFactory.createFromModel(item));
    }

    public async save(post: DevLogPost): Promise<DevLogPost> {
        const { id, title, text, tags, fileId, fileType } = post;

        const modelPost = await this.repository.save(plainToClass(DevLogModel, {
            id,
            title,
            text,
            tags: tags.join(','),
            file_id: fileId,
            file_type: fileType,
            create_time: new Date()
        }));

        return DevLogFactory.createFromModel(modelPost);
    }
}