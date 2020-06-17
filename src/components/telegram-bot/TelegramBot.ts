import { TelegrafContext } from 'telegraf/typings/context';
import Telegraf from 'telegraf';

import { TelegramBotConfig, ConfigType, Config } from './../config';
import { CommandListener, OnListener, TextListener } from './../../types';

const botConfig = <TelegramBotConfig>Config.getInstance().getConfig(ConfigType.Telegram);

class Handlers {
    public static async handlerStart(ctx: TelegrafContext) {
       await ctx.reply('Welcome');
    }
    public static async handlerHelp(ctx: TelegrafContext) {
        await ctx.reply('Send me a sticker');
    }
} 


export type TelegramBotListeners = {
    commands: CommandListener[],
    onListeners: OnListener[],
    textListeners: TextListener
}

export function createTelegramBot(listners: TelegramBotListeners): Telegraf<TelegrafContext> {
    const bot = new Telegraf(botConfig.token);

    initHandlers(bot);
    initCommands(bot, listners.commands);
    initOnListeners(bot, listners.onListeners);
    initTextListeners(bot, listners.textListeners);

    return bot;
}

function initHandlers(bot: Telegraf<TelegrafContext>): void {
    bot.start(Handlers.handlerStart);
    bot.help(Handlers.handlerHelp);
}

function initCommands(bot: Telegraf<TelegrafContext>, commands: CommandListener[]): void {
    for (let { command, middleware } of commands) {
        bot.command(command, middleware);
    }
}

function initOnListeners(bot: Telegraf<TelegrafContext>, onListeners: OnListener[]): void {
    for (let { updateType, middleware } of onListeners) {
        bot.on(updateType, middleware);
    }
}

function initTextListeners(bot: Telegraf<TelegrafContext>, textListeners: TextListener): void {
    for (const key in textListeners) {
        bot.hears(key, textListeners[key]);
    }
}

