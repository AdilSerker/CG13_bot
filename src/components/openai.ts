import {Configuration, CreateCompletionResponse, CreateCompletionResponseChoicesInner, OpenAIApi} from "openai";
import {Config, ConfigType, OpenAiConfig} from "./config";
import {reply, replyWithMarkDown} from "./telegram-bot/TelegramBot";
import {TelegrafContext} from "telegraf/typings/context";
import {Queue} from "./utils/Queue";


export type Prompt = {
    text: string;
    ctx: TelegrafContext;
}

export class OpenAI {
    public openai: OpenAIApi;
    private promptQueue: Queue<Prompt>;
    private prompt: Prompt;
    private lockQuery: boolean = false;

    constructor() {
        const openaiConfig = <OpenAiConfig>Config.getInstance().getConfig(ConfigType.OpenAI);
        const configuration = new Configuration(openaiConfig);
        this.openai = new OpenAIApi(configuration);
        this.promptQueue = new Queue<Prompt>();

        setInterval(this.run.bind(this), 1000);
    }

    addCompletion(prompt: Prompt): void {
        this.promptQueue.enqueue(prompt);
    }

    async createCompletion(prompt: string): Promise<string> {
        console.log("GPT", prompt);
        this.lockQuery = true;
        await this.actionTyping();
        let response = ''
        try {
            const baseCompletion = await this.openai.createCompletion({
                model: 'text-davinci-003',
                prompt: `${prompt}.\n`,
                temperature: 0.65,
                max_tokens: 1000,
            });
            const completion: CreateCompletionResponse = baseCompletion.data;
            response = completion.choices.pop().text;
        } catch (err) {
            console.error(err);
        }

        //await new Promise((res, rej) => { setTimeout(() => {res()}, 10000) });

        setTimeout(() => {
            this.lockQuery = false;
        }, 1000);

        return response;//baseCompletion.data.choices.pop().text;
    }

    async run(): Promise<void> {
        console.log('Run Start. Queue Prompt Count: ', this.promptQueue.length, this.lockQuery);
        if (this.promptQueue.isEmpty || this.lockQuery) return;

        const prompt = this.prompt = this.promptQueue.peek();
        try {
            await this.actionTyping();
            const basePromptOutput = await this.createCompletion(prompt.text);

            if (!basePromptOutput) {
                await reply(prompt.ctx, "please try again, AI couldn't send the data", {reply_to_message_id: prompt.ctx.message.message_id});
                this.promptQueue.dequeue();
                return;
            }

            await replyWithMarkDown(prompt.ctx, basePromptOutput, {reply_to_message_id: prompt.ctx.message.message_id});
        } catch (err) {
            setTimeout(() => {
                this.lockQuery = false;
            }, 1000);
            console.error(err);
            await reply(prompt.ctx, err.message, {reply_to_message_id: prompt.ctx.message.message_id});
        }

        this.promptQueue.dequeue();

        return;
    }


    private async actionTyping() {
        if (this.lockQuery) {
            await this.prompt.ctx.replyWithChatAction('typing');
            setTimeout(this.actionTyping.bind(this), 5000);
        }

    }
}

export const openai = new OpenAI();
