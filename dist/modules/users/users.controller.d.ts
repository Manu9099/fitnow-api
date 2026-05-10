import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/user.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getMe(userId: string): Promise<any>;
    updateMe(userId: string, dto: UpdateUserDto): Promise<any>;
    deleteMe(userId: string): Promise<{
        message: string;
    }>;
}
