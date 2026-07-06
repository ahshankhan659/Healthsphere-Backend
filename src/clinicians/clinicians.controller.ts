import { Controller, Get, Post, Param, Body, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CliniciansService } from './clinicians.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('Clinicians')
@Controller()
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CliniciansController {
  constructor(private cliniciansService: CliniciansService) {}

  @Get('clinicians/:id/patients')
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'sort', required: false })
  @ApiQuery({ name: 'filter', required: false })
  getPatients(
    @Param('id') id: string,
    @Query('search') search?: string,
    @Query('sort') sort?: string,
    @Query('filter') filter?: string,
  ) {
    return this.cliniciansService.getPatients(id, search, sort, filter);
  }

  @Post('patients/:patientId/notes')
  addNote(
    @Param('patientId') patientId: string,
    @Body('noteText') noteText: string,
    @Req() req: any,
  ) {
    return this.cliniciansService.addNote(patientId, req.user.sub, noteText);
  }

  @Get('patients/:patientId/notes')
  getNotes(@Param('patientId') patientId: string) {
    return this.cliniciansService.getNotes(patientId);
  }
}
