import {TelegrafContext} from "telegraf/typings/context";
import {openai} from "../../../components/openai";
import {Queue} from "../../../components/utils/Queue";

const context = new Map<number, Queue<string>>();

export class ChatGPT {
    private readonly ctx: TelegrafContext;

    public constructor(ctx: TelegrafContext) {
        this.ctx = ctx;
    }

    public async exec(isReplay: boolean = false) {
        if (!this.ctx.message.text) return;

        const prompt = isReplay ? this.ctx.message.text : this.ctx.message.text.slice(4);
        if (prompt.length > 1) {
            openai.addCompletion({text: this.context(this.ctx, prompt), ctx: this.ctx});

            if (!context.has(this.ctx.chat.id)) {
                context.set(this.ctx.chat.id, new Queue<string>());
            }
            context.get(this.ctx.chat.id).enqueue(prompt);
            return;
        }

    }

    private context(ctx: TelegrafContext, prompt: string): string {
        let promptContext = '';

        if (false && context.has(ctx.chat.id)) {
            const promptsQueue = context.get(ctx.chat.id);
            if (promptsQueue.length) {
                if (promptsQueue.length > 10) promptsQueue.dequeue();
                promptContext = this.buildContext(promptsQueue.toArray());
            }
        }

        promptContext = `Тебя зовут CGPT13 - ты телеграм бот с подключенной моделью GPT-3.
Выполняешь функцию местного задиры, шута, шутника, душа компании, душа чата. 
Все ответы дожны быть комичные.
Q: ${prompt}\nA:`;
        return promptContext;
    }

    private buildContext(prompts: string[]): string {
        return `context: ${prompts.join(' ')}\n`;
    }
}