import {Configuration, CreateCompletionResponseChoicesInner, OpenAIApi} from "openai";
import {Config, ConfigType, OpenAiConfig} from "./config";
import {reply, replyWithMarkDown} from "./telegram-bot/TelegramBot";
import {TelegrafContext} from "telegraf/typings/context";

class Queue<T> {
    private elements: Map<number, T>;
    private head: number;
    private tail: number;

    constructor() {
        this.elements = new Map;
        this.head = 0;
        this.tail = 0;
    }

    get length() {
        return this.tail - this.head;
    }

    get isEmpty() {
        return this.length === 0;
    }

    enqueue(element: T) {
        this.elements.set(this.tail, element);
        this.tail++;
    }

    dequeue() {
        const item = this.elements.get(this.head);
        this.elements.delete(this.head);
        this.head++;
        return item;
    }

    peek() {
        return this.elements.get(this.head);
    }
}

export type Prompt = {
    text: string;
    ctx: TelegrafContext;
}

export class OpenAI {
    public openai: OpenAIApi;
    private promptQueue: Queue<Prompt>;
    private lockQuery: boolean = false;

    constructor() {
        const openaiConfig = <OpenAiConfig>Config.getInstance().getConfig(ConfigType.OpenAI);
        const configuration = new Configuration(openaiConfig);
        this.openai = new OpenAIApi(configuration);
        this.promptQueue = new Queue<Prompt>();

        setInterval(this.run.bind(this), 5000);
    }

    addCompletion(prompt: Prompt): void {
        this.promptQueue.enqueue(prompt);
    }

    async createCompletion(prompt: string): Promise<CreateCompletionResponseChoicesInner> {
        this.lockQuery = true;
        const baseCompletion = await this.openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `${prompt}.\n`,
            temperature: 0.65,
            max_tokens: 1000,
        });

        setTimeout(() => {
            this.lockQuery = false;
        }, 10000);

        return baseCompletion.data.choices.pop();
    }

    async run(): Promise<void> {
        console.log('Run Start. Queue Prompt Count: ', this.promptQueue.length, this.lockQuery);
        if (this.promptQueue.isEmpty || this.lockQuery) return;

        const prompt = this.promptQueue.peek();
        await prompt.ctx.replyWithChatAction('typing');
        try {
            const basePromptOutput = await this.createCompletion(prompt.text);

            if (!basePromptOutput?.text) {
                await reply(prompt.ctx, "please try again, AI couldn't send the data", {reply_to_message_id: prompt.ctx.message.message_id});
                return;
            }

            await replyWithMarkDown(prompt.ctx, basePromptOutput?.text, {reply_to_message_id: prompt.ctx.message.message_id});
        } catch (err) {
            setTimeout(() => {
                this.lockQuery = false;
            }, 10000);
            console.error(err);
            await reply(prompt.ctx, err.message, {reply_to_message_id: prompt.ctx.message.message_id});
        }

        this.promptQueue.dequeue();

        return;
    }


}

export const openai = new OpenAI();
