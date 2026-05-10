import { Controller, Get, Post, Patch, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { SessionsService } from './sessions.service';
import { CreateSessionDto, CancelSessionDto, QuerySessionsDto } from './dto/session.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('Sessions')
@ApiBearerAuth()
@Controller('sessions')
export class SessionsController {
  constructor(private sessionsService: SessionsService) {}

  @Post()
  @Roles(UserRole.client)
  @ApiOperation({ summary: 'Crear reserva (programada u on-demand)' })
  create(@CurrentUser('id') userId: string, @Body() dto: CreateSessionDto) {
    return this.sessionsService.create(userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Mis sesiones' })
  findMine(
    @CurrentUser('id') userId: string,
    @CurrentUser('role') role: UserRole,
    @Query() query: QuerySessionsDto,
  ) {
    return this.sessionsService.findMine(userId, role, query);
  }

  @Get('upcoming')
  @ApiOperation({ summary: 'Próximas sesiones' })
  upcoming(@CurrentUser('id') userId: string, @CurrentUser('role') role: UserRole) {
    return this.sessionsService.findUpcoming(userId, role);
  }

  @Get('history')
  @ApiOperation({ summary: 'Historial de sesiones completadas' })
  history(@CurrentUser('id') userId: string, @CurrentUser('role') role: UserRole) {
    return this.sessionsService.findHistory(userId, role);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detalle de una sesión' })
  findOne(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
    @CurrentUser('role') role: UserRole,
  ) {
    return this.sessionsService.findById(id, userId, role);
  }

  @Patch(':id/confirm')
  @Roles(UserRole.trainer)
  @ApiOperation({ summary: 'Trainer acepta la sesión' })
  confirm(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.sessionsService.confirm(id, userId);
  }

  @Patch(':id/start')
  @Roles(UserRole.trainer)
  @ApiOperation({ summary: 'Marcar sesión en progreso' })
  start(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.sessionsService.start(id, userId);
  }

  @Patch(':id/complete')
  @Roles(UserRole.trainer)
  @ApiOperation({ summary: 'Completar sesión' })
  complete(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.sessionsService.complete(id, userId);
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancelar sesión' })
  cancel(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
    @Body() dto: CancelSessionDto,
  ) {
    return this.sessionsService.cancel(id, userId, dto);
  }
}
