const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  console.log('Cleaning up database...');
  await prisma.savedBook.deleteMany();
  await prisma.scriptureBook.deleteMany();
  await prisma.voiceBook.deleteMany();
  await prisma.pentecostBook.deleteMany();
  await prisma.user.deleteMany();

  console.log('Seeding data...');

  // 0. Mock Users
  const hashedUserPassword = await bcrypt.hash('test', 12);
  const hashedAdminPassword = await bcrypt.hash('test', 12);

  const users = [
    {
      id: 'user_1',
      email: 'user',
      password: hashedUserPassword,
      name: 'John Doe',
      role: 'USER',
      memberId: 'MEM001'
    },
    {
      id: 'admin_1',
      email: 'admin',
      password: hashedAdminPassword,
      name: 'Admin User',
      role: 'ADMIN',
      memberId: 'ADM001'
    }
  ];

  for (const user of users) {
    await prisma.user.create({ data: user });
  }

  // 1. Scripture School Books
  const scriptureBooks = [
    {
      title: 'Grade 8: Understanding Faith',
      grade: 'Grade 8',
      description: 'Foundational principles of the Christian faith for young believers.',
      category: 'Grade',
      type: 'scripture',
      imageUri: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=300',
    },
    {
      title: 'Grade 12: Foundations of Truth',
      grade: 'Grade 12',
      description: 'Advanced theological concepts and apologetics for seniors.',
      category: 'Grade',
      type: 'scripture',
      imageUri: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=300',
    },
    {
      title: 'Grade 2: The Loving Shepherd',
      grade: 'Grade 2',
      description: 'Simple stories of Jesus and His love for children.',
      category: 'Grade',
      type: 'scripture',
      imageUri: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=300',
    }
  ];

  for (const book of scriptureBooks) {
    await prisma.scriptureBook.create({ data: book });
  }

  // 2. Voice of Pentecost
  const voiceBooks = [
    {
      title: 'April 2024 Issue',
      month: 'April',
      year: '2024',
      subtitle: 'Living in the Light',
      description: 'Monthly insights and testimonies from the CPM family.',
      category: 'Topic',
      type: 'voice',
      isNew: true,
      imageUri: 'https://images.unsplash.com/photo-1504270997636-07ddfbd48945?q=80&w=300',
    },
    {
      title: 'March 2024 Issue',
      month: 'March',
      year: '2024',
      subtitle: 'Strength in Weakness',
      description: 'A study on 2 Corinthians and modern faith.',
      category: 'Topic',
      type: 'voice',
      imageUri: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=300',
    }
  ];

  for (const book of voiceBooks) {
    await prisma.voiceBook.create({ data: book });
  }

  // 3. Pentecost Books
  const pentecostBooks = [
    {
      title: 'Spiritual Warfare',
      author: 'Pastor John Doe',
      description: 'A comprehensive guide to understanding spiritual battles.',
      category: 'Theology',
      type: 'pentecost',
      languages: ['English', 'Tamil'],
      imageUri: 'https://images.unsplash.com/photo-1532012197367-e43d0f467e9f?q=80&w=300',
    },
    {
      title: 'The History of CPM',
      author: 'Dr. Jane Smith',
      description: 'Exploring the roots and growth of the Ceylon Pentecostal Mission.',
      category: 'History',
      type: 'pentecost',
      languages: ['English'],
      imageUri: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=300',
    }
  ];

  for (const book of pentecostBooks) {
    await prisma.pentecostBook.create({ data: book });
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
