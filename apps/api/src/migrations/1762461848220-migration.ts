import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migration1762461848220 implements MigrationInterface {
  name = 'Migration1762461848220'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "external_identity" ("provider" character varying NOT NULL, "providerUserId" character varying NOT NULL, "userId" uuid NOT NULL, "providerUsername" character varying, "providerEmail" character varying, "providerData" text, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "external_identity_provider_providerUserId_pk" PRIMARY KEY ("provider", "providerUserId"))`,
    )
    await queryRunner.query(`ALTER TABLE "sandbox" ALTER COLUMN "authToken" SET DEFAULT MD5(random()::text)`)
    await queryRunner.query(
      `ALTER TABLE "external_identity" ADD CONSTRAINT "external_identity_userId_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "external_identity" DROP CONSTRAINT "external_identity_userId_fk"`)
    await queryRunner.query(`ALTER TABLE "sandbox" ALTER COLUMN "authToken" SET DEFAULT md5((random()))`)
    await queryRunner.query(`DROP TABLE "external_identity"`)
  }
}
