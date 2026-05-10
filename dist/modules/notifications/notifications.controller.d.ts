import { NotificationsService } from './notifications.service';
declare class FcmTokenDto {
    token: string;
    deviceType: string;
}
export declare class NotificationsController {
    private notificationsService;
    constructor(notificationsService: NotificationsService);
    findAll(userId: string): Promise<any>;
    markRead(userId: string, id: string): Promise<any>;
    markAllRead(userId: string): Promise<{
        message: string;
    }>;
    registerToken(userId: string, dto: FcmTokenDto): Promise<any>;
}
export {};
