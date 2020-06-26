
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('jaguar_stat')
export class JaguarStatModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar")
    name: string;

    @Column({ name: 'try_count', type: 'integer' })
    try_count: number;

    @Column("varchar")
    time: string;
}