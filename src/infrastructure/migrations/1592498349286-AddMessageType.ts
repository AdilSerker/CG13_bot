import {MigrationInterface, QueryRunner} from "typeorm";

export class AddMessageType1592498349286 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> { 
        await queryRunner.query(`
            ALTER TABLE message
                ADD COLUMN photo boolean,
                ADD COLUMN video boolean;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE message
                DROP COLUMN photo, DROP COLUMN video;
        `);
    }
}
