import { concreting } from './../../components/concrete/index';
import { TelegrafContext } from 'telegraf/typings/context';

import { reply, replyWithPhoto } from '../../components/telegram-bot/TelegramBot';
import { randomInteger } from '../../components/utils/randomize';

import { AGGRESSIVE_REPLAY, ANSWERS_3DSOFT, WEED_REPLAY, TUTOR_REPLAY, BLENDER_REPLAY, AUE_REPLAY } from './answers';
import { BaseChatUseCase } from './BaseChatUseCase';

export enum ReactionType {
    Ban = 'ban',
    Lough = 'lough',
    Secret = 'secret',
    Question = 'question',
    Bake = 'bake',
    Weed = 'weed',
    Tutorial = 'tutorial',
    Blender = 'blender',
    AUE = 'aue',
    Yes = 'yes',
    No = 'no',
    What = 'what',
    LGBT = 'lgbt',
    Concrete = 'concrete'
}

export class TextReaction extends BaseChatUseCase {
    private reactionType: ReactionType;

    public constructor(ctx: TelegrafContext, type: ReactionType) {
        super(ctx);
        this.reactionType = type;
    }

    protected async runLogic() {
        switch (this.reactionType) {
            case ReactionType.Ban:
                await this.matchBan();
                break;
            case ReactionType.AUE:
                await this.matchAye();
                break;
            case ReactionType.Bake:
                await this.matchBake();
                break;
            case ReactionType.Blender:
                await this.matchBlender();
                break;
            case ReactionType.Lough:
                await this.matchLough();
                break;
            case ReactionType.Weed:
                await this.matchWeed();
                break;
            case ReactionType.No:
                await this.matchNo();
                break;
            case ReactionType.Question:
                await this.matchQuestion();
                break;
            case ReactionType.Secret:
                await this.matchSecret();
    
                break;
            case ReactionType.Tutorial:
                await this.matchTutor();

                break;
            case ReactionType.What:
                await this.matchWhat();

                break;
            case ReactionType.Yes:
                await this.matchYes();
                
                break;
            case ReactionType.LGBT:
                await this.matchLGBT();
                
                break;

            case ReactionType.Concrete:
                await this.matchSingleWord();
                break;
            default:
                break;
        }
    }

    private async matchSingleWord() {
        const concretedWord = concreting(this.ctx.update.message.text);
            if (concretedWord) {
                await reply(this.ctx, concretedWord);
            }
    }

    private async matchBan() {

        const randomInt = randomInteger(0, 100);

        if (randomInt > 50) {
            const lastIdx = AGGRESSIVE_REPLAY.length - 1;
            await reply(this.ctx, AGGRESSIVE_REPLAY[randomInteger(0, lastIdx)]);
        }
    }

    private async matchLough() {

        const randomInt = randomInteger(0, 100);

        if (randomInt > 70) {
            await reply(this.ctx, 'ПХАХАХАХАХАХП');
        }
    }

    private async matchSecret() {
        await reply(this.ctx, 'н҉̢̖͕͙͙̳͕͕̲͙̱̰͔͕͈е̵̨̜͓̦͖̙̖̜͎̱͍ с҉̢̭̝͍̱̥̮͕̯̲̩ͅт̶̡̜͕͔̗̟͖̩͕о̶̦͚̣̫͍͍̮̭͖̳͍̠͢и̴̳̬͕͙̘̖͉̭̥͓̳͉͔̫̭͢ͅт҈͔̮̦͎̗̳̬̤̳͓̭̜͎̖̟͢' + ' ' + 'в҈͙̯͉̮̯͐̀̋̋̿͊̐̌̃с҈̞̬͉̩̱͙̜̱̿̓͐͋̚ͅк҈̣̦̤͎̠͕̠͔̭̠̪̀́̐̂͑͌͂͂р̵̠̖̞̘͈̟̙̗̃̅̆̒̿̀̇̍̚ы̶̤̝͕͇̞͓͛͐̂̓̉̔в̴̯̘̱̟̞̮͉̦͙͑́̅́̂̋͛̽а̷͈̝̗̬͍̒̋̄͌̓̽͌ͅͅͅт҉͖̟̳̭̝̠̣̎̎͂͊͆̓ь̷̗̮̬̮̓͑̂́̈́̆̈́ͅ');
    }

    private async matchQuestion() {
        if (randomInteger(0, 100) > 50) {
            await reply(this.ctx, ANSWERS_3DSOFT[randomInteger(0, ANSWERS_3DSOFT.length - 1)]);
        }
    }

    private async matchBake() {
        if (randomInteger(0, 100) > 50) {
            await reply(this.ctx, 'Анус себе запеки!');
        }
    }

    private async matchWeed() {
        if (randomInteger(0, 100) > 90 || randomInteger(0, 100) > 50 && this.ctx.update.message.from.id === 230392366) {
            await reply(this.ctx, WEED_REPLAY[randomInteger(0, WEED_REPLAY.length - 1)]);
        }
    }

    private async matchTutor() {
        if (randomInteger(0, 100) > 70 || randomInteger(0, 100) > 50 && this.ctx.update.message.from.id === 341554801) {
            await reply(this.ctx, TUTOR_REPLAY[randomInteger(0, TUTOR_REPLAY.length - 1)]);
        }
    }

    private async matchBlender() {
        if (randomInteger(0, 100) > 70) {
            await reply(this.ctx, BLENDER_REPLAY[randomInteger(0, BLENDER_REPLAY.length - 1)]);
        }
    }

    private async matchAye() {
        if (randomInteger(0, 100) > 70) {
            await reply(this.ctx, AUE_REPLAY[randomInteger(0, AUE_REPLAY.length - 1)]);
        }
    }

    private async matchYes() {
        const randint = randomInteger(0, 100);
        const url = 'https://abomus.news/sites/default/files/styles/og_600x315/public/news/2019/my-little-pony-fendomy-trixie-minor-2105400.jpeg?itok=fAQHw904'
        
        if (randint > 85) {
            await replyWithPhoto(this.ctx, {
                url: url,
                filename: 'kirkorov'
            }, {
                caption: 'ПИЗДА!'
            });
            
            return;
        }

        if (randint > 80) {
            await reply(this.ctx, 'хуй НА!!');
            return;
        } 

    }

    private async matchNo() {
        if (randomInteger(0, 100) > 90) {
            await reply(this.ctx, 'Пидора ответ! 😎');
        }
    }

    private async matchWhat() {
        if (randomInteger(0, 100) > 90) {
            await reply(this.ctx, 'хуй в');
            await reply(this.ctx, 'О');
            await reply(this.ctx, 'Ч');
            await reply(this.ctx, 'О');
        }
    }

    private async matchLGBT() {
        const text = this.ctx.message.text;

            const value = +(text.replace(/🏳️‍🌈 I am /g, '').replace(/% gay!/g, ''));

            if (value > 90) {
                await reply(this.ctx, 'Самый гейский гей');

                return;
            }

            if (value > 50) {
                await reply(this.ctx, 'ЛООООООООООХ');
                await reply(this.ctx, 'пидр');

                return;
            }
    }
}
