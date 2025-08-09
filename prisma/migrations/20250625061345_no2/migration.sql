/*
  Warnings:

  - You are about to drop the column `password` on the `user` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "galaPrice" INTEGER,
    "profilePicture" TEXT NOT NULL,
    "goLive" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_user" ("email", "fullName", "galaPrice", "id", "profilePicture", "userName") SELECT "email", "fullName", "galaPrice", "id", "profilePicture", "userName" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
