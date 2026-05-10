import {
  IsOptional, IsString, IsNumber, IsEnum, IsBoolean,
  IsArray, Min, Max, IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Modality, FitnessGoal, DayOfWeek, CertStatus } from '@prisma/client';

export class CreateTrainerProfileDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  yearsExperience?: number;

  @ApiProperty({ example: 60 })
  @IsNumber()
  @Min(1)
  hourlyRate: number;

  @ApiPropertyOptional({ type: [String], enum: Modality })
  @IsOptional()
  @IsArray()
  @IsEnum(Modality, { each: true })
  modalities?: Modality[];

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @IsInt()
  @Min(1)
  serviceRadiusKm?: number;
}

export class UpdateTrainerProfileDto extends CreateTrainerProfileDto {}

export class UpdateLocationDto {
  @ApiProperty({ example: -12.1219 })
  @IsNumber()
  lat: number;

  @ApiProperty({ example: -77.0428 })
  @IsNumber()
  lng: number;

  @ApiPropertyOptional({ example: 'Miraflores, Lima' })
  @IsOptional()
  @IsString()
  locationLabel?: string;
}

export class QueryTrainersDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  lat?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  lng?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  radiusKm?: number;

  @ApiPropertyOptional({ enum: FitnessGoal })
  @IsOptional()
  @IsEnum(FitnessGoal)
  goal?: FitnessGoal;

  @ApiPropertyOptional({ enum: Modality })
  @IsOptional()
  @IsEnum(Modality)
  modality?: Modality;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxPrice?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minRating?: number;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ default: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number = 20;
}

export class CreateCertificationDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  issuedBy: string;

  @ApiProperty({ example: '2020-01-15' })
  @IsString()
  issuedAt: string;

  @ApiPropertyOptional({ example: '2025-01-15' })
  @IsOptional()
  @IsString()
  expiresAt?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  documentUrl?: string;
}

export class CreateAvailabilityDto {
  @ApiProperty({ enum: DayOfWeek })
  @IsEnum(DayOfWeek)
  day: DayOfWeek;

  @ApiProperty({ example: '06:00' })
  @IsString()
  startTime: string;

  @ApiProperty({ example: '12:00' })
  @IsString()
  endTime: string;
}

export class AddSpecialtyDto {
  @ApiProperty({ enum: FitnessGoal })
  @IsEnum(FitnessGoal)
  goal: FitnessGoal;
}
