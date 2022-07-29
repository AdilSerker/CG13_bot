import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn } from "typeorm";

@Entity('anek_b')
export class AnekBModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'anek_id', type: 'integer' })
    anek_id: number;

    @Column({ name: 'chat_id', type: 'varchar' })
    chat_id: string;

    @Column({ name: 'is_showed', type: 'boolean' })
    is_showed: boolean;
}