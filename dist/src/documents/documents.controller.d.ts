import { DocumentsService } from './documents.service';
export declare class DocumentsController {
    private documentsService;
    constructor(documentsService: DocumentsService);
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
}
