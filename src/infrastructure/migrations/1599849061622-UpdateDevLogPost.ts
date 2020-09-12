import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateDevLogPost1599849061622 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            alter table dev_log
            add column file_type varchar(255);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            alter table dev_log
            drop column file_type;
        `);
    }

}
