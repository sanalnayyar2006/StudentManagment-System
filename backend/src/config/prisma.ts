import "dotenv/config";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "../../prisma/generated/prisma/client.js";
import { env } from "./env.js";
const adapter = new PrismaLibSql({
  url: env.DATABASE_URL,
  authToken: env.TURSO_AUTH_TOKEN
});
export const prisma = new PrismaClient({ adapter });
