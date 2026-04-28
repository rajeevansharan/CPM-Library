/**
 * Seed script — migrates existing data/books.json into PostgreSQL
 * 
 * Run with: npx prisma db seed
 * Or directly: node prisma/seed.js
 */

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  const BOOKS_FILE = path.join(__dirname, '..', 'data', 'books.json');

  if (!fs.existsSync(BOOKS_FILE)) {
    console.log('No books.json found — skipping seed.');
    return;
  }

  const raw = fs.readFileSync(BOOKS_FILE, 'utf-8');
  const data = JSON.parse(raw);

  console.log('Starting database seed...');
  console.log(`  Scripture books: ${(data.scriptureBooks || []).length}`);
  console.log(`  Voice books:     ${(data.voiceBooks || []).length}`);
  console.log(`  Pentecost books: ${(data.pentecostBooks || []).length}`);

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
  console.log('  ✓ Scripture books seeded');

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
  console.log('  ✓ Voice books seeded');

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
  console.log('  ✓ Pentecost books seeded');

  console.log('\nSeed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
