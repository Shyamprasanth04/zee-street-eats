-- Create User table
CREATE TABLE IF NOT EXISTS "User" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "password" TEXT NOT NULL,
  "isVerified" BOOLEAN NOT NULL DEFAULT false,
  "verifyToken" TEXT,
  "resetToken" TEXT,
  "resetExpires" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  
  CONSTRAINT "User_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "User_email_key" UNIQUE ("email"),
  CONSTRAINT "User_verifyToken_key" UNIQUE ("verifyToken"),
  CONSTRAINT "User_resetToken_key" UNIQUE ("resetToken")
);

-- Create PreOrder table
CREATE TABLE IF NOT EXISTS "PreOrder" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "eventId" TEXT NOT NULL,
  "vendorId" TEXT NOT NULL,
  "items" JSONB NOT NULL,
  "specialInstructions" TEXT,
  "pickupTime" TIMESTAMP(3) NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'PENDING',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  
  CONSTRAINT "PreOrder_pkey" PRIMARY KEY ("id")
);

-- Create ContactMessage table
CREATE TABLE IF NOT EXISTS "ContactMessage" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "subject" TEXT NOT NULL,
  "message" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'NEW',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  
  CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

-- Create a test user for development (password is "password123")
INSERT INTO "User" ("id", "name", "email", "password", "isVerified", "createdAt", "updatedAt")
VALUES ('cltest123', 'Test User', 'test@example.com', '$2a$10$YDlSwdJ.FdnZC4YhOoRnVeKdXdRpJO0ZSaPgOXmDfAVFE5R22z6rS', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("email") DO NOTHING; 