import { Telegraf } from 'telegraf';

import { Config, ConfigType, TelegramBotConfig } from "./../components/config";

const botConfig = <TelegramBotConfig>Config.getInstance().getConfig(ConfigType.Telegram);

export const bot = new Telegraf(botConfig.token);