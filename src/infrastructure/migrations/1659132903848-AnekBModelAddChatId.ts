import {MigrationInterface, QueryRunner} from "typeorm";

export class AnekBModelAddChatId1659132903848 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            alter table anek_b
            add column chat_id varchar(255);
        `);
    }

public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            alter table anek_b
            drop column chat_id;
        `);
    }

}
