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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const trainers_service_1 = require("./trainers.service");
const trainer_dto_1 = require("./dto/trainer.dto");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const public_decorator_1 = require("../../common/decorators/public.decorator");
let TrainersController = class TrainersController {
    trainersService;
    constructor(trainersService) {
        this.trainersService = trainersService;
    }
    findAll(query) {
        return this.trainersService.findAll(query);
    }
    findNearby(query) {
        return this.trainersService.findNearby(query);
    }
    findAvailableNow(query) {
        return this.trainersService.findAvailableNow(query);
    }
    findOne(id) {
        return this.trainersService.findById(id);
    }
    createProfile(userId, dto) {
        return this.trainersService.createProfile(userId, dto);
    }
    updateProfile(userId, dto) {
        return this.trainersService.updateProfile(userId, dto);
    }
    updateLocation(userId, dto) {
        return this.trainersService.updateLocation(userId, dto);
    }
    toggleAvailability(userId, isAvailable) {
        return this.trainersService.toggleAvailability(userId, isAvailable);
    }
    getMyCerts(userId) {
        return this.trainersService.getMyCerts(userId);
    }
    addCert(userId, dto) {
        return this.trainersService.addCert(userId, dto);
    }
    deleteCert(userId, certId) {
        return this.trainersService.deleteCert(userId, certId);
    }
    getAvailability(userId) {
        return this.trainersService.getAvailability(userId);
    }
    addAvailability(userId, dto) {
        return this.trainersService.addAvailability(userId, dto);
    }
    deleteAvailability(userId, id) {
        return this.trainersService.deleteAvailability(userId, id);
    }
    getSpecialties(userId) {
        return this.trainersService.getSpecialties(userId);
    }
    addSpecialty(userId, dto) {
        return this.trainersService.addSpecialty(userId, dto);
    }
    deleteSpecialty(userId, goal) {
        return this.trainersService.deleteSpecialty(userId, goal);
    }
};
exports.TrainersController = TrainersController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar trainers con filtros' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [trainer_dto_1.QueryTrainersDto]),
    __metadata("design:returntype", void 0)
], TrainersController.prototype, "findAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('nearby'),
    (0, swagger_1.ApiOperation)({ summary: 'Trainers cercanos por coordenadas' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [trainer_dto_1.QueryTrainersDto]),
    __metadata("design:returntype", void 0)
], TrainersController.prototype, "findNearby", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('available-now'),
    (0, swagger_1.ApiOperation)({ summary: 'Trainers disponibles ahora mismo' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [trainer_dto_1.QueryTrainersDto]),
    __metadata("design:returntype", void 0)
], TrainersController.prototype, "findAvailableNow", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Perfil público de un trainer' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrainersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('profile'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.trainer),
    (0, swagger_1.ApiOperation)({ summary: 'Crear perfil de trainer' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, trainer_dto_1.CreateTrainerProfileDto]),
    __metadata("design:returntype", void 0)
], TrainersController.prototype, "createProfile", null);
__decorate([
    (0, common_1.Patch)('profile'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.trainer),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar perfil de trainer' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, trainer_dto_1.UpdateTrainerProfileDto]),
    __metadata("design:returntype", void 0)
], TrainersController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Patch)('profile/location'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.trainer),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar ubicación en tiempo real' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, trainer_dto_1.UpdateLocationDto]),
    __metadata("design:returntype", void 0)
], TrainersController.prototype, "updateLocation", null);
__decorate([
    (0, common_1.Patch)('profile/availability-now'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.trainer),
    (0, swagger_1.ApiOperation)({ summary: 'Toggle disponible / no disponible ahora' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)('isAvailable')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", void 0)
], TrainersController.prototype, "toggleAvailability", null);
__decorate([
    (0, common_1.Get)('certifications/mine'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.trainer),
    (0, swagger_1.ApiOperation)({ summary: 'Mis certificaciones' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrainersController.prototype, "getMyCerts", null);
__decorate([
    (0, common_1.Post)('certifications'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.trainer),
    (0, swagger_1.ApiOperation)({ summary: 'Agregar certificación' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, trainer_dto_1.CreateCertificationDto]),
    __metadata("design:returntype", void 0)
], TrainersController.prototype, "addCert", null);
__decorate([
    (0, common_1.Delete)('certifications/:id'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.trainer),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar certificación' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TrainersController.prototype, "deleteCert", null);
__decorate([
    (0, common_1.Get)('availability/mine'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.trainer),
    (0, swagger_1.ApiOperation)({ summary: 'Mis horarios de disponibilidad' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrainersController.prototype, "getAvailability", null);
__decorate([
    (0, common_1.Post)('availability'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.trainer),
    (0, swagger_1.ApiOperation)({ summary: 'Agregar bloque horario' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, trainer_dto_1.CreateAvailabilityDto]),
    __metadata("design:returntype", void 0)
], TrainersController.prototype, "addAvailability", null);
__decorate([
    (0, common_1.Delete)('availability/:id'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.trainer),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar bloque horario' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TrainersController.prototype, "deleteAvailability", null);
__decorate([
    (0, common_1.Get)('specialties/mine'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.trainer),
    (0, swagger_1.ApiOperation)({ summary: 'Mis especialidades' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrainersController.prototype, "getSpecialties", null);
__decorate([
    (0, common_1.Post)('specialties'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.trainer),
    (0, swagger_1.ApiOperation)({ summary: 'Agregar especialidad' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, trainer_dto_1.AddSpecialtyDto]),
    __metadata("design:returntype", void 0)
], TrainersController.prototype, "addSpecialty", null);
__decorate([
    (0, common_1.Delete)('specialties/:goal'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.trainer),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar especialidad' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('goal')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TrainersController.prototype, "deleteSpecialty", null);
exports.TrainersController = TrainersController = __decorate([
    (0, swagger_1.ApiTags)('Trainers'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('trainers'),
    __metadata("design:paramtypes", [trainers_service_1.TrainersService])
], TrainersController);
//# sourceMappingURL=trainers.controller.js.map