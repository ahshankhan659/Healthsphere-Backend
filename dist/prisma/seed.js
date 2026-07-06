"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Seeding HealthSphere database...');
    await prisma.clinicianNote.deleteMany();
    await prisma.dataSharingConsent.deleteMany();
    await prisma.appointment.deleteMany();
    await prisma.aIInsight.deleteMany();
    await prisma.uploadedDocument.deleteMany();
    await prisma.labResult.deleteMany();
    await prisma.medicalRecord.deleteMany();
    await prisma.clinician.deleteMany();
    await prisma.patient.deleteMany();
    await prisma.facility.deleteMany();
    await prisma.user.deleteMany();
    const passwordHash = await bcrypt.hash('demo123', 10);
    const patientUser1 = await prisma.user.create({
        data: { email: 'patient@demo.com', passwordHash, role: client_1.Role.patient },
    });
    const patientUser2 = await prisma.user.create({
        data: { email: 'jane@demo.com', passwordHash, role: client_1.Role.patient },
    });
    const patientUser3 = await prisma.user.create({
        data: { email: 'mike@demo.com', passwordHash, role: client_1.Role.patient },
    });
    const clinicianUser1 = await prisma.user.create({
        data: { email: 'clinician@demo.com', passwordHash, role: client_1.Role.clinician },
    });
    const clinicianUser2 = await prisma.user.create({
        data: { email: 'dr.smith@demo.com', passwordHash, role: client_1.Role.clinician },
    });
    const adminUser = await prisma.user.create({
        data: { email: 'admin@demo.com', passwordHash, role: client_1.Role.admin },
    });
    const patient1 = await prisma.patient.create({
        data: {
            userId: patientUser1.id,
            fullName: 'Ahmed Khan',
            dob: new Date('1985-03-15'),
            gender: 'Male',
            phone: '+92-300-1234567',
            address: '123 Main St, Karachi, Pakistan',
            allergies: ['Penicillin', 'Dust'],
            chronicConditions: ['Hypertension', 'Type 2 Diabetes'],
            bloodType: 'B+',
            emergencyContact: 'Fatima Khan - +92-300-7654321',
        },
    });
    const patient2 = await prisma.patient.create({
        data: {
            userId: patientUser2.id,
            fullName: 'Jane Doe',
            dob: new Date('1990-07-22'),
            gender: 'Female',
            phone: '+92-321-9876543',
            address: '456 Park Ave, Lahore, Pakistan',
            allergies: ['Sulfa'],
            chronicConditions: ['Asthma'],
            bloodType: 'A+',
            emergencyContact: 'John Doe - +92-321-1234567',
        },
    });
    const patient3 = await prisma.patient.create({
        data: {
            userId: patientUser3.id,
            fullName: 'Mike Wilson',
            dob: new Date('1978-11-08'),
            gender: 'Male',
            phone: '+92-333-5551234',
            address: '789 Lake Rd, Islamabad, Pakistan',
            allergies: [],
            chronicConditions: ['High Cholesterol', 'Arthritis'],
            bloodType: 'O+',
        },
    });
    const extraPatients = [];
    const extraNames = [
        'Sarah Ahmed', 'Bilal Mahmood', 'Ayesha Iqbal', 'Omar Farooq',
        'Zainab Ali', 'Hassan Raza', 'Nadia Sheikh',
    ];
    for (let i = 0; i < extraNames.length; i++) {
        const u = await prisma.user.create({
            data: { email: `patient${i + 4}@demo.com`, passwordHash, role: client_1.Role.patient },
        });
        const conditions = [['Anemia'], ['Migraine', 'Anxiety'], ['Hypothyroidism'], ['GERD'], ['Eczema'], ['Osteoporosis'], ['Anemia', 'Vitamin D Deficiency']];
        const p = await prisma.patient.create({
            data: {
                userId: u.id,
                fullName: extraNames[i],
                dob: new Date(1980 + i * 3, i % 12, 10 + i),
                gender: i % 2 === 0 ? 'Female' : 'Male',
                phone: `+92-300-${1000000 + i}`,
                address: `${100 + i} Demo St, Karachi, Pakistan`,
                allergies: i % 3 === 0 ? ['Peanuts'] : [],
                chronicConditions: conditions[i],
                bloodType: ['A+', 'B+', 'O+', 'AB+'][i % 4],
            },
        });
        extraPatients.push(p);
    }
    const allPatients = [patient1, patient2, patient3, ...extraPatients];
    const clinician1 = await prisma.clinician.create({
        data: {
            userId: clinicianUser1.id,
            fullName: 'Dr. Sarah Williams',
            specialty: 'Cardiology',
            facilityName: 'Karachi General Hospital',
            licenseNo: 'PMC-2015-00421',
        },
    });
    const clinician2 = await prisma.clinician.create({
        data: {
            userId: clinicianUser2.id,
            fullName: 'Dr. James Smith',
            specialty: 'Endocrinology',
            facilityName: 'Lahore Medical Center',
            licenseNo: 'PMC-2012-00318',
        },
    });
    const facilities = await Promise.all([
        prisma.facility.create({ data: { name: 'Karachi General Hospital', type: client_1.FacilityType.hospital, address: 'Shahrah-e-Faisal, Karachi', phone: '+92-21-34567890' } }),
        prisma.facility.create({ data: { name: 'Lahore Medical Center', type: client_1.FacilityType.hospital, address: 'Mall Road, Lahore', phone: '+92-42-34567891' } }),
        prisma.facility.create({ data: { name: 'Aga Khan Diagnostic Lab', type: client_1.FacilityType.lab, address: 'Stadium Road, Karachi', phone: '+92-21-34567892' } }),
        prisma.facility.create({ data: { name: 'Shifa Clinic', type: client_1.FacilityType.clinic, address: 'F-10, Islamabad', phone: '+92-51-34567893' } }),
        prisma.facility.create({ data: { name: 'Chughtai Lab', type: client_1.FacilityType.lab, address: 'Jail Road, Lahore', phone: '+92-42-34567894' } }),
    ]);
    const p1Records = [
        { facilityId: facilities[0].id, recordType: client_1.RecordType.visit, title: 'Annual Physical Examination', recordDate: new Date('2024-01-15'), content: 'Patient presented for annual checkup. BP 140/90. Weight 82kg. Recommended lifestyle modifications and follow-up in 3 months. Blood work ordered.', sourceFormat: client_1.SourceFormat.structured, clinician: 'Dr. Sarah Williams' },
        { facilityId: facilities[0].id, recordType: client_1.RecordType.prescription, title: 'Hypertension Medication', recordDate: new Date('2024-01-15'), content: 'Prescribed: Lisinopril 10mg daily. Amlodipine 5mg daily. Metformin 500mg twice daily for diabetes management.', sourceFormat: client_1.SourceFormat.structured, clinician: 'Dr. Sarah Williams' },
        { facilityId: facilities[0].id, recordType: client_1.RecordType.imaging, title: 'Chest X-Ray', recordDate: new Date('2024-01-20'), content: 'Chest X-ray PA view: Clear lung fields. No active infiltrates. Heart size within normal limits. No pleural effusion.', sourceFormat: client_1.SourceFormat.imaging, clinician: 'Dr. Ali Raza' },
        { facilityId: facilities[1].id, recordType: client_1.RecordType.visit, title: 'Diabetes Follow-Up', recordDate: new Date('2024-03-10'), content: 'HbA1c: 7.2%. Fasting glucose: 140 mg/dL. Adjusting Metformin to 1000mg twice daily. Referred to nutritionist.', sourceFormat: client_1.SourceFormat.structured, clinician: 'Dr. James Smith' },
        { facilityId: facilities[3].id, recordType: client_1.RecordType.visit, title: 'Allergy Flare-Up', recordDate: new Date('2024-05-05'), content: 'Patient reports seasonal allergy symptoms — sneezing, itchy eyes. Prescribed: Cetirizine 10mg as needed.', sourceFormat: client_1.SourceFormat.structured, clinician: 'Dr. Naveed Akram' },
        { facilityId: facilities[0].id, recordType: client_1.RecordType.visit, title: '6-Month Cardiology Check', recordDate: new Date('2024-06-20'), content: 'BP improved to 130/85. Adherent to medication. ECG shows normal sinus rhythm. Continue current regimen.', sourceFormat: client_1.SourceFormat.structured, clinician: 'Dr. Sarah Williams' },
        { facilityId: facilities[2].id, recordType: client_1.RecordType.note, title: 'Lab Report Review', recordDate: new Date('2024-06-22'), content: 'Reviewed comprehensive metabolic panel. Cholesterol: Total 210, LDL 135, HDL 42. Triglycerides: 180. Liver and kidney function normal.', sourceFormat: client_1.SourceFormat.structured, clinician: 'Dr. Sarah Williams' },
        { facilityId: facilities[0].id, recordType: client_1.RecordType.visit, title: 'Emergency — Chest Pain', recordDate: new Date('2024-08-01'), content: 'Patient presented to ER with mild chest discomfort. ECG, troponin normal. Diagnosed as musculoskeletal chest pain. Discharged same day.', sourceFormat: client_1.SourceFormat.structured, clinician: 'Dr. Ahmed Malik' },
        { facilityId: facilities[0].id, recordType: client_1.RecordType.surgery, title: 'Appendectomy (Historical)', recordDate: new Date('2022-04-10'), content: 'Laparoscopic appendectomy performed. No complications. Discharged after 2 days.', sourceFormat: client_1.SourceFormat.structured, clinician: 'Dr. Faisal Qureshi' },
        { facilityId: facilities[4].id, recordType: client_1.RecordType.vaccination, title: 'Flu Vaccine', recordDate: new Date('2024-10-01'), content: 'Administered seasonal influenza vaccine. No adverse reaction observed.', sourceFormat: client_1.SourceFormat.structured, clinician: 'Nurse Amna' },
    ];
    for (const r of p1Records) {
        await prisma.medicalRecord.create({
            data: { patientId: patient1.id, ...r },
        });
    }
    for (const p of allPatients.slice(1)) {
        const f = facilities[Math.floor(Math.random() * facilities.length)];
        await prisma.medicalRecord.create({
            data: {
                patientId: p.id,
                facilityId: f.id,
                recordType: client_1.RecordType.visit,
                title: 'Initial Consultation',
                recordDate: new Date('2024-02-01'),
                content: `Initial consultation for ${p.fullName}. Reviewed medical history. Ordered baseline labs.`,
                sourceFormat: client_1.SourceFormat.structured,
                clinician: 'Dr. Sarah Williams',
            },
        });
        await prisma.medicalRecord.create({
            data: {
                patientId: p.id,
                facilityId: facilities[2].id,
                recordType: client_1.RecordType.note,
                title: 'Lab Results Review',
                recordDate: new Date('2024-02-15'),
                content: 'Blood work results within normal limits. No immediate concerns.',
                sourceFormat: client_1.SourceFormat.structured,
                clinician: 'Dr. Sarah Williams',
            },
        });
    }
    const glucoseValues = [140, 138, 135, 142, 128, 125, 132, 120];
    const bpValues = [145, 142, 138, 140, 135, 132, 128, 130];
    const cholesterolValues = [210, 205, 198, 200, 192, 188, 185, 178];
    for (let i = 0; i < 8; i++) {
        const d = new Date('2024-01-15');
        d.setDate(d.getDate() + i * 30);
        await prisma.labResult.create({
            data: {
                patientId: patient1.id,
                facilityId: facilities[2].id,
                testName: 'Fasting Blood Glucose',
                value: glucoseValues[i],
                unit: 'mg/dL',
                referenceRange: '70-100',
                testDate: d,
                category: 'metabolic',
                isAbnormal: glucoseValues[i] > 100,
            },
        });
        await prisma.labResult.create({
            data: {
                patientId: patient1.id,
                facilityId: facilities[2].id,
                testName: 'Systolic Blood Pressure',
                value: bpValues[i],
                unit: 'mmHg',
                referenceRange: '<120',
                testDate: d,
                category: 'cardiovascular',
                isAbnormal: bpValues[i] >= 130,
            },
        });
        await prisma.labResult.create({
            data: {
                patientId: patient1.id,
                facilityId: facilities[2].id,
                testName: 'Total Cholesterol',
                value: cholesterolValues[i],
                unit: 'mg/dL',
                referenceRange: '<200',
                testDate: d,
                category: 'lipid',
                isAbnormal: cholesterolValues[i] >= 200,
            },
        });
        await prisma.labResult.create({
            data: {
                patientId: patient1.id,
                facilityId: facilities[4].id,
                testName: 'HbA1c',
                value: 7.5 - i * 0.15,
                unit: '%',
                referenceRange: '<5.7',
                testDate: new Date(d.getFullYear(), d.getMonth(), d.getDate()),
                category: 'metabolic',
                isAbnormal: true,
            },
        });
    }
    for (const p of allPatients.slice(1, 3)) {
        for (let i = 0; i < 4; i++) {
            const d = new Date('2024-03-01');
            d.setDate(d.getDate() + i * 60);
            await prisma.labResult.create({
                data: {
                    patientId: p.id,
                    facilityId: facilities[2].id,
                    testName: 'Fasting Blood Glucose',
                    value: 85 + Math.random() * 20,
                    unit: 'mg/dL',
                    referenceRange: '70-100',
                    testDate: d,
                    category: 'metabolic',
                    isAbnormal: false,
                },
            });
            await prisma.labResult.create({
                data: {
                    patientId: p.id,
                    facilityId: facilities[4].id,
                    testName: 'Hemoglobin',
                    value: 12 + Math.random() * 4,
                    unit: 'g/dL',
                    referenceRange: '12-16',
                    testDate: d,
                    category: 'hematology',
                    isAbnormal: false,
                },
            });
        }
    }
    await prisma.uploadedDocument.create({
        data: {
            patientId: patient1.id,
            fileName: 'old_prescription_2020.pdf',
            fileUrl: '/uploads/old_prescription_2020.pdf',
            uploadDate: new Date('2024-07-10'),
            ocrStatus: client_1.OcrStatus.complete,
            extractedText: 'Prescription dated March 2020: Atenolol 50mg daily. Discontinued in 2022.',
            documentType: 'Prescription',
            fileSize: 245760,
        },
    });
    await prisma.uploadedDocument.create({
        data: {
            patientId: patient1.id,
            fileName: 'ecg_report_may2023.pdf',
            fileUrl: '/uploads/ecg_report_may2023.pdf',
            uploadDate: new Date('2024-07-12'),
            ocrStatus: client_1.OcrStatus.complete,
            extractedText: 'ECG Report — May 2023: Normal sinus rhythm. Rate 72 bpm. No ST-T wave abnormalities.',
            documentType: 'Diagnostic Report',
            fileSize: 512000,
        },
    });
    await prisma.uploadedDocument.create({
        data: {
            patientId: patient1.id,
            fileName: 'discharge_summary_2022.pdf',
            fileUrl: '/uploads/discharge_summary_2022.pdf',
            uploadDate: new Date('2024-09-01'),
            ocrStatus: client_1.OcrStatus.processing,
            extractedText: null,
            documentType: 'Discharge Summary',
            fileSize: 1024000,
        },
    });
    const insights = [
        { insightText: 'Your total cholesterol has decreased 15% over the past 8 months — from 210 to 178 mg/dL. Keep up your current diet and exercise routine.', metric: 'Total Cholesterol', trendDirection: client_1.TrendDirection.down, severity: 'positive', category: 'lipid' },
        { insightText: 'Fasting blood glucose has improved from 140 to 120 mg/dL. While still above normal, the downward trend indicates your medication and lifestyle changes are working.', metric: 'Fasting Blood Glucose', trendDirection: client_1.TrendDirection.down, severity: 'info', category: 'metabolic' },
        { insightText: 'Your blood pressure has trended down from 145/90 to 130/85 over 8 months. Continue monitoring and medication adherence.', metric: 'Blood Pressure', trendDirection: client_1.TrendDirection.down, severity: 'positive', category: 'cardiovascular' },
        { insightText: 'HbA1c has dropped to 6.5% from 7.5% over 8 months. Your diabetes management is on the right track. Aim for below 7.0% at your next check.', metric: 'HbA1c', trendDirection: client_1.TrendDirection.down, severity: 'positive', category: 'metabolic' },
        { insightText: 'Based on your history of hypertension and diabetes, consider adding a kidney function test to your next checkup panel for comprehensive monitoring.', metric: null, trendDirection: client_1.TrendDirection.stable, severity: 'warning', category: 'preventive' },
        { insightText: 'Your allergy to Penicillin is documented across all connected facilities, ensuring safe prescribing.', metric: null, trendDirection: client_1.TrendDirection.stable, severity: 'info', category: 'safety' },
    ];
    for (const ins of insights) {
        await prisma.aIInsight.create({
            data: { patientId: patient1.id, ...ins },
        });
    }
    await prisma.appointment.create({
        data: {
            patientId: patient1.id,
            clinicianId: clinician1.id,
            scheduledAt: new Date('2024-12-15T10:00:00'),
            status: client_1.AppointmentStatus.confirmed,
            reason: 'Quarterly Cardiology Follow-Up',
            notes: 'Bring blood pressure log',
        },
    });
    await prisma.appointment.create({
        data: {
            patientId: patient1.id,
            clinicianId: clinician2.id,
            scheduledAt: new Date('2024-12-20T14:00:00'),
            status: client_1.AppointmentStatus.requested,
            reason: 'Diabetes Management Review',
            notes: 'Fasting required for labs',
        },
    });
    await prisma.appointment.create({
        data: {
            patientId: patient1.id,
            clinicianId: clinician1.id,
            scheduledAt: new Date('2024-10-01T11:00:00'),
            status: client_1.AppointmentStatus.completed,
            reason: 'Cardiology Check-Up',
            notes: 'BP stable at 130/85',
        },
    });
    for (const p of allPatients.slice(1)) {
        await prisma.appointment.create({
            data: {
                patientId: p.id,
                clinicianId: clinician1.id,
                scheduledAt: new Date('2024-12-18T09:00:00'),
                status: client_1.AppointmentStatus.confirmed,
                reason: 'Routine Check-Up',
            },
        });
    }
    for (const p of allPatients) {
        for (const f of facilities) {
            await prisma.dataSharingConsent.create({
                data: {
                    patientId: p.id,
                    facilityId: f.id,
                    granted: Math.random() > 0.3,
                },
            });
        }
    }
    await prisma.clinicianNote.create({
        data: {
            patientId: patient1.id,
            clinicianId: clinician1.id,
            noteText: 'Patient shows good compliance with medication regimen. BP trending positively. Discussed the importance of low-sodium diet. Schedule 3-month follow-up.',
        },
    });
    await prisma.clinicianNote.create({
        data: {
            patientId: patient1.id,
            clinicianId: clinician2.id,
            noteText: 'Diabetes under improving control. HbA1c declining. Consider reducing Metformin dose if trend continues at next visit. Monitor for hypoglycemia symptoms.',
        },
    });
    console.log('✅ Seed complete!');
    console.log(`   Created: ${allPatients.length} patients, 2 clinicians, ${facilities.length} facilities`);
    console.log(`   Demo logins:`);
    console.log(`     Patient:  patient@demo.com / demo123`);
    console.log(`     Clinician: clinician@demo.com / demo123`);
    console.log(`     Admin:    admin@demo.com / demo123`);
}
main()
    .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map