
import { Column, Entity, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from "typeorm";
import { Chat } from "telegraf/typings/telegram-types";

@Entity('message')
export class MessageModel {
    @PrimaryColumn('int')
    id: number;

    @Column({ name: 'user_id', type: 'int' })
    user_id: number;

    @Column({ name: 'chat_id', type: 'int' })
    chat_id: number;

    @Column('int')
    date?: number;

    @Column('bool')
    sticker: boolean;

    @Column('bool')
    voice: boolean;

}