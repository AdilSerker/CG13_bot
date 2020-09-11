import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity('dev_log')
export class DevLogModel {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: 'title', type: 'varchar' })
    public title: string;

    @Column({ name: 'text', type: 'varchar' })
    public text: string;

    @Column({ name: 'tags', type: 'varchar' })
    public tags: string;

    @Column({ name: 'file_id', type: 'varchar' })
    public file_id: string;

    @CreateDateColumn({ name: 'create_time', type: 'timestamp' })
    public create_time: Date;
}