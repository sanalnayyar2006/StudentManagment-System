export declare class AuthRepository {
    findByEmail(email: string): Promise<{
        id: string;
        email: string;
        hashedPassword: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    findById(id: string): Promise<{
        id: string;
        email: string;
        hashedPassword: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    create(data: {
        email: string;
        hashedPassword: string;
        role: string;
    }): Promise<{
        id: string;
        email: string;
        hashedPassword: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export declare const authRepository: AuthRepository;
//# sourceMappingURL=auth.repository.d.ts.map