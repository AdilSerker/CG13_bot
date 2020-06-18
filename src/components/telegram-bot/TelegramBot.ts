import { TelegrafContext } from 'telegraf/typings/context';
import Telegraf from 'telegraf';

import { TelegramBotConfig, ConfigType, Config } from './../config';
import { CommandListener, OnListener, TextListener } from './../../types';

const botConfig = <TelegramBotConfig>Config.getInstance().getConfig(ConfigType.Telegram);

export const bot = new Telegraf(botConfig.token);

export type TelegramBotListeners = {
    commands: CommandListener[],
    onListeners: OnListener[],
    textListeners: TextListener[]
}

export function createTelegramBot(listners: TelegramBotListeners): Telegraf<TelegrafContext> {

    initHandlers(new Telegraf(botConfig.token));
    initCommands(new Telegraf(botConfig.token), listners.commands);
    initOnListeners(new Telegraf(botConfig.token), listners.onListeners);
    initTextListeners(new Telegraf(botConfig.token), listners.textListeners);

    return bot;
}

function initHandlers(bot: Telegraf<TelegrafContext>): void {
    bot.start(() => { console.log('START'); });
    bot.help(() => { console.log('HELP'); });
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

function initTextListeners(bot: Telegraf<TelegrafContext>, textListeners: TextListener[]): void {
    for (let { match, middleware } of textListeners) {
        bot.hears(match, middleware);
    }
}

