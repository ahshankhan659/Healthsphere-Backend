import { PrismaService } from '../prisma/prisma.service';
export declare class DocumentsService {
    private prisma;
    constructor(prisma: PrismaService);
    uploadDocument(patientId: string, file: Express.Multer.File): Promise<{
        id: string;
        patientId: string;
        fileName: string;
        fileUrl: string;
        uploadDate: Date;
        ocrStatus: import(".prisma/client").$Enums.OcrStatus;
        extractedText: string | null;
        documentType: string | null;
        fileSize: number | null;
    }>;
    private processOCR;
    private generateFallbackText;
    getDocument(id: string): Promise<{
        id: string;
        patientId: string;
        fileName: string;
        fileUrl: string;
        uploadDate: Date;
        ocrStatus: import(".prisma/client").$Enums.OcrStatus;
        extractedText: string | null;
        documentType: string | null;
        fileSize: number | null;
    }>;
    getPatientDocuments(patientId: string): Promise<{
        id: string;
        patientId: string;
        fileName: string;
        fileUrl: string;
        uploadDate: Date;
        ocrStatus: import(".prisma/client").$Enums.OcrStatus;
        extractedText: string | null;
        documentType: string | null;
        fileSize: number | null;
    }[]>;
}
