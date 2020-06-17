import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateChat1592405641841 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE chat (
                id varchar(255) NOT NULL,
                type varchar(255) NOT NULL,
                title varchar(255),
                username varchar(255),
                first_name varchar(255),
                last_name varchar(255),
                all_members_are_administrators boolean,
                CONSTRAINT chat_pkey PRIMARY KEY (id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE chat;
        `);
    }

}

