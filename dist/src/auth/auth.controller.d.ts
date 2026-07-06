import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            role: import(".prisma/client").$Enums.Role;
        };
    }>;
    login(dto: LoginDto): Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            role: import(".prisma/client").$Enums.Role;
        };
    }>;
    getMe(req: any): Promise<{
        patient: {
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
        } | null;
        clinician: {
            id: string;
            createdAt: Date;
            fullName: string;
            userId: string;
            specialty: string;
            facilityName: string;
            licenseNo: string | null;
        } | null;
        id: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
    }>;
}
