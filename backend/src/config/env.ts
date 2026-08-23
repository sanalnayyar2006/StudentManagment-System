import "dotenv/config";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is required");
}

if (process.env.NODE_ENV === "production" && process.env.JWT_SECRET === "local-dev-secret-change-in-production") {
  throw new Error("JWT_SECRET must be changed in production");
}

export const env = {
  PORT: process.env.PORT ? Number(process.env.PORT) : 5000,
  DATABASE_URL: process.env.DATABASE_URL ?? "file:./database/school.db",
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? "7d",
  NODE_ENV: process.env.NODE_ENV ?? "development",
  TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN,
} as const;
