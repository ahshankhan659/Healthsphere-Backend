import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { InsightsService } from './insights.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('AI Insights')
@Controller('patients')
export class InsightsController {
  constructor(private insightsService: InsightsService) {}

  @Get(':patientId/insights')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getInsights(@Param('patientId') patientId: string) {
    return this.insightsService.getInsights(patientId);
  }

  @Post(':patientId/insights/generate')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  generateInsights(@Param('patientId') patientId: string) {
    return this.insightsService.generateInsights(patientId);
  }
}
