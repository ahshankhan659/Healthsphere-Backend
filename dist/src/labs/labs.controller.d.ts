import { LabsService } from './labs.service';
export declare class LabsController {
    private labsService;
    constructor(labsService: LabsService);
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
}
