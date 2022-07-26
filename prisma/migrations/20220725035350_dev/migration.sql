/*
  Warnings:

  - You are about to drop the column `accessLevel` on the `users` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "AccessLevel" AS ENUM ('ROOT', 'ADMIN', 'CLIENT', 'GUEST');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "accessLevel",
ADD COLUMN     "access_level" "AccessLevel" NOT NULL DEFAULT 'CLIENT';
