import { CliniciansService } from './clinicians.service';
export declare class CliniciansController {
    private cliniciansService;
    constructor(cliniciansService: CliniciansService);
    getPatients(id: string, search?: string, sort?: string, filter?: string): Promise<({
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
    addNote(patientId: string, noteText: string, req: any): Promise<{
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
