import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { AppError } from "./errors/app.error.js";
import authRoutes from "./routes/auth.route.js";
import studentRoutes from "./routes/student.route.js";
import dashboardRoutes from "./routes/dashboard.route.js";
const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.get("/", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Backend is running 🚀",
    });
});
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use((err, _req, res, _next) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Internal server error",
    });
});
export default app;
