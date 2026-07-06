import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CliniciansService {
  constructor(private prisma: PrismaService) {}

  async getPatients(clinicianId: string, search?: string, sort?: string, filter?: string) {
    const clinician = await this.prisma.clinician.findUnique({ where: { id: clinicianId } });
    if (!clinician) throw new NotFoundException('Clinician not found');

    const where: any = {};
    if (search) {
      where.fullName = { contains: search, mode: 'insensitive' };
    }
    if (filter) {
      where.chronicConditions = { has: filter };
    }

    let orderBy: any = { createdAt: 'desc' };
    if (sort === 'name') orderBy = { fullName: 'asc' };
    if (sort === 'recent') orderBy = { createdAt: 'desc' };

    const patients = await this.prisma.patient.findMany({
      where,
      orderBy,
      include: {
        _count: { select: { medicalRecords: true, appointments: true } },
      },
    });

    return patients;
  }

  async getClinicianByUserId(userId: string) {
    const clinician = await this.prisma.clinician.findUnique({
      where: { userId },
    });
    if (!clinician) throw new NotFoundException('Clinician profile not found');
    return clinician;
  }

  async addNote(patientId: string, clinicianUserId: string, noteText: string) {
    const clinician = await this.prisma.clinician.findUnique({
      where: { userId: clinicianUserId },
    });
    if (!clinician) throw new NotFoundException('Clinician not found');

    return this.prisma.clinicianNote.create({
      data: {
        patientId,
        clinicianId: clinician.id,
        noteText,
      },
    });
  }

  async getNotes(patientId: string) {
    return this.prisma.clinicianNote.findMany({
      where: { patientId },
      include: { clinician: { select: { fullName: true, specialty: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }
}
