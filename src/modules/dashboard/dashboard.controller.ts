import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';

@ApiTags('dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly service: DashboardService) {}

  @Get('overview')
  @ApiOperation({
    summary: 'Top KPI cards — total rides, revenue, support tickets, satisfaction rate',
    description: 'Returns current period values + % change vs previous period for all 4 dashboard KPI cards.',
  })
  @ApiQuery({ name: 'hours', required: false, type: Number, description: 'Window size in hours (default: 24)' })
  getOverview(@Query('hours') hours?: number) {
    return this.service.getOverview(hours || 24);
  }

  @Get('operational')
  @ApiOperation({
    summary: 'Secondary metrics — avg trip duration, active drivers, safety score, utilization rate',
  })
  getOperational() {
    return this.service.getOperationalMetrics();
  }

  @Get('revenue-trend')
  @ApiOperation({ summary: 'Revenue trend for the line chart' })
  @ApiQuery({ name: 'days', required: false, type: Number, description: 'Number of days (default: 7)' })
  getRevenueTrend(@Query('days') days?: number) {
    return this.service.getRevenueTrend(days || 7);
  }

  @Get('support-resolution')
  @ApiOperation({ summary: 'Hourly support resolution data for the bar chart' })
  getSupportResolution() {
    return this.service.getSupportResolutionByHour();
  }
}
