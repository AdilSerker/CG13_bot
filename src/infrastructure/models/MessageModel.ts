
import { Column, Entity, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from "typeorm";
import { Chat } from "telegraf/typings/telegram-types";

@Entity('message')
export class MessageModel {
    @PrimaryColumn('varchar')
    id: string;

    @Column({ name: 'user_id', type: 'bigint' })
    user_id: number;

    @Column({ name: 'chat_id', type: 'bigint' })
    chat_id: number;

    @Column('int')
    date?: number;

    @Column('bool')
    sticker: boolean;

    @Column('bool')
    voice: boolean;

    @Column('bool')
    edit: boolean;

}