
import { Column, Entity, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from "typeorm";
import { Chat } from "telegraf/typings/telegram-types";

@Entity('message')
export class MessageModel {
    @PrimaryColumn('varchar')
    id: string;

    @Column({ name: 'user_id', type: 'varchar' })
    user_id: string;

    @Column({ name: 'chat_id', type: 'varchar' })
    chat_id: string;

    @Column({ name: 'reply_to_message', type: 'varchar' })
    reply_to_message: string;

    @Column('int')
    date?: number;

    @Column('bool')
    sticker: boolean;

    @Column('bool')
    voice: boolean;

    @Column('bool')
    video: boolean;

    @Column('bool')
    photo: boolean;

    @Column('bool')
    edit: boolean;

}