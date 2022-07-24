/*
  Warnings:

  - You are about to drop the column `identifier` on the `certification` table. All the data in the column will be lost.
  - You are about to drop the column `identifier` on the `certificationbadge` table. All the data in the column will be lost.
  - You are about to drop the column `identifier` on the `experience` table. All the data in the column will be lost.
  - You are about to drop the column `identifier` on the `expierencerole` table. All the data in the column will be lost.
  - You are about to drop the column `identifier` on the `gallery` table. All the data in the column will be lost.
  - You are about to drop the column `identifier` on the `galleryimage` table. All the data in the column will be lost.
  - You are about to drop the column `identifier` on the `general` table. All the data in the column will be lost.
  - You are about to drop the column `identifier` on the `generalsocial` table. All the data in the column will be lost.
  - You are about to drop the column `identifier` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `identifier` on the `skill` table. All the data in the column will be lost.
  - You are about to drop the column `identifier` on the `skilllanguage` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "certification_identifier_key";

-- DropIndex
DROP INDEX "certificationbadge_identifier_key";

-- DropIndex
DROP INDEX "experience_identifier_key";

-- DropIndex
DROP INDEX "expierencerole_identifier_key";

-- DropIndex
DROP INDEX "gallery_identifier_key";

-- DropIndex
DROP INDEX "galleryimage_identifier_key";

-- DropIndex
DROP INDEX "general_identifier_key";

-- DropIndex
DROP INDEX "generalsocial_identifier_key";

-- DropIndex
DROP INDEX "project_identifier_key";

-- DropIndex
DROP INDEX "skill_identifier_key";

-- DropIndex
DROP INDEX "skilllanguage_identifier_key";

-- AlterTable
ALTER TABLE "certification" DROP COLUMN "identifier";

-- AlterTable
ALTER TABLE "certificationbadge" DROP COLUMN "identifier";

-- AlterTable
ALTER TABLE "experience" DROP COLUMN "identifier";

-- AlterTable
ALTER TABLE "expierencerole" DROP COLUMN "identifier";

-- AlterTable
ALTER TABLE "gallery" DROP COLUMN "identifier";

-- AlterTable
ALTER TABLE "galleryimage" DROP COLUMN "identifier";

-- AlterTable
ALTER TABLE "general" DROP COLUMN "identifier";

-- AlterTable
ALTER TABLE "generalsocial" DROP COLUMN "identifier";

-- AlterTable
ALTER TABLE "project" DROP COLUMN "identifier";

-- AlterTable
ALTER TABLE "skill" DROP COLUMN "identifier";

-- AlterTable
ALTER TABLE "skilllanguage" DROP COLUMN "identifier";
