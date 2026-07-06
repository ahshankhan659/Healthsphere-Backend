import { Controller, Get, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('Admin & Consents')
@Controller()
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('admin/metrics')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  getMetrics() {
    return this.adminService.getMetrics();
  }

  @Get('patients/:patientId/consents')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getConsents(@Param('patientId') patientId: string) {
    return this.adminService.getConsents(patientId);
  }

  @Patch('patients/:patientId/consents')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  updateConsent(
    @Param('patientId') patientId: string,
    @Body('facilityId') facilityId: string,
    @Body('granted') granted: boolean,
  ) {
    return this.adminService.updateConsent(patientId, facilityId, granted);
  }
}
