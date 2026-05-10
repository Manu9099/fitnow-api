import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FitnessGoal, Modality } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class UpdateClientProfileDto {
  @ApiPropertyOptional({ enum: FitnessGoal, isArray: true })
  @IsOptional()
  @IsArray()
  @IsEnum(FitnessGoal, { each: true })
  goals?: FitnessGoal[];

  @ApiPropertyOptional({ example: 'beginner' })
  @IsOptional()
  @IsString()
  fitnessLevel?: string;

  @ApiPropertyOptional({ example: 'Dolor lumbar ocasional' })
  @IsOptional()
  @IsString()
  injuriesNotes?: string;

  @ApiPropertyOptional({ enum: Modality, isArray: true })
  @IsOptional()
  @IsArray()
  @IsEnum(Modality, { each: true })
  preferredModalities?: Modality[];
}

export class WalletTopUpDto {
  @ApiProperty({ example: 50 })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  amount: number;
}