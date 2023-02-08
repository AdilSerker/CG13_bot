import {Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn} from "typeorm";

export enum Stage {
    Default = 'DEFAULT',
    ShitPost = 'SHIT_POST',
    ShitPostSend = 'SHIT_POST_SEND',
    SetPrePrompt = 'SET_PRE_PROMPT',
    SavePrePrompt = 'SAVE_PRE_PROMPT'
}

@Entity('user')
export class UserModel {
    @PrimaryColumn('varchar')
    id: string;

    @Column({name: 'first_name', type: 'varchar'})
    first_name: string;

    @Column({name: 'last_name', type: 'varchar'})
    last_name: string;

    @Column("varchar")
    username: string;

    @Column("varchar")
    stage: Stage;

    @CreateDateColumn({name: 'is_bot', type: 'boolean'})
    is_bot: boolean;

    @UpdateDateColumn({name: 'language_code', type: 'varchar'})
    language_code: string;
}