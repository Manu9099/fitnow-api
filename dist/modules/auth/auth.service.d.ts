import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
export declare class AuthService {
    private prisma;
    private jwt;
    private config;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService);
    register(dto: RegisterDto): Promise<{
        accessToken: any;
        refreshToken: any;
        user: any;
    }>;
    login(dto: LoginDto): Promise<{
        accessToken: any;
        refreshToken: any;
        user: {
            id: any;
            email: any;
            fullName: any;
            role: any;
        };
    }>;
    refresh(refreshToken: string): Promise<{
        accessToken: any;
        refreshToken: any;
    }>;
    logout(userId: string): Promise<{
        message: string;
    }>;
    private generateTokens;
    private saveRefreshToken;
}
