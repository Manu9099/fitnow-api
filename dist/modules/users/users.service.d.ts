import { PrismaService } from '../../prisma/prisma.service';
import { UpdateUserDto } from './dto/user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findMe(userId: string): Promise<any>;
    update(userId: string, dto: UpdateUserDto): Promise<any>;
    updateAvatar(userId: string, avatarUrl: string): Promise<any>;
    deactivate(userId: string): Promise<{
        message: string;
    }>;
}
