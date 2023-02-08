import {MigrationInterface, QueryRunner} from "typeorm";

export class AddIsPremium1675846661719 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE "user"
            ADD COLUMN is_premium boolean;
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE "user"
            DROP COLUMN is_premium;
    `);
    }

}
