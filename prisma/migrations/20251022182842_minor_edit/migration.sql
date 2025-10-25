/*
  Warnings:

  - The values [PLANNED] on the enum `FeatureStatus` will be removed. If these variants are still used in the database, this will fail.
  - Made the column `image` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "FeatureStatus_new" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED');
ALTER TABLE "public"."Feature" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Feature" ALTER COLUMN "status" TYPE "FeatureStatus_new" USING ("status"::text::"FeatureStatus_new");
ALTER TYPE "FeatureStatus" RENAME TO "FeatureStatus_old";
ALTER TYPE "FeatureStatus_new" RENAME TO "FeatureStatus";
DROP TYPE "public"."FeatureStatus_old";
ALTER TABLE "Feature" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "Feature" ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "image" SET NOT NULL;
