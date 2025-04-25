-- CreateEnum
CREATE TYPE "AppealStatus" AS ENUM ('NEW', 'AT_WORK', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "appeals" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "AppealStatus" NOT NULL DEFAULT 'NEW',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "appeals_pkey" PRIMARY KEY ("id")
);
