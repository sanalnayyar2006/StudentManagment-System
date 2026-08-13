/*
  Warnings:

  - You are about to drop the column `AttentionDeficitHyperactiveDisorder` on the `FacilitesProvided` table. All the data in the column will be lost.
  - You are about to drop the column `AutismSpectrumDisorder` on the `FacilitesProvided` table. All the data in the column will be lost.
  - You are about to drop the column `TypeofSpecificLearningDisability` on the `FacilitesProvided` table. All the data in the column will be lost.
  - You are about to drop the column `OutofschoolChild` on the `GovRequiredDetails` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PreviousAcademicRecord" ADD COLUMN "admittedUnder" TEXT;
ALTER TABLE "PreviousAcademicRecord" ADD COLUMN "appearedForExam" TEXT;
ALTER TABLE "PreviousAcademicRecord" ADD COLUMN "previousClass" TEXT;
ALTER TABLE "PreviousAcademicRecord" ADD COLUMN "previousDaysAttended" TEXT;
ALTER TABLE "PreviousAcademicRecord" ADD COLUMN "previousExamResult" TEXT;
ALTER TABLE "PreviousAcademicRecord" ADD COLUMN "previousMarksPercent" TEXT;
ALTER TABLE "PreviousAcademicRecord" ADD COLUMN "previousSchoolingStatus" TEXT;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN "attendance" REAL;
ALTER TABLE "Student" ADD COLUMN "collectedPercent" INTEGER;
ALTER TABLE "Student" ADD COLUMN "enrollmentDate" DATETIME;
ALTER TABLE "Student" ADD COLUMN "feeOverallStatus" TEXT;
ALTER TABLE "Student" ADD COLUMN "feeStatus" TEXT;
ALTER TABLE "Student" ADD COLUMN "nextDue" TEXT;
ALTER TABLE "Student" ADD COLUMN "parent" TEXT;
ALTER TABLE "Student" ADD COLUMN "prescribedFee" TEXT;
ALTER TABLE "Student" ADD COLUMN "remaining" TEXT;
ALTER TABLE "Student" ADD COLUMN "session" TEXT;
ALTER TABLE "Student" ADD COLUMN "totalPaid" TEXT;

-- AlterTable
ALTER TABLE "StudentClass" ADD COLUMN "gradeNumber" INTEGER;

-- AlterTable
ALTER TABLE "StudentProfile" ADD COLUMN "allergies" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN "name" TEXT;

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
    "typeofSpecificLearningDisability" TEXT,
    "autismSpectrumDisorder" BOOLEAN NOT NULL DEFAULT false,
    "attentionDeficitHyperactiveDisorder" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_FacilitesProvided" ("createdAt", "extraCurricular", "facilityProvidedToCSWN", "freeTextbooks", "freeUniform", "id", "specificLearningDisability", "studentId", "updatedAt") SELECT "createdAt", "extraCurricular", "facilityProvidedToCSWN", "freeTextbooks", "freeUniform", "id", "specificLearningDisability", "studentId", "updatedAt" FROM "FacilitesProvided";
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
    "indianNational" TEXT,
    "bplBeneficiary" BOOLEAN NOT NULL DEFAULT false,
    "antyodayaBeneficiary" BOOLEAN NOT NULL DEFAULT false,
    "disadvantagedGroup" TEXT,
    "outOfSchoolChild" BOOLEAN NOT NULL DEFAULT false,
    "cwsn" BOOLEAN NOT NULL DEFAULT false,
    "disabilityDetails" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_GovRequiredDetails" ("aadhaarName", "aadhaarNumber", "antyodayaBeneficiary", "bplBeneficiary", "createdAt", "cwsn", "disabilityDetails", "disadvantagedGroup", "id", "minorityGroup", "nationality", "socialCategory", "studentId", "updatedAt") SELECT "aadhaarName", "aadhaarNumber", "antyodayaBeneficiary", "bplBeneficiary", "createdAt", "cwsn", "disabilityDetails", "disadvantagedGroup", "id", "minorityGroup", "nationality", "socialCategory", "studentId", "updatedAt" FROM "GovRequiredDetails";
DROP TABLE "GovRequiredDetails";
ALTER TABLE "new_GovRequiredDetails" RENAME TO "GovRequiredDetails";
CREATE UNIQUE INDEX "GovRequiredDetails_studentId_key" ON "GovRequiredDetails"("studentId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
