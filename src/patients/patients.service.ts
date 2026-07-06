import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatePatientDto } from './dto/patient.dto';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  async getPatient(id: string) {
    const patient = await this.prisma.patient.findUnique({
      where: { id },
      include: { user: { select: { email: true, role: true } } },
    });
    if (!patient) throw new NotFoundException('Patient not found');
    return patient;
  }

  async getPatientByUserId(userId: string) {
    const patient = await this.prisma.patient.findUnique({
      where: { userId },
      include: { user: { select: { email: true, role: true } } },
    });
    if (!patient) throw new NotFoundException('Patient profile not found');
    return patient;
  }

  async updatePatient(id: string, dto: UpdatePatientDto) {
    await this.getPatient(id);
    return this.prisma.patient.update({ where: { id }, data: dto });
  }

  async getTimeline(id: string) {
    await this.getPatient(id);
    const records = await this.prisma.medicalRecord.findMany({
      where: { patientId: id },
      include: { facility: { select: { name: true, type: true } } },
      orderBy: { recordDate: 'desc' },
    });
    return records.map((r) => ({
      id: r.id,
      date: r.recordDate,
      type: r.recordType,
      title: r.title,
      content: r.content,
      facility: r.facility,
      clinician: r.clinician,
      sourceFormat: r.sourceFormat,
    }));
  }
}
