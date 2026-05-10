import { Controller, Get, Patch, Param, Query, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { AdminService } from './admin.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Admin')
@ApiBearerAuth()
@Roles(UserRole.admin)
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('users')
  @ApiOperation({ summary: 'Listar todos los usuarios' })
  findAllUsers(@Query('page') page = 1, @Query('limit') limit = 20) {
    return this.adminService.findAllUsers(+page, +limit);
  }

  @Patch('users/:id/ban')
  @ApiOperation({ summary: 'Banear usuario' })
  banUser(@Param('id') id: string) {
    return this.adminService.banUser(id);
  }

  @Get('certifications/pending')
  @ApiOperation({ summary: 'Certificaciones pendientes de revisión' })
  pendingCerts() {
    return this.adminService.findPendingCerts();
  }

  @Patch('certifications/:id/verify')
  @ApiOperation({ summary: 'Aprobar o rechazar certificación' })
  verifyCert(
    @Param('id') certId: string,
    @CurrentUser('id') adminId: string,
    @Body('approve') approve: boolean,
  ) {
    return this.adminService.verifyCert(certId, adminId, approve);
  }

  @Get('sessions')
  @ApiOperation({ summary: 'Todas las sesiones' })
  findAllSessions(@Query('page') page = 1, @Query('limit') limit = 20) {
    return this.adminService.findAllSessions(+page, +limit);
  }

  @Get('reports')
  @ApiOperation({ summary: 'Reportes pendientes' })
  findReports() {
    return this.adminService.findAllReports();
  }

  @Patch('reports/:id/resolve')
  @ApiOperation({ summary: 'Resolver reporte' })
  resolveReport(@Param('id') id: string, @CurrentUser('id') adminId: string) {
    return this.adminService.resolveReport(id, adminId);
  }
}
