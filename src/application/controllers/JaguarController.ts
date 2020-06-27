import { JaguarStatModel } from './../../infrastructure/models/JaguarStatModel';
import { plainToClass } from 'class-transformer';
import { JsonController, Post, Body, Get, OnUndefined } from "routing-controllers";
import { jaguarStatRepository } from "../../infrastructure/repositories/JaguarStatRepository";
import { formatTimeStringToSeconds, formatSecondsToTimeString } from '../../components/utils/formatString';

type StatSeconds = {
    time: number;
    id: number;
    name: string;
    try_count: number;
};

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
        const listWithTimeInSeconds = list.map(({ time, ...data }) => {
            return {
                ...data,
                time: formatTimeStringToSeconds(time)
            }
        });

        const sortedByTryCount = listWithTimeInSeconds.sort((a, b) => a.try_count - b.try_count);

        const mapStateByTryCount = sortedByTryCount.reduce((aggr, item) => {
            if (!aggr.get(item.try_count)) {
                aggr.set(item.try_count, []);
            } else {
                aggr.set(item.try_count, [...aggr.get(item.try_count), item])
            }
            return aggr;
        }, new Map<number, StatSeconds[]>());

        const sortedList: StatSeconds[] = [];

        for (const [, value] of mapStateByTryCount) {
            sortedList.push(...value.sort((a, b) => a.time - b.time));
        }

        console.log({
            stats: sortedList.map(({ time, ...data }) => {
                return {
                    ...data,
                    time: formatSecondsToTimeString(time)
                }
            })
        });

        return {
            stats: sortedList.map(({ time, ...data }) => {
                return {
                    ...data,
                    time: formatSecondsToTimeString(time)
                }
            })
        }
    }
}