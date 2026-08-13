import { hashPassword, verifyPassword } from "../utils/hash.js";
import { signToken } from "../utils/jwt.js";
import { authRepository } from "../repositories/auth.repository.js";
import { AppError } from "../errors/app.error.js";
export class AuthService {
    async register(input) {
        const existing = await authRepository.findByEmail(input.email);
        if (existing) {
            throw new AppError("User already exists", 409);
        }
        const hashedPassword = await hashPassword(input.password);
        const user = await authRepository.create({
            email: input.email,
            hashedPassword,
            role: "ADMIN",
        });
        const token = signToken({ userId: user.id, role: user.role ?? "ADMIN" });
        return {
            accessToken: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
    }
    async login(email, password) {
        const user = await authRepository.findByEmail(email);
        if (!user) {
            throw new AppError("Invalid email or password", 401);
        }
        const isValid = await verifyPassword(password, user.hashedPassword);
        if (!isValid) {
            throw new AppError("Invalid email or password", 401);
        }
        const token = signToken({ userId: user.id, role: user.role ?? "ADMIN" });
        return {
            accessToken: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
    }
    async getMe(userId) {
        const user = await authRepository.findById(userId);
        if (!user) {
            throw new AppError("User not found", 404);
        }
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
    async updateProfile(userId, data) {
        const updatedUser = await authRepository.updateUser(userId, data);
        return {
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            createdAt: updatedUser.createdAt,
            updatedAt: updatedUser.updatedAt,
        };
    }
}
export const authService = new AuthService();
