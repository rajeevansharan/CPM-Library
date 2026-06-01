-- CreateTable
CREATE TABLE "scripture_books" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "description" TEXT,
    "imageUri" TEXT,
    "fileUrl" TEXT,
    "category" TEXT NOT NULL DEFAULT 'Grade',
    "type" TEXT NOT NULL DEFAULT 'scripture',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "scripture_books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "voice_books" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "month" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT,
    "imageUri" TEXT,
    "fileUrl" TEXT,
    "category" TEXT NOT NULL DEFAULT 'Topic',
    "type" TEXT NOT NULL DEFAULT 'voice',
    "languages" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "isNew" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "voice_books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pentecost_books" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT,
    "description" TEXT,
    "category" TEXT NOT NULL DEFAULT 'General',
    "languages" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "imageUri" TEXT,
    "fileUrl" TEXT,
    "type" TEXT NOT NULL DEFAULT 'pentecost',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pentecost_books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "name" TEXT,
    "memberId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saved_books" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "bookType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "saved_books_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_memberId_key" ON "users"("memberId");

-- CreateIndex
CREATE UNIQUE INDEX "saved_books_userId_bookId_bookType_key" ON "saved_books"("userId", "bookId", "bookType");

-- AddForeignKey
ALTER TABLE "saved_books" ADD CONSTRAINT "saved_books_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
