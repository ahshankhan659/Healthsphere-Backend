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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AdminService = class AdminService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getMetrics() {
        const [totalPatients, totalRecords, totalDocuments, totalInsights, totalAppointments, totalClinicians] = await Promise.all([
            this.prisma.patient.count(),
            this.prisma.medicalRecord.count(),
            this.prisma.uploadedDocument.count(),
            this.prisma.aIInsight.count(),
            this.prisma.appointment.count(),
            this.prisma.clinician.count(),
        ]);
        const ocrCompleted = await this.prisma.uploadedDocument.count({
            where: { ocrStatus: 'complete' },
        });
        const appointmentsByStatus = await this.prisma.appointment.groupBy({
            by: ['status'],
            _count: true,
        });
        const recordsByType = await this.prisma.medicalRecord.groupBy({
            by: ['recordType'],
            _count: true,
        });
        return {
            totalPatients,
            totalRecords,
            totalDocuments,
            totalInsights,
            totalAppointments,
            totalClinicians,
            ocrCompleted,
            digitizationRate: totalDocuments > 0 ? ((ocrCompleted / totalDocuments) * 100).toFixed(1) : '0',
            appointmentsByStatus,
            recordsByType,
        };
    }
    async getConsents(patientId) {
        return this.prisma.dataSharingConsent.findMany({
            where: { patientId },
            include: { facility: { select: { name: true, type: true } } },
        });
    }
    async updateConsent(patientId, facilityId, granted) {
        return this.prisma.dataSharingConsent.upsert({
            where: {
                patientId_facilityId: { patientId, facilityId },
            },
            update: { granted },
            create: { patientId, facilityId, granted },
        });
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminService);
//# sourceMappingURL=admin.service.js.map