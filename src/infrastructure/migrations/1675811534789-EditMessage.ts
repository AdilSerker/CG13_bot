import {MigrationInterface, QueryRunner} from "typeorm";

export class EditMessage1675811534789 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE message
                ADD COLUMN text varchar;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE message
                DROP COLUMN text;
        `);
    }

}
