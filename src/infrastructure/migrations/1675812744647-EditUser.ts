import {MigrationInterface, QueryRunner} from "typeorm";

export class EditUser1675812744647 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
                ADD COLUMN stage varchar not null DEFAULT 'DEFAULT';
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
                DROP COLUMN stage;
        `);
    }

}
