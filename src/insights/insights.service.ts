import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InsightsService {
  constructor(private prisma: PrismaService) {}

  async getInsights(patientId: string) {
    const patient = await this.prisma.patient.findUnique({ where: { id: patientId } });
    if (!patient) throw new NotFoundException('Patient not found');

    return this.prisma.aIInsight.findMany({
      where: { patientId },
      orderBy: { generatedAt: 'desc' },
    });
  }

  async generateInsights(patientId: string) {
    const patient = await this.prisma.patient.findUnique({ where: { id: patientId } });
    if (!patient) throw new NotFoundException('Patient not found');

    const labs = await this.prisma.labResult.findMany({
      where: { patientId },
      orderBy: { testDate: 'desc' },
      take: 20,
    });

    // Generate realistic derived insights based on lab data
    const insights: Array<{
      patientId: string;
      insightText: string;
      metric: string;
      trendDirection: 'up' | 'down' | 'stable';
      severity: string;
      category: string;
    }> = [];

    // Analyze glucose
    const glucoseLabs = labs.filter((l) => l.testName.includes('Glucose'));
    if (glucoseLabs.length >= 3) {
      const first = glucoseLabs[glucoseLabs.length - 1].value;
      const last = glucoseLabs[0].value;
      const pctChange = ((last - first) / first) * 100;
      if (Math.abs(pctChange) > 5) {
        insights.push({
          patientId,
          insightText: `Fasting blood glucose has ${pctChange > 0 ? 'increased' : 'decreased'} ${Math.abs(pctChange).toFixed(1)}% over your last ${glucoseLabs.length} readings. ${pctChange > 0 ? 'Consider reviewing your diet and medication adherence.' : 'Your diabetes management plan is showing positive results.'}`,
          metric: 'Fasting Blood Glucose',
          trendDirection: pctChange > 0 ? 'up' : 'down',
          severity: Math.abs(pctChange) > 15 ? 'warning' : 'info',
          category: 'metabolic',
        });
      }
    }

    // Analyze BP
    const bpLabs = labs.filter((l) => l.testName.includes('Blood Pressure') || l.testName.includes('Systolic'));
    if (bpLabs.length >= 3) {
      const first = bpLabs[bpLabs.length - 1].value;
      const last = bpLabs[0].value;
      const pctChange = ((last - first) / first) * 100;
      if (Math.abs(pctChange) > 3) {
        insights.push({
          patientId,
          insightText: `Your blood pressure has trended ${pctChange > 0 ? 'upward' : 'downward'} by ${Math.abs(pctChange).toFixed(1)}% across ${bpLabs.length} measurements. ${last < 130 ? 'Your readings are approaching target range.' : 'Continue monitoring and follow your care plan.'}`,
          metric: 'Blood Pressure',
          trendDirection: pctChange > 0 ? 'up' : 'down',
          severity: last > 140 ? 'warning' : 'info',
          category: 'cardiovascular',
        });
      }
    }

    // Cholesterol
    const cholLabs = labs.filter((l) => l.testName.includes('Cholesterol'));
    if (cholLabs.length >= 3) {
      const first = cholLabs[cholLabs.length - 1].value;
      const last = cholLabs[0].value;
      const pctChange = ((last - first) / first) * 100;
      if (Math.abs(pctChange) > 3) {
        insights.push({
          patientId,
          insightText: `Total cholesterol has ${pctChange > 0 ? 'risen' : 'dropped'} ${Math.abs(pctChange).toFixed(1)}% over your monitoring period. ${last < 200 ? 'Your levels are within the healthy range.' : 'Your levels remain above the recommended threshold of 200 mg/dL.'}`,
          metric: 'Total Cholesterol',
          trendDirection: pctChange > 0 ? 'up' : 'down',
          severity: last > 220 ? 'warning' : 'info',
          category: 'lipid',
        });
      }
    }

    // Always add general insights
    if (patient.chronicConditions.length > 0) {
      insights.push({
        patientId,
        insightText: `Based on your chronic conditions (${patient.chronicConditions.join(', ')}), regular monitoring and medication adherence are key to maintaining stability.`,
        metric: null as any,
        trendDirection: 'stable' as const,
        severity: 'info',
        category: 'preventive',
      });
    }

    if (patient.allergies.length > 0) {
      insights.push({
        patientId,
        insightText: `Your documented allergies (${patient.allergies.join(', ')}) are shared across all connected facilities in the HealthSphere network, ensuring safe care coordination.`,
        metric: null as any,
        trendDirection: 'stable' as const,
        severity: 'info',
        category: 'safety',
      });
    }

    // Save generated insights
    if (insights.length > 0) {
      await this.prisma.aIInsight.createMany({ data: insights });
    }

    return this.getInsights(patientId);
  }
}
