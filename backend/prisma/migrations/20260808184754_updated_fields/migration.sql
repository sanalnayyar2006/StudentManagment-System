/*
  Warnings:

  - Added the required column `OutofschoolChild` to the `GovRequiredDetails` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FacilitesProvided" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "studentId" INTEGER NOT NULL,
    "freeUniform" BOOLEAN NOT NULL DEFAULT false,
    "freeTextbooks" BOOLEAN NOT NULL DEFAULT false,
    "extraCurricular" TEXT,
    "facilityProvidedToCSWN" TEXT,
    "specificLearningDisability" BOOLEAN NOT NULL DEFAULT false,
    "TypeofSpecificLearningDisability" TEXT,
    "AutismSpectrumDisorder" BOOLEAN NOT NULL DEFAULT false,
    "AttentionDeficitHyperactiveDisorder" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_FacilitesProvided" ("createdAt", "extraCurricular", "freeTextbooks", "freeUniform", "id", "studentId", "updatedAt") SELECT "createdAt", "extraCurricular", "freeTextbooks", "freeUniform", "id", "studentId", "updatedAt" FROM "FacilitesProvided";
DROP TABLE "FacilitesProvided";
ALTER TABLE "new_FacilitesProvided" RENAME TO "FacilitesProvided";
CREATE TABLE "new_GovRequiredDetails" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "studentId" INTEGER NOT NULL,
    "aadhaarNumber" TEXT NOT NULL,
    "aadhaarName" TEXT NOT NULL,
    "socialCategory" TEXT,
    "minorityGroup" TEXT,
    "nationality" TEXT,
    "bplBeneficiary" BOOLEAN NOT NULL DEFAULT false,
    "antyodayaBeneficiary" BOOLEAN NOT NULL DEFAULT false,
    "disadvantagedGroup" TEXT,
    "OutofschoolChild" BOOLEAN NOT NULL,
    "cwsn" BOOLEAN NOT NULL DEFAULT false,
    "disabilityDetails" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_GovRequiredDetails" ("aadhaarName", "aadhaarNumber", "antyodayaBeneficiary", "bplBeneficiary", "createdAt", "cwsn", "disabilityDetails", "disadvantagedGroup", "id", "minorityGroup", "nationality", "socialCategory", "studentId", "updatedAt") SELECT "aadhaarName", "aadhaarNumber", "antyodayaBeneficiary", "bplBeneficiary", "createdAt", "cwsn", "disabilityDetails", "disadvantagedGroup", "id", "minorityGroup", "nationality", "socialCategory", "studentId", "updatedAt" FROM "GovRequiredDetails";
DROP TABLE "GovRequiredDetails";
ALTER TABLE "new_GovRequiredDetails" RENAME TO "GovRequiredDetails";
CREATE UNIQUE INDEX "GovRequiredDetails_studentId_key" ON "GovRequiredDetails"("studentId");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "role" TEXT DEFAULT 'ADMIN',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "email", "hashedPassword", "id", "role", "updatedAt") SELECT "createdAt", "email", "hashedPassword", "id", "role", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
