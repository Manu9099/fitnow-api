import {
  Controller, Get, Post, Patch, Delete,
  Body, Param, Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UserRole, FitnessGoal } from '@prisma/client';
import { TrainersService } from './trainers.service';
import {
  CreateTrainerProfileDto, UpdateTrainerProfileDto, UpdateLocationDto,
  QueryTrainersDto, CreateCertificationDto, CreateAvailabilityDto, AddSpecialtyDto,
} from './dto/trainer.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('Trainers')
@ApiBearerAuth()
@Controller('trainers')
export class TrainersController {
  constructor(private trainersService: TrainersService) {}

  // ── Búsqueda pública ─────────────────────────────────────────────────────

  @Public()
  @Get()
  @ApiOperation({ summary: 'Listar trainers con filtros' })
  findAll(@Query() query: QueryTrainersDto) {
    return this.trainersService.findAll(query);
  }

  @Public()
  @Get('nearby')
  @ApiOperation({ summary: 'Trainers cercanos por coordenadas' })
  findNearby(@Query() query: QueryTrainersDto) {
    return this.trainersService.findNearby(query);
  }

  @Public()
  @Get('available-now')
  @ApiOperation({ summary: 'Trainers disponibles ahora mismo' })
  findAvailableNow(@Query() query: QueryTrainersDto) {
    return this.trainersService.findAvailableNow(query);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Perfil público de un trainer' })
  findOne(@Param('id') id: string) {
    return this.trainersService.findById(id);
  }

  // ── Perfil propio ────────────────────────────────────────────────────────

  @Post('profile')
  @Roles(UserRole.trainer)
  @ApiOperation({ summary: 'Crear perfil de trainer' })
  createProfile(@CurrentUser('id') userId: string, @Body() dto: CreateTrainerProfileDto) {
    return this.trainersService.createProfile(userId, dto);
  }

  @Patch('profile')
  @Roles(UserRole.trainer)
  @ApiOperation({ summary: 'Actualizar perfil de trainer' })
  updateProfile(@CurrentUser('id') userId: string, @Body() dto: UpdateTrainerProfileDto) {
    return this.trainersService.updateProfile(userId, dto);
  }

  @Patch('profile/location')
  @Roles(UserRole.trainer)
  @ApiOperation({ summary: 'Actualizar ubicación en tiempo real' })
  updateLocation(@CurrentUser('id') userId: string, @Body() dto: UpdateLocationDto) {
    return this.trainersService.updateLocation(userId, dto);
  }

  @Patch('profile/availability-now')
  @Roles(UserRole.trainer)
  @ApiOperation({ summary: 'Toggle disponible / no disponible ahora' })
  toggleAvailability(
    @CurrentUser('id') userId: string,
    @Body('isAvailable') isAvailable: boolean,
  ) {
    return this.trainersService.toggleAvailability(userId, isAvailable);
  }

  // ── Certificaciones ───────────────────────────────────────────────────────

  @Get('certifications/mine')
  @Roles(UserRole.trainer)
  @ApiOperation({ summary: 'Mis certificaciones' })
  getMyCerts(@CurrentUser('id') userId: string) {
    return this.trainersService.getMyCerts(userId);
  }

  @Post('certifications')
  @Roles(UserRole.trainer)
  @ApiOperation({ summary: 'Agregar certificación' })
  addCert(@CurrentUser('id') userId: string, @Body() dto: CreateCertificationDto) {
    return this.trainersService.addCert(userId, dto);
  }

  @Delete('certifications/:id')
  @Roles(UserRole.trainer)
  @ApiOperation({ summary: 'Eliminar certificación' })
  deleteCert(@CurrentUser('id') userId: string, @Param('id') certId: string) {
    return this.trainersService.deleteCert(userId, certId);
  }

  // ── Disponibilidad ────────────────────────────────────────────────────────

  @Get('availability/mine')
  @Roles(UserRole.trainer)
  @ApiOperation({ summary: 'Mis horarios de disponibilidad' })
  getAvailability(@CurrentUser('id') userId: string) {
    return this.trainersService.getAvailability(userId);
  }

  @Post('availability')
  @Roles(UserRole.trainer)
  @ApiOperation({ summary: 'Agregar bloque horario' })
  addAvailability(@CurrentUser('id') userId: string, @Body() dto: CreateAvailabilityDto) {
    return this.trainersService.addAvailability(userId, dto);
  }

  @Delete('availability/:id')
  @Roles(UserRole.trainer)
  @ApiOperation({ summary: 'Eliminar bloque horario' })
  deleteAvailability(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.trainersService.deleteAvailability(userId, id);
  }

  // ── Especialidades ────────────────────────────────────────────────────────

  @Get('specialties/mine')
  @Roles(UserRole.trainer)
  @ApiOperation({ summary: 'Mis especialidades' })
  getSpecialties(@CurrentUser('id') userId: string) {
    return this.trainersService.getSpecialties(userId);
  }

  @Post('specialties')
  @Roles(UserRole.trainer)
  @ApiOperation({ summary: 'Agregar especialidad' })
  addSpecialty(@CurrentUser('id') userId: string, @Body() dto: AddSpecialtyDto) {
    return this.trainersService.addSpecialty(userId, dto);
  }

  @Delete('specialties/:goal')
  @Roles(UserRole.trainer)
  @ApiOperation({ summary: 'Eliminar especialidad' })
  deleteSpecialty(@CurrentUser('id') userId: string, @Param('goal') goal: FitnessGoal) {
    return this.trainersService.deleteSpecialty(userId, goal);
  }
}
