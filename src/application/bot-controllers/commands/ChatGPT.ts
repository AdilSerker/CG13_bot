import {TelegrafContext} from "telegraf/typings/context";
import {openai} from "../../../components/openai";
import {chatRepository} from "../../../infrastructure/repositories/ChatRepository";
import {messageRepository} from "../../../infrastructure/repositories/MessageRepository";

const CONTEXT_DEEP = 3;

interface Conversation {
    Q: string,
    A: string
}

export class ChatGPT {
    private readonly ctx: TelegrafContext;

    public constructor(ctx: TelegrafContext) {
        this.ctx = ctx;
    }

    public async exec(isReplay: boolean = false) {
        if (!this.ctx.message.text) return;
        const text = isReplay ? this.ctx.message.text : this.ctx.message.text.slice(4);
        await messageRepository.saveMessageSource(this.ctx.update.message, false, text);

        openai.addCompletion({text: await this.context(text, isReplay), ctx: this.ctx});

    }

    private async context(prompt: string, isReplay: boolean = false): Promise<string> {
        let promptContext = '';

        if (isReplay) {
            let conversations: Conversation[] = [];
            let replyMessageId = `${this.ctx.message.reply_to_message.message_id}`;
            await this.loadConversation(replyMessageId, conversations, CONTEXT_DEEP);
            // console.log(conversations);
            promptContext = this.buildContext(conversations.reverse());
        }

        const chat = await chatRepository.get(this.ctx.chat.id);
        const prePrompt = chat.prePrompt || '';
        return `${prePrompt}\n${promptContext}\nQ: ${prompt}\nA:`;
    }

    private async loadConversation(replyMessageId: string, conversations: Conversation[], deep: number) {
        let conversation: Conversation = {Q: '', A: ''};
        const answer = await messageRepository.getById(replyMessageId);
        conversation.A = answer && answer.text;
        const question = answer && await messageRepository.getById(answer.reply_to_message);
        conversation.Q = question && question.text;
        conversations.push(conversation);
        if (deep && question && question.reply_to_message)
            await this.loadConversation(question.reply_to_message, conversations, deep - 1);
    }

    private buildContext(prompts: { Q: string, A: string }[]): string {
        return prompts.reduce((acc, curr) => {
            if (curr.Q) acc += `\nQ: ${curr.Q}`;
            if (curr.A) acc += `\nA: ${curr.A}`;
            return acc;
        }, '');
    }
}
