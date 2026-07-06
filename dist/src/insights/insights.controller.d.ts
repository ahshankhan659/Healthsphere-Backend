import { InsightsService } from './insights.service';
export declare class InsightsController {
    private insightsService;
    constructor(insightsService: InsightsService);
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
