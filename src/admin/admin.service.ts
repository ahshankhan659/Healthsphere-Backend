import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getMetrics() {
    const [totalPatients, totalRecords, totalDocuments, totalInsights, totalAppointments, totalClinicians] =
      await Promise.all([
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

  async getConsents(patientId: string) {
    return this.prisma.dataSharingConsent.findMany({
      where: { patientId },
      include: { facility: { select: { name: true, type: true } } },
    });
  }

  async updateConsent(patientId: string, facilityId: string, granted: boolean) {
    return this.prisma.dataSharingConsent.upsert({
      where: {
        patientId_facilityId: { patientId, facilityId },
      },
      update: { granted },
      create: { patientId, facilityId, granted },
    });
  }
}
