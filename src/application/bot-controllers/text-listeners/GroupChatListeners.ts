import {ReactionType, TextReaction} from '../../../use-cases/group-chat/TextReaction';

import {TelegrafContext} from "telegraf/typings/context";
import {TextListener} from "../../../types";
import {ChatGPT} from "../commands/ChatGPT";

export const chatListeners: TextListener[] = [
    {
        match: [/^gpt/i, /^пзе/i],
        middleware: async (ctx: TelegrafContext) => {
            await (new ChatGPT(ctx).exec());
        }
    },
    {
        match: ['бан', 'Бан', ',fy'],
        middleware: async (ctx: TelegrafContext) => {
            await (new TextReaction(ctx, ReactionType.Ban).execute());
        }
    },
    {
        match: [/ban/i, /забан/i, /баним/i],
        middleware: async (ctx: TelegrafContext) => {
            await (new TextReaction(ctx, ReactionType.Ban).execute());
        }
    },
    {
        match: [/(как.*запечь)/i, /запек/i, /бейк/i],
        middleware: async (ctx: TelegrafContext) => {
            await (new TextReaction(ctx, ReactionType.Bake).execute());
        }
    },
    {
        match: [/ахаха/i],
        middleware: async (ctx: TelegrafContext) => {
            await (new TextReaction(ctx, ReactionType.Lough).execute());
        }
    },
    {
        match: [/в праг/i, /чехи/i, /Прага/i,],
        middleware: async (ctx: TelegrafContext) => {
            await (new TextReaction(ctx, ReactionType.Weed).execute());
        }
    },
    {
        match: [/(как.*делать)/i, /(как.*сделать)/i, /(как.*замоделить)/i, /(как.*в майе)/i, /(как.*в зебре)/i],
        middleware: async (ctx: TelegrafContext) => {
            await (new TextReaction(ctx, ReactionType.Question).execute());
        }
    },
    {
        match: [/blender/i, /блендер/i],
        middleware: async (ctx: TelegrafContext) => {
            await (new TextReaction(ctx, ReactionType.Blender).execute());
        }
    },
    {
        match: ['да', 'Да', 'ДА'],
        middleware: async (ctx: TelegrafContext) => {
            await (new TextReaction(ctx, ReactionType.Yes).execute());
        }
    },
    {
        match: ['нет', 'Нет', 'НЕТ'],
        middleware: async (ctx: TelegrafContext) => {
            await (new TextReaction(ctx, ReactionType.No).execute());
        }
    },
    {
        match: ['че', 'Че', 'ЧЕ', 'чо', 'Чо', 'ЧО',],
        middleware: async (ctx: TelegrafContext) => {
            await (new TextReaction(ctx, ReactionType.What).execute());
        }
    },
    {
        match: [/🏳️‍🌈/i],
        middleware: async (ctx: TelegrafContext) => {
            await (new TextReaction(ctx, ReactionType.LGBT).execute());
        }
    },
    {
        match: [/^[А-Яа-я]+[.,\/#!$%\^&\*;:{}=\-_`~()]*$/i],
        middleware: async (ctx: TelegrafContext) => {
            await (new TextReaction(ctx, ReactionType.Concrete).execute());
        }
    }
];