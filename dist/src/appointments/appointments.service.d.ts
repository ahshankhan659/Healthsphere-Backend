import { PrismaService } from '../prisma/prisma.service';
import { CreateAppointmentDto, UpdateAppointmentDto } from './dto/appointment.dto';
export declare class AppointmentsService {
    private prisma;
    constructor(prisma: PrismaService);
    getAppointments(userId: string, role: string): Promise<({
        patient: {
            fullName: string;
        };
        clinician: {
            fullName: string;
            specialty: string;
        };
    } & {
        id: string;
        createdAt: Date;
        notes: string | null;
        patientId: string;
        scheduledAt: Date;
        status: import(".prisma/client").$Enums.AppointmentStatus;
        reason: string | null;
        clinicianId: string;
    })[]>;
    createAppointment(dto: CreateAppointmentDto, userId: string): Promise<{
        clinician: {
            fullName: string;
            specialty: string;
        };
    } & {
        id: string;
        createdAt: Date;
        notes: string | null;
        patientId: string;
        scheduledAt: Date;
        status: import(".prisma/client").$Enums.AppointmentStatus;
        reason: string | null;
        clinicianId: string;
    }>;
    updateAppointment(id: string, dto: UpdateAppointmentDto): Promise<{
        id: string;
        createdAt: Date;
        notes: string | null;
        patientId: string;
        scheduledAt: Date;
        status: import(".prisma/client").$Enums.AppointmentStatus;
        reason: string | null;
        clinicianId: string;
    }>;
}
