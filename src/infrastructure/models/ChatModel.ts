
import { Column, Entity, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from "typeorm";
import { Chat } from "telegraf/typings/telegram-types";

@Entity('chat')
export class ChatModel implements Chat {
    @PrimaryColumn('int')
    id: number;

    @Column("varchar")
    type: string;

    @Column({ name: 'first_name', type: 'varchar' })
    first_name?: string;

    @Column({ name: 'last_name', type: 'varchar' })
    last_name?: string;

    @Column("varchar")
    username?: string;

    @CreateDateColumn({ name: 'is_bot', type: 'boolean' })
    all_members_are_administrators?: boolean;
}