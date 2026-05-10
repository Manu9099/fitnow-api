import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  findAllUsers(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    return this.prisma.user.findMany({
      select: { id: true, email: true, fullName: true, role: true, isActive: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    });
  }

  async banUser(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException();
    return this.prisma.user.update({
      where: { id },
      data:  { isActive: false },
      select: { id: true, email: true, isActive: true },
    });
  }

  findPendingCerts() {
    return this.prisma.certification.findMany({
      where:   { status: 'pending' },
      include: { trainer: { include: { user: { select: { fullName: true } } } } },
      orderBy: { createdAt: 'asc' },
    });
  }

  async verifyCert(certId: string, adminId: string, approve: boolean) {
    return this.prisma.certification.update({
      where: { id: certId },
      data: {
        status:      approve ? 'verified' : 'rejected',
        reviewedAt:  new Date(),
        reviewedById: adminId,
      },
    });
  }

  findAllSessions(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    return this.prisma.session.findMany({
      include: {
        trainer: { include: { user: { select: { fullName: true } } } },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    });
  }

  findAllReports() {
    return this.prisma.report.findMany({
      where:   { isResolved: false },
      include: {
        reporter:     { select: { fullName: true } },
        reportedUser: { select: { fullName: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  resolveReport(reportId: string, adminId: string) {
    return this.prisma.report.update({
      where: { id: reportId },
      data: { isResolved: true, resolvedById: adminId, resolvedAt: new Date() },
    });
  }
}
