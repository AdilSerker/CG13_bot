import { TelegrafContext } from 'telegraf/typings/context';
import Telegraf from 'telegraf';

import { TelegramBotConfig, ConfigType, Config } from './../config';
import { CommandListener, OnListener, TextListener } from './../../types';
import { InputFile, ExtraPhoto } from 'telegraf/typings/telegram-types';

const botConfig = <TelegramBotConfig>Config.getInstance().getConfig(ConfigType.Telegram);

export const bot = new Telegraf(botConfig.token);

export type TelegramBotListeners = {
    commands: CommandListener[],
    onListeners: OnListener[],
    textListeners: TextListener[]
}

export function createTelegramBot(listners: TelegramBotListeners): Telegraf<TelegrafContext> {

    initCommands(bot, listners.commands);
    initTextListeners(bot, listners.textListeners);
    initOnListeners(bot, listners.onListeners);

    return bot;
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

export const reply = async (ctx: TelegrafContext, text: string): Promise<void> => {
    try {
        await ctx.reply(text);
    } catch (error) {
        console.error(error)
    }
}

export const replyWithPhoto = async (ctx: TelegrafContext, photo: InputFile, extra?: ExtraPhoto): Promise<void> => {
    try {
        await ctx.replyWithPhoto(photo, extra);
    } catch (error) {
        console.error(error)
    }
}

