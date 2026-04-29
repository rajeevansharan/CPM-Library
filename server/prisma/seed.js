/**
 * Seed script — migrates existing data/books.json into PostgreSQL
 * and sets up mock admin/user accounts.
 * 
 * Run with: npm run db:seed
 */

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  // ─── Seed Users ───────────────────────────────────────────────────────────
  console.log('Seeding users...');
  
  const users = [
    {
      email: 'admin@cpm.com',
      password: 'admin123', // In production, use hashed passwords
      role: 'ADMIN',
      name: 'CPM Admin'
    },
    {
      email: 'user@cpm.com',
      password: 'user123',
      role: 'USER',
      name: 'CPM Member'
    }
  ];

  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: u
    });
  }
  console.log('  ✓ Users seeded (admin@cpm.com / user@cpm.com)');

  // ─── Seed Books from books.json ───────────────────────────────────────────
  const BOOKS_FILE = path.join(__dirname, '..', 'data', 'books.json');

  if (!fs.existsSync(BOOKS_FILE)) {
    console.log('No books.json found — skipping book seed.');
    return;
  }

  const raw = fs.readFileSync(BOOKS_FILE, 'utf-8');
  const data = JSON.parse(raw);

  console.log('Seeding books from JSON...');
  
  // ── Seed Scripture Books ───────────────────────────────────────────────
  for (const book of (data.scriptureBooks || [])) {
    await prisma.scriptureBook.upsert({
      where: { id: book.id },
      update: {},
      create: {
        id: book.id,
        title: book.title || '',
        grade: book.grade || '',
        description: book.description || null,
        imageUri: book.imageUri || null,
        fileUrl: book.fileUrl || null,
        category: book.category || 'Grade',
        type: book.type || 'scripture',
      },
    });
  }
  console.log(`  ✓ ${(data.scriptureBooks || []).length} Scripture books seeded`);

  // ── Seed Voice Books ───────────────────────────────────────────────────
  for (const book of (data.voiceBooks || [])) {
    await prisma.voiceBook.upsert({
      where: { id: book.id },
      update: {},
      create: {
        id: book.id,
        title: book.title || '',
        month: book.month || '',
        year: book.year || '',
        subtitle: book.subtitle || null,
        description: book.description || null,
        imageUri: book.imageUri || null,
        fileUrl: book.fileUrl || null,
        category: book.category || 'Topic',
        type: book.type || 'voice',
        isNew: book.isNew || false,
      },
    });
  }
  console.log(`  ✓ ${(data.voiceBooks || []).length} Voice books seeded`);

  // ── Seed Pentecost Books ───────────────────────────────────────────────
  for (const book of (data.pentecostBooks || [])) {
    await prisma.pentecostBook.upsert({
      where: { id: book.id },
      update: {},
      create: {
        id: book.id,
        title: book.title || '',
        author: book.author || null,
        description: book.description || null,
        category: book.category || 'General',
        languages: book.languages || [],
        imageUri: book.imageUri || null,
        fileUrl: book.fileUrl || null,
        type: book.type || 'pentecost',
      },
    });
  }
  console.log(`  ✓ ${(data.pentecostBooks || []).length} Pentecost books seeded`);

  console.log('\nAll seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
