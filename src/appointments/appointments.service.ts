import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAppointmentDto, UpdateAppointmentDto } from './dto/appointment.dto';
import { AppointmentStatus } from '@prisma/client';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async getAppointments(userId: string, role: string) {
    const where: any = {};
    if (role === 'patient') {
      const patient = await this.prisma.patient.findUnique({ where: { userId } });
      if (!patient) throw new NotFoundException('Patient not found');
      where.patientId = patient.id;
    } else if (role === 'clinician') {
      const clinician = await this.prisma.clinician.findUnique({ where: { userId } });
      if (!clinician) throw new NotFoundException('Clinician not found');
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

  async createAppointment(dto: CreateAppointmentDto, userId: string) {
    const patient = await this.prisma.patient.findUnique({ where: { userId } });
    if (!patient) throw new NotFoundException('Patient not found');

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

  async updateAppointment(id: string, dto: UpdateAppointmentDto) {
    const apt = await this.prisma.appointment.findUnique({ where: { id } });
    if (!apt) throw new NotFoundException('Appointment not found');
    return this.prisma.appointment.update({
      where: { id },
      data: { status: AppointmentStatus.confirmed, notes: dto.notes },
    });
  }
}
