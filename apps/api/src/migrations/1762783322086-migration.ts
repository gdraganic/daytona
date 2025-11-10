import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migration1762783322086 implements MigrationInterface {
  name = 'Migration1762783322086'

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
      `CREATE TYPE "public"."job_type_enum" AS ENUM('CREATE_SANDBOX', 'START_SANDBOX', 'STOP_SANDBOX', 'DESTROY_SANDBOX', 'CREATE_BACKUP', 'BUILD_SNAPSHOT', 'PULL_SNAPSHOT', 'REMOVE_SNAPSHOT')`,
    )
    await queryRunner.query(
      `CREATE TYPE "public"."job_status_enum" AS ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED', 'FAILED')`,
    )
    await queryRunner.query(`CREATE TYPE "public"."job_resourcetype_enum" AS ENUM('SANDBOX', 'SNAPSHOT', 'BACKUP')`)
    await queryRunner.query(
      `CREATE TABLE "job" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL, "type" "public"."job_type_enum" NOT NULL, "status" "public"."job_status_enum" NOT NULL DEFAULT 'PENDING', "runnerId" character varying NOT NULL, "resourceType" "public"."job_resourcetype_enum", "resourceId" character varying, "payload" jsonb, "traceContext" jsonb, "errorMessage" text, "startedAt" TIMESTAMP WITH TIME ZONE, "completedAt" TIMESTAMP WITH TIME ZONE, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "job_id_pk" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(`CREATE INDEX "job_status_index" ON "job" ("status") `)
    await queryRunner.query(`CREATE INDEX "job_runnerId_index" ON "job" ("runnerId") `)
    await queryRunner.query(`CREATE INDEX "job_resourceType_resourceId_index" ON "job" ("resourceType", "resourceId") `)
    await queryRunner.query(`CREATE INDEX "job_status_createdAt_index" ON "job" ("status", "createdAt") `)
    await queryRunner.query(`CREATE INDEX "job_runnerId_status_index" ON "job" ("runnerId", "status") `)
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
    await queryRunner.query(`DROP INDEX "public"."job_runnerId_status_index"`)
    await queryRunner.query(`DROP INDEX "public"."job_status_createdAt_index"`)
    await queryRunner.query(`DROP INDEX "public"."job_resourceType_resourceId_index"`)
    await queryRunner.query(`DROP INDEX "public"."job_runnerId_index"`)
    await queryRunner.query(`DROP INDEX "public"."job_status_index"`)
    await queryRunner.query(`DROP TABLE "job"`)
    await queryRunner.query(`DROP TYPE "public"."job_resourcetype_enum"`)
    await queryRunner.query(`DROP TYPE "public"."job_status_enum"`)
    await queryRunner.query(`DROP TYPE "public"."job_type_enum"`)
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
