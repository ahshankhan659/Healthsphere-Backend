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
exports.AppointmentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let AppointmentsService = class AppointmentsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAppointments(userId, role) {
        const where = {};
        if (role === 'patient') {
            const patient = await this.prisma.patient.findUnique({ where: { userId } });
            if (!patient)
                throw new common_1.NotFoundException('Patient not found');
            where.patientId = patient.id;
        }
        else if (role === 'clinician') {
            const clinician = await this.prisma.clinician.findUnique({ where: { userId } });
            if (!clinician)
                throw new common_1.NotFoundException('Clinician not found');
            where.clinicianId = clinician.id;
        }
        return this.prisma.appointment.findMany({
            where,
            include: {
                patient: { select: { fullName: true } },
                clinician: { select: { fullName: true, specialty: true } },
            },
            orderBy: { scheduledAt: 'desc' },
        });
    }
    async createAppointment(dto, userId) {
        const patient = await this.prisma.patient.findUnique({ where: { userId } });
        if (!patient)
            throw new common_1.NotFoundException('Patient not found');
        return this.prisma.appointment.create({
            data: {
                patientId: patient.id,
                clinicianId: dto.clinicianId,
                scheduledAt: new Date(dto.scheduledAt),
                reason: dto.reason,
                notes: dto.notes,
                status: 'requested',
            },
            include: {
                clinician: { select: { fullName: true, specialty: true } },
            },
        });
    }
    async updateAppointment(id, dto) {
        const apt = await this.prisma.appointment.findUnique({ where: { id } });
        if (!apt)
            throw new common_1.NotFoundException('Appointment not found');
        return this.prisma.appointment.update({
            where: { id },
            data: { status: client_1.AppointmentStatus.confirmed, notes: dto.notes },
        });
    }
};
exports.AppointmentsService = AppointmentsService;
exports.AppointmentsService = AppointmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AppointmentsService);
//# sourceMappingURL=appointments.service.js.map