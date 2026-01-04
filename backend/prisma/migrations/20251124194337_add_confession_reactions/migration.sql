-- CreateEnum
CREATE TYPE "ReactionType" AS ENUM ('LIKE', 'DISLIKE');

-- CreateTable
CREATE TABLE "ConfessionReaction" (
    "id" TEXT NOT NULL,
    "confessionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "ReactionType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConfessionReaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ConfessionReaction_confessionId_idx" ON "ConfessionReaction"("confessionId");

-- CreateIndex
CREATE INDEX "ConfessionReaction_userId_idx" ON "ConfessionReaction"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ConfessionReaction_confessionId_userId_key" ON "ConfessionReaction"("confessionId", "userId");

-- AddForeignKey
ALTER TABLE "ConfessionReaction" ADD CONSTRAINT "ConfessionReaction_confessionId_fkey" FOREIGN KEY ("confessionId") REFERENCES "Confession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConfessionReaction" ADD CONSTRAINT "ConfessionReaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "AnonymousUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
