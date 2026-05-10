import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaymentMethod } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CheckoutPaymentDto {
  @ApiProperty({ enum: PaymentMethod, example: PaymentMethod.yape })
  @IsEnum(PaymentMethod)
  method: PaymentMethod;
}

export class ConfirmPaymentDto {
  @ApiPropertyOptional({ example: 'EXT-123456' })
  @IsOptional()
  @IsString()
  externalPaymentId?: string;

  @ApiPropertyOptional({ example: 'approved' })
  @IsOptional()
  @IsString()
  externalStatus?: string;
}

export class RefundPaymentDto {
  @ApiPropertyOptional({ example: 30 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  amount?: number;

  @ApiPropertyOptional({ example: 'Cancelación aprobada por soporte' })
  @IsOptional()
  @IsString()
  reason?: string;
}