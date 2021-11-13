/*
  Warnings:

  - The primary key for the `UserPost` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `UserPost` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserPost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userID" TEXT NOT NULL,
    "postID" TEXT NOT NULL,
    CONSTRAINT "UserPost_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserPost_postID_fkey" FOREIGN KEY ("postID") REFERENCES "Post" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserPost" ("postID", "userID") SELECT "postID", "userID" FROM "UserPost";
DROP TABLE "UserPost";
ALTER TABLE "new_UserPost" RENAME TO "UserPost";
CREATE UNIQUE INDEX "UserPost_userID_postID_key" ON "UserPost"("userID", "postID");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
