const { PrismaClient } = require('../src/generated/prisma/client');
const { PrismaLibSql } = require('@prisma/adapter-libsql');

const adapter = new PrismaLibSql({ url: 'file:dev.db' });
const prisma = new PrismaClient({ adapter });

async function main() {
  const teachersData = [
    { name: 'Katsumoto Sensei', specialty: 'Kanji e História', price: 60.0, imageUrl: '/images/avatars/ronin.png' },
    { name: 'Yumi Sensei', specialty: 'Conversação Natural', price: 60.0, imageUrl: '/images/avatars/onna.png' },
    { name: 'Kenji Sensei', specialty: 'Gramática N5-N4', price: 60.0, imageUrl: '/images/avatars/shinobi.png' },
    { name: 'Hikari Sensei', specialty: 'Preparatório JLPT', price: 60.0, imageUrl: null },
    { name: 'Ryu Sensei', specialty: 'Keigo (Linguagem Formal)', price: 60.0, imageUrl: null },
  ];

  console.log('Seeding database with teachers...');
  
  for (const t of teachersData) {
    const teacher = await prisma.teacher.create({ data: t });
    
    for (let i = 1; i <= 3; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      date.setHours(14 + i, 0, 0, 0);

      await prisma.schedule.create({
        data: {
          teacherId: teacher.id,
          date: date,
        }
      });
    }
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
