import { PrismaService } from '../prisma/prisma.service';
export declare class LabsService {
    private prisma;
    constructor(prisma: PrismaService);
    getLabResults(patientId: string, startDate?: string, endDate?: string): Promise<({
        facility: {
            name: string;
            type: import(".prisma/client").$Enums.FacilityType;
        };
    } & {
        id: string;
        createdAt: Date;
        patientId: string;
        facilityId: string;
        testName: string;
        value: number;
        unit: string;
        referenceRange: string;
        testDate: Date;
        category: string;
        isAbnormal: boolean;
    })[]>;
    getLabResultById(id: string): Promise<{
        id: string;
        createdAt: Date;
        patientId: string;
        facilityId: string;
        testName: string;
        value: number;
        unit: string;
        referenceRange: string;
        testDate: Date;
        category: string;
        isAbnormal: boolean;
    }>;
}
