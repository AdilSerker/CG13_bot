import { JaguarStatModel } from './../../infrastructure/models/JaguarStatModel';
import { plainToClass } from 'class-transformer';
import { JsonController, Post, Body, Get } from "routing-controllers";
import { jaguarStatRepository } from "../../infrastructure/repositories/JaguarStatRepository";

@JsonController('/jaguar')
export class Controller {
    @Get('/check')
    public async test(): Promise<number> {
        return 1;
    }

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
}