import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migration1762446144636 implements MigrationInterface {
  name = 'Migration1762446144636'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "jwks" ADD "isPrimary" boolean NOT NULL DEFAULT false`)
    await queryRunner.query(`ALTER TABLE "sandbox" ALTER COLUMN "authToken" SET DEFAULT MD5(random()::text)`)
    await queryRunner.query(
      `CREATE UNIQUE INDEX "jwks_isPrimary_index" ON "jwks" ("isPrimary") WHERE "isPrimary" = true`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."jwks_isPrimary_index"`)
    await queryRunner.query(`ALTER TABLE "sandbox" ALTER COLUMN "authToken" SET DEFAULT md5((random()))`)
    await queryRunner.query(`ALTER TABLE "jwks" DROP COLUMN "isPrimary"`)
  }
}
