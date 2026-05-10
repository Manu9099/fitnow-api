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
exports.ClientProfilesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const client_profiles_service_1 = require("./client-profiles.service");
const client_profile_dto_1 = require("./dto/client-profile.dto");
let ClientProfilesController = class ClientProfilesController {
    clientProfilesService;
    constructor(clientProfilesService) {
        this.clientProfilesService = clientProfilesService;
    }
    getProfile(userId) {
        return this.clientProfilesService.getProfile(userId);
    }
    updateProfile(userId, dto) {
        return this.clientProfilesService.updateProfile(userId, dto);
    }
    getWallet(userId) {
        return this.clientProfilesService.getWallet(userId);
    }
    topUpWallet(userId, dto) {
        return this.clientProfilesService.topUpWallet(userId, dto.amount);
    }
};
exports.ClientProfilesController = ClientProfilesController;
__decorate([
    (0, common_1.Get)('profile'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener mi perfil de cliente' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClientProfilesController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Patch)('profile'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar mi perfil de cliente' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, client_profile_dto_1.UpdateClientProfileDto]),
    __metadata("design:returntype", void 0)
], ClientProfilesController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Get)('wallet'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener mi saldo de wallet' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClientProfilesController.prototype, "getWallet", null);
__decorate([
    (0, common_1.Patch)('wallet/top-up'),
    (0, swagger_1.ApiOperation)({ summary: 'Recargar wallet simulada' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, client_profile_dto_1.WalletTopUpDto]),
    __metadata("design:returntype", void 0)
], ClientProfilesController.prototype, "topUpWallet", null);
exports.ClientProfilesController = ClientProfilesController = __decorate([
    (0, swagger_1.ApiTags)('Client Profiles'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.Roles)(client_1.UserRole.client),
    (0, common_1.Controller)('clients'),
    __metadata("design:paramtypes", [client_profiles_service_1.ClientProfilesService])
], ClientProfilesController);
//# sourceMappingURL=client-profiles.controller.js.map