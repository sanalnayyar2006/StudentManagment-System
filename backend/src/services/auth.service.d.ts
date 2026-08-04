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
export declare class AuthService {
    register(input: RegisterInput): Promise<LoginResult>;
    login(email: string, password: string): Promise<LoginResult>;
    getMe(userId: string): Promise<{
        id: string;
        email: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export declare const authService: AuthService;
export {};
//# sourceMappingURL=auth.service.d.ts.map