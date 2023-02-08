import {MigrationInterface, QueryRunner} from "typeorm";

export class EditChat1675810352027 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE chat
                ADD COLUMN "prePrompt" varchar;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE chat
                DROP COLUMN "prePrompt";
        `);
    }

}
