import { IsEmail, IsString, MinLength, IsOptional, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'patient@demo.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'demo123' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'patient', enum: ['patient', 'clinician', 'admin'] })
  @IsOptional()
  @IsIn(['patient', 'clinician', 'admin'])
  role?: string;
}

export class LoginDto {
  @ApiProperty({ example: 'patient@demo.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'demo123' })
  @IsString()
  password: string;
}
