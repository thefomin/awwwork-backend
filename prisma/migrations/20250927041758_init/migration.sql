/*
  Warnings:

  - You are about to drop the `user_careers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_follows` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_friends` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_profiles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_socials` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."user_careers";

-- DropTable
DROP TABLE "public"."user_follows";

-- DropTable
DROP TABLE "public"."user_friends";

-- DropTable
DROP TABLE "public"."user_profiles";

-- DropTable
DROP TABLE "public"."user_socials";

-- CreateTable
CREATE TABLE "public"."profiles" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "picture" TEXT,
    "bio" TEXT,
    "location" TEXT,
    "website" TEXT,
    "social_links" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."careers" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "headline" TEXT,
    "skills" TEXT[],
    "experience" INTEGER,
    "job_title" TEXT,
    "company" TEXT,
    "employment_type" "public"."EmploymentType",
    "is_looking_for_job" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "careers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."socials" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "interests" TEXT[],
    "collab_type" "public"."CollabType",

    CONSTRAINT "socials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."friends" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "friend_id" TEXT NOT NULL,
    "status" "public"."FriendStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "friends_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."follows" (
    "id" TEXT NOT NULL,
    "follower_id" TEXT NOT NULL,
    "following_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "follows_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_user_id_key" ON "public"."profiles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_username_key" ON "public"."profiles"("username");

-- CreateIndex
CREATE UNIQUE INDEX "careers_user_id_key" ON "public"."careers"("user_id");

-- CreateIndex
CREATE INDEX "careers_user_id_idx" ON "public"."careers"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "socials_user_id_key" ON "public"."socials"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "follows_follower_id_following_id_key" ON "public"."follows"("follower_id", "following_id");
