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
exports.CliniciansService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CliniciansService = class CliniciansService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getPatients(clinicianId, search, sort, filter) {
        const clinician = await this.prisma.clinician.findUnique({ where: { id: clinicianId } });
        if (!clinician)
            throw new common_1.NotFoundException('Clinician not found');
        const where = {};
        if (search) {
            where.fullName = { contains: search, mode: 'insensitive' };
        }
        if (filter) {
            where.chronicConditions = { has: filter };
        }
        let orderBy = { createdAt: 'desc' };
        if (sort === 'name')
            orderBy = { fullName: 'asc' };
        if (sort === 'recent')
            orderBy = { createdAt: 'desc' };
        const patients = await this.prisma.patient.findMany({
            where,
            orderBy,
            include: {
                _count: { select: { medicalRecords: true, appointments: true } },
            },
        });
        return patients;
    }
    async getClinicianByUserId(userId) {
        const clinician = await this.prisma.clinician.findUnique({
            where: { userId },
        });
        if (!clinician)
            throw new common_1.NotFoundException('Clinician profile not found');
        return clinician;
    }
    async addNote(patientId, clinicianUserId, noteText) {
        const clinician = await this.prisma.clinician.findUnique({
            where: { userId: clinicianUserId },
        });
        if (!clinician)
            throw new common_1.NotFoundException('Clinician not found');
        return this.prisma.clinicianNote.create({
            data: {
                patientId,
                clinicianId: clinician.id,
                noteText,
            },
        });
    }
    async getNotes(patientId) {
        return this.prisma.clinicianNote.findMany({
            where: { patientId },
            include: { clinician: { select: { fullName: true, specialty: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
};
exports.CliniciansService = CliniciansService;
exports.CliniciansService = CliniciansService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CliniciansService);
//# sourceMappingURL=clinicians.service.js.map