import { prisma } from "../config/prisma.js";

export class AuthRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }

  async create(data: { email: string; hashedPassword: string; role: string }) {
    return prisma.user.create({ data });
  }

  async updateUser(id: string, data: { name?: string; role?: string }) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }
}

export const authRepository = new AuthRepository();
