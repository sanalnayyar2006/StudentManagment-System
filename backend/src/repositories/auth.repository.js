import { prisma } from "../config/prisma.js";
export class AuthRepository {
    async findByEmail(email) {
        return prisma.user.findUnique({ where: { email } });
    }
    async findById(id) {
        return prisma.user.findUnique({ where: { id } });
    }
    async create(data) {
        return prisma.user.create({ data });
    }
}
export const authRepository = new AuthRepository();
//# sourceMappingURL=auth.repository.js.map