import { Body, Controller, Get, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { ClientProfilesService } from './client-profiles.service';
import {
  UpdateClientProfileDto,
  WalletTopUpDto,
} from './dto/client-profile.dto';

@ApiTags('Client Profiles')
@ApiBearerAuth()
@Roles(UserRole.client)
@Controller('clients')
export class ClientProfilesController {
  constructor(private clientProfilesService: ClientProfilesService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Obtener mi perfil de cliente' })
  getProfile(@CurrentUser('id') userId: string) {
    return this.clientProfilesService.getProfile(userId);
  }

  @Patch('profile')
  @ApiOperation({ summary: 'Actualizar mi perfil de cliente' })
  updateProfile(
    @CurrentUser('id') userId: string,
    @Body() dto: UpdateClientProfileDto,
  ) {
    return this.clientProfilesService.updateProfile(userId, dto);
  }

  @Get('wallet')
  @ApiOperation({ summary: 'Obtener mi saldo de wallet' })
  getWallet(@CurrentUser('id') userId: string) {
    return this.clientProfilesService.getWallet(userId);
  }

  @Patch('wallet/top-up')
  @ApiOperation({ summary: 'Recargar wallet simulada' })
  topUpWallet(@CurrentUser('id') userId: string, @Body() dto: WalletTopUpDto) {
    return this.clientProfilesService.topUpWallet(userId, dto.amount);
  }
}