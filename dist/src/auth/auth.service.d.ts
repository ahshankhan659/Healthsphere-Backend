import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
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
    getMe(userId: string): Promise<{
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
    private signToken;
}
