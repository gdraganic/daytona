import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migration1760353249657 implements MigrationInterface {
  name = 'Migration1760353249657'

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
    await queryRunner.query(`ALTER TABLE "sandbox" DROP COLUMN "sshPass"`)
    await queryRunner.query(`ALTER TABLE "job" ADD "traceContext" jsonb`)
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
    await queryRunner.query(`ALTER TABLE "job" DROP COLUMN "traceContext"`)
    await queryRunner.query(
      `ALTER TABLE "sandbox" ADD "sshPass" character varying(32) NOT NULL DEFAULT replace((uuid_generate_v4()), '-', '')`,
    )
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
