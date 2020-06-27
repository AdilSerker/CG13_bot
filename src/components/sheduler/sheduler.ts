import * as cron from 'node-cron';

import { bot } from '../telegram-bot/TelegramBot';

import { artStationService } from '../../infrastructure/services/ArtStationService';

cron.schedule('* 9,21 * * *', async () => {
    const work = await artStationService.getRandomWork();
    // await bot.telegram.sendPhoto('-1001361040825',{
    //     url: work.cover.small_square_url,
    //     filename: 'preview'
    // }, {
    //     caption: work.title + '\n' + work.permalink
    // });
});