import "dotenv/config";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "./generated/prisma/client.js";

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const count = await prisma.school.count();
  if (count > 0) {
    console.log("School already seeded. Count:", count);
    return;
  }

  await prisma.school.create({
    data: {
      name: "Default School",
      udiseCode: "00000000000",
    },
  });

  console.log("School seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
