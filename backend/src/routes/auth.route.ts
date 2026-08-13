import { Router } from "express";
import { z } from "zod";
import rateLimit from "express-rate-limit";
import { authController } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: "Too many login attempts, please try again later" },
  standardHeaders: true,
  legacyHeaders: false,
});

const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: { success: false, message: "Too many registration attempts, please try again later" },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/register", registerLimiter, (req, res, next) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: parsed.error.flatten(),
    });
  }
  req.body = parsed.data;
  next();
}, authController.register);

router.post("/login", loginLimiter, (req, res, next) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: parsed.error.flatten(),
    });
  }
  req.body = parsed.data;
  next();
}, authController.login);

router.post("/logout", authMiddleware, authController.logout);

router.get("/me", authMiddleware, authController.getMe);

const profileSchema = z.object({
  name: z.string().optional(),
  role: z.string().optional(),
});

router.put("/profile", authMiddleware, (req, res, next) => {
  const parsed = profileSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: parsed.error.flatten(),
    });
  }
  req.body = parsed.data;
  next();
}, authController.updateProfile);

export default router;
