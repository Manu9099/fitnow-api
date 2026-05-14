export declare enum PublicRegisterRole {
    client = "client",
    trainer = "trainer"
}
export declare class RegisterDto {
    email: string;
    password: string;
    fullName: string;
    phone?: string;
    role: PublicRegisterRole;
}
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class RefreshTokenDto {
    refreshToken: string;
}
export declare class ForgotPasswordDto {
    email: string;
}
export declare class ResetPasswordDto {
    token: string;
    newPassword: string;
}
