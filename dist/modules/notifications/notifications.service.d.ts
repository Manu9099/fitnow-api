import { PrismaService } from '../../prisma/prisma.service';
export declare class NotificationsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(userId: string): Promise<any>;
    markRead(userId: string, notifId: string): Promise<any>;
    markAllRead(userId: string): Promise<{
        message: string;
    }>;
    registerFcmToken(userId: string, token: string, deviceType: string): Promise<any>;
    create(userId: string, title: string, body: string, type?: string, metadata?: object): Promise<any>;
}
