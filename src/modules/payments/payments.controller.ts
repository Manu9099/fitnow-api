import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import {
  CheckoutPaymentDto,
  ConfirmPaymentDto,
  RefundPaymentDto,
} from './dto/payment.dto';
import { PaymentsService } from './payments.service';

@ApiTags('Payments')
@ApiBearerAuth()
@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post('sessions/:sessionId/checkout')
  @Roles(UserRole.client)
  @ApiOperation({ summary: 'Crear checkout de pago para una sesión' })
  checkout(
    @CurrentUser('id') clientId: string,
    @Param('sessionId') sessionId: string,
    @Body() dto: CheckoutPaymentDto,
  ) {
    return this.paymentsService.checkout(clientId, sessionId, dto);
  }

  @Patch(':id/confirm')
  @Roles(UserRole.client, UserRole.admin)
  @ApiOperation({ summary: 'Confirmar pago simulado o externo' })
  confirm(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
    @CurrentUser('role') role: UserRole,
    @Body() dto: ConfirmPaymentDto,
  ) {
    return this.paymentsService.confirm(id, userId, role, dto);
  }

  @Patch(':id/refund')
  @Roles(UserRole.admin)
  @ApiOperation({ summary: 'Reembolsar pago' })
  refund(@Param('id') id: string, @Body() dto: RefundPaymentDto) {
    return this.paymentsService.refund(id, dto);
  }

  @Get('me')
  @Roles(UserRole.client)
  @ApiOperation({ summary: 'Mis pagos' })
  findMine(@CurrentUser('id') clientId: string) {
    return this.paymentsService.findMine(clientId);
  }
}