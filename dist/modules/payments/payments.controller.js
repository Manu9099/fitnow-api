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
exports.PaymentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const payment_dto_1 = require("./dto/payment.dto");
const payments_service_1 = require("./payments.service");
let PaymentsController = class PaymentsController {
    paymentsService;
    constructor(paymentsService) {
        this.paymentsService = paymentsService;
    }
    checkout(clientId, sessionId, dto) {
        return this.paymentsService.checkout(clientId, sessionId, dto);
    }
    confirm(id, userId, role, dto) {
        return this.paymentsService.confirm(id, userId, role, dto);
    }
    refund(id, dto) {
        return this.paymentsService.refund(id, dto);
    }
    findMine(clientId) {
        return this.paymentsService.findMine(clientId);
    }
};
exports.PaymentsController = PaymentsController;
__decorate([
    (0, common_1.Post)('sessions/:sessionId/checkout'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.client),
    (0, swagger_1.ApiOperation)({ summary: 'Crear checkout de pago para una sesión' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('sessionId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, payment_dto_1.CheckoutPaymentDto]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "checkout", null);
__decorate([
    (0, common_1.Patch)(':id/confirm'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.client, client_1.UserRole.admin),
    (0, swagger_1.ApiOperation)({ summary: 'Confirmar pago simulado o externo' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, current_user_decorator_1.CurrentUser)('role')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, payment_dto_1.ConfirmPaymentDto]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "confirm", null);
__decorate([
    (0, common_1.Patch)(':id/refund'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.admin),
    (0, swagger_1.ApiOperation)({ summary: 'Reembolsar pago' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, payment_dto_1.RefundPaymentDto]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "refund", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.client),
    (0, swagger_1.ApiOperation)({ summary: 'Mis pagos' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "findMine", null);
exports.PaymentsController = PaymentsController = __decorate([
    (0, swagger_1.ApiTags)('Payments'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('payments'),
    __metadata("design:paramtypes", [payments_service_1.PaymentsService])
], PaymentsController);
//# sourceMappingURL=payments.controller.js.map