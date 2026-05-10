"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddSpecialtyDto = exports.CreateAvailabilityDto = exports.CreateCertificationDto = exports.QueryTrainersDto = exports.UpdateLocationDto = exports.UpdateTrainerProfileDto = exports.CreateTrainerProfileDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
class CreateTrainerProfileDto {
    bio;
    yearsExperience;
    hourlyRate;
    modalities;
    serviceRadiusKm;
}
exports.CreateTrainerProfileDto = CreateTrainerProfileDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTrainerProfileDto.prototype, "bio", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateTrainerProfileDto.prototype, "yearsExperience", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 60 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateTrainerProfileDto.prototype, "hourlyRate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [String], enum: client_1.Modality }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(client_1.Modality, { each: true }),
    __metadata("design:type", Array)
], CreateTrainerProfileDto.prototype, "modalities", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 10 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateTrainerProfileDto.prototype, "serviceRadiusKm", void 0);
class UpdateTrainerProfileDto extends CreateTrainerProfileDto {
}
exports.UpdateTrainerProfileDto = UpdateTrainerProfileDto;
class UpdateLocationDto {
    lat;
    lng;
    locationLabel;
}
exports.UpdateLocationDto = UpdateLocationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: -12.1219 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateLocationDto.prototype, "lat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: -77.0428 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateLocationDto.prototype, "lng", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Miraflores, Lima' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateLocationDto.prototype, "locationLabel", void 0);
class QueryTrainersDto {
    lat;
    lng;
    radiusKm;
    goal;
    modality;
    maxPrice;
    minRating;
    page = 1;
    limit = 20;
}
exports.QueryTrainersDto = QueryTrainersDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], QueryTrainersDto.prototype, "lat", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], QueryTrainersDto.prototype, "lng", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], QueryTrainersDto.prototype, "radiusKm", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: client_1.FitnessGoal }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.FitnessGoal),
    __metadata("design:type", String)
], QueryTrainersDto.prototype, "goal", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: client_1.Modality }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.Modality),
    __metadata("design:type", String)
], QueryTrainersDto.prototype, "modality", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], QueryTrainersDto.prototype, "maxPrice", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], QueryTrainersDto.prototype, "minRating", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], QueryTrainersDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 20 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(50),
    __metadata("design:type", Number)
], QueryTrainersDto.prototype, "limit", void 0);
class CreateCertificationDto {
    name;
    issuedBy;
    issuedAt;
    expiresAt;
    documentUrl;
}
exports.CreateCertificationDto = CreateCertificationDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCertificationDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCertificationDto.prototype, "issuedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2020-01-15' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCertificationDto.prototype, "issuedAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2025-01-15' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCertificationDto.prototype, "expiresAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCertificationDto.prototype, "documentUrl", void 0);
class CreateAvailabilityDto {
    day;
    startTime;
    endTime;
}
exports.CreateAvailabilityDto = CreateAvailabilityDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.DayOfWeek }),
    (0, class_validator_1.IsEnum)(client_1.DayOfWeek),
    __metadata("design:type", String)
], CreateAvailabilityDto.prototype, "day", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '06:00' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAvailabilityDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '12:00' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAvailabilityDto.prototype, "endTime", void 0);
class AddSpecialtyDto {
    goal;
}
exports.AddSpecialtyDto = AddSpecialtyDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.FitnessGoal }),
    (0, class_validator_1.IsEnum)(client_1.FitnessGoal),
    __metadata("design:type", String)
], AddSpecialtyDto.prototype, "goal", void 0);
//# sourceMappingURL=trainer.dto.js.map