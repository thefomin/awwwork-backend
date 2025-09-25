/*
  Warnings:

  - A unique constraint covering the columns `[follower_id,following_id]` on the table `user_follows` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "user_careers_user_id_idx" ON "public"."user_careers"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_follows_follower_id_following_id_key" ON "public"."user_follows"("follower_id", "following_id");
