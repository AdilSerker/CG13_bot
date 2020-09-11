import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from "typeorm";


@Entity('subscriber')
export class SubscriberModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'user_id', type: 'varchar' })
    user_id: string;

    @Column({ name: 'dev_log', type: 'boolean' })
    dev_log: boolean;

}