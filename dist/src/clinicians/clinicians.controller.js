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
exports.CliniciansController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const clinicians_service_1 = require("./clinicians.service");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
let CliniciansController = class CliniciansController {
    constructor(cliniciansService) {
        this.cliniciansService = cliniciansService;
    }
    getPatients(id, search, sort, filter) {
        return this.cliniciansService.getPatients(id, search, sort, filter);
    }
    addNote(patientId, noteText, req) {
        return this.cliniciansService.addNote(patientId, req.user.sub, noteText);
    }
    getNotes(patientId) {
        return this.cliniciansService.getNotes(patientId);
    }
};
exports.CliniciansController = CliniciansController;
__decorate([
    (0, common_1.Get)('clinicians/:id/patients'),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'sort', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'filter', required: false }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('search')),
    __param(2, (0, common_1.Query)('sort')),
    __param(3, (0, common_1.Query)('filter')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", void 0)
], CliniciansController.prototype, "getPatients", null);
__decorate([
    (0, common_1.Post)('patients/:patientId/notes'),
    __param(0, (0, common_1.Param)('patientId')),
    __param(1, (0, common_1.Body)('noteText')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], CliniciansController.prototype, "addNote", null);
__decorate([
    (0, common_1.Get)('patients/:patientId/notes'),
    __param(0, (0, common_1.Param)('patientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CliniciansController.prototype, "getNotes", null);
exports.CliniciansController = CliniciansController = __decorate([
    (0, swagger_1.ApiTags)('Clinicians'),
    (0, common_1.Controller)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [clinicians_service_1.CliniciansService])
], CliniciansController);
//# sourceMappingURL=clinicians.controller.js.map