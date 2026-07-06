import { PrismaService } from '../prisma/prisma.service';
import { UpdatePatientDto } from './dto/patient.dto';
export declare class PatientsService {
    private prisma;
    constructor(prisma: PrismaService);
    getPatient(id: string): Promise<{
        user: {
            email: string;
            role: import(".prisma/client").$Enums.Role;
        };
    } & {
        id: string;
        createdAt: Date;
        fullName: string;
        dob: Date;
        gender: string;
        phone: string | null;
        address: string | null;
        allergies: string[];
        chronicConditions: string[];
        bloodType: string | null;
        emergencyContact: string | null;
        userId: string;
    }>;
    getPatientByUserId(userId: string): Promise<{
        user: {
            email: string;
            role: import(".prisma/client").$Enums.Role;
        };
    } & {
        id: string;
        createdAt: Date;
        fullName: string;
        dob: Date;
        gender: string;
        phone: string | null;
        address: string | null;
        allergies: string[];
        chronicConditions: string[];
        bloodType: string | null;
        emergencyContact: string | null;
        userId: string;
    }>;
    updatePatient(id: string, dto: UpdatePatientDto): Promise<{
        id: string;
        createdAt: Date;
        fullName: string;
        dob: Date;
        gender: string;
        phone: string | null;
        address: string | null;
        allergies: string[];
        chronicConditions: string[];
        bloodType: string | null;
        emergencyContact: string | null;
        userId: string;
    }>;
    getTimeline(id: string): Promise<{
        id: string;
        date: Date;
        type: import(".prisma/client").$Enums.RecordType;
        title: string;
        content: string;
        facility: {
            name: string;
            type: import(".prisma/client").$Enums.FacilityType;
        };
        clinician: string | null;
        sourceFormat: import(".prisma/client").$Enums.SourceFormat;
    }[]>;
}
