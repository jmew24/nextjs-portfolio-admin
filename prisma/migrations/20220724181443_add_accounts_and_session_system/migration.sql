/*
  Warnings:

  - The primary key for the `certification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `education` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `experience` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `expierencerole` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `gallery` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `galleryimage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `general` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `project` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `skill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `website` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

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
ALTER TABLE "skill" DROP CONSTRAINT "skill_website_id_fkey";

-- DropForeignKey
ALTER TABLE "website" DROP CONSTRAINT "website_owner_id_fkey";

-- AlterTable
ALTER TABLE "certification" DROP CONSTRAINT "certification_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "website_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "certification_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "certification_id_seq";

-- AlterTable
ALTER TABLE "certificationbadge" ALTER COLUMN "certification_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "education" DROP CONSTRAINT "education_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "website_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "education_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "education_id_seq";

-- AlterTable
ALTER TABLE "experience" DROP CONSTRAINT "experience_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "website_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "experience_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "experience_id_seq";

-- AlterTable
ALTER TABLE "expierencerole" DROP CONSTRAINT "expierencerole_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "experience_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "expierencerole_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "expierencerole_id_seq";

-- AlterTable
ALTER TABLE "gallery" DROP CONSTRAINT "gallery_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "website_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "gallery_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "gallery_id_seq";

-- AlterTable
ALTER TABLE "galleryimage" DROP CONSTRAINT "galleryimage_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "gallery_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "galleryimage_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "galleryimage_id_seq";

-- AlterTable
ALTER TABLE "general" DROP CONSTRAINT "general_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "website_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "general_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "general_id_seq";

-- AlterTable
ALTER TABLE "generalsocial" ALTER COLUMN "general_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "project" DROP CONSTRAINT "project_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "website_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "project_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "project_id_seq";

-- AlterTable
ALTER TABLE "skill" DROP CONSTRAINT "skill_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "website_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "skill_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "skill_id_seq";

-- AlterTable
ALTER TABLE "website" DROP CONSTRAINT "website_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "owner_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "website_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "website_id_seq";

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "email_verified" TIMESTAMP(3),
    "image" TEXT,
    "first_name" TEXT,
    "flast_name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "password" TEXT,
    "role" "Role" NOT NULL DEFAULT 'CLIENT',
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verificationtokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "verificationtokens_token_key" ON "verificationtokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verificationtokens_identifier_token_key" ON "verificationtokens"("identifier", "token");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "website" ADD CONSTRAINT "website_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certificationbadge" ADD CONSTRAINT "certificationbadge_certification_id_fkey" FOREIGN KEY ("certification_id") REFERENCES "certification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certification" ADD CONSTRAINT "certification_website_id_fkey" FOREIGN KEY ("website_id") REFERENCES "website"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "education" ADD CONSTRAINT "education_website_id_fkey" FOREIGN KEY ("website_id") REFERENCES "website"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expierencerole" ADD CONSTRAINT "expierencerole_experience_id_fkey" FOREIGN KEY ("experience_id") REFERENCES "experience"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experience" ADD CONSTRAINT "experience_website_id_fkey" FOREIGN KEY ("website_id") REFERENCES "website"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "galleryimage" ADD CONSTRAINT "galleryimage_gallery_id_fkey" FOREIGN KEY ("gallery_id") REFERENCES "gallery"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gallery" ADD CONSTRAINT "gallery_website_id_fkey" FOREIGN KEY ("website_id") REFERENCES "website"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "generalsocial" ADD CONSTRAINT "generalsocial_general_id_fkey" FOREIGN KEY ("general_id") REFERENCES "general"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "general" ADD CONSTRAINT "general_website_id_fkey" FOREIGN KEY ("website_id") REFERENCES "website"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_website_id_fkey" FOREIGN KEY ("website_id") REFERENCES "website"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skill" ADD CONSTRAINT "skill_website_id_fkey" FOREIGN KEY ("website_id") REFERENCES "website"("id") ON DELETE CASCADE ON UPDATE CASCADE;
