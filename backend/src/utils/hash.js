import bcrypt from "bcrypt";
export async function hashPassword(plain) {
    return bcrypt.hash(plain, 10);
}
export async function verifyPassword(plain, hashed) {
    return bcrypt.compare(plain, hashed);
}
//# sourceMappingURL=hash.js.map