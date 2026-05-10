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
exports.SessionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const sessions_service_1 = require("./sessions.service");
const session_dto_1 = require("./dto/session.dto");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
let SessionsController = class SessionsController {
    sessionsService;
    constructor(sessionsService) {
        this.sessionsService = sessionsService;
    }
    create(userId, dto) {
        return this.sessionsService.create(userId, dto);
    }
    findMine(userId, role, query) {
        return this.sessionsService.findMine(userId, role, query);
    }
    upcoming(userId, role) {
        return this.sessionsService.findUpcoming(userId, role);
    }
    history(userId, role) {
        return this.sessionsService.findHistory(userId, role);
    }
    findOne(id, userId, role) {
        return this.sessionsService.findById(id, userId, role);
    }
    confirm(id, userId) {
        return this.sessionsService.confirm(id, userId);
    }
    start(id, userId) {
        return this.sessionsService.start(id, userId);
    }
    complete(id, userId) {
        return this.sessionsService.complete(id, userId);
    }
    cancel(id, userId, dto) {
        return this.sessionsService.cancel(id, userId, dto);
    }
};
exports.SessionsController = SessionsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(client_1.UserRole.client),
    (0, swagger_1.ApiOperation)({ summary: 'Crear reserva (programada u on-demand)' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, session_dto_1.CreateSessionDto]),
    __metadata("design:returntype", void 0)
], SessionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Mis sesiones' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('role')),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, session_dto_1.QuerySessionsDto]),
    __metadata("design:returntype", void 0)
], SessionsController.prototype, "findMine", null);
__decorate([
    (0, common_1.Get)('upcoming'),
    (0, swagger_1.ApiOperation)({ summary: 'Próximas sesiones' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], SessionsController.prototype, "upcoming", null);
__decorate([
    (0, common_1.Get)('history'),
    (0, swagger_1.ApiOperation)({ summary: 'Historial de sesiones completadas' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], SessionsController.prototype, "history", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Detalle de una sesión' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, current_user_decorator_1.CurrentUser)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], SessionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/confirm'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.trainer),
    (0, swagger_1.ApiOperation)({ summary: 'Trainer acepta la sesión' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], SessionsController.prototype, "confirm", null);
__decorate([
    (0, common_1.Patch)(':id/start'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.trainer),
    (0, swagger_1.ApiOperation)({ summary: 'Marcar sesión en progreso' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], SessionsController.prototype, "start", null);
__decorate([
    (0, common_1.Patch)(':id/complete'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.trainer),
    (0, swagger_1.ApiOperation)({ summary: 'Completar sesión' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], SessionsController.prototype, "complete", null);
__decorate([
    (0, common_1.Patch)(':id/cancel'),
    (0, swagger_1.ApiOperation)({ summary: 'Cancelar sesión' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, session_dto_1.CancelSessionDto]),
    __metadata("design:returntype", void 0)
], SessionsController.prototype, "cancel", null);
exports.SessionsController = SessionsController = __decorate([
    (0, swagger_1.ApiTags)('Sessions'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('sessions'),
    __metadata("design:paramtypes", [sessions_service_1.SessionsService])
], SessionsController);
//# sourceMappingURL=sessions.controller.js.map