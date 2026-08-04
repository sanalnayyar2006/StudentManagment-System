import {} from "express";
import { env } from "../config/env.js";
import { authService } from "../services/auth.service.js";
export class AuthController {
    async register(req, res) {
        const { email, password } = req.body;
        const result = await authService.register({ email, password });
        res.cookie("token", result.accessToken, {
            httpOnly: true,
            secure: env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: { user: result.user },
        });
    }
    async login(req, res) {
        const { email, password } = req.body;
        const result = await authService.login(email, password);
        res.cookie("token", result.accessToken, {
            httpOnly: true,
            secure: env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: { user: result.user },
        });
    }
    async logout(_req, res) {
        res.clearCookie("token");
        res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    }
    async getMe(req, res) {
        const user = await authService.getMe(req.user.userId);
        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: user,
        });
    }
}
export const authController = new AuthController();
