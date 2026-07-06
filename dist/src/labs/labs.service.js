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
exports.LabsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let LabsService = class LabsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getLabResults(patientId, startDate, endDate) {
        const where = { patientId };
        if (startDate || endDate) {
            where.testDate = {};
            if (startDate)
                where.testDate.gte = new Date(startDate);
            if (endDate)
                where.testDate.lte = new Date(endDate);
        }
        return this.prisma.labResult.findMany({
            where,
            include: { facility: { select: { name: true, type: true } } },
            orderBy: { testDate: 'desc' },
        });
    }
    async getLabResultById(id) {
        const result = await this.prisma.labResult.findUnique({ where: { id } });
        if (!result)
            throw new common_1.NotFoundException('Lab result not found');
        return result;
    }
};
exports.LabsService = LabsService;
exports.LabsService = LabsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LabsService);
//# sourceMappingURL=labs.service.js.map