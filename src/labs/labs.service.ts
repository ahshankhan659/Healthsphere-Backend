import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LabsService {
  constructor(private prisma: PrismaService) {}

  async getLabResults(patientId: string, startDate?: string, endDate?: string) {
    const where: any = { patientId };
    if (startDate || endDate) {
      where.testDate = {};
      if (startDate) where.testDate.gte = new Date(startDate);
      if (endDate) where.testDate.lte = new Date(endDate);
    }
    return this.prisma.labResult.findMany({
      where,
      include: { facility: { select: { name: true, type: true } } },
      orderBy: { testDate: 'desc' },
    });
  }

  async getLabResultById(id: string) {
    const result = await this.prisma.labResult.findUnique({ where: { id } });
    if (!result) throw new NotFoundException('Lab result not found');
    return result;
  }
}
