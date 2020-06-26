import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateJaguarLeaderBoard1593178807828 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            create table jaguar_stat (
                id serial primary key,
                name varchar(255) NOT NULL,
                try_count integer NOT NULL,
                time varchar(255) NOT NULL
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            drop table jaguar_stat;
        `);
    }

}
