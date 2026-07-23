import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import Database from 'better-sqlite3'

const db = new Database('prisma/dev.db')
const adapter = new PrismaBetterSqlite3(db)
const prisma = new PrismaClient({ adapter })

async function main() {
  // Array of 5 teachers
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
    
    // Add 3 schedules for each teacher starting from tomorrow
    for (let i = 1; i <= 3; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      date.setHours(14 + i, 0, 0, 0); // 15:00, 16:00, 17:00

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
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
