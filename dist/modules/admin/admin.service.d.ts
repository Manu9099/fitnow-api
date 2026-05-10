import { PrismaService } from '../../prisma/prisma.service';
export declare class AdminService {
    private prisma;
    constructor(prisma: PrismaService);
    findAllUsers(page?: number, limit?: number): any;
    banUser(id: string): Promise<any>;
    findPendingCerts(): any;
    verifyCert(certId: string, adminId: string, approve: boolean): Promise<any>;
    findAllSessions(page?: number, limit?: number): any;
    findAllReports(): any;
    resolveReport(reportId: string, adminId: string): any;
}
