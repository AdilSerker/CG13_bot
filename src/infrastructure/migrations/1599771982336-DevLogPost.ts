import {MigrationInterface, QueryRunner} from "typeorm";

export class DevLogPost1599771982336 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            create table dev_log (
                id serial primary key,
                title varchar(255),
                text text not null,
                tags varchar(255) not null,
                file_id varchar(255),
                create_time timestamp not null
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            drop table dev_log;
        `);
    }

}
