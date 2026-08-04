import "dotenv/config";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "@prisma/client";
import { env } from "./env.js";
const adapter = new PrismaLibSql({
    url: env.DATABASE_URL,
});
export const prisma = new PrismaClient({ adapter });
