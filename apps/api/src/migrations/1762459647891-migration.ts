import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migration1762459647891 implements MigrationInterface {
  name = 'Migration1762459647891'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_credential" DROP CONSTRAINT "user_credential_userId_fk"`)
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`)
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`)
    await queryRunner.query(`ALTER TABLE "user" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`)
    await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "user_id_pk" PRIMARY KEY ("id")`)
    await queryRunner.query(`ALTER TABLE "user_credential" DROP CONSTRAINT "user_credential_userId_pk"`)
    await queryRunner.query(`ALTER TABLE "user_credential" DROP COLUMN "userId"`)
    await queryRunner.query(`ALTER TABLE "user_credential" ADD "userId" uuid NOT NULL`)
    await queryRunner.query(
      `ALTER TABLE "user_credential" ADD CONSTRAINT "user_credential_userId_pk" PRIMARY KEY ("userId")`,
    )
    await queryRunner.query(`ALTER TABLE "sandbox" ALTER COLUMN "authToken" SET DEFAULT MD5(random()::text)`)
    await queryRunner.query(
      `ALTER TABLE "user_credential" ADD CONSTRAINT "user_credential_userId_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_credential" DROP CONSTRAINT "user_credential_userId_fk"`)
    await queryRunner.query(`ALTER TABLE "sandbox" ALTER COLUMN "authToken" SET DEFAULT md5((random()))`)
    await queryRunner.query(`ALTER TABLE "user_credential" DROP CONSTRAINT "user_credential_userId_pk"`)
    await queryRunner.query(`ALTER TABLE "user_credential" DROP COLUMN "userId"`)
    await queryRunner.query(`ALTER TABLE "user_credential" ADD "userId" character varying NOT NULL`)
    await queryRunner.query(
      `ALTER TABLE "user_credential" ADD CONSTRAINT "user_credential_userId_pk" PRIMARY KEY ("userId")`,
    )
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "user_id_pk"`)
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`)
    await queryRunner.query(`ALTER TABLE "user" ADD "id" character varying NOT NULL`)
    await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`)
    await queryRunner.query(
      `ALTER TABLE "user_credential" ADD CONSTRAINT "user_credential_userId_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
  }
}
