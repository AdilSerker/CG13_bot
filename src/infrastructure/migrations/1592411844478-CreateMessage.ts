import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateMessage1592411844478 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE message (
                id bigint NOT NULL,
                user_id bigint NOT NULL references "user"(id),
                chat_id bigint NOT NULL references chat(id),
                date integer NOT NULL,
                sticker boolean,
                voice boolean,
                CONSTRAINT message_pkey PRIMARY KEY (id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE message;
        `);
    }

}
