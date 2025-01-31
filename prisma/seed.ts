import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  await prisma.todo.createMany({
    data: Array.from({ length: 20 }, () => ({
      title: faker.lorem.words({ min: 5, max: 20 }),
      body: faker.lorem.words({ min: 10, max: 30 }),
      user_id: "",
    })),
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
