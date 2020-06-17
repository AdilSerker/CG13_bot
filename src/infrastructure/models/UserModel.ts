import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from "typeorm";
import { User } from "telegraf/typings/telegram-types";

@Entity('user')
export class UserModel implements User {
    @PrimaryColumn('bigint')
    id: number;

    @Column({ name: 'first_name', type: 'varchar' })
    first_name: string;

    @Column({ name: 'last_name', type: 'varchar' })
    last_name: string;

    @Column("varchar")
    username: string;

    @CreateDateColumn({ name: 'is_bot', type: 'boolean' })
    is_bot: boolean;

    @UpdateDateColumn({ name: 'language_code', type: 'varchar' })
    language_code: string;
}