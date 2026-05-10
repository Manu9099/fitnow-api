import { UserRole } from '@prisma/client';
import { SessionsService } from './sessions.service';
import { CreateSessionDto, CancelSessionDto, QuerySessionsDto } from './dto/session.dto';
export declare class SessionsController {
    private sessionsService;
    constructor(sessionsService: SessionsService);
    create(userId: string, dto: CreateSessionDto): Promise<any>;
    findMine(userId: string, role: UserRole, query: QuerySessionsDto): Promise<{
        data: any;
        total: any;
        page: number;
        limit: number;
    }>;
    upcoming(userId: string, role: UserRole): Promise<any>;
    history(userId: string, role: UserRole): Promise<any>;
    findOne(id: string, userId: string, role: UserRole): Promise<any>;
    confirm(id: string, userId: string): Promise<any>;
    start(id: string, userId: string): Promise<any>;
    complete(id: string, userId: string): Promise<any>;
    cancel(id: string, userId: string, dto: CancelSessionDto): Promise<any>;
}
