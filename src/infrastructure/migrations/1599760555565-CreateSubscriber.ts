import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateSubscriber1599760555565 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            create table subscriber (
                id serial primary key,
                user_id varchar(255) references "user"(id),
                dev_log boolean
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            drop table subscriber;
        `);
    }

}
