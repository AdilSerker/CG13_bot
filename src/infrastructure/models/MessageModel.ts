
import { Column, Entity, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from "typeorm";
import { Chat } from "telegraf/typings/telegram-types";

@Entity('message')
export class MessageModel {
    @PrimaryColumn('int')
    id: number;

    @Column()
    user_id: number;

    @Column('int')
    chat_id: number;

    @Column('int')
    date?: number;

    @Column('bool')
    sticker: boolean;

    @Column('bool')
    voice: boolean;

}