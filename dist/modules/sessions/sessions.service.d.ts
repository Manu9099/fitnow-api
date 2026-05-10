import { PrismaService } from '../../prisma/prisma.service';
import { CreateSessionDto, CancelSessionDto, QuerySessionsDto } from './dto/session.dto';
import { UserRole } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
export declare class SessionsService {
    private prisma;
    private config;
    constructor(prisma: PrismaService, config: ConfigService);
    create(clientId: string, dto: CreateSessionDto): Promise<any>;
    findMine(userId: string, role: UserRole, query: QuerySessionsDto): Promise<{
        data: any;
        total: any;
        page: number;
        limit: number;
    }>;
    findById(id: string, userId: string, role: UserRole): Promise<any>;
    confirm(sessionId: string, userId: string): Promise<any>;
    start(sessionId: string, userId: string): Promise<any>;
    complete(sessionId: string, userId: string): Promise<any>;
    cancel(sessionId: string, userId: string, dto: CancelSessionDto): Promise<any>;
    findUpcoming(userId: string, role: UserRole): Promise<any>;
    findHistory(userId: string, role: UserRole): Promise<any>;
    private getSessionForTrainer;
    private assertStatus;
    private updateStatus;
}
