-- AlterTable
ALTER TABLE "Challenge" ADD COLUMN     "creatorId" TEXT;

-- CreateIndex
CREATE INDEX "Challenge_creatorId_idx" ON "Challenge"("creatorId");
