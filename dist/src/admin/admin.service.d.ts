import { PrismaService } from '../prisma/prisma.service';
export declare class AdminService {
    private prisma;
    constructor(prisma: PrismaService);
    getMetrics(): Promise<{
        totalPatients: number;
        totalRecords: number;
        totalDocuments: number;
        totalInsights: number;
        totalAppointments: number;
        totalClinicians: number;
        ocrCompleted: number;
        digitizationRate: string;
        appointmentsByStatus: (import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.AppointmentGroupByOutputType, "status"[]> & {
            _count: number;
        })[];
        recordsByType: (import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.MedicalRecordGroupByOutputType, "recordType"[]> & {
            _count: number;
        })[];
    }>;
    getConsents(patientId: string): Promise<({
        facility: {
            name: string;
            type: import(".prisma/client").$Enums.FacilityType;
        };
    } & {
        id: string;
        patientId: string;
        facilityId: string;
        granted: boolean;
        updatedAt: Date;
    })[]>;
    updateConsent(patientId: string, facilityId: string, granted: boolean): Promise<{
        id: string;
        patientId: string;
        facilityId: string;
        granted: boolean;
        updatedAt: Date;
    }>;
}
