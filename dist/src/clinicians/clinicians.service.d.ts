import { PrismaService } from '../prisma/prisma.service';
export declare class CliniciansService {
    private prisma;
    constructor(prisma: PrismaService);
    getPatients(clinicianId: string, search?: string, sort?: string, filter?: string): Promise<({
        _count: {
            medicalRecords: number;
            appointments: number;
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
    })[]>;
    getClinicianByUserId(userId: string): Promise<{
        id: string;
        createdAt: Date;
        fullName: string;
        userId: string;
        specialty: string;
        facilityName: string;
        licenseNo: string | null;
    }>;
    addNote(patientId: string, clinicianUserId: string, noteText: string): Promise<{
        id: string;
        createdAt: Date;
        patientId: string;
        clinicianId: string;
        noteText: string;
    }>;
    getNotes(patientId: string): Promise<({
        clinician: {
            fullName: string;
            specialty: string;
        };
    } & {
        id: string;
        createdAt: Date;
        patientId: string;
        clinicianId: string;
        noteText: string;
    })[]>;
}
