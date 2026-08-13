import { type Request, type Response } from "express";
import { env } from "../config/env.js";
import { authService } from "../services/auth.service.js";

export class AuthController {
  async register(req: Request, res: Response) {
    const { email, password } = req.body;
    const result = await authService.register({ email, password });

    res.cookie("token", result.accessToken, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: { user: result.user },
    });
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const result = await authService.login(email, password);

    res.cookie("token", result.accessToken, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: { user: result.user },
    });
  }

  async logout(_req: Request, res: Response) {
    res.clearCookie("token");
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  }

  async getMe(req: Request, res: Response) {
    const user = await authService.getMe(req.user!.userId);
    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  }

  async updateProfile(req: Request, res: Response) {
    const { name, role } = req.body;
    const updated = await authService.updateProfile(req.user!.userId, { name, role });
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updated,
    });
  }
}

export const authController = new AuthController();
