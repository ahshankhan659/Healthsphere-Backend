import { PrismaService } from '../prisma/prisma.service';
export declare class InsightsService {
    private prisma;
    constructor(prisma: PrismaService);
    getInsights(patientId: string): Promise<{
        id: string;
        patientId: string;
        category: string;
        insightText: string;
        metric: string | null;
        trendDirection: import(".prisma/client").$Enums.TrendDirection;
        severity: string;
        generatedAt: Date;
    }[]>;
    generateInsights(patientId: string): Promise<{
        id: string;
        patientId: string;
        category: string;
        insightText: string;
        metric: string | null;
        trendDirection: import(".prisma/client").$Enums.TrendDirection;
        severity: string;
        generatedAt: Date;
    }[]>;
}
