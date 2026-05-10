import { AdminService } from './admin.service';
export declare class AdminController {
    private adminService;
    constructor(adminService: AdminService);
    findAllUsers(page?: number, limit?: number): any;
    banUser(id: string): Promise<any>;
    pendingCerts(): any;
    verifyCert(certId: string, adminId: string, approve: boolean): Promise<any>;
    findAllSessions(page?: number, limit?: number): any;
    findReports(): any;
    resolveReport(id: string, adminId: string): any;
}
