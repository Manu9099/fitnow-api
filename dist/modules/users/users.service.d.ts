import { PrismaService } from '../../prisma/prisma.service';
import { UpdateUserDto } from './dto/user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findMe(userId: string): Promise<{
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
    update(userId: string, dto: UpdateUserDto): Promise<{
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
    updateAvatar(userId: string, avatarUrl: string): Promise<{
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
    deactivate(userId: string): Promise<{
        message: string;
    }>;
}
