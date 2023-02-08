import {Configuration, CreateCompletionResponse, OpenAIApi} from "openai";
import {reply, replyWithMarkDown} from "./telegram-bot/TelegramBot";
import {TelegrafContext} from "telegraf/typings/context";
import {Queue} from "./utils/Queue";
import {Config, ConfigType, OpenAiConfig} from "./config";
import {messageRepository} from "../infrastructure/repositories/MessageRepository";

const COOL_DOWN = 2000;

export type Prompt = {
    text: string;
    ctx: TelegrafContext;
}

export class OpenAI {
    public openai: OpenAIApi;
    private promptQueue: Queue<Prompt>;
    private prompt: Prompt;
    private lockQuery: boolean = false;
    private isTyping: boolean = false;

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
        let response = '';
        try {
            const baseCompletion = await this.openai.createCompletion({
                model: 'text-davinci-003',
                prompt: `${prompt}.\n`,
                temperature: 1.,
                max_tokens: 1000,
            });
            const completion: CreateCompletionResponse = baseCompletion.data;
            response = completion.choices.pop().text;
        } catch (err) {
            console.error(err);
        }
        // await new Promise(res => setTimeout(res, 6000));
        return response;
    }

    async run(): Promise<void> {
        console.log('Run Start. Queue Prompt Count: ', this.promptQueue.length, this.lockQuery);
        if (this.promptQueue.isEmpty || this.lockQuery) return;

        const prompt = this.prompt = this.promptQueue.peek();
        try {
            this.lockQuery = true;
            this.isTyping = true;
            await this.actionTyping();
            const basePromptOutput = await this.createCompletion(prompt.text);

            if (!basePromptOutput) {
                await reply(prompt.ctx, "please try again, AI couldn't send the data", {reply_to_message_id: prompt.ctx.message.message_id});
                this.promptQueue.dequeue();
                return;
            }
            const message = await replyWithMarkDown(prompt.ctx, basePromptOutput, {reply_to_message_id: prompt.ctx.message.message_id});
            await messageRepository.saveMessageSource(message);
        } catch (err) {

            console.error(err);
            await reply(prompt.ctx, err.message, {reply_to_message_id: prompt.ctx.message.message_id});

        }

        this.promptQueue.dequeue();

        this.isTyping = false;
        setTimeout(() => {
            this.lockQuery = false;
        }, COOL_DOWN);

        return;
    }


    private async actionTyping() {
        if (this.isTyping) {
            await this.prompt.ctx.replyWithChatAction('typing');
            setTimeout(this.actionTyping.bind(this), 5000);
        }

    }
}

export const openai = new OpenAI();
