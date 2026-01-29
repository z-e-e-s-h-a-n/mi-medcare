/*
  Warnings:

  - Made the column `hash` on table `Media` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Media" ALTER COLUMN "hash" SET NOT NULL;
