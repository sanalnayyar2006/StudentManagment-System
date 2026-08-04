import { hashPassword, verifyPassword } from "../utils/hash.js";
import { signToken, type TokenPayload } from "../utils/jwt.js";
import { authRepository } from "../repositories/auth.repository.js";
import { AppError } from "../errors/app.error.js";

interface RegisterInput {
  email: string;
  password: string;
}

interface LoginResult {
  accessToken: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export class AuthService {
  async register(input: RegisterInput): Promise<LoginResult> {
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

    const token = signToken({ userId: user.id, role: user.role });

    return {
      accessToken: token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }

  async login(email: string, password: string): Promise<LoginResult> {
    const user = await authRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const isValid = await verifyPassword(password, user.hashedPassword);
    if (!isValid) {
      throw new AppError("Invalid email or password", 401);
    }

    const token = signToken({ userId: user.id, role: user.role });

    return {
      accessToken: token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }

  async getMe(userId: string) {
    const user = await authRepository.findById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}

export const authService = new AuthService();
