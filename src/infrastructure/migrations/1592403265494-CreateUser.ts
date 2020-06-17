import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUser1592403265494 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                id varchar(255) NOT NULL,
                first_name varchar(255),
                last_name varchar(255),
                username varchar(255) NOT NULL,
                is_bot boolean,
                language_code varchar(255),
                CONSTRAINT user_pkey PRIMARY KEY (id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "user";
        `);
    }

}
