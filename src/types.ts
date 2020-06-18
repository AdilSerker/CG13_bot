import { MessageSubTypes } from 'telegraf/typings/telegram-types';
import { UpdateType } from 'telegraf/typings/telegram-types';
import { Middleware } from "telegraf";
import { TelegrafContext } from "telegraf/typings/context";

export type CommandListener = { 
    command: string | string[], 
    middleware: Middleware<TelegrafContext>
};

export type OnListener = { 
    updateType: | UpdateType | UpdateType[] | MessageSubTypes | MessageSubTypes[], 
    middleware: Middleware<TelegrafContext> 
};

export type TextListener = {
    match: string,
    middleware: Middleware<TelegrafContext> 
};
