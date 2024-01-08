-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "oauth_Token" TEXT,
ADD COLUMN     "oauth_Token_Secret" TEXT,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;
