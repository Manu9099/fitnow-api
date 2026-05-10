import { PrismaService } from '../../prisma/prisma.service';
export declare class NotificationsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(userId: string): Promise<{
        type: string | null;
        title: string;
        id: string;
        createdAt: Date;
        userId: string;
        body: string;
        metadata: import("@prisma/client/runtime/library").JsonValue;
        isRead: boolean;
        sentAt: Date | null;
    }[]>;
    markRead(userId: string, notifId: string): Promise<import("@prisma/client").Prisma.BatchPayload>;
    markAllRead(userId: string): Promise<{
        message: string;
    }>;
    registerFcmToken(userId: string, token: string, deviceType: string): Promise<{
        token: string;
        id: string;
        createdAt: Date;
        userId: string;
        deviceType: string | null;
    }>;
    create(userId: string, title: string, body: string, type?: string, metadata?: object): Promise<{
        type: string | null;
        title: string;
        id: string;
        createdAt: Date;
        userId: string;
        body: string;
        metadata: import("@prisma/client/runtime/library").JsonValue;
        isRead: boolean;
        sentAt: Date | null;
    }>;
}
