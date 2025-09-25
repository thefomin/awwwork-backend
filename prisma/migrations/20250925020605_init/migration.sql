/*
  Warnings:

  - You are about to drop the `auth_providers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `auth_users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `token` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."user_roles" AS ENUM ('DEFAULT', 'ADMIN');

-- CreateEnum
CREATE TYPE "public"."email_verification_statuses" AS ENUM ('PENDING', 'VERIFIED');

-- CreateEnum
CREATE TYPE "public"."account_providers" AS ENUM ('GOOGLE', 'GITHUB', 'YANDEX');

-- DropForeignKey
ALTER TABLE "public"."auth_providers" DROP CONSTRAINT "auth_providers_user_id_fkey";

-- DropTable
DROP TABLE "public"."auth_providers";

-- DropTable
DROP TABLE "public"."auth_users";

-- DropTable
DROP TABLE "public"."token";

-- DropEnum
DROP TYPE "public"."AuthMethod";

-- DropEnum
DROP TYPE "public"."TokenType";

-- DropEnum
DROP TYPE "public"."UserRole";

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "avatar" TEXT,
    "role" "public"."user_roles" NOT NULL DEFAULT 'DEFAULT',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."email_verification" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiry" TIMESTAMP(3),
    "status" "public"."email_verification_statuses" NOT NULL DEFAULT 'PENDING',
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "email_verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."external_accounts" (
    "id" TEXT NOT NULL,
    "provider" "public"."account_providers" NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expiry" INTEGER,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "external_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "public"."users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "email_verification_token_key" ON "public"."email_verification"("token");

-- CreateIndex
CREATE UNIQUE INDEX "email_verification_user_id_key" ON "public"."email_verification"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "external_accounts_provider_account_id_key" ON "public"."external_accounts"("provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "external_accounts_user_id_provider_key" ON "public"."external_accounts"("user_id", "provider");

-- AddForeignKey
ALTER TABLE "public"."email_verification" ADD CONSTRAINT "email_verification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."external_accounts" ADD CONSTRAINT "external_accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
