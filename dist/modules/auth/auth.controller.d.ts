import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, RefreshTokenDto } from './dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
    refresh(dto: RefreshTokenDto): Promise<{
        accessToken: any;
        refreshToken: any;
    }>;
    logout(userId: string): Promise<{
        message: string;
    }>;
}
