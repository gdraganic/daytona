import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migration1762453764606 implements MigrationInterface {
  name = 'Migration1762453764606'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "username" character varying`)
    await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "user_username_unique" UNIQUE ("username")`)
    await queryRunner.query(`ALTER TABLE "sandbox" ALTER COLUMN "authToken" SET DEFAULT MD5(random()::text)`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "sandbox" ALTER COLUMN "authToken" SET DEFAULT md5((random()))`)
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "user_username_unique"`)
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`)
  }
}
