import { TelegrafContext } from 'telegraf/typings/context';

import { UserRepository } from './../infrastructure/repositories/UserRepository';
import { DevLogRepository } from '../infrastructure/repositories/DevLogRepository';
import { BaseUseCase } from './BaseUseCase';
import { CreateDevLogPostParams } from '../domain/dev-log-post/DevLogPost';

export class CreateDevLogPost {
    protected userRepository: UserRepository;
    private devLogRepository: DevLogRepository;
    private createPostPaarams: CreateDevLogPostParams;

    public constructor(params: CreateDevLogPostParams) {
        this.devLogRepository = new DevLogRepository();
        this.userRepository = new UserRepository();

        this.createPostPaarams = params;
    }

    public async execute(): Promise<void> {

    }
}
