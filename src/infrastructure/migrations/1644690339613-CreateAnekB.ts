import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateAnekB1644690339613 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "anek_b" (
                id serial primary key,
                anek_id integer NOT NULL,
                is_showed boolean
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "anek_b";
        `);
    }

}
