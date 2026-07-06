import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PatientsModule } from './patients/patients.module';
import { CliniciansModule } from './clinicians/clinicians.module';
import { RecordsModule } from './records/records.module';
import { LabsModule } from './labs/labs.module';
import { InsightsModule } from './insights/insights.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { DocumentsModule } from './documents/documents.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    PatientsModule,
    CliniciansModule,
    RecordsModule,
    LabsModule,
    InsightsModule,
    AppointmentsModule,
    DocumentsModule,
    AdminModule,
  ],
})
export class AppModule {}
