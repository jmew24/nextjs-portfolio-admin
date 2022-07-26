/*
  Warnings:

  - You are about to drop the `certification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `certificationbadge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `education` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `experience` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `expierencerole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `gallery` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `galleryimage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `general` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `generalsocial` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `skill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `skilllanguage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `website` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "certification" DROP CONSTRAINT "certification_website_id_fkey";

-- DropForeignKey
ALTER TABLE "certificationbadge" DROP CONSTRAINT "certificationbadge_certification_id_fkey";

-- DropForeignKey
ALTER TABLE "education" DROP CONSTRAINT "education_website_id_fkey";

-- DropForeignKey
ALTER TABLE "experience" DROP CONSTRAINT "experience_website_id_fkey";

-- DropForeignKey
ALTER TABLE "expierencerole" DROP CONSTRAINT "expierencerole_experience_id_fkey";

-- DropForeignKey
ALTER TABLE "gallery" DROP CONSTRAINT "gallery_website_id_fkey";

-- DropForeignKey
ALTER TABLE "galleryimage" DROP CONSTRAINT "galleryimage_gallery_id_fkey";

-- DropForeignKey
ALTER TABLE "general" DROP CONSTRAINT "general_website_id_fkey";

-- DropForeignKey
ALTER TABLE "generalsocial" DROP CONSTRAINT "generalsocial_general_id_fkey";

-- DropForeignKey
ALTER TABLE "project" DROP CONSTRAINT "project_website_id_fkey";

-- DropForeignKey
ALTER TABLE "skill" DROP CONSTRAINT "skill_skill_language_id_fkey";

-- DropForeignKey
ALTER TABLE "skill" DROP CONSTRAINT "skill_website_id_fkey";

-- DropForeignKey
ALTER TABLE "website" DROP CONSTRAINT "website_owner_id_fkey";

-- DropTable
DROP TABLE "certification";

-- DropTable
DROP TABLE "certificationbadge";

-- DropTable
DROP TABLE "education";

-- DropTable
DROP TABLE "experience";

-- DropTable
DROP TABLE "expierencerole";

-- DropTable
DROP TABLE "gallery";

-- DropTable
DROP TABLE "galleryimage";

-- DropTable
DROP TABLE "general";

-- DropTable
DROP TABLE "generalsocial";

-- DropTable
DROP TABLE "project";

-- DropTable
DROP TABLE "skill";

-- DropTable
DROP TABLE "skilllanguage";

-- DropTable
DROP TABLE "user";

-- DropTable
DROP TABLE "website";

-- DropEnum
DROP TYPE "Role";
