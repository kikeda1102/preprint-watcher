-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "sortBy" TEXT NOT NULL DEFAULT 'submittedDate',
    "sortOrder" TEXT NOT NULL DEFAULT 'descending'
);
INSERT INTO "new_User" ("email", "id", "name", "sortBy", "sortOrder") SELECT "email", "id", "name", "sortBy", "sortOrder" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
