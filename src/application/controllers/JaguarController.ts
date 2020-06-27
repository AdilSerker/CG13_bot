import { JaguarStatModel } from './../../infrastructure/models/JaguarStatModel';
import { plainToClass } from 'class-transformer';
import { JsonController, Post, Body, Get, OnUndefined } from "routing-controllers";
import { jaguarStatRepository } from "../../infrastructure/repositories/JaguarStatRepository";

@JsonController('/jaguar')
export class Controller {
    @Get('/check')
    public async check(): Promise<number> {
        return 1;
    }

    @OnUndefined(204)
    @Post('/')
    public async saveStat(
        @Body() stat: {
            name: string,
            try_count: number,
            time: string
        }
    ) : Promise<void> {
        await jaguarStatRepository.save(plainToClass(JaguarStatModel, stat));
    }

    @Get('/')
    public async getLeaderBoard() {
        const list = await jaguarStatRepository.get();

        const sortedByTryCount = list.sort((a, b) => a.try_count - b.try_count);

        return {
            stats: sortedByTryCount
        }
    }
}