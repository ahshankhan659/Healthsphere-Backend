import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto, UpdateAppointmentDto } from './dto/appointment.dto';
export declare class AppointmentsController {
    private appointmentsService;
    constructor(appointmentsService: AppointmentsService);
    getAppointments(req: any): Promise<({
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
    createAppointment(dto: CreateAppointmentDto, req: any): Promise<{
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
