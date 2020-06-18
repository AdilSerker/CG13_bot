import {MigrationInterface, QueryRunner} from "typeorm";

export class AddMessageReplay1592500499124 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> { 
        await queryRunner.query(`
            ALTER TABLE message
                ADD COLUMN reply_to_message varchar(255);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE message
                DROP COLUMN reply_to_message;
        `);
    }

}
