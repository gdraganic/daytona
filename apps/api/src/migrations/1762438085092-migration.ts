import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migration1762438085092 implements MigrationInterface {
  name = 'Migration1762438085092'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "snapshot" DROP CONSTRAINT "public.snapshot_buildInfoImageRef_fk"`)
    await queryRunner.query(`ALTER TABLE "sandbox" DROP CONSTRAINT "public.sandbox_buildInfoSnapshotRef_fk"`)
    await queryRunner.query(
      `ALTER TABLE "organization_role_assignment_invitation" DROP CONSTRAINT "organization_role_assignment_invitation_roleId_fk"`,
    )
    await queryRunner.query(
      `ALTER TABLE "organization_role_assignment" DROP CONSTRAINT "organization_role_assignment_roleId_fk"`,
    )
    await queryRunner.query(`ALTER TABLE "snapshot" DROP CONSTRAINT "image_organizationId_name_unique"`)
    await queryRunner.query(
      `CREATE TABLE "user_credential" ("userId" character varying NOT NULL, "passwordHash" character varying NOT NULL, "requirePasswordChange" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "user_credential_userId_pk" PRIMARY KEY ("userId"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "oidc_model" ("id" character varying NOT NULL, "type" character varying NOT NULL, "payload" text NOT NULL, "grantId" character varying, "userCode" character varying, "uid" character varying, "expiresAt" TIMESTAMP WITH TIME ZONE, "consumedAt" TIMESTAMP WITH TIME ZONE, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "oidc_model_id_type_pk" PRIMARY KEY ("id", "type"))`,
    )
    await queryRunner.query(`CREATE INDEX "oidc_model_type_uid_index" ON "oidc_model" ("type", "uid") `)
    await queryRunner.query(`CREATE INDEX "oidc_model_type_userCode_index" ON "oidc_model" ("type", "userCode") `)
    await queryRunner.query(`CREATE INDEX "oidc_model_type_grantId_index" ON "oidc_model" ("type", "grantId") `)
    await queryRunner.query(`CREATE INDEX "oidc_model_type_id_index" ON "oidc_model" ("type", "id") `)
    await queryRunner.query(
      `CREATE TABLE "jwks" ("kid" character varying NOT NULL, "keyData" text NOT NULL, "active" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "jwks_kid_pk" PRIMARY KEY ("kid"))`,
    )
    await queryRunner.query(`ALTER TABLE "sandbox" DROP COLUMN "sshPass"`)
    await queryRunner.query(`ALTER TABLE "snapshot" ALTER COLUMN "imageName" DROP DEFAULT`)
    await queryRunner.query(`ALTER TABLE "ssh_access" DROP CONSTRAINT "ssh_access_sandboxId_fk"`)
    await queryRunner.query(`ALTER TABLE "sandbox" DROP CONSTRAINT "sandbox_organizationId_name_unique"`)
    await queryRunner.query(`ALTER TABLE "sandbox" DROP CONSTRAINT "public.sandbox_id_pk"`)
    await queryRunner.query(`ALTER TABLE "sandbox" DROP COLUMN "id"`)
    await queryRunner.query(`ALTER TABLE "sandbox" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`)
    await queryRunner.query(`ALTER TABLE "sandbox" ADD CONSTRAINT "sandbox_id_pk" PRIMARY KEY ("id")`)
    await queryRunner.query(`ALTER TABLE "sandbox" ALTER COLUMN "name" DROP DEFAULT`)
    await queryRunner.query(`ALTER TABLE "sandbox" ALTER COLUMN "authToken" SET DEFAULT MD5(random()::text)`)
    await queryRunner.query(`ALTER TABLE "ssh_access" DROP COLUMN "sandboxId"`)
    await queryRunner.query(`ALTER TABLE "ssh_access" ADD "sandboxId" uuid NOT NULL`)
    await queryRunner.query(`ALTER TABLE "runner" ALTER COLUMN "proxyUrl" DROP DEFAULT`)
    await queryRunner.query(`ALTER TABLE "runner" ALTER COLUMN "region" DROP DEFAULT`)
    await queryRunner.query(
      `ALTER TABLE "snapshot" ADD CONSTRAINT "snapshot_organizationId_name_unique" UNIQUE ("organizationId", "name")`,
    )
    await queryRunner.query(
      `ALTER TABLE "sandbox" ADD CONSTRAINT "sandbox_organizationId_name_unique" UNIQUE ("organizationId", "name")`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_credential" ADD CONSTRAINT "user_credential_userId_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "snapshot" ADD CONSTRAINT "snapshot_buildInfoSnapshotRef_fk" FOREIGN KEY ("buildInfoSnapshotRef") REFERENCES "build_info"("snapshotRef") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "sandbox" ADD CONSTRAINT "sandbox_buildInfoSnapshotRef_fk" FOREIGN KEY ("buildInfoSnapshotRef") REFERENCES "build_info"("snapshotRef") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "ssh_access" ADD CONSTRAINT "ssh_access_sandboxId_fk" FOREIGN KEY ("sandboxId") REFERENCES "sandbox"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "organization_role_assignment_invitation" ADD CONSTRAINT "organization_role_assignment_invitation_roleId_fk" FOREIGN KEY ("roleId") REFERENCES "organization_role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "organization_role_assignment" ADD CONSTRAINT "organization_role_assignment_roleId_fk" FOREIGN KEY ("roleId") REFERENCES "organization_role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "organization_role_assignment" DROP CONSTRAINT "organization_role_assignment_roleId_fk"`,
    )
    await queryRunner.query(
      `ALTER TABLE "organization_role_assignment_invitation" DROP CONSTRAINT "organization_role_assignment_invitation_roleId_fk"`,
    )
    await queryRunner.query(`ALTER TABLE "ssh_access" DROP CONSTRAINT "ssh_access_sandboxId_fk"`)
    await queryRunner.query(`ALTER TABLE "sandbox" DROP CONSTRAINT "sandbox_buildInfoSnapshotRef_fk"`)
    await queryRunner.query(`ALTER TABLE "snapshot" DROP CONSTRAINT "snapshot_buildInfoSnapshotRef_fk"`)
    await queryRunner.query(`ALTER TABLE "user_credential" DROP CONSTRAINT "user_credential_userId_fk"`)
    await queryRunner.query(`ALTER TABLE "sandbox" DROP CONSTRAINT "sandbox_organizationId_name_unique"`)
    await queryRunner.query(`ALTER TABLE "snapshot" DROP CONSTRAINT "snapshot_organizationId_name_unique"`)
    await queryRunner.query(`ALTER TABLE "runner" ALTER COLUMN "region" SET DEFAULT 'us'`)
    await queryRunner.query(`ALTER TABLE "runner" ALTER COLUMN "proxyUrl" SET DEFAULT ''`)
    await queryRunner.query(`ALTER TABLE "ssh_access" DROP COLUMN "sandboxId"`)
    await queryRunner.query(`ALTER TABLE "ssh_access" ADD "sandboxId" character varying NOT NULL`)
    await queryRunner.query(`ALTER TABLE "sandbox" ALTER COLUMN "authToken" SET DEFAULT md5((random()))`)
    await queryRunner.query(
      `ALTER TABLE "sandbox" ALTER COLUMN "name" SET DEFAULT ('sandbox-'|| "substring"((gen_random_uuid()), 1, 10))`,
    )
    await queryRunner.query(`ALTER TABLE "sandbox" DROP CONSTRAINT "sandbox_id_pk"`)
    await queryRunner.query(`ALTER TABLE "sandbox" DROP COLUMN "id"`)
    await queryRunner.query(`ALTER TABLE "sandbox" ADD "id" character varying NOT NULL DEFAULT uuid_generate_v4()`)
    await queryRunner.query(`ALTER TABLE "sandbox" ADD CONSTRAINT "public.sandbox_id_pk" PRIMARY KEY ("id")`)
    await queryRunner.query(
      `ALTER TABLE "sandbox" ADD CONSTRAINT "sandbox_organizationId_name_unique" UNIQUE ("organizationId", "name")`,
    )
    await queryRunner.query(
      `ALTER TABLE "ssh_access" ADD CONSTRAINT "ssh_access_sandboxId_fk" FOREIGN KEY ("sandboxId") REFERENCES "sandbox"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(`ALTER TABLE "snapshot" ALTER COLUMN "imageName" SET DEFAULT ''`)
    await queryRunner.query(
      `ALTER TABLE "sandbox" ADD "sshPass" character varying(32) NOT NULL DEFAULT replace((uuid_generate_v4()), '-', '')`,
    )
    await queryRunner.query(`DROP TABLE "jwks"`)
    await queryRunner.query(`DROP INDEX "public"."oidc_model_type_id_index"`)
    await queryRunner.query(`DROP INDEX "public"."oidc_model_type_grantId_index"`)
    await queryRunner.query(`DROP INDEX "public"."oidc_model_type_userCode_index"`)
    await queryRunner.query(`DROP INDEX "public"."oidc_model_type_uid_index"`)
    await queryRunner.query(`DROP TABLE "oidc_model"`)
    await queryRunner.query(`DROP TABLE "user_credential"`)
    await queryRunner.query(
      `ALTER TABLE "snapshot" ADD CONSTRAINT "image_organizationId_name_unique" UNIQUE ("name", "organizationId")`,
    )
    await queryRunner.query(
      `ALTER TABLE "organization_role_assignment" ADD CONSTRAINT "organization_role_assignment_roleId_fk" FOREIGN KEY ("roleId") REFERENCES "organization_role"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE "organization_role_assignment_invitation" ADD CONSTRAINT "organization_role_assignment_invitation_roleId_fk" FOREIGN KEY ("roleId") REFERENCES "organization_role"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE "sandbox" ADD CONSTRAINT "public.sandbox_buildInfoSnapshotRef_fk" FOREIGN KEY ("buildInfoSnapshotRef") REFERENCES "build_info"("snapshotRef") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "snapshot" ADD CONSTRAINT "public.snapshot_buildInfoImageRef_fk" FOREIGN KEY ("buildInfoSnapshotRef") REFERENCES "build_info"("snapshotRef") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }
}
