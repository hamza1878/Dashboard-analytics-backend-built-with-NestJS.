import { Controller, Get, Param, Patch, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { DriversService } from './drivers.service';
import { DriverAvailabilityStatus } from './driver.entity';

@ApiTags('drivers')
@Controller('drivers')
export class DriversController {
  constructor(private readonly service: DriversService) {}

  @Get()
  @ApiOperation({ summary: 'List all drivers' })
  @ApiQuery({
    name: 'status',
    enum: DriverAvailabilityStatus,
    required: false,
    description: 'pending | setup_required | offline | online | on_trip',
  })
  findAll(@Query('status') status?: DriverAvailabilityStatus) {
    return this.service.findAll(status);
  }

  @Get('top')
  @ApiOperation({ summary: 'Top rated drivers' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  getTop(@Query('limit') limit?: number) {
    return this.service.getTopDrivers(limit || 10);
  }

  @Get('active-count')
  @ApiOperation({ summary: 'Count of drivers with status = online (available for dispatch)' })
  getActiveCount() {
    return this.service.getActiveCount();
  }

  @Get('status-breakdown')
  @ApiOperation({ summary: 'Driver count grouped by availability_status' })
  getStatusBreakdown() {
    return this.service.getStatusBreakdown();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get driver by ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id/status')
  @ApiOperation({
    summary: 'Update driver availability status',
    description: 'Allowed values: pending | setup_required | offline | online | on_trip',
  })
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: DriverAvailabilityStatus,
  ) {
    return this.service.updateStatus(id, status);
  }
}
