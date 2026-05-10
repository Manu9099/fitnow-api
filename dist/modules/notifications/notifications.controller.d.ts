import { NotificationsService } from './notifications.service';
declare class FcmTokenDto {
    token: string;
    deviceType: string;
}
export declare class NotificationsController {
    private notificationsService;
    constructor(notificationsService: NotificationsService);
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
    markRead(userId: string, id: string): Promise<import("@prisma/client").Prisma.BatchPayload>;
    markAllRead(userId: string): Promise<{
        message: string;
    }>;
    registerToken(userId: string, dto: FcmTokenDto): Promise<{
        token: string;
        id: string;
        createdAt: Date;
        userId: string;
        deviceType: string | null;
    }>;
}
export {};
