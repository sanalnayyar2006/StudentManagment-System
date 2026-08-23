import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { AppError } from "./errors/app.error.js";
import authRoutes from "./routes/auth.route.js";
import studentRoutes from "./routes/student.route.js";
import dashboardRoutes from "./routes/dashboard.route.js";
import { prisma } from "./config/prisma.js";

const app = express();

const corsOrigin = process.env.CORS_ORIGIN || true
app.use(cors({ origin: corsOrigin, credentials: true }));
app.use(cookieParser());
app.use(express.json());

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is running 🚀",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  // path to frontend dist. From backend/dist/app.js it is ../../../dist. From backend/src/app.ts it is ../../dist
  // To be safe regardless of running from src or dist, we can use process.cwd() if started from backend, but __dirname is safer:
  const frontendDistPath = path.join(__dirname, "..", "..", "..", "dist");
  app.use(express.static(frontendDistPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"));
  });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }
  const message = err.message || "Internal server error"
  console.error(err.stack)
  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === "development" ? message : "Internal server error",
  })
})

prisma.school.count().then(async (count) => {
  if (count === 0) {
    await prisma.school.create({
      data: { name: "Default School", udiseCode: "00000000000" },
    });
    console.log("Seeded default school");
  }
}).catch((e) => {
  console.error("Failed to seed default school:", e);
});

export default app;
