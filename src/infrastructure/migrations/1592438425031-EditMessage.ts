import {MigrationInterface, QueryRunner} from "typeorm";

export class EditMessage1592438425031 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> { 
        await queryRunner.query(`
            ALTER TABLE message
                ADD COLUMN edit boolean;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE message
                DROP COLUMN edit;
        `);
    }
}
