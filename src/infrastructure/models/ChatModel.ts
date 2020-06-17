
import { Column, Entity, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from "typeorm";
import { Chat } from "telegraf/typings/telegram-types";

@Entity('chat')
export class ChatModel {
    @PrimaryColumn('varchar')
    id: string;

    @Column("varchar")
    type: string;

    @Column({ name: 'first_name', type: 'varchar' })
    first_name?: string;

    @Column({ name: 'last_name', type: 'varchar' })
    last_name?: string;

    @Column("varchar")
    username?: string;

    @Column("varchar")
    title?: string;

    @CreateDateColumn({ name: 'all_members_are_administrators', type: 'boolean' })
    all_members_are_administrators?: boolean;
}