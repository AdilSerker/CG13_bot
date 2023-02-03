import {TelegrafContext} from "telegraf/typings/context";
import {openai} from "../../../components/openai";


export class ChatGPT {
    private ctx: TelegrafContext;

    public constructor(ctx: TelegrafContext) {
        this.ctx = ctx;
    }

    public async exec() {
        if (!this.ctx.message.text) return;

        const [mask, ] = this.ctx.message.text.split(' ');
        const [, prompt] = this.ctx.message.text.split('gpt ');
        if (mask === 'gpt') {
            openai.addCompletion({text: prompt, ctx: this.ctx});
            return;
        }

    }
}