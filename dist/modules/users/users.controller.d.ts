import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/user.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getMe(userId: string): Promise<{
        email: string;
        fullName: string;
        phone: string | null;
        role: import("@prisma/client").$Enums.UserRole;
        id: string;
        avatarUrl: string | null;
        isActive: boolean;
        isEmailVerified: boolean;
        createdAt: Date;
    }>;
    updateMe(userId: string, dto: UpdateUserDto): Promise<{
        email: string;
        fullName: string;
        phone: string | null;
        role: import("@prisma/client").$Enums.UserRole;
        id: string;
        avatarUrl: string | null;
        isActive: boolean;
        isEmailVerified: boolean;
        createdAt: Date;
    }>;
    deleteMe(userId: string): Promise<{
        message: string;
    }>;
}
