import {MigrationInterface, QueryRunner} from "typeorm";

export class EditMessage1676199640364 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE message
                ADD COLUMN answer_given boolean default false;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE message
                DROP COLUMN answer_given;
        `);
    }

}
