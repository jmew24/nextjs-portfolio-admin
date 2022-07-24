/*
  Warnings:

  - You are about to drop the column `skill_id` on the `skilllanguage` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "skilllanguage" DROP CONSTRAINT "skilllanguage_skill_id_fkey";

-- AlterTable
ALTER TABLE "certification" ALTER COLUMN "type" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "experience" ALTER COLUMN "type" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "gallery" ALTER COLUMN "type" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "project" ALTER COLUMN "type" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "skill" ADD COLUMN     "skill_language_id" INTEGER,
ALTER COLUMN "type" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "skilllanguage" DROP COLUMN "skill_id";

-- AddForeignKey
ALTER TABLE "skill" ADD CONSTRAINT "skill_skill_language_id_fkey" FOREIGN KEY ("skill_language_id") REFERENCES "skilllanguage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
