import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUser1592403265494 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                id integer NOT NULL,
                first_name varchar(255) NOT NULL,
                last_name varchar(255) NOT NULL,
                username varchar(255) NOT NULL,
                is_bot boolean NOT NULL,
                language_code varchar(255) NOT NULL,
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
